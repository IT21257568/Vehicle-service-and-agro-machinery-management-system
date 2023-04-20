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

const UpdateRepairJob = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // get vacancy id from url
  const { id } = useParams();

  const navigate = useNavigate();

  // form states
  const [data, setData] = useState([]);
  const [name, setCustomerName] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [requiredParts, setRequiredParts] = useState("");
 

  useEffect(() => {
    const getRepairJob = async () => {
      const res = await axios.get(`/api/damageValuation/${id}`);
      console.log(res.data);
      setData(res.data);

      setCustomerName(res.data.customer_name);
      setVehicleModel(res.data.vehicle_Model);
      setCustomerId(res.data.customer_id);
      setCustomerEmail(res.data.customer_email);
      setVehicleNumber(res.data.vehicle_Number);
      setEstimatedCost(res.data.estimated_cost);
      setRequiredParts(res.data.required_parts);


    };
    getRepairJob();
  }, [id]);

  const handleUpdate = () => {
    console.log("lol");

    axios
      .patch(`/api/damageValuation/${id}`, {
        customer_name: name,
        vehicle_Model: vehicleModel,
        customer_id: customerId,
        vehicle_Number: vehicleNumber,
        customer_email: customerEmail,
        estimated_cost: estimatedCost,
        required_parts: requiredParts
      })
      .then((res) => {
        console.log(res.data);
        navigate("/admin/view-repair-jobs");
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
                    <h3 className="mb-0">Create Repair Job</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Job Details
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
                            placeholder="Title"
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
                            Vehicle Type
                          </label>
                          <Dropdown
                            isOpen={dropdownOpen}
                            color="primary"
                            toggle={toggle}
                          >
                            <DropdownToggle caret>
                              {vehicleModel ? vehicleModel : "Select Type"}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                value="Toyota"
                                onClick={(e) => {
                                  setVehicleModel(e.target.value);
                                }}
                              >
                                Toyota
                              </DropdownItem>
                              <DropdownItem
                                value="Nissan"
                                onClick={(e) => {
                                  setVehicleModel(e.target.value);
                                }}
                              >
                                Nissan
                              </DropdownItem>
                              <DropdownItem
                                value="Honda"
                                onClick={(e) => {
                                  setVehicleModel(e.target.value);
                                }}
                              >
                                Honda
                              </DropdownItem>
                              <DropdownItem
                                value="Mazda"
                                onClick={(e) => {
                                  setVehicleModel(e.target.value);
                                }}
                              >
                                Mazda
                              </DropdownItem>
                              <DropdownItem
                                value="Suzuki"
                                onClick={(e) => {
                                  setVehicleModel(e.target.value);
                                }}
                              >
                                Suzuki
                              </DropdownItem>
                              <DropdownItem
                                value="Other"
                                onClick={(e) => {
                                  setVehicleModel(e.target.value);
                                }}
                              >
                                Other
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
                                placeholder="Title"
                                type="text"
                                onChange={(e) => {
                                setCustomerId(e.target.value);
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
                                Vehicle Number
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Title"
                                type="text"
                                onChange={(e) => {
                                setVehicleNumber(e.target.value);
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
                                Customer Email
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Title"
                                type="text"
                                onChange={(e) => {
                                setCustomerEmail(e.target.value);
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
                                Estimated Cost
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Title"
                                type="text"
                                onChange={(e) => {
                                setEstimatedCost(e.target.value);
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
                        Required Parts
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A brief description about the vacancy"
                        rows="4"
                        type="textarea"
                        onChange={(e) => {
                          setRequiredParts(e.target.value);
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
                        navigate("/admin/view-repair-jobs");
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

export default UpdateRepairJob;