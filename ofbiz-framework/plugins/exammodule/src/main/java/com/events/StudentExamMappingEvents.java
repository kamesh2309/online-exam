package com.events;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ofbiz.base.util.UtilValidate;
import org.apache.ofbiz.entity.Delegator;
import org.apache.ofbiz.entity.GenericEntityException;
import org.apache.ofbiz.entity.GenericValue;
import org.apache.ofbiz.entity.util.EntityQuery;

import com.constantName.ConstantNames;
import com.utilhelpervastpro.LoginSessionChecker;

public class StudentExamMappingEvents {
	public static final String module = StudentExamMappingEvents.class.getName();

	public static String showStudents(HttpServletRequest request, HttpServletResponse response) {
		Delegator delegator = (Delegator) request.getAttribute(ConstantNames.DELEGATOR);
		Map<String, Object> studentIdMap = new HashMap<String, Object>();
		if(!LoginSessionChecker.sessionChecker(request, response)) {
			return ConstantNames.ERROR;
		}
		try {
			if (UtilValidate.isEmpty(request.getParameter("showUserExamId"))
					&& UtilValidate.isEmpty(request.getParameter("showUserPartyId"))) {
				if (UtilValidate.isEmpty(request.getParameter("showExamId"))) {
					List<GenericValue> partyIds = EntityQuery.use(delegator).from(ConstantNames.PARTY_ROLE)
							.where(ConstantNames.ROLE_TYPE_ID, "Student").cache().queryList();
					if (UtilValidate.isEmpty(partyIds)) {
						String errMsg = "currently No student are added";
						studentIdMap.put("error_user", errMsg);
						request.setAttribute(ConstantNames.RESULT_MAP, studentIdMap);
						return ConstantNames.ERROR;
					}
					List<Map<String, Object>> studentsList = new ArrayList();

					for (GenericValue studentId : partyIds) {
						Map<String, Object> studentInfo = new HashMap<>();
						String partyId = studentId.getString(ConstantNames.PARTY_ID);
						if (UtilValidate.isEmpty(partyId)) {
							String errMsg = "currently No student are added";
							studentIdMap.put("error_user", errMsg);
							request.setAttribute(ConstantNames.RESULT_MAP, studentIdMap);
							return ConstantNames.ERROR;
						}
						GenericValue studentName = EntityQuery.use(delegator).from(ConstantNames.PERSON)
								.where(ConstantNames.PARTY_ID, partyId).cache().queryOne();
						studentInfo.put(ConstantNames.PARTY_ID, partyId);
						studentInfo.put(ConstantNames.FIRST_NAME, studentName.getString(ConstantNames.FIRST_NAME));
						studentInfo.put(ConstantNames.LAST_NAME, studentName.get(ConstantNames.LAST_NAME));

						studentsList.add(studentInfo);

					}
					request.setAttribute(ConstantNames.RESULT_MAP, studentsList);

				} else {
					List<GenericValue> examsList = EntityQuery.use(delegator).from(ConstantNames.USER_EXAM_MAPPING)
							.where(ConstantNames.EXAM_ID, request.getParameter("showExamId")).cache().queryList();
					List<Map<String, Object>> userExamsList = new ArrayList<Map<String, Object>>();
					for (GenericValue examList : examsList) {
						String partyId = examList.getString(ConstantNames.PARTY_ID);
						if (UtilValidate.isEmpty(partyId)) {
							String errMsg = "currently No student are added";
							studentIdMap.put("error_user", errMsg);
							request.setAttribute(ConstantNames.RESULT_MAP, studentIdMap);
							return ConstantNames.ERROR;
						}
						GenericValue studentName = EntityQuery.use(delegator).from(ConstantNames.PERSON)
								.where(ConstantNames.PARTY_ID, partyId).cache().queryOne();
						Map<String, Object> userExamList = new HashMap<String, Object>();

						userExamList.put(ConstantNames.PARTY_ID, partyId);
						userExamList.put(ConstantNames.FIRST_NAME, studentName.getString(ConstantNames.FIRST_NAME));
						userExamList.put(ConstantNames.LAST_NAME, studentName.get(ConstantNames.LAST_NAME));

						userExamsList.add(userExamList);
					}
					request.setAttribute(ConstantNames.RESULT_MAP, userExamsList);
				}
				

			} else {
				/*-------------------Exam User Details-------------------*/
				GenericValue userExamValue = EntityQuery.use(delegator).from(ConstantNames.USER_EXAM_MAPPING)
						.where(ConstantNames.EXAM_ID, request.getParameter("showUserExamId"), ConstantNames.PARTY_ID,
								request.getParameter("showUserPartyId"))
						.cache().queryOne();
				if (UtilValidate.isEmpty(userExamValue)) {
					String errMsg = "currently No student are added to this exam";
					request.setAttribute(ConstantNames.RESULT_MAP, errMsg);
					return ConstantNames.ERROR;
				}
				request.setAttribute("userExam", userExamValue);

			}
		} catch (GenericEntityException e) {
			e.printStackTrace();
		}

		return ConstantNames.SUCCESS;

	}
}
