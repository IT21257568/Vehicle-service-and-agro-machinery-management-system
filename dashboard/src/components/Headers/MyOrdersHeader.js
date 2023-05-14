import { Button, Container, Row, Col } from "reactstrap";

const SparePartHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "400px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/myOrders.jpeg") + ")",
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
                style={{width: '60rem'}}>
                    Looking to your recent orders?
              </h1>              
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SparePartHeader;
