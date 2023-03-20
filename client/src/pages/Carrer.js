import { useEffect, useState } from 'react';


//components
import VacancyDetails from '../components/VacancyDetails'
import VacancyForm from '../components/VacancyForm'

const Carrer = () => {
    const [vacancies,setWorouts] = useState(null)
useEffect(() => {
    const fetchVacancies = async () => {
        const response = await fetch('/api/vacancies')
        const json = await response.json()

        if(response.ok) {
            setWorouts(json)
        }
    }
   fetchVacancies()
}, []);

    return (
        <div className="carrer">
            <div className="vacancies">
                {vacancies && vacancies.map((vacancies) => (
                    <VacancyDetails key={ vacancies._id} vacancies={vacancies} />
                ))} 
            </div>
            <VacancyForm/>
        </div>
    )
}
export default Carrer