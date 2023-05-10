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

const OrderAgroProduct = () => {
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
      const res = await axios.get(`/api/spareParts${id}`);
      console.log(res.data);
      setData(res.data);
      setSparePartName(res.data.p_name);
      setSparePartPrice(res.data.p_price);
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
  const [error, setError] = useState(null);


// const handleImageUpload = (event) => {
//   const file = event.target.files[0];
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "agd0dlhj");
//   // formData.append("public_id", "your_public_id");
//   formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);

//   const options = {
//     onUploadProgress: (progressEvent) => {
//       const percentCompleted = Math.round(
//         (progressEvent.loaded * 100) / progressEvent.total
//       );
//       setUploadProgress(percentCompleted);
//     },
//   };

//   axios
//     .post(
//       `https://api.cloudinary.com/v1_1/dkk0hlcyk/image/upload`,
//       formData,
//       options
//     )
//     .then((response) => {
//       setCVFile(response.data.secure_url);
//       setUploadProgress(0);
//     })
//     .catch((error) => {
//       console.error(error);
//       setUploadProgress(0);
//     });
// };


  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    try {
      await axios
        .post("/api/orderAgroProduct", {
          customer_name: customer_name,
          customer_contact: customer_contact,
          customer_email: customer_email,
          customer_address: customer_address,
          customer_note: customer_note,
          p_name: AgroProduct_name,
        })
        .then((res) => {
          console.log("New order added", res.data);
          setCustomerName("");
          setCustomerContact("");
          setCustomerEmail("");
          setCustomerAddress("");
          setCustomerNote("");
          setError(null);
          navigate("/user/AgroProducts"); 
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
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h4 className="mb-0">
                      Order {" "}
                      <Badge color="success">{data.p_name}</Badge>
                    </h4>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Customer Details
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Agro Product Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            readOnly
                            value={data.p_name}
                            placeholder="Title"
                            type="text"
                            onChange={(e) => {
                                setAgroProductName(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup className="d-flex flex-column">
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
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
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Contact Number
                          </label>

                          <Input
                            className="form-control-alternative"
                            defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="Enter Your Contact Number Here"
                            type="number"
                            onChange={(e) => {
                              setCustomerContact(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
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
                    </Row>
                    <Row>
                      <Col lg="6">
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
                      <Col lg="6">
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
                        navigate("/user/AgroProducts");
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

export default OrderAgroProduct;
