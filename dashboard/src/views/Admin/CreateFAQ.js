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

const CreateFAQ = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const navigate = useNavigate();

  // form states
  const [data, setData] = useState([]);
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqCategory, setFaqCategory] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [faqVidLink, setVidLink] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    try {
      await axios
        .post("/api/faqs", {
          faq_question: faqQuestion,
          faq_category: faqCategory,
          faq_answer: faqAnswer,
          vid_link: faqVidLink
        })
        .then((res) => {
          console.log("New FAQ added", res.data);
          setFaqQuestion("");
          setFaqCategory("");
          setFaqAnswer("");
          setVidLink("");
          setError(null);
          navigate("/admin/faqs");
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
                    <h3 className="mb-0">Create FAQ</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    FAQ Details
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Enter Question
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Enter question here"
                            type="textarea"
                            onChange={(e) => {
                              setFaqQuestion(e.target.value);
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
                        htmlFor="input-last-name"
                      >
                        Enter Answer
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Enter solution here"
                        rows="4"
                        type="textarea"
                        onChange={(e) => {
                          setFaqAnswer(e.target.value);
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
                        htmlFor="input-last-name"
                      >
                        Tutorial video link (Optional)
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Paste video link here"
                        rows="4"
                        type="text"
                        onChange={(e) => {
                          setVidLink(e.target.value);
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
                            Select FAQ Category
                          </label>
                          <Dropdown
                            isOpen={dropdownOpen}
                            color="primary"
                            toggle={toggle}
                          >
                            <DropdownToggle caret>
                              {faqCategory ? faqCategory : "Select Category"}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                value="User profile related"
                                onClick={(e) => {
                                  setFaqCategory(e.target.value);
                                }}
                              >
                                User profile related
                              </DropdownItem>
                              <DropdownItem
                                value="Bookings related"
                                onClick={(e) => {
                                  setFaqCategory(e.target.value);
                                }}
                              >
                                Bookings related
                              </DropdownItem>
                              <DropdownItem
                                value="Online shop related"
                                onClick={(e) => {
                                  setFaqCategory(e.target.value);
                                }}
                              >
                                Online shop related
                              </DropdownItem>
                              <DropdownItem
                                value="Agro products related"
                                onClick={(e) => {
                                  setFaqCategory(e.target.value);
                                }}
                              >
                                Agro products related
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </FormGroup>
                        </Col>
                      </Row>
                   </div> 
                   {error && (
                        <div
                          style={{
                            backgroundColor: "#F46D75",
                            color: "white",
                            // textAlign:"center",
                            display: "flex",
                            justifyContent: "center",
                            // fontWeight:"bold",
                            // paddingBottom: "5px",
                            // paddingTop: "5px",
                            padding: "10px",
                            marginTop: "15px",
                            borderColor: "red",
                            borderRadius: "20px",
                          }}
                        >
                          <span>
                            <b>{error}</b>
                          </span>
                        </div>
                      )} 
                 {/*buttons*/}
                  <div className="pl-lg-4" style={{marginTop: '0.8rem'}}>
                    <Button color="primary" onClick={handleSubmit}>
                      Add FAQ 
                    </Button>
                    <Button style={{marginLeft: '0.8rem'}}
                      color="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/admin/faqs");
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

export default CreateFAQ;
