const VacanyDetails = ({ vacancies }) => { 
    return (
        <div className="vacancies-details">
            <h4>{vacancies.vacncy_title}</h4>
            <p><strong>Vacancy Type: </strong> {vacancies.vacncy_type}</p>
            <p><strong>Vacancy Count: </strong> {vacancies.vacancy_count}</p>
            <p><strong>Requiremnts: </strong> {vacancies.vacncy_requirements}</p>
            <p>{vacancies.createdAt}</p>
            
            <button className="updateBtn">Update Vacancy</button>
            <button className="deleteBtn">Delete Vacancy</button>

        </div>
    )
}

export default VacanyDetails