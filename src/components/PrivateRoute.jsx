import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'

const PrivateRoute = ({ children }) => {
  const { token, isLoading } = useContext(SessionContext)

  if (isLoading) {
    return <h1>Loading ...</h1>
  }

  if (!token) {
    return <Navigate to='/login' />
  }
  return children
}

export default PrivateRoute