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
      <Container>
        <div style={{ height: "20rem" }}>
          <Card style={{ padding: '3rem'  ,marginTop: "5rem",marginBottom: '4rem', backgroundColor: '#ced4da', height:'12rem'}}>
            <CardText style={{fontSize: '24px', textAlign: 'center', marginTop: '-1rem'}}>
                <strong>
                We are a leading automobile after sales service, maintenance and
                accident repair service station in Anuradhapura which also deal in
                import and distribution of automobile refinish products and Agro
                machinery
                </strong>
            </CardText>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default Home;
