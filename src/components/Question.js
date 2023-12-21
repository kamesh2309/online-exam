import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Paper } from '@mui/material';

const Question = () => {
    const { id, value, noq, tId, qId } = useParams();
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
            const response = await fetch(
                `https://localhost:8443/exammodule/control/show-question?editQuestionId=${qId}`
                , { credentials: "include" });
            const data = await response.json();
            console.log("object", data)
            setFormData(data.editQuestionMap);
            console.log("object", formDatas)

        }
        fetchData();

    }, []);
    return (
        <div>
            <nav className="myStyle ">
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
            <h4 className="textcolor fst-italic table fw-bold text-dark text-center ">
                Question Id -- {qId}
            </h4>
            <div className='row justify-content-center textcolor my-5'>
                <div className='col-md-10'>
                    <Paper className='questionbg-color' elevation={15} >

                        <div >
                            <div class="my-4 row  ">
                                <label class="col-sm-2 col-form-label ps-5 questiontext-color"> Question Detail</label>
                                <div class="boxSize col-sm-10 ">
                                    <input type="text" readonly className="form-control-plaintext border ps-3" value={formDatas.questionDetail} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="my-4 row ">
                                <label class="col-sm-2 col-form-label ps-5 questiontext-color">Options</label>
                                <div class="boxSize col-sm-10 ">
                                    <div className='row'>
                                        <div className='col-5'>
                                            {formDatas.optionA && <textarea type="text" readonly className="form-control-plaintext border ps-3  " value={formDatas.optionA} />}
                                            <br />
                                        </div>
                                        <div className='col-5'>
                                            {formDatas.optionB && <textarea type="text" readonly className="form-control-plaintext border ps-3  " value={formDatas.optionB} />}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-5'>
                                            {formDatas.optionC && <textarea type="text" readonly className="form-control-plaintext border ps-3  " value={formDatas.optionA} />}
                                            <br />
                                        </div>
                                        <div className='col-5'>
                                            {formDatas.optionD && <textarea type="text" readonly className="form-control-plaintext border ps-3  " value={formDatas.optionB} />}
                                        </div>
                                    </div>
                                    <div className='row justify-content-center '>
                                        <div className='col-5'>
                                            {formDatas.optionE && <textarea type="text" readonly className="form-control-plaintext border ps-3" value={formDatas.optionA} />}
                                            <br />
                                        </div>
                                    </div>
                                </div>

                                <div class="my-4 row ">
                                    <label class="col-sm-2 col-form-label ps-5 questiontext-color ">Answer</label>
                                    <div class="boxSize col-sm-10 ">
                                        <input type="text" readonly className="form-control-plaintext border ps-3" value={formDatas.answer} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <label class="col-sm-2 col-form-label ps-5 questiontext-color">Num Answer </label>
                                    <div className='col-3'>
                                        <input type="text" readonly className="form-control-plaintext border ps-3" value={formDatas.numAnswers} />
                                        <br />
                                    </div>
                                    <label class="col-sm-2 col-form-label ps-5 questiontext-color">Answer Value </label>
                                    <div className='col-3'>
                                        {formDatas.answerValue && <input type="text" readonly className="form-control-plaintext border ps-3" value={formDatas.answerValue} />}
                                    </div>
                                </div>
                                <div className='row'>
                                    <label class="col-sm-2 col-form-label ps-5 questiontext-color">Difficulty Level </label>
                                    <div className='col-3'>
                                        {formDatas.difficultyLevel && <input type="text" readonly className="form-control-plaintext border ps-3" value={formDatas.difficultyLevel} />}
                                        <br />
                                    </div>
                                    <label class="col-sm-2 col-form-label ps-5 questiontext-color">Negative Mark </label>
                                    <div className='col-3'>
                                        {formDatas.negativeMarkValue && <input type="text" readonly className="form-control-plaintext border ps-3" value={formDatas.negativeMarkValue} />}
                                    </div>
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
