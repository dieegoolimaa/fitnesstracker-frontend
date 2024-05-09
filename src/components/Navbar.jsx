import { useContext, useState, useRef, useEffect } from "react";
import logo from "../assets/logoFitness.png";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext.jsx";
import style from "../styles/Navbar.module.css";

const Navbar = () => {
  const { token, setToken } = useContext(SessionContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setToken(null);
  };

  const handleClick = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={style.navbarContainer}>
      <div className={style.logoContainer}>
        <img className={style.logo} src={logo} alt="logo" />
        <h1 className={style.title}>Fitness Tracker</h1>
      </div>
      <div className={style.navbarItems}>
        {token ? (
          <>
            <ul>
              <li>
                <Link className={style.link} to="/">
                  HOME
                </Link>
              </li>
              <div></div>
              <li
                className={style.userButton}
                onClick={handleClick}
                ref={dropdownRef}
              >
                USER
                {dropdownOpen && (
                  <ul className={style.dropdown}>
                    <div>
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
                    </div>
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
