import { ValidName, ValidPassword, validNumber } from './RegexValidation';

export const AddExamValidator = (key, value, setHasError) => {
  switch (key) {
    case "examName": {
      
      if (value === "" || value === null) {
        document.getElementById("errorExamname").classList.remove("d-none");
        document.getElementById("errorExamname").classList.add("d-block");
        document.getElementById("errorExamname").innerHTML =
          "please enter your exam-name";
        setHasError(false);
      }
      else {
        if (!ValidName.test(value)) {
          document.getElementById("errorExamname").classList.remove("d-none");
          document.getElementById("errorExamname").classList.add("d-block");
          document.getElementById("errorExamname").innerHTML = "enter valid exam-name";
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
          "Please enter your no of questions";
        setHasError(false);
      }
      else {
        if (!validNumber.test(value)) {
          document.getElementById("errornoofques").classList.remove("d-none");
          document.getElementById("errornoofques").classList.add("d-block");
          document.getElementById("errornoofques").innerHTML =
            "Enter valid  no of questions";
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
          "Please enter duration minutes";
        setHasError(false);
      }
      else {
        if (!validNumber.test(value)) {
          document.getElementById("errorduration").classList.remove("d-none");
          document.getElementById("errorduration").classList.add("d-block");
          document.getElementById("errorduration").innerHTML =
            "Enter valid duration minutes";
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
          "Please enter your pass percentage";
        setHasError(false);
      }
      else {
        if (!validNumber.test(value)) {
          document.getElementById("errorpasspercent").classList.remove("d-none");
          document.getElementById("errorpasspercent").classList.add("d-block");
          document.getElementById("errorpasspercent").innerHTML =
            "Enter valid pass percentage";
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
          "Please enter your negative mark value";
        setHasError(false);
      }
      else {
        if (!validNumber.test(value)) {
          document.getElementById("errornmark").classList.remove("d-none");
          document.getElementById("errornmark").classList.add("d-block");
          document.getElementById("errornmark").innerHTML =
            "Enter valid negative mark value";
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


