import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PROTOCOL, PORT } from '../ExamConstants';
import useStateRef from 'react-usestateref';

const UserPage = () => {
  const { uId } = useParams();
  const [userExam, setUserExam] = useState([]);
  const [userName, setUserName] = useState();
  const navigate = useNavigate();
  const [showExpireExam, setShowExpireExam, refShowExpireExam] = useStateRef(true);
  const [showExpireToUser, setExpireToUser, refShowExpireToUser] = useStateRef(false);

  // console.log( Date().toLocaleString()); date we can use 
  // const showUser =()=> {
  //   if(data ==1){
  //     setShowExpireExam(false)
  //   }
  //   else if(data==2){
  //     setShowExpireExam(true)
  //   }

  // }
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
        if (formData.notLogin === "notLogin") {
          navigate("/")
        }
        console.log(formData.userExamList)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []

  )
  return (
    <>
      <div className="row pt-2">
        <div className='col-8'>
          <div className="px-lg-5 px-3">
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
        <div className='col-4' id="mydiv">
          <h5 className='text-end myStyle fw-bold  text-colour'>{userName}</h5>
        </div>
      </div>
      <div className='row'>
        <div className='col-2 mt-5'>
          <div className=' rounded-3 broder-colour'>
            <div className='justify-content-center d-flex pt-2'>
              <button type="button" className='btn btn-outline-info btn-sm textcolor fw-bold  fw-light' onClick={showUser => { return setShowExpireExam(true), setExpireToUser(false) }}> Current-Exam </button>
            </div>
            <br />
            <div className='justify-content-center d-flex '>
              <button type="button" className='btn btn-outline-info btn-sm textcolor fw-bold fw-light' onClick={showUser => { return setShowExpireExam(false), setExpireToUser(false) }}> Upcoming-Exam </button>
            </div>
            <br />
            <div className='justify-content-center d-flex pb-2 '>
              <button type="button" className='btn btn-outline-info btn-sm textcolor fw-bold  fw-light' onClick={showUser => { return setShowExpireExam(true), setExpireToUser(true) }}> Expired-Exam </button>
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className="col-8 justify-content-center pt-4 ">
          <div className='row'>
            {userExam ? Object.entries(userExam).map(([key, value]) => (
              (
                (value.showExamToUser && refShowExpireExam.current && !refShowExpireToUser.current) ?
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
                          <br />
                          <h4
                            className="text-center  tile-size">
                            Start Date-{value.creationDate}
                            <br />
                            End Date-{value.expirationDate}
                          </h4>

                          <div className="position-absolute icons view-icon">
                            <Link to={`/user/${uId}/exam-details/${value.examId}/${value.examExpired}/${value.showExamToUser}`} className="px-3">
                              <i className="bi bi-box-arrow-in-right text-success " title="Attend-Exam"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> : (!value.showExamToUser && !refShowExpireExam.current && !value.examExpired) ?
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
                            <br />
                            <h4
                              className="text-center  tile-size">
                              Start Date-{value.creationDate}
                              <br />
                              End Date-{value.expirationDate}
                            </h4>

                            <div className="position-absolute icons view-icon">
                              <Link to={`/user/${uId}/exam-details/${value.examId}/${value.examExpired}/${value.showExamToUser}`} className="px-3">
                                <i className="bi bi-sign-do-not-enter text-muted  " title="Not-Yet-Exam-Started"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> : (value.examExpired && refShowExpireToUser.current) && <div className="col-4 tile-height justify-content-center d-flex" key={key}>
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
                            <br />
                            <h4
                              className="text-center  tile-size">
                              Start Date-{value.creationDate}
                              <br />
                              End Date-{value.expirationDate}
                            </h4>

                            <div className="position-absolute icons view-icon">
                              <Link to={`/user/${uId}/exam-details/${value.examId}/${value.examExpired}/${value.showExamToUser}`} className="px-3">
                                <i className="bi bi-sign-do-not-enter text-danger cursor-not" title="Exam-Already-Finished"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
              ))) : <p className="myStyle text-center fs-2 textcolor">No Exam To Be Assign to this User</p>}
          </div>
        </div>
        <div className='col-2 mt-5'>
          <div className=' rounded-3 broder-colour'>
            <div className='justify-content-center d-flex pt-2'>
              <button type="button" className='btn btn-outline-info btn-sm textcolor fw-bold  fw-light' onClick={showUser => { return setShowExpireExam(true), setExpireToUser(false) }}> Current-Exam </button>
            </div>
            <br />
            <div className='justify-content-center d-flex '>
              <button type="button" className='btn btn-outline-info btn-sm textcolor fw-bold fw-light' onClick={showUser => { return setShowExpireExam(false), setExpireToUser(false) }}> Upcoming-Exam </button>
            </div>
            <br />
            <div className='justify-content-center d-flex pb-2 '>
              <button type="button" className='btn btn-outline-info btn-sm textcolor fw-bold  fw-light' onClick={showUser => { return setShowExpireExam(true), setExpireToUser(true) }}> Expired-Exam </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserPage
