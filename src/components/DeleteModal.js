
const DeleteModal = ({onClick,name,id,type,index}) => {
    
    return (
        <div>
            <div className="modal fade" id={index} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className=" modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header position-relative small-heading-text">
                            <h5 className="modal-title position-absolute delete-modal fw-bold fst-italic textcolor text-danger " id="staticBackdropLabel">{id}-{name}</h5>
                            <button type="button" className="btn-close small-button" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body fw-bold fst-italic textcolor">
                            Are you sure u want to Delete {type}..
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-danger fw-bold fst-italic textcolor small-button" onClick={onClick} data-bs-dismiss="modal">Delete</button>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DeleteModal
