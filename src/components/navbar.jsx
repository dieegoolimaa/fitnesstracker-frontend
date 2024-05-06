import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import "../styles/Navbar.css"; // Import your CSS file

const Navbar = () => {
  const { token, logout } = useContext(SessionContext);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {token ? (
          <li className="dropdown" onClick={handleClick}>
            <span>Profile</span>
            {open && (
              <ul className="dropdown-content">
                <li className="dropdown-item">
                  <Link to="/profile">Personal Information</Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/workouts">Workouts</Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/" onClick={logout}>
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </li>
        ) : (
          <li>
            <Link to="/login">Log In</Link>
          </li>
        )}
        <li>
          <Link to="/exercises">All Exercises</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
