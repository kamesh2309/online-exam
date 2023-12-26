import { ValidName, ValidPassword, validNumber } from './RegexValidation';
export const AddTopicValidation = (key, value, setHasError) => {
    switch (key) {
        case "topicName": {

            if (value === "" || value === null) {
                document.getElementById("errorTopicName").classList.remove("d-none");
                document.getElementById("errorTopicName").classList.add("d-block");
                document.getElementById("errorTopicName").innerHTML =
                    "PLEASE ENTER YOUR Topic-Name";
                setHasError(false);
            }
            else {
                if (!ValidName.test(value)) {
                    document.getElementById("errorTopicName").classList.remove("d-none");
                    document.getElementById("errorTopicName").classList.add("d-block");
                    document.getElementById("errorTopicName").innerHTML = "ENTER VALID Topic-Name";
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
                    "PLEASE ENTER YOUR Percentage";
                setHasError(false);
            }
            else {
                if (!validNumber.test(value)) {
                    document.getElementById("errorpercentage").classList.remove("d-none");
                    document.getElementById("errorpercentage").classList.add("d-block");
                    document.getElementById("errorpercentage").innerHTML =
                        "ENTER VALID  Percentage";
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
                    "PLEASE ENTER Topic_Pass_Percentage";
                setHasError(false);
            }
            else {
                if (!validNumber.test(value)) {
                    document.getElementById("errorTopicPassPercentage").classList.remove("d-none");
                    document.getElementById("errorTopicPassPercentage").classList.add("d-block");
                    document.getElementById("errorTopicPassPercentage").innerHTML =
                        "ENTER VALID Topic_Pass_Percentage";
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

