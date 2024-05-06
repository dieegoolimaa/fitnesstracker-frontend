import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DraggableList from '../components/DraggableList.jsx';
import styles from '../styles/WorkoutPage.module.css';


const AllWorkoutsPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showModal, setShowModal] = useState(false);

 

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

   // Handle click on workout details
const handleWorkoutDetailsClick = async (workoutId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/workouts/${workoutId}`);
    if (response.ok) {
      const workoutData = await response.json();
      console.log('Fetched workout data:', workoutData); // Log fetched workout data

      // Fetch associated exercises for the workout
      const exercisesResponse = await Promise.all(
        workoutData.exercises.map((exerciseId) =>
          fetch(`${import.meta.env.VITE_API_URL}/api/exercises/${exerciseId}`)
        )
      );

      if (exercisesResponse.every((res) => res.ok)) {
        const exercisesData = await Promise.all(exercisesResponse.map((res) => res.json()));
        console.log('Fetched exercises data:', exercisesData); // Log fetched exercises data
        setSelectedWorkout({
          ...workoutData,
          exercises: exercisesData,
        });
        setShowModal(true);
      } else {
        throw new Error('Failed to fetch exercises');
      }
    } else {
      throw new Error('Failed to fetch workout details');
    }
  } catch (error) {
    console.error(error);
    setError('Failed to fetch workout details');
  }
};

  // Handle close modal
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
          <DraggableList items={workouts.map(workout => (
            <div key={workout._id} className={styles.workoutItem}>
              <p>{workout.name}</p>
              <button onClick={() => handleWorkoutDetailsClick(workout._id, workout.exercises)}>Details</button>
            </div>
          ))} />
        </div>
      )}
   {selectedWorkout && showModal && (
  <div className={styles.modalOverlay} onClick={handleCloseModal}>
    <div className={styles.modal}>
      <h2>{selectedWorkout.name}</h2>
      <p>Description: {selectedWorkout.description}</p>
      <h3>Exercises:</h3>
      <div className={styles.exerciseGrid}>
        {selectedWorkout.exercises.map(exercise => (
          <div key={exercise._id} className={styles.exerciseItem}>
            <p className={styles.exerciseName}>{exercise.name}</p>
            <p className={styles.exerciseDescription}>Target Muscle: {exercise.target_muscle}</p>
            <p className={styles.exerciseDescription}>Equipment: {exercise.equipment}</p>
          </div>
        ))}
      </div>
      <button className={styles.modalButton} onClick={handleCloseModal}>Close</button>
    </div>
  </div>
)}


    </div>
  );
};

export default AllWorkoutsPage;





