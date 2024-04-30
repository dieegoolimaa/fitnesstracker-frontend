import { useContext, useState } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const { setToken } = useContext(SessionContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email instead of username
      });
      
      if (response.status === 200) {
        const parsed = await response.json();
        setToken(parsed.token);
        navigate('/profile');
      } else {
        console.error('Failed to log in:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to log in:', error.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
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
        <button type='submit'>Log In</button>
      </form>
    </>
  );
};

export default LoginPage;
