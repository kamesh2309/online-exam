import myimg from "./image/logo.png";
const Header = () => {
  function getDate() {
    const now = new Date();
    const date = now.getDate();
    const Month = now.getMonth();
    const Year = now.getFullYear();
    console.log(`Date: ${date}-${Month}-${Year} `)
    return `Date: ${date}-${Month}-${Year} `;
  }
  
  return (
    <div>
      <div className="row ">
        <nav className="navbar navbar expand-lg bg-header">
          <div className="col-4">
            <img src={myimg} alt="Logo" className="logo"></img>
          </div>
          <div className="col-4"></div>
          <div className="col-4 ">
            <p className="dateheader ">{getDate()}</p>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
