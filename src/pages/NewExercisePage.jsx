import { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../contexts/SessionContext'

const NewExercisePage = () => {
  const { withToken } = useContext(SessionContext)

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState(0);
  const [targetMuscle, setTargetMuscle] = useState('');

  const handleSubmit = async event => {
    event.preventDefault()
    const payload = { name, description, category, duration, target_muscle: targetMuscle }

    withToken('/exercises', 'POST', payload)
  }

  useEffect(() => {
    withToken('/exercises')
  }, [])

  return (
    <>
    <h1>New Exercise</h1>
  <form onSubmit={handleSubmit}>
    <label>
      Name
      <input value={name} onChange={event => setName(event.target.value)} required />
    </label>
    <label>
      Description
      <textarea value={description} onChange={event => setDescription(event.target.value)} required />
    </label>
    <label>
      Category
      <input value={category} onChange={event => setCategory(event.target.value)} required />
    </label>
    <label>
      Duration (minutes)
      <input
        value={duration}
        onChange={event => setDuration(event.target.value)}
        required
        type='number'
      />
    </label>
    <label>
      Target Muscle
      <input value={targetMuscle} onChange={event => setTargetMuscle(event.target.value)} required />
    </label>
    <button type='submit'>Create Exercise</button>
  </form>
</>
  )
}

export default NewExercisePage