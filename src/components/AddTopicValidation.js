import { ValidName, ValidPassword, validNumber } from './RegexValidation';
export const AddTopicValidation = (key, value, setHasError) => {
    switch (key) {
        case "topicName": {

            if (value === "" || value === null) {
                document.getElementById("errorTopicName").classList.remove("d-none");
                document.getElementById("errorTopicName").classList.add("d-block");
                document.getElementById("errorTopicName").innerHTML =
                    "Please enter your topic name";
                setHasError(false);
            }
            else {
                if (!ValidName.test(value)) {
                    document.getElementById("errorTopicName").classList.remove("d-none");
                    document.getElementById("errorTopicName").classList.add("d-block");
                    document.getElementById("errorTopicName").innerHTML = 
                    "Enter valid topic name";
                    setHasError(false);
                }
            }
        } break;
        case "percentage": {
            if (value === "" || value === null) {
                console.log(value)
                document.getElementById("errorpercentage").classList.remove("d-none");
                document.getElementById("errorpercentage").classList.add("d-block");
                document.getElementById("errorpercentage").innerHTML =
                    "Please enter your percentage";
                setHasError(false);
            }
            else {
                if (!validNumber.test(value)) {
                    document.getElementById("errorpercentage").classList.remove("d-none");
                    document.getElementById("errorpercentage").classList.add("d-block");
                    document.getElementById("errorpercentage").innerHTML =
                        "Enter valid  percentage";
                    setHasError(false);
                }
            }
        } break;
        case "topicPassPercentage": {
            if (value === "" || value === null) {
                console.log(value)
                document.getElementById("errorTopicPassPercentage").classList.remove("d-none");
                document.getElementById("errorTopicPassPercentage").classList.add("d-block");
                document.getElementById("errorTopicPassPercentage").innerHTML =
                    "Please enter topic pass percentage";
                setHasError(false);
            }
            else {
                if (!validNumber.test(value)) {
                    document.getElementById("errorTopicPassPercentage").classList.remove("d-none");
                    document.getElementById("errorTopicPassPercentage").classList.add("d-block");
                    document.getElementById("errorTopicPassPercentage").innerHTML =
                        "Enter valid topic pass percentage";
                    setHasError(false);
                }
            }
        } break;
        case "fromDate":
            {

            } break;
        case "questionsPerExam":
            {

            } break;
        default:
            setHasError(true);
            console.log("LOGIN-FORM VALIDATED SUCCESSFULLY");


    }
}

