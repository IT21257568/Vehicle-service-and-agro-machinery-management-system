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
  Collapse,
  Alert,
  UncontrolledCollapse,
  Toast,
  ToastHeader,
  ToastBody
  
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

const ViewFAQs = () => {
  // states
  const [allFAQs, setAllFaqs] = useState([]);
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


  const handleDelete = (id) => {
    axios.delete(`/api/faqs/${id}`).then((res) => {
      console.log(res.data);
      setAllFaqs((prevData) =>
        prevData.filter((faq) => faq._id !== id)
      );
    });
  };

  //faq card collapse 
  const [faqCollapse, setCollapse] = useState(false);
  const [status, setStatus] = useState('View');

  const onEntering = () => setStatus('Viewing...');
  const onEntered = () => setStatus('Close');
  const onExiting = () => setStatus('Closing...');
  const onExited = () => setStatus('View');
  const toggle = (id) => {
      
      
      axios.get(`/api/faqs/${id}`, {
        faq_collapse:faqCollapse
      }).then(() => {
          setCollapse(!faqCollapse);
        });
  }

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
                    <h3 className="mb-0">All FAQs</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      className="btn-icon btn-3"
                      color="success"
                      type="button"
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
                
              {allFAQs.slice(0, visible).map((faq, index) => (
                
                <div>
                <h3>{faq.faq_question}</h3>  
                <Button color="default" size="medium" onClick={() => toggle(faq._id)} style={{ marginBottom: '1rem'}}>
                  {status} Solution
                </Button>
                
                <Collapse
                  key={faq._id}
                  isOpen={faqCollapse}
                  onEntering={onEntering}
                  onEntered={onEntered}
                  onExiting={onExiting}
                  onExited={onExited}
                >
                  <Card>
                    <CardBody>
                      
                      {faq.faq_answer}
                      
                      <Row>
                      <Button style={{marginLeft:'21rem', marginTop:'0.8rem'}}
                        size="sm"
                        color="warning"
                        onClick={() =>
                          navigate(`/admin/update-faq/${faq._id}`)}
                       >
                        Update
                      </Button>
                      <Button style={{marginTop:'0.8rem'}}
                        size="sm"
                        color="danger"
                        onClick={() => handleDelete(faq._id)}
                      >
                        Delete
                      </Button>
                      </Row>
                    </CardBody>
                  </Card>
                </Collapse>
            </div>

            ))}
            
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

export default ViewFAQs;
