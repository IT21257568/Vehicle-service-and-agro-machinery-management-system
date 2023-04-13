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
  const [vacancyTitle, setVacancyTitle] = useState("");
  const [vacancyType, setVacancyType] = useState("");
  const [vacancyCount, setVacancyCount] = useState("");
  const [vacancyRequirements, setVacancyRequirements] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    try {
      await axios
        .post("/api/vacancies", {
          vacncy_title: vacancyTitle,
          vacncy_type: vacancyType,
          vacancy_count: vacancyCount,
          vacncy_requirements: vacancyRequirements,
        })
        .then((res) => {
          console.log("New sparepart added", res.data);
          setVacancyTitle("");
          setVacancyType("");
          setVacancyCount("");
          setVacancyRequirements("");
          setError(null);
          navigate("/admin/vacancies");
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
                    <h3 className="mb-0">Create Vacancy</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Vacancy Title
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Vacancy Title
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Title"
                            type="text"
                            onChange={(e) => {
                              setVacancyTitle(e.target.value);
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
                            Vacancy Type
                          </label>
                          <Dropdown
                            isOpen={dropdownOpen}
                            color="primary"
                            toggle={toggle}
                          >
                            <DropdownToggle caret>
                              {vacancyType ? vacancyType : "Select Type"}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                value="Full Time"
                                onClick={(e) => {
                                  setVacancyType(e.target.value);
                                }}
                              >
                                Full Time
                              </DropdownItem>
                              <DropdownItem
                                value="Part Time"
                                onClick={(e) => {
                                  setVacancyType(e.target.value);
                                }}
                              >
                                Part Time
                              </DropdownItem>
                              <DropdownItem
                                value="Internship"
                                onClick={(e) => {
                                  setVacancyType(e.target.value);
                                }}
                              >
                                Internship
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
                            htmlFor="input-first-name"
                          >
                            Vacancy Count
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                            onChange={(e) => {
                              setVacancyCount(e.target.value);
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
                        Requirements
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A brief description of the vacancy"
                        rows="4"
                        type="textarea"
                        onChange={(e) => {
                          setVacancyRequirements(e.target.value);
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
