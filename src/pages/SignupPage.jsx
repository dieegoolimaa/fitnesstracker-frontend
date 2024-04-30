import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Sending email instead of username
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
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input value={email} onChange={event => setEmail(event.target.value)} required type="email" />
        </label>
        <label>
          Password
          <input
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
            type='password'
          />
        </label>
        <button type='submit'>Sign Up</button>
      </form>
    </>
  );
};

export default SignupPage