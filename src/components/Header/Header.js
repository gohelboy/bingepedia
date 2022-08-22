import "./Header.css";
import logo from "./white-logo.png";

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt="Bingpedia" />
        </div>
    );
};
export default Header;