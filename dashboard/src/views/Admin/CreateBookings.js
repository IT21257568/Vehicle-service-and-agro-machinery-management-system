import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  Label
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

const CreateBooking = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggle1 = () => setDropdownOpen1((prevState) => !prevState);
  const navigate = useNavigate();

  // form states
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date_time, setDateTime] = useState("");
  const [specialNote, setSpecialNote] = useState("");
  const [booking_user_id, setBookingUserId] = useState("4200efghid");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    try {
      await axios
        .post("/api/bookings", {
          client_name: clientName,
          service_type: serviceType,
          location: location,
          phone: phone,
          email: email,
          date_time: date_time,
          special_note: specialNote,
          booking_user_id: booking_user_id,
        })
        .then((res) => {
          console.log("New booking added", res.data);
          setLocation("");
          setServiceType("");
          setClientName("");
          setEmail("");
          setPhone("");
          setDateTime("");
          setSpecialNote("");
          setError(null);
          navigate("/admin/bookings");
        });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { error: errorMessage, emptyFields } = error.response.data;
        const fields = emptyFields.join(", ");
        setError(`Please fill in all fields: ${fields}`);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Create Booking</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Client Name
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Client Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Client Name"
                            type="text"
                            onChange={(e) => {
                              setClientName(e.target.value);
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
                            Service Type
                          </label>
                          <Dropdown
                            isOpen={dropdownOpen}
                            color="primary"
                            toggle={toggle}
                          >
                            <DropdownToggle caret>
                              {serviceType ? serviceType : "Select Type"}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                value="Vehicle Repair"
                                onClick={(e) => {
                                  setServiceType(e.target.value);
                                }}
                              >
                                Vehicle Repair
                              </DropdownItem>
                              <DropdownItem
                                value="Wheel Alignment"
                                onClick={(e) => {
                                  setServiceType(e.target.value);
                                }}
                              >
                                Wheel Alignment
                              </DropdownItem>
                              <DropdownItem
                                value="Body Wash"
                                onClick={(e) => {
                                  setServiceType(e.target.value);
                                }}
                              >
                                Body Wash
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      
                      <Col lg="6">
                        <FormGroup className="d-flex flex-column">
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Location
                          </label>
                          <Dropdown
                            isOpen={dropdownOpen1}
                            color="primary"
                            toggle={toggle1}
                          >
                            <DropdownToggle caret>
                              {location ? location : "Select Type"}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                value="Auto Wash"
                                onClick={(e) => {
                                    setLocation(e.target.value);
                                }}
                              >
                                Auto Wash
                            </DropdownItem>
                              <DropdownItem
                                value="Auto Plaza"
                                onClick={(e) => {
                                    setLocation(e.target.value);
                                }}
                              >
                                Auto Plaza
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </FormGroup>

                        {/* <FormGroup className="d-flex flex-column">
                          <Label>Location</Label>
                          <div>
                            <FormGroup check>
                              <Label check>
                                <Input
                                type="radio"
                                name="Location"
                                value="Auto Wash"
                                checked={location === "Auto Wash"}
                                onChange={() => setLocation("Auto Wash")}
                                />
                              Auto wash
                              </Label>
                            </FormGroup>
                          </div>
                          <div>
                            <FormGroup check>
                              <Label check>
                                <Input
                                type="radio"
                                name="Location"
                                value="Auto Plaza"
                                checked={location === "Auto Plaza"}
                                onChange={() => setLocation("Auto Plaza")}
                                />
                              Auto Plaza
                              </Label>
                            </FormGroup>
                          </div>
                        </FormGroup>    */}
                                             
                      </Col>

                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Phone
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-first-name"
                            placeholder="Phone"
                            type="text"
                            onChange={(e) => {
                              setPhone(e.target.value);
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
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-first-name"
                            placeholder="Email"
                            type="email"
                            onChange={(e) => {
                              setEmail(e.target.value);
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
                            Date and Time
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-first-name"
                            placeholder="Date and Time"
                            type="date"
                            onChange={(e) => {
                            setDateTime(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                  </div>

                  {/* Description */}
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-last-name"
                      >
                        Special Note
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A brief description about the service type you need"
                        rows="4"
                        type="textarea"
                        onChange={(e) => {
                          setSpecialNote(e.target.value);
                        }}
                      />
                      {error && (
                        <div
                          style={{
                            backgroundColor: "#F46D75",
                            color: "white",
                            // textAlign:"center",
                            display: "flex",
                            justifyContent: "center",
                            // fontWeight:"bold",
                            // paddingBottom: "5px",
                            // paddingTop: "5px",
                            padding: "10px",
                            marginTop: "15px",
                            borderColor: "red",
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
                      Create
                    </Button>
                    <Button
                      color="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/admin/bookings");
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

export default CreateBooking;
