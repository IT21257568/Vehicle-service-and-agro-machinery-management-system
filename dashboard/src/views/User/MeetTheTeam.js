
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
  Col,
    InputGroup,
    Input,
} from "reactstrap";
// core components
import MeetTheTeamHeader from "components/Headers/MeetTheTeamHeader.js";


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


const MeetTheTeam = () => {
 

  // states
  const [allTechnicians, setAllTechnicians] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [query, setQuery] = useState("");

  

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
      <MeetTheTeamHeader />
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
                    <h3 className="mb-0">Technicians</h3>
                  </div>
                  <Col xl="3">
                    <InputGroup className="input-group-rounded input-group-merge">
                      <Input
                        aria-label="Search"
                        className="form-control-rounded form-control-prepended"
                        placeholder="Search"
                        type="search"
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  <div className="col text-right"></div>
                </Row>
              </CardHeader>
              <Container>
                <Row>
                  {allTechnicians
                    .filter(
                      (technician) =>
                        technician.technician_name
                          ?.toLowerCase()
                          .includes(query.toLowerCase()) ||
                        technician.technician_specialize_in
                          ?.toLowerCase()
                          .includes(query.toLowerCase())
                    )
                    .slice(0, visible)
                    .map((technician, index) => (
                      <Card
                        key={technician._id}
                        style={{
                          width: "22rem",
                          borderRadius: "0.2rem",
                          margin: "0.8rem",
                        }}
                      >
                        <CardImg
                          height="200rem"
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
                            Expertice :
                            <Input
                              className="form-control-alternative"
                              placeholder="Requirmnets for the vacancy"
                              rows="4"
                              type="textarea"
                              readOnly
                              value={technician.technician_expertise}
                            />
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
                                <CardRatings
                                  ratings="Sample data"
                                  onClose={handleCloseClick}
                                />
                              )}
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
                {visible < allTechnicians.length && (
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

export default MeetTheTeam;
