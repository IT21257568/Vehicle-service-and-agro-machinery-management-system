import { useEffect, useState } from "react";
import { useVacancyContext } from "../hooks/useVacancyContext";
import { useParams } from "react-router-dom";
import axios from 'axios';


const UpdateVacancyForm = ({ data }) => {
  const { dispatch } = useVacancyContext();
  const [vacncy_title, setTitle] = useState("");
  const [vacancy_count, setCount] = useState("");
  const [vacncy_type, setType] = useState("");
  const [vacncy_requirements, setRequirements] = useState("");
  const [error,setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { id } = useParams();
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    console.log(id);
    const fetchData = async () => {
      const response = await fetch("/api/vacancies/" + id, {
        method: "GET",
      });
      const json = await response.json();
      if (response.ok) {
        setTitle(json.vacncy_title);
        setCount(json.vacancy_count);
        setType(json.vacncy_type);
        setRequirements(json.vacncy_requirements);
      }
    };
    fetchData();
  });

  // handle submit for update vacancy
 /*  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];
    if (vacncy_title === "") {
      errors.push("vacncy_title");
    }
    if (vacncy_type === "") {
      errors.push("vacncy_type");
    }
    if (vacancy_count === "") {
      errors.push("vacancy_count");
    }
    if (vacncy_requirements === "") {
      errors.push("vacncy_requirements");
    }
    if (errors.length > 0) {
      setEmptyFields(errors);
      return;
    }
    try {
      const response = await fetch("/api/vacancies/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vacncy_title,
          vacncy_type,
          vacancy_count,
          vacncy_requirements,
        }),
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({
          type: "UPDATE_VACANCY",
          payload: json,
        });
      } else {
        setError(json.message);
      }
    } catch (err) {
      setError(err.message);
    }
  }; */


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`/api/data/${formData._id}`, formData);
      const updatedData = response.data;
      setFormData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
   
  

  return (
    // form for update vacancy with error handling
     <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="vacncy_title" className="form-label">
          Vacancy Title
        </label>
        <input
          type="text"
          className="form-control"
          id="vacncy_title"
          name="vacncy_title"
          value={formData. vacncy_title}
          placeholder={vacncy_title}
          //value={vacncy_title}
          onChange={handleChange}
          required
        />
        {emptyFields.includes("vacncy_title") && (
          <span className="text-danger">This field is required</span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="vacncy_type" className="form-label">
          Vacancy Type
        </label>
        <select
          className="form-select"
          aria-label="Default select example"
          name="vacncy_type"
          //placeholder={vacncy_type}
          //value={vacncy_type}
          value={formData.vacncy_type}
          onChange={handleChange}
          required
        >
          <option value="">Select vacancy type</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
        </select>
        {emptyFields.includes("vacncy_type") && (
          <span className="text-danger">This field is required</span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="vacancy_count" className="form-label">
          Vacancy Count
        </label>
        <input
          type="number"
          className="form-control"
          id="vacancy_count"
          name="vacancy_count"
          placeholder={vacancy_count}
          //value={vacancy_count}
          value={formData.vacancy_count}
          onChange={handleChange}
          required
        />
        {emptyFields.includes("vacancy_count") && (
          <span className="text-danger">This field is required</span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="vacncy_requirements" className="form-label">
          Vacancy Requirements
        </label>
        <textarea
          className="form-control"
          id="vacncy_requirements"
          name="vacncy_requirements"
          rows="3"
          placeholder={vacncy_requirements}
          //value={vacncy_requirements}
          value={formData.vacncy_requirements}
          onChange={handleChange}
          required
        ></textarea>
        {emptyFields.includes("vacncy_requirements") && (
          <span className="text-danger">This field is required</span>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        Update Vacancy
      </button>
    </form> 
    
  );
};

export default UpdateVacancyForm;
