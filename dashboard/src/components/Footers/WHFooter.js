import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {FaLinkedin} from "react-icons/fa";
import { Link } from "react-router-dom";

const whFooter = () => {
  return (
    <footer className="footer" style={{ backgroundColor: "#172b4d" }}>
      <Container>
        <Row>
          <Col xl="2">
            <Nav vertical>
              <NavItem style={{ padding: "0.5rem" }}>
                <NavLink href="#" rel="noopener noreferrer" target="_blank">
                  Home
                </NavLink>
              </NavItem>
              <NavItem style={{ padding: "0.5rem" }}>
                <NavLink  href="/user/meet-the-team" rel="noopener noreferrer" target="">
                  Meet the team
                </NavLink>
              </NavItem>
              <NavItem style={{ padding: "0.5rem" }}>
                <NavLink href="#" rel="noopener noreferrer" target="">
                  Our Branches
                </NavLink>
              </NavItem>
              <NavItem style={{ padding: "0.5rem" }}>
                <NavLink href="#" rel="noopener noreferrer" target="_blank">
                  Contact us
                </NavLink>
              </NavItem>
              <NavItem
                style={{
                  padding: "0.3rem",
                  backgroundColor: "#ffa500",
                  marginLeft: "1rem",
                  color: "black",
                  borderRadius: "0.3rem",
                  marginTop: "0.2rem",
                }}
              >
                <NavLink
                  href="/user/feedback-page"       
                  style={{ width: "13rem" }}
                >
                  <strong>Provide Your Feedback</strong>
                </NavLink>
              </NavItem>
            </Nav>
          </Col>

          <Row>
            <Nav style={{ marginLeft: "8.5rem" }}>
              <NavItem style={{ padding: "0.5rem", marginTop: "0.25rem" }}>
                <strong>Connect With us</strong>
              </NavItem>

              <NavItem
                style={{
                  padding: "0.5rem",
                  fontSize: "30px",
                  marginTop: "-0.7rem",
                }}
              >
                <NavLink href="#" rel="noopener noreferrer" target="_blank">
                  <FaFacebook style={{ color: "#0047AB" }} />
                </NavLink>
              </NavItem>
              <NavItem
                style={{
                  padding: "0.5rem",
                  fontSize: "30px",
                  marginTop: "-0.7rem",
                }}
              >
                <NavLink href="#" rel="noopener noreferrer" target="_blank">
                  <FaInstagram style={{ color: "#f3a4b5" }} />
                </NavLink>
              </NavItem>
              <NavItem
                style={{
                  padding: "0.5rem",
                  fontSize: "30px",
                  marginTop: "-0.7rem",
                }}
              >
                <NavLink href="#" rel="noopener noreferrer" target="_blank">
                  <FaYoutube style={{ color: "#f5365c" }} />
                </NavLink>
              </NavItem>
              <NavItem
                style={{
                  padding: "0.5rem",
                  fontSize: "30px",
                  marginTop: "-0.7rem",
                }}
              >
                <NavLink href="#" rel="noopener noreferrer" target="_blank">
                  <FaLinkedin style={{ color: "#0096FF" }} />
                </NavLink>
              </NavItem>
            </Nav>
          </Row>

          <Col xl="3" style={{ marginLeft: "5.5rem" }}>
            <Nav vertical>
              <NavItem
                style={{
                  padding: "0.5rem",
                  fontSize: "34px",
                  marginTop: "-0.5rem",
                }}
              >
                <NavLink href="#" rel="noopener noreferrer" target="_blank">
                  <strong>Need Our Support ?</strong>
                </NavLink>
              </NavItem>
              <NavItem style={{ padding: "0.5rem" }}>
                <NavLink href="#" rel="noopener noreferrer" target="_blank">
                  <FaPhone
                    style={{
                      color: "#ffa500",
                      marginRight: "0.35rem",
                      fontSize: "18px",
                    }}
                  />{" "}
                  +94254651651
                </NavLink>
              </NavItem>
              <NavItem style={{ padding: "0.5rem" }}>
                <NavLink href="#" rel="noopener noreferrer" target="_blank">
                  <FaHome
                    style={{
                      marginRight: "0.35rem",
                      fontSize: "22px",
                      color: "#ffa500",
                    }}
                  />{" "}
                  514/A 3A, Maithreepala Senanayake Mawatha, Anuradhapura, Sri
                  Lanka.
                </NavLink>
              </NavItem>
              <NavItem style={{ padding: "0.5rem" }}>
                <NavLink href="#" rel="noopener noreferrer" target="_blank">
                  <MdEmail
                    style={{
                      marginRight: "0.35rem",
                      fontSize: "21px",
                      color: "#ffa500",
                    }}
                  />{" "}
                  info@wheelmasters.biz
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default whFooter;
