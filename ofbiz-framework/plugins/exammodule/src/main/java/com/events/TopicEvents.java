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

import com.constantname.ConstantNames;
import com.utilhelpervastpro.LoginSessionChecker;

public class TopicEvents {
	public static final String module = TopicEvents.class.getName();

	public static String creatUpdateDeleteTopic(HttpServletRequest request, HttpServletResponse response) {
		LocalDispatcher dispatcher = (LocalDispatcher) request.getAttribute(ConstantNames.DISPATCHER);
		Delegator delegator = (Delegator) request.getAttribute(ConstantNames.DELEGATOR);
		Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
		Map<String, Object> topicResultMap = new HashMap<>();
		if (LoginSessionChecker.sessionChecker(request, response)=="false") {
			return ConstantNames.ERROR;
		}
		try {
			if (UtilValidate.isEmpty(request.getParameter("deleteTopicId"))) {

				if (UtilValidate.isEmpty(request.getParameter("topicName"))
						|| UtilValidate.isEmpty(request.getParameter("examId"))
						|| UtilValidate.isEmpty(request.getParameter("percentage"))
						|| UtilValidate.isEmpty(request.getParameter("topicPassPercentage"))
						|| UtilValidate.isEmpty(request.getParameter("questionsPerExam"))) {
					String errMsg = "Fields are required fields on the form and can't be empty.";
					topicResultMap.put("ERROR_MESSAGE", errMsg);
					request.setAttribute(ConstantNames.RESULT_MAP, topicResultMap);
					return ConstantNames.ERROR;
				}
				double percentageToSubtract = Double.parseDouble(request.getParameter("percentage")) / 100.0;
				int totalQuestions = Integer.parseInt(request.getParameter("questionsPerExam"));
				int questionsForTopic = (int) (totalQuestions * percentageToSubtract);
				// int remainingQuestions = totalQuestions - questionsForTopic;

				List<GenericValue> topicList = EntityQuery.use(delegator).from(ConstantNames.Exam_Topic_Mapping)
						.where(ConstantNames.EXAM_ID, request.getParameter("examId")).cache().queryList();
				int numberOfQuestionAdded = 0;
				for (GenericValue numberOfQuestion : topicList) {
					int numberofQuestion = Integer.parseInt(numberOfQuestion.getString("questionsPerExam"));
					numberOfQuestionAdded += numberofQuestion;
				}
				if (UtilValidate.isEmpty(request.getParameter("topicId"))) {

					int totalQuestion = questionsForTopic + numberOfQuestionAdded;
					if (totalQuestion > totalQuestions) {
						String errMsg = "Add the question to the topic not more then "
								+ request.getParameter("questionsPerExam");
						request.setAttribute("maxQuestion", errMsg);
						return ConstantNames.ERROR;
					}
					Map<String, Object> AddTopics = dispatcher.runSync("AddTopic",
							UtilMisc.toMap(ConstantNames.TOPIC_NAME, request.getParameter("topicName"),
									ConstantNames.FROM_DATE, currentTimestamp));

					if (UtilValidate.isEmpty(AddTopics)) {
						String errMsg = "The Add-Topic EntityQuery is not success .";
						topicResultMap.put("topic", errMsg);
						request.setAttribute(ConstantNames.RESULT_MAP, topicResultMap);
						return ConstantNames.ERROR;

					}

					String topicId = (String) AddTopics.get(ConstantNames.TOPIC_ID);

					if (UtilValidate.isEmpty(topicId)) {
						String errMsg = "The Add-Topic EntityQuery is not success .";
						topicResultMap.put("topic", errMsg);
						request.setAttribute(ConstantNames.RESULT_MAP, topicResultMap);
						return ConstantNames.ERROR;

					}
					Map<String, Object> topicExamMap = new HashMap<String, Object>();
					topicExamMap.put(ConstantNames.TOPIC_ID, topicId);
					topicExamMap.put(ConstantNames.EXAM_ID, request.getParameter("examId"));
					topicExamMap.put(ConstantNames.PERCENTAGE, request.getParameter("percentage"));
					topicExamMap.put(ConstantNames.TOPIC_PASS_PERCENTAGE, request.getParameter("topicPassPercentage"));
					topicExamMap.put(ConstantNames.QUESTIONS_PER_EXAM, questionsForTopic);
					Map<String, Object> addTopicExamMapping = dispatcher.runSync("TopicMapping", topicExamMap);

					if (ServiceUtil.isError(addTopicExamMapping)) {
						String errMsg = "The Exam_Topic_Mapping EntityQuery is not success .";
						topicResultMap.put("topic", errMsg);
						request.setAttribute(ConstantNames.RESULT_MAP, topicResultMap);
						return ConstantNames.ERROR;
					}
				} else {

					GenericValue questionsPerTopic = EntityQuery.use(delegator).from(ConstantNames.Exam_Topic_Mapping)
							.where(ConstantNames.EXAM_ID, request.getParameter("examId"), ConstantNames.TOPIC_ID,
									request.getParameter("topicId"))
							.cache().queryOne();
					int topicQuestion = Integer.parseInt(questionsPerTopic.getString("questionsPerExam"));
					int limitQuestion = numberOfQuestionAdded - topicQuestion;

					int canStoreQuestion = limitQuestion + questionsForTopic;
					if (canStoreQuestion > totalQuestions) {
						String errMsg = "Add the question to the topic not more then "
								+ request.getParameter("questionsPerExam");
						request.setAttribute("maxQuestion", errMsg);
						return ConstantNames.ERROR;
					}
					Map<String, Object> editTopic = dispatcher.runSync("EditTopic",
							UtilMisc.toMap(ConstantNames.TOPIC_ID, request.getParameter("topicId"),
									ConstantNames.TOPIC_NAME, request.getParameter("topicName"),
									ConstantNames.FROM_DATE, request.getParameter("fromDate")));
					if (ServiceUtil.isError(editTopic)) {
						String errMsg = "The Edit_Topic_Mapping EntityQuery is not success .";
						topicResultMap.put("topic", errMsg);
						request.setAttribute(ConstantNames.RESULT_MAP, topicResultMap);
						return ConstantNames.ERROR;
					}

					Map<String, Object> topicExamMap = new HashMap<String, Object>();
					topicExamMap.put(ConstantNames.TOPIC_ID, request.getParameter("topicId"));
					topicExamMap.put(ConstantNames.EXAM_ID, request.getParameter("examId"));
					topicExamMap.put(ConstantNames.PERCENTAGE, request.getParameter("percentage"));
					topicExamMap.put(ConstantNames.TOPIC_PASS_PERCENTAGE, request.getParameter("topicPassPercentage"));
					topicExamMap.put(ConstantNames.QUESTIONS_PER_EXAM, questionsForTopic);
					Map<String, Object> editTopicMapping = dispatcher.runSync("EditTopicMapping", topicExamMap);
					if (ServiceUtil.isError(editTopicMapping)) {
						String errMsg = "The Edit_Topic_Mapping EntityQuery is not success .";
						topicResultMap.put("topic", errMsg);
						request.setAttribute(ConstantNames.RESULT_MAP, topicResultMap);
						return ConstantNames.ERROR;
					}

				}

			} else {
				dispatcher.runSync("DeleteTopic", UtilMisc.toMap(ConstantNames.TOPIC_ID,
						request.getParameter("deleteTopicId"), ConstantNames.THEW_DATE, currentTimestamp));
				dispatcher.runSync("DeleteTopicMapping",
						UtilMisc.toMap(ConstantNames.TOPIC_ID, request.getParameter("deleteTopicId"),
								ConstantNames.EXAM_ID, request.getParameter("deleteExamId")));
				request.setAttribute("successDelete", ConstantNames.SUCCESS);

			}
		} catch (GenericServiceException | GenericEntityException e) {
			String errMsg = "Unable to create new records in TopicMaster entity: " + e.toString();
			topicResultMap.put("ERROR_MESSAGE", errMsg);

		}

		request.setAttribute(ConstantNames.RESULT_MAP, topicResultMap);
		request.setAttribute(ConstantNames.RESULT_MAP, ConstantNames.SUCCESS);

		return ConstantNames.SUCCESS;
	}

