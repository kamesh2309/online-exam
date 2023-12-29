package com.events;

import java.sql.Timestamp;
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

public class QuestionEvents {
	public static final String module = QuestionEvents.class.getName();

	public static String creatUpdateDeleteQuestion(HttpServletRequest request, HttpServletResponse response) {
		if(!LoginSessionChecker.sessionChecker(request, response)) {
			return ConstantNames.ERROR;
		}
		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute(ConstantNames.DISPATCHER);
		Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
		try {
			if (UtilValidate.isEmpty(request.getParameter("deleteQuestionId"))) {
				String questionDetail = request.getParameter("questionDetail");
				String optionA = request.getParameter("optionA");
				String optionB = request.getParameter("optionB");
				String optionC = request.getParameter("optionC");
				String optionD = request.getParameter("optionD");
				String optionE = request.getParameter("optionE");
				String answer = request.getParameter("answer");
				String numAnswers = request.getParameter("numAnswers");
				String questionType = request.getParameter("questionType");
				String difficultyLevel = request.getParameter("difficultyLevel");
				String answerValue = request.getParameter("answerValue");
				String topicId = request.getParameter("topicId");
				String negativeMarkValue = request.getParameter("negativeMarkValue");

				Map<String, Object> questionResultMap = new HashMap<>();

				if (UtilValidate.isEmpty(questionDetail) || UtilValidate.isEmpty(answer)
						|| UtilValidate.isEmpty(numAnswers) || UtilValidate.isEmpty(questionType)
						|| UtilValidate.isEmpty(topicId)) {
					String errMsg = "The  required fields on the form and can't be empty.";
					questionResultMap.put("ERROR_MESSAGE", errMsg);
					request.setAttribute(ConstantNames.RESULT_MAP, questionResultMap);
					return ConstantNames.ERROR;

				}
				Map<String, Object> questionValues = new HashMap<String, Object>();

				questionValues.put(ConstantNames.QUESTION_DETAIL, questionDetail);
				questionValues.put(ConstantNames.OPTION_A, optionA);
				questionValues.put(ConstantNames.OPTION_B, optionB);
				questionValues.put(ConstantNames.OPTION_C, optionC);
				questionValues.put(ConstantNames.OPTION_D, optionD);
				questionValues.put(ConstantNames.OPTION_E, optionE);
				questionValues.put(ConstantNames.ANSWER, answer);
				questionValues.put(ConstantNames.NUM_ANSWERS, numAnswers);
				questionValues.put(ConstantNames.QUESTION_TYPE, questionType);
				questionValues.put(ConstantNames.DIFFICULTY_LEVEL, difficultyLevel);
				questionValues.put(ConstantNames.ANSWER_VALUE, answerValue);
				questionValues.put(ConstantNames.TOPIC_ID, topicId);
				questionValues.put(ConstantNames.NEGATIVE_MARK_VALUE, negativeMarkValue);

				if (UtilValidate.isEmpty(request.getParameter("questionId"))) {
					questionValues.put(ConstantNames.FROM_DATE, currentTimestamp);
					Map<String, Object> AddQuestion = dispatcher.runSync("AddQuestion", questionValues);
					if (ServiceUtil.isError(AddQuestion)) {
						String errMsg = "The  Enter Question not Added.";
						request.setAttribute(ConstantNames.RESULT_MAP, errMsg);
						return ConstantNames.ERROR;
					}
					request.setAttribute(ConstantNames.RESULT_MAP, questionResultMap);
				} else {
					questionValues.put(ConstantNames.QUESTION_ID, Long.parseLong(request.getParameter("questionId")));
					questionValues.put(ConstantNames.FROM_DATE, request.getParameter("fromDate"));
					Map<String, Object> EditQuestion = dispatcher.runSync("EditQuestion", questionValues);
					if (ServiceUtil.isError(EditQuestion)) {
						String errMsg = "The  Enter Question not Added.";
						request.setAttribute(ConstantNames.RESULT_MAP, errMsg);
						return ConstantNames.ERROR;
					}
					request.setAttribute(ConstantNames.RESULT_MAP, questionResultMap);
				}

			} else {
				Map<String, Object> deleteQuestion = dispatcher.runSync("DeleteQuestion",
						UtilMisc.toMap(ConstantNames.QUESTION_ID, request.getParameter("deleteQuestionId"),
								ConstantNames.THEW_DATE, currentTimestamp));
				if (ServiceUtil.isError(deleteQuestion)) {
					String errMsg = "The  Enter Question not Deleted.";
					request.setAttribute(ConstantNames.RESULT_MAP, errMsg);
					return ConstantNames.ERROR;
				}
				request.setAttribute("successDelete", ConstantNames.SUCCESS);

			}
		} catch (GenericServiceException e) {
			e.printStackTrace();
		}
		request.setAttribute(ConstantNames.SUCCESS, ConstantNames.SUCCESS);
		return ConstantNames.SUCCESS;

	}

	public static String getQuestion(HttpServletRequest request, HttpServletResponse response) {

		Delegator delegator = (Delegator) request.getAttribute(ConstantNames.DELEGATOR);

		Map<String, Object> editResultMap = new HashMap<String, Object>();
		if(!LoginSessionChecker.sessionChecker(request, response)) {
			return ConstantNames.ERROR;
		}
		try {
			if (UtilValidate.isEmpty(request.getParameter("editQuestionId"))) {

				if (UtilValidate.isEmpty(request.getParameter("showTopicId"))) {
					String errMsg = "showTopicId required fields on the form and can't be empty.";
					editResultMap.put("ERROR_MESSAGE", errMsg);
					request.setAttribute(ConstantNames.RESULT_MAP, editResultMap);
					return ConstantNames.ERROR;
				}
				GenericValue topicName = EntityQuery.use(delegator).from(ConstantNames.TOPIC_MASTER)
						.where(ConstantNames.TOPIC_ID, request.getParameter("showTopicId")).cache().queryOne();
				request.setAttribute(ConstantNames.TOPIC_NAME, topicName.getString(ConstantNames.TOPIC_NAME));

				List<GenericValue> questionList = EntityQuery.use(delegator).from(ConstantNames.QUESTION_MASTER)
						.where(ConstantNames.TOPIC_ID, request.getParameter("showTopicId"), ConstantNames.THEW_DATE,
								null)
						.cache().queryList();
				if (UtilValidate.isEmpty(questionList)) {
					String errMsg = "there is no topic to be added.";
					editResultMap.put("ERROR_MESSAGE", errMsg);
					request.setAttribute(ConstantNames.RESULT_MAP, editResultMap);
					return ConstantNames.ERROR;
				}
				request.setAttribute(ConstantNames.RESULT_MAP, questionList);
			} else {

				long questionId = Long.parseLong(request.getParameter("editQuestionId"));
				GenericValue editQuestionValue = EntityQuery.use(delegator).from(ConstantNames.QUESTION_MASTER)
						.where(ConstantNames.QUESTION_ID, questionId).cache().queryOne();
				if (UtilValidate.isEmpty(editQuestionValue)) {
					String errMsg = "there is no Question Added to be Edit.";
					editResultMap.put("ERROR_MESSAGE", errMsg);
					request.setAttribute(ConstantNames.RESULT_MAP, editResultMap);
					return ConstantNames.ERROR;
				}
				request.setAttribute("editQuestionMap", editQuestionValue);
			}

		} catch (GenericEntityException e) {
			e.printStackTrace();
		}

		return ConstantNames.SUCCESS;

	}
}
