import { Button, Container, Row, Col } from "reactstrap";

const BookingHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "500px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/car-service-online.jpg") + ")",
          backgroundSize: "100% 115%",
          //backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">View All Bookings</h1>

            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default BookingHeader;
