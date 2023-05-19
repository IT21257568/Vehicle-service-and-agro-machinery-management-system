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
  Col,
  Card,
  CardHeader,
  CardFooter,
  Container,
  Input,
  InputGroup,
  Row,
  Button,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImg, 
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

const ViewAgroProducts = () => {
  // states
  const [allAgroProducts, setAllAgroProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // set visible rows
  const [visible, setVisible] = useState(3);

  // show more Agro Products
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all Agro Product from database
  useEffect(() => {
    const fetchAllAgroProducts = async () => {
      try {
        const response = await axios.get("/api/agroProducts");
        setAllAgroProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchAllAgroProducts();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/agroProducts/${id}`).then((res) => {
      console.log(res.data);
      setAllAgroProducts((prevData) =>
        prevData.filter((agroProduct) => agroProduct._id !== id)
      );
    });
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


  const generateReport = () => {
    const doc = new jsPDF();

    // Add the report title to the PDF
    doc.setFontSize(18);
    doc.text("Agro Products Report", 14, 22);

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
    const tableRows = allAgroProducts.map(
      ({
        p_name,
        p_price,
        p_discount,
        p_description,
        p_status,
        createdAt,
        updatedAt,
      }) => [
        p_name,
        p_price,
        p_discount,
        p_description,
        p_status,
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

    doc.save("agroProducts.pdf");
  };

  return (
    <>
      <Header/>
      {/* Page content */}
      <Container className="mt--7" fluid style={{marginBottom: '3rem'}}>
        {/* Light Table */}
        <Row>
          <div className="col">
            <Card className="shadow" color="lighter" style={{marginBottom: '1.8rem'}}>
              <CardHeader className="border-0" style={{marginBottom: '1.8rem'}}>
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">All Agro Product</h3>
                  </div>
                  <Col xl = "3">
                    <InputGroup className="input-group-rounded input-group-merge"
                      style={{width: '15rem'}}>
                      <Input
                        aria-label="Search"
                        className="form-control-rounded form-control-prepended"
                        placeholder="Search by Agro Product Name"
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
                      onClick={() => navigate("/admin/create-agro-product")}
                    >
                      <span
                        className="btn-inner--icon"
                        style={{ width: "20px" }}
                      >
                        <i className="ni ni-planet" />
                      </span>
                      <span className="btn-inner--text">Add Agro Products</span>
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
                  {allAgroProducts
                    .filter((agroProduct) =>
                    agroProduct.p_name
                      ?.toLowerCase()
                      .includes(query.toLowerCase())
                    )
                  .slice(0, visible).map((agroProduct, index) => (
                  
                  <Card key={agroProduct._id}
                    
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
                      src={agroProduct.p_image}
                    />
                    <CardBody>
                      <CardTitle tag="h2">
                        {agroProduct.p_name}
                      </CardTitle>
                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h4"
                      >
                        <Badge color="success">{agroProduct.p_status}</Badge>
                      </CardSubtitle>
                      <br></br>
                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h3">
                        Rs. {agroProduct.p_price}
                      </CardSubtitle>
                      <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h3"
                      >
                        {agroProduct.p_discount}% Off
                      </CardSubtitle>
                      <CardText>
                        {agroProduct.p_description}
                      </CardText>
                     
                      <Row>
                      <Button
                          size="sm"
                          color="warning"
                          onClick={() =>
                            navigate(`/admin/update-agro-product/${agroProduct._id}`)
                          }
                         
                      >
                          Update
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDelete(agroProduct._id)}
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
              {visible < allAgroProducts.length && (
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

export default ViewAgroProducts;