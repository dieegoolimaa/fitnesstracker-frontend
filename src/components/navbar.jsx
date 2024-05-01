import React from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import { useContext } from "react";
const Navbar = () => {
  const { token, logout } = useContext(SessionContext)

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        {token ? (
          <>
            <li>
              <Link to='/exercises/new'>Create new Exercise</Link>
            </li>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <button type='button' onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <li>
              <Link to='/signup'>Signup</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </>
        )}
        <li>
          <Link to='/exercises'>All exercises</Link>
        </li>
        <li>
        <Link to='/about'>About</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar;
