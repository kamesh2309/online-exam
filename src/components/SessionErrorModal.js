import { Link, useNavigate } from "react-router-dom"

const SessionErrorModal = () => {
    const navigate = useNavigate();
    const onSumbit = () => {
        { navigate("/") }
    }
    return (
        <div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header justify-content-center textcolor" >
                            <h4 className="modal-title fw-bold fst-italic " id="staticBackdropLabel" >U are not Login</h4>
                        </div>
                        <div className="modal-body text-danger">
                            Kindly Login...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-danger" onClick={onSumbit} data-bs-dismiss="modal" id="close-model">
                                Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SessionErrorModal
