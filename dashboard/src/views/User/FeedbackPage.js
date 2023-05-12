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
import Header from "components/Headers/BookingHeader";

const ProvideFeedback = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggle1 = () => setDropdownOpen1((prevState) => !prevState);
  const navigate = useNavigate();

  // form states
  const [data, setData] = useState([]);
  const [feedbackTxt, setFeedbackTxt] = useState("");
  const [ratingNum, setRatingNum] = useState("");
  const [feedDate, setFeedDate] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    try {
      await axios
        .post("/api/feedback", {
          feedback: feedbackTxt,
          rating: ratingNum,
          fd_date: feedDate
        })
        .then((res) => {
          console.log("New booking added", res.data);
          setFeedbackTxt("");
          setRatingNum("");
          setFeedDate("");
          setError(null);
          navigate("/user/home-page");
        });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { error: errorMessage, emptyFields } = error.response.data;
        const fields = emptyFields.join(", ");
        setError(`Please fill in all fields: ${fields}`);
      } else {
        console.log(error);
      }
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
                    <h3 className="mb-0">Provide Feedback</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Feedback
                  </h6>
                  <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-start-date"
                          >
                           Date of the service
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-start-date"
                            
                            type="date"
                            onChange={(e) => {
                              setFeedDate(e.target.value);
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
                            Your Feedback
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Enter your feedback here"
                            type="textarea"
                            rows="4"
                            onChange={(e) => {
                              setFeedbackTxt(e.target.value);
                            }}
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
                            User experience
                          </label>
                          <Dropdown
                            isOpen={dropdownOpen1}
                            color="primary"
                            toggle={toggle1}
                          >
                            <DropdownToggle caret>
                              { ratingNum ? ratingNum : "Select Type" }
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                value="5"
                                onClick={(e) => {
                                    setRatingNum(e.target.value);
                                }}
                              >
                                Excellent
                            </DropdownItem>
                              <DropdownItem
                                value="4"
                                onClick={(e) => {
                                    setRatingNum(e.target.value);
                                }}
                              >
                                Satisfied
                              </DropdownItem>
                              <DropdownItem
                                value="3"
                                onClick={(e) => {
                                    setRatingNum(e.target.value);
                                }}
                              >
                                Intermediate
                            </DropdownItem>
                            <DropdownItem
                                value="2"
                                onClick={(e) => {
                                    setRatingNum(e.target.value);
                                }}
                              >
                                Not satisfied
                            </DropdownItem>
                            <DropdownItem
                                value="1"
                                onClick={(e) => {
                                    setRatingNum(e.target.value);
                                }}
                              >
                                Dissapointed
                            </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </FormGroup>
                    <Button color="primary" onClick={handleSubmit}>
                      Submit Feedback
                    </Button>
                    <Button
                      color="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/user/home-page");
                      }}
                    >
                      Cancel
                    </Button>
                      </Col>
                    </Row>
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

export default ProvideFeedback;
