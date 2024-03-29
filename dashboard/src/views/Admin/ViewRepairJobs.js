import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  InputGroup,
  Input,
  Button,
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
  const [visible, setVisible] = useState(3);

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

  const handleDelete = (id,vehicleNumber) => {
    axios.delete(`/api/damageValuation/${id}`).then((res) => {
      console.log(res.data);
      setAllRepairJobs((prevData) =>
        prevData.filter((damagevaluation) => damagevaluation._id !== id)
      );

      toast.success(`"${vehicleNumber}" RepairJob deleted successfully`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Optional: Auto-close the toast after 3 seconds
      });


    });
  };

  // Calculate the total estimated cost
  const totalEstimatedCost = allRepairJobs.reduce(
    (acc, { estimated_cost }) => acc + estimated_cost,
    0
  );

  // Create a row for the total estimated cost
  const totalRow = ["", "", "", "Total estimated revenue", `Rs. ${totalEstimatedCost}`];

  const generateReport = () => {
    const doc = new jsPDF();

     // Add the report title to the PDF
     doc.setFontSize(18);
     doc.text("Repair Jobs Report", 14, 22);
 
     // Add the current date to the PDF
     const date = moment().format("MMMM Do YYYY, h:mm:ss a");
     doc.setFontSize(12);
     doc.text(`Report generated on ${date}`, 14, 32);

    const columns = [
      "Customer Name",
      "Vehicle Number",
      "Vehicle Model",
      "Required Parts",
      "Estimated Cost",
    ];
    const rows = allRepairJobs
      .map(
        ({
          customer_name,
          vehicle_Number,
          vehicle_Model,
          required_parts,
          estimated_cost,
        }) => [
          customer_name,
          vehicle_Number,
          vehicle_Model,
          required_parts,
          `Rs. ${estimated_cost}`,
        ]
      )
      .concat([totalRow]); // Add the total row to the end of the rows array

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 40,
      styles: {
        fontSize: 10, // Set font size for table content
        cellPadding: 3, // Set cell padding for table cells
      },
    });

    doc.save("Damage Valuation Report.pdf");
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
                  <div className="col text-right">
                    <Button
                      className="btn-icon btn-3"
                      color="success"
                      // style={{ color: "teal" }}
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
                          <Button
                            size="sm"
                            color="primary"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(
                                `/admin/view-repair-job-images/${repairJob._id}`
                              );
                            }}
                          >
                            View image
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
                            onClick={() => handleDelete(repairJob._id,repairJob.vehicle_Number)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  
                </tbody>
              </Table>
              <CardFooter className="py-4">
              {visible < allRepairJobs.length && (
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

export default ViewRepairJobs;
