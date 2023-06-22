import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Accordion } from "react-bootstrap-accordion";
import "react-bootstrap-accordion/dist/index.css";
import NavbarWh from "components/Navbars/NavbarWh.js";
// reactstrap components
import {
  //Badge,
  Card,
  CardHeader,
  CardFooter,
  //DropdownMenu,
  //DropdownItem,
  //UncontrolledDropdown,
  //DropdownToggle,
  //Media,
  //Pagination,
  //PaginationItem,
  //PaginationLink,
  //Progress,
  //Table,
  Container,
  Row,
  //UncontrolledTooltip,
  Button,
  //Chip,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Badge,
  //CardGroup,
  CardImg,
  //CardImgOverlay,
  NavLink,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
} from "reactstrap";

// core components
import FAQHeader from "components/Headers/FAQHeader.js";

//card
function CardRatings({ ratings, onClose }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Ratings</h5>
        <p className="card-text">{ratings}</p>
        <Button size="sm" color="primary" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

const FAQs = () => {
  // states
  const [allFAQs, setAllFAQs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [query, setQuery] = useState("");
  const [querySort, setQuerySort] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  //accordion
  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  function handleViewClick() {
    console.log("View button clicked");
    setShowCard(true);
  }

  function handleCloseClick() {
    console.log("Close button clicked");
    setShowCard(false);
  }
  console.log("Rendering App component with showCard = ", showCard);

  function handleViewClick() {
    console.log("View button clicked");
    setShowCard(true);
  }

  function handleCloseClick() {
    console.log("Close button clicked");
    setShowCard(false);
  }
  console.log("Rendering App component with showCard = ", showCard);

  // set visible rows
  const [visible, setVisible] = useState(10);

  const navigate = useNavigate();

  const toggleSort = () => setDropdownOpen((prevState) => !prevState);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all FAQs from database
  useEffect(() => {
    const fetchAllFAQs = async () => {
      try {
        const res = await axios.get("/api/faqs");
        setAllFAQs(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchAllFAQs();
  }, []);

  return (
    <>
      <FAQHeader />
      
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
                    <h3 className="mb-0">FAQ section</h3>
                    <InputGroup
                      className="input-group-rounded input-group-merge"
                      style={{ marginTop: "0.8rem", width: "28rem" }}
                    >
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
                  <Col xl="3" style={{ marginLeft: "30rem" }}>
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
                      style={{ width: "10rem" }}
                    >
                      <DropdownToggle style={{ color: "#ffa500" }} caret>
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
                  </Col>
                  <div className="col text-right"></div>
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
                    </Accordion>
                  ))}
              </Container>
              <CardFooter
                className="col text-right"
                style={{ marginTop: "1.8rem" }}
              >
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

export default FAQs;
