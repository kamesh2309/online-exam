package com.events;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ofbiz.base.util.UtilMisc;
import org.apache.ofbiz.base.util.UtilValidate;
import org.apache.ofbiz.entity.Delegator;
import org.apache.ofbiz.entity.GenericEntityException;
import org.apache.ofbiz.entity.GenericValue;
import org.apache.ofbiz.entity.util.EntityQuery;
import org.apache.ofbiz.service.GenericServiceException;
import org.apache.ofbiz.service.LocalDispatcher;
import org.apache.ofbiz.service.ServiceUtil;

import com.constantname.ConstantNames;

public class Registers {
	/**
	 * @param request
	 * @param response
	 * @return
	 */
	public static String registersEvents(HttpServletRequest request, HttpServletResponse response) {
		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute(ConstantNames.DISPATCHER);
		Delegator delegator = (Delegator) request.getAttribute(ConstantNames.DELEGATOR);

		Map<String, Object> addUserMap = new HashMap<>();
		/***
		 * Here checking the required fields not be empty
		 */
		if (UtilValidate.isEmpty(request.getParameter("firstName"))
				|| UtilValidate.isEmpty(request.getParameter("lastName"))
				|| UtilValidate.isEmpty(request.getParameter("userLoginId"))
				|| UtilValidate.isEmpty(request.getParameter("roleTypeId"))
				|| UtilValidate.isEmpty(request.getParameter("currentPassword"))
				|| UtilValidate.isEmpty(request.getParameter("currentPasswordVerify"))) {
			String errMsg = "The  required fields on the form and can't be empty.";
			addUserMap.put("error_user", errMsg);
			request.setAttribute(ConstantNames.RESULT_MAP, addUserMap);
			return ConstantNames.ERROR;

		}
		/**
		 * Here checking the currentPassword and currentPasswordVerify are same
		 */
		if (!(request.getParameter("currentPassword").equals(request.getParameter("currentPasswordVerify")))) {
			String errMsg = "The  entered password not matched.";
			addUserMap.put("error_user", errMsg);
			request.setAttribute(ConstantNames.RESULT_MAP, addUserMap);
			return ConstantNames.ERROR;
		}
		try {
			addUserMap.put(ConstantNames.FIRST_NAME, request.getParameter("firstName"));
			addUserMap.put(ConstantNames.LAST_NAME, request.getParameter("lastName"));
			addUserMap.put(ConstantNames.USER_LOGIN_ID, request.getParameter("userLoginId"));
			addUserMap.put(ConstantNames.CURRENT_PASSWORD, request.getParameter("currentPassword"));
			addUserMap.put(ConstantNames.CURRENT_PASSWORD_VERIFY, request.getParameter("currentPasswordVerify"));
			/**
			 * Here Writing the Entity Query to get the all UserLoginId's from the
			 * user_Login
			 */
			List<GenericValue> userLoginValue = EntityQuery.use(delegator).from(ConstantNames.USER_LOGIN).cache()
					.queryList();
			if (UtilValidate.isNotEmpty(userLoginValue)) {
				for (GenericValue loginID : userLoginValue) {
					/**
					 * Here Checking that user entered userId is not exist in the UserLogin Entity
					 */
					if (loginID.getString(ConstantNames.USER_LOGIN_ID)
							.equalsIgnoreCase(request.getParameter("userLoginId"))) {
						String errMsg = "Already userId exsists try ";
						addUserMap.put("error_user", errMsg);
						request.setAttribute(ConstantNames.RESULT_MAP, addUserMap);
						return ConstantNames.ERROR;
					}
				}
			}
			/**
			 * Here Writing the Entity Query to get the all User firstName & lastName from
			 * the Person entity
			 */
			List<GenericValue> nameChecks = EntityQuery.use(delegator).from(ConstantNames.PERSON).cache().queryList();
			if (UtilValidate.isNotEmpty(nameChecks)) {
				for (GenericValue name : nameChecks) {
					/**
					 * Here Checking that user entered firstName & lastName is not exist in the
					 * person Entity
					 */
					if ((request.getParameter("firstName").equalsIgnoreCase(name.getString(ConstantNames.FIRST_NAME)))
							&& (request.getParameter("lastName")
									.equalsIgnoreCase(name.getString(ConstantNames.LAST_NAME)))) {
						String errMsg = "Already userName exsist try new one ";
						addUserMap.put("error_user", errMsg);
						request.setAttribute(ConstantNames.RESULT_MAP, addUserMap);
						return ConstantNames.ERROR;
					}

				}
			}
			/**
			 * Here registering the New user by using create_Person_And_User_Login service
			 */
			Map<String, Object> createUser = dispatcher.runSync("createPersonAndUserLogin", addUserMap);
			/**
			 * Here checking the Service is successful
			 */
			if (ServiceUtil.isError(createUser)) {
				String errMsg = "The  register is not created ...";
				addUserMap.put("error_user", errMsg);
				request.setAttribute(ConstantNames.RESULT_MAP, addUserMap);
				return ConstantNames.ERROR;
			}
			/**
			 * Here We are getting the party id by create_user
			 */
			String partyId = (String) createUser.get(ConstantNames.PARTY_ID);
			/***
			 * Here we are setting the role to the user 
			 */
			Map<String, Object> newuser = dispatcher.runSync("AddRole", UtilMisc.toMap(ConstantNames.PARTY_ID, partyId,
					ConstantNames.ROLE_TYPE_ID, request.getParameter("roleTypeId")));
			/**
			 * Here checking the Service is successful
			 */
			if (ServiceUtil.isError(newuser)) {
				String errMsg = "The  register is not created ...";
				addUserMap.put("error_user", errMsg);
				request.setAttribute(ConstantNames.RESULT_MAP, addUserMap);
				return ConstantNames.ERROR;

			}
		} catch (GenericServiceException | GenericEntityException e) {
			e.printStackTrace();
		}
		/****
		 * Here we are setting the Success to the set Attribute
		 */
		request.setAttribute(ConstantNames.SUCCESS, ConstantNames.SUCCESS);

		return ConstantNames.SUCCESS;
	}
}