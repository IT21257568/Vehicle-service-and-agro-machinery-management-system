import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../../features/auth/authSlice";

// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
  Button,
} from "reactstrap";

import logo from "../../assets/img/brand/logo-full.png";

const UserNavbar = (props) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/user/home-page");
  };

  return (
    <>
      <Navbar
        className="navbar-top navbar-dark"
        expand="md"
        id="navbar-main"
        style={{ position: "relative" }}
      >
        <Container fluid>
          {/* <Image src={logo} style={{ height: "px" }}></Image> */}
          <div>
            <Link
              className="h4 mb-0 text-dark text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              <img
                style={{
                  height: "60px",
                }}
                alt="..."
                src={logo}
              />
            </Link>
          </div>

          <div>
            {/* removed searchbar */}

            <Nav className="align-items-center d-none d-md-flex" navbar>
              <Link className="ml-4 text-gray" to="/">
                <span className="mb-0 text-sm font-weight-bold">Dashboard</span>
              </Link>
              {!user && (
                <Link className="ml-4 text-gray" to="/auth/login">
                  <span className="mb-0 text-sm font-weight-bold">Login</span>
                </Link>
              )}

              {/* services menu */}
              {user && (
                <UncontrolledDropdown nav className="text-gray">
                  <DropdownToggle className="pr-0" nav>
                    <Media className="align-items-start">
                      <Media className="ml-2 d-none d-lg-block">
                        <span
                          className="mb-0 text-sm font-weight-bold text-gray"
                          // style={{ color: "#525f7f" }}
                        >
                          Services
                        </span>
                      </Media>
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-single-02" />
                      <span>My profile</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}

              {/* pfp display menu */}
              {user && (
                <UncontrolledDropdown nav className="mr-4">
                  <DropdownToggle className="pr-0" nav>
                    <Media className="align-items-center">
                      <Media className="ml-2 d-none d-lg-block">
                        <span className="mb-0 text-sm font-weight-bold text-gray">
                          {user.name}
                        </span>
                      </Media>
                      <span className="avatar avatar-sm rounded-circle ml-3 mb-2 mt-2">
                        <img
                          alt="..."
                          src={
                            user.image ||
                            `https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`
                          }
                        />
                      </span>
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-single-02" />
                      <span>My profile</span>
                    </DropdownItem>

                    <DropdownItem to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-calendar-grid-58" />
                      <span>Progress</span>
                    </DropdownItem>
                    <DropdownItem to="/admin/user-profile" tag={Link}>
                      <i className="ni ni-support-16" />
                      <span>FAQ</span>
                    </DropdownItem>
                    <DropdownItem divider />
                    {user && (
                      <DropdownItem href="#pablo" onClick={onLogout}>
                        <i className="ni ni-user-run" />
                        <span>Logout</span>
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
              {!user && (
                <>
                  <Link to="/auth/register" className="mr-2 ml-4">
                    <Button color="success">Register</Button>
                  </Link>
                </>
              )}
              <Link to="/user/bookings">
                <Button color="primary">Book Now</Button>
              </Link>
            </Nav>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default UserNavbar;
