import React from "react";
import { useLocation, Route, Routes, Navigate, Outlet } from "react-router-dom";

// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import Index from "views/Index.js";

import routes from "../routes";

const Admin = () => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (path.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/argon-react.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        {/* {location.pathname} */}
        <AdminNavbar brandText={getBrandText(location.pathname)} />
        <Routes>
          {routes.map((item, index) =>
            item.layout === "/admin" ? (
              <Route
                key={index}
                path={item.path}
                element={<item.component />}
              />
            ) : null
          )}
          <Route path="/" element={<Navigate to="/admin/index" />} />
        </Routes>
        <Outlet />
        {/* <Outlet /> */}
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
