<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DraggableList from '../components/DraggableList.jsx';
import '../styles/WorkoutPage.css';
=======
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/WorkoutPage.css";
>>>>>>> 61f22d100c87ccdeb6c98fc366832204ae58a4a2

const AllWorkoutsPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState("");

  const fetchWorkouts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/workouts`);
      if (response.ok) {
        const workoutsData = await response.json();
        setWorkouts(workoutsData);
      } else {
        throw new Error("Failed to fetch workouts");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch workouts");
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div className="workout-container">
      <h1 className="title">All Workouts</h1>
      <Link to="/create-workout" className="create-workout-link">
        Create a Workout
      </Link>
      {error ? (
        <p className="error">{error}</p>
      ) : workouts.length === 0 ? (
        <p className="no-workouts">No workouts found in database</p>
      ) : (
        <div className="draggable-container">
          <DraggableList items={workouts.map(workout => workout.name)} />
        </div>
      )}
    </div>
  );
};  


export default AllWorkoutsPage;
<<<<<<< HEAD

=======
>>>>>>> 61f22d100c87ccdeb6c98fc366832204ae58a4a2
