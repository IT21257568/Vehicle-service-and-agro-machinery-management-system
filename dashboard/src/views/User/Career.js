import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  Col,
  InputGroup,
  Input,
} from "reactstrap";
// core components
import CareerHeader from "components/Headers/CareerHeader.js";



const Career = () => {
  // states
  const [allVacancies, setAllVacancies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

 
  // set visible rows
  const [visible, setVisible] = useState(3);

  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all technicians from database
  useEffect(() => {
    const fetchAllVacancies = async () => {
      try {
        const res = await axios.get("/api/vacancies");
        setAllVacancies(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchAllVacancies();
  }, []);

  

  return (
    <>
      <CareerHeader />
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
                    <h3 className="mb-0">Vecancies</h3>
                  </div>
                  <Col xl="3">
                  fgddfgsf
                  
                  </Col>

                  <div className="col text-right">
                    <InputGroup className="input-group-rounded input-group-merge">
                      <Input
                        aria-label="Search"
                        className="form-control-rounded form-control-prepended"
                        placeholder="Search"
                        type="search"
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </InputGroup>
                  </div>
                  <div className="col text-right"></div>
                </Row>
              </CardHeader>
              <Container>
                <Row>
                  {allVacancies
                    .filter(
                      (vacancy) =>
                        vacancy.vacancy_title
                          ?.toLowerCase()
                          .includes(query.toLowerCase()) ||
                        vacancy.vacancy_type
                          ?.toLowerCase()
                          .includes(query.toLowerCase())
                    )
                    .slice(0, visible)
                    .map((vacancy, index) => (
                      <Card
                        key={vacancy._id}
                        style={{
                          width: "22rem",
                          borderRadius: "0.2rem",
                          margin: "0.8rem",
                        }}
                      >
                        <CardBody>
                          <CardTitle tag="h2">
                            {vacancy.vacancy_title}
                          </CardTitle>
                          <CardText className="mb-1 text-muted" tag="h4">
                            Available Count : {vacancy.vacancy_count}
                          </CardText>
                          <CardText className="mb-1 text-muted" tag="h4">
                            Vacancy Type :{" "}
                            <Badge color="success">
                              {vacancy.vacancy_type}
                            </Badge>
                          </CardText>

                          <Row className="mb-2">
                            <div className="container">
                              <Button
                                size="sm"
                                color="primary"
                                onClick={() =>
                                  navigate(`/user/applynowpage/${vacancy._id}`)
                                }
                              >
                                <span
                                  className="btn-inner--icon"
                                  style={{ width: "20px" }}
                                >
                                  <i className="ni ni-like-2" />
                                </span>
                                <span className="btn-inner--text">
                                  Apply Now
                                </span>
                              </Button>
                            </div>
                          </Row>

                          <Row></Row>
                        </CardBody>
                      </Card>
                    ))}
                </Row>
              </Container>
              <CardFooter
                className="col text-right"
                style={{ marginTop: "1.8rem" }}
              >
                {visible < allVacancies.length && (
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

export default Career;
