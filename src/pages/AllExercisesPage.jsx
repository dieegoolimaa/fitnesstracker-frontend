import { useEffect, useState, useContext } from "react";
import "../styles/AllExercisesPage.css";
import { Link } from "react-router-dom";

const AllExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isExpanded, setIsExpanded] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isInstructor, setIsInstructor] = useState(false);

  const fetchExercises = async () => {
    try {
      console.log("Fetching exercises...");
      const data = await withToken("/exercises");
      console.log(data);
      setExercises(data);
    } catch (error) {
      console.log("Error fetching exercises:", error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const data = await withToken("/profile");
      console.log("User profile:", data);
      setIsInstructor(data.isInstructor);
    } catch (error) {
      console.log("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchExercises();
    fetchUserProfile();
  }, []);

  const handleExpandClick = (id) => {
    setIsExpanded((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const exerciseList = document.querySelector(".exercise-list");
      if (exerciseList && !exerciseList.contains(event.target)) {
        setSelectedId(null);
        setIsExpanded({});
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
        <h1>EXERCISES</h1>
        <p className="exerciseDescription">
          Below you will find a list of all exercises available for training.
        </p>
      </div>

      {isInstructor && (
        <div>
          <Link to="/exercises/new">Create a exercise</Link>
        </div>
      )}

      <div className="exercise-search">
        <input
          type="text"
          placeholder="Search by target muscle"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <div className="exercise-list">
        {exercises
          .filter((currentExercise) => {
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
              <p className="exerciseDescription">
                {currentExercise.target_muscle}
              </p>
              {selectedId === currentExercise._id && (
                <>
                  <p className="exerciseDescription">
                    {currentExercise.description}
                  </p>

                  <div className="setsandReps">
                    <h4>Sets</h4>
                    <div>
                      {/* <p>
                        {currentExercise.sets.map((set, index) => (
                          <span key={index}>
                            {set.reps} x {set.weight}
                          </span>
                        ))}
                      </p> */}
                    </div>
                  </div>
                  <div className="images">
                    {isExpanded[currentExercise._id] && (
                      <div className="imagescontainer">
                        <img
                          src={currentExercise["image-1"]}
                          alt={`${currentExercise.name} Image`}
                        />
                        <img
                          src={currentExercise["image-2"]}
                          alt={`${currentExercise.name} Image`}
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
