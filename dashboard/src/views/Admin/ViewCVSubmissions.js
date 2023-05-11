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
import Header from "components/Headers/Header.js";



const ViewCVSubmissions = () => {
  // states
  const [allApplicants, setAllSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  

  

 

  // set visible rows
  const [visible, setVisible] = useState(10);

  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all vacancies from database
  useEffect(() => {
    const fetchAllVacancies = async () => {
      try {
        const res = await axios.get("/api/cvSub");
        setAllSubmissions(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchAllVacancies();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/cvSub/${id}`).then((res) => {
      console.log(res.data);
      setAllSubmissions((prevData) =>
        prevData.filter((vacancy) => vacancy._id !== id)
      );
    });
  };


  const generateReport = () => {
    
        const doc = new jsPDF();
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
        });

        doc.save("Applicants.pdf");
      
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
                            onClick={() => handleDelete(applicant._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  {visible < allApplicants.length && (
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

export default ViewCVSubmissions;
