import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// reactstrap components
import {
  //Badge,
  Card,
  CardHeader,
  CardFooter,
  //DropdownMenu,
  //DropdownItem,
  //UncontrolledDropdown,
  //DropdownToggle,
  //Media,
  //Pagination,
  //PaginationItem,
  //PaginationLink,
  //Progress,
  //Table,
  Container,
  Row,
  //UncontrolledTooltip,
  Button,
  //Chip,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Badge,
  //CardGroup,
  CardImg,
  //CardImgOverlay,
} from "reactstrap";
// core components
import CareerHeader from "components/Headers/CareerHeader.js";

//card
function CardRatings({ ratings, onClose }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Ratings</h5>
        <p className="card-text">{ratings}</p>
        <Button size="sm" color="primary" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

const Career = () => {
  // states
  const [allVacancies, setAllVacancies] = useState([]);
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
  const [visible, setVisible] = useState(3);

  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all technicians from database
  useEffect(() => {
    const fetchAllVacancies = async () => {
      try {
        const res = await axios.get("/api/vacancies");
        setAllVacancies(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchAllVacancies();
  }, []);

  

  return (
    <>
      <CareerHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Light Table */}
        <Row>
          <div className="col">
            <Card className="shadow" color="lighter">
              <CardHeader
                className="border-0"
                style={{ marginBottom: "1.8rem" }}
              >
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Vecancies</h3>
                  </div>
                  <div className="col text-right"></div>
                </Row>
              </CardHeader>
              <Container>
                <Row>
                  {allVacancies.slice(0, visible).map((vacancy, index) => (
                    <Card
                      key={vacancy._id}
                      style={{
                        width: "22rem",
                        borderRadius: "0.2rem",
                        margin: "0.8rem",
                      }}
                    >
                      <CardBody>
                        <CardTitle tag="h2">{vacancy.vacancy_title}</CardTitle>
                        <CardText className="mb-1 text-muted" tag="h4">
                          Available Count : {vacancy.vacancy_count}
                        </CardText>
                        <CardText className="mb-1 text-muted" tag="h4">
                          Vacancy Type :{" "}
                          <Badge color="success">{vacancy.vacancy_type}</Badge>
                        </CardText>

                        <Row className="mb-2">
                          <div className="container">
                            <Button
                              size="sm"
                              color="primary"
                              onClick={() =>
                                navigate(`/user/applynowpage/${vacancy._id}`)
                              }
                            >
                              <span
                                className="btn-inner--icon"
                                style={{ width: "20px" }}
                              >
                                <i className="ni ni-like-2" />
                              </span>
                              <span className="btn-inner--text">Apply Now</span>
                            </Button>
                          </div>
                        </Row>

                        <Row></Row>
                      </CardBody>
                    </Card>
                  ))}
                </Row>
              </Container>
              <CardFooter
                className="col text-right"
                style={{ marginTop: "1.8rem" }}
              >
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

export default Career;
