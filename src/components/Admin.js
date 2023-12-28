import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { PORT, PROTOCOL } from "./ExamConstants";

const Admin = () => {
  const [examData, setExamData] = useState([]);

  const url = `${PROTOCOL}://${window.location.hostname}:${PORT}`;

  useEffect(() => {
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

        setExamData(formData.examMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  async function deleteExamId(ID) {

    try {
      const response = await fetch(
        `${url}/exammodule/control/examMaster?deleteExamId=${ID}`,
        {
          credentials: "include",
        }

      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const deleteData = await response.json();
      if (deleteData.successDelete === "success") {
        window.location.reload();
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
          {examData ? Object.entries(examData).map(([key, value]) => (

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
                          className="bi bi-pencil-square text-dark" title="Edit"
                        ></i>
                      </Link>

                      <Link to={`/admin/view-exam-topic/${value.examId}/${value.examName}/${value.noOfQuestions}`} className="px-3">
                        <i className="bi bi-eye-fill text-success" title="View"></i>
                      </Link>

                      <button onClick={() => { deleteExamId(value.examId) }} className="px-4 deleteLink">
                        <i
                          className="bi bi-trash-fill text-danger" title="Delete"
                        ></i>
                      </button>
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
