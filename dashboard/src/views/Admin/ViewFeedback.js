import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import { toast } from "react-toastify";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  /* DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media, */
  Pagination,
  PaginationItem,
  PaginationLink,
  //Progress,
  Table,
  Container,
  InputGroup,
  //InputGroupAddon,
  //InputGroupText,
  Input,
  Row,
 // UncontrolledTooltip,
  Button,
  //Chip,
  Col,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

const ViewFeedbacks = () => {
  // states
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  // set visible rows
  const [visible, setVisible] = useState(10);

  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all vacancies from database
  useEffect(() => {
    const fetchAllFeedbacks = async () => {
      try {
        const res = await axios.get("/api/feedback");
        setAllFeedbacks(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchAllFeedbacks();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/feedback/${id}`).then((res) => {
      console.log(res.data);
      toast.success("Feedback deleted successfully")
      setAllFeedbacks((prevData) =>
        prevData.filter((feedback) => feedback._id !== id)
      );
    });
  };


  const generateReport = () => {

    const doc = new jsPDF();

     // Add the report title to the PDF
     doc.setFontSize(18);
     doc.text("Feedback Report", 14, 22);
 
     // Add the current date to the PDF
     const date = moment().format("MMMM Do YYYY, h:mm:ss a");
     doc.setFontSize(12);
     doc.text(`Report generated on ${date}`, 14, 32);

    const columns = [
      "Client Feedback",
      "Service rating",
      "Service date",    
      "Created Date&Time",
    ];
    const rows = allFeedbacks.map(
      ({
        feedback,
        rating,
        fd_date,
        createdAt,
     
      }) => [
        feedback,
        rating,
        fd_date,
        new Date(createdAt).toLocaleString("en-US", {
          dateStyle: "short",
          timeStyle: "short",
        }),    
      ]
    );

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 40,
      styles: {
        fontSize: 12, // Set font size for table content
        cellPadding: 3, // Set cell padding for table cells
      },
    });

    doc.save("Feedback_report.pdf");
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
                    <h3 className="mb-0">All Feedbacks</h3>
                    </div>
                    <Col xl="3">
                    <InputGroup className="input-group-rounded input-group-merge">
                      <Input
                        aria-label="Search"
                        className="form-control-rounded form-control-prepended"
                        placeholder="Search by date"
                        type="search"
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </InputGroup>
                    </Col>
                  <div className="col text-right">
                    <Button
                      className="btn-icon btn-3"
                      style={{color: '#ffa500'}}
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
                    <th scope="col">Client Feedback</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Service Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td>Loading...</td>
                    </tr>
                  )}
                  {allFeedbacks
                    .filter((feedback) =>
                      feedback.fd_date 
                      ?.toLowerCase()
                      .includes(query.toLowerCase())      
                    )
                    .slice(0, visible)
                    .map((feedback, index) => (
                      <tr key={feedback._id}>
                        <th scope="row">
                          <span className="mb-0 text-sm">
                            {feedback.feedback}
                          </span>
                        </th>
                        <td>
                          <Badge color="success">{feedback.rating} / 5</Badge>
                        </td>
                        <td>
                        {feedback.fd_date}
                        </td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => handleDelete(feedback._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}

                  {visible < allFeedbacks.length && (
                    <Button color="primary" size="sm" onClick={showMoreItems}>
                      Load More
                    </Button>
                  )}
                </tbody>
              </Table>
              <CardFooter className="py-4">
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ViewFeedbacks;
