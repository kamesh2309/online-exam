import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { PROTOCOL, PORT } from '../ExamConstants';

const UserPage = () => {
  const { uId } = useParams();
  const [userExam, setUserExam] = useState([]);
  const [userName, setUserName] = useState();
  const [showExamToUser, setExamtoUser] = useState(false);


  // console.log( Date().toLocaleString()); date we can use 
  useEffect(() => {
    const url = `${PROTOCOL}://${window.location.hostname}:${PORT}`;
    async function fetchData() {
      try {
        const response = await fetch(`${url}/exammodule/control/show-exam-user?partyId=${uId}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const formData = await response.json();
        setUserName(formData.userName)
        setUserExam(formData.userExamList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []

  )
  return (
    <>
      <div className="row">
        <div className='col-8'>
          <div className="ps-5">
            <nav className="myStyle">
              <ol className="breadcrumb">
                <li className="breadcrumb-item ">
                  <Link to="/" className="text-muted">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="#" >
                    user
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className='col-4'>
          <h5 className='text-end myStyle'>{userName}</h5>
        </div>
      </div>
      <div className='row'>
        <div className='col-2 border border-2'>
          <h5>hi am in </h5>
          <h5>hi am in </h5>
          <h5>hi am in </h5>
          <h5>hi am in </h5>
          <h5>hi am in </h5>
          <h5>hi am in </h5>
          <h5>hi am in </h5>
        </div>
        {/* </div> */}
        <div className="col-8 justify-content-center pt-4 ">
          <div className='row'>
          {userExam ? Object.entries(userExam).map(([key, value]) => (
              <div className="col-4 tile-height justify-content-center d-flex" key={key}>
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
                        className="text-center fw-bold textcolor" >
                        {value.examId} - {value.examName}

                      </h4>
                      <br/>
                      <h4
                        className="text-center  tile-size">
                        Start Date-{value.creationDate}
                        <br />
                        End Date-{value.expirationDate}
                      </h4>
                      {value.showExamToUser ? (
                        <div className="position-absolute icons view-icon">
                          <Link to={``} className="px-3">
                            <i className="bi bi-box-arrow-in-right text-success " title="Atten-Exam"></i>
                          </Link>
                        </div>) : (
                        <div className="tooltips position-absolute icons view-icon">
                          <i className="bi bi-box-arrow-in-right text-muted px-3" ></i>
                          <span className="tooltiptext">Not yet 😏 u have a time go prepare 📚 </span>

                        </div>
                      )}
                    </div>
                </div>
              </div>
            </div>
          )) : <p className="myStyle text-center fs-2">No Exam To Be Assign to this User</p>}
          </div>
        </div>
        <div className='col-2 border border-2'>
          <h5>hi am in </h5>
          <h5>hi am in </h5>
          <h5>hi am in </h5>
          <h5>hi am in </h5>
          <h5>hi am in </h5>
          <h5>hi am in </h5>
          <h5>hi am in </h5>
        </div>
      </div>
    </>
  )
}

export default UserPage
