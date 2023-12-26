import { ValidName, ValidPassword, validNumber } from './RegexValidation';

export const AddExamValidator = (key, value, setHasError) => {
  switch (key) {
    case "examName": {
      
      if (value === "" || value === null) {
        document.getElementById("errorExamname").classList.remove("d-none");
        document.getElementById("errorExamname").classList.add("d-block");
        document.getElementById("errorExamname").innerHTML =
          "PLEASE ENTER YOUR Exam-Name";
        setHasError(false);
      }
      else {
        if (!ValidName.test(value)) {
          document.getElementById("errorExamname").classList.remove("d-none");
          document.getElementById("errorExamname").classList.add("d-block");
          document.getElementById("errorExamname").innerHTML = "ENTER VALID Exam-Name";
          setHasError(false);
        }
      }
    } break;
    case "noOfQuestions": {
      if (value === "" || value === null) {
        console.log(value)
        document.getElementById("errornoofques").classList.remove("d-none");
        document.getElementById("errornoofques").classList.add("d-block");
        document.getElementById("errornoofques").innerHTML =
          "PLEASE ENTER YOUR No-Of-Questions";
        setHasError(false);
      }
      else {
        if (!validNumber.test(value)) {
          document.getElementById("errornoofques").classList.remove("d-none");
          document.getElementById("errornoofques").classList.add("d-block");
          document.getElementById("errornoofques").innerHTML =
            "ENTER VALID  No-Of-Questions";
          setHasError(false);
        }
      }
    } break;
    case "durationMinutes": {
      if (value === "" || value === null) {
        console.log(value)
        document.getElementById("errorduration").classList.remove("d-none");
        document.getElementById("errorduration").classList.add("d-block");
        document.getElementById("errorduration").innerHTML =
          "PLEASE ENTER Duration-Minutes";
        setHasError(false);
      }
      else {
        if (!validNumber.test(value)) {
          document.getElementById("errorduration").classList.remove("d-none");
          document.getElementById("errorduration").classList.add("d-block");
          document.getElementById("errorduration").innerHTML =
            "ENTER VALID Duration-Minutes";
          setHasError(false);
        }
      }
    } break;
    case "passPercentage": {
      if (value === "" || value === null) {
        console.log(value)
        document.getElementById("errorpasspercent").classList.remove("d-none");
        document.getElementById("errorpasspercent").classList.add("d-block");
        document.getElementById("errorpasspercent").innerHTML =
          "PLEASE ENTER YOUR Pass-Percentage";
        setHasError(false);
      }
      else {
        if (!validNumber.test(value)) {
          document.getElementById("errorpasspercent").classList.remove("d-none");
          document.getElementById("errorpasspercent").classList.add("d-block");
          document.getElementById("errorpasspercent").innerHTML =
            "ENTER VALID Pass-Percentage";
          setHasError(false);
        }
      }
    } break;
    case "negativeMarkValue": {
      if (value === "" || value === null) {
        console.log(value)
        document.getElementById("errornmark").classList.remove("d-none");
        document.getElementById("errornmark").classList.add("d-block");
        document.getElementById("errornmark").innerHTML =
          "PLEASE ENTER YOUR Negative-Mark-Value";
        setHasError(false);
      }
      else {
        if (!validNumber.test(value)) {
          document.getElementById("errornmark").classList.remove("d-none");
          document.getElementById("errornmark").classList.add("d-block");
          document.getElementById("errornmark").innerHTML =
            "ENTER VALID Negative-Mark-Value";
          setHasError(false);
        }
      }
    } break;
    case "fromDate":
      {

      } break;
    default:
      setHasError(true);
      console.log("LOGIN-FORM VALIDATED SUCCESSFULLY");


  }
}


