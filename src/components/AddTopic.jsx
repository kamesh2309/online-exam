import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const AddTopic = () => {
  const { id, value, noq, tId } = useParams();
  const [titleName, setTitleName] = useState("Add-Topic");
  const [topicName, setTopicName] = useState("");
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
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = new URLSearchParams();
    for (const [key, value] of data) {
      console.log(`key..${key},value..${value}`);
      formData.append(key, value);
    }
    fetch("https://localhost:8443/exammodule/control/add-topic", {
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

        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  useEffect(() => {
    if (tId != null) {
      setTitleName("Edit-Topic");
      async function fetchData() {
        const response = await fetch(
          `https://localhost:8443/exammodule/control/show-topic?editTopicId=${tId}&showExamId=${id}`
        );
        const data = await response.json();

        setFormData(data.examTopicMapping);
        setTopicFromDate(data.fromDate);
        console.log(data.fromDate,"data.fromDate");

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
                className="text-muted"
              >
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
                <div className="mx-0">
                  <button type="reset" className="btn btn-outline-warning">
                    Reset
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
