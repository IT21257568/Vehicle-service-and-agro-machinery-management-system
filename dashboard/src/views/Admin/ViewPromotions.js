import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

const ViewPromotions = () => {
  // states
  const [allPromotions, setAllPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // set visible rows
  const [visible, setVisible] = useState(10);

  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all promotions from database
  useEffect(() => {
    const fetchAllPromotions = async () => {
      try {
        const res = await axios.get("/api/promotions");
        setAllPromotions(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchAllPromotions();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/promotions/${id}`).then((res) => {
      console.log(res.data);
      setAllPromotions((prevData) =>
        prevData.filter((promotion) => promotion._id !== id)
      );
    });
  };

  const generateReport = () => {
    const doc = new jsPDF();
    const columns = [
      "Promotion title",
      "Promo Code",
      "Discount",
      "Start date",
      "End date",
    ];
    const rows = allPromotions.map(
      ({
        promo_title,
        promo_code,
        promo_discount,
        promo_startDate,
        promo_endDate,
      }) => [
        promo_title,
        promo_code,
        promo_discount,
        promo_startDate,
        promo_endDate,
      ]
    );

    doc.autoTable({
      head: [columns],
      body: rows,
    });

    doc.save("report.pdf");
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
                    <h3 className="mb-0">All Promotions</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      className="btn-icon btn-3"
                      
                      type="button"
                      style={{marginLeft:'25rem', width: '12rem', color:'#ffa500'}}
                      onClick={() => navigate("/admin/create-promotion")}
                    >
                      <span
                        className="btn-inner--icon"
                        style={{ width: "20px" }}
                      >
                        <i className="ni ni-planet" />
                      </span>
                      <span className="btn-inner--text">Add Promotion</span>
                    </Button>
                  </div>
                  <div className="col text-right">
                    <Button
                      className="btn-icon btn-3"
                      style={{color: 'teal'}}
                      type="button"
                      onClick={generateReport}
                    >
                      <span
                        className="btn-inner--icon"
                        style={{ width: "20px" }}
                      >
                        <i className="ni ni-planet" />
                      </span>
                      <span className="btn-inner--text">Generate Report</span>
                    </Button>
                  </div>
                </Row>
              </CardHeader>

              <Container>
                <Row>
                  {allPromotions.slice(0, visible).map((promotion, index) => (
                    <Card
                      key={promotion._id}
                      style={{
                        width: "22rem",
                        borderRadius: "1.5rem",
                        margin: "0.8rem",
                      }}
                    >
                      <CardImg
                        width="100%"
                        alt="Sample"
                        height="250rem"
                        style={{
                          borderTopLeftRadius: "1.5rem",
                          borderTopRightRadius: "1.5rem",
                        }}
                        src={promotion.promo_picture_url}
                      />
                      <CardBody>
                        <CardTitle tag="h2" style={{ fontSize: "24px" }}>
                          {promotion.promo_title}
                        </CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h3">
                          {promotion.promo_discount}% Off
                        </CardSubtitle>
                        <CardText>{promotion.promo_description}</CardText>
                        <CardSubtitle className="mb-2 text-muted" tag="h4">
                          Offer ends on {promotion.promo_endDate}
                        </CardSubtitle>

                        <Button
                          size="sm"
                          color="warning"
                          onClick={() =>
                            navigate(`/admin/update-promotion/${promotion._id}`)
                          }
                        >
                          Update
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDelete(promotion._id)}
                        >
                          Delete
                        </Button>
                      </CardBody>
                    </Card>
                  ))}

                  {visible < allPromotions.length && (
                    <Button color="secondary" size="sm" onClick={showMoreItems}>
                      Load More
                    </Button>
                  )}
                </Row>
              </Container>

              <CardFooter className="py-4" style={{ marginTop: "1.8rem" }}>
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
                      <PaginationLink href="#pablo" onClick={showMoreItems}>
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

export default ViewPromotions;
