import { validNumber } from "./RegexValidation";

export const UserExamMappingValidation = (key, value, setHasError) => {
    switch (key) {
        case "allowedAttempts": {
            if (value === "" || value === null) {
                document.getElementById("errorallowattemp").classList.remove("d-none");
                document.getElementById("errorallowattemp").classList.add("d-block");
                document.getElementById("errorallowattemp").innerHTML =
                    "PLEASE ENTER YOUR Allowed_Attempts";
                setHasError(false);
            }
            else {
                if (!validNumber.test(value)) {
                    document.getElementById("errorallowattemp").classList.remove("d-none");
                    document.getElementById("errorallowattemp").classList.add("d-block");
                    document.getElementById("errorallowattemp").innerHTML =
                        "ENTER VALID  Allowed_Attempts";
                    setHasError(false);
                }
            }
        } break;
        case "noOfAttempts": {
            if (value === "" || value === null) {
                document.getElementById("errornoofattemp").classList.remove("d-none");
                document.getElementById("errornoofattemp").classList.add("d-block");
                document.getElementById("errornoofattemp").innerHTML =
                    "PLEASE ENTER YOUR No_Of_Attempts";
                setHasError(false);
            }
            else {
                if (!validNumber.test(value)) {
                    document.getElementById("errornoofattemp").classList.remove("d-none");
                    document.getElementById("errornoofattemp").classList.add("d-block");
                    document.getElementById("errornoofattemp").innerHTML =
                        "ENTER VALID YOUR USER_NAME";
                    setHasError(false);
                }
            }
        } break;
        case "timeoutDays": {
            if (value === "" || value === null) {
                document.getElementById("errortimeoutday").classList.remove("d-none");
                document.getElementById("errortimeoutday").classList.add("d-block");
                document.getElementById("errortimeoutday").innerHTML =
                    "PLEASE ENTER YOUR Time_Out_Days";
                setHasError(false);
            }
            else {
                if (!validNumber.test(value)) {
                    document.getElementById("errortimeoutday").classList.remove("d-none");
                    document.getElementById("errortimeoutday").classList.add("d-block");
                    document.getElementById("errortimeoutday").innerHTML =
                        "ENTER VALID  Time_Out_Days";
                    setHasError(false);
                }
            }
        } break;
        case "maxSplitAttempts": {
            if (value === "" || value === null) {
                document.getElementById("errormaxsplit").classList.remove("d-none");
                document.getElementById("errormaxsplit").classList.add("d-block");
                document.getElementById("errormaxsplit").innerHTML =
                    "PLEASE ENTER YOUR Max_Split_Attempts";
                setHasError(false);
            }
            else {
                if (!validNumber.test(value)) {
                    document.getElementById("errormaxsplit").classList.remove("d-none");
                    document.getElementById("errormaxsplit").classList.add("d-block");
                    document.getElementById("errormaxsplit").innerHTML =
                        "ENTER VALID Max_Split_Attempts";
                    setHasError(false);
                }
            }
        } break;

        default:
            setHasError(true);
            console.log("LOGIN-FORM VALIDATED SUCCESSFULLY");


    }
}

