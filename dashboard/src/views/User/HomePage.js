import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Accordion } from "react-bootstrap-accordion";
import "react-bootstrap-accordion/dist/index.css";
import NavbarWh from "components/Navbars/NavbarWh.js";
import HomeHeader from "../../components/Headers/HomeHeader";
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
  NavLink,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
} from "reactstrap";

import home_card1 from "../../assets/img/theme/home_card_wheels.jpg";
import home_card2 from "../../assets/img/theme/home_card_engine.jpg";
import home_card3 from "../../assets/img/theme/home_card_paint.jpg";

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

const Home = () => {
  return (
    <>
      <HomeHeader />
      <Container xl className="mt-5">
        <h1 className="text-center mb-5">Exclusive Services</h1>
        <Row>
          <Col md="4">
            <Card>
              <CardImg alt="..." src={home_card1} top />
              <CardBody>
                <CardTitle style={{ fontSize: "1.5rem" }}>Wheel Care</CardTitle>
                <CardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </CardText>
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Go somewhere
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <CardImg
                alt="..."
                src={home_card2}
                top
                style={{ filter: "grayscale(100%)" }}
              />
              <CardBody>
                <CardTitle style={{ fontSize: "1.5rem" }}>
                  Engine Care
                </CardTitle>
                <CardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </CardText>
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Go somewhere
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <CardImg alt="..." src={home_card3} top />
              <CardBody>
                <CardTitle style={{ fontSize: "1.5rem" }}>Paint Care</CardTitle>
                <CardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </CardText>
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Go somewhere
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        <div style={{ height: "20rem" }}>
          <Card
            style={{
              padding: "3rem",
              marginTop: "5rem",
              marginBottom: "4rem",
              backgroundColor: "#ced4da",
              height: "12rem",
            }}
          >
            <CardText
              style={{
                fontSize: "24px",
                textAlign: "center",
                marginTop: "-1rem",
              }}
            >
              <strong>
                We are a leading automobile after sales service, maintenance and
                accident repair service station in Anuradhapura which also deal
                in import and distribution of automobile refinish products and
                Agro machinery
              </strong>
            </CardText>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default Home;
