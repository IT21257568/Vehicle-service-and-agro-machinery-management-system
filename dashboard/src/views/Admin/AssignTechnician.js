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
  const [allTechnicians, setAllTechnicians] = useState([]);
  const [technicianName, setTechnicianName] = useState("");
  const [technicianId, setTechnicianId] = useState("");
  const [error, setError] = useState(null);
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
  // retrieve all technicians from database
  useEffect(() => {
    const fetchAllTechnicians = async () => {
      try {
        const res = await axios.get("/api/mTeams");
        setAllTechnicians(res.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchAllTechnicians();
  }, []);

  const handleUpdate = () => {
    console.log("lol");

    axios
      .patch(`/api/bookings/${id}`, {
        technician_id: technicianId,
        technician_name: technicianName,
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
                    <h3 className="mb-0">Assign Technician</h3>
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
                            readOnly
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
                          <Input
                            className="form-control-alternative"
                            defaultValue={data.service_type}
                            placeholder="Client Name"
                            type="text"
                            readOnly
                          />
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
                          <Input
                            className="form-control-alternative"
                            defaultValue={data.location}
                            placeholder="Client Name"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup className="d-flex flex-column">
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Technician Name
                          </label>
                          <Dropdown
                            isOpen={dropdownOpen}
                            color="primary"
                            toggle={toggle}
                          >
                            <DropdownToggle caret>
                              {technicianName
                                ? technicianName
                                : "Select Technician"}
                            </DropdownToggle>
                            <DropdownMenu>
                              {allTechnicians.map((technician) => (
                                <DropdownItem
                                  key={technician._id}
                                  value={`${technician._id},${technician.technician_name}`} // Set ID and name as the value
                                  onClick={(e) => {
                                    const [technicianId, technicianName] =
                                      e.target.value.split(",");
                                    setTechnicianId(technicianId); // Set technician ID
                                    setTechnicianName(technicianName); // Set technician name
                                  }}
                                >
                                  {technician.technician_name}(
                                  {technician.technician_specialize_in})
                                </DropdownItem>
                              ))}
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
                            Date and Time
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data.date_time}
                            id="input-first-name"
                            placeholder="Date and Time"
                            type="Date"
                            readOnly
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
                        readOnly
                      />
                    </FormGroup>
                    <Button color="primary" onClick={handleUpdate}>
                      Assign Technician
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
