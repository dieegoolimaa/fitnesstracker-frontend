import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../contexts/SessionContext'; // Assuming you have a SessionContext for managing authentication state

const UserDetailsPage = () => {
    const { token } = useContext(SessionContext);
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
        console.log('Token:', token); // Log the token
      const fetchUsers = async () => {
        try {
          console.log('Fetching users...');
          const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/instructors/users`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            console.log('Users fetched successfully:', data);
            setUsers(data);
          } else {
            console.error('Failed to fetch users:', response.statusText);
            // Additional log to check response status
            console.log('Response status:', response.status);
          }
        } catch (error) {
          console.error('Failed to fetch users:', error.message);
        }
      };
  
      if (token) {
        fetchUsers();
      }
    }, [token]);
  
  return (
    <div>
      <h1>User Details</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
            <div>Age: {user.age}</div>
            <div>Gender: {user.gender}</div>
            <div>Height: {user.height}</div>
            <div>weight: {user.weight}</div>
            <div>workout Frequency: {user.workoutFrequency}</div>
            {/* Display other user details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetailsPage;



