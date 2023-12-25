import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const ExamUserDetails = () => {
    const { id, value, noq, pId, fName, lName } = useParams();
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
                console.log(data.userExam)
                setUserExamValue(data.userExam)
            } catch (error) {
                console.error("Error fetching data:", error);

            }
        }
        formData();
    }, [])

    return (
        <div>
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
            <h4 className="textcolor fst-italic table fw-bold text-dark text-center ">
                UserId--{pId}
            </h4>
            <div className='row justify-content-center textcolor mb-5'>
                <div className='col-md-10'>
                    <Paper className='questionbg-color g-3"' elevation={15}  >
                        <div className='col-12 row my-4 justify-content-center'>
                            <div className='col-6'>
                                <label className=" col-form-label ps-3 questiontext-color">Exam-Name</label>
                                <input type="text" readonly className="form-control-plaintext border mx-3 ps-3" value={value} />
                            </div>
                            <div className='col-6'>
                                <label className="col-form-label ps-3 questiontext-color">Exam-Id</label>
                                <input type="text" readonly className="form-control-plaintext border ps-3 mx-3 " value={userExamValues.examId} />
                            </div>

                        </div>
                        <div className='col-12 row my-4 justify-content-center'>
                            <div className='col-6'>
                                <label className=" col-form-label ps-3 questiontext-color">First-Name</label>
                                <input type="text" readonly className="form-control-plaintext border mx-3 ps-3" value={fName} />
                            </div>
                            <div className='col-6'>
                                <label className="col-form-label ps-3 questiontext-color">Last-Name</label>
                                <input type="text" readonly className="form-control-plaintext border ps-3 mx-3 " value={lName} />
                            </div>

                        </div>
                        <div className='col-12 row my-4 justify-content-center'>
                            <div className='col-6'>
                                <label className=" col-form-label ps-3 questiontext-color">Allowed Attempts</label>
                                <input type="text" readonly className="form-control-plaintext border mx-3 ps-3" value={userExamValues.allowedAttempts} />
                            </div>
                            <div className='col-6'>
                                <label className="col-form-label ps-3 questiontext-color">Last Performance Date</label>
                                <input type="text" readonly className="form-control-plaintext border ps-3 mx-3 " value={userExamValues.lastPerformanceDate} />
                            </div>

                        </div>
                        <div className='col-12 row my-4 justify-content-center'>
                            <div className='col-6'>
                                <label className="col-form-label ps-3 questiontext-color">No Of Attempts</label>
                                <input type="text" readonly className="form-control-plaintext border ps-3 mx-3 " value={userExamValues.noOfAttempts} />
                            </div>
                            <div className='col-6'>
                                <label className=" col-form-label ps-3 questiontext-color">Timeout Days</label>
                                <input type="text" readonly className="form-control-plaintext border mx-3 ps-3" value={userExamValues.timeoutDays} />
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default ExamUserDetails
