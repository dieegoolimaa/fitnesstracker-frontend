import { useContext, useState, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";
import "../styles/CreateWorkout.css";

const CreateWorkoutPage = () => {
  const { withToken } = useContext(SessionContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [availableExercises, setAvailableExercises] = useState([]);

  // Fetch available exercises when component mounts
  useEffect(() => {
    fetchAvailableExercises();
  }, []);

  const fetchAvailableExercises = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/exercises`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch exercises");
      }
      const exercisesData = await response.json();
      console.log("Exercises data:", exercisesData); // Log exercises data
      // Add selected property to each exercise
      const exercisesWithSelection = exercisesData.map((exercise) => ({
        ...exercise,
        selected: false,
      }));
      console.log("Exercises with selection:", exercisesWithSelection); // Log exercises with selection
      setAvailableExercises(exercisesWithSelection);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Filter selected exercises
    const selectedExercises = availableExercises.filter(
      (exercise) => exercise.selected
    );
    console.log("Selected exercises:", selectedExercises);

    // Construct payload
    const payload = { name, exercises: selectedExercises };
    console.log("Payload:", payload);

    try {
      const response = await withToken("/workouts", "POST", payload);
      console.log("Response:", response);

      // Navigate to workouts page
      navigate("/workouts");
    } catch (error) {
      console.error("Error creating workout:", error);
    }
  };

  const handleCheckboxChange = (exerciseId) => {
    setAvailableExercises((prevExercises) => {
      const updatedExercises = prevExercises.map((exercise) => {
        if (exercise._id === exerciseId) {
          return {
            ...exercise,
            selected: !exercise.selected,
          };
        }
        return exercise;
      });
      console.log("Updated exercises:", updatedExercises); // Log updated exercises
      return updatedExercises;
    });
  };

  return (
    <div className="form-container">
      <h1>Create a Workout</h1>
      <form onSubmit={handleSubmit}>
        <br></br>
        <label>
         <h1>Name:</h1> 
          <input value={name} onChange={(event) => setName(event.target.value)} required />
        </label>
        <div className="available-exercises">
          <h2>Available Exercises:</h2>
          <div className="exercise-container">
            {availableExercises.map((exercise) => (
              <div key={exercise._id} className={`exercise-box ${exercise.selected ? 'selected' : ''}`} onClick={() => handleCheckboxChange(exercise._id)}>
                <label htmlFor={`exercise-${exercise._id}`}>{exercise.name}</label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="create-workout-button">
          Create Workout
        </button>
      </form>
    </div>
  );
};

export default CreateWorkoutPage;





