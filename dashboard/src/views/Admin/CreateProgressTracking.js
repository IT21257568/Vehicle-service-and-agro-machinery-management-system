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
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

const CreateProgressTracking = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const navigate = useNavigate();

  // form states
  const [name, setName] = useState("");
  const [vehiNumber, setVehiNumber] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    try {
      await axios
        .post("/api/progress", {
            name : name,
            vehi_number : vehiNumber,
            status : status,
            date : date,
            description : description,
        })
        .then((res) => {
          console.log("New progress status added", res.data);
          setName("");
          setVehiNumber("");
          setStatus("");
          setDate("");
          setDescription("");
          setError(null);
          navigate("/admin/progress");
        });
    } catch (error) {
      setError(error.message);
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
                    <h3 className="mb-0">Create Progress Status</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Progress Status Title
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-title"
                          >
                            Customer Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-title"
                            placeholder="customer name"
                            type="text"
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-promo-code"
                          >
                            Vehicle Registration Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-promo-code"
                            placeholder="enter vehicle number"
                            type="text"
                            onChange={(e) => {
                              setVehiNumber(e.target.value);
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
                            htmlFor="input-discount"
                          >
                            Progress Status
                          </label>
                          <Input
                            className="form-control-alternative"
                            
                            id="input-discount"
                            placeholder="enter status"
                            type="number"
                            onChange={(e) => {
                              setStatus(e.target.value);
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
                            htmlFor="input-start-date"
                          >
                            Service Date
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-start-date"
                            
                            type="date"
                            onChange={(e) => {
                              setImmediate(e.target.value);
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
                        htmlFor="input-description"
                      >
                      Promotion Description
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A brief description about the Service Progress Status"
                        rows="4"
                        type="textarea"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <Button color="primary" onClick={handleSubmit}>
                      Create
                    </Button>
                    <Button
                      color="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/admin/progress");
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

export default CreateProgressTracking;
