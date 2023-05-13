import { Button, Container, Row, Col } from "reactstrap";

const FeedbackHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "500px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/feedbackCover.jpg") + ")",
          backgroundSize: "100% 80%",
          
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white" style={{width: '35rem'}}>Tell us about your experience with us</h1>
              <p className="text-white mt-0 mb-5" style={{width: '25rem'}}>
                Help us make our community better by providing your valuable feedback . . . .
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FeedbackHeader;
