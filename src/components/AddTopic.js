import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useStateRef from "react-usestateref";
import { AddTopicValidation } from "./AddTopicValidation";
import { PORT, PROTOCOL } from "./ExamConstants";

const AddTopic = () => {
  const { id, value, noq, tId } = useParams();
  const url = `${PROTOCOL}://${window.location.hostname}:${PORT}`;
  const [titleName, setTitleName] = useState("Add-Topic");
  const [topicName, setTopicName] = useState("");
  const [hasError, setHasError, refHasError] = useStateRef(true);
  const [topicFromDate, setTopicFromDate] = useState("");
  const [formDatas, setFormData] = useState({
    topicId: tId || "",
    percentage: "",
    topicPassPercentage: "",

  });

  const setValues = (e) => {
    const { name, value } = e.currentTarget;

    if (name === "topicName") {
      setTopicName(value);
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      // setFormData({ ...formDatas, [e.target.name]: e.target.value });
    }
  };

  const navigate = useNavigate();
  const goToAnotherPage = (flags) => {
    flags
      ? navigate(`/admin/view-exam-topic/${id}/${value}/${noq}`)
      : navigate("/admin/view-exam-topic/add-topic/:id/:noq");
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
  const onSubmit = (e) => {
    e.preventDefault();
    document.getElementById("errorTopicName").innerHTML = "";
    document.getElementById("errorpercentage").innerHTML = "";
    document.getElementById("errorTopicPassPercentage").innerHTML = "";

    const data = new FormData(e.target);
    const formData = new URLSearchParams();
    for (const [key, value] of data) {
      AddTopicValidation(key, value, setHasError);
      formData.append(key, value);
    }
    // const value = Object.fromEntries(data.entries())
   
    if (refHasError.current) {
      fetch(`${url}/exammodule/control/add-topic`, {
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
    if (tId != null) {
      setTitleName("Edit-Topic");
      async function fetchData() {
        const response = await fetch(
          `${url}/exammodule/control/show-topic?editTopicId=${tId}&showExamId=${id}`
          , { credentials: "include" });
        const data = await response.json();

        setFormData(data.examTopicMapping);
        setTopicFromDate(data.fromDate);
        setTopicName(data.topicName);
      }
      fetchData();
    }
  }, []);

  return (
    <div className="row justify-content-center mb-5">
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
              <Link
                to={`/admin/view-exam-topic/${id}/${value}/${noq}`}
                className="text-muted">
                View-topics
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="#">{titleName}</Link>
            </li>
          </ol>
        </nav>
      </div>

      <div className="col-7">
        <div className="card textcolor">
          <div className="topic">
            <div className="card-header text-center formHeaderColour ">
              <h2>{titleName}</h2>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
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
                <label>Topic Id</label>
                <input type="hidden" name="topicId" value={formDatas.topicId} />
                <input
                  type="text"
                  className="form-control"
                  placeholder={formDatas.topicId}
                  disabled={true}
                />
              </div>

              <div className="form-group">
                <label>Topic Name</label>
                <p className="d-none text-danger" id="errorTopicName"></p>
                <input
                  type="text"
                  className="form-control"
                  name="topicName"
                  value={topicName}
                  onChange={setValues}
                  placeholder="Enter Topic Name.."
                />
              </div>

              <div className="form-group">
                <label>Percentage</label>
                <p className="d-none text-danger" id="errorpercentage"></p>

                <input
                  type="text"
                  className="form-control"
                  name="percentage"
                  onChange={setValues}
                  value={formDatas.percentage}
                  placeholder="Enter percentage.."
                />
              </div>
              <div className="form-group">
                <label>Topic Pass Percentage</label>
                <p className="d-none text-danger" id="errorTopicPassPercentage"></p>
                <input
                  type="text"
                  className="form-control"
                  name="topicPassPercentage"
                  value={formDatas.topicPassPercentage}
                  onChange={setValues}
                  placeholder="Enter Topic Pass Percentage.."
                />
              </div>
              <input type="hidden" name="fromDate" value={topicFromDate} />
              <input type="hidden" name="questionsPerExam" value={noq} />
              <div className="form-group d-flex mx-4">
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
  );
};

export default AddTopic;
