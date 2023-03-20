import { useState } from "react"

const VacancyForm = () => { 
    const [vacncy_title, setTitle] = useState('')
    const [vacancy_count, setCount] = useState('')
    const [vacncy_type, setType] = useState('')
    const [vacncy_requirements, setRequirements] = useState('')
    const [error,setError] = useState(null)

    const handleSubmit = async (e) => { 
        e.preventDefault()

        const vacancy = {vacncy_title,vacancy_count,vacncy_type,vacncy_requirements}

        const response = await fetch('/api/vacancies', {
            method: 'POST',
            body: JSON.stringify(vacancy),
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
            setCount('')
            setType('')
            setRequirements('')
            setError(null)
            console.log('New Vacancy Added')
        }

    }

    
    return (
        <form  className="creat" onSubmit={handleSubmit}>
            <h3>Add a Vacancy</h3>
            <label>Vacancy Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={vacncy_title}
            />
            <label>Vacancy Type:</label>
            <label class="radiocontainer">Full Time
                <input
                    type="radio"
                    name="radio"
                    onChange={(e) => setType(e.target.value)}
                    value={"Full Time"}/>
                <span class="radiocheckmark"></span>
            </label>

            <label class="radiocontainer">Part Time
                <input type="radio"
                    name="radio" onChange={(e) => setType(e.target.value)}
                    value={"Part Time"}/>
                <span class="radiocheckmark"></span>
            </label>
            
            <label>Available Count</label>
            <input
                type="number"
                onChange={(e) => setCount(e.target.value)}
                value={vacancy_count}
            />
            <label>Requiremnts</label>
             <textarea
                onChange={(e) => setRequirements(e.target.value)}
                value={vacncy_requirements}
            /><br></br>

            <button>Add Vacancy</button>
            {error && <div className="error">{ error}</div>}
        </form>
    )
}

export default VacancyForm