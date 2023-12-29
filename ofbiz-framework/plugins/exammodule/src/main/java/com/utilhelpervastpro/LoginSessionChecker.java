package com.utilhelpervastpro;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ofbiz.base.util.UtilValidate;
import org.apache.ofbiz.entity.GenericValue;

import com.constantName.ConstantNames;

public class LoginSessionChecker {
	public static boolean sessionChecker(HttpServletRequest request,HttpServletResponse response) {
		GenericValue userLogin = (GenericValue) request.getSession().getAttribute("userLogin");
		if(UtilValidate.isEmpty(userLogin)) {
			request.setAttribute(ConstantNames.NOT_LOGIN, ConstantNames.NOT_LOGIN);
			return false;
		}
		
		return true;
	}

}
