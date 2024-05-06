import { useEffect, useState } from "react";
import "../styles/AllExercisesPage.css";

const AllExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
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
      <div className="exercise-title">
        <h1>All Exercises</h1>
      </div>

      <div>
        {exercises.map((currentExercise) => (
          <div
            key={currentExercise._id}
            className={`exercise-item ${
              selectedId === currentExercise._id ? "selected" : ""
            }`}
            onClick={() => setSelectedId(currentExercise._id)}
          >
            <h2>{currentExercise.name.toUpperCase()}</h2>
            <p>{currentExercise.target_muscle}</p>
            {selectedId === currentExercise._id && (
              <>
                <p>{currentExercise.description}</p>
                <div>
                  <img
                    src={currentExercise.image1}
                    alt={currentExercise.name}
                  />
                  <img
                    src={currentExercise.image1}
                    alt={currentExercise.name}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default AllExercisesPage;
