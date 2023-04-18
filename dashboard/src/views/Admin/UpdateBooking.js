import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const UpdateBooking = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // get vacancy id from url
  const { id } = useParams();

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
 

  useEffect(() => {
    const getBooking = async () => {
      const res = await axios.get(`/api/bookings/${id}`);
      console.log(res.data);
      setData(res.data);

      setLocation(res.data.location);
      setServiceType(res.data.service_type);
      setClientName(res.data.client_name);
      setEmail(res.data.email);
      setPhone(res.data.phone);
      setDateTime(res.data.date_time);
      setSpecialNote(res.data.special_note);


    };
    getBooking();
  }, [id]);

  const handleUpdate = () => {
    console.log("lol");

    axios
      .patch(`/api/bookings/${id}`, {
        location: location,
        service_type: serviceType,
        client_name: clientName,
        email: email,
        phone: phone,
        date_time: date_time,
        special_note: specialNote
      })
      .then((res) => {
        console.log(res.data);
        navigate("/admin/bookings");
      });
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
                    <h3 className="mb-0">Update Booking</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Booking Details
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
                            defaultValue={data.client_name}
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
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Location
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data.location}
                            placeholder="Location"
                            type="text"
                            onChange={(e) => {
                              setLocation(e.target.value);
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
                            Phone
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data.phone}
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
                            defaultValue={data.email}
                            placeholder="Email"
                            type="text"
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
                            defaultValue={data.date_time}
                            id="input-first-name"
                            placeholder="Date and Time"
                            type="Date"
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
                        defaultValue={data.special_note}
                        type="textarea"
                        onChange={(e) => {
                          setSpecialNote(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <Button color="primary" onClick={handleUpdate}>
                      Save
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






export default UpdateBooking;
