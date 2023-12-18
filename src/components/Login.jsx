import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const goToAnotherPage = (flags) => {
    flags ? navigate("/admin") : navigate("/add-exam");
  };
  const onSumbit = (e) => {
    e.preventDefault();
    document.getElementById("error_user").innerHTML = "";
    document.getElementById("error_password").innerHTML = "";

    const formData = new FormData(e.target);
    const formDataValues = new URLSearchParams();
    for (const [field, value] of formData) {
      formDataValues.append(field, value);
      console.log("key", field, "value", value);
    }
    const userName = formData.get("uname");
    const password = formData.get("upass");

    if ((userName && password) !== "") {
      console.log("not empty");
      const data = fetch("https://localhost:8443/exammodule/control/logins", {
        method: "POST",
        credentials: "include",
        body: formDataValues,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      })
        .then((response) => {
          console.log("hi iam promise", response);
          return response.json();
        })
        .then((data) => {
          console.log("Response data:", data.resultMap);
          Object.entries(data.resultMap).map(([key, value]) => {
            document.getElementById(key).innerHTML = value;
            if (key === "flag") document.getElementById("sumbit").reset();
            if (key === "flag") {
              const flags = value;
              flags ? goToAnotherPage(flags) : goToAnotherPage(flags);
            }
          });

          return data;
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
      console.log(data);
      document.getElementById("erroruname").classList.add("d-none");
      document.getElementById("erroruname").classList.remove("d-block");
      document.getElementById("errorupass").classList.add("d-none");
      document.getElementById("errorupass").classList.remove("d-block");

      // document.getElementById("sumbit").reset();
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
      {/* <div className="col-md-4" >  </div> */}
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
              required field not be empty
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
              required field not be empty
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
        </form>
      </div>
      {/* <div className="col-md-4">
                </div> */}
    </div>
  );
};

export default Login;
