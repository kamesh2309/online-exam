import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { PROTOCOL, PORT } from '../ExamConstants';

const UserPage = () => {
  const { uId } = useParams();
  const [userExam, setUserExam] = useState([]);
  const [userName, setUserName] = useState();

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
    <div>
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
      <div className="row justify-content-center pt-4 ">
        {userExam ? Object.entries(userExam).map(([key, value]) => (

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

                  <div className="position-absolute icons view-icon">
                    <Link to={``} className="px-3 ">
                      <i className="bi  bi-eye text-success " title="View-Details"></i>
                    </Link>


                  </div>
                </div>
              </div>
            </div>
          </div>
        )) : <p className="myStyle text-center fs-2">No Exam To Be Assign to this User</p>}
      </div>
    </div>
  )
}

export default UserPage
