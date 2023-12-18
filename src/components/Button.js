const Button = () => {
  return (
    <table className="table table-striped table-borderless fst-italic">
      <thead className="table-info">
        <tr>
          <th scope="col" className="text-center">
            Exam-Id
          </th>
          <th scope="col" className="text-center">
            Exam-Name
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="align-middle">
          <th scope="row" className="text-center">
            1
          </th>
          <td className="text-center">Mark</td>
        </tr>
        <tr>
          <td colSpan="4">
            <table>
              <thead className="table-info">
                <tr>
                  <th scope="col">Topic-Id</th>
                  <th scope="col">Topic-Name</th>
                  <th scope="col">Edit</th>
                  <th scope="col">View</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr className="align-middle">
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>
                    <Link to="" className=" justify-content-center d-flex">
                      <i className="bi bi-pen-fill text-dark" title="Edit"></i>
                    </Link>
                  </td>
                  <td>
                    <Link to="" className="justify-content-center d-flex">
                      <i
                        className=" bi bi-folder-symlink-fill  text-success"
                        title="View"
                      ></i>
                    </Link>
                  </td>
                  <td>
                    <Link to="" className="justify-content-center d-flex">
                      <i
                        className="bi bi-trash2-fill text-danger"
                        title="Delete"
                      ></i>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Button;
