import { ValidName, validNumber } from "./RegexValidation";

export const AddQuestionValidation = (key, value, setHasError) => {
    switch (key) {
        case "questionDetail": {

            if (value === "" || value === null) {
                document.getElementById("errorQuestionDetail").classList.remove("d-none");
                document.getElementById("errorQuestionDetail").classList.add("d-block");
                document.getElementById("errorQuestionDetail").innerHTML =
                    "PLEASE ENTER YOUR Question-Detail";
                setHasError(false);
            }
            else {
                if (!ValidName.test(value)) {
                    document.getElementById("errorQuestionDetail").classList.remove("d-none");
                    document.getElementById("errorQuestionDetail").classList.add("d-block");
                    document.getElementById("errorQuestionDetail").innerHTML = "ENTER VALID Question-Detail";
                    setHasError(false);
                }
            }
        } break;
        case "optionA": {
            if (value === "" || value === null) {
                console.log(value)
                document.getElementById("errorOptionA").classList.remove("d-none");
                document.getElementById("errorOptionA").classList.add("d-block");
                document.getElementById("errorOptionA").innerHTML =
                    "PLEASE ENTER YOUR Option_A";
                setHasError(false);
            }
            else {
                if (!ValidName.test(value)) {
                    document.getElementById("errorOptionA").classList.remove("d-none");
                    document.getElementById("errorOptionA").classList.add("d-block");
                    document.getElementById("errorOptionA").innerHTML =
                        "ENTER VALID  Option_A";
                    setHasError(false);
                }
            }
        } break;
        case "optionB": {
            if (value === "" || value === null) {
                console.log(value)
                document.getElementById("errorOptionB").classList.remove("d-none");
                document.getElementById("errorOptionB").classList.add("d-block");
                document.getElementById("errorOptionB").innerHTML =
                    "PLEASE ENTER Option_B";
                setHasError(false);
            }
            else {
                if (!ValidName.test(value)) {
                    document.getElementById("errorOptionB").classList.remove("d-none");
                    document.getElementById("errorOptionB").classList.add("d-block");
                    document.getElementById("errorOptionB").innerHTML =
                        "ENTER VALID Option_B";
                    setHasError(false);
                }
            }
        } break;
        case "optionC": {
            if (value === "" || value === null) {
                console.log(value)
                document.getElementById("errorOptionC").classList.remove("d-none");
                document.getElementById("errorOptionC").classList.add("d-block");
                document.getElementById("errorOptionC").innerHTML =
                    "PLEASE ENTER YOUR Option_C";
                setHasError(false);
            }
            else {
                if (!ValidName.test(value)) {
                    document.getElementById("errorOptionC").classList.remove("d-none");
                    document.getElementById("errorOptionC").classList.add("d-block");
                    document.getElementById("errorOptionC").innerHTML =
                        "ENTER VALID Option_C";
                    setHasError(false);
                }
            }
        } break;
        case "optionD": {
            if (value === "" || value === null) {
                console.log(value)
                document.getElementById("errorOptionD").classList.remove("d-none");
                document.getElementById("errorOptionD").classList.add("d-block");
                document.getElementById("errorOptionD").innerHTML =
                    "PLEASE ENTER YOUR Option_D";
                setHasError(false);
            }
            else {
                if (!ValidName.test(value)) {
                    document.getElementById("errorOptionD").classList.remove("d-none");
                    document.getElementById("errorOptionD").classList.add("d-block");
                    document.getElementById("errorOptionD").innerHTML =
                        "ENTER VALID Option_D";
                    setHasError(false);
                }
            }
        } break;
        case "optionE": {
            if (value === "" || value === null) {
                console.log(value)
                document.getElementById("errorOptionE").classList.remove("d-none");
                document.getElementById("errorOptionE").classList.add("d-block");
                document.getElementById("errorOptionE").innerHTML =
                    "PLEASE ENTER YOUR Option_E";
                setHasError(false);
            }
            else {
                if (!ValidName.test(value)) {
                    document.getElementById("errorOptionE").classList.remove("d-none");
                    document.getElementById("errorOptionE").classList.add("d-block");
                    document.getElementById("errorOptionE").innerHTML =
                        "ENTER VALID Option_E";
                    setHasError(false);
                }
            }
        } break;
        case "answer": {
            if (value === "" || value === null) {
                console.log(value)
                document.getElementById("errorAnswer").classList.remove("d-none");
                document.getElementById("errorAnswer").classList.add("d-block");
                document.getElementById("errorAnswer").innerHTML =
                    "PLEASE ENTER YOUR Answer";
                setHasError(false);
            }
            else {
                if (!ValidName.test(value)) {
                    document.getElementById("errorAnswer").classList.remove("d-none");
                    document.getElementById("errorAnswer").classList.add("d-block");
                    document.getElementById("errorAnswer").innerHTML =
                        "ENTER VALID Answer";
                    setHasError(false);
                }
            }
        } break;
        case "numAnswers": {
            if (value === "" || value === null) {
                console.log(value)
                document.getElementById("errorNumAnswer").classList.remove("d-none");
                document.getElementById("errorNumAnswer").classList.add("d-block");
                document.getElementById("errorNumAnswer").innerHTML =
                    "PLEASE ENTER Num_Answers";
                setHasError(false);
            }
            else {
                if (!validNumber.test(value)) {
                    document.getElementById("errorNumAnswer").classList.remove("d-none");
                    document.getElementById("errorNumAnswer").classList.add("d-block");
                    document.getElementById("errorNumAnswer").innerHTML =
                        "ENTER VALID Num_Answers";
                    setHasError(false);
                }
            }
        } break;
        case "answerValue": {
            if (!validNumber.test(value)) {
                document.getElementById("errorAnswerValue").classList.remove("d-none");
                document.getElementById("errorAnswerValue").classList.add("d-block");
                document.getElementById("errorAnswerValue").innerHTML =
                    "ENTER VALID Answer_Value";
                setHasError(false);
            }

        } break;
        case "difficultyLevel": {
            if (!validNumber.test(value)) {
                document.getElementById("errorDiffculty").classList.remove("d-none");
                document.getElementById("errorDiffculty").classList.add("d-block");
                document.getElementById("errorDiffculty").innerHTML =
                    "ENTER VALID Difficulty_Level";
                setHasError(false);
            }

        } break;
        case "negativeMarkValue": {
            if (!validNumber.test(value)) {
                document.getElementById("errorNegativeMark").classList.remove("d-none");
                document.getElementById("errorNegativeMark").classList.add("d-block");
                document.getElementById("errorNegativeMark").innerHTML =
                    "ENTER VALID Negative_MarkValue";
                setHasError(false);
            }

        } break;
        case "fromDate":
            {

            } break;
        case "questionId":
            {

            } break;
        case "topicId":
            {

            } break;
        default:
            setHasError(true);
            console.log("LOGIN-FORM VALIDATED SUCCESSFULLY");


    }
}

