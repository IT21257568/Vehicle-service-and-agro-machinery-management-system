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
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Button,
  Chip,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";


 //card
  function CardExpertice({ vacancyd, onClose }) {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Expertice</h5>
          <p className="card-text">{vacancyd}</p>
          <Button size="sm" color="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    );
  }


const ViewTechnicians = () => {
 

  // states
  const [allTechnicians, setAllTechnicians] = useState([]);
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
  const [visible, setVisible] = useState(10);

  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all technicians from database
  useEffect(() => {
    const fetchAllTechnicians = async () => {
      try {
        const res = await axios.get("/api/mTeams");
        setAllTechnicians(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchAllTechnicians();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/mTeams/${id}`).then((res) => {
      console.log(res.data);
      setAllTechnicians((prevData) =>
        prevData.filter((technician) => technician._id !== id)
      );
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
                      onClick={() => navigate("/admin/create-technician")}
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
                    <th scope="col">Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Age</th>
                    <th scope="col">Experiences</th>
                    <th scope="col">Expertice</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td>Loading...</td>
                    </tr>
                  )}
                  {allTechnicians.slice(0, visible).map((technician, index) => (
                    <tr key={technician._id}>
                      <th scope="row">
                        <span className="mb-0 text-sm">
                          {technician.technician_name}
                        </span>
                      </th>
                      <td>
                        {/* <Badge color="success">{vacancy.vacncy_type}</Badge> */}
                        <Media className="align-items-center">
                          <span className="avatar avatar-sm rounded-circle">
                            <img
                              alt="..."
                              src={require("../../assets/img/theme/team-4-800x800.jpg")}
                            />
                          </span>
                        </Media>
                      </td>
                      <td>{technician.technician_age}</td>
                      <td>
                        {/* <div className="d-flex align-items-center">
                          <span className="mr-2">
                            1/{vacancy.vacancy_count}
                          </span>
                          <div>
                            <Progress
                              max="10"
                              value="4"
                              barClassName="bg-success"
                            />
                          </div>
                        </div> */}
                        {technician.technician_experiences}
                      </td>
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
                            <CardExpertice
                              vacancyd={technician.technician_expertise}
                              onClose={handleCloseClick}
                            />
                          )}
                        </div>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          color="warning"
                          onClick={() =>
                            navigate(`/admin/update-vacancy/${technician._id}`)
                          }
                        >
                          Update
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDelete(technician._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {visible < allTechnicians.length && (
                    <Button color="primary" size="sm" onClick={showMoreItems}>
                      Load More
                    </Button>
                  )}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ViewTechnicians;
