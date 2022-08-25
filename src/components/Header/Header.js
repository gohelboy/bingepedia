import "./Header.css";
import logo from "./logo.svg";

const Header = () => {
  return (
    <div className="header">
      <img onClick={() => window.scrollTo(0, 0)} src={logo} alt="Bingepedia" />
    </div>
  );
};
export default Header;
