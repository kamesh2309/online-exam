import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { PORT, PROTOCOL } from "../ExamConstants";

const ViewExamInformation = () => {
  const { uId, eId, eDate, sDate } = useParams();
  const [examDetails, setExamDeatils] = useState([]);
  const [topicDetails, setTopicDetails] = useState([]);

  const navigate = useNavigate();
  const url = `${PROTOCOL}://${window.location.hostname}:${PORT}`;
  function startExam() {
    navigate(`/user/${uId}/exam-details/${eId}/exam`)
  }

  async function fetchData() {
    const response = await fetch(`${url}/exammodule/control/show-exam-user?partyInfo=${uId}&examInfo=${eId}`,
      { credentials: "include" });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const formData = await response.json();
    if (formData.notLogin === "notLogin") {
      navigate("/")
    }
    setExamDeatils(formData.examDetails);
    setTopicDetails(formData.topicDetails);

  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div>
      <div className="px-lg-5 px-3">
        <nav className="myStyle small-content-text">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-muted">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/user/${uId}`} className="text-muted">
                User
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="#">Exam-Information</Link>
            </li>
          </ol>
        </nav>
      </div>
      <h4 className="textcolor fst-italic table fw-bold text-dark text-center ">
        Exam details
      </h4>
      <div className="row justify-content-center mt-2 text-center textcolor">
        <div className="col-lg-11 col-12">
          <table className="table table-striped table-borderless fst-italic border border-3  small-content-text ">
            <thead style={{ backgroundColor: "red" }} className="formHeaderColour">
              <tr>
                <th scope="col">Exam-Id</th>
                <th scope="col">Exam-Name</th>
                <th scope="col">No-Of-Questions</th>
                <th scope="col">Exam-Duration</th>
                <th scope="col">Negative-Mark</th>
                <th scope="col">Status</th>

              </tr>
            </thead>
            <tbody>
              <tr className="align-middle">
                <th scope="row">{eId}</th>
                <td className="fw-bold">{examDetails.examName}</td>
                <td className="fw-bold">{examDetails.noOfQuestions}</td>
                <td className="fw-bold">{examDetails.durationMinutes} min</td>
                <td className="fw-bold">{examDetails.negativeMarkValue}</td>
                <td className="fw-bold colour-box">{ }</td>

              </tr>
              <tr>
                <td colSpan="6">
                  <table className="table mb-0  table-borderless fst-italic table-hover">
                    <thead className="formHeaderColour">
                      <tr>
                        <th scope="col">Topic-Id</th>
                        <th scope="col">Topic-Name</th>
                        <th scope="col">percentage</th>
                        <th scope="col">Topic-Pass-Percentage</th>
                        <th scope="col">No-Of -Question</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(topicDetails).map(([key, value]) => (
                        <tr className="align-middle" key={key} >
                          <th scope="row">{value.topicId}</th>
                          <td>{value.topicName}</td>
                          <td>{value.percentage}%</td>
                          <td>{value.topicPassPercentage}%</td>
                          <td>{value.questionsPerExam}</td>
                        </tr>
                      ))
                      }</tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
             {eDate == "true" ? <button className="btn btn-danger fw-bold fst-italic border-2 me-5 small-button" disabled >Exam-Expired</button> : sDate == "true" ? <button className="btn btn-outline-success fw-bold fst-italic border-2 me-5 small-button" onClick={startExam}>Start-Exam</button>
              : <button className="btn btn-outline-warning fw-bold fst-italic border-2 me-5 small-button" disabled >Exam-Not-Started</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewExamInformation
