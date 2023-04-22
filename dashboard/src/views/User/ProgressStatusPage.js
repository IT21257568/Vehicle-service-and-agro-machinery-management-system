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
import ProgressStatusHeader from "components/Headers/ProgressStatusHeader.js";

//card
function CardRatings({ ratings, onClose }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Status</h5>
        <p className="card-text">{ratings}</p>
        <Button size="sm" color="primary" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

const Progresses = () => {
  // states
  const [allProgresses, setAllProgresses] = useState([]);
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
  const [visible, setVisible] = useState(6);

  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all progress satus from database
  useEffect(() => {
    const fetchAllProgresses = async () => {
      try {
        const res = await axios.get("/api/progress");
        setAllProgresses(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchAllProgresses();
  }, []);

  return (
    <>
      <ProgressStatusHeader />
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
                    <h3 className="mb-0">All Service Progress Status</h3>
                  </div>
                  <div className="col text-right"></div>
                </Row>
              </CardHeader>
              <Container>
                <Row style={{ marginTop: "0.5rem" }}>
                  {allProgresses.slice(0, visible).map((progress, index) => (
                    <Card
                      key={progress._id}
                      style={{
                        width: "22rem",
                        borderRadius: "1.5rem",
                        margin: "0.8rem",
                      }}
                    >
                      <CardImg
                        width="100%"
                        alt="Sample"
                        height="250rem"
                        style={{borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem'}}
                        src={progress.progress_picture_url}
                      />
                      <CardBody>
                        <CardTitle tag="h2" style={{ fontSize: "24px" }}>
                          Customer Name: {progress.name}
                        </CardTitle>

                        <CardSubtitle className="mb-2 text-muted" tag="h2">
                          Vehi Number: {progress.vehi_number}
                        </CardSubtitle>

                        <CardSubtitle className="mb-2 text-muted" tag="h3">
                          <strong>Status: {progress.status}</strong>
                        </CardSubtitle>

                        <CardText>{progress.description}</CardText>

                        <CardSubtitle className="mb-2 text-muted" tag="h4">
                          {" "}
                          <strong>
                            Date: {progress.date}
                          </strong>

                        </CardSubtitle>
                      </CardBody>
                    </Card>
                  ))}
                </Row>
              </Container>
              <CardFooter
                className="col text-right"
                style={{ marginTop: "1.8rem" }}
              >
                {visible < allProgresses.length && (
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

export default Progresses;
