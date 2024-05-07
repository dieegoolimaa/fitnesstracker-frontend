import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DraggableList from "../components/DraggableList.jsx";
import styles from "../styles/WorkoutPage.module.css";

const AllWorkoutsPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleWorkoutDetailsClick = async (workoutId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/workouts/${workoutId}`
      );
      if (response.ok) {
        const workoutData = await response.json();
        console.log("Fetched workout data:", workoutData);

        const exercisesResponse = await Promise.all(
          workoutData.exercises.map((exerciseId) =>
            fetch(`${import.meta.env.VITE_API_URL}/api/exercises/${exerciseId}`)
          )
        );

        if (exercisesResponse.every((res) => res.ok)) {
          const exercisesData = await Promise.all(
            exercisesResponse.map((res) => res.json())
          );
          console.log("Fetched exercises data:", exercisesData);
          setSelectedWorkout({
            ...workoutData,
            exercises: exercisesData,
          });
          setShowModal(true);
        } else {
          throw new Error("Failed to fetch exercises");
        }
      } else {
        throw new Error("Failed to fetch workout details");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch workout details");
    }
  };

  const handleWorkoutDelete = async (workoutId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/workouts/${workoutId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setWorkouts(workouts.filter((workout) => workout._id !== workoutId));
      } else {
        throw new Error("Failed to delete workout");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to delete workout");
    }
  };

  const handleExerciseDelete = async (exerciseId) => {
    try {
      // Delete the exercise from the workout on the frontend
      const updatedExercises = selectedWorkout.exercises.filter(
        (exercise) => exercise._id !== exerciseId
      );
      setSelectedWorkout((prevState) => ({
        ...prevState,
        exercises: updatedExercises,
      }));

      // Prepare the updated workout object with the modified exercises
      const updatedWorkout = {
        ...selectedWorkout,
        exercises: updatedExercises.map((exercise) => exercise._id),
      };

      // Send a PUT request to update the workout on the backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/workouts/${selectedWorkout._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedWorkout),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update workout");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to delete exercise");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div className={styles.workoutContainer}>
      <h1 className={styles.title}>All Workouts</h1>
      <Link to="/create-workout" className={styles.createWorkoutLink}>
        Create a Workout
      </Link>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : workouts.length === 0 ? (
        <p className={styles.noWorkouts}>No workouts found in database</p>
      ) : (
        <div className={styles.draggableContainer}>
          <DraggableList
            items={workouts.map((workout) => (
              <div key={workout._id} className={styles.workoutItem}>
                <p>{workout.name}</p>
                <button onClick={() => handleWorkoutDetailsClick(workout._id)}>
                  👀
                </button>
                <button onClick={() => handleWorkoutDelete(workout._id)}>
                  ❌
                </button>
              </div>
            ))}
          />
        </div>
      )}
      {selectedWorkout && showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>{selectedWorkout.name} WORKOUT</h2>
            <h3>Exercises:</h3>
            <div className={styles.exerciseGrid}>
              {selectedWorkout.exercises.map((exercise) => (
                <div key={exercise._id} className={styles.exerciseItem}>
                  <p className={styles.exerciseName}>{exercise.name}</p>
                  <p className={styles.exerciseDescription}>
                    Target Muscle: {exercise.target_muscle}
                  </p>
                  <button onClick={() => handleExerciseDelete(exercise._id)}>
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllWorkoutsPage;
