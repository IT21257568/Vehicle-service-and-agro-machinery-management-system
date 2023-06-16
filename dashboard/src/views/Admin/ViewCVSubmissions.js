import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";

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
import Header from "components/Headers/Header.js";

const ViewCVSubmissions = () => {
  // states
  const [allApplicants, setAllSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  // const [vacancy_applicants, setVacancyApplicants] = useState("");

  // set visible rows
  const [visible, setVisible] = useState(3);

  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all cv submissions from database
  useEffect(() => {
    const fetchAllCVSubmissions = async () => {
      try {
        const res = await axios.get("/api/cvSub");
        setAllSubmissions(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchAllCVSubmissions();
  }, []);

  const handleDelete = (id, vId) => {
    axios.delete(`/api/cvSub/${id}`).then((res) => {
      console.log(res.data);
      setAllSubmissions((prevData) =>
        prevData.filter((vacancy) => vacancy._id !== id)
      );
    });

    const updateRecord = async () => {
      const response = await axios.get(`/api/vacancies/${vId}`);
      console.log(response.data);

      // update vacancy applicants count
      axios
        .patch(`/api/vacancies/${vId}`, {
          vacancy_applicants: response.data.vacancy_applicants - 1,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    updateRecord();
  };

  const generateReport = () => {
    const doc = new jsPDF();

    // Add the report title to the PDF
    doc.setFontSize(18);
    doc.text("Applicants Report", 14, 22);

    // Add the current date to the PDF
    const date = moment().format("MMMM Do YYYY, h:mm:ss a");
    doc.setFontSize(12);
    doc.text(`Report generated on ${date}`, 14, 32);

    const columns = [
      "Applicant Name",
      "Applied Vacancy",
      "Age",
      "Gender",
      "Contact Number",
      "Email",
      "Submitted Date&Time",
    ];
    const rows = allApplicants.map(
      ({
        applicant_name,
        vacancy_name,
        applicant_age,
        applicant_gender,
        applicant_contact,
        applicant_email,
        createdAt,
      }) => [
        applicant_name,
        vacancy_name,
        applicant_age,
        applicant_gender,
        applicant_contact,
        applicant_email,
        new Date(createdAt).toLocaleString("en-US", {
          dateStyle: "short",
          timeStyle: "short",
        }),
        ,
      ]
    );
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 40,
      styles: {
        fontSize: 10, // Set font size for table content
        cellPadding: 3, // Set cell padding for table cells
      },
    });

    doc.save("Applicants.pdf");
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
                    <h3 className="mb-0">All Applicants</h3>
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
                    <th scope="col">Name</th>
                    <th scope="col">Applied Vacancy</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Email</th>
                    <th scope="col">Submitted At</th>
                    <th scope="col">CV</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td>Loading...</td>
                    </tr>
                  )}
                  {allApplicants
                    .filter((applicant) =>
                      applicant.vacancy_name
                        ?.toLowerCase()
                        .includes(query.toLowerCase())
                    )
                    .slice(0, visible)
                    .map((applicant, index) => (
                      <tr key={applicant._id}>
                        <th scope="row">
                          <span className="mb-0 text-sm">
                            {applicant.applicant_name}
                          </span>
                        </th>
                        <td>
                          <Badge color="success">
                            {applicant.vacancy_name}
                          </Badge>
                        </td>
                        <td>{applicant.applicant_age}</td>

                        <td>{applicant.applicant_gender}</td>
                        <td>{applicant.applicant_contact}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            {applicant.applicant_email}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {new Date(applicant.createdAt).toLocaleString(
                              "en-US",
                              { dateStyle: "short", timeStyle: "short" }
                            )}
                          </div>
                        </td>
                        <td>
                          <a
                            href={applicant.applicant_CVFile_url}
                            style={{ textDecoration: "none" }}
                          >
                            <Button size="sm" color="primary">
                              View
                            </Button>
                          </a>
                        </td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() =>
                              handleDelete(applicant._id, applicant.vacancy_id)
                            }
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                {visible < allApplicants.length && (
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

export default ViewCVSubmissions;
