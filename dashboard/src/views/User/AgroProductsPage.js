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
import AgroProductHeader from "components/Headers/AgroProductHeader.js";

const AgroProductsPage = () => {
  // states
  const [allAgroProducts, setAllAgroProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(4);
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqCategory, setFaqCategory] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all spare parts from database
  useEffect(() => {
    const fetchAllAgroProducts = async () => {
      try {
        const response = await axios.get("/api/agroProducts");
        setAllAgroProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchAllAgroProducts();
  }, []);

  return (
    <>
      <AgroProductHeader />
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
                    <h3 className="mb-0">All Agro Products</h3>
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
                      placeholder="Search"
                      type="search"
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    {/* <InputGroupAddon addonType="prepend">
                    {/* <InputGroupText>
                    <span className="fa fa-search" />
                    </InputGroupText> *
                    </InputGroupAddon> */}
                 </InputGroup>
                  {/* </Form> */}
                  </div>
                </Row>
              </CardHeader>
              <div className="pl-lg-5">
                <Row>
                  {allAgroProducts
                  .filter((agroProduct) =>
                  agroProduct.p_name
                    ?.toLowerCase()
                    .includes(query.toLowerCase())
                  )
                  .slice(0, visible).map((agroProduct, index) => (
                    <Card
                      key={agroProduct._id}
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
                        src={agroProduct.p_image}
                      />
                      <CardBody>
                        <CardTitle tag="h2">{agroProduct.p_name}</CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h4">
                          <Badge color="success">{agroProduct.p_status}</Badge>
                        </CardSubtitle>
                        <br></br>
                        <CardSubtitle className="mb-2 text-muted" tag="h3">
                          Rs. {agroProduct.p_price}
                        </CardSubtitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h3">
                          {agroProduct.p_discount}% Off
                        </CardSubtitle>
                        <CardText>{agroProduct.p_description}</CardText>

                        <Row>
                          <Button
                            color="warning"
                            style={{marginLeft: '3.3rem', width: '12rem'}}
                            type="button"
                            onClick={() =>
                              navigate(
                                `/user/order-agro-product/${agroProduct._id}`
                              )
                            }
                          >
                            Order Your Product
                          </Button>
                        </Row>
                      </CardBody>
                    </Card>
                  ))}
                </Row>
              </div>
              <CardFooter className="col text-right" style={{marginTop: '1.8rem'}}>
                {visible < allAgroProducts.length && (
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

export default AgroProductsPage;
