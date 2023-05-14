import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// toastify
import { toast } from "react-toastify";
// import toast contaioner
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const ViewEmployees = () => {
  // states
  const [allVacancies, setAllVacancies] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // set visible rows
  const [visible, setVisible] = useState(3);

  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all vacancies from database
  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const res = await axios.get("/api/employees");
        console.log(res.data);
        setEmployees(res.data);
        setIsLoading(false);
        // toast success
      } catch (err) {
        setError(err);
        setIsLoading(false);
        // toast error
        toast.error("Error retrieving data");
      }
    };
    fetchAllEmployees();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/employees/${id}`).then((res) => {
      console.log(res.data);
      setAllVacancies((prevData) =>
        prevData.filter((employee) => employee._id !== id)
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
                    <h3 className="mb-0">All Employee Accounts</h3>
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
                      onClick={() => navigate("/admin/create-employee")}
                    >
                      <span
                        className="btn-inner--icon"
                        style={{ width: "20px" }}
                      >
                        <i className="ni ni-planet" />
                      </span>
                      <span className="btn-inner--text">
                        New Employee Account
                      </span>
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Img</th>
                    <th scope="col">Code</th>
                    <th scope="col">Type</th>
                    <th scope="col">Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Dept</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td>Loading...</td>
                    </tr>
                  )}
                  {employees
                    .filter(
                      (employee) =>
                        employee.phone
                          ?.toLowerCase()
                          .includes(query.toLowerCase()) ||
                        employee.name
                          ?.toLowerCase()
                          .includes(query.toLowerCase())
                    )
                    .slice(0, visible)
                    .map((employee, index) => (
                      <tr key={employee._id}>
                        <th scope="row">
                          <span className="mb-0 text-sm">
                            <img
                              src={employee.profileImg}
                              alt=""
                              width={"100px"}
                            ></img>
                          </span>
                        </th>
                        <th scope="row">
                          <span className="mb-0 text-sm">
                            {employee.empCode}
                          </span>
                        </th>
                        <td>
                          <Badge color="primary">{employee.empType}</Badge>
                        </td>
                        <td>{employee.name}</td>

                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">{employee.username}</span>
                          </div>
                        </td>
                        <td>{employee.email}</td>
                        <td>{employee.phone}</td>
                        <td>
                          {" "}
                          <Badge color="warning">{employee.empDept}</Badge>
                        </td>
                        <td>
                          <Button
                            size="sm"
                            color="warning"
                            onClick={() =>
                              navigate(`/admin/update-employee/${employee._id}`)
                            }
                          >
                            Update
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => handleDelete(employee._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
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
      {/* toastitfy container */}
      <ToastContainer />
    </>
  );
};

export default ViewEmployees;
