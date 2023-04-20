import React from "react";
// reactstrap components
import {
  Container,
  Row,
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText
} from "reactstrap";

  // core components
  import UserHeader from "components/Headers/UserHeader.js";
  
  const SparePartsPage = () => {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Card style={{ width: "18rem" }}>
          <CardImg
            alt="..."
            src={Image}
            top
          />
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardText>
              Some quick example text to build on the card title and make up
              the bulk of the card's content.
            </CardText>
            <Button
              color="primary"
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              Go somewhere
            </Button>
          </CardBody>
        </Card>
          </Row>
        </Container>
      </>
    );
  };
  
  export default SparePartsPage;
  