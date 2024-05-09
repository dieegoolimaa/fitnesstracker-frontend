import { useState } from "react";
import style from "../styles/PasswordChange.module.css";

const PasswordChange = ({ onSuccess }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null); // State to store error message

  const handleChangePassword = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      if (response.status === 200) {
        setError(null);
        // Password successfully changed
        alert("Password changed successfully");
        onSuccess(); // Call the onSuccess callback after successful password change
      } else {
        // Get error message from response body
        const { message } = await response.json();
        setError(message);
      }
    } catch (error) {
      console.error("Failed to change password:", error.message);
      setError("Failed to change password. Please try again.");
    }
  };

  return (
    <div className={style.passwordChangeContainer}>
      <h2>Change Password</h2>
      <form className={style.formContainer} onSubmit={handleChangePassword}>
        <div className={style.inputContainer}>
          <label>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className={style.inputContainer}>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className={style.inputContainer}>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className={style.button} type="submit">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default PasswordChange;
