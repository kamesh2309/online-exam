import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useStateRef from "react-usestateref";
import { AddExamValidator } from "./AddExamValidator";
import { PORT, PROTOCOL } from "./ExamConstants";

const AddExam = () => {
  const url = `${PROTOCOL}://${window.location.hostname}:${PORT}`;
  const { id, fD } = useParams();
  const navigate = useNavigate();
  const [hasError, setHasError, refHasError] = useStateRef(true);
  const [examName, setExamName] = useState("Add-Exam");
  const [formDatas, setFormData] = useState({
    examId: id || "",
    examName: "",
    description: "",
    creationDate: "",
    expirationDate: "",
    noOfQuestions: "",
    durationMinutes: "",
    passPercentage: "",
    questionsRandomized: "Y",
    answersMust: "N",
    enableNegativeMark: "N",
    negativeMarkValue: "",
    fromDate: fD || "",
  });
  const setValues = (e) => {
    setFormData({ [e.currentTarget.name]: e.currentTarget.value });
  };
  const goToAnotherPage = (flags) => {
    flags ? navigate("/admin") : navigate("/add-exam");
  };
  useEffect(()=>{
    fetch(`${url}/exammodule/control/login-check`,{credentials: "include"})
    .then((response) => {
      return response.json();
    }).then(data=>{
      if (data.notLogin === "notLogin") {
        navigate("/");
      }
    })
  },[])
  const handler = (e) => {
    e.preventDefault();

    document.getElementById("errorExamname").innerHTML = "";
    document.getElementById("errornoofques").innerHTML = "";
    document.getElementById("errornmark").innerHTML = "";
    document.getElementById("errorpasspercent").innerHTML = "";
    document.getElementById("errorduration").innerHTML = "";

    const data = new FormData(e.target);    
    const formData = new URLSearchParams();
    for (const [key, value] of data) {
      AddExamValidator(key, value, setHasError);
      formData.append(key, value);
    }

    if (refHasError.current) {

      fetch(`${url}/exammodule/control/examMaster`, {
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
          Object.entries(data.resultMap).map(([key, value]) => {
            if (value === "success") {  
              goToAnotherPage(true);
            }
          });

          return data;
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    };
  }

  useEffect(() => {
    if (id != null) {
      setExamName("Edit-Exam");
      async function fetchData() {
        const response = await fetch(`${url}/exammodule/control/show-exams?editExamId=${id}`
          , { credentials: "include" });
        const data = await response.json();
        if (data.examList && data.examList.length > 0) {

          setFormData((prevFormData) => ({
            ...prevFormData,
            ...data.examList[0],
          }));
        } else {
          console.error(
            "Invalid data structure: examList is undefined or empty"
          );
        }
      }

      fetchData();
    }
  }, []);

  return (
    <div>
      <div className="ps-5">
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
              <Link to="#">{examName}</Link>
            </li>
          </ol>
        </nav>
      </div>
      <div className="row justify-content-center app py-5">
        <div className="col-6 pb-5">
          <div className="card ">
            <div className="head card-header text-center w-10 textcolor formHeaderColour">
              <h2 className="card-title ">{examName}</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handler} className="textcolor">
                <div className="form-group ">
                  <label>Exam Id</label>
                  <input type="hidden" name="examId" value={id} />
                  <input
                    type="text"
                    className="form-control"
                    placeholder={id}
                    disabled={true}
                  />

                </div>
                <div className="form-group">
                  <label>Exam Name</label>
                  <p className="d-none text-danger" id="errorExamname"></p>
                  <input
                    type="text"
                    className="form-control"
                    name="examName"
                    placeholder="Enter your exam name"
                    value={formDatas.examName}
                    onChange={setValues}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="Enter Description"
                    value={formDatas.description}
                    onChange={setValues}
                  />
                </div>
                <div className="row"> <input type="hidden" name="fromDate" value={formDatas.fromDate} /></div>
                <div className="row">
                  <div className="col-6 form-group">
                    <label>Creation Date</label>
                    <input
                      type="datetime-local"
                      name="creationDate"
                      className="form-control"
                      value={formDatas.creationDate}
                      onChange={setValues}
                    />
                  </div>
                  <div className="col-sm-6 form-group">
                    <label>Expiration Date</label>
                    <input
                      type="datetime-local"
                      name="expirationDate"
                      className="form-control"
                      value={formDatas.expirationDate}
                      onChange={setValues}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 form-group">
                    <label>No Of Questions</label>
                    <p className="d-none text-danger" id="errornoofques"></p>
                   <input
                      type="text"
                      name="noOfQuestions"
                      placeholder="Enter Number of Question"
                      className="form-control"
                      value={formDatas.noOfQuestions}
                      onChange={setValues}
                    />
                  </div>
                  <div className="col-sm-6 form-group">
                    <label>Duration Minutes</label>
                    <p className="d-none text-danger" id="errorduration"></p>
                    <input
                      type="text"
                      name="durationMinutes"
                      placeholder="Enter your Duration Minutes"
                      className="form-control"
                      value={formDatas.durationMinutes}
                      onChange={setValues}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Pass Percentage</label>
                  <p className="d-none text-danger" id="errorpasspercent"></p>
                  <input
                    type="text"
                    name="passPercentage"
                    className="form-control"
                    placeholder="Enter your passPercentage"
                    value={formDatas.passPercentage}
                    onChange={setValues}
                  />
                </div>
                <div className="form-group">
                  <label>Question Randomized</label>
                  <select
                    type="text"
                    name="questionsRandomized"
                    className="form-control"
                  >
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                  </select>
                </div>

                <div className="form-group ">
                  <label>Answers Must</label>
                  <select
                    type="text"
                    name="answersMust"
                    className="form-control"
                  >
                    <option value="N">No</option>
                    <option value="Y">Yes</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Enable Negative Mark</label>
                  <select
                    type="text"
                    name="enableNegativeMark"
                    className="form-control"
                  >
                    <option value="N">No</option>
                    <option value="Y">Yes</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="negativeMarkValue">Negative Mark Value</label>
                  <p className="d-none text-danger" id="errornmark"></p>
                   <input
                    type="text"
                    name="negativeMarkValue"
                    className="form-control"
                    value={formDatas.negativeMarkValue}
                    onChange={setValues}
                  />
                </div>
                <div className="form-group d-flex">
                  <div className="mx-4">
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
  );
};

export default AddExam;
