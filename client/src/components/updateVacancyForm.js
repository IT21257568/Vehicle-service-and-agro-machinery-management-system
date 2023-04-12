import { useEffect, useState } from "react";
import { useVacancyContext } from "../hooks/useVacancyContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UpdateVacancyForm = () => {
  // const { dispatch } = useVacancyContext();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // states for the form
  const [vacancyTitle, setVacancyTitle] = useState("");
  const [vacancyType, setVacancyType] = useState("");
  const [vacancyCount, setVacancyCount] = useState("");
  const [vacancyRequirements, setVacancyRequirements] = useState("");

  useEffect(() => {
    const getVacancy = async () => {
      const res = await axios.get(`/api/vacancies/${id}`);
      console.log(res.data);
      setData(res.data);

      setVacancyTitle(res.data.vacncy_title);
      setVacancyType(res.data.vacncy_type);
      setVacancyCount(res.data.vacancy_count);
      setVacancyRequirements(res.data.vacncy_requirements);
    };
    getVacancy();
  }, [id]);

  const handleUpdate = () => {
    axios
      .patch(`/api/vacancies/${id}`, {
        vacncy_title: vacancyTitle,
        vacncy_type: vacancyType,
        vacancy_count: vacancyCount,
        vacncy_requirements: vacancyRequirements,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/");
      });
  };

  return (
    <Form>
      <h3>Update Vacancy</h3>
      <label>Vacancy Title:</label>
      <input
        type="text"
        defaultValue={data.vacncy_title}
        onChange={(e) => {
          setVacancyTitle(e.target.value);
        }}
      />
      <label>Vacancy Type:</label>
      <label class="radiocontainer">
        Full Time
        <input type="radio" name="radio" 
          
        />
        <span class="radiocheckmark"></span>
      </label>
      <label class="radiocontainer">
        Part Time
        <input type="radio" name="radio" 
          
        />
        <span class="radiocheckmark"></span>
      </label>

      <label>Available Count</label>
      <input
        type="number"
        defaultValue={data.vacancy_count}
        onChange={(e) => {
          setVacancyCount(e.target.value);
        }}
      />
      <label>Requirements</label>
      <textarea
        defaultValue={data.vacncy_requirements}
        onChange={(e) => {
          setVacancyRequirements(e.target.value);
        }}
      />
      <br></br>

      <Button variant="" onClick={handleUpdate}>
        Update Vacancy
      </Button>
    </Form>
  );
};

export default UpdateVacancyForm;