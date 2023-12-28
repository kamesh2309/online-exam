import { validNumber } from "./RegexValidation";

export const UserExamMappingValidation = (key, value, setHasError) => {
    switch (key) {
        case "allowedAttempts": {
            if (value === "" || value === null) {
                document.getElementById("errorallowattemp").classList.remove("d-none");
                document.getElementById("errorallowattemp").classList.add("d-block");
                document.getElementById("errorallowattemp").innerHTML =
                    "Please enter your allowed attempts";
                setHasError(false);
            }
            else {
                if (!validNumber.test(value)) {
                    document.getElementById("errorallowattemp").classList.remove("d-none");
                    document.getElementById("errorallowattemp").classList.add("d-block");
                    document.getElementById("errorallowattemp").innerHTML =
                        "Enter valid  allowed attempts";
                    setHasError(false);
                }
            }
        } break;
        case "noOfAttempts": {
            if (value === "" || value === null) {
                document.getElementById("errornoofattemp").classList.remove("d-none");
                document.getElementById("errornoofattemp").classList.add("d-block");
                document.getElementById("errornoofattemp").innerHTML =
                    "Please enter your no of attempts";
                setHasError(false);
            }
            else {
                if (!validNumber.test(value)) {
                    document.getElementById("errornoofattemp").classList.remove("d-none");
                    document.getElementById("errornoofattemp").classList.add("d-block");
                    document.getElementById("errornoofattemp").innerHTML =
                        "Enter valid your no of attempts";
                    setHasError(false);
                }
            }
        } break;
        case "timeoutDays": {
            if (value === "" || value === null) {
                document.getElementById("errortimeoutday").classList.remove("d-none");
                document.getElementById("errortimeoutday").classList.add("d-block");
                document.getElementById("errortimeoutday").innerHTML =
                    "Please enter your time out days";
                setHasError(false);
            }
            else {
                if (!validNumber.test(value)) {
                    document.getElementById("errortimeoutday").classList.remove("d-none");
                    document.getElementById("errortimeoutday").classList.add("d-block");
                    document.getElementById("errortimeoutday").innerHTML =
                        "Enter valid  time out days";
                    setHasError(false);
                }
            }
        } break;
        case "maxSplitAttempts": {
            if (value === "" || value === null) {
                document.getElementById("errormaxsplit").classList.remove("d-none");
                document.getElementById("errormaxsplit").classList.add("d-block");
                document.getElementById("errormaxsplit").innerHTML =
                    "Please enter your max split attempts";
                setHasError(false);
            }
            else {
                if (!validNumber.test(value)) {
                    document.getElementById("errormaxsplit").classList.remove("d-none");
                    document.getElementById("errormaxsplit").classList.add("d-block");
                    document.getElementById("errormaxsplit").innerHTML =
                        "Enter valid max split attempts";
                    setHasError(false);
                }
            }
        } break;

        default:
            setHasError(true);
            console.log("LOGIN-FORM VALIDATED SUCCESSFULLY");


    }
}

