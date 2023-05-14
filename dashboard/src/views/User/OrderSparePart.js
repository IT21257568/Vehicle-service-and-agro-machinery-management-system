import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "reactstrap";

// core components
import SparePartHeader from "components/Headers/SparePartHeader.js";

const OrderSparePart = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  
  // get vacancy id from url
  const { id } = useParams();

  const navigate = useNavigate();
  //const [uploadProgress, setUploadProgress] = useState(0);

  // form states
  const [data, setData] = useState([]);
  const [SparePart_name, setSparePartName] = useState("");
  const [SparePart_price, setSparePartPrice] = useState("");
  
  useEffect(() => {
    const getSparePartNameOrders = async () => {
      const res = await axios.get(`/api/spareParts/${id}`);
      console.log(res.data);
      setData(res.data);
      setSparePartName(res.data.sp_name);
      setSparePartPrice(res.data.sp_price);
    };
    getSparePartNameOrders();
  }, [id]);

  // form states
  const [customer_name, setCustomerName] = useState("");
  const [customer_contact, setCustomerContact] = useState("");
  const [customer_email, setCustomerEmail] = useState("");
  const [customer_address, setCustomerAddress] = useState("");
  const [customer_note, setCustomerNote] = useState("");
  const [customer_buying_option, setBuyingOption] = useState("");
  const [sparepart_user_id, setSparePartUserId] = useState("4200");
  const [error, setError] = useState(null);



  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    try {
      await axios
        .post("/api/orderSparePart", {
          customer_name: customer_name,
          customer_contact: customer_contact,
          customer_email: customer_email,
          customer_address: customer_address,
          customer_note: customer_note,
          customer_buying_option: customer_buying_option,
          p_price: SparePart_price,
          p_name: SparePart_name,
          sparepart_user_id: sparepart_user_id,	
        })
        .then((res) => {
          console.log("New order added", res.data);
          setCustomerName("");
          setCustomerContact("");
          setCustomerEmail("");
          setCustomerAddress("");
          setCustomerNote("");
          setBuyingOption("");
          setSparePartName("");
          setSparePartPrice("");
          setError(null);
          navigate("/user/spareParts"); 
        });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { error: errorMessage, emptyFields } = error.response.data;
        const fields = emptyFields.join(", ");
        setError(`${fields}`);
      } else {
        console.log(error);
      }
    }
    
    
  };
  return (
    <>
      <SparePartHeader/>
      {/* Page content */}
      <Container className="mt--7" fluid style={{marginBottom: '3rem'}}>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h4 className="mb-0">
                      Order {" "}
                      <Badge color="success">{data.sp_name}</Badge>
                    </h4>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Spare Part Details
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Spare Part Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            readOnly
                            value={data.sp_name}
                            type="text"
                            onChange={(e) => {
                                setSparePartName(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup className="d-flex flex-column">
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Spare Part Price
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            readOnly
                            value={data.sp_price}
                            type="text"
                            onChange={(e) => {
                              setSparePartPrice(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Customer Details
                  </h6>
                    <div className="pl-lg-4">
                    <Row>
                    <Col lg="4">
                        <FormGroup className="d-flex flex-column">
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Eneter Your Name Here"
                            type="text"
                            onChange={(e) => {
                              setCustomerName(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Contact Number
                          </label>

                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="Enter Your Contact Number Here"
                            type="phone"
                            onChange={(e) => {
                              setCustomerContact(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Address
                          </label>

                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="Enter Your Address Here"
                            type="text"
                            onChange={(e) => {
                              setCustomerAddress(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup className="d-flex flex-column">
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Buying Option
                          </label>
                          <Dropdown
                            isOpen={dropdownOpen}
                            required
                            color="primary"
                            toggle={toggle}
                          >
                            <DropdownToggle caret>
                              {customer_buying_option
                                ? customer_buying_option
                                : "Select Option"}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                value="Meet at Shop door"
                                onClick={(e) => {
                                  setBuyingOption(e.target.value);
                                }}
                              >
                                Meet at Shop door
                              </DropdownItem>
                              <DropdownItem
                                value="Delivery"
                                onClick={(e) => {
                                  setBuyingOption(e.target.value);
                                }}
                              >
                                Delivery
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    <Col lg="4">
                        <FormGroup className="d-flex flex-column">
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="Enter Your Email Here"
                            type="email"
                            onChange={(e) => {
                              setCustomerEmail(e.target.value);
                            }}
                          /> 
                          
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Special Note
                          </label>

                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="Enter Your Note Here"
                            rows="2"
                            type="textarea"
                            onChange={(e) => {
                              setCustomerNote(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-lg-4">
                    <FormGroup>
                      {error && (
                        <div
                          style={{
                            backgroundColor: "#ffffff",
                            color: "red",
                            // textAlign:"center",
                            display: "flex",
                            justifyContent: "center",
                            // fontWeight:"bold",
                            // paddingBottom: "5px",
                            // paddingTop: "5px",
                            padding: "10px",
                            marginTop: "15px",
                            borderStyle: "solid",
                            borderColor: "red",
                            borderWidth: "3px",
                            borderRadius: "20px",
                          }}
                        >
                          <span>
                            <b>{error}</b>
                          </span>
                        </div>
                      )}
                    </FormGroup>
                    <Button color="primary" onClick={handleSubmit}>
                        Order
                    </Button>
                    <Button
                      color="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/user/spareParts");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderSparePart;
