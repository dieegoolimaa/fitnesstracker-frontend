import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import style from "../styles/UserDetails.module.css";

const UserDetailsPage = () => {
  const { token } = useContext(SessionContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("Token:", token); // Log the token
    const fetchUsers = async () => {
      try {
        console.log("Fetching users...");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/instructors/users`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Users fetched successfully:", data);
          setUsers(data);
        } else {
          console.error("Failed to fetch users:", response.statusText);
          // Additional log to check response status
          console.log("Response status:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error.message);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  return (
    <div className={style.userDetailsPage}>
      <h1>All Users</h1>
      <div className={style.userList}>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <div className={style.userInfo}>
                <div>
                  <b>{user.name}</b>
                </div>
                <div>{user.email}</div>
                <div>{user.age} years old</div>
              </div>
              <div className={style.userPhysicalInfo}>
                <div>
                  <b>Gender:</b> {user.gender}
                </div>
                <div>
                  <b>Height:</b> {user.height}m
                </div>
                <div>
                  <b>Weight:</b> {user.weight}kg
                </div>
              </div>
              <div className={style.userWorkoutInfo}>
                <div>
                  <b>Workout Frequency:</b> {user.workoutFrequency}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDetailsPage;
