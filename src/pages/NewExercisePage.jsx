import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";

import style from "../styles/NewExercisePage.module.css";

const NewExercisePage = () => {
  const { withToken } = useContext(SessionContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState(0);
  const [targetMuscle, setTargetMuscle] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      name,
      description,
      category,
      duration,
      target_muscle: targetMuscle,
    };

    withToken("/exercises", "POST", payload);

    navigate("/exercises");
  };

  useEffect(() => {
    withToken("/exercises");
  }, []);

  return (
    <div className={style.newExercisePage}>
      <div className={style.title}>
        <h1>New Exercise</h1>
      </div>
      <div className={style.newExerciseForm}>
        <form className={style.form} onSubmit={handleSubmit}>
          <label>
            Name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
          <label>
            Description <br />
            <br />
            <textarea
              rows="5"
              cols="50"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </label>
          <label>
            Category
            <input
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            />
          </label>
          <label>
            Duration (minutes)
            <input
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              required
              type="number"
            />
          </label>
          <label>
            Target Muscle
            <input
              value={targetMuscle}
              onChange={(event) => setTargetMuscle(event.target.value)}
              required
            />
          </label>
          <button type="submit " className={style.customButton}>
            Create Exercise
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewExercisePage;
