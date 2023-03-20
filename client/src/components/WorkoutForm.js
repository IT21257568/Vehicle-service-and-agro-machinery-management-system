import { useState } from "react"

const WorkOutForm = () => { 
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error,setError] = useState(null)

    const handleSubmit = async (e) => { 
        e.preventDefault()

        const workout = {title,load,reps}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();

        if (!response.ok) { 
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('New workout Added')
        }

    }

    
    return (
        <form  className="creat" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>ExcerSize Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label>Load (kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />
            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />

            <button>Add Workout</button>
            {error && <div className="error">{ error}</div>}
        </form>
    )
}

export default WorkOutForm