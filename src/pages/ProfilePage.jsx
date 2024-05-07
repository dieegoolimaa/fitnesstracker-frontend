import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import style from "../styles/UserProfilePage.module.css";

const ProfilePage = () => {
  const { token } = useContext(SessionContext); // Access the token from the context

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from your backend API
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Use the token from context
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data); // Add this line
          setUserData(data);
        } else {
          console.error("Failed to fetch user data:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error.message);
      }
    };

    fetchUserData();
  }, [token]); // Fetch user data whenever token changes

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
                  <b>Is Instructor:</b> Yes
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
