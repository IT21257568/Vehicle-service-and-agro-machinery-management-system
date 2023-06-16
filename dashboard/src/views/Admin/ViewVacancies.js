import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
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

//card
function CardRequiremnts({ vacancyd, onClose }) {
  return (
    <div Container>
      <div>
        <br></br>
        <h5 className="card-title">Requirements</h5>
        <Input
          className="form-control-alternative"
          placeholder="Requirmnets for the vacancy"
          rows="4"
          type="textarea"
          readOnly
          value={vacancyd}
        />
        <br></br>
        <Button size="sm" color="danger" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

const ViewVacancies = () => {
  // states
  const [allVacancies, setAllVacancies] = useState([]);
  const [vacancy_applicants, setVacancyApplicants] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [query, setQuery] = useState("");
  const [expandedVacancyId, setExpandedVacancyId] = useState(null);

const handleViewClick = (vacancyId) => {
  console.log("View button clicked");
  setExpandedVacancyId(vacancyId);
};

  function handleCloseClick() {
    console.log("Close button clicked");
    setShowCard(false);
    setExpandedVacancyId(null);
  }
  console.log("Rendering App component with showCard = ", showCard);

  // set visible rows
  const [visible, setVisible] = useState(3);

  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all vacancies from database
  useEffect(() => {
    const fetchAllVacancies = async () => {
      try {
        const res = await axios.get("/api/vacancies");
        setVacancyApplicants(res.data.vacancy_applicants);
        setAllVacancies(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchAllVacancies();
  }, []);

  const handleDelete = (id, vacancyName) => {
    axios.delete(`/api/vacancies/${id}`).then((res) => {
      console.log(res.data);
      setAllVacancies((prevData) =>
        prevData.filter((vacancy) => vacancy._id !== id)
      );

      toast.success(`"${vacancyName}" Vacancy deleted successfully`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Optional: Auto-close the toast after 3 seconds
      });
    });
  };

  const generateReport = () => {
    const doc = new jsPDF();

    // Add the report title to the PDF
    doc.setFontSize(18);
    doc.text("Vacancies Report", 14, 22);

    // Add the current date to the PDF
    const date = moment().format("MMMM Do YYYY, h:mm:ss a");
    doc.setFontSize(12);
    doc.text(`Report generated on ${date}`, 14, 32);

    const columns = [
      "Vacancy Name",
      "Vacancy Type",
      "Available Count",
      "Applied Count",
      "Created Date&Time",
    ];
    const rows = allVacancies.map(
      ({
        vacancy_title,
        vacancy_type,
        vacancy_count,
        vacancy_applicants,
        createdAt,
      }) => [
        vacancy_title,
        vacancy_type,
        vacancy_count,
        vacancy_applicants,
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

    doc.save("Vacancies.pdf");
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
                    <h3 className="mb-0">All Vacancies</h3>
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
                      onClick={() => navigate("/admin/create-vacancy")}
                    >
                      <span
                        className="btn-inner--icon"
                        style={{ width: "20px" }}
                      >
                        <i className="ni ni-planet" />
                      </span>
                      <span className="btn-inner--text">Add</span>
                    </Button>

                    <Button
                      className="btn-icon btn-3"
                      style={{ color: "#ffa500" }}
                      type="button"
                      onClick={generateReport}
                    >
                      <span
                        className="btn-inner--icon"
                        style={{ width: "20px", color: "#ffa500" }}
                      >
                        <i className="ni ni-folder-17" />
                      </span>
                      <span className="btn-inner--text">Generate Report</span>
                    </Button>
                  </div>

                  {/* <div className="col text-right"></div> */}
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Type</th>
                    <th scope="col">Count</th>
                    <th scope="col">Requiremnts</th>
                    <th scope="col">Applicants</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td>Loading...</td>
                    </tr>
                  )}
                  {allVacancies
                    .filter(
                      (vacancy) =>
                        vacancy.vacancy_title
                          ?.toLowerCase()
                          .includes(query.toLowerCase()) ||
                        vacancy.vacancy_type
                          ?.toLowerCase()
                          .includes(query.toLowerCase())
                    )
                    .slice(0, visible)
                    .map((vacancy, index) => (
                      <tr key={vacancy._id}>
                        <th scope="row">
                          <span className="mb-0 text-sm">
                            {vacancy.vacancy_title}
                          </span>
                        </th>
                        <td>
                          <Badge color="success">{vacancy.vacancy_type}</Badge>
                        </td>
                        <td>{vacancy.vacancy_count}</td>
                        <td>
                          <div className="container">
                            {/* <Button
                              size="sm"
                              color="primary"
                              onClick={() => setShowCard(!showCard)}
                            >
                              {showCard ? "Close" : "View"}
                            </Button>
                            {showCard && (
                              <CardRequiremnts
                                vacancyd={vacancy.vacancy_requirements}
                                onClose={handleCloseClick}
                              />
                            )} */}
                            {expandedVacancyId !== vacancy._id && (
                              <Button
                                size="sm"
                                color="primary"
                                onClick={() => handleViewClick(vacancy._id)}
                              >
                                View
                              </Button>
                            )}
                            {expandedVacancyId === vacancy._id && (
                              <CardRequiremnts
                                vacancyd={vacancy.vacancy_requirements}
                                onClose={handleCloseClick}
                              />
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">
                              {vacancy.vacancy_applicants}/
                              {vacancy.vacancy_count}
                            </span>
                            <div>
                              <Progress
                                max={vacancy.vacancy_count}
                                value={vacancy.vacancy_applicants}
                                barClassName="bg-success"
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <Button
                            size="sm"
                            color="warning"
                            onClick={() =>
                              navigate(`/admin/update-vacancy/${vacancy._id}`)
                            }
                          >
                            Update
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() =>
                              handleDelete(vacancy._id, vacancy.vacancy_title)
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
    </>
  );
};

export default ViewVacancies;
