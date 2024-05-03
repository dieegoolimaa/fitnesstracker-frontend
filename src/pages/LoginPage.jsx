import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const { setToken } = useContext(SessionContext);
  const [error, setError] = useState(null); // State to store error message

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }), // Send email instead of username
        }
      );

      if (response.status === 200) {
        const parsed = await response.json();
        setToken(parsed.token);
        localStorage.setItem("authToken", parsed.token); // Store token in localStorage
        navigate("/profile");
      } else {
        // Get error message from response body
        const { message } = await response.json();
        setError(message); // Set error state
      }
    } catch (error) {
      console.error("Failed to log in:", error.message);
      setError("Failed to log in. Please try again."); // Set error state
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
          />
        </label>
        <label>
          Password
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
          />
        </label>
        <button type="submit">Log In</button>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Display error message */}
      </form>
      <div className="signup-link">
        <p>Do not have an account?</p>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
