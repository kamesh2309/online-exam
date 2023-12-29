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

import com.constantName.ConstantNames;

public class Registers {
	public static String registersEvents(HttpServletRequest request, HttpServletResponse response) {
		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute(ConstantNames.DISPATCHER);
		Delegator delegator = (Delegator) request.getAttribute(ConstantNames.DELEGATOR);

		Map<String, Object> addUserMap = new HashMap<>();
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
		if(!(request.getParameter("currentPassword").equals(request.getParameter("currentPasswordVerify")))){
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

			List<GenericValue> userLoginValue = EntityQuery.use(delegator).from(ConstantNames.USER_LOGIN).cache().queryList();
			if (UtilValidate.isNotEmpty(userLoginValue)) {
				for (GenericValue loginID : userLoginValue) {
					if (loginID.getString(ConstantNames.USER_LOGIN_ID)
							.equalsIgnoreCase(request.getParameter("userLoginId"))) {
						String errMsg = "Already userId exsists try ";
						addUserMap.put("error_user", errMsg);
						request.setAttribute(ConstantNames.RESULT_MAP, addUserMap);
						return ConstantNames.ERROR;
					}
				}
			}
			

			List<GenericValue> nameChecks = EntityQuery.use(delegator).from(ConstantNames.PERSON).cache().queryList();
			if (UtilValidate.isNotEmpty(nameChecks)) {
				for (GenericValue name : nameChecks) {
					if ((request.getParameter("firstName").equalsIgnoreCase(name.getString(ConstantNames.FIRST_NAME)))
							&&(request.getParameter("lastName").equalsIgnoreCase(name.getString(ConstantNames.LAST_NAME)))){
						String errMsg = "Already userName exsist try new one ";
						addUserMap.put("error_user", errMsg);
						request.setAttribute(ConstantNames.RESULT_MAP, addUserMap);
						return ConstantNames.ERROR;
					}

				}
			}

			Map<String, Object> createUser = dispatcher.runSync("createPersonAndUserLogin", addUserMap);
			if (ServiceUtil.isError(createUser)) {
				String errMsg = "The  register is not created ...";
				addUserMap.put("error_user", errMsg);
				request.setAttribute(ConstantNames.RESULT_MAP, addUserMap);
				return ConstantNames.ERROR;
			}
			String partyId = (String) createUser.get(ConstantNames.PARTY_ID);
			Map<String, Object> newuser = dispatcher.runSync("AddRole", UtilMisc.toMap(ConstantNames.PARTY_ID, partyId,
					ConstantNames.ROLE_TYPE_ID, request.getParameter("roleTypeId")));
			if (ServiceUtil.isError(newuser)) {
				String errMsg = "The  register is not created ...";
				addUserMap.put("error_user", errMsg);
				request.setAttribute(ConstantNames.RESULT_MAP, addUserMap);
				return ConstantNames.ERROR;

			}
		} catch (GenericServiceException | GenericEntityException e) {
			e.printStackTrace();
		}
		request.setAttribute(ConstantNames.SUCCESS, ConstantNames.SUCCESS);
		
		return ConstantNames.SUCCESS;
	}
}