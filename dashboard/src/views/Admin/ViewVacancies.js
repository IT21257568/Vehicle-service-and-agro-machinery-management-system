import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  //DropdownMenu,
  //DropdownItem,
  //UncontrolledDropdown,
  //DropdownToggle,
  //Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  //UncontrolledTooltip,
  Button,
 //Chip,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

 //card
  function CardRequiremnts({ vacancyd, onClose }) {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Requirements</h5>
          <p className="card-text">{vacancyd}</p>
          <Button size="sm" color="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    );
  }



const ViewVacancies = () => {
  // states
  const [allVacancies, setAllVacancies] = useState([]);
  const [vacancy_applicants, setVacancyApplicants] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCard, setShowCard] = useState(false);

   function handleViewClick() {
     console.log("View button clicked");
     setShowCard(true);
   }

   function handleCloseClick() {
     console.log("Close button clicked");
     setShowCard(false);
   }
   console.log("Rendering App component with showCard = ", showCard);

  // set visible rows
  const [visible, setVisible] = useState(3);

  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all vacancies from database
  useEffect(() => {
    const fetchAllVacancies = async () => {
      try {
        const res = await axios.get("/api/vacancies");
        setVacancyApplicants(res.data.vacancy_applicants);
        setAllVacancies(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchAllVacancies();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/vacancies/${id}`).then((res) => {
      console.log(res.data);
      setAllVacancies((prevData) =>
        prevData.filter((vacancy) => vacancy._id !== id)
      );
    });
    // update vacancy applicants
    axios
      .patch(`/api/vacancies/${id}`, {
        vacancy_applicants: vacancy_applicants - 1,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Light Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">All Vacancies</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      className="btn-icon btn-3"
                      color="success"
                      type="button"
                      onClick={() => navigate("/admin/create-vacancy")}
                    >
                      <span
                        className="btn-inner--icon"
                        style={{ width: "20px" }}
                      >
                        <i className="ni ni-planet" />
                      </span>
                      <span className="btn-inner--text">Add</span>
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Type</th>
                    <th scope="col">Count</th>
                    <th scope="col">Requiremnts</th>
                    <th scope="col">Applicants</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td>Loading...</td>
                    </tr>
                  )}
                  {allVacancies.slice(0, visible).map((vacancy, index) => (
                    <tr key={vacancy._id}>
                      <th scope="row">
                        <span className="mb-0 text-sm">
                          {vacancy.vacancy_title}
                        </span>
                      </th>
                      <td>
                        <Badge color="success">{vacancy.vacancy_type}</Badge>
                      </td>
                      <td>{vacancy.vacancy_count}</td>
                      <td>
                        <div className="container">
                          <Button
                            size="sm"
                            color="primary"
                            onClick={handleViewClick}
                          >
                            View
                          </Button>
                          {showCard && (
                            <CardRequiremnts
                              vacancyd={vacancy.vacancy_requirements}
                              onClose={handleCloseClick}
                            />
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">
                            {vacancy.vacancy_applicants}/{vacancy.vacancy_count}
                          </span>
                          <div>
                            <Progress
                              max={vacancy.vacancy_count}
                              value={vacancy.vacancy_applicants}
                              barClassName="bg-success"
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          color="warning"
                          onClick={() =>
                            navigate(`/admin/update-vacancy/${vacancy._id}`)
                          }
                        >
                          Update
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDelete(vacancy._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                {visible < allVacancies.length && (
                  <Button color="info" size="sm" onClick={showMoreItems}>
                    Load More
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ViewVacancies;
