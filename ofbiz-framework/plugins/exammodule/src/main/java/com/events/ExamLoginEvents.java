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

import com.constantName.ConstantNames;

public class ExamLoginEvents {

	public static final String module = ExamLoginEvents.class.getName();

	public static String loginEvents(HttpServletRequest request, HttpServletResponse response) {
		Delegator delegator = (Delegator) request.getAttribute(ConstantNames.DELEGATOR);
		boolean useEncryption = "true"
				.equals(EntityUtilProperties.getPropertyValue("security", "password.encrypt", delegator));
		Map<String, Object> loginResultMap = new HashMap<String, Object>();
		HttpSession mySession = request.getSession();
		
		String uname = request.getParameter("uname");
		String upass = request.getParameter("upass");

		if (UtilValidate.isEmpty(uname) || UtilValidate.isEmpty(upass)) {
			String errMsg = "userName and password required fields on the form and can't be empty.";
			loginResultMap.put("error_user", errMsg);
			request.setAttribute(ConstantNames.RESULT_MAP, loginResultMap);
			return ConstantNames.ERROR;
		}
		try {
			GenericValue userDetails = EntityQuery.use(delegator).from(ConstantNames.USER_LOGIN)
					.where(ConstantNames.USER_LOGIN_ID, uname).cache().queryOne();
			if (UtilValidate.isEmpty(userDetails)) {
				String errMsg = "userName id is worng.";
				loginResultMap.put("error_user", errMsg);
				request.setAttribute(ConstantNames.RESULT_MAP, loginResultMap);
				return ConstantNames.ERROR;
			}
			String userPassword = userDetails.getString("currentPassword");
			String partyId = userDetails.getString("partyId");

			GenericValue userRoll = EntityQuery.use(delegator).from(ConstantNames.PARTY_ROLE)
					.where(ConstantNames.PARTY_ID, partyId).cache().queryOne();
			if (UtilValidate.isEmpty(userRoll)) {
				String errMsg = "user  is not valid one.";
				loginResultMap.put("error_user", errMsg);
				request.setAttribute(ConstantNames.RESULT_MAP, loginResultMap);
				return ConstantNames.ERROR;
			}

			String rollType = userRoll.getString(ConstantNames.ROLE_TYPE_ID);

			boolean checkedUser = userDetails.getString("userLoginId").equals(uname);
			boolean checkedPassword = LoginServices.checkPassword(userPassword, useEncryption, upass);

			if (checkedUser && checkedPassword) {
				boolean flag = true;
                mySession.setAttribute("userLogin", userDetails);
				request.setAttribute("user_success", "Login Successfully created succesfully.");
				if (rollType.equalsIgnoreCase("student")) {
					flag = false;
					request.setAttribute(ConstantNames.PARTY_ID, partyId);
				}
				loginResultMap.put("flag", flag);
				request.setAttribute(ConstantNames.RESULT_MAP, loginResultMap);
				return ConstantNames.SUCCESS;
			}

		} catch (GenericEntityException e) {
			e.printStackTrace();

		}
		String errMsg = " password worngly enterd.";
		loginResultMap.put("error_user", errMsg);
		request.setAttribute(ConstantNames.RESULT_MAP, loginResultMap);
		return ConstantNames.ERROR;

	}
}