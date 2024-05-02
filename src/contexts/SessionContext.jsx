import { createContext, useEffect, useState } from 'react';

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const verifyToken = async (currentToken) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (response.ok) {
        const parsed = await response.json();
        console.log(parsed);
        setToken(currentToken);
        setIsLoading(false);
      } else {
        window.localStorage.removeItem('authToken');
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      window.localStorage.removeItem('authToken');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const potentialToken = window.localStorage.getItem('authToken');
    if (potentialToken) {
      verifyToken(potentialToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem('authToken', token);
    }
  }, [token]);

  const logout = () => {
    setToken();
    window.localStorage.removeItem('authToken');
  };

  const withToken = async (endpoint, method = 'GET', payload) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api${endpoint}`;
      const requestOptions = {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      };

      const response = await fetch(url, requestOptions);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  return (
    <SessionContext.Provider value={{ token, setToken, logout, isLoading, withToken }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
