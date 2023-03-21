import { useEffect } from 'react';
import { useVacancyContext } from '../hooks/useVacancyContext';


//components
import VacancyDetails from '../components/VacancyDetails'
import VacancyForm from '../components/VacancyForm'

const Carrer = () => {
    const {vacancies,dispatch} = useVacancyContext()
useEffect(() => {
    const fetchVacancies = async () => {
        const response = await fetch('/api/vacancies')
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'SET_VACANCIES', payload: json})
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