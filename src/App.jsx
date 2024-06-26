import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Navbar from "./components/Navbar.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AllExercisesPage from "./pages/AllExercisesPage.jsx";
import NewExercisePage from "./pages/NewExercisePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import WorkoutPage from "./pages/WorkoutPage.jsx";
import CreateWorkoutPage from "./pages/CreateWorkoutPage.jsx";
import UserDetailsPage from "./pages/UserDetailsPage.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/user-details"
          element={
            <PrivateRoute>
              <UserDetailsPage />
            </PrivateRoute>
          }
        />

        <Route path="/exercises" element={<AllExercisesPage />} />
        

        <Route
          path="/exercises/new"
          element={
            <PrivateRoute>
              <NewExercisePage />
            </PrivateRoute>
          }
        />

        <Route path="/workouts" element={<WorkoutPage />} />
        <Route path="/create-workout" element={<CreateWorkoutPage />} />

        <Route path="*" element={<h1>404 page</h1>} />
      </Routes>
    </>
  );
}

export default App;
