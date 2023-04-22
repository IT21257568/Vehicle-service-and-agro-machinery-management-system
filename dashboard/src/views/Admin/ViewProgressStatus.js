import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  CardText,
  CardGroup,
  CardImg,
  CardImgOverlay,
  
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

const ViewProgressStatus = () => {
  // states
  const [allProgresses, setAllProgresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // set visible rows
  const [visible, setVisible] = useState(10);

  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all vacancies from database
  useEffect(() => {
    const fetchAllProgresses = async () => {
      try {
        const res = await axios.get("/api/progress");
        setAllProgresses(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchAllProgresses();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/progress/${id}`).then((res) => {
      console.log(res.data);
      setAllProgresses((prevData) =>
        prevData.filter((progress) => progress._id !== id)
      );
    });
  };

  return (
    <>
      <Header/>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Light Table */}
        <Row>
          <div className="col">
            <Card className="shadow" color="lighter">
              <CardHeader className="border-0" style={{marginBottom: '1.8rem'}}>
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">All Progress Status</h3>


                    {/* <InputGroup className="input-group-rounded input-group-merge">
                      <Input
                        aria-label="Search"
                        className="form-control-rounded form-control-prepended"
                        placeholder="Search"
                        type="search"
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <span className="fa fa-search" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup> */}

                    
                  </div>
                  <div className="col text-right">
                    <Button
                      className="btn-icon btn-3"
                      color="success"
                      type="button"
                      onClick={() => navigate("/admin/create-progress")}
                    >
                      <span
                        className="btn-inner--icon"
                        style={{ width: "20px" }}
                      >
                        <i className="ni ni-planet" />
                      </span>
                      <span className="btn-inner--text">Add New Status</span>
                    </Button>
                  </div>
                </Row>
              </CardHeader>

              <Container>
                <Row>
                  {allProgresses.slice(0, visible).map((progress, index) => (
                  
                  <Card key={progress._id}
                    
                    style={{
                      width: '22rem',
                      borderRadius:'0.2rem',
                      margin: '0.8rem'
                      
                    }}
                    
                  >
                    <CardImg
                      width="100%"
                      alt="Sample"
                      height="250rem"
                      src={progress.progress_picture_url}
                    />
                    <CardBody>
                      <CardTitle tag="h2">
                        Customer Name: {progress.name}
                      </CardTitle>

                      <CardText>
                        Vehi Number: {progress.vehi_number}
                      </CardText>

                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h3"
                      >
                        Status: {progress.status}
                      </CardSubtitle>

                      <CardText>
                        {progress.description}
                      </CardText>

                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h4"
                      >
                        Date: {progress.date}
                      </CardSubtitle>


                      <Row>
                      <Button
                          size="sm"
                          color="warning"
                          onClick={() =>
                            navigate(`/admin/update-progress/${progress._id}`)
                          }
                         
                      >
                          Update
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDelete(progress._id)}
                        >
                          Delete
                        </Button>
                      </Row>
                    </CardBody>
                  </Card>
                 
                ))}

                {visible < allProgresses.length && (
                    <Button color="secondary" size="sm" onClick={showMoreItems}>
                      Load More
                    </Button>
                )}
                </Row>
              </Container>
              
               
             
                
              
              <CardFooter className="py-4" style={{marginTop: '1.8rem'}}>
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={showMoreItems}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ViewProgressStatus;
