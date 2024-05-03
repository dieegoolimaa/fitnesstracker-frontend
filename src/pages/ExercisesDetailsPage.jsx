import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ExercisesDetailsPage = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    const fetchExerciseDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/exercises/${id}`
        );
        if (response.ok) {
          const exerciseData = await response.json();
          setExercise(exerciseData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchExerciseDetails();
  }, [id]);

  return (
    <div>
      {exercise && (
        <div>
          <h1>{exercise.name}</h1>
          <p>
            <strong>Target Muscle:</strong> {exercise.target_muscle}
          </p>
          <p>
            <strong>Description:</strong> {exercise.description}
          </p>
          <p>
            <strong>Equipment:</strong> {exercise.equipment || "None"}
          </p>
          <h2>Sets</h2>
          <ul>
            {exercise.sets.map((set, index) => (
              <li key={index}>
                Reps: {set.reps}, Weight: {set.weight || "N/A"}, Rest Time:{" "}
                {set.rest_time || "N/A"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExercisesDetailsPage;
