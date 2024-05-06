import { useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import "../styles/Navbar.css"; // Import your CSS file

const Navbar = () => {
  const { token, logout } = useContext(SessionContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {token ? (
          <li className="dropdown">
            <Link to="/profile">Profile</Link>
            <ul className="dropdown-content">
              <li>
                <Link to="/workouts">Workouts</Link>
              </li>
              <li>
                <Link onClick={logout}>Logout</Link>
              </li>
            </ul>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </>
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
