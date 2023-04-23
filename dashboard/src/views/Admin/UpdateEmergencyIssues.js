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



const UpdateEmergencyIssue = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggle1 = () => setDropdownOpen1((prevState) => !prevState);

  // get vacancy id from url
  const { id } = useParams();

  const navigate = useNavigate();

  // form states
  const [data, setData] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerNIC, setCustomerNIC] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [location, setLocation] = useState("");
  const [emDiscription, setEmDiscription] = useState("");
  const [issueStatus, setIssueStatus] = useState("");
  const [availableTechnicians, setAvailableTechnicians] = useState([]);
  const [maintenanceFee, setMaintenanceFee] = useState("");
  const [towingFee, setTowingFee] = useState("");
  const [totalFee, setTotalFee] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEmergencyIssue = async () => {
      const res = await axios.get(`/api/emergencyIssues/${id}`);
      console.log(res.data);
      setData(res.data);

      setCustomerName(res.data.customer_name);
      setCustomerNIC(res.data.customer_NIC);
      setContactNumber(res.data.contact_number);
      setLocation(res.data.c_location);
      setEmDiscription(res.data.EM_discription);
      setIssueStatus(res.data.issue_status);
      setAvailableTechnicians(res.data.available_emp);
      setMaintenanceFee(res.data.maintenance_fee);
      setTowingFee(res.data.towing_fee);
      setTotalFee(res.data.total_fee);
    };
    getEmergencyIssue();
  }, [id]);

  const handleUpdate = () => {
    console.log("update button clicked");

    axios
      .patch(`/api/emergencyIssues/${id}`, {
        customer_name: customerName,
        customer_NIC: customerNIC,
        contact_number: contactNumber,
        c_location: location,
        EM_discription: emDiscription,
        issue_status: issueStatus,
        available_emp: availableTechnicians,
        maintenance_fee: maintenanceFee,
        towing_fee: towingFee,
        total_fee: totalFee,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/admin/view-emergency-issues");
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
                    <h3 className="mb-0">Update Emergency Issue</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Emergency Issue Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Customer Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Enter Customer Name"
                            defaultValue={data.customer_name}
                            type="text"
                            onChange={(e) => {
                              setCustomerName(e.target.value);
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
                            Issue Status
                          </label>
                          <Dropdown
                            isOpen={dropdownOpen}
                            color="primary"
                            toggle={toggle}
                          >
                            <DropdownToggle caret>
                              {issueStatus ? issueStatus : "Select Type"}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                value="Solved"
                                onClick={(e) => {
                                  setIssueStatus(e.target.value);
                                }}
                              >
                                Solved
                              </DropdownItem>
                              <DropdownItem
                                value="Pending"
                                onClick={(e) => {
                                  setIssueStatus(e.target.value);
                                }}
                              >
                                Pending
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                            <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-username"
                            >
                                Customer NIC
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Enter Customer NIC" 
                                defaultValue={data.customer_NIC}
                                type="text"
                                onChange={(e) => {
                                setCustomerNIC(e.target.value);
                                }}
                            />
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                            <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-username"
                            >
                                Contact Number
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Enter Contact Number"
                                defaultValue={data.contact_number}
                                type="text"
                                onChange={(e) => {
                                setContactNumber(e.target.value);
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
                            htmlFor="input-username"
                          >
                            Current Location
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Enter Current Location"
                            defaultValue={data.c_location}
                            type="text"
                            onChange={(e) => {
                              setLocation(e.target.value);
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
                            Available Employees
                          </label>
                          <Dropdown
                            isOpen={dropdownOpen1}
                            color="primary"
                            toggle={toggle1}
                          >
                            <DropdownToggle caret>
                              {availableTechnicians ? availableTechnicians : "Select a Technician"}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                value="A.N. Silva"
                                onClick={(e) => {
                                  setAvailableTechnicians(e.target.value);
                                }}
                              >
                                A.N. Silva
                              </DropdownItem>
                              <DropdownItem
                                value="K. Jayawardana"
                                onClick={(e) => {
                                  setAvailableTechnicians(e.target.value);
                                }}
                              >
                                K. Jayawardana
                              </DropdownItem>
                              <DropdownItem
                                value="H.B. Bandara"
                                onClick={(e) => {
                                  setAvailableTechnicians(e.target.value);
                                }}
                              >
                                H.B. Bandara
                              </DropdownItem>
                              <DropdownItem
                                value="R.S Perera"
                                onClick={(e) => {
                                  setAvailableTechnicians(e.target.value);
                                }}
                              >
                                R.S Perera
                              </DropdownItem>
                              <DropdownItem
                                value="I.M. Gunapala"
                                onClick={(e) => {
                                 setAvailableTechnicians(e.target.value);
                                }}
                              >
                                I.M. Gunapala
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Maintenance Fee
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Enter Maintenance Fee"
                            defaultValue={data.maintenance_fee}
                            type="text"
                            onChange={(e) => {
                            setMaintenanceFee(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username "
                          >
                            Towing Fee
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Enter towing Fee"
                            defaultValue={data.towing_fee}
                            type="text"
                            onChange={(e) => {
                              setTowingFee(e.target.value);
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
                            htmlFor="input-username "
                          >
                            Total Fee
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Enter total Fee"
                            defaultValue={data.total_fee}
                            type="text"
                            onChange={(e) => {
                              setTotalFee(e.target.value);
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
                        Description
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Brief description about the issue"
                        defaultValue={data.EM_discription}
                        rows="4"
                        type="textarea"
                        onChange={(e) => {
                          setEmDiscription(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <Button color="primary" onClick={handleUpdate}>
                      Update
                    </Button>
                    <Button
                      color="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/admin/view-emergency-issues");
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

export default UpdateEmergencyIssue;
