import { ValidName, validNumber } from "./RegexValidation";

export const AddQuestionValidation = (key, value, setHasError) => {
    switch (key) {
        case "questionDetail": {

            if (value === "" || value === null) {
                document.getElementById("errorQuestionDetail").classList.remove("d-none");
                document.getElementById("errorQuestionDetail").classList.add("d-block");
                document.getElementById("errorQuestionDetail").innerHTML =
                    "Please enter your question detail";
                setHasError(false);
            }
            else {
                if (!ValidName.test(value)) {
                    document.getElementById("errorQuestionDetail").classList.remove("d-none");
                    document.getElementById("errorQuestionDetail").classList.add("d-block");
                    document.getElementById("errorQuestionDetail").innerHTML =
                     "Enter valid question detail";
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
                    "Please enter your option a";
                setHasError(false);
            }
            else {
                if (!ValidName.test(value)) {
                    document.getElementById("errorOptionA").classList.remove("d-none");
                    document.getElementById("errorOptionA").classList.add("d-block");
                    document.getElementById("errorOptionA").innerHTML =
                        "Enter valid  option a";
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
                    "Please enter option b";
                setHasError(false);
            }
            else {
                if (!ValidName.test(value)) {
                    document.getElementById("errorOptionB").classList.remove("d-none");
                    document.getElementById("errorOptionB").classList.add("d-block");
                    document.getElementById("errorOptionB").innerHTML =
                        "Enter valid option b";
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
                    "Please enter your option c";
                setHasError(false);
            }
            else {
                if (!ValidName.test(value)) {
                    document.getElementById("errorOptionC").classList.remove("d-none");
                    document.getElementById("errorOptionC").classList.add("d-block");
                    document.getElementById("errorOptionC").innerHTML =
                        "Enter valid option c";
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
                    "Please enter your option d";
                setHasError(false);
            }
            else {
                if (!ValidName.test(value)) {
                    document.getElementById("errorOptionD").classList.remove("d-none");
                    document.getElementById("errorOptionD").classList.add("d-block");
                    document.getElementById("errorOptionD").innerHTML =
                        "Enter valid option d";
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
                    "Please enter your option e";
                setHasError(false);
            }
            else {
                if (!ValidName.test(value)) {
                    document.getElementById("errorOptionE").classList.remove("d-none");
                    document.getElementById("errorOptionE").classList.add("d-block");
                    document.getElementById("errorOptionE").innerHTML =
                        "Enter valid option e";
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
                    "Please enter your answer";
                setHasError(false);
            }
            else {
                if (!ValidName.test(value)) {
                    document.getElementById("errorAnswer").classList.remove("d-none");
                    document.getElementById("errorAnswer").classList.add("d-block");
                    document.getElementById("errorAnswer").innerHTML =
                        "Enter valid answer";
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
                    "Please enter num answers";
                setHasError(false);
            }
            else {
                if (!validNumber.test(value)) {
                    document.getElementById("errorNumAnswer").classList.remove("d-none");
                    document.getElementById("errorNumAnswer").classList.add("d-block");
                    document.getElementById("errorNumAnswer").innerHTML =
                        "Enter valid num answers";
                    setHasError(false);
                }
            }
        } break;
        case "answerValue": {
            if (!validNumber.test(value)) {
                document.getElementById("errorAnswerValue").classList.remove("d-none");
                document.getElementById("errorAnswerValue").classList.add("d-block");
                document.getElementById("errorAnswerValue").innerHTML =
                    "Enter valid answer value";
                setHasError(false);
            }

        } break;
        case "difficultyLevel": {
            if (!validNumber.test(value)) {
                document.getElementById("errorDiffculty").classList.remove("d-none");
                document.getElementById("errorDiffculty").classList.add("d-block");
                document.getElementById("errorDiffculty").innerHTML =
                    "Enter valid difficulty level";
                setHasError(false);
            }

        } break;
        case "negativeMarkValue": {
            if (!validNumber.test(value)) {
                document.getElementById("errorNegativeMark").classList.remove("d-none");
                document.getElementById("errorNegativeMark").classList.add("d-block");
                document.getElementById("errorNegativeMark").innerHTML =
                    "Enter valid negative markvalue";
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

