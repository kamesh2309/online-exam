import React from 'react'
import { ValidEmail, ValidName, ValidPassword } from './RegexValidation';

export const RegistersValidation = (key, value, setHasError) => {
    switch (key) {
        case "firstName": {
            if (value === "" || value === null) {
                document.getElementById("errorufname").classList.remove("d-none");
                document.getElementById("errorufname").classList.add("d-block");
                document.getElementById("errorufname").innerHTML =
                    "Please enter your user name";
                setHasError(false);
            }
            else {
                if (!ValidName.test(value)) {
                    document.getElementById("errorufname").classList.remove("d-none");
                    document.getElementById("errorufname").classList.add("d-block");
                    document.getElementById("errorufname").innerHTML =
                        "Enter valid  user name";
                    setHasError(false);
                }
            }
        } break;
        case "lastName": {
            if (value === "" || value === null) {
                document.getElementById("errorulname").classList.remove("d-none");
                document.getElementById("errorulname").classList.add("d-block");
                document.getElementById("errorulname").innerHTML =
                    "Please enter your user name";
                setHasError(false);
            }
            else {
                if (!ValidName.test(value)) {
                    document.getElementById("errorulname").classList.remove("d-none");
                    document.getElementById("errorulname").classList.add("d-block");
                    document.getElementById("errorulname").innerHTML =
                        "Enter valid your user name";
                    setHasError(false);
                }
            }
        } break;
        case "userLoginId": {
            if (value === "" || value === null) {
                document.getElementById("erroremail").classList.remove("d-none");
                document.getElementById("erroremail").classList.add("d-block");
                document.getElementById("erroremail").innerHTML =
                    "Please enter your user id /email id";
                setHasError(false);
            }
            else {
                if (!ValidEmail.test(value)) {
                    document.getElementById("erroremail").classList.remove("d-none");
                    document.getElementById("erroremail").classList.add("d-block");
                    document.getElementById("erroremail").innerHTML =
                        "Enter valid user id /email id";
                    setHasError(false);
                }
            }
        } break;
        case "Password": {
            if (value === "" || value === null) {
                document.getElementById("errorpassword").classList.remove("d-none");
                document.getElementById("errorpassword").classList.add("d-block");
                document.getElementById("errorpassword").innerHTML =
                    "Please enter your password";
                setHasError(false);
            }
            else {
                if (!ValidPassword.test(value)) {
                    document.getElementById("errorpassword").classList.remove("d-none");
                    document.getElementById("errorpassword").classList.add("d-block");
                    document.getElementById("errorpassword").innerHTML =
                        "Enter valid password";
                    setHasError(false);
                }
            }
        } break;
        case "currentPasswordVerify": {
            if (value === "" || value === null) {
                document.getElementById("errorrepassword").classList.remove("d-none");
                document.getElementById("errorrepassword").classList.add("d-block");
                document.getElementById("errorrepassword").innerHTML =
                    "Please enter your password";
                setHasError(false);
            }
            else {
                if (!ValidPassword.test(value)) {
                    document.getElementById("errorrepassword").classList.remove("d-none");
                    document.getElementById("errorrepassword").classList.add("d-block");
                    document.getElementById("errorrepassword").innerHTML =
                        "Enter valid password";
                    setHasError(false);
                }
            }
        } break;
        case "roleTypeId":{
            if(value===" "){
                setHasError(false);
            }
        }break;
        default:
            setHasError(true);
            console.log("LOGIN-FORM VALIDATED SUCCESSFULLY");
       

    }
}


