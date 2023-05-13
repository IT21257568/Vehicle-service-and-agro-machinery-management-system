import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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

const UpdateFAQ = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // get FAQ id from url
  const { id } = useParams();

  const navigate = useNavigate();

  // form states
  const [data, setData] = useState([]);
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqCategory, setFaqCategory] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [vidLink,setVidLink] = useState("");
  
  
  useEffect(() => {
    const getFAQ = async () => {
      const res = await axios.get(`/api/faqs/${id}`);
      console.log(res.data);
      setData(res.data);

      setFaqQuestion(res.data.faq_question);
      setFaqCategory(res.data.faq_category);
      setFaqAnswer(res.data.faq_answer);
      setVidLink(res.data.vid_link)
    };
    getFAQ();
  }, [id]);

  const handleUpdate = async (e) => {
    console.log("FAQ updated");
    axios
      .patch(`/api/faqs/${id}`, {
        faq_question: faqQuestion,
        faq_category: faqCategory,
        faq_answer: faqAnswer,
        vid_link: vidLink
      })
      .then((res) => {
        console.log(res.data);
        navigate("/admin/faqs");
      });

  }

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
                    <h3 className="mb-0">Update FAQ</h3>
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
                            placeholder="Title"
                            defaultValue={data.faq_question}
                            type="textarea"
                            required="true"
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
                        placeholder="A brief description about the vacancy"
                        rows="4"
                        defaultValue={data.faq_answer}
                        required="true"
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
                        defaultValue={data.vid_link}
                        required="true"
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
                            required="true"
                            defaultValue={data.faq_category}
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
                    
                 {/*buttons*/}
                  <div className="pl-lg-4" style={{marginTop: '0.8rem'}}>
                    <Button color="primary" onClick={handleUpdate}>
                      Save changes
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

export default UpdateFAQ;
