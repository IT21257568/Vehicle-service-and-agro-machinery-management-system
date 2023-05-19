import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  //DropdownMenu,
  //DropdownItem,
  //UncontrolledDropdown,
  //DropdownToggle,
  //Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  //Progress,
  //Table,
  Container,
  Row,
  Col,
  Input,
  InputGroup,
  //UncontrolledTooltip,
  Button,
  //Chip,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  //CardGroup,
  CardImg,
  //CardImgOverlay,
  
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

const ViewSpareParts = () => {
  // states
  const [allSpareParts, setAllSpareParts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // set visible rows
  const [visible, setVisible] = useState(3);

  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all spare parts from database
  useEffect(() => {
    const fetchAllSpareParts = async () => {
      try {
        const response = await axios.get("/api/spareParts");
        setAllSpareParts(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchAllSpareParts();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/spareParts/${id}`).then((res) => {
      console.log(res.data);
      setAllSpareParts((prevData) =>
        prevData.filter((sparePart) => sparePart._id !== id)
      );
    });
  };

  const generateReport = () => {
    const doc = new jsPDF();

    // Add the report title to the PDF
    doc.setFontSize(18);
    doc.text("Spare Parts Report", 14, 22);

    // Add the current date to the PDF
    const date = moment().format("MMMM Do YYYY, h:mm:ss a");
    doc.setFontSize(12);
    doc.text(`Report generated on ${date}`, 14, 32);

    const tableColumn = [
      "Product Name",
      "Product Price",
      "Product Discount",
      "Product Description",
      "Product Status",
      "Created Date",
      "Updated Date",
    ];
    const tableRows = allSpareParts.map(
      ({
        sp_name,
        sp_price,
        sp_discount,
        sp_description,
        sp_status,
        createdAt,
        updatedAt,
      }) => [
        sp_name,
        sp_price,
        sp_discount,
        sp_description,
        sp_status,
        formatDateTime(createdAt),
        formatDateTime(updatedAt),
    ]
    );
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: {
        fontSize: 10, // Set font size for table content
        cellPadding: 2, // Set cell padding for table cells
      },
    });

    doc.save("SpareParts.pdf");
  };

  //date format
  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedDate = `${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()}, ${hours % 12}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
    return formattedDate;
  }

  return (
    <>
      <Header/>
      {/* Page content */}
      <Container className="mt--7" fluid style={{marginBottom: '3rem'}}>
        {/* Light Table */}
        <Row>
          <div className="col">
            <Card className="shadow" color="lighter">
              <CardHeader className="border-0" style={{marginBottom: '1.8rem'}}>
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">All Spare Parts</h3>
                  </div>
                  <Col xl = "3">
                    <InputGroup className="input-group-rounded input-group-merge"
                      style={{width: '15rem'}}>
                      <Input
                        aria-label="Search"
                        className="form-control-rounded form-control-prepended"
                        placeholder="Search by Spare Part Name"
                        type="search"
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      {/* <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      <span className="fa fa-search" />
                      </InputGroupText>
                      </InputGroupAddon> */}
                  </InputGroup>
                  </Col>
                  <div className="col text-right">
                    <Button
                      className="btn-icon btn-3"
                      style={{color: '#ffa500'}}
                      type="button"
                      onClick={() => navigate("/admin/create-spare-part")}
                    >
                      <span
                        className="btn-inner--icon"
                        style={{ width: "20px" }}
                      >
                        <i className="ni ni-planet" />
                      </span>
                      <span className="btn-inner--text">Add spare parts</span>
                    </Button>
                    <Button
                      className="btn-icon btn-3"
                      color="success"
                      type="button"
                      onClick={generateReport}
                    >
                      <span
                        className="btn-inner--icon"
                        style={{ width: "20px" }}
                      >
                        <i className="ni ni-folder-17" />
                      </span>
                      <span className="btn-inner--text">Generate Report</span>
                    </Button>
                  </div>
                </Row>
              </CardHeader>

              <Container>
              <div className="pl-lg-5">
                <Row>
                  {allSpareParts
                   .filter((sparePart) =>
                   sparePart.sp_name
                     ?.toLowerCase()
                     .includes(query.toLowerCase())
                   )
                  .slice(0, visible).map((sparePart, index) => (
                  
                  <Card key={sparePart._id}
                    
                    style={{
                      height: '30rem',
                      width: '20rem',
                      borderRadius:'2rem',
                      margin: '0.8rem'
                      
                    }} >
                    <CardImg
                      height= '200rem'
                      width="100%"
                      style={{borderRadius:"2rem"}}
                      alt="Sample"
                      src={sparePart.sp_image}
                    />
                    <CardBody>
                      <CardTitle tag="h2">
                        {sparePart.sp_name}
                      </CardTitle>
                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h4"
                      >
                        <Badge color="success">{sparePart.sp_status}</Badge>
                      </CardSubtitle>
                      <br></br>
                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h3">
                        Rs. {sparePart.sp_price}
                      </CardSubtitle>
                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h3"
                      >
                        {sparePart.sp_discount}% Off
                      </CardSubtitle>
                      <CardText>
                        {sparePart.sp_description}
                      </CardText>
                     
                      <Row>
                      <Button
                          size="sm"
                          color="warning"
                          onClick={() =>
                            navigate(`/admin/update-spare-part/${sparePart._id}`)
                          }
                         
                      >
                          Update
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDelete(sparePart._id)}
                        >
                          Delete
                        </Button>
                      </Row>
                    </CardBody>
                  </Card>
                 
                ))}
               
                </Row>
                </div>
              </Container>
              
              <CardFooter className="col text-right" style={{marginTop: '1.8rem'}}>
              {visible < allSpareParts.length && (
                    <Button  color="info" size="sm" onClick={showMoreItems}>
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

export default ViewSpareParts;
