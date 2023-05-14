import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Button,
  Chip,
  CardBody,
  CardTitle,
  CardSubtitle,
  FormGroup,
  Label,
  CardText,
  CardGroup,
  CardImg,
  CardImgOverlay,
  Collapse,
  Alert,
  UncontrolledCollapse,
  Toast,
  ToastHeader,
  ToastBody,
  ButtonToggle,
  CardLink,
  NavLink,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Dropdown,
} from "reactstrap";

import { Accordion } from "react-bootstrap-accordion";
import "react-bootstrap-accordion/dist/index.css";
// core components
import Header from "components/Headers/Header.js";
import Footer from "components/Footers/AdminFooter";

const ViewFAQs = () => {
  // states
  const [allFAQs, setAllFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  // set visible rows
  const [visible, setVisible] = useState(10);
  const [querySort, setQuerySort] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all FAQS from database
  useEffect(() => {
    const fetchAllFaqs = async () => {
      try {
        const res = await axios.get("/api/faqs");

        setAllFaqs(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchAllFaqs();
  }, []);

  //accordion
  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const toggleSort = () => setDropdownOpen((prevState) => !prevState);

  const handleDelete = (id) => {
    axios.delete(`/api/faqs/${id}`).then((res) => {
      console.log(res.data);
      setAllFaqs((prevData) => prevData.filter((faq) => faq._id !== id));
    });
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Light Table */}
        <Row>
          <div className="col">
            <Card className="shadow" color="lighter">
              <CardHeader
                className="border-0"
                style={{ marginBottom: "1.8rem" }}
              >
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">All FAQs</h3>
                    <InputGroup className="input-group-rounded input-group-merge"
                      style={{width: '28rem', marginTop: "0.8rem"}}>
                      <Input
                        aria-label="Search"
                        className="form-control-rounded form-control-prepended"
                        placeholder="Search"
                        type="search"
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText style={{ color: "#ffa500" }}>
                          <span className="fa fa-search" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                  <Col xl="3" style={{ marginLeft: "40rem",  marginTop: "-5.5rem"}}>
                    <label
                      className="form-control-label mr-2"
                      htmlFor="input-email"
                    >
                      Sort By:
                    </label>
                    <Dropdown
                      isOpen={dropdownOpen}
                      color="primary"
                      toggle={toggleSort}
                      style={{width: '10rem'}}
                    >
                      <DropdownToggle caret style={{ color: "#ffa500" }}>
                        {querySort ? querySort : "Select Category"}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          value="User profile related"
                          onClick={(e) => {
                            setQuerySort(e.target.value);
                          }}
                        >
                          User profile related
                        </DropdownItem>
                        <DropdownItem
                          value="Bookings related"
                          onClick={(e) => {
                            setQuerySort(e.target.value);
                          }}
                        >
                          Bookings related
                        </DropdownItem>
                        <DropdownItem
                          value="Online shop related"
                          onClick={(e) => {
                            setQuerySort(e.target.value);
                          }}
                        >
                          Online shop related
                        </DropdownItem>
                        <DropdownItem
                          value="Agro products related"
                          onClick={(e) => {
                            setQuerySort(e.target.value);
                          }}
                        >
                          Agro products related
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                     {/* <FormGroup tag="fieldset">
                        <FormGroup check>
                          <Label check>
                            <Input   
                            
                            onClick={(e) => {
                            setQuerySort(e.target.value);
                          }}
                          value="User profile related"
                          type="radio" name="radio1" /> User profile related
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" 
                            value="Bookings related"
                            onClick={(e) => {
                              setQuerySort(e.target.value);
                            }}
                            /> Bookings related                         
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" 
                            value="Online shop related"
                            onClick={(e) => {
                              setQuerySort(e.target.value);
                            }}
                            /> Online shop related
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" 
                            value="Online shop related"
                            onClick={(e) => {
                              setQuerySort(e.target.value);
                            }}
                            /> Online shop related
                          </Label>
                        </FormGroup>
                      </FormGroup> */}
                  </Col>
                  <div className="col text-right">
                    <Button
                      className="btn-icon btn-3"
                      type="button"
                      style={{marginTop: "-5.5rem",marginRight: '1rem',color: 'teal'}}
                      onClick={() => navigate("/admin/create-faq")}
                    >
                      <span
                        className="btn-inner--icon"
                        style={{ width: "20px" }}
                      >
                        <i className="ni ni-planet" />
                      </span>
                      <span className="btn-inner--text">Add FAQ</span>
                    </Button>
                  </div>
                </Row>
              </CardHeader>

              <Container>
                {allFAQs
                  .filter((faq) =>
                  faq.faq_category
                    ?.toLowerCase()
                    .includes(querySort.toLowerCase())
                )
                  .filter((faq) =>
                    faq.faq_question
                      ?.toLowerCase()
                      .includes(query.toLowerCase())
                  )
                  .slice(0, visible)
                  .map((faq, index) => (
                    <Accordion
                      title={faq.faq_question}
                      open={open}
                      toggle={toggle}
                    >
                      {faq.faq_answer}

                      <Row>
                        <NavLink
                          href={faq.vid_link}
                          style={{ color: "teal", marginLeft: "0.2rem" }}
                        >
                          Watch Tutorial here
                        </NavLink>
                      </Row>
                      <Row style={{ marginTop: "1rem" }}>
                        <Button
                          style={{ marginLeft: "0.8rem", marginRight: "1rem" }}
                          size="sm"
                          color="warning"
                          onClick={() =>
                            navigate(`/admin/update-faq/${faq._id}`)
                          }
                        >
                          Update FAQ
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDelete(faq._id)}
                        >
                          Delete FAQ
                        </Button>
                      </Row>
                    </Accordion>
                  ))}
              </Container>

              <CardFooter className="py-4" style={{ marginTop: "1.8rem" }}>
                {visible < allFAQs.length && (
                  <Button color="info" size="sm" onClick={showMoreItems}>
                    Load More
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ViewFAQs;
