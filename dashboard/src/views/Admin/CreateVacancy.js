import { useState, useEffect } from "react";

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

  // form states
  const [title, setTitle] = useState("");
  const [type, setType] = useState();
  const [description, setDescription] = useState("");

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
                            defaultValue=""
                            id="input-username"
                            placeholder="Title"
                            type="text"
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
                              {type ? type : "Select Type"}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                value="Full Time"
                                onClick={(e) => {
                                  setType(e.target.value);
                                }}
                              >
                                Full Time
                              </DropdownItem>
                              <DropdownItem
                                value="Part Time"
                                onClick={(e) => {
                                  setType(e.target.value);
                                }}
                              >
                                Part Time
                              </DropdownItem>
                              <DropdownItem
                                value="Internship"
                                onClick={(e) => {
                                  setType(e.target.value);
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
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Jesse"
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
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
                        defaultValue=""
                        type="textarea"
                      />
                    </FormGroup>
                    <Button
                      color="primary"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      color="warning"
                      onClick={(e) => {
                        e.preventDefault();
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
