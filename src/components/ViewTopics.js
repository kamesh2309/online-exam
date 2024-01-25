import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, } from "react-router-dom";
import { PORT, PROTOCOL } from './ExamConstants';
import { components } from "react-select";

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
     console.log(formData.questionAdded,"...........")
      formData.questionsPerExam >= noq  ? setDisable(true) : setDisable(false);
      formData.questionsPerExam < noq ? setDisableAddUser(true) : setDisableAddUser(false);
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
      <div className="px-lg-5 px-1">
        <nav className="myStyle small-content-text">
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
        <div className="d-lg-block d-none">
          <div className="d-flex justify-content-between ">
            <button
              className={`${disable
                ? "disabled btn btn-outline-info small-button"
                : "btn btn-outline-info fw-bold border-2 small-button "
                }`}
            >
              <Link
                to={`/admin/view-exam-topic/add-topic/${id}/${value}/${noq}`}
                className="bread text-dark fst-italic"
              >
                Add Topic
              </Link>
            </button>
            {disableAddUser ?
              <div className="tooltips">
                <span className="tooltiptext">Add Question 100% to Add-User</span>
                <button className=" cursor-not btn btn-secondary fw-bold border-2 bread text-dark fst-italic small-button ">
                  Add-User
                </button>
              </div> :
              <button className=" btn btn-outline-info fw-bold border-2 small-button" >
                <Link to={`/admin/view-exam-topic/user-exam-mapping/${id}/${value}/${noq}`} className="bread text-dark fst-italic">
                  Add-User
                </Link>
              </button>}
          </div>
        </div>
        <div className="d-flex justify-content-between d-block d-lg-none ">
          <button
            className={`${disable
              ? "disabled btn btn-outline-info small-button"
              : "btn btn-outline-info fw-bold border-2 small-button "
              }`}
          >
            <Link
              to={`/admin/view-exam-topic/add-topic/${id}/${value}/${noq}`}
              className="bread text-dark fst-italic"
            >
              Add Topic
            </Link>
          </button>
          <button
            className={`${disableAddUser
              ? "disabled btn btn-outline-info small-button"
              : "btn btn-outline-info fw-bold border-2 small-button "
              }`}
          >
            <Link to={`/admin/view-exam-topic/user-exam-mapping/${id}/${value}/${noq}`} className="bread text-dark fst-italic">
              Add-User
            </Link>
          </button>
        </div>
      </div>
      <h4 className="textcolor fst-italic table fw-bold text-dark text-center small-heading-text">
        List of Topics
      </h4>
      <div className="row justify-content-center mt-2 text-center textcolor">
        <div className="col-lg-11 d-lg-block d-none table-responsive">
          <table className="table table-striped table-borderless fst-italic border border-3">
            <thead style={{ backgroundColor: "red" }} className="formHeaderColour small-content-text fst-italic">
              <tr>
                <th scope="col">Exam-Id</th>
                <th scope="col">Exam-Name</th>
                <th scope="col">Questions-Per-Exam</th>
                <th scope="col">Exam-Per-User</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-middle small-content-text">
                <th scope="row">{id}</th>
                <td className="fw-bold">{value}</td>
                <td className="fw-bold">{noq}</td>
                <td>
                  {disableAddUser ?
                    <div className="tooltips">
                      <div className="text-muted bi bi-people-fill " >
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
                      <thead className="formHeaderColour small-content-text">
                        <tr>
                          <th scope="col">Topic-Id</th>
                          <th scope="col">percentage</th>
                          <th scope="col">Pass-Percentage</th>
                          <th scope="col">No-Of-Question</th>
                          <th scope="col">Add</th>
                          <th scope="col">Edit</th>
                          <th scope="col">View</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(topicData).map(([key, values], index) => (
                          <tr className="align-middle small-content-text" key={key}>
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
                              <button className="px-4 deleteLink" data-bs-toggle="modal" data-bs-target={`#staticBackdrop_desktop${index}`}>
                                <i
                                  className="bi bi-trash-fill text-danger" title="Delete-Topic"
                                ></i>
                              </button>
                              <DeleteModal index={`staticBackdrop_desktop${index}`} onClick={() => { deleteTopicId(values.topicId) }} name={"-"} id={values.topicId} type={"Topic"} />
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
        <div className="col-12 gx-0 d-lg-none d-block">
          <table className="table table-striped table-borderless fst-italic border border-3">
            <thead style={{ backgroundColor: "red" }} className="formHeaderColour small-content-text fst-italic">
              <tr>
                <th scope="col">Exam-Id</th>
                <th scope="col">Exam-Name</th>
                <th scope="col">Questions</th>
                <th scope="col">User</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-middle small-content-text">
                <th scope="row">{id}</th>
                <td className="fw-bold">{value}</td>
                <td className="fw-bold">{noq}</td>
                <td>
                  {disableAddUser ?

                    <div className="text-muted bi bi-people-fill " title="Add Question 100% to Add-User" > </div>
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
                      <thead className="formHeaderColour small-content-text">
                        <tr>
                          <th scope="col">Topic-Id</th>
                          <th scope="col">percentage</th>
                          <th scope="col">Pass-Percentage</th>
                          <th scope="col">No-Of-Question</th>
                          <th scope="col">Select-option</th>

                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(topicData).map(([key, values], index) => {

                          return (

                            <tr className="align-middle small-content-text" key={key}>
                              <th scope="row">{values.topicId}</th>
                              <td>{values.percentage}</td>
                              <td>{values.topicPassPercentage}</td>
                              <td>{values.questionsPerExam}</td>
                              <td>
                                <div className="accordion" id="accordionExample">
                                  <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                      <button className="accordion-button small-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls="collapseTwo">
                                        option
                                      </button>
                                    </h2>
                                    <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                      <div className="accordion-body p-0">
                                        <Link
                                          to={`/admin/view-exam-topic/add-question/${id}/${value}/${noq}/${values.topicId}`}
                                          className=" justify-content-center d-flex text-success text-decoration-none">
                                          Add-Question
                                        </Link>
                                        <Link to={`/admin/view-exam-topic/edit-topic/${id}/${value}/${noq}/${values.topicId}`}
                                          className=" justify-content-center d-flex text-dark text-decoration-none " >
                                          Edit-Topic
                                        </Link>
                                        <Link to={`/admin/view-exam-topic/view-question/${id}/${value}/${noq}/${values.topicId}`}
                                          className="justify-content-center d-flex text-primary text-decoration-none">View-Question
                                        </Link>
                                        <a href={`#staticBackdrop${index}`} className="deleteLink justify-content-center d-flex text-danger text-decoration-none" data-bs-toggle="modal">
                                          Delete-Topic
                                        </a>
                                      </div>
                                      <DeleteModal index={`staticBackdrop${index}`} onClick={() => { deleteTopicId(values.topicId) }} name={"-"} id={values.topicId} type={"Topic"} />
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
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
