import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Paper } from '@mui/material';
import { PORT, PROTOCOL } from './ExamConstants';

const Question = () => {
    const { id, value, noq, tId, qId } = useParams();
    const navigate = useNavigate();
    const url = `${PROTOCOL}://${window.location.hostname}:${PORT}`;
    const [formDatas, setFormData] = useState({
        questionDetail: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        optionE: "",
        answer: "",
        numAnswers: "",
        difficultyLevel: "",
        answerValue: "",
        negativeMarkValue: "",
        questionType: 'QT_SC'

    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `${url}/exammodule/control/show-question?editQuestionId=${qId}`
                    , { credentials: "include" });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                if (data.notLogin === "notLogin") {
                    navigate("/")
                }
                setFormData(data.editQuestionMap);

            } catch (error) {
                console.error("Error fetching data:", error);
            }

        }
        fetchData();

    }, []);
    return (
        <div>
            <div className="row justify-content-center mb-5">
                <div className="px-lg-5 px-3">
                    <nav className="myStyle small-content-text">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/" className="text-muted">
                                    Home
                                </Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="/admin" className="text-muted">
                                    Admin
                                </Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link
                                    to={`/admin/view-exam-topic/${id}/${value}/${noq}`}
                                    className="text-muted"
                                >
                                    Topics
                                </Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link className="text-muted" to={`/admin/view-exam-topic/view-question/${id}/${value}/${noq}/${tId}`}>View-Question</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="">Question </Link>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <h4 className="textcolor fst-italic table fw-bold text-dark text-center small-heading-text  ">
                Question Id -- {qId}
            </h4>
            <div className='row justify-content-center textcolor '>
                <div className='col-lg-10 mb-5'>
                    <Paper className='questionbg-color' elevation={15} >

                        <div class="my-4 row ">
                            <label class="col-sm-2 col-form-label center-text ps-3 questiontext-color small-content-text"> Question Detail</label>
                            <div class=" col-sm-10 ">
                                <input type="text" readonly className="form-control-plaintext border center-text ps-3" value={formDatas.questionDetail} />
                            </div>
                        </div>

                        <div class="my-4 row">
                         <label class="col-sm-2 col-form-label d-lg-block d-none   questiontext-color text-center small-content-text">Options</label>
                         {formDatas.optionA &&  <div class=" col-sm-10 ">
                         <label class="col-sm-2 col-form-label d-lg-none d-block   questiontext-color text-center small-content-text">Options</label>
                                <div className='row'>
                                    <div className='col-6'>
                                        {formDatas.optionA && <textarea type="text" readonly className="form-control-plaintext border center-text ps-3" value={formDatas.optionA} />}
                                        <br />
                                    </div>
                                    <div className='col-6'>
                                        {formDatas.optionB && <textarea type="text" readonly className="form-control-plaintext border center-text ps-3" value={formDatas.optionB} />}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        {formDatas.optionC && <textarea type="text" readonly className="form-control-plaintext border center-text ps-3" value={formDatas.optionA} />}
                                        <br />
                                    </div>
                                    <div className='col-6'>
                                        {formDatas.optionD && <textarea type="text" readonly className="form-control-plaintext border center-text ps-3 " value={formDatas.optionB} />}
                                    </div>
                                </div>
                                <div className='row justify-content-center '>
                                    <div className='col-6'>
                                        {formDatas.optionE && <textarea type="text" readonly className="form-control-plaintext border center-text ps-3 " value={formDatas.optionA} />}
                                        <br />
                                    </div>
                                </div>
                            </div>}

                            <div class="my-4 row ">
                                <label class="col-sm-2 col-form-label  questiontext-color text-center small-content-text">Answer</label>
                                <div class=" col-sm-10 ">
                                    <input type="text" readonly className="form-control-plaintext border ps-lg-3 center-text " value={formDatas.answer} />
                                </div>
                            </div>
                            <div className='row'>
                                <label class="col-sm-2 col-form-label  questiontext-color text-center small-content-text">Num Answer </label>
                                <div className='col-lg-3 col-12'>
                                    <input type="text" readonly className="form-control-plaintext border text-center" value={formDatas.numAnswers} />
                                    <br />
                                </div>
                                <label class="col-sm-2 col-form-label  questiontext-color text-center small-content-text">Answer Value </label>
                                <div className='col-lg-3 col-12'>
                                    {formDatas.answerValue && <input type="text" readonly className="form-control-plaintext border text-center" value={formDatas.answerValue} />}
                                </div>
                            </div>
                            <div className='row'>
                                <label class="col-sm-2 col-form-label  questiontext-color text-center small-content-text">Difficulty Level </label>
                                <div className='col-lg-3 col-12'>
                                    {formDatas.difficultyLevel && <input type="text" readonly className="form-control-plaintext border text-center" value={formDatas.difficultyLevel} />}
                                    <br />
                                </div>
                                <label class="col-sm-2 col-form-label  questiontext-color text-center small-content-text">Negative Mark </label>
                                <div className='col-lg-3 col-12'>
                                    {formDatas.negativeMarkValue && <input type="text" readonly className="form-control-plaintext border  text-center" value={formDatas.negativeMarkValue} />}
                                </div>
                            </div>

                        </div>


                    </Paper>
                </div>


            </div>
        </div>
    )
}

export default Question
