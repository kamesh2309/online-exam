import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const ViewExamUser = () => {
    const [userExam, setUserExam] = useState([]);
    const { id, value, noq } = useParams();
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    "https://localhost:8443/exammodule/control/add-mapping?showExamId=" + id,
                    { credentials: "include" }
                );
                const data = await response.json();
                setUserExam(data.resultMap);
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []
    )
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
                        <Link to="#"
                        >view-exam-user</Link>
                    </li>
                </ol>
            </nav>
            <h4 className="textcolor fst-italic table fw-bold text-dark text-center ">
                List of User_Exam_Mapping
            </h4>
            <div className="row  justify-content-center mt-2 text-center textcolor ">
                <div className="col-md-11">
                    <table className="table table-striped table-borderless fst-italic border border-3">
                        <thead style={{ backgroundColor: "red" }} className="formHeaderColour">
                            <tr>
                                <th scope="col">Exam-Id</th>
                                <th scope="col">Exam-Name</th>

                            </tr>

                        </thead>
                        <tbody>
                            <tr className="align-middle">
                                <td scope="row">{id}</td>
                                <td className="fw-bold">{value}</td>
                            </tr>

                            <tr>
                                <td colSpan="4">
                                    {userExam.length > 0 ? (
                                        <table className="table mb-0  table-borderless fst-italic table-hover">
                                            <thead className="formHeaderColour">
                                                <tr>
                                                    <th scope="col">Student-Id</th>
                                                    <th scope="col">FirstName</th>
                                                    <th scope="col">LastName</th>
                                                    <th scope="col">Edit</th>
                                                    <th scope="col">View</th>
                                                    <th scope="col">Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.entries(userExam).map(([key, values]) => (
                                                    <tr className="align-middle" key={key}>
                                                        <th scope="row">{values.partyId}</th>
                                                        <th scope="row">{values.firstName}</th>
                                                        <th scope="row">{values.lastName}</th>
                                                        <td>
                                                            <Link to={"#"} className="justify-content-center d-flex">
                                                                <i className="bi bi-pen-fill text-dark" title="Edit"></i>
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <Link to={"#"} className="justify-content-center d-flex">
                                                                <i className=" bi bi-folder-symlink-fill text-info" title="View"></i>
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <button className="px-4 deleteLink">
                                                                <i className="bi bi-trash-fill text-danger" title="Delete"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                    ) : (<p>No Exam To Be Added For This Topic</p>)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default ViewExamUser