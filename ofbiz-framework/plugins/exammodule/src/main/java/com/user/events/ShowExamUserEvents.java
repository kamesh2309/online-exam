package com.user.events;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
import org.apache.poi.hwpf.usermodel.DateAndTime;

import com.constantname.ConstantNames;
import com.utilhelpervastpro.LoginSessionChecker;

public class ShowExamUserEvents {
	public static final String module = ShowExamUserEvents.class.getName();

	public static String showStudentsExam(HttpServletRequest request, HttpServletResponse response) {
		Delegator delegator = (Delegator) request.getAttribute(ConstantNames.DELEGATOR);
		Map<String, Object> studentExamMap = new HashMap<String, Object>();
		if (LoginSessionChecker.sessionChecker(request, response) == "false") {
			return ConstantNames.ERROR;
		}
		
		try {
			GenericValue partyId = EntityQuery.use(delegator).from(ConstantNames.PARTY)
					.where(ConstantNames.PARTY_ID, request.getParameter("partyId")).cache().queryOne();
			if (UtilValidate.isEmpty(partyId)) {
				String errMsg = "Invalid Party Id";
				studentExamMap.put("error_user", errMsg);
				request.setAttribute(ConstantNames.RESULT_MAP, studentExamMap);
				return ConstantNames.ERROR;
			}

			List<GenericValue> userExamIdList = EntityQuery.use(delegator).from(ConstantNames.USER_EXAM_MAPPING)
					.where(ConstantNames.PARTY_ID, request.getParameter("partyId")).cache().queryList();
			if (UtilValidate.isEmpty(userExamIdList)) {
				String errMsg = "Exams are not assign to the user";
				studentExamMap.put("error_user", errMsg);
				request.setAttribute(ConstantNames.RESULT_MAP, studentExamMap);
				return ConstantNames.ERROR;
			}
			List<Map<String, Object>> userExamList = new ArrayList<Map<String, Object>>();
			for (GenericValue userExam : userExamIdList) {
				String examId = userExam.getString(ConstantNames.EXAM_ID);
				GenericValue examName = EntityQuery.use(delegator).from(ConstantNames.EXAM_MASTER)
						.where(ConstantNames.EXAM_ID, examId).cache().queryOne();

				boolean showExamToUser = checkExamValidation(examName.getString(ConstantNames.EXPIRATION_DATE),
						examName.getString(ConstantNames.EXPIRATION_DATE));
				Map<String, Object> examList = new HashMap<String, Object>();
				examList.put("showExamToUser", showExamToUser);
				examList.put(ConstantNames.EXAM_ID, examName.getString(ConstantNames.EXAM_ID));
				examList.put(ConstantNames.EXAM_NAME, examName.getString(ConstantNames.EXAM_NAME));
				String[] startDate = examName.getString(ConstantNames.CREATION_DATE).split(" ");
				examList.put(ConstantNames.CREATION_DATE, startDate[0]);
				String[] endDate = examName.getString(ConstantNames.EXPIRATION_DATE).split(" ");
				examList.put(ConstantNames.EXPIRATION_DATE,endDate[0] );
				userExamList.add(examList);

			}

			GenericValue userNameDetails = EntityQuery.use(delegator).from(ConstantNames.PERSON)
					.where(ConstantNames.PARTY_ID, request.getParameter("partyId")).cache().queryOne();
			if (UtilValidate.isEmpty(userNameDetails)) {
				String errMsg = "Exams are not assign to the user";
				studentExamMap.put("error_user", errMsg);
				request.setAttribute(ConstantNames.RESULT_MAP, studentExamMap);
				return ConstantNames.ERROR;
			}

			String userName = userNameDetails.getString(ConstantNames.FIRST_NAME) + " "
					+ userNameDetails.getString(ConstantNames.LAST_NAME);

			request.setAttribute("userName", userName);
			request.setAttribute("userExamList", userExamList);

		} catch (GenericEntityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return ConstantNames.SUCCESS;

	}

	public static boolean checkExamValidation(String startDate, String expireDate) {
		Timestamp timeStampStartDate = Timestamp.valueOf(startDate);
		LocalDateTime start = timeStampStartDate.toLocalDateTime();
		Timestamp timeStampExpireDate = Timestamp.valueOf(startDate);
		LocalDateTime expire = timeStampExpireDate.toLocalDateTime();
		LocalDateTime now = LocalDateTime.now();
		boolean startExam = false;
		if ((start.isAfter(now) || start.isEqual(now)) && (now.isBefore(expire) || now.isEqual(expire))) {
			startExam = true;
		}
		return startExam;

	}

}
