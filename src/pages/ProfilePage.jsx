import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import style from "../styles/UserProfilePage.module.css";
import PasswordChange from "../components/PasswordChange"; // Importing the PasswordChange component
const ProfilePage = () => {
  const { token } = useContext(SessionContext);

  const [userData, setUserData] = useState(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false); // State to manage the visibility of the password change form

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from backend
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch user data:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error.message);
      }
    };

    fetchUserData();
  }, [token]);

  const handleShowPasswordChange = () => {
    if (!showPasswordChange) {
      setShowPasswordChange(true); // Show the password change form when the user clicks on "Change Password"
    }
  };

  const handlePasswordChangeSuccess = () => {
    setShowPasswordChange(false); // Hide the password change form after successful password change
  };

  return (
    <div className={style.profileContainer}>
      <div>
        <div className={style.profileHeader}>
          <h1>User Information</h1>
        </div>
        <div className={style.profileInfo}>
          {userData && (
            <ul className="profile-info">
              <li>
                <b>Name:</b> {userData.name}
              </li>
              <li>
                <b>Email:</b> {userData.email}
              </li>
              <li>
                <b>Age:</b> {userData.age}
              </li>
              <li>
                <b>Gender:</b> {userData.gender}
              </li>
              <li>
                <b>Height:</b> {userData.height}
              </li>
              <li>
                <b>Weight:</b> {userData.weight}
              </li>
              <li>
                <b>Workout Frequency:</b> {userData.workoutFrequency}
              </li>
              {userData.isInstructor && (
                <li>
                  <b>Instructor:</b> Yes
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
      {/* Render the PasswordChange component only if showPasswordChange is true */}
      {showPasswordChange && (
        <PasswordChange onSuccess={handlePasswordChangeSuccess} />
      )}
      {/* Button to show the password change form */}
      {!showPasswordChange && (
        <button
          className={style.passwordChangeBtn}
          onClick={handleShowPasswordChange}
        >
          Change Password
        </button>
      )}
    </div>
  );
};

export default ProfilePage;
