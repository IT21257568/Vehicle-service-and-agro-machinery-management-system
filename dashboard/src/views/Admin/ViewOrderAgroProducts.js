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
import Header from "components/Headers/Header.js";

const ViewOrderAgroProduct = () => {
  // states
  const [allAgroProductOrders, setAllAgroProductOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // set visible rows
  const [visible, setVisible] = useState(5);

  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

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

  const handleDelete = (id) => {
    axios.delete(`/api/orderAgroProduct/${id}`).then((res) => {
      console.log(res.data);
      setAllAgroProductOrders((prevData) =>
        prevData.filter((orderAgroProduct) => orderAgroProduct._id !== id)
      );
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
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">All Agro Product Orders</h3>
                  </div>
                  <Col xl="3">
                    <InputGroup className="input-group-rounded input-group-merge">
                      <Input
                        aria-label="Search"
                        className="form-control-rounded form-control-prepended"
                        placeholder="Search"
                        type="search"
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  <div className="col text-right">
                    <Button
                      className="btn-icon btn-3"
                      color="success"
                      type="button"
                      //onClick={() => navigate("/admin/create-vacancy")}
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
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Customer Contact</th>
                    <th scope="col">Customer Email</th>
                    <th scope="col">Customer Address</th>
                    <th scope="col">Special Note</th>
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
                        <td>{order.customer_name}</td>
                        <td>{order.customer_contact}</td>
                        <td>{order.customer_email}</td>
                        <td>{order.customer_address}</td>
                        <td>{order.customer_note}</td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => handleDelete(order._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                {visible < allAgroProductOrders.length && (
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

export default ViewOrderAgroProduct;