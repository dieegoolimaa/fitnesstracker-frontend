import { useEffect, useState } from "react";

const AllExercisesPage = () => {
    const [exercises, setExercises] = useState([])
    
    const fetchExercises = async () => {
        try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/exercises`)
        if (response.ok) {
            const exercisesData = await response.json()
            setExercises(exercisesData)
        }
    } catch (error) {
        console.log(error)
    }
}
    useEffect(() => {
        fetchExercises()
    }, [])


    return ( 
    <>
    <h1>All Exercises</h1>
    <ul>
        {exercises.map(currentExercise => (
            <li key={currentExercise._id}>
                {currentExercise.name}</li>
        ))}
    </ul>
    </> 
    
);
}
 
export default AllExercisesPage;