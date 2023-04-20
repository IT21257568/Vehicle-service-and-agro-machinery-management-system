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
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

//card
function CardRequiremnts({ vacancyd, onClose }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Requirements</h5>
        <p className="card-text">{vacancyd}</p>
        <Button size="sm" color="primary" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

const ViewCVSubmissions = () => {
  // states
  const [allApplicants, setAllSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCard, setShowCard] = useState(false);

  function handleViewClick() {
    console.log("View button clicked");
    setShowCard(true);
  }

  function handleCloseClick() {
    console.log("Close button clicked");
    setShowCard(false);
  }
  console.log("Rendering App component with showCard = ", showCard);

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
                    <th scope="col">Name</th>
                    <th scope="col">Applied Vacancy</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Email</th>
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
                  {allApplicants.slice(0, visible).map((applicant, index) => (
                    <tr key={applicant._id}>
                      <th scope="row">
                        <span className="mb-0 text-sm">
                          {applicant.applicant_name}
                        </span>
                      </th>
                      <td>{applicant.vacancy_name}</td>
                      <td>
                        <Badge color="success">{applicant.applicant_age}</Badge>
                      </td>

                      <td>{applicant.applicant_gender}</td>
                      <td>{applicant.applicant_contact}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          {applicant.applicant_email}
                        </div>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          color="primary"
                          onClick={handleViewClick}
                        >
                          View
                        </Button>
                        {showCard && (
                          <CardRequiremnts
                            vacancyd={applicant.applicant_email}
                            onClose={handleCloseClick}
                          />
                        )}
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
