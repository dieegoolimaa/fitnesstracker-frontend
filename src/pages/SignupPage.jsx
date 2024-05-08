import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, Checkbox, NumberInput, Select } from "@mantine/core";
import style from "../styles/SignupPage.module.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInstructor, setIsInstructor] = useState(false);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [workoutFrequency, setWorkoutFrequency] = useState("");
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            isInstructor,
            age,
            gender,
            height,
            weight,
            workoutFrequency,
          }),
        }
      );

      if (response.status === 201) {
        navigate("/login");
      } else {
        const { message } = await response.json();
        setError(message);
      }
    } catch (error) {
      console.error("Failed to sign up:", error.message);
      setError("Failed to sign up. Please try again.");
    }
  };

  const handleEmailChange = (event) => {
    const enteredEmail = event.target.value;
    setEmail(enteredEmail);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail);
    if (!isValidEmail) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event) => {
    const enteredPassword = event.target.value;
    setPassword(enteredPassword);
    const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
      enteredPassword
    );
    if (!isValidPassword) {
      setPasswordError(
        "Password must contain at least 1 letter and 1 number, and be at least 8 characters long."
      );
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className={style.signupContainer}>
      <h1 className={style.signupTitle}>Sign Up</h1>
      {error && <p className="error-message">{error}</p>}{" "}
      <div className={style.formContainer}>
        <form onSubmit={handleSubmit}>
          <TextInput
            className={style.inputField}
            type="text"
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
          />
          <TextInput
            type="email"
            label="Email"
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="Enter your email"
            autoComplete="email"
            error={emailError}
          />
          {emailError && <div className="error-message">{emailError}</div>}
          <TextInput
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            required
            type="password"
            placeholder="Enter your password"
            autoComplete="new-password"
            error={passwordError}
          />
          {passwordError && (
            <div className="error-message">{passwordError}</div>
          )}
          <div className={style.checkbox}>
            {" "}
            <Checkbox
              type="checkbox"
              label="Are you an instructor?"
              checked={isInstructor}
              onChange={() => setIsInstructor(!isInstructor)}
            />
          </div>

          <NumberInput
            type="number"
            label="Age"
            value={age}
            onChange={setAge}
            placeholder="Enter your age"
            min={1}
          />
          <Select
            type="text"
            label="Gender"
            value={gender}
            onChange={setGender}
            placeholder="Select your gender"
            data={["", "male", "female", "other"]}
          />
          <NumberInput
            type="number"
            label="Height"
            value={height}
            onChange={setHeight}
            placeholder="Enter your height"
            min={1}
          />
          <NumberInput
            type="number"
            label="Weight"
            value={weight}
            onChange={setWeight}
            placeholder="Enter your weight"
            min={1}
          />
          <Select
            type="text"
            label="Workout Frequency"
            value={workoutFrequency}
            onChange={setWorkoutFrequency}
            placeholder="Select your workout frequency"
            data={["", "daily", "weekly", "monthly"]}
          />
          <div className={style.buttonContainer}>
            <button className={style.buttonSignup} type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
