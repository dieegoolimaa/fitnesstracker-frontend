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
        <h1 className={style.title}>Fitness Tracker</h1>
      </div>
      <div>
        {token ? (
          <>
            <ul>
              <li>
                <Link className={style.link} to="/">
                  HOME
                </Link>
              </li>
              <li onClick={handleClick}>
                USER
                {dropdownOpen && (
                  <ul className={style.dropdown}>
                    <li>
                      <Link className={style.link} to="/profile">
                        PROFILE
                      </Link>
                    </li>
                    <li>
                      <Link className={style.link} to="/workouts">
                        WORKOUT
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={style.link}
                        to="/"
                        onClick={handleLogout}
                      >
                        LOGOUT
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link className={style.link} to="/exercises">
                  EXERCISES
                </Link>
              </li>
              <li>
                <Link className={style.link} to="/about">
                  ABOUT
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul>
              <li>
                <Link className={style.link} to="/">
                  HOME
                </Link>
              </li>
              <li>
                <Link className={style.link} to="/login">
                  LOGIN
                </Link>
              </li>
              <li>
                <Link className={style.link} to="/about">
                  ABOUT
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
