import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStateRef from "react-usestateref";
import { PORT, PROTOCOL } from "./ExamConstants";

const Login = () => {
  const url = `${PROTOCOL}://${window.location.hostname}:${PORT}`;
  const [partyId, setPartyId, refPartyId] = useStateRef();
  const navigate = useNavigate();

  const goToAnotherPage = (flags) => {
    
    flags ?window.location.href="/admin" : window.location.href=`/user/${refPartyId.current}`;
  };
  const onSumbit = (e) => {
    e.preventDefault();
    document.getElementById("error_user").innerHTML = "";
    document.getElementById("error_password").innerHTML = "";
    
    const formData = new FormData(e.target);
    const userName = formData.get("uname");
    const password = formData.get("upass");

     if ((userName && password) !== "") {
     
      const formDataValues = new URLSearchParams();
      for (const [field, value] of formData) {
        formDataValues.append(field, value);
      }

      const data = fetch(`${url}/exammodule/control/logins`, {
        method: "POST",
        credentials: "include",
        body: formDataValues,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      })
        .then((response) => {

          return response.json();
        })
        .then((data) => {
          setPartyId(data.partyId);
          Object.entries(data.resultMap).map(([key, value]) => {
            document.getElementById(key).innerHTML = value;

            if (key === "flag") {
              document.getElementById("sumbit").reset();
              const flags = value;
               goToAnotherPage(flags);
            }
          });

          return data;
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });

      document.getElementById("erroruname").classList.add("d-none");
      document.getElementById("erroruname").classList.remove("d-block");
      document.getElementById("errorupass").classList.add("d-none");
      document.getElementById("errorupass").classList.remove("d-block");


    } else {
      if (userName == "") {
        document.getElementById("erroruname").classList.remove("d-none");
        document.getElementById("erroruname").classList.add("d-block");
      }
      if (password == "") {
        document.getElementById("errorupass").classList.remove("d-none");
        document.getElementById("errorupass").classList.add("d-block");
      }
    }
  };
  return (
    <div className="row justify-content-center p-4">
      <div className="col-md-4">
        <form id="sumbit" onSubmit={onSumbit} className="textcolor">
          <div className="mb-3 ">
            <h2 className="text-center fw-bold">LOGIN</h2>
            <div>
              <span className="text-success d-none" id="flag"></span>
            </div>
            <label htmlFor="uname" className="form-label">
              UserName
            </label>
            <div>
              <span className="text-danger" id="error_user"></span>
            </div>
            <p className="d-none text-danger" id="erroruname">
              Required field not be empty
            </p>
            <input type="text" className="form-control border-3" name="uname" />
          </div>
          <div className="mb-3 input_box">
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <div>
              <span className="text-danger" id="error_password"></span>
            </div>
            <p className="d-none text-danger" id="errorupass">
              Required field not be empty
            </p>
            <input
              type="password"
              className="form-control border border-3"
              name="upass"
            />
          </div>
          <div>
            <input
              type="submit"
              className="submit_button w-100 border border-1 border-info "
              value="Login"
            />
          </div>
          <span className="small-content-text textcolor fw-bold fs-fst-italic">If you are Student...?<Link to={`/registers`}>Register</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Login;
