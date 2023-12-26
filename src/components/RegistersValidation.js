import React from 'react'
import { ValidEmail, ValidName, ValidPassword } from './RegexValidation';

export const RegistersValidation = (key, value, setHasError) => {
    switch (key) {
        case "firstName": {
            if (value === "" || value === null) {
                document.getElementById("errorufname").classList.remove("d-none");
                document.getElementById("errorufname").classList.add("d-block");
                document.getElementById("errorufname").innerHTML =
                    "PLEASE ENTER YOUR USER_NAME";
                setHasError(false);
            }
            else {
                if (!ValidName.test(value)) {
                    document.getElementById("errorufname").classList.remove("d-none");
                    document.getElementById("errorufname").classList.add("d-block");
                    document.getElementById("errorufname").innerHTML =
                        "ENTER VALID  USER_NAME";
                    setHasError(false);
                }
            }
        } break;
        case "lastName": {
            if (value === "" || value === null) {
                console.log(value)
                document.getElementById("errorulname").classList.remove("d-none");
                document.getElementById("errorulname").classList.add("d-block");
                document.getElementById("errorulname").innerHTML =
                    "PLEASE ENTER YOUR USER_NAME";
                setHasError(false);
            }
            else {
                if (!ValidName.test(value)) {
                    document.getElementById("errorulname").classList.remove("d-none");
                    document.getElementById("errorulname").classList.add("d-block");
                    document.getElementById("errorulname").innerHTML =
                        "ENTER VALID YOUR USER_NAME";
                    setHasError(false);
                }
            }
        } break;
        case "userLoginId": {
            if (value === "" || value === null) {
                console.log(value)
                document.getElementById("erroremail").classList.remove("d-none");
                document.getElementById("erroremail").classList.add("d-block");
                document.getElementById("erroremail").innerHTML =
                    "PLEASE ENTER YOUR USER_ID /EMAIL_ID";
                setHasError(false);
            }
            else {
                if (!ValidEmail.test(value)) {
                    document.getElementById("erroremail").classList.remove("d-none");
                    document.getElementById("erroremail").classList.add("d-block");
                    document.getElementById("erroremail").innerHTML =
                        "ENTER VALID USER_ID /EMAIL_ID";
                    setHasError(false);
                }
            }
        } break;
        case "Password": {
            if (value === "" || value === null) {
                console.log(value)
                document.getElementById("errorpassword").classList.remove("d-none");
                document.getElementById("errorpassword").classList.add("d-block");
                document.getElementById("errorpassword").innerHTML =
                    "PLEASE ENTER YOUR PASSWORD";
                setHasError(false);
            }
            else {
                if (!ValidPassword.test(value)) {
                    document.getElementById("errorpassword").classList.remove("d-none");
                    document.getElementById("errorpassword").classList.add("d-block");
                    document.getElementById("errorpassword").innerHTML =
                        "ENTER VALID PASSWORD";
                    setHasError(false);
                }
            }
        } break;
        case "currentPasswordVerify": {
            if (value === "" || value === null) {
                console.log(value)
                document.getElementById("errorrepassword").classList.remove("d-none");
                document.getElementById("errorrepassword").classList.add("d-block");
                document.getElementById("errorrepassword").innerHTML =
                    "PLEASE ENTER YOUR PASSWORD";
                setHasError(false);
            }
            else {
                if (!ValidPassword.test(value)) {
                    document.getElementById("errorrepassword").classList.remove("d-none");
                    document.getElementById("errorrepassword").classList.add("d-block");
                    document.getElementById("errorrepassword").innerHTML =
                        "ENTER VALID PASSWORD";
                    setHasError(false);
                }
            }
        } break;
        case "roleTypeId":{
            if(value===""){
                setHasError(false);
            }
        }break;
        default:
            setHasError(true);
            console.log("LOGIN-FORM VALIDATED SUCCESSFULLY");
       

    }
}


