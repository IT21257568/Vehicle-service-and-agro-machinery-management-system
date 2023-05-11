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
  Col,
  ButtonGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Form,
  CardFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// core components
import SparePartHeader from "components/Headers/SparePartHeader.js";

const SparePartsPage = () => {
  // states
  const [allSpareParts, setAllSpareParts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(4);
  const [faqCategory, setFaqCategory] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  //sorting function
  const sorting = () => {
    setDropdownOpen((prevState) => !prevState);
  };

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
      <SparePartHeader />
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
                  <Col xl = "3">
                    <label
                            className="form-control-label mr-2"
                            htmlFor="input-email"
                          >
                            Sort By: 
                          </label>
                          <Dropdown
                            isOpen={dropdownOpen}
                            color="primary"
                            toggle={toggle}
                            onClick={sorting}
                          >
                            <DropdownToggle caret>
                              {faqCategory ? faqCategory : "Select Category"}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                value="Price Low to High"
                                onClick={(e) => {
                                  setFaqCategory(e.target.value);
                                }}
                              >
                                Price Low to High
                              </DropdownItem>
                              <DropdownItem
                                value="Price High to Low"
                                onClick={(e) => {
                                  setFaqCategory(e.target.value);
                                }}
                              >
                                Price High to Low
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                  </Col>
                  <div className="col text-right">
                  {/* <Form className="mt-4 mb-3 d-md-none"> */}
                  <InputGroup className="input-group-rounded input-group-merge">
                    <Input
                      aria-label="Search"
                      className="form-control-rounded form-control-prepended"
                      placeholder="Search by Spare Part Name"
                      type="search"
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    {/* <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <span className="fa fa-search" />
                    </InputGroupText>
                    </InputGroupAddon> */}
                 </InputGroup>
                  {/* </Form> */}
                  </div>
                </Row>
              </CardHeader>
              {/* <Container> */}
               <div className="pl-lg-5">
                <Row style={{ marginTop: "0.5rem" }}>
                  {allSpareParts
                  .filter((sparePart) =>
                  sparePart.sp_name
                    ?.toLowerCase()
                    .includes(query.toLowerCase())
                  )
                  .slice(0, visible).map((sparePart, index) => (
                    <Card
                      key={sparePart._id}
                      style={{
                        height: "30rem",
                        width: "20rem",
                        borderRadius: "2rem",
                        margin: "0.8rem",
                      }}
                    >
                      <CardImg
                        height="200rem"
                        width="100%"
                        alt="Sample"
                        style={{borderRadius:"2rem"}}
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
                            color="warning"
                            type="button"
                            style={{marginLeft: '3.3rem', width: '12rem'}}
                            onClick={() =>
                              navigate(
                                `/user/order-spareParts/${sparePart._id}`
                              )
                            }
                          >
                            Order Product
                          </Button>
                        </Row>
                      </CardBody>
                    </Card>
                  ))}
                </Row>
              </div>
              {/* </Container> */}
              <CardFooter className="col text-right" style={{marginTop: '1.8rem'}}>
                {visible < allSpareParts.length && (
                    <Button  color="info" size="sm" onClick={showMoreItems}>
                      Load More
                    </Button>
                )}
                </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default SparePartsPage;
