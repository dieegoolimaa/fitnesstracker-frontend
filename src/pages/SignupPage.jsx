import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, Checkbox, NumberInput, Select } from '@mantine/core';
import styles from '../styles/SignupPage.module.css';

const SignupPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInstructor, setIsInstructor] = useState(false);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [workoutFrequency, setWorkoutFrequency] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          isInstructor,
          age,
          gender,
          height,
          weight,
          workoutFrequency
        }),
      });

      if (response.status === 201) {
        navigate('/login');
      } else {
        console.error('Failed to sign up:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to sign up:', error.message);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <TextInput
          label="Email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
          placeholder="Enter your email"
          autoComplete="email"
        />
        <TextInput
          label="Password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
          type="password"
          placeholder="Enter your password"
          autoComplete="new-password"
        />
        <Checkbox
          label="Are you an instructor?"
          checked={isInstructor}
          onChange={() => setIsInstructor(!isInstructor)}
        />
        <NumberInput
          label="Age"
          value={age}
          onChange={setAge}
          placeholder="Enter your age"
          min={1}
        />
        <Select
          label="Gender"
          value={gender}
          onChange={setGender}
          placeholder="Select your gender"
          data={['', 'male', 'female', 'other']}
        />
        <NumberInput
          label="Height"
          value={height}
          onChange={setHeight}
          placeholder="Enter your height"
          min={1}
        />
        <NumberInput
          label="Weight"
          value={weight}
          onChange={setWeight}
          placeholder="Enter your weight"
          min={1}
        />
        <Select
          label="Workout Frequency"
          value={workoutFrequency}
          onChange={setWorkoutFrequency}
          placeholder="Select your workout frequency"
          data={['', 'daily', 'weekly', 'monthly']}
        />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;

