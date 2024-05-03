import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      <h1>All Exercises</h1>
      <div className="exercise-container">
        {exercises.map((currentExercise) => (
          <motion.div
            className="exercise-info"
            key={currentExercise._id}
            layoutId={currentExercise._id}
            onClick={() => setSelectedId(currentExercise._id)}
          >
            <h2>{currentExercise.name.toUpperCase()}</h2>
            <p>{currentExercise.target_muscle}</p>
            {selectedId === currentExercise._id && (
              <AnimatePresence>
                <motion.div
                  className="exercise-details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p>{currentExercise.description}</p>
                  <img src={currentExercise.image} alt={currentExercise.name} />
                  {/* Assuming image is 'image' */}
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default AllExercisesPage;
