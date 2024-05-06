import { useEffect, useState } from "react";
import "../styles/AllExercisesPage.css";

const AllExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isExpanded, setIsExpanded] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleExpandClick = (id) => {
    setIsExpanded({ ...isExpanded, [id]: !isExpanded[id] });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const exerciseList = document.querySelector(".exercise-list");
      if (!exerciseList.contains(event.target)) {
        setSelectedId(null);
        setIsExpanded({}); // Reset expanded state
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="exercise-page">
      <div className="exercise-title">
        <h1>All Exercises</h1>
        <p className="exerciseDescription">
          Below you will find a list of all exercises available for training.
        </p>
      </div>

      <div className="exercise-search">
        <input
          type="text"
          placeholder="Search by target muscle"
          onChange={(event) => setSearchTerm(event.target.value)} // Update search term on input change
        />
      </div>

      <div className="exercise-list">
        {exercises
          .filter((currentExercise) => {
            // Filter based on search term (case-insensitive)
            return (
              currentExercise.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              currentExercise.target_muscle
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            );
          })
          .map((currentExercise) => (
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
                  <p className="exerciseDescription">
                    {currentExercise.description}
                  </p>

                  <div className="setsandReps">
                    <h4>Sets</h4>
                    <div>
                      <p>
                        {currentExercise.setsandreps.sets} x
                        {currentExercise.setsandreps.reps}
                      </p>
                    </div>
                  </div>
                  <div className="images">
                    {isExpanded[currentExercise._id] && ( // Check if expanded
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
                    )}
                    <button
                      className="expand-button"
                      onClick={() => handleExpandClick(currentExercise._id)}
                    >
                      {isExpanded[currentExercise._id]
                        ? "Hide exercise"
                        : "See exercise"}
                    </button>
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
