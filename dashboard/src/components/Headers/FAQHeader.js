import { Button, Container, Row, Col } from "reactstrap";

const FAQHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "500px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/FAQImage.jpg") + ")",
          backgroundSize: "100% 110%",
          
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white" style={{width: '35rem'}}>We guide you through all your concerns</h1>
              <p className="text-white mt-0 mb-5" style={{width: '25rem'}}>
                Explore the FAQ section to easily find solutions for your questions . . . 
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FAQHeader;
