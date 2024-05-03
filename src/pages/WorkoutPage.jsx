import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/WorkoutPage.css";

const AllWorkoutsPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState("");

  const fetchWorkouts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/workouts`
      );
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
      <h1>All Workouts</h1>
      <Link to="/create-workout" className="create-workout-link">
        <button>Create a Workout</button>
      </Link>
      {error ? (
        <p>{error}</p>
      ) : workouts.length === 0 ? (
        <p>No workouts found in database</p>
      ) : (
        <div className="workout-list">
          {workouts.map((currentWorkout) => (
            <Link
              to={`/workouts/${currentWorkout._id}`}
              key={currentWorkout._id}
              className="workout-link"
            >
              <div className="workout-box">
                <h2>{currentWorkout.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllWorkoutsPage;
