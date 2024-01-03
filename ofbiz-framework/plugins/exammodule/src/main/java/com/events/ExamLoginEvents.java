package com.events;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ofbiz.base.util.UtilValidate;
import org.apache.ofbiz.common.login.LoginServices;
import org.apache.ofbiz.entity.Delegator;
import org.apache.ofbiz.entity.GenericEntityException;
import org.apache.ofbiz.entity.GenericValue;
import org.apache.ofbiz.entity.util.EntityQuery;
import org.apache.ofbiz.entity.util.EntityUtilProperties;
import org.apache.ofbiz.webapp.control.LoginWorker;

import com.constantname.ConstantNames;
import com.utilhelpervastpro.LoginSessionChecker;

public class ExamLoginEvents {

	public static final String module = ExamLoginEvents.class.getName();

	/**
	 * @param request
	 * @param response
	 * @return
	 */
	public static String loginEvents(HttpServletRequest request, HttpServletResponse response) {
		Delegator delegator = (Delegator) request.getAttribute(ConstantNames.DELEGATOR);
		boolean useEncryption = "true"
				.equals(EntityUtilProperties.getPropertyValue("security", "password.encrypt", delegator));
		Map<String, Object> loginResultMap = new HashMap<String, Object>();

		HttpSession mySession = request.getSession();

		String uname = request.getParameter("uname");
		String upass = request.getParameter("upass");
		/**
		 * Here Checking that the required fields are not empty
		 */
		if (UtilValidate.isEmpty(uname) || UtilValidate.isEmpty(upass)) {
			String errMsg = "userName and password required fields on the form and can't be empty.";
			loginResultMap.put("error_user", errMsg);
			request.setAttribute(ConstantNames.RESULT_MAP, loginResultMap);
			return ConstantNames.ERROR;
		}
		try {
			/**
			 * Here writing EntityQuery to getting the value from the User_Login entity
			 */
			GenericValue userDetails = EntityQuery.use(delegator).from(ConstantNames.USER_LOGIN)
					.where(ConstantNames.USER_LOGIN_ID, uname).cache().queryOne();
			/**
			 * Here checking that UserDetails is Empty
			 */
			if (UtilValidate.isEmpty(userDetails)) {
				String errMsg = "userName id is worng.";
				loginResultMap.put("error_user", errMsg);
				request.setAttribute(ConstantNames.RESULT_MAP, loginResultMap);
				return ConstantNames.ERROR;
			}
			/**
			 * Here getting the PassWord and PartyId of the user
			 */
			String userPassword = userDetails.getString("currentPassword");
			String partyId = userDetails.getString("partyId");
			/**
			 * Here writing the entity query where the party_id
			 */
			GenericValue userRoll = EntityQuery.use(delegator).from(ConstantNames.PARTY_ROLE)
					.where(ConstantNames.PARTY_ID, partyId).cache().queryOne();
			/**
			 * Here checking that userRoll is Empty
			 */
			if (UtilValidate.isEmpty(userRoll)) {
				String errMsg = "user  is not valid one.";
				loginResultMap.put("error_user", errMsg);
				request.setAttribute(ConstantNames.RESULT_MAP, loginResultMap);
				return ConstantNames.ERROR;
			}
			/**
			 * Here getting the rollType of the user
			 */
			String rollType = userRoll.getString(ConstantNames.ROLE_TYPE_ID);

			boolean checkedUser = userDetails.getString("userLoginId").equals(uname);
			boolean checkedPassword = LoginServices.checkPassword(userPassword, useEncryption, upass);
			/**
			 * Here Checking that userName and PassWord is correct
			 */
			if (checkedUser && checkedPassword) {
				boolean flag = true;
				mySession.setAttribute("userLogin", userDetails);
				request.setAttribute("user_success", "Login Successfully created succesfully.");
				/**
				 * Here Checking the rollType of the User
				 */
				if (rollType.equalsIgnoreCase("student")) {
					flag = false;
					/**
					 * Here setting the rollType of the User in the setAttribute
					 */
					request.setAttribute(ConstantNames.PARTY_ID, partyId);
				}
				loginResultMap.put("flag", flag);
				/**
				 * Here setting the Flag in the setAttribute
				 */
				request.setAttribute(ConstantNames.RESULT_MAP, loginResultMap);
				return ConstantNames.SUCCESS;
			}

		} catch (GenericEntityException e) {
			e.printStackTrace();

		}
		String errMsg = " password worngly enterd.";
		loginResultMap.put("error_user", errMsg);
		/**
		 * Here Setting the Error Message in the setAttribute if the password is wrong
		 */
		request.setAttribute(ConstantNames.RESULT_MAP, loginResultMap);
		return ConstantNames.ERROR;

	}

	/**
	 * @param request
	 * @param response
	 * @return
	 */
	public static String logoutEvents(HttpServletRequest request, HttpServletResponse response) {
		if (LoginSessionChecker.sessionChecker(request, response)=="false") {
			return ConstantNames.ERROR;
		}
		boolean logoutSuccess = true;
		String isLogout = LoginWorker.logout(request, response);
		if (isLogout == "success") {
			logoutSuccess = false;
		}
		request.setAttribute("logoutSuccess", logoutSuccess);

		return ConstantNames.SUCCESS;
	}
}