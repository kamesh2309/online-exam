import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ValidEmail, ValidPassword, ValidName } from './RegexValidation';
import useStateRef from 'react-usestateref';
import { RegistersValidation } from './RegistersValidation';
import { PORT, PROTOCOL } from './ExamConstants';

const Registers = () => {
    const [hasError, setHasError, refHasError] = useStateRef(true);
    const url = `${PROTOCOL}://${window.location.hostname}:${PORT}`;
    const navigate = useNavigate();
    const goToAnotherPage = (flags) => {
        flags ? navigate("/") : navigate("/registers");
    };
    const onSumbit = (e => {
        e.preventDefault();
        document.getElementById("errorufname").innerHTML = "";
        document.getElementById("errorulname").innerHTML = "";
        document.getElementById("erroremail").innerHTML = "";
        document.getElementById("errorpassword").innerHTML = "";
        document.getElementById("errorrepassword").innerHTML = "";

        const formData = new FormData(e.target);
        const formDataValues = new URLSearchParams();
        for (const [key, value] of formData) {
            RegistersValidation(key, value, setHasError);
            formDataValues.append(key, value);
        }

        const password = formData.get("currentPassword");
        const rePassword = formData.get("currentPasswordVerify");

        if (password !== rePassword) {
            document.getElementById("errorrepassword").classList.remove("d-none");
            document.getElementById("errorrepassword").classList.add("d-block");
            document.getElementById("errorrepassword").innerHTML =
                "PASSWORD AND RE-ENTER-PASSWORD NOT SAME";
            setHasError(false);

        }


        if (refHasError.current) {
            fetch(`${url}/exammodule/control/add-user`, {
                method: "POST",
                credentials: "include",
                body: formDataValues,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json",
                },
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.success === "success") {
                    goToAnotherPage(true);
                }
                return data;
            })
        }
    })
    return (
        <div>
            <div className="row">
                <div className="px-lg-5 px-3">
                    <nav className="myStyle">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item ">
                                <Link to="/" className="text-muted">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="#" >
                                    Register
                                </Link>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div className="row justify-content-center app py-5 textcolor">
                <div className="col-lg-8 col-12 pb-5">
                    <div className="card ">
                        <div className="head card-header text-center w-10 textcolor formHeaderColour">
                            <h2 className="card-title ">Register</h2>
                        </div>
                        <div className="card-body"></div>
                        <form className='px-4' onSubmit={onSumbit}>
                            <div className='row '>
                                <div className="col-md-6">
                                    <label className="form-label">First Name</label>
                                    <p className="d-none text-danger" id="errorufname"></p>
                                    <input type="text" name="firstName" className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">LastName</label>
                                    <p className="d-none text-danger" id="errorulname"></p>

                                    <input type="text" name="lastName" className="form-control" />
                                </div>
                            </div>
                            <div >
                                <label className="form-label">UserId</label>
                                <p className="d-none text-danger" id="erroremail"></p>

                                <div >
                                    <input type="email" name='userLoginId' className="form-control" />
                                </div>
                            </div>
                            <div>
                                <input type='hidden' name="roleTypeId" value="Student" />
                            </div>
                            <div>
                                <label className="form-label">Password</label>
                                <p className="d-none text-danger" id="errorpassword"></p>
                                <div >
                                    <input type="password" name='currentPassword' className="form-control" />
                                </div>
                            </div>
                            <div>
                                <label className="form-label">ReEnter-Password</label>
                                <p className="d-none text-danger" id="errorrepassword"></p>
                                <div>
                                    <input type="password" name='currentPasswordVerify' className="form-control" />
                                </div>
                            </div>
                            <div className="form-group d-flex mb-3">
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


    )
}

export default Registers
