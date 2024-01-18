import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { PORT, PROTOCOL } from "../ExamConstants";

const ViewExamInformation = () => {
  const { uId, eId } = useParams();
  const [examDetails, setExamDeatils] = useState([]);
  const [topicDetails, setTopicDetails] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const url = `${PROTOCOL}://${window.location.hostname}:${PORT}`;
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
console.log("topicvalues=================>",topicDetails)

    }
    fetchData();
  }, [])
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
        <div className="col-md-11">
          <table className="table table-striped table-borderless fst-italic border border-3">
            <thead style={{ backgroundColor: "red" }} className="formHeaderColour">
              <tr>
                <th scope="col">Exam-Id</th>
                <th scope="col">Exam-Name</th>
                <th scope="col">No-Of-Questions</th>
                <th scope="col">Exam-Duration</th>
                <th scope="col">Negative-Mark</th>

              </tr>
            </thead>
            <tbody>
              <tr className="align-middle">
                <th scope="row">{eId}</th>
                <td className="fw-bold">{examDetails.examName}</td>
                <td className="fw-bold">{examDetails.noOfQuestions}</td>
                <td className="fw-bold">{examDetails.durationMinutes} min</td>
                <td className="fw-bold">{examDetails.negativeMarkValue}/Question</td>

              </tr>
              <tr>
                <td colSpan="5">
                  <table className="table mb-0  table-borderless fst-italic table-hover">
                    <thead className="formHeaderColour">
                      <tr>
                        <th scope="col">Topic-Id</th>
                        <th scope="col">Topic-Name</th>
                        <th scope="col">percentage</th>
                        <th scope="col">Topic-Pass-Percentage</th>
                        <th scope="col">No-Of-Question-Topic</th>
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
                    }

                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ViewExamInformation
