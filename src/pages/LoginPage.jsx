import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate, Link } from "react-router-dom";
import style from "../styles/LoginPage.module.css";

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
          body: JSON.stringify({ email, password }), 
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
        setError(message); 
      }
    } catch (error) {
      console.error("Failed to log in:", error.message);
      setError("Failed to log in. Please try again."); 
    }
  };

  return (
    <div className={style.loginContainer}>
      <h1>Login</h1>

      <form className={style.loginForm} onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            className={style.inputField}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            placeholder="Enter your email"
          />
        </label>
        <label className={style.labelField}>
          Password:
          <input
            className={style.inputField}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            placeholder="Enter your password"
          />
        </label>
        <div className={style.loginButtonContainer}>
          <button className={style.loginButton} type="submit">
            Log In
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}{" "}
      </form>
      <div className={style.signupContainer}>
        <p>Do not have an account?</p>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
