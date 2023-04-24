import { Link } from "react-router-dom";

const Header = props => {
  const { onNav, ...rest } = props;
  return <div >
    <div style={{margin: '0 auto', width: '1000px'}} {...rest}>
      <img src="/favicon.png" alt="" style={{
        margin: "15px 10px 15px 0",
        height: "50px",
        width: "auto",
      }} />
      <div>
        NASA Mission Control
      </div>
      <nav>
        <div onClick={onNav}>
          <div layer="header">
            <Link to="/launch">
              <i className="material-icons">check_circle_outline</i>Launch
            </Link>
          </div>
        </div>
        <div onClick={onNav}>
          <div layer="header">
            <Link to="/upcoming">
            <i className="material-icons">update</i>Upcoming</Link>
          </div>
        </div>
        <div onClick={onNav}>
          <div layer="header">
            <Link to="/history">
            <i className="material-icons">history</i>History</Link>
          </div>
        </div>
      </nav>
    </div>
  </div>
};

export default Header;