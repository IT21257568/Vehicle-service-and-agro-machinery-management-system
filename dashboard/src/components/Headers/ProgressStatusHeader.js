import { Button, Container, Row, Col } from "reactstrap";

const ProgressStatusHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "400px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/progresstrack.jpeg") + ")",
            backgroundSize: "100% 95%",

        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white" style={{width: '35rem'}}>Tracking the Progress of Your Car Service Online</h1>
              <p className="text-white mt-0 mb-5" style={{width: '25rem'}}>
                Stay Informed with Real-Time Updates on Your Car Service
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ProgressStatusHeader;
