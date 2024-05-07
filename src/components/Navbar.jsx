import { useContext, useState } from "react";
import logo from "../assets/training.png";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext.jsx";
import style from "../styles/Navbar.module.css";

const Navbar = () => {
  const { token, setToken } = useContext(SessionContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    setToken(null);
  };

  const handleClick = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };

  return (
    <div className={style.navbarContainer}>
      <div className={style.logoContainer}>
        <img className={style.logo} src={logo} alt="logo" />
        <h1 className={style.title}>Workout Tracker</h1>
      </div>
      <div>
        {token ? (
          <>
            <ul>
              <li>
                <Link className={style.link} to="/">
                  Home
                </Link>
              </li>
              <li onClick={handleClick}>
                User
                {dropdownOpen && (
                  <ul className={style.dropdown}>
                    <li>
                      <Link className={style.link} to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className={style.link} to="/workout">
                        Workout
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={style.link}
                        to="/"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link className={style.link} to="/exercises">
                  All Exercises
                </Link>
              </li>
              <li>
                <Link className={style.link} to="/about">
                  About
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul>
              <li>
                <Link className={style.link} to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className={style.link} to="/login">
                  Log in
                </Link>
              </li>
              <li>
                <Link className={style.link} to="/exercises">
                  All Exercises
                </Link>
              </li>
              <li>
                <Link className={style.link} to="/about">
                  About
                </Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
