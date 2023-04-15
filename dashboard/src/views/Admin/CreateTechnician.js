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

const CreateVacancy = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const navigate = useNavigate();

  // form states
  const [data, setData] = useState([]);
  const [technician_name, setTechnicianName] = useState("");
  const [technician_age, setTechnicianAge] = useState("");
  const [technician_experiences, setTechnicianExperiences] = useState("");
  const [technician_expertise, setTechnicianExpertise] = useState("");
  const [technician_picture_url, setTechnicianPictureUrl] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    try {
      await axios
        .post("/api/mTeams", {
          technician_name: technician_name,
          technician_age: technician_age,
          technician_experiences: technician_experiences,
          technician_expertise: technician_expertise,
          technician_picture_url: technician_picture_url,
        })
        .then((res) => {
          console.log("New Technician added", res.data);
          setTechnicianName("");
          setTechnicianAge("");
          setTechnicianExperiences("");
          setTechnicianExpertise("");
          setTechnicianPictureUrl("");
          setError(null);
          navigate("/admin/technicians");
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
                    <h3 className="mb-0">Add Technician</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Technician Details
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Technician Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Enter Name"
                            type="text"
                            onChange={(e) => {
                              setTechnicianName(e.target.value);
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
                            Technician Picture
                          </label>
                          <Input
                            type="file"
                            className="form-control-alternative"
                            onChange={(e) => {
                              setTechnicianPictureUrl(e.target.value);
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
                            Technician Age
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="select age"
                            type="number"
                            onChange={(e) => {
                              setTechnicianAge(e.target.value);
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
                            Technician Expirence
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="select number of years working on this field"
                            type="number"
                            onChange={(e) => {
                              setTechnicianExperiences(e.target.value);
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
                        Techinician Expertice
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A brief description about the vacancy"
                        rows="4"
                        type="textarea"
                        onChange={(e) => {
                          setTechnicianExpertise(e.target.value);
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
                        navigate("/admin/vacancies");
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

export default CreateVacancy;
