import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Registers = () => {
    const navigate = useNavigate();
    const goToAnotherPage = (flags) => {
        flags ? navigate("/") : navigate("/registers");
      };
    const onSumbit = (e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataValues = new URLSearchParams();
        for (const [field, value] of formData) {

            formDataValues.append(field, value);
        }

        fetch("https://localhost:8443/exammodule/control/add-user", {
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
             Object.entries(data.resultMap).map(([key, value]) => {
                if (value === "success") {
                    goToAnotherPage(true);
                }
            });

            return data;
        })

    })
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
                                <Link to="#" >
                                    Register
                                </Link>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div className="row justify-content-center app py-5 textcolor">
                <div className="col-7 pb-5">
                    <div className="card ">
                        <div className="head card-header text-center w-10 textcolor formHeaderColour">
                            <h2 className="card-title ">Register</h2>
                        </div>
                        <div className="card-body"></div>
                        <form className='px-4' onSubmit={onSumbit}>
                            <div className='row '>
                                <div className="col-md-6">
                                    <label className="form-label">First Name</label>
                                    <input type="text" name="firstName" className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">LastName</label>
                                    <input type="text" name="lastName" className="form-control" />
                                </div>
                            </div>
                            <div >
                                <label class="form-label">UserId</label>
                                <div >
                                    <input type="email" name='userLoginId' class="form-control" />
                                </div>
                            </div>
                            <div>
                                <input type='hidden' name="roleTypeId" value="Student"/>
                            </div>
                            <div >
                                <label class="form-label">Password</label>
                                <div >
                                    <input type="password" name='currentPassword' class="form-control" />
                                </div>
                            </div>
                            <div >
                                <label class="form-label">ReEnter-Password</label>
                                <div >
                                    <input type="password" name='currentPasswordVerify' class="form-control" />
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
