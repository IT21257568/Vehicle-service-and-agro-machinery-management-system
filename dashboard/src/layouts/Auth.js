import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "routes.js";
import UserNavbar from "components/Navbars/UserNavbar";

import logo from "../assets/img/brand/logo-edited.png";

const Auth = () => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  return (
    <>
      <div className="main-content" ref={mainContent}>
        {/* <AuthNavbar /> */}
        <UserNavbar></UserNavbar>
        <div className="header bg-gradient-info py-6 py-lg-6">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <img
                    className="mb-4"
                    style={{ width: "350px" }}
                    src={logo}
                    alt=""
                  ></img>
                  {/* <h1 className="text-white">Welcome to Wheelmasters</h1> */}
                  <p className="h3 text-white">
                    Unmatched service for your ride
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Routes>
              {routes.map((item, index) =>
                item.layout === "/auth" ? (
                  <Route
                    key={index}
                    path={item.path}
                    element={<item.component />}
                  />
                ) : null
              )}
            </Routes>
          </Row>
        </Container>
      </div>
      <AuthFooter />
    </>
  );
};

export default Auth;
