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

const UpdateVacancy = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // get vacancy id from url
  const { id } = useParams();

  const navigate = useNavigate();

  // form states
  const [data, setData] = useState([]);
  const [vacancyTitle, setVacancyTitle] = useState("");
  const [vacancyType, setVacancyType] = useState("");
  const [vacancyCount, setVacancyCount] = useState("");
  const [vacancyRequirements, setVacancyRequirements] = useState("");

  useEffect(() => {
    const getVacancy = async () => {
      const res = await axios.get(`/api/vacancies/${id}`);
      console.log(res.data);
      setData(res.data);

      setVacancyTitle(res.data.vacncy_title);
      setVacancyType(res.data.vacncy_type);
      setVacancyCount(res.data.vacancy_count);
      setVacancyRequirements(res.data.vacncy_requirements);
    };
    getVacancy();
  }, [id]);

  const handleUpdate = () => {
    console.log("lol");

    axios
      .patch(`/api/vacancies/${id}`, {
        vacncy_title: vacancyTitle,
        vacncy_type: vacancyType,
        vacancy_count: vacancyCount,
        vacncy_requirements: vacancyRequirements,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/admin/vacancies");
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
                    <h3 className="mb-0">Update Vacancy</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Vacancy Details
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
                            defaultValue={data.vacncy_title}
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
                            htmlFor="input-username"
                          >
                            Vacancy Count
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data.vacancy_count}
                            placeholder="select count"
                            type="number"
                            onChange={(e) => {
                              setVacancyCount(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
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
                        defaultValue={data.vacncy_requirements}
                        onChange={(e) => {
                          setVacancyRequirements(e.target.value);
                        }}
                        type="textarea"
                      />
                    </FormGroup>
                    <Button color="primary" onClick={handleUpdate}>
                      Save
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

export default UpdateVacancy;
