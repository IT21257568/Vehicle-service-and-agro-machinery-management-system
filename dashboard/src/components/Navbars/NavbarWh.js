import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const NavbarWh = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const navigate = useNavigate();

  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img
              style={{
                width: "15rem",
                height: "5rem",
                marginLeft: "-8rem",
                marginTop: "-0.8rem",
              }}
              alt="..."
              src={require("../../assets/img/brand/wh_white.png")}
            />
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img
                      alt="..."
                      src={require("../../assets/img/brand/argon-react.png")}
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              <NavItem style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
                <NavLink className="nav-link-icon" to="#" tag={Link}>
                  <i className="ni ni-planet" />
                  <span
                    style={{
                      color: "#e9ecef",
                      width: "8rem",
                      marginTop: "0.5rem",
                    }}
                    className="nav-link-inner--text"
                  >
                    Home
                  </span>
                </NavLink>
              </NavItem>
              <NavItem style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  style={{ width: "5rem", marginTop: "0.5rem" }}
                >
                  <DropdownToggle caret>Shop</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      value="spare_parts"
                      onClick={() => navigate("/user/spareParts")}
                    >
                      Spare parts
                    </DropdownItem>

                    <DropdownItem
                      value="agro_products"
                      onClick={() => navigate("/user/AgroProducts")}
                    >
                      Agro products
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
              <NavItem style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
                <NavLink
                  className="nav-link-icon"
                  to="/user/carrerpage"
                  tag={Link}
                >
                  <i className="ni ni-single-02" />
                  <span
                    style={{ color: "#e9ecef" }}
                    className="nav-link-inner--text"
                  >
                    Career
                  </span>
                </NavLink>
              </NavItem>
              <NavItem style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
                <NavLink
                  className="nav-link-icon"
                  to="/user/promotions-page"
                  tag={Link}
                >
                  <i className="ni ni-single-02" />
                  <span
                    style={{ color: "#e9ecef" }}
                    className="nav-link-inner--text"
                  >
                    Promotions
                  </span>
                </NavLink>
              </NavItem>
              <NavItem style={{ marginRight: "0.5rem", marginLeft: "0.5rem" }}>
                <NavLink
                  className="nav-link-icon"
                  to="/user/create-client-booking"
                  tag={Link}
                >
                  <i className="ni ni-key-25" />
                  <span
                    style={{
                      color: "#e9ecef",
                      width: "8rem",
                      marginTop: "0.5rem",
                    }}
                    className="nav-link-inner--text"
                  >
                    Book now
                  </span>
                </NavLink>
              </NavItem>
              <NavItem style={{ marginLeft: "0.5rem" }}>
                <NavLink
                  className="nav-link-icon"
                  to="/admin/user-profile"
                  tag={Link}
                >
                  <i className="ni ni-single-02" />
                  <span
                    style={{ color: "#e9ecef" }}
                    className="nav-link-inner--text"
                  >
                    Profile
                  </span>
                </NavLink>
              </NavItem>
              <NavItem style={{ marginLeft: "0.5rem" }}>
                <NavLink
                  className="nav-link-icon"
                  to="/user/my-orders"
                  tag={Link}
                >
                  <i className="ni ni-cart" />
                  <span
                    style={{ color: "#e9ecef" }}
                    className="nav-link-inner--text"
                  >
                    My Orders
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarWh;
