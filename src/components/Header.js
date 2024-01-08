import { useEffect, useState } from "react";
import myimg from "./image/logo.png";
import useStateRef from "react-usestateref";
import { PORT, PROTOCOL } from "./ExamConstants";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const url = `${PROTOCOL}://${window.location.hostname}:${PORT}`;
  const [Logout, setLogout, refSetLogout] = useStateRef(false);
  function getDate() {
    const now = new Date();
    const date = now.getDate();
    const Month = now.getMonth();
    const Year = now.getFullYear();
    return `Date: ${date}-${Month+1}-${Year} `;
  }
  const logoutUser = async () => {
    const response = await fetch(`${url}/exammodule/control/logout`, { credentials: "include" });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const formData = await response.json();
    if (formData.logoutSuccess === false) {
      setLogout(formData.logoutSuccess);
      window.location.href = "/"

    }
  }
  useEffect(() => {
    fetch(`${url}/exammodule/control/login-check`, { credentials: "include" })
      .then((response) => {
        return response.json();
      }).then(data => {
        if (data.login === "login") {
          setLogout(true);
        }
      })
  }, [])

  return (
    <div>
      <div className="row">
        <nav className="navbar navbar expand-lg bg-header">
          <div className="col-4">
            <img src={myimg} alt="Logo" className="logo"></img>
          </div>
          <div className="col-4"></div>
          <div className="col-4">
            {refSetLogout.current ? (
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-outline-light text-dark fw-bold border-2 textcolor" data-bs-toggle="modal" data-bs-target="#logoutBackdrop">
                  Logout
                </button>

                <div className="modal fade" id="logoutBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        {/* <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5> */}
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body fw-bold fst-italic textcolor" >
                        Are you sure u want to Logout..
                      </div>
                      <div className="modal-footer ">
                        <button type="button" className="btn btn-outline-info fw-bold fst-italic" onClick={logoutUser} data-bs-dismiss="modal">Logout</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>) : (<p className="dateheader">{getDate()}</p>)}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
