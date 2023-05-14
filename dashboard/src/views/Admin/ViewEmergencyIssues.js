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

const ViewEmergencyIssues = () => {
  // states
  const [allEmergencyIssues, setAllEmergencyIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // set visible rows
  const [visible, setVisible] = useState(10);

  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all emergency issues from database
  useEffect(() => {
    const fetchAllEmergencyIssues = async () => {
      try {
        const res = await axios.get("/api/emergencyIssues");
        setAllEmergencyIssues(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchAllEmergencyIssues();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/emergencyIssues/${id}`).then((res) => {
      console.log(res.data);
      setAllEmergencyIssues((prevData) =>
        prevData.filter((emergencyissues) => emergencyissues._id !== id)
      );
    });
  };

  const generateReport = () => {
    
    const doc = new jsPDF();
    const columns = [
      "Customer Name",
      "NIC",
      "Contact Number",
      "Maintenance Fee",
      "Towing Fee",
      "Total Fee",
    ];
    const rows = allEmergencyIssues.map(
      ({
        customer_name,
        customer_NIC,
        contact_number,
        maintenance_fee,
        towing_fee,
        total_fee,
      }) => [
        customer_name,
        customer_NIC,
        contact_number,
        `Rs. ${maintenance_fee}`,
        `Rs. ${towing_fee}`,
        `Rs. ${total_fee}`,
      ]
    );
    doc.autoTable({
      head: [columns],
      body: rows,
    });

    doc.save("EmergencyIssue.pdf");
  
}

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
                    <h3 className="mb-0">All Emergency Issues</h3>
                  </div>
                  <Col xl="1">
                    <InputGroup className="input-group-rounded input-group-merge" style={{width: '25rem'}}>
                      <Input
                        aria-label="Search"
                        className="form-control-rounded form-control-prepended"
                        placeholder="Search by customername / NIC"
                        type="search"
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  <Col lg="7">
                  <div className="col text-right">
                    <Button
                      className="btn-icon btn-3"
                      color="success"
                      type="button"
                      onClick={() => navigate("/admin/create-emergency-issue")}
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
                  </Col>
                  <div className="col text-right">
                   
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
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Customer Name</th>
                    <th scope="col">NIC</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Current Location</th>
                    <th scope="col">Assigned Employee</th>
                    <th scope="col">Maintenance Fee</th>
                    <th scope="col">Towing Fee</th>
                    <th scope="col">Total Fee</th>
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
                  {allEmergencyIssues
                    .filter(
                      (emergencyIssue) =>
                      emergencyIssue.customer_NIC
                          ?.toString()
                          .includes(query.toString()) ||
                        emergencyIssue.customer_name
                          ?.toLowerCase()
                          .includes(query.toLowerCase())
                    )
                    .slice(0, visible)
                    .map((emergencyIssue, index) => (
                      <tr key={emergencyIssue._id}>
                        <th scope="row">
                          <span className="mb-0 text-sm">
                            {emergencyIssue.customer_name}
                          </span>
                        </th>
                        <td>{emergencyIssue.customer_NIC}</td>
                        <td>{emergencyIssue.contact_number}</td>
                        <td>{emergencyIssue.c_location}</td>
                        <td>{emergencyIssue.available_emp}</td>
                        <td>Rs.{emergencyIssue.maintenance_fee}</td>
                        <td>Rs.{emergencyIssue.towing_fee}</td>
                        <td>Rs.{emergencyIssue.total_fee}</td>
                        <td>
                          <Badge color="success">
                            {emergencyIssue.issue_status}
                          </Badge>
                        </td>
                        <td>
                        {emergencyIssue.EM_discription}

                       </td> 
                       <td>
                          <Button
                            size="sm"
                            color="warning"
                            onClick={() =>
                              navigate(
                                `/admin/update-emergency-issue/${emergencyIssue._id}`
                              )
                            }
                          >
                            Update
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => handleDelete(emergencyIssue._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}

                    </tbody>
                    </Table>
                    <CardFooter className="py-4">
                  {visible < allEmergencyIssues.length && (
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

export default ViewEmergencyIssues;
