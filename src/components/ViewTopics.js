import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, } from "react-router-dom";
import { PORT, PROTOCOL } from './ExamConstants';
import DeleteModal from "./DeleteModal";
const ViewTopics = () => {
  const url = `${PROTOCOL}://${window.location.hostname}:${PORT}`;
  const navigate = useNavigate();
  const { id, value, noq } = useParams();
  const [topicData, setTopicData] = useState([]);
  const [disable, setDisable] = useState(false);
  const [disableAddUser, setDisableAddUser] = useState(false);
  async function fetchData() {
    try {
      const response = await fetch(
        `${url}/exammodule/control/show-topic?showExamId=${id}`
        , { credentials: "include" });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const formData = await response.json();
      if (formData.notLogin === "notLogin") {
        navigate("/")
      }
      setTopicData(formData.resultMap);

      formData.questionsPerExam >= 100 ? setDisable(true) : setDisable(false);
      formData.questionsPerExam < 100 ? setDisableAddUser(true) : setDisableAddUser(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  async function deleteTopicId(ID) {

    try {
      const response = await fetch(
        `${url}/exammodule/control/add-topic?deleteTopicId=${ID}&deleteExamId=${id}`, { credentials: "include" });

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
              <Link to="#">Topics</Link>
            </li>
          </ol>
        </nav>
        <div className="d-flex justify-content-between ">
          <button
            className={`${disable
              ? "disabled btn btn-outline-info  "
              : "btn btn-outline-info fw-bold border-2"
              }`}
          >
            <Link
              to={`/admin/view-exam-topic/add-topic/${id}/${value}/${noq}`}
              className="bread text-dark fst-italic"
            >
              Add Topic
            </Link>
          </button>
          {disableAddUser ? <button className=" cursor-not text-muted  btn btn-outline-info fw-bold border-2 me-5 bread text-dark fst-italic">
            Add-User
          </button> : <button
            className=" btn btn-outline-info fw-bold border-2 me-5" >
            <Link to={`/admin/view-exam-topic/user-exam-mapping/${id}/${value}/${noq}`} className="bread text-dark fst-italic">
              Add-User
            </Link>
          </button>}
        </div>
      </div>
      <h4 className="textcolor fst-italic table fw-bold text-dark text-center ">
        List of Topics
      </h4>
      <div className="row justify-content-center mt-2 text-center textcolor ">
        <div className="col-md-11">
          <table className="table table-striped table-borderless fst-italic border border-3">
            <thead style={{ backgroundColor: "red" }} className="formHeaderColour">
              <tr>
                <th scope="col">Exam-Id</th>
                <th scope="col">Exam-Name</th>
                <th scope="col">Questions-Per-Exam</th>
                <th scope="col">Exam-Per-User</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-middle">
                <th scope="row">{id}</th>
                <td className="fw-bold">{value}</td>
                <td className="fw-bold">{noq}</td>
                <td>
                  {disableAddUser ?
                    <div className="tooltips">
                      <div className="bi bi-people-fill text-primary" >
                      <span className="tooltiptext">Add Question 100% to Add-User</span>
                      </div>
                    </div>
                    : <Link to={`/admin/view-exam-topic/view-exam-user/${id}/${value}/${noq}`}>
                      <i
                        className="bi bi-people-fill text-primary"
                        title="view-Exam-User"></i>
                    </Link>}
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  {topicData.length > 0 ? (
                    <table className="table mb-0  table-borderless fst-italic table-hover">
                      <thead className="formHeaderColour">
                        <tr>
                          <th scope="col">Topic-Id</th>
                          <th scope="col">percentage</th>
                          <th scope="col">Topic-Pass-Percentage</th>
                          <th scope="col">No-Of-Question</th>
                          <th scope="col">Add</th>
                          <th scope="col">Edit</th>
                          <th scope="col">View</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(topicData).map(([key, values], index) => (
                          <tr className="align-middle" key={key}>
                            <th scope="row">{values.topicId}</th>
                            <td>{values.percentage}</td>
                            <td>{values.topicPassPercentage}</td>
                            <td>{values.questionsPerExam}</td>

                            <td>
                              <Link
                                to={`/admin/view-exam-topic/add-question/${id}/${value}/${noq}/${values.topicId}`}
                                className=" justify-content-center d-flex"
                              >
                                <i
                                  className="bi bi-plus-circle-fill  text-success"
                                  title="Add-Question"
                                ></i>
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/admin/view-exam-topic/edit-topic/${id}/${value}/${noq}/${values.topicId}`}
                                className=" justify-content-center d-flex" >
                                <i
                                  className="bi bi-pen-fill text-dark"
                                  title="Edit-Topic"
                                ></i>
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/admin/view-exam-topic/view-question/${id}/${value}/${noq}/${values.topicId}`}
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
                                  className="bi bi-trash-fill text-danger" title="Delete-Topic"
                                ></i>
                              </button>
                              <DeleteModal index={`staticBackdrop${index}`} onClick={() => { deleteTopicId(values.topicId) }} name={"-"} id={values.topicId} type={"Topic"} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No Exam To Be Added For This Topic</p>
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

export default ViewTopics;
