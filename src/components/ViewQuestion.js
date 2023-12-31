import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PORT, PROTOCOL } from './ExamConstants';
import DeleteModal from "./DeleteModal";
const ViewQuestion = () => {
  const { id, value, noq, tId } = useParams();
  const navigate = useNavigate();
  const [questionData, setquestionData] = useState([]);
  const [topicName, setTopicName] = useState();
  const url = `${PROTOCOL}://${window.location.hostname}:${PORT}`;

  async function fetchData() {
    try {
      const response = await fetch(
        `${url}/exammodule/control/show-question?showTopicId=${tId}`, { credentials: "include" }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const formData = await response.json();
      if (formData.notLogin === "notLogin") {
        navigate("/")
      }
      setTopicName(formData.topicName);
      setquestionData(formData.resultMap);


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  useEffect(() => {

    fetchData();
  }, []);

  async function deleteQuestionId(ID) {

    try {
      const response = await fetch(
        `${url}/exammodule/control/add-question?deleteQuestionId=${ID}`, { credentials: "include" });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const deleteData = await response.json();
      if (deleteData.successDelete === "success") {
        fetchData();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div>
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
                Topics
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="#">Question</Link>
            </li>
          </ol>
        </nav>
        <button
          className="btn btn-outline-info fw-bold border-2">
          <Link
            to={`/admin/view-exam-topic/add-question/${id}/${value}/${noq}/${tId}`}
            className="bread text-dark fst-italic"
          >
            Add Question
          </Link>
        </button>
      </div>
      <h4 className="textcolor fst-italic table fw-bold text-dark text-center ">
        List of Question
      </h4>
      <div className="row  justify-content-center mt-2 text-center textcolor ">
        <div className="col-md-11">
          <table className="table table-striped table-borderless fst-italic border border-3">
            <thead className="formHeaderColour ">
              <tr>
                <th scope="col">Exam-Name</th>
                <th scope="col">Topic-Id</th>
                <th scope="col">Topic-Name</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-middle">
                <th scope="row">{value}</th>
                <th scope="row">{tId}</th>
                <td className="fw-bold">{topicName}</td>
              </tr>
              <tr>
                <td colSpan="4">
                  {questionData.length > 0 ? (
                    <table className="table mb-0  table-borderless fst-italic table-hover">
                      <thead className="formHeaderColour">
                        <tr>
                          <th scope="col">Question-Id</th>
                          <th scope="col">Question-Type</th>
                          <th scope="col">Edit</th>
                          <th scope="col">View</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(questionData).map(([key, values], index) => (
                          <tr className="align-middle" key={key}>
                            <th scope="row">{values.questionId}</th>
                            <th>{values.questionType}</th>

                            <td>
                              <Link
                                to={`/admin/view-exam-topic/edit-question/${id}/${value}/${noq}/${values.topicId}/${values.questionId}/${value.fromDate}`}
                                className=" justify-content-center d-flex"
                              >
                                <i
                                  className="bi bi-pen-fill text-dark"
                                  title="Edit-Question"
                                ></i>
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/admin/view-exam-topic/question/${id}/${value}/${noq}/${values.topicId}/${values.questionId}`}
                                className="justify-content-center d-flex"
                              >
                                <i
                                  className=" bi bi-folder-symlink-fill  text-info"
                                  title="View-Question"
                                ></i>
                              </Link>
                            </td>
                            <td>
                              <button className="px-4 deleteLink" data-bs-toggle="modal" data-bs-target={`#staticBackdrop${index}`}>
                                <i
                                  className="bi bi-trash-fill text-danger" title="Delete-Question"
                                ></i>
                              </button>
                              <DeleteModal index={`staticBackdrop${index}`} onClick={() => { deleteQuestionId(values.questionId) }} name={""} id={values.questionId} type={"Question"} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No Question To Be Added For This Topic</p>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewQuestion;
