import logo from "../../images/news-logo.png";
import "./header.scss";

const Header = () => {
    return (
        <header>
            <div className="wrapper">
                <div className="navbar">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="nav-links">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;