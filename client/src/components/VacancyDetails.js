import { useVacancyContext } from "../hooks/useVacancyContext";

//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { useNavigate } from "react-router-dom";

const VacanyDetails = ({ vacancies }) => {
  const { dispatch } = useVacancyContext();

  const handleClick = async () => {
    const response = await fetch("/api/vacancies/" + vacancies._id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_VACANCY", payload: json });
    }
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `UpdateVacancy/${vacancies._id}`;
    navigate(path);
  };

  return (
    <div className="vacancies-details">
      <h4>{vacancies.vacncy_title}</h4>
      <p>
        <strong>Vacancy Type: </strong> {vacancies.vacncy_type}
      </p>
      <p>
        <strong>Vacancy Count: </strong> {vacancies.vacancy_count}
      </p>
      <p>
        <strong>Requiremnts: </strong> {vacancies.vacncy_requirements}
      </p>
      <p>
        {formatDistanceToNow(new Date(vacancies.createdAt), {
          addSuffix: true,
        })}
      </p>

      <button onClick={routeChange} className="updateBtn">
        Update Vacancy
      </button>
      <button onClick={handleClick} className="deleteBtn">
        Delete Vacancy
      </button>
    </div>
  );
};

export default VacanyDetails;
