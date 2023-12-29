package com.events;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import java.time.format.DateTimeFormatter;
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
import com.utilhelpervastpro.LoginSessionChecker;

public class ExamEvents {
	public static final String module = ExamEvents.class.getName();

	public static String creatUpdateDeleteExam(HttpServletRequest request, HttpServletResponse response) {
		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute(ConstantNames.DISPATCHER);
		Delegator delegator = (Delegator) request.getAttribute(ConstantNames.DELEGATOR);
		
		if(!LoginSessionChecker.sessionChecker(request, response)) {
			return ConstantNames.ERROR;
		}

		DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
		DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
		try {

			if (UtilValidate.isEmpty(request.getParameter("deleteExamId"))) {
				String examName = request.getParameter("examName");
				String description = request.getParameter("description");
				String creationDate = request.getParameter("creationDate");
				LocalDateTime localDateTime = LocalDateTime.parse(creationDate, inputFormatter);
				String creationDateAndTime = localDateTime.format(outputFormatter);
				String expirationDate = request.getParameter("expirationDate");
				LocalDateTime expireDateTime = LocalDateTime.parse(expirationDate, inputFormatter);
				String expirationDateAndTime = expireDateTime.format(outputFormatter);
				String noOfQuestions = request.getParameter("noOfQuestions");
				String durationMinutes = request.getParameter("durationMinutes");
				String passPercentage = request.getParameter("passPercentage");
				String questionsRandomized = request.getParameter("questionsRandomized");
				String answersMust = request.getParameter("answersMust");
				String enableNegativeMark = request.getParameter("enableNegativeMark");
				String negativeMarkValue = request.getParameter("negativeMarkValue");

				Map<String, Object> examResultMap = new HashMap<>();

				if (UtilValidate.isEmpty(noOfQuestions) || UtilValidate.isEmpty(questionsRandomized)
						|| UtilValidate.isEmpty(durationMinutes) || UtilValidate.isEmpty(passPercentage)
						|| UtilValidate.isEmpty(answersMust) || UtilValidate.isEmpty(enableNegativeMark)) {
					String errMsg = "The  required fields on the form and can't be empty.";
					examResultMap.put("ERROR_MESSAGE", errMsg);
					request.setAttribute(ConstantNames.RESULT_MAP, examResultMap);
					return ConstantNames.ERROR;

				}
				Map<String, Object> examValueMap = new HashMap<>();
				examValueMap.put(ConstantNames.EXAM_NAME, examName);
				examValueMap.put(ConstantNames.DESCRIPTION, description);
				examValueMap.put(ConstantNames.CREATION_DATE, creationDateAndTime);
				examValueMap.put(ConstantNames.EXPIRATION_DATE, expirationDateAndTime);
				examValueMap.put(ConstantNames.NO_OF_QUESTIONS, noOfQuestions);
				examValueMap.put(ConstantNames.DURATION_MINUTES, durationMinutes);
				examValueMap.put(ConstantNames.PASS_PERCENTAGE, passPercentage);
				examValueMap.put(ConstantNames.QUESTIONS_RANDOMIZED, questionsRandomized);
				examValueMap.put(ConstantNames.ANSWERS_MUST, answersMust);
				examValueMap.put(ConstantNames.ENABLE_NEGATIVE_MARK, enableNegativeMark);
				examValueMap.put(ConstantNames.NEGATIVE_MARK_VALUE, negativeMarkValue);

				if (UtilValidate.isEmpty(request.getParameter("examId"))) {
					examValueMap.put(ConstantNames.FROM_DATE, currentTimestamp);
					examResultMap = dispatcher.runSync("AddExam", examValueMap);
					if (ServiceUtil.isError(examResultMap)) {
						String errMsg = "The  Enter feild not Added.";
						examResultMap.put("ERROR_MESSAGE", errMsg);
						request.setAttribute(ConstantNames.RESULT_MAP, examResultMap);
						return ConstantNames.ERROR;
					}
					List<GenericValue> examsList = EntityQuery.use(delegator).from(ConstantNames.EXAM_MASTER).cache()
							.queryList();

					if (UtilValidate.isEmpty(examsList)) {
						String errMsg = "No exams are Added.";
						examResultMap.put("Exams", errMsg);
						request.setAttribute(ConstantNames.RESULT_MAP, examResultMap);
						return ConstantNames.ERROR;
					}
					request.setAttribute(ConstantNames.RESULT_MAP, examResultMap);
				} else {
					examValueMap.put(ConstantNames.EXAM_ID, request.getParameter("examId"));
					examValueMap.put(ConstantNames.FROM_DATE, request.getParameter("fromDate"));
					Map<String, Object> EditExam = dispatcher.runSync("EditExam", examValueMap);
					if (ServiceUtil.isError(EditExam)) {
						String errMsg = "The  Enter feild not Edited.";
						examResultMap.put("ERROR_MESSAGE", errMsg);
						request.setAttribute(ConstantNames.RESULT_MAP, examResultMap);
						return ConstantNames.ERROR;
					}
					examResultMap.put(ConstantNames.SUCCESS, ConstantNames.SUCCESS);
					request.setAttribute(ConstantNames.RESULT_MAP, examResultMap);
				}
			} else {
				Map<String, Object> deleteExam = dispatcher.runSync("DeleteExam", UtilMisc.toMap(ConstantNames.EXAM_ID,
						request.getParameter("deleteExamId"), ConstantNames.THEW_DATE, currentTimestamp));
				if (ServiceUtil.isError(deleteExam)) {
					String errMsg = "The  Enter Exam not Deleted.";
					request.setAttribute(ConstantNames.RESULT_MAP, errMsg);
					return ConstantNames.ERROR;
				}
				request.setAttribute("successDelete", ConstantNames.SUCCESS);

			}

		} catch (GenericServiceException | GenericEntityException e) {

			e.printStackTrace();
		}

		return ConstantNames.SUCCESS;

	}

	
	public static String getExam(HttpServletRequest request, HttpServletResponse response) {
		Delegator delegator = (Delegator) request.getAttribute(ConstantNames.DELEGATOR);
		if(!LoginSessionChecker.sessionChecker(request, response)) {
			return ConstantNames.ERROR;
		}
		Map<String, Object> examsMap = new HashMap<>();

		try {
			if (request.getParameter("editExamId") == null) {
				List<GenericValue> examsList = EntityQuery.use(delegator).from(ConstantNames.EXAM_MASTER)
						.where(ConstantNames.THEW_DATE, null).cache().queryList();
				if (UtilValidate.isEmpty(examsList)) {
					String errMsg = "No exams are Added.";
					examsMap.put("Exams", errMsg);
					request.setAttribute(ConstantNames.RESULT_MAP, examsMap);
					return ConstantNames.ERROR;
				}

				request.setAttribute("examMap", examsList);
			} else {
				/*--------------------------Edit Exam-------------------------------*/
				List<GenericValue> idExamList = EntityQuery.use(delegator).from(ConstantNames.EXAM_MASTER)
						.where(ConstantNames.EXAM_ID, request.getParameter("editExamId")).cache().queryList();
				if (UtilValidate.isEmpty(idExamList)) {
					String errMsg = "No are Added yet....";
					examsMap.put("Exams", errMsg);
					request.setAttribute(ConstantNames.RESULT_MAP, examsMap);
					return ConstantNames.ERROR;
				}
				request.setAttribute("examList", idExamList);
			}

		} catch (GenericEntityException e) {
			e.printStackTrace();
			return ConstantNames.ERROR;

		}

		return ConstantNames.SUCCESS;
	}

}
