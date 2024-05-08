import { useEffect, useState } from "react";
import "../styles/AllExercisesPage.css";
import { Link } from "react-router-dom";

const AllExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isExpanded, setIsExpanded] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [userProfile, setUserProfile] = useState(null); // State to store user profile data

  const fetchExercises = async () => {
    try {
      console.log("Fetching exercises...");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/exercises`
      );
      if (response.ok) {
        console.log("Exercises fetched successfully");
        const exercisesData = await response.json();
        setExercises(exercisesData);
      } else {
        console.log("Failed to fetch exercises:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage
      if (!token) return;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const profileData = await response.json();
        setUserProfile(profileData);
      } else {
        console.error("Error fetching user profile:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExercises();
    fetchUserProfile(); // Fetch profile data on component mount
  }, []);

  const handleExpandClick = (id) => {
    setIsExpanded((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    console.log("Expanded state:", isExpanded);
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

  useEffect(() => {}, [exercises]);

  useEffect(() => {}, [selectedId]);

  useEffect(() => {}, [searchTerm]);

  return (
    <div className="exercise-page">
      <div className="exercise-title">
        <h1>EXERCISES</h1>
        <p className="exerciseDescription">
          Below you will find a list of all <br />
          exercises available for training.
        </p>
      </div>

      {userProfile && userProfile.isInstructor && (
        <div>
          <Link to="/exercises/new">Create a exercise</Link>
        </div>
      )}

      <div className="exerciseSearch">
        <input
          type="text"
          placeholder="Search by target muscle"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <div className="exercise-list">
        {exercises
          .filter((currentExercise) => {
            console.log("Current exercise:", currentExercise);
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
              <h2 className="exercise-title">
                {currentExercise.name.toUpperCase()}
              </h2>
              <p className="exerciseDescription">
                {currentExercise.target_muscle.toUpperCase()}
              </p>
              {selectedId === currentExercise._id && (
                <>
                  <p className="exerciseDescription">
                    {currentExercise.description}
                  </p>

                  <div className="reps-container">
                    <h4>SETS</h4>
                    <div className="reps">
                      <p className="reps-text">
                        {currentExercise.sets.map((set, index) => (
                          <span key={index}>{set.reps} x 3</span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div className="images">
                    {isExpanded[currentExercise._id] && (
                      <div className="images-container">
                        <img
                          src={currentExercise["image-2"]}
                          alt={`${currentExercise.name} Image`}
                        />
                        <img
                          src={currentExercise["image-1"]}
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
