import "./Header.css";
import logo from "./white-logo.png";

const Header = () => {
  return (
    <div className="header">
      <img onClick={() => window.scrollTo(0, 0)} src={logo} alt="Bingpedia" />
    </div>
  );
};
export default Header;
