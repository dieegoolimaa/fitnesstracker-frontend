import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import "../styles/UserProfilePage.css";

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
    <div className="profile-container">
      <h1>User Information</h1>
      {userData && (
        <ul className="profile-info">
          <li>
            <span>Name:</span> {userData.name}
          </li>
          <li>
            <span>Email:</span> {userData.email}
          </li>
          <li>
            <span>Age:</span> {userData.age}
          </li>
          <li>
            <span>Gender:</span> {userData.gender}
          </li>
          <li>
            <span>Height:</span> {userData.height}
          </li>
          <li>
            <span>Weight:</span> {userData.weight}
          </li>
          <li>
            <span>Workout Frequency:</span> {userData.workoutFrequency}
          </li>
          {userData.isInstructor && (
            <li>
              <span>Is Instructor:</span> Yes
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ProfilePage;
