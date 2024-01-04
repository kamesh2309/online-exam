import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import { PORT, PROTOCOL } from "./ExamConstants";
import DeleteModal from "./DeleteModal";

const Admin = () => {
  const [examData, setExamData] = useState([]);
  const navigate = useNavigate();
  const [deteleModal, setDeleteModal] = useState(false);

  const url = `${PROTOCOL}://${window.location.hostname}:${PORT}`;

  async function fetchData() {
    try {
      const response = await fetch(
        `${url}/exammodule/control/show-exams`, {
        credentials: "include",
      }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const formData = await response.json();

      if (formData.notLogin === "notLogin") {
        navigate("/")
      }
      setExamData(formData.examMap);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {

    fetchData();
  }, []);
  async function deleteExamId(ID) {
    try {
      const response = await fetch(
        `${url}/exammodule/control/examMaster?deleteExamId=${ID}`,
        {
          credentials: "include",
        });
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
      <div className="row">
        <div className="ps-5">
          <nav className="myStyle">
            <ol className="breadcrumb">
              <li className="breadcrumb-item ">
                <Link to="/" className="text-muted">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#" >
                  Admin
                </Link>
              </li>
            </ol>
          </nav>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className=" btn btn-outline-info fw-bold border-2 " >
              <Link to="/add-exam" className="bread text-dark fst-italic">
                Add-Exam
              </Link>
            </button>
            <button
              type="button"
              className=" btn btn-outline-info fw-bold border-2 me-5" >
              <Link to="/admin/user-exam-mapping" className="bread text-dark fst-italic  ">
                Add-User
              </Link>
            </button>

          </div>
        </div>
        <div className="row justify-content-center pt-4 ">
          {examData ? Object.entries(examData).map(([key, value], index) => (

            <div className="col-lg-3 tile-height justify-content-center d-flex" key={key}>
              <div style={{ marginBottom: "50px" }}>
                <div
                  className="card border border-1 rounded cardModal"
                  style={{ width: "13rem", height: "9rem" }}
                >
                  <div
                    className="card-body"
                    style={{ backgroundColor: "#e6f7ff" }}
                  >
                    <h4
                      className="text-center fw-bold"
                      style={{ fontFamily: "Times New Roman" }}
                    >
                      {value.examId} - {value.examName}
                    </h4>
                    {/* <h5
                      className="card-subtitle mb-2 text-muted fw-bold"
                      style={{ fontFamily: "Times New Roman" }}
                    ></h5> */}
                    <div className="position-absolute icons">
                      <Link to={`/edit-exam/${value.examId}/${value.fromDate}`} className="px-4">
                        <i
                          className="bi bi-pencil-square text-dark" title="Edit-Exam"
                        ></i>
                      </Link>

                      <Link to={`/admin/view-exam-topic/${value.examId}/${value.examName}/${value.noOfQuestions}`} className="px-3">
                        <i className="bi bi-eye-fill text-success" title="View-Topic"></i>
                      </Link>

                      <button className="px-4 deleteLink" data-bs-toggle="modal" data-bs-target={`#staticBackdrop${index}`}>
                        <i
                          className="bi bi-trash-fill text-danger" title="Delete-Exam"
                        ></i>
                      </button>
                       <DeleteModal index={`staticBackdrop${index}`} onClick={() => { deleteExamId(value.examId) }} name={value.examName} id={value.examId} type={"Exam"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) : <p className="myStyle text-center fs-2">No Exam To Be Added For This Topic</p>}
        </div>
      </div>
    </div>
  );
};

export default Admin;
