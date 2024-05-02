import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AllExercisesPage.css"; // Import your CSS file

const AllExercisesPage = () => {
  const [exercises, setExercises] = useState([]);

  const fetchExercises = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/exercises`
      );
      if (response.ok) {
        const exercisesData = await response.json();
        setExercises(exercisesData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <div>
      <h1>All Exercises</h1>
      <div className="exercise-container">
        {exercises.map((currentExercise) => (
          <Link
            to={`/exercises/${currentExercise._id}`}
            key={currentExercise._id}
            className="exercise-box"
          >
            <h2>{currentExercise.name.toUpperCase()}</h2>
            <p> {currentExercise.target_muscle}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}; // commit testing

export default AllExercisesPage;
