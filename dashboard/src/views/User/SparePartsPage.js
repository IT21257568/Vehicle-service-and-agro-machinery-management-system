import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// reactstrap components
import {
  Container,
  Row,
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  ButtonGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Form,
} from "reactstrap";

// core components
import UserHeader from "components/Headers/UserHeader.js";

const SparePartsPage = () => {
  // states
  const [allSpareParts, setAllSpareParts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(10);

  const navigate = useNavigate();

  // retrieve all spare parts from database
  useEffect(() => {
    const fetchAllSpareParts = async () => {
      try {
        const response = await axios.get("/api/spareParts");
        setAllSpareParts(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchAllSpareParts();
  }, []);

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow" color="lighter">
              <CardHeader
                className="border-0"
                style={{ marginBottom: "1.8rem" }}
              >
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">All Spare Parts</h3>
                  </div>
                  <div className="col text-right">
                  {/* <Form className="mt-4 mb-3 d-md-none"> */}
                  <InputGroup className="input-group-rounded input-group-merge">
                    <Input
                      aria-label="Search"
                      className="form-control-rounded form-control-prepended"
                      placeholder="Search"
                      type="search"
                    />
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <span className="fa fa-search" />
                    </InputGroupText>
                    </InputGroupAddon>
                 </InputGroup>
                  {/* </Form> */}
                  </div>
                </Row>
              </CardHeader>
              <div className="pl-lg-6">
                <Row>
                  {allSpareParts.slice(0, visible).map((sparePart, index) => (
                    <Card
                      key={sparePart._id}
                      style={{
                        height: "30rem",
                        width: "20rem",
                        borderRadius: "0.2rem",
                        margin: "0.8rem",
                      }}
                    >
                      <CardImg
                        height="200rem"
                        width="100%"
                        alt="Sample"
                        src={sparePart.sp_image}
                      />
                      <CardBody>
                        <CardTitle tag="h2">{sparePart.sp_name}</CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h4">
                          <Badge color="success">{sparePart.sp_status}</Badge>
                        </CardSubtitle>
                        <br></br>
                        <CardSubtitle className="mb-2 text-muted" tag="h3">
                          Rs. {sparePart.sp_price}
                        </CardSubtitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h3">
                          {sparePart.sp_discount}% Off
                        </CardSubtitle>
                        <CardText>{sparePart.sp_description}</CardText>

                        <Row>
                          <Button
                            block
                            color="warning"
                            outline
                            type="button"
                            onClick={() =>
                              navigate(
                                `/admin/update-spare-part/${sparePart._id}`
                              )
                            }
                          >
                            Add to Cart
                          </Button>
                        </Row>
                      </CardBody>
                    </Card>
                  ))}
                </Row>
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default SparePartsPage;
