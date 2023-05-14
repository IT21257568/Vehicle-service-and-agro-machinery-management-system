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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  UncontrolledTooltip,
  Button,
  Chip,
  Col,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

//card
function CardRequiremnts({ gIssues, onClose }) {
  return (
    <div className="card">
      <div className="card-body">
        <p className="card-text">{gIssues}</p>
        <Button size="sm" color="primary" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

const ViewGeneralIssues = () => {
  // states
  const [allGeneralIssues, setAllGeneralIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [showCard, setShowCard] = useState(false);
  const [query, setQuery] = useState("");

  // function handleViewClick() {
  //   console.log("View button clicked");
  //   setShowCard(true);
  // }

  // function handleCloseClick() {
  //   console.log("Close button clicked");
  //   setShowCard(false);
  // }
  // console.log("Rendering App component with showCard = ", showCard);

  // set visible rows
  const [visible, setVisible] = useState(3);

  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all general issues from database
  useEffect(() => {
    const fetchAllGeneralIssues = async () => {
      try {
        const res = await axios.get("/api/generalIssues");
        setAllGeneralIssues(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchAllGeneralIssues();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/generalIssues/${id}`).then((res) => {
      console.log(res.data);
      setAllGeneralIssues((prevData) =>
        prevData.filter((generalissues) => generalissues._id !== id)
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
                    <h3 className="mb-0">All General Issues</h3>
                  </div>
                  <Col xl="1">
                    <InputGroup className="input-group-rounded input-group-merge" style={{width: '25rem'}}>
                      <Input
                        aria-label="Search"
                        className="form-control-rounded form-control-prepended"
                        placeholder="Search by customername/NIC"
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
                      onClick={() => navigate("/admin/create-general-issue")}
                    >
                      <span
                        className="btn-inner--icon"
                        style={{ width: "20px" }}
                      >
                        <i className="ni ni-planet" />
                      </span>
                      <span className="btn-inner--text">Add</span>
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Customer Name</th>
                    <th scope="col">NIC</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Issue Status</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td>Loading...</td>
                    </tr>
                  )}
                  {allGeneralIssues
                    .filter(
                      (generalIssue) =>
                      generalIssue.customer_NIC
                          ?.toString()
                          .includes(query.toString()) ||
                        generalIssue.customer_name
                          ?.toLowerCase()
                          .includes(query.toLowerCase())
                    )
                    .slice(0, visible)
                    .map((generalIssue, index) => (
                      <tr key={generalIssue._id}>
                        <th scope="row">
                          <span className="mb-0 text-sm">
                            {generalIssue.customer_name}
                          </span>
                        </th>
                        <td>{generalIssue.customer_NIC}</td>
                        <td>{generalIssue.contact_number}</td>
                        <td>
                          <Badge color="success">
                            {generalIssue.issue_status}
                          </Badge>
                        </td>
                        <td>
                        {generalIssue.GN_discription}
                          
                        </td>
                        <td>
                          <Button
                            size="sm"
                            color="warning"
                            onClick={() =>
                              navigate(
                                `/admin/update-general-issues/${generalIssue._id}`
                              )
                            }
                          >
                            Update
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => handleDelete(generalIssue._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                 
                </tbody>
              </Table>
              <CardFooter className="py-4">
              {visible < allGeneralIssues.length && (
                    <Button color="primary" size="sm" onClick={showMoreItems}>
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

export default ViewGeneralIssues;