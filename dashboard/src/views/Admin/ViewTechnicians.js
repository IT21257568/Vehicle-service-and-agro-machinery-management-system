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
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardGroup,
  CardImg,
  CardImgOverlay,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";


//card
  function CardRequiremnts({ vacancyd, onClose }) {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Ratings</h5>
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
              <Container>
                <Row>
                  {allTechnicians.slice(0, visible).map((technician, index) => (
                    <Card
                      key={technician._id}
                      style={{
                        width: "22rem",
                        borderRadius: "0.2rem",
                        margin: "0.8rem",
                      }}
                    >
                      <CardImg
                        width="100%"
                        alt="technicianpicture"
                        src={technician.technician_picture_url}
                      />
                      <CardBody>
                        <CardTitle tag="h2">
                          {technician.technician_name}
                        </CardTitle>
                        <CardSubtitle className="mb-3 text-muted" tag="h3">
                          {technician.technician_specialize_in}
                        </CardSubtitle>
                        <CardText className="mb-1 text-muted" tag="h4">
                          Age :{technician.technician_age}
                        </CardText>
                        <CardText className="mb-1 text-muted" tag="h4">
                          Year of Experience :{" "}
                          {technician.technician_experiences} Years
                        </CardText>
                        <CardText className="mb-2 text-muted" tag="h4">
                          Expertice : {technician.technician_expertise}
                        </CardText>
                        <Row className="mb-2">
                          <div className="container">
                            <Button
                              size="sm"
                              color="primary"
                              onClick={handleViewClick}
                            >
                              <span
                                className="btn-inner--icon"
                                style={{ width: "20px" }}
                              >
                                <i className="ni ni-like-2" />
                              </span>
                              <span className="btn-inner--text">
                                Ratings & Reviews
                              </span>
                            </Button>
                            {showCard && (
                              <CardRequiremnts
                                vacancyd="Sample data"
                                onClose={handleCloseClick}
                              />
                            )}
                          </div>
                        </Row>

                        <Row>
                          <Button
                            size="sm"
                            color="warning"
                            onClick={() =>
                              navigate(
                                `/admin/update-technician/${technician._id}`
                              )
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
                        </Row>
                      </CardBody>
                    </Card>
                  ))}

                  {visible < allTechnicians.length && (
                    <Button color="secondary" size="sm" onClick={showMoreItems}>
                      Load More
                    </Button>
                  )}
                </Row>
              </Container>
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
