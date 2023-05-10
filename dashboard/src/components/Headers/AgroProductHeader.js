import { Button, Container, Row, Col } from "reactstrap";

const AgroProductHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "400px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/AgroProductPic.jpg") + ")",
          backgroundSize: "100% 110%",
          
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white" 
                style={{width: '40rem'}}>
                    Heart of Perfect Farming !!!
              </h1>
              <p className="text-white mt-0 mb-5" 
                style={{width: '25rem'}}>
                    Field is futures! Have a soulful foods! One decision can change the whole result.
                    <h3 className="text-white mt-0 mb-5">Decision is yours!</h3>
              </p>
              
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AgroProductHeader;
