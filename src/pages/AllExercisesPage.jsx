import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AllExercisesPage.css";

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
    <div className="exercise-page">
      <h1>All Exercises</h1>
      <div className="exercise-container">
        {exercises.map((currentExercise) => (
          <Link
            className="exercise-info"
            to={`/exercises/${currentExercise._id}`}
            key={currentExercise._id}
          >
            <h2>{currentExercise.name.toUpperCase()}</h2>
            <p>{currentExercise.target_muscle}</p>
            <p>{currentExercise.description}</p>
            <img src={currentExercise.image} />{" "}
            {/* Assuming image is 'image' */}
            <img src={currentExercise.image} />
          </Link>
        ))}
      </div>
    </div>
  );
}; // commit testing

export default AllExercisesPage;
