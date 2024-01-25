import { useNavigate, useParams } from "react-router-dom"
import { PORT, PROTOCOL } from "../ExamConstants";
import { useEffect, useState } from "react";

const ExamPage = () => {
    const { uId, eId } = useParams();
    const [selectedValue, setSelectedValue] = useState();
    const [allchecked, setAllChecked] = useState([]);

    const selectedOption = (e) => {
        setSelectedValue(e.currentTarget.value);
    }
    const handleChange = (e) => {
        if (e.target.checked) {
            setAllChecked([...allchecked, e.target.value]);
        } else {
            setAllChecked(allchecked.filter((item) => item !== e.target.value));
        }
    }
    console.log("the value u selected...", selectedValue)
    console.log("the value u selected in checked...", allchecked)
    const navigate = useNavigate();

    const url = `${PROTOCOL}://${window.location.hostname}:${PORT}`;

    async function fetchData() {
        const response = await fetch(`${url}/exammodule/control/start-exam?examId=${eId}`, {
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.notLogin === "notLogin") {
            navigate("/")
        }
        console.log("Question Values........", data)
    }
    const questionType = "QT_SC";
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="row p-5">
            <div className="col-lg-9 border border-4 textcolor small-content-text" >

                {questionType == "QT_SC" ?
                    (<div>
                        <p>
                            1. Which of the following is used in React.js to increase performance?
                        </p>
                        <div className="ps-5">
                            <input type="radio" id="optionA" name="optionA" value="optionA" checked={selectedValue == "optionA"} onChange={selectedOption} />
                            <label htmlFor="optionA"> 1</label>
                            <br />
                            <input type="radio" name="optionB" value="optionB" checked={selectedValue == "optionB"} onChange={selectedOption} />
                            <label htmlFor="optionB"> 2</label>
                            <br />
                            <input type="radio" name="optionC" value="optionC" checked={selectedValue == "optionC"} onChange={selectedOption} />
                            <label htmlFor="optionC"> 3</label>
                            <br />
                            <input type="radio" name="optionD" value="optionD" checked={selectedValue == "optionD"} onChange={selectedOption} />
                            <label htmlFor="optionD"> 4</label>
                            <br />
                            <input type="radio" name="optionE" value="optionE" checked={selectedValue == "optionE"} onChange={selectedOption} />
                            <label htmlFor="optionE">5</label>
                        </div>
                    </div>) : questionType == "QT_MC" ?
                        (<div>
                            <p>
                                1. Which of the following is used in React.js to increase performance?
                            </p>
                            <input value="optionA" name="optionA" type="checkbox" onChange={handleChange} />
                            <span>optionA</span>
                            <br />
                            <input value="optionB" name="optionB" type="checkbox" onChange={handleChange} />
                            <span>optionB</span>
                            <br />
                            <input value="optionC" name="optionC" type="checkbox" onChange={handleChange} />
                            <span>optionC</span>
                            <br />
                            <input value="optionD" name="optionD" type="checkbox" onChange={handleChange} />
                            <span>optionD</span>

                            <div className="pt-4">The all checked values are {allchecked.join(" , ")}</div>
                        </div>
                        ) : questionType == "QT_TF" ?
                            (<div>
                                <p>
                                    1. Which of the following is used in React.js to increase performance?
                                </p>
                                <div className="ps-5">
                                    <input type="radio" id="optionA" name="optionA" value="optionA" checked={selectedValue == "optionA"} onChange={selectedOption} />
                                    <label htmlFor="optionA"> 1</label>
                                    <br />
                                    <input type="radio" name="optionB" value="optionB" checked={selectedValue == "optionB"} onChange={selectedOption} />
                                    <label htmlFor="optionB"> 2</label>
                                </div>
                            </div>) : questionType == "QT_FIB" ?
                                (<div>
                                    <span>
                                        1. Which of the following is used in React.js to increase performance ?
                                    </span> <input className="fill-up" type="text" />
                                </div>) : (
                                    <div>
                                        <p>
                                            1. Which of the following is used in React.js to increase performance ?
                                        </p>
                                        <div className="m-2">
                                            <textarea className="userInput" placeholder="Write your ansewer" type="text" />
                                        </div>
                                    </div>
                                )}
            </div>
            <div className="col-lg-3 border border-4 small-content-text">
                <p>here i show the history of the question </p>
            </div>
        </div>

    )


}

export default ExamPage
