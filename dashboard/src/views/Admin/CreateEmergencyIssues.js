import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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



const CreateEmergencyIssue = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggle1 = () => setDropdownOpen1((prevState1) => !prevState1);
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


  const showErrorToast = (errorMessage) => {
    toast.error(errorMessage, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    try {
      await axios
        .post("/api/emergencyIssues", {
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
          console.log("New emergency issue is added", res.data);
          setCustomerName("");
          setCustomerNIC("");
          setContactNumber("");
          setLocation("");
          setEmDiscription("");
          setIssueStatus("");
          setAvailableTechnicians("");
          setMaintenanceFee("");
          setTowingFee("");
          setTotalFee("");
          setError(null);
          navigate("/admin/view-emergency-issues");
        });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          const { error: errorMessage, emptyFields } = error.response.data;
          const fields = emptyFields.join(", ");
          const toastMessage = `Please fill in all fields: ${fields}`;
          setError(toastMessage);
          showErrorToast(toastMessage);
        } else {
          console.log(error);
        }
      }
  
  };

  return (
    <>
    <ToastContainer />
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Create Emergency Issue</h3>
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
                        rows="4"
                        type="textarea"
                        onChange={(e) => {
                          setEmDiscription(e.target.value);
                        }}
                      />
                      {/* {error && (
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
                      )}  */}
                    </FormGroup>
                    <Button color="primary" onClick={handleSubmit}>
                      Create
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

export default CreateEmergencyIssue;
