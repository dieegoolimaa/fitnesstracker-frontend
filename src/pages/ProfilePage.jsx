import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from '../contexts/SessionContext'; 

const ProfilePage = () => {
  const { token } = useContext(SessionContext); // Access the token from the context

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from your backend API
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Use the token from context
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data); // Add this line
          setUserData(data);
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error.message);
      }
    };

    fetchUserData();
  }, [token]); // Fetch user data whenever token changes

  return (
    <>
      <h1>User Information</h1>
      {userData && (
        <ul>
          <li>Name: {userData.name}</li>
          <li>Email: {userData.email}</li>
          <li>Age: {userData.age}</li>
          <li>Gender: {userData.gender}</li>
          <li>Height: {userData.height}</li>
          <li>Weight: {userData.weight}</li>
          <li>Workout Frequency: {userData.workoutFrequency}</li>
          {userData.isInstructor && <li>Is Instructor: Yes</li>}
        </ul>
      )}
    </>
  );
};

export default ProfilePage;


