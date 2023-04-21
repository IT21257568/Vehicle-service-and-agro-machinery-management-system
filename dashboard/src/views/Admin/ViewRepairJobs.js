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

const ViewRepairJobs = () => {
  // states
  const [allRepairJobs, setAllRepairJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // set visible rows
  const [visible, setVisible] = useState(10);

  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all repair jobs from database
  useEffect(() => {
    const fetchAllRepairJobs = async () => {
      try {
        const res = await axios.get("/api/damageValuation");
        setAllRepairJobs(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchAllRepairJobs();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/damageValuation/${id}`).then((res) => {
      console.log(res.data);
      setAllRepairJobs((prevData) =>
        prevData.filter((damagevaluation) => damagevaluation._id !== id)
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
                    <h3 className="mb-0">All Repair Jobs</h3>
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
                      onClick={() => navigate("/admin/ceate-repair-job")}
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
                    <th scope="col">NIC</th>
                    <th scope="col">Name</th>
                    <th scope="col">Vehicle Number</th>
                    <th scope="col">Vehicle Type</th>
                    <th scope="col">Email</th>
                    <th scope="col">Estimated Cost</th>
                    <th scope="col">Required Parts</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td>Loading...</td>
                    </tr>
                  )}
                  {allRepairJobs
                    .filter(
                      (repairJob) =>
                        repairJob.customer_id
                          ?.toString()
                          .includes(query.toString()) ||
                        repairJob.customer_email
                          ?.toLowerCase()
                          .includes(query.toLowerCase())
                      // repairJob.customer_id
                      //   ?.toLowerCase()
                      //   .includes(query.toLowerCase())
                    )
                    .slice(0, visible)
                    .map((repairJob, index) => (
                      <tr key={repairJob._id}>
                        <th scope="row">
                          <span className="mb-0 text-sm">
                            {repairJob.customer_id}
                          </span>
                        </th>
                        <td>{repairJob.customer_name}</td>
                        <td>{repairJob.vehicle_Number}</td>
                        <td>
                          <Badge color="success">
                            {repairJob.vehicle_Model}
                          </Badge>
                        </td>
                        <td> {repairJob.customer_email} </td>
                        <td> Rs.{repairJob.estimated_cost} </td>
                        <td> {repairJob.required_parts} </td>
                        <td>
                          <Button size="sm" color="primary">
                            View
                          </Button>
                          <Button
                            size="sm"
                            color="warning"
                            onClick={() =>
                              navigate(
                                `/admin/update-repair-job/${repairJob._id}`
                              )
                            }
                          >
                            Update
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => handleDelete(repairJob._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  {visible < allRepairJobs.length && (
                    <Button color="primary" size="sm" onClick={showMoreItems}>
                      Load More
                    </Button>
                  )}
                </tbody>
              </Table>
              <CardFooter className="py-4">
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
                        onClick={(e) => e.preventDefault()}
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

export default ViewRepairJobs;
