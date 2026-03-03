import "./Header.css";
import logo from "./logo.svg";

const Header = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="header">
      <img onClick={handleClick} src={logo} alt="Bingepedia" />
    </div>
  );
};

export default Header;