	public static String getTopic(HttpServletRequest request, HttpServletResponse response) {

		Delegator delegator = (Delegator) request.getAttribute(ConstantNames.DELEGATOR);
		Map<String, Object> editResultMap = new HashMap<String, Object>();
		if (LoginSessionChecker.sessionChecker(request, response)=="false") {
			return ConstantNames.ERROR;
		}
		try {
			if (UtilValidate.isEmpty(request.getParameter("showExamId"))) {
				String errMsg = "showExamId required fields on the form and can't be empty.";
				editResultMap.put("ERROR_MESSAGE", errMsg);
				request.setAttribute(ConstantNames.RESULT_MAP, editResultMap);
				return ConstantNames.ERROR;
			}

			GenericValue examList = EntityQuery.use(delegator).from(ConstantNames.EXAM_MASTER)
					.where(ConstantNames.EXAM_ID, request.getParameter("showExamId")).cache().queryOne();

			if (UtilValidate.isEmpty(examList)) {
				String errMsg = "there is exam to be added.";
				editResultMap.put("ERROR_MESSAGE", errMsg);
				request.setAttribute(ConstantNames.RESULT_MAP, editResultMap);
				return ConstantNames.ERROR;
			}

			request.setAttribute("examList", examList);

			List<GenericValue> topicList = EntityQuery.use(delegator).from(ConstantNames.Exam_Topic_Mapping)
					.where(ConstantNames.EXAM_ID, request.getParameter("showExamId")).cache().queryList();

			if (UtilValidate.isEmpty(topicList)) {
				String errMsg = "there is no topic to be added.";
				editResultMap.put("ERROR_MESSAGE", errMsg);
				request.setAttribute(ConstantNames.RESULT_MAP, editResultMap);
				return ConstantNames.ERROR;
			}
			int numberOfQuestionAdded = 0;
			for (GenericValue numberOfQuestion : topicList) {
				int numberofQuestion = Integer.parseInt(numberOfQuestion.getString("questionsPerExam"));
				numberOfQuestionAdded += numberofQuestion;
			}
			request.setAttribute("questionsPerExam", numberOfQuestionAdded);

			/* ---------------------------Edit-topics Values---------------------------- */
			if (UtilValidate.isNotEmpty(request.getParameter("showExamId"))
					&& UtilValidate.isNotEmpty(request.getParameter("editTopicId"))) {
				GenericValue examTopicMapping = EntityQuery.use(delegator).from(ConstantNames.Exam_Topic_Mapping)
						.where(ConstantNames.EXAM_ID, request.getParameter("showExamId"), ConstantNames.TOPIC_ID,
								request.getParameter("editTopicId"))
						.cache().queryOne();
				if (UtilValidate.isEmpty(examTopicMapping)) {
					String errMsg = "there is value to be added for thie topic ";
					editResultMap.put("ERROR_MESSAGE", errMsg);
					request.setAttribute(ConstantNames.RESULT_MAP, editResultMap);
					return ConstantNames.ERROR;
				}
				request.setAttribute("examTopicMapping", examTopicMapping);
				GenericValue topicId = EntityQuery.use(delegator).from(ConstantNames.TOPIC_MASTER)
						.where(ConstantNames.TOPIC_ID, request.getParameter("editTopicId")).cache().queryOne();

				request.setAttribute("topicName", topicId.get(ConstantNames.TOPIC_NAME));
				request.setAttribute("fromDate", topicId.get(ConstantNames.FROM_DATE));

			}

			request.setAttribute(ConstantNames.RESULT_MAP, topicList);
		} catch (GenericEntityException e) {
			e.printStackTrace();
		}

		return ConstantNames.SUCCESS;
	}

}
