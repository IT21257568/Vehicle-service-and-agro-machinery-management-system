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
  //DropdownMenu,
  //DropdownItem,
  //UncontrolledDropdown,
  //DropdownToggle,
  //Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  //UncontrolledTooltip,
  Button,
  //Chip,
  Col,
  InputGroup,
  Input,
} from "reactstrap";

// core components
import Header from "components/Headers/MyOrdersHeader";

const MyOrders = () => {
  // states
  const [sparepart_user_id, setSparePartUserId] = useState("4200");
  const [allSparePartOrders, setAllSparePartOrders] = useState([]);
  const [allAgroProductOrders, setAllAgroProductOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // set visible rows
  const [visibleAgro, setVisibleAgro] = useState(4);
  const [visible, setVisibleSparePart] = useState(4);

  const navigate = useNavigate();

  const showMoreItemsSpareParts = () => {
    setVisibleSparePart((prevValue) => prevValue + 3);
  };

  const showMoreItemsAgro = () => {
    setVisibleAgro((prevValue) => prevValue + 3);
  };

  // retrieve all spare parts orders from database
  useEffect(() => {
    const fetchAllSparePartOrders = async () => {
      try {
        const res = await axios.get("/api/orderSparePart");
        setAllSparePartOrders(res.data);
        setSparePartUserId(res.user_id);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchAllSparePartOrders();
  }, []);

  // retrieve all agro product orders from database
  useEffect(() => {
    const fetchAllAgroProductOrders = async () => {
      try {
        const res = await axios.get("/api/orderAgroProduct");
        setAllAgroProductOrders(res.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchAllAgroProductOrders();
  }, []);

  //Delete ordered spare part
  const handleDeleteSparePart = (id) => {
    axios.delete(`/api/orderSparePart/${id}`).then((res) => {
      console.log(res.data);
      setAllSparePartOrders((prevData) =>
        prevData.filter((orderSparePart) => orderSparePart._id !== id)
      );
    });
  };

  //Delete ordered agro product
  const handleDeleteAgro = (id) => {
    axios.delete(`/api/orderAgroProduct/${id}`).then((res) => {
      console.log(res.data);
      setAllAgroProductOrders((prevData) =>
        prevData.filter((orderAgroProduct) => orderAgroProduct._id !== id)
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
      "December"
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
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="6">
            <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Ordered Spare parts</h3>
                  </div>
                  {/* <Col xl="2"> */}
                    <InputGroup className="input-group-rounded input-group-merge"
                      style={{width: '25rem'}}>
                      <Input
                        aria-label="Search"
                        className="form-control-rounded form-control-prepended"
                        placeholder="Search by product name"
                        type="search"
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </InputGroup>
                  {/* </Col> */}
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Price</th>
                    <th scope="col">Buying Option</th>
                    <th scope="col">Ordered Date</th>
                    <th scope="col">Updated Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td>Loading...</td>
                    </tr>
                  )}
                  {allSparePartOrders
                    .filter((order) =>
                      order.p_name?.toLowerCase().includes(query.toLowerCase())
                    )
                    .slice(0, visible)
                    .map((order, index) => (
                      <tr key={order._id}>
                        <th scope="row">
                          <span className="mb-0 text-sm">{order.p_name}</span>
                        </th>
                        <td><span className="mb-0 text-sm">{order.p_price}</span></td>
                        <td><span className="mb-0 text-sm">{order.customer_buying_option}</span></td>
                        <td>{formatDateTime(order.createdAt)}</td>
                        <td>{formatDateTime(order.updatedAt)}</td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => handleDeleteSparePart(order._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <CardFooter className="col text-right" style={{marginTop: '1.8rem'}}>
                {visible < allSparePartOrders.length && (
                  <Button color="info" size="sm" onClick={showMoreItemsSpareParts}>
                    Load More
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </Row>
            </Col>
            <Col className="order-xl-1" xl="6">
            <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Ordered Agro Products</h3>
                  </div>
                  {/* <Col xl="2"> */}
                    <InputGroup className="input-group-rounded input-group-merge"
                      style={{width: '25rem'}}>
                      <Input
                        aria-label="Search"
                        className="form-control-rounded form-control-prepended"
                        placeholder="Search by product name"
                        type="search"
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </InputGroup>
                  {/* </Col> */}
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product Price</th>
                    <th scope="col">Ordered Date</th>
                    <th scope="col">Updated Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td>Loading...</td>
                    </tr>
                  )}
                  {allAgroProductOrders
                    .filter((order) =>
                      order.p_name?.toLowerCase().includes(query.toLowerCase())
                    )
                    .slice(0, visible)
                    .map((order, index) => (
                      <tr key={order._id}>
                        <th scope="row">
                          <span className="mb-0 text-sm">{order.p_name}</span>
                        </th>
                        <td><span className="mb-0 text-sm">{order.p_price}</span></td>
                        <td>{formatDateTime(order.createdAt)}</td>
                        <td>{formatDateTime(order.updatedAt)}</td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => handleDeleteAgro(order._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <CardFooter className="col text-right" style={{marginTop: '1.8rem'}}>
                {visibleAgro < allAgroProductOrders.length && (
                  <Button color="info" size="sm" onClick={showMoreItemsAgro}>
                    Load More
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </Row>
        </Col>
        </Row>
        </Container>
      </>
    );
  };
  
  export default MyOrders;
  