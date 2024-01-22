import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useStateRef from 'react-usestateref';
import { UserExamMappingValidation } from './UserExamMappingValidation';
import { PORT, PROTOCOL } from './ExamConstants';

const UserExamMapping = () => {
    const { id, value, noq, pId } = useParams();
    const [hasError, setHasError, refHasError] = useStateRef(true);
    const [selectPartyId, setSelectPartyId, refSelectPartyId] = useStateRef([])
    const [alreadyAddedUser, setAlreadyAddedUser, refAlreadyAddedUser] = useStateRef([])
    const navigate = useNavigate();
    const [showCheckboxes, setShowCheckboxes, showCheckboxesRef] = useStateRef(false);
    const url = `${PROTOCOL}://${window.location.hostname}:${PORT}`;
    const goToAnotherPage = (flags) => {
        flags ? navigate("/admin") : navigate("/admin/user-exam-mapping");
    };

    const handleCheckboxToggle = () => {
        setShowCheckboxes(!showCheckboxesRef.current);
    };
    useEffect(() => {
        fetch(`${url}/exammodule/control/login-check`, { credentials: "include" })
            .then((response) => {
                return response.json();
            }).then(data => {
                if (data.notLogin === "notLogin") {
                    navigate("/");
                }
            })
    }, [])
    const handler = (e) => {
        e.preventDefault();
        document.getElementById("errorallowattemp").innerHTML = "";
        document.getElementById("errornoofattemp").innerHTML = "";
        document.getElementById("errortimeoutday").innerHTML = "";
        document.getElementById("errormaxsplit").innerHTML = "";
        const data = new FormData(e.target);

        var selectedPartyId = []
        var partyId = null
        const formData = new URLSearchParams();
        for (const [key, value] of data) {
            UserExamMappingValidation(key, value, setHasError);
            if (key == "partyId") {
                selectedPartyId.push(value)
            }
            else {
                formData.append(key, value);
            }

        }
        if (selectedPartyId.length > 0) {
            partyId = selectedPartyId.join(",")
        }
        formData.append("partyId", partyId);


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
                    setAlreadyAddedUser(data.alreadyAddedUser);
                    if (data.resultMap === "success") {
                        document.getElementById("staticBackdropOpen").click()
                        setTimeout(myStopFunction, 5000);
                        function myStopFunction() {
                            // clearTimeout(myTimeout);
                            document.getElementById("staticBackdropClose").click()
                            goToAnotherPage(true);
                        }

                    }
                    return data;
                })
                .catch((error) => {
                    console.error("Fetch error:", error);
                });
        }
    };
    function checkedPartyId(e) {

        fetchData(e.currentTarget.value);

    }
    async function fetchData(value) {
        try {
            const response = await fetch(
                `${url}/exammodule/control/add-mapping?selectedExam=${value}`,
                { credentials: "include" }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setSelectPartyId(data.resultMap);
            // const dropDown = document.getElementById('myDropdown');
            // dropDown.innerHTML = "";
            // if (data.resultMap) {

            //     Object.entries(data.resultMap).map(([key, value]) => {
            //         const option = document.createElement('option');
            //         option.value = value.partyId;
            //         option.text =value.partyId+" - "+value.firstName + " " + value.lastName;
            //         dropDown.appendChild(option);
            //     });
            // data.resultMap.forEach(value=>{
            //     const option = document.createElement('option');
            //    option.value = value.partyId;
            //     option.text = value.firstName;
            //     dropDown.appendChild(option);
            // })
            // }
        } catch (error) {
            console.error("error in fetching data:", error);
        }
    }
    useEffect(() => {
        if (id === undefined) {
            // fetchData();
        }
        else {
            async function fetchdata3() {
                try {
                    const response = await fetch(
                        `${url}/exammodule/control/add-mapping?shownewuser=${id}`,
                        { credentials: "include" }
                    );
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    setSelectPartyId(data.resultMap);
                }
                catch (error) {
                    console.error("error in fetching data:", error);
                }
            }
            fetchdata3();
        }
        if (id === undefined) {
            async function fetchdata1() {
                try {
                    const response = await fetch(`${url}/exammodule/control/show-exams?userExamMapping=${3}`,
                        { credentials: "include" })
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    const data = await response.json();
                    const dropDown = document.getElementById('myDropdown1');
                    dropDown.innerHTML = "";

                    if (data.userExamMapping) {
                        const option1 = document.createElement('option');
                        option1.text = "Select the Exam";
                        dropDown.appendChild(option1);
                        Object.entries(data.userExamMapping).map(([key, value]) => {
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
                <div className="px-lg-5 px-3">
                    <nav className="myStyle small-content-text">
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
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title textcolor text-center fw-bold fst-italic small-content-text " id="staticBackdropLabel">Student-Not-Mapped</h5>
                                </div>
                                <div className="modal-body">
                                    {/* {refAlreadyAddedUser.current && Object.entries(refAlreadyAddedUser.current).map(([key, value]) => {
                                        return (
                                            <div className='textcolor text-danger fw-bold fst-italic'>
                                                <p >PartyId-{value.partyId}</p>
                                                <p >Name-{value.firstName}" "{value.lastName}</p>
                                            </div>
                                        )
                                    })} */}
                                    <p className='textcolor fw-bold fst-italic text-success small-content-text'> These Student are Sucessfully Added to this Exam </p>
                                </div>
                                <div className="modal-footer">
                                    <p id="staticBackdropClose" data-bs-dismiss="modal"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center app py-5 textcolor">
                <div className="col-lg-8 col-12 pb-5">
                    <div className="card">
                        <div className="head head card-header text-center w-10  formHeaderColour">
                            <h2 className="card-title small-heading-text fw-bold ">User-Exam-Mapping</h2>
                        </div>
                        <div className="card-body small-content-text">
                            <form onSubmit={handler}>
                                <div className="form-group">
                                    <label>Party Id</label>
                                    {/* <select type="text" className="form-control " id='myDropdown' name='partyId'> </select> */}
                                    <div className="multipleSelection form-control textcolor">
                                        <div className="selectBox" onClick={handleCheckboxToggle}>
                                            <select className='bg-white border-0 textcolor fw-light'>
                                                <option>Select the Student </option>
                                            </select>
                                            <div className="overSelect"></div>
                                        </div>
                                        {showCheckboxesRef.current && Object.entries(refSelectPartyId.current).map(([key, values]) => {
                                            return (
                                                <>
                                                    <div className="checkBoxes"  >
                                                        <label >
                                                             {values.examId ? (<input className='textcolor' id="selectMe" type="checkbox" checked="true" name='partyId' value={values.partyId} />) :
                                                                (<input className='textcolor' id="selectMe" type="checkbox" name='partyId' value={values.partyId} />)}
                                                            {values.partyId + " - " + values.firstName + " " + values.lastName}
                                                        </label>
                                                    </div>
                                                </>)
                                        })
                                        }
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label >Exam Id</label>
                                    <select type="text" className="form-control" name="examId" onChange={checkedPartyId} id='myDropdown1' >

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
                                        <button type="submit" className="btn btn-outline-success small-button">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <p type="hidden" id="staticBackdropOpen" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></p>
                </div>
            </div>
        </div>
    )
}

export default UserExamMapping
