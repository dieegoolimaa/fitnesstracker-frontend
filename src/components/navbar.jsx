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
          <>
            <li>
              <Link to="/exercises/new">Create new Exercise</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/exercises">All Exercises</Link>
        </li>
        <li>
          <Link to="/workouts">Workouts</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
