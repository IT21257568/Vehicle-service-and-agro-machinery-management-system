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
  InputGroupAddon,
  InputGroupText,
  //Chip,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

const ViewBookings = () => {
  // states
  const [allBookings, setAllBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [querySortLocation, setQuerySortLocation] = useState("");
  const [querySortType, setQuerySortType] = useState("");
  // const [bookings, setBookings] = useState([]);
  // const [technicianName, setTechnicianName] = useState("");
  // const [technicianId, setTechnicianId] = useState("");
  // const [allTechnicians, setAllTechnicians] = useState([]);
  // const [data, setData] = useState([]);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  // set visible rows
  const [visible, setVisible] = useState(10);

  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  const toggleSortLocation = () =>
    setLocationDropdownOpen((prevState) => !prevState);
  const toggleSortType = () => setTypeDropdownOpen((prevState) => !prevState);

  // retrieve all vacancies from database
  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const res = await axios.get("/api/bookings");
        setAllBookings(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchAllBookings();
  }, []);

  const handleDelete = (id, tId) => {
    axios.delete(`/api/bookings/${id}`).then((res) => {
      console.log(res.data);
      setAllBookings((prevData) =>
        prevData.filter((booking) => booking._id !== id)
      );
    });
    const updateRecord = async () => {
      const response = await axios.get(`/api/mTeams/${tId}`);
      console.log(response.data);

      // update vacancy applicants count
      axios
        .patch(`/api/mTeams/${tId}`, {
          assigned_jobs: response.data.assigned_jobs - 1,
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

  //remove assigned technician
  const removeAssign = async (id, tId) => {
    try {
      console.log("Ready to update");
      await axios.patch(`/api/bookings/${id}`, {
        technician_id: null,
        technician_name: null,
      });
      setAllBookings((bookings) =>
        bookings.map((booking) => {
          if (booking._id === id) {
            return {
              ...booking,
              technician_name: null,
            };
          }
          return booking;
        })
      );

      const updateRecord = async () => {
        const response = await axios.get(`/api/mTeams/${tId}`);
        console.log(response.data);

        // update vacancy applicants count
        axios
          .patch(`/api/mTeams/${tId}`, {
            assigned_jobs: response.data.assigned_jobs - 1,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      updateRecord();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRemoveAssign = (booking) => {
    removeAssign(booking._id, booking.technician_id)
      .then(() => {
        // Refresh the page without reloading
        setAllBookings((bookings) => [...bookings]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const generateReport = () => {
    const doc = new jsPDF();

    // Add the report title to the PDF
    doc.setFontSize(18);
    doc.text("Bookings Report", 14, 22);

    // Add the current date to the PDF
    const date = moment().format("MMMM Do YYYY, h:mm:ss a");
    doc.setFontSize(12);
    doc.setTextColor("Blue");
    doc.text(`Report generated on ${date}`, 14, 32);

    const columns = [
      "Client Name",
      "Service Type",
      "Location",
      "Phone",
      "Email",
      "Date Time",
      "Special Note",
    ];
    const rows = allBookings.map(
      ({
        client_name,
        service_type,
        location,
        phone,
        email,
        date_time,
        special_note,
      }) => [
        client_name,
        service_type,
        location,
        phone,
        email,
        date_time,
        special_note,
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

    doc.save("report.pdf");
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
                <div className="col" style={{ marginBottom: "1rem" }}>
                  <h3 className="mb-0">All Bookings</h3>
                </div>
                <Row className="align-items-center">
                  <Col xl="3" style={{ marginLeft: "1rem" }}>
                    <InputGroup className="input-group-rounded input-group-merge">
                      <Input
                        aria-label="Search"
                        className="form-control-rounded form-control-prepended"
                        placeholder="Search"
                        type="search"
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText style={{ color: "#ffa500" }}>
                          <span className="fa fa-search" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                  <label
                    className="form-control-label mr-2"
                    htmlFor="input-email"
                    style={{marginTop: "0.4rem"}}
                  >
                    Sort By:
                  </label>
                  <Dropdown
                    isOpen={locationDropdownOpen}
                    color="primary"
                    toggle={toggleSortLocation}
                    style={{ width: "5rem", marginLeft: "0.5rem" }}
                  >
                    <DropdownToggle style={{ color: "#ffa500" }} caret>
                      {querySortLocation
                        ? querySortLocation
                        : "Select Location"}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        value="Auto Plaza"
                        onClick={(e) => {
                          setQuerySortLocation(e.target.value);
                        }}
                      >
                        Auto Plaza
                      </DropdownItem>
                      <DropdownItem
                        value="Auto Wash"
                        onClick={(e) => {
                          setQuerySortLocation(e.target.value);
                        }}
                      >
                        Auto Wash
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown
                    isOpen={typeDropdownOpen}
                    color="primary"
                    toggle={toggleSortType}
                    style={{ marginLeft: "6rem" }}
                  >
                    <DropdownToggle style={{ color: "#ffa500" }} caret>
                      {querySortType ? querySortType : "Select Type"}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        value="Vehicle Repair"
                        onClick={(e) => {
                          setQuerySortType(e.target.value);
                        }}
                      >
                        Vehicle Repair
                      </DropdownItem>
                      <DropdownItem
                        value="Wheel Alignment"
                        onClick={(e) => {
                          setQuerySortType(e.target.value);
                        }}
                      >
                        Wheel Alignment
                      </DropdownItem>
                      <DropdownItem
                        value="Body Wash"
                        onClick={(e) => {
                          setQuerySortType(e.target.value);
                        }}
                      >
                        Body Wash
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <div className="col text-right">
                    <Button
                      className="btn-icon btn-3"
                      style={{ color: "#fb6340", marginRight: "1rem" }}
                      type="button"
                      onClick={() => navigate("/admin/create-bookings")}
                    >
                      <span
                        className="btn-inner--icon"
                        style={{ width: "20px" }}
                      >
                        <i className="ni ni-folder-17" />
                      </span>
                      <span className="btn-inner--text">Add Bookings</span>
                    </Button>

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
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Location</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Assigned Technician</th>
                    <th scope="col">Date and Time</th>
                    <th scope="col">Notes</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td>Loading...</td>
                    </tr>
                  )}
                  {allBookings
                    .filter((booking) =>
                      booking.location
                        ?.toLowerCase()
                        .includes(querySortLocation.toLowerCase())
                    )
                    .filter((booking) =>
                      booking.service_type
                        ?.toLowerCase()
                        .includes(querySortType.toLowerCase())
                    )
                    .filter((booking) =>
                      booking.client_name
                        ?.toLowerCase()
                        .includes(query.toLowerCase())
                    )
                    .slice(0, visible)
                    .map((booking, index) => (
                      <tr key={booking._id}>
                        <th scope="row">
                          <span className="mb-0 text-sm">
                            {booking.client_name}
                          </span>
                        </th>
                        <td>
                          <Badge color="success">{booking.service_type}</Badge>
                        </td>
                        <td>{booking.location}</td>
                        <td> {booking.phone} </td>
                        <td> {booking.email} </td>
                        <td>
                          {" "}
                          {booking.technician_name}{" "}
                          {booking.technician_name === null && (
                            <b>Not Assigned</b>
                          )}{" "}
                        </td>
                        <td> {booking.date_time} </td>
                        <td> {booking.special_note} </td>
                        <td>
                          {booking.technician_name === null && (
                            <Button
                              size="sm"
                              color="primary"
                              onClick={() =>
                                navigate(
                                  `/admin/assign-technician/${booking._id}`
                                )
                              }
                            >
                              Assign Technician
                            </Button>
                          )}
                          {booking.technician_name !== null && (
                            <Button
                              size="sm"
                              color="danger"
                              onClick={() => handleRemoveAssign(booking)}
                            >
                              Remove Assign
                            </Button>
                          )}

                          <Button
                            size="sm"
                            color="warning"
                            onClick={() =>
                              navigate(`/admin/update-bookings/${booking._id}`)
                            }
                          >
                            Update
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() =>
                              handleDelete(booking._id, booking.technician_id)
                            }
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}

                  {visible < allBookings.length && (
                    <Button color="primary" size="sm" onClick={showMoreItems}>
                      Load More
                    </Button>
                  )}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="..."></nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ViewBookings;
