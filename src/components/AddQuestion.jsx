import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const AddQuestion = () => {
  const { id, value, noq, tId, qId, fD } = useParams();
  const [titleName, setTitleName] = useState("Add-Question");
  const [formDatas, setFormData] = useState({
    questionId: qId || "",
    questionDetail: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    optionE: "",
    answer: "",
    numAnswers: "",
    difficultyLevel: "",
    answerValue: "",
    negativeMarkValue: "",
    fromDate: fD || "",
  });
  const setValues = (e) => {
    const { name, value } = e.currentTarget;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    // setFormData({ ...formDatas, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const goToAnotherPage = (flags) => {
    flags
      ? navigate(
        `/admin/view-exam-topic/view-question/${id}/${value}/${noq}/${tId}`
      )
      : navigate(
        `/admin/view-exam-topic/add-question/${id}/${value}/${noq}/${tId}`
      );
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const formData = new URLSearchParams();
    for (const [key, value] of data) {
      console.log(`key..${key},value..${value}`);
      formData.append(key, value);
    }
    fetch("https://localhost:8443/exammodule/control/add-question", {
      method: "POST",
      credentials: "include",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.resultMap, "i am data ");

        if (data.success === "success") {
          goToAnotherPage(true);
        }

        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  useEffect(() => {
    if (qId != null) {
      setTitleName("Edit-Topic");
      async function fetchData() {
        const response = await fetch(
          `https://localhost:8443/exammodule/control/show-question?editQuestionId=${qId}`
        );
        const data = await response.json();
        console.log("editQuestionMap", data.editQuestionMap);
        setFormData(data.editQuestionMap);
      }
      fetchData();
    }
  }, []);

  return (
    <div className="row justify-content-center mt-2">
      <div className="ps-5">
        <nav className="myStyle">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-muted">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/admin" className="text-muted">
                Admin
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link
                to={`/admin/view-exam-topic/${id}/${value}/${noq}`}
                className="text-muted"
              >
                View-topic
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link
                to={`/admin/view-exam-topic/view-question/${id}/${value}/${noq}/${tId}`}
                className="text-muted"
              >
                View-Question
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="">{titleName}</Link>
            </li>
          </ol>
        </nav>
      </div>
      <div className="col-8 mb-5">
        <div className="card textcolor">
          <div className=" formHeaderColour">
            <div className="card-header text-center text-dark ">
              <h2>{titleName}</h2>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label>Question Id</label>
                <input type="hidden" name="questionId" value={qId} />
                <input type="text" className="form-control" disabled={true} placeholder={qId} />
              </div>

              <div className="form-group">
                <label>Question Detail</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="questionDetail"
                  onChange={setValues}
                  value={formDatas.questionDetail}
                  placeholder="Question Detail.."
                />
              </div>

              <div className="form-group">
                <label>Option A</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="optionA"
                  onChange={setValues}
                  value={formDatas.optionA}
                  placeholder="Enter Option A"
                />
              </div>

              <div className="form-group">
                <label>Option B</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="optionB"
                  onChange={setValues}
                  value={formDatas.optionB}
                  placeholder="Enter Option B"
                />
              </div>

              <div className="form-group">
                <label>Option C</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="optionC"
                  onChange={setValues}
                  value={formDatas.optionC}
                  placeholder="Enter Option c"
                />
              </div>

              <div className="form-group">
                <label>Option D</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="optionD"
                  onChange={setValues}
                  value={formDatas.optionD}
                  placeholder="Enter Option D"
                />
              </div>

              <div className="form-group">
                <label>Option E</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="optionE"
                  onChange={setValues}
                  value={formDatas.optionE}
                  placeholder="Enter Option E"
                />
              </div>

              <div className="form-group">
                <label>Answer</label>
                <input
                  type="text"
                  className="form-control"
                  name="answer"
                  onChange={setValues}
                  value={formDatas.answer}
                  placeholder="Enter Answer"
                />
              </div>

              <div className="form-group">
                <label>NumAnswers</label>
                <input
                  type="text"
                  className="form-control"
                  name="numAnswers"
                  onChange={setValues}
                  value={formDatas.numAnswers}
                  placeholder="Enter NumAnswers"
                />
              </div>
              <div className="row"> <input type="hidden" name="fromDate" value={formDatas.fromDate} /></div>
              <div className="form-group">
                <label>QuestionType</label>
                <select
                  type="text"
                  name="questionType"
                  className="form-control"
                >
                  <option value="QT_SC">Single Choice</option>
                  <option value="QT_MC">Multiple Choice</option>
                  <option value="QT_TF">True or False</option>
                  <option value="QT_FIB">Fill in the Blanks</option>
                  <option value="QT_DA">Detailed Answer</option>
                </select>
              </div>

              <div className="form-group">
                <label>DifficultyLevel</label>
                <input
                  type="text"
                  className="form-control"
                  name="difficultyLevel"
                  onChange={setValues}
                  value={formDatas.difficultyLevel}
                  placeholder="Enter difficultyLevel"
                />
              </div>

              <div className="form-group">
                <label>AnswerValue</label>
                <input
                  type="text"
                  className="form-control"
                  name="answerValue"
                  onChange={setValues}
                  value={formDatas.answerValue}
                  placeholder="Enter AnswerValue"
                />
              </div>

              <div className="form-group">
                <label>TopicId</label>
                <input type="hidden" name="topicId" value={tId} />
                <input type="text" className="form-control" placeholder={tId} />
              </div>

              <div className="form-group">
                <label>NegativeMarkValue</label>
                <input
                  type="Text"
                  className="form-control"
                  name="negativeMarkValue"
                  onChange={setValues}
                  value={formDatas.negativeMarkValue}
                  placeholder="Enter NegativeMarkValue"
                />
              </div>

              <div className="form-group d-flex mx-4">
                <div className="mx-4">
                  <button type="submit" className="btn btn-outline-success">
                    Submit
                  </button>
                </div>
                <div className="mx-0">
                  <button type="reset" className="btn btn-outline-warning">
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
