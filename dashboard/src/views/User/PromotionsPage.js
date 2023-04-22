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
import PromotionHeader from "components/Headers/PromotionHeader.js";

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

const Promotions = () => {
  // states
  const [allPromotions, setAllPromotions] = useState([]);
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

  // retrieve all technicians from database
  useEffect(() => {
    const fetchAllPromotions = async () => {
      try {
        const res = await axios.get("/api/promotions");
        setAllPromotions(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchAllPromotions();
  }, []);

  return (
    <>
      <PromotionHeader />
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
                    <h3 className="mb-0">Promotions</h3>
                  </div>
                  <div className="col text-right"></div>
                </Row>
              </CardHeader>
              <Container>
                <Row style={{ marginTop: "0.5rem" }}>
                  {allPromotions.slice(0, visible).map((promotion, index) => (
                    <Card
                      key={promotion._id}
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
                        src={promotion.promo_picture_url}
                      />
                      <CardBody>
                        <CardTitle tag="h2" style={{ fontSize: "24px" }}>
                          {promotion.promo_title}
                        </CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h3">
                          <strong>{promotion.promo_discount}% Off</strong>
                        </CardSubtitle>
                        <CardText>{promotion.promo_description}</CardText>
                        <CardSubtitle className="mb-2 text-muted" tag="h4">
                          {" "}
                          <strong>
                            Offer ends on {promotion.promo_endDate}
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
                {visible < allPromotions.length && (
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

export default Promotions;
