import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useStateRef from 'react-usestateref';
import { UserExamMappingValidation } from './UserExamMappingValidation';
import { PORT, PROTOCOL } from './ExamConstants';

const UserExamMapping = () => {
    const { id, value, noq, pId } = useParams();
    const [hasError, setHasError, refHasError] = useStateRef(true);
    const navigate = useNavigate();
    const url = `${PROTOCOL}://${window.location.hostname}:${PORT}`;
    const goToAnotherPage = (flags) => {
        flags ? navigate("/admin") : navigate("/admin/user-exam-mapping");
    };
    const handler = (e) => {
        e.preventDefault();
        document.getElementById("errorallowattemp").innerHTML = "";
        document.getElementById("errornoofattemp").innerHTML = "";
        document.getElementById("errortimeoutday").innerHTML = "";
        document.getElementById("errormaxsplit").innerHTML = "";
        const data = new FormData(e.target);
        const formData = new URLSearchParams();
        for (const [key, value] of data) {
            UserExamMappingValidation(key, value, setHasError);
            formData.append(key, value);
        }
       
    
        if (refHasError.current) {
            fetch(`${url}/exammodule/control/add-user-exam-mapping`, {
                method: "POST",
                credentials: "include",
                body: formData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json",
                },
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if (data.resultMap === "success") {
                        goToAnotherPage(true);
                    }
                    return data;
                })
                .catch((error) => {
                    console.error("Fetch error:", error);
                });
        }
    };

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await fetch(
                    `${url}/exammodule/control/add-mapping`,
                    { credentials: "include" }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const dropDown = document.getElementById('myDropdown');
                dropDown.innerHTML = "";
                if (data.resultMap) {

                    Object.entries(data.resultMap).map(([key, value]) => {
                        const option = document.createElement('option');
                        option.value = value.partyId;
                        option.text =value.partyId+" - "+value.firstName + " " + value.lastName;
                        dropDown.appendChild(option);
                    });
                    // data.resultMap.forEach(value=>{
                    //     const option = document.createElement('option');
                    //    option.value = value.partyId;
                    //     option.text = value.firstName;
                    //     dropDown.appendChild(option);
                    // })
                }
            } catch (error) {
                console.error("error in fetching data:", error);
            }
        }
        fetchData();
        if (id === undefined) {
            async function fetchdata1() {
                try {
                    const response = await fetch(`${url}/exammodule/control/show-exams`,
                        { credentials: "include" })
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    const dropDown = document.getElementById('myDropdown1');
                    dropDown.innerHTML = "";
                    console.log(data.examMap)
                    if (data.examMap) {
                        Object.entries(data.examMap).map(([key, value]) => {
                            const option = document.createElement('option');
                            option.value = value.examId;
                            option.text = value.examName;
                            dropDown.appendChild(option);
                        });
                    }
                } catch (error) {
                    console.error("error in fetching data:", error);
                }

            }
            fetchdata1();
        }
        else {
            async function fetchdata2() {
                try {
                    const response = await fetch(`${url}/exammodule/control/show-exams?editExamId=${id}`,
                        { credentials: "include" })
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    const dropDown = document.getElementById('myDropdown1');
                    dropDown.innerHTML = "";
                    if (data.examList) {

                        Object.entries(data.examList).map(([key, value]) => {
                            const option = document.createElement('option');
                            option.value = value.examId;
                            option.text = value.examName;
                            dropDown.appendChild(option);
                        });
                    }
                } catch (error) {
                    console.error("error in fetching data:", error);
                }

            }
            fetchdata2();
        }
    }, []);

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
                                <Link to="/admin" className="text-muted" >
                                    Admin
                                </Link>
                            </li>
                            {pId !== undefined ? (<><li className="breadcrumb-item">
                                <Link to={`/admin/view-exam-topic/view-exam-user/${id}/${value}/${noq}`} className="text-muted" >
                                    view-exam-user
                                </Link>
                            </li>
                                <li className="breadcrumb-item">
                                    <Link to="#" >
                                        Edit-User
                                    </Link>
                                </li>
                            </>
                            )
                                : (id !== undefined ? <><li className="breadcrumb-item">
                                    <Link to={`/admin/view-exam-topic/${id}/${value}/${noq}`} className="text-muted">
                                        Topics
                                    </Link>
                                </li>
                                    <li className="breadcrumb-item">
                                        <Link to="#" >
                                            Add-User
                                        </Link>
                                    </li>
                                </> : <li className="breadcrumb-item">
                                    <Link to="#" >
                                        Add-User
                                    </Link>
                                </li>
                                )}
                        </ol>
                    </nav>
                </div>
            </div>
            <div className="row justify-content-center app py-5 textcolor">

                <div className="col-8 pb-5">
                    <div className="card">
                        <div className="head head card-header text-center w-10  formHeaderColour">
                            <h2 className="card-title">User-Exam-Mapping</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handler}>
                                <div className="form-group">
                                    <label>Party Id</label>
                                    <select type="text" className="form-control " id='myDropdown' name='partyId'>
                                        
                                    </select></div>
                                <div className="form-group">
                                    <label >Exam Id</label>
                                    <select type="text" className="form-control" name="examId" id='myDropdown1' >
                                    </select></div>
                                <div className="form-group">
                                    <label >Allowed Attempts</label>
                                    <p className="d-none text-danger" id="errorallowattemp"></p>
                                    <input type="text" name="allowedAttempts" className="form-control" /></div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label >No Of Attempts</label>
                                            <p className="d-none text-danger" id="errornoofattemp"></p>
                                            <input type="text" name="noOfAttempts" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label >Last Performance Date</label>
                                            <input name="lastPerformanceDate" type="datetime-local" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label >timeoutDays</label>
                                            <p className="d-none text-danger" id="errortimeoutday"></p>
                                            <input type="text" name="timeoutDays" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label >Password Changes Auto</label>
                                            <select type="text" name="passwordChangesAuto" className="form-control" >
                                                <option value="y">Yes</option>
                                                <option value="n">No</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label >Can Split Exams</label>
                                    <select type="text" name="canSplitExams" className="form-control" placeholder="Enter your passPercentage" >
                                        <option value="y">Yes</option>
                                        <option value="n">No</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label >Can See Detailed Results</label>
                                    <select type="text" name="canSeeDetailedResults" className="form-control"  >
                                        <option value="y">Yes</option>
                                        <option value="n">No</option>
                                    </select>
                                </div>
                                <div className="form-group ">
                                    <label>Max Split Attempts</label>
                                    <p className="d-none text-danger" id="errormaxsplit"></p>
                                    <input type="text" name="maxSplitAttempts" className="form-control" />
                                </div>
                                <div className="form-group d-flex">
                                    <div className="ps-5">
                                        <button type="submit" className="btn btn-outline-success">
                                            Submit
                                        </button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserExamMapping
