package com.user.events;

import java.sql.Timestamp;
import java.time.LocalDateTime;
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

import com.constantname.ConstantNames;
import com.utilhelpervastpro.LoginSessionChecker;

public class ShowExamUserEvents {
	public static final String module = ShowExamUserEvents.class.getName();

	/**
	 * @param request
	 * @param response
	 * @return
	 */
	public static String showStudentsExam(HttpServletRequest request, HttpServletResponse response) {
		Delegator delegator = (Delegator) request.getAttribute(ConstantNames.DELEGATOR);
		Map<String, Object> studentExamMap = new HashMap<String, Object>();
		/**
		 * Checking Session having the userLogin
		 */
		if (LoginSessionChecker.sessionChecker(request, response) == "false") {
			return ConstantNames.ERROR;
		}

		try {
			/***
			 * Checking the partyInfo and examInfo is Null if it's Null this is show
			 * examDeatils to user
			 */
			if (UtilValidate.isEmpty(request.getParameter("partyInfo"))
					&& UtilValidate.isEmpty(request.getParameter("examInfo"))) {
				/**
				 * Checking weather the User is present or not
				 */
				GenericValue partyId = EntityQuery.use(delegator).from(ConstantNames.PARTY)
						.where(ConstantNames.PARTY_ID, request.getParameter("partyId")).cache().queryOne();
				/***
				 * Checking that the Query Success
				 */
				if (UtilValidate.isEmpty(partyId)) {
					String errMsg = "Invalid Party Id";
					studentExamMap.put("error_user", errMsg);
					request.setAttribute(ConstantNames.RESULT_MAP, studentExamMap);
					return ConstantNames.ERROR;
				}
				/***
				 * By using the PartyId From the request by using that Querying the exam assign
				 * to the user from the UserExamMapping Entity
				 */

				List<GenericValue> userExamIdList = EntityQuery.use(delegator).from(ConstantNames.USER_EXAM_MAPPING)
						.where(ConstantNames.PARTY_ID, request.getParameter("partyId")).cache().queryList();
				/***
				 * Checking that the Query Success
				 */
				if (UtilValidate.isEmpty(userExamIdList)) {
					String errMsg = "Exams are not assign to the user";
					studentExamMap.put("error_user", errMsg);
					request.setAttribute(ConstantNames.RESULT_MAP, studentExamMap);
					return ConstantNames.ERROR;
				}
				List<Map<String, Object>> userExamList = new ArrayList<Map<String, Object>>();
				/***
				 * From the userExamIdList we are iterating to get the each Exam that assign for
				 * that user
				 */
				for (GenericValue userExam : userExamIdList) {
					String examId = userExam.getString(ConstantNames.EXAM_ID);
					/***
					 * Here we are Querying the ExamDeatils from the Exam Master entity
					 */
					GenericValue examName = EntityQuery.use(delegator).from(ConstantNames.EXAM_MASTER)
							.where(ConstantNames.EXAM_ID, examId, ConstantNames.THEW_DATE, null).cache().queryOne();
					/***
					 * Checking that the Query Success
					 */
					if (UtilValidate.isNotEmpty(examName)) {
						Map<String, Object> examList = new HashMap<String, Object>();
						/**
						 * Here we are calling the method to check the Creation Date and Expired Date
						 */
						boolean showExamToUser = checkExamValidation(examName.getString(ConstantNames.CREATION_DATE),
								examName.getString(ConstantNames.EXPIRATION_DATE), examList);

						examList.put("showExamToUser", showExamToUser);
						examList.put(ConstantNames.EXAM_ID, examName.getString(ConstantNames.EXAM_ID));
						examList.put(ConstantNames.EXAM_NAME, examName.getString(ConstantNames.EXAM_NAME));
						/**
						 * Here we Split the date because we need Date not time
						 */
						String[] startDate = examName.getString(ConstantNames.CREATION_DATE).split(" ");
						examList.put(ConstantNames.CREATION_DATE, startDate[0]);
						/**
						 * Here we Split the date because we need Date not time
						 */
						String[] endDate = examName.getString(ConstantNames.EXPIRATION_DATE).split(" ");
						examList.put(ConstantNames.EXPIRATION_DATE, endDate[0]);
						/**
						 * Add the one Exam Data into the userExamList
						 */
						userExamList.add(examList);
					}

				}
				/***
				 * Here We are Querying the user Name From the Person Entity
				 */
				GenericValue userNameDetails = EntityQuery.use(delegator).from(ConstantNames.PERSON)
						.where(ConstantNames.PARTY_ID, request.getParameter("partyId")).cache().queryOne();
				/***
				 * Checking that the Query Success
				 */
				if (UtilValidate.isEmpty(userNameDetails)) {
					String errMsg = "Exams are not assign to the user";
					studentExamMap.put("error_user", errMsg);
					request.setAttribute(ConstantNames.RESULT_MAP, studentExamMap);
					return ConstantNames.ERROR;
				}

				String userName = userNameDetails.getString(ConstantNames.FIRST_NAME) + " "
						+ userNameDetails.getString(ConstantNames.LAST_NAME);
				/***
				 * Here we sending the Data through setAttribute
				 */
				request.setAttribute("userName", userName);
				request.setAttribute("userExamList", userExamList);

			} else {

				Map<String, Object> examMapDetails = new HashMap<String, Object>();
				/***
				 * Here we are Querying the ExamDeatils from the Exam Master entity
				 */
				GenericValue examDetails = EntityQuery.use(delegator).from(ConstantNames.EXAM_MASTER)
						.where(ConstantNames.EXAM_ID, request.getParameter("examInfo")).cache().queryOne();
				examMapDetails.put(ConstantNames.EXAM_NAME, examDetails.getString(ConstantNames.EXAM_NAME));
				examMapDetails.put(ConstantNames.NO_OF_QUESTIONS, examDetails.getString(ConstantNames.NO_OF_QUESTIONS));
				examMapDetails.put(ConstantNames.DURATION_MINUTES,
						examDetails.getString(ConstantNames.DURATION_MINUTES));
				examMapDetails.put(ConstantNames.PASS_PERCENTAGE, examDetails.getString(ConstantNames.PASS_PERCENTAGE));
				/**
				 * Here i'm converting String into Double and i TypeCaste into integer to get
				 * integer Value
				 */
				int negativeMarkValue = (int) Double
						.parseDouble(examDetails.getString(ConstantNames.NEGATIVE_MARK_VALUE));
				examMapDetails.put(ConstantNames.NEGATIVE_MARK_VALUE, negativeMarkValue);
				List<Map<String, Object>> topicListMapDetails = new ArrayList<Map<String, Object>>();
				/***
				 * Here i'm Querying the data's from ExamTopicMapping in that we get List of
				 * Topic That assigned for a Single Exam
				 */
				List<GenericValue> topicDetails = EntityQuery.use(delegator).from(ConstantNames.Exam_Topic_Mapping)
						.where(ConstantNames.EXAM_ID, request.getParameter("examInfo")).cache().queryList();
				Map<String, Object> topicMap = new HashMap<String, Object>();
				/***
				 * From the topicDetails we are iterating to get the each Topic that assign for
				 * that user
				 */
				for (GenericValue topicDetail : topicDetails) {
					String topicId = topicDetail.getString(ConstantNames.TOPIC_ID);

					topicMap.put(ConstantNames.TOPIC_ID, topicId);
					GenericValue topic = EntityQuery.use(delegator).from(ConstantNames.TOPIC_MASTER)
							.where(ConstantNames.TOPIC_ID, topicId).cache().queryOne();
					topicMap.put(ConstantNames.TOPIC_NAME, topic.getString(ConstantNames.TOPIC_NAME));
					/**
					 * Here i'm converting String into Double and i TypeCaste into integer to get
					 * integer Value
					 */
					int topicPassPercentage = (int) Double
							.parseDouble(topicDetail.getString(ConstantNames.TOPIC_PASS_PERCENTAGE));
					topicMap.put(ConstantNames.TOPIC_PASS_PERCENTAGE, topicPassPercentage);
					/**
					 * Here i'm converting String into Double and i TypeCaste into integer to get
					 * integer Value
					 */
					int percentage = (int) Double.parseDouble(topicDetail.getString(ConstantNames.PERCENTAGE));
					topicMap.put(ConstantNames.PERCENTAGE, percentage);
					topicMap.put(ConstantNames.QUESTIONS_PER_EXAM,
							topicDetail.getString(ConstantNames.QUESTIONS_PER_EXAM));
					/**
					 * Add the one Topic Data into the topicListMapDetails
					 */
					topicListMapDetails.add(topicMap);
				}
				/***
				 * Here we sending the Data through setAttribute
				 */
				request.setAttribute("examDetails", examMapDetails);
				request.setAttribute("topicDetails", topicListMapDetails);
			}
		} catch (GenericEntityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return ConstantNames.SUCCESS;

	}

	/**
	 * @param startDate
	 * @param expireDate
	 * @param examList
	 * @return
	 */
	public static boolean checkExamValidation(String startDate, String expireDate, Map<String, Object> examList) {
		/**
		 * Here i'm converting Sting to Timestamp
		 */
		Timestamp timeStampStartDate = Timestamp.valueOf(startDate);
		/**
		 * Here i'm converting Timestamp to LocalDateTime
		 */
		LocalDateTime start = timeStampStartDate.toLocalDateTime();
		/**
		 * Here i'm converting Sting to Timestamp
		 */
		Timestamp timeStampExpireDate = Timestamp.valueOf(expireDate);
		/**
		 * Here i'm converting Timestamp to LocalDateTime
		 */
		LocalDateTime expire = timeStampExpireDate.toLocalDateTime();
		/**
		 * Here i'm getting current LocalDateTime
		 */
		LocalDateTime now = LocalDateTime.now();
//		LocalDateTime yesterdayDate = now.minusDays(1);
		boolean startExam = false;
		/**
		 * Here i'm Checking that Exam After Start date and Before Expire date
		 */
		if ((now.isAfter(start) || now.isEqual(start)) && (now.isBefore(expire) || now.isEqual(expire))) {
			startExam = true;
		}
		/**
		 * Here i'm setting the exam which is expire
		 */
		if (now.isAfter(expire)) {
			examList.put("examExpired", true);
		} else {
			examList.put("examExpired", false);
		}
		return startExam;

	}

}
