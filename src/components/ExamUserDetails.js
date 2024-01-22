import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
//ExamUserDetails
const ExamUserDetails = () => {
    const { id, value, noq, pId, fName, lName } = useParams();
    const navigate = useNavigate();
    const [userExamValues, setUserExamValue] = useState([]);
    useEffect(() => {
        async function formData() {
            try {
                const response = await fetch(`https://localhost:8443/exammodule/control/add-mapping?showUserExamId=${id}&showUserPartyId=${pId}`,
                    { credentials: "include" });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                if (data.notLogin === "notLogin") {
                    navigate("/")
                }
                setUserExamValue(data.userExam)
            } catch (error) {
                console.error("Error fetching data:", error);

            }
        }
        formData();
    }, [])

    return (
        <div>
            <div className="row justify-content-center mb-5">
                <div className="px-lg-5 px-3">
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
                                <Link to={`/admin/view-exam-topic/${id}/${value}/${noq}`}
                                    className="text-muted">Topics</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link className="text-muted" to={`/admin/view-exam-topic/view-exam-user/${id}/${value}/${noq}`}
                                >view-exam-user</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="#"
                                >exam-user-details</Link>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <h4 className="textcolor fst-italic table fw-bold text-dark text-center py-lg-3  small-heading-text">
                UserId--{pId}
            </h4>
            <div className='row justify-content-center textcolor '>
                <div className='col-lg-10 mb-5'>
                    <Paper className='questionbg-color g-3"' elevation={15}  >
                        <div className='col-12 row my-4 justify-content-center'>
                            <div className='col-6'>
                                <label className=" col-form-label ps-3 questiontext-color ">Exam-Name</label>
                                <input type="text" readOnly className="form-control-plaintext border mx-3 ps-3 small-content-text" value={value} />
                            </div>
                            <div className='col-6'>
                                <label className="col-form-label ps-3 questiontext-color">Exam-Id</label>
                                <input type="text" readOnly className="form-control-plaintext border ps-3 mx-3 small-content-text " value={userExamValues.examId} />
                            </div>

                        </div>
                        <div className='col-12 row my-4 justify-content-center'>
                            <div className='col-6'>
                                <label className=" col-form-label ps-3 questiontext-color ">First-Name</label>
                                <input type="text" readOnly className="form-control-plaintext border mx-3 ps-3 small-content-text" value={fName} />
                            </div>
                            <div className='col-6'>
                                <label className="col-form-label ps-3 questiontext-color">Last-Name</label>
                                <input type="text" readOnly className="form-control-plaintext border ps-3 mx-3 small-content-text" value={lName} />
                            </div>

                        </div>
                        <div className='col-12 row my-4 justify-content-center'>
                            <div className='col-6'>
                                <label className=" col-form-label ps-3 questiontext-color">Allowed Attempts</label>
                                <input type="text" readOnly className="form-control-plaintext border mx-3 ps-3 small-content-text" value={userExamValues.allowedAttempts} />
                            </div>
                            <div className='col-6'>
                                <label className="col-form-label ps-3 questiontext-color">Last Performance Date</label>
                                <input type="text" readOnly className="form-control-plaintext border ps-3 mx-3 small-content-text " value={userExamValues.lastPerformanceDate} />
                            </div>

                        </div>
                        <div className='col-12 row my-4 justify-content-center'>
                            <div className='col-6'>
                                <label className="col-form-label ps-3 questiontext-color">No Of Attempts</label>
                                <input type="text" readOnly className="form-control-plaintext border ps-3 mx-3 small-content-text" value={userExamValues.noOfAttempts} />
                            </div>
                            <div className='col-6'>
                                <label className=" col-form-label ps-3 questiontext-color">Timeout Days</label>
                                <input type="text" readOnly className="form-control-plaintext border mx-3 ps-3 small-content-text" value={userExamValues.timeoutDays} />
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default ExamUserDetails
