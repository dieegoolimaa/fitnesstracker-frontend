import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AllExercisesPage.css"; // Import your CSS file

const AllExercisesPage = () => {
    const [exercises, setExercises] = useState([])
    const [loading, setLoading] = useState(true);
    
    const fetchExercises = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/exercises`)
            if (response.ok) {
                const exercisesData = await response.json()
                setExercises(exercisesData)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        fetchExercises()
    }, [])

    return ( 
        <div className="exercise-container">
            <h1>All Exercises</h1>
            {loading && <p>Loading...</p>}
            {!loading && exercises.length === 0 && <p>No exercises</p>}
            {!loading && exercises.map(currentExercise => (
                <Link to={`/exercises/${currentExercise._id}`} key={currentExercise._id}>
                    <div className="exercise-box">
                        <h2>{currentExercise.name}</h2>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default AllExercisesPage;

