package com.events;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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
import com.ctc.wstx.shaded.msv_core.driver.textui.Debug;
import com.utilhelpervastpro.LoginSessionChecker;

public class UserExamMappingEvents {
	public static final String module = UserExamMappingEvents.class.getName();

	public static String addDeleteUserExamMapping(HttpServletRequest request, HttpServletResponse response) {
		Delegator delegator = (Delegator) request.getAttribute(ConstantNames.DELEGATOR);
		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute(ConstantNames.DISPATCHER);
		DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
		DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

		if (LoginSessionChecker.sessionChecker(request, response) == "false") {
			return ConstantNames.ERROR;
		}
		if (UtilValidate.isEmpty(request.getParameter("deleteExamId"))
				&& UtilValidate.isEmpty(request.getParameter("deletePartyId"))) {

			Map<String, Object> userExamMappingMap = new HashMap<>();
			if (UtilValidate.isEmpty(ConstantNames.PARTY_ID) || UtilValidate.isEmpty(ConstantNames.EXAM_ID)
					|| UtilValidate.isEmpty(ConstantNames.ALLOWED_ATTEMPTS)
					|| UtilValidate.isEmpty(ConstantNames.NO_OF_ATTEMPTS)
					|| UtilValidate.isEmpty(ConstantNames.TIME_OUT_DAYS)
					|| UtilValidate.isEmpty(ConstantNames.PASSWORD_CHANGES_AUTO)
					|| UtilValidate.isEmpty(ConstantNames.CAN_SPLIT_EXAMS)
					|| UtilValidate.isEmpty(ConstantNames.CAN_SEE_DETAILED_RESULTS)
					|| UtilValidate.isEmpty(ConstantNames.MAX_SPLIT_ATTEMPTS)) {
				String errMsg = "The  required fields on the form and can't be empty.";
				userExamMappingMap.put("ERROR_MESSAGE", errMsg);
				request.setAttribute(ConstantNames.RESULT_MAP, userExamMappingMap);
				return ConstantNames.ERROR;

			}

			Map<String, Object> userExamMappingMapValues = new HashMap<>();
			List<Map<String, Object>> alreadyAddedUser = new ArrayList<>();
			String requestPartyIds = request.getParameter("partyId");
			String[] partyIds = requestPartyIds.split(",");
			for (String partyId : partyIds) {
				try {
					GenericValue userExamDetails = EntityQuery.use(delegator).from(ConstantNames.USER_EXAM_MAPPING)
							.where(ConstantNames.EXAM_ID, request.getParameter("examId"), ConstantNames.PARTY_ID,
									partyId)
							.cache().queryOne();
					if (UtilValidate.isEmpty(userExamDetails)) {
						userExamMappingMapValues.put(ConstantNames.PARTY_ID, partyId);
						userExamMappingMapValues.put(ConstantNames.EXAM_ID, request.getParameter("examId"));
						userExamMappingMapValues.put(ConstantNames.ALLOWED_ATTEMPTS,
								Long.parseLong(request.getParameter("allowedAttempts")));
						userExamMappingMapValues.put(ConstantNames.NO_OF_ATTEMPTS,
								Long.parseLong(request.getParameter("noOfAttempts")));
						userExamMappingMapValues.put(ConstantNames.TIME_OUT_DAYS,
								Long.parseLong(request.getParameter("timeoutDays")));
						userExamMappingMapValues.put(ConstantNames.PASSWORD_CHANGES_AUTO,
								request.getParameter("passwordChangesAuto"));
						userExamMappingMapValues.put(ConstantNames.CAN_SPLIT_EXAMS,
								request.getParameter("canSplitExams"));
						userExamMappingMapValues.put(ConstantNames.CAN_SEE_DETAILED_RESULTS,
								request.getParameter("canSeeDetailedResults"));
						userExamMappingMapValues.put(ConstantNames.MAX_SPLIT_ATTEMPTS,
								request.getParameter("maxSplitAttempts"));
						String creationDate = request.getParameter("lastPerformanceDate");
						if (UtilValidate.isNotEmpty(creationDate)) {
							LocalDateTime localDateTime = LocalDateTime.parse(creationDate, inputFormatter);
							String creationDateAndTime = localDateTime.format(outputFormatter);
							userExamMappingMapValues.put(ConstantNames.LAST_PERFORMANCE_DATE, creationDateAndTime);
						}
						Map<String, Object> adduserExam = dispatcher.runSync("AddUserExamMapping",
								userExamMappingMapValues);
						if (ServiceUtil.isError(adduserExam)) {
							String errMsg = "The Add_User_Exam_Mapping EntityQuery is not success.";
							userExamMappingMap.put("topic", errMsg);
							request.setAttribute("error_user", userExamMappingMap);
							return ConstantNames.ERROR;
						}

					} else {
						Map<String, Object> alreadyMappedUsers = new HashMap<String, Object>();
						alreadyMappedUsers.put(ConstantNames.PARTY_ID, partyId);
						GenericValue studentName = EntityQuery.use(delegator).from(ConstantNames.PERSON)
								.where(ConstantNames.PARTY_ID, partyId).cache().queryOne();
						alreadyMappedUsers.put(ConstantNames.FIRST_NAME, studentName.getString(ConstantNames.FIRST_NAME));
						alreadyMappedUsers.put(ConstantNames.LAST_NAME, studentName.getString(ConstantNames.LAST_NAME));
						alreadyAddedUser.add(alreadyMappedUsers);
					}
				} catch (GenericEntityException | GenericServiceException e) {
					e.printStackTrace();
				}

			}
			request.setAttribute("alreadyAddedUser", alreadyAddedUser);
			request.setAttribute(ConstantNames.RESULT_MAP, ConstantNames.SUCCESS);
		} else {
			try {
				Map<String, Object> deleteUserExam = dispatcher.runSync("DeleteUserExamMapping",
						UtilMisc.toMap(ConstantNames.EXAM_ID, request.getParameter("deleteExamId"),
								ConstantNames.PARTY_ID, request.getParameter("deletePartyId")));
				if (ServiceUtil.isError(deleteUserExam)) {
					String errMsg = "The Delete_User_Exam_Mapping EntityQuery is not success .";
					request.setAttribute("error_user", errMsg);
					return ConstantNames.ERROR;
				}
				request.setAttribute("successDelete", ConstantNames.SUCCESS);
			} catch (GenericServiceException e) {

				e.printStackTrace();
			}
		}

		return ConstantNames.SUCCESS;

	}
}
