import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";



const UpdateGeneralIssue = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // get vacancy id from url
  const { id } = useParams();

  const navigate = useNavigate();

  // form states
  const [data, setData] = useState([]);
  const [cname, setCustomerName] = useState("");
  const [customerNIC, setCustomerNIC] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [gnDescription, setGnDiscription] = useState("");
  const [issueStatus, setIssueStatus] = useState("");

  useEffect(() => {
    const getGeneralIssue = async () => {
      const res = await axios.get(`/api/generalIssues/${id}`);
      console.log(res.data);
      setData(res.data);

      setCustomerName(res.data.customer_name);
      setCustomerNIC(res.data.customer_NIC);
      setContactNumber(res.data.contact_number);
      setGnDiscription(res.data.GN_discription);
      setIssueStatus(res.data.issue_status);
    };
    getGeneralIssue();
  }, [id]);

  const handleUpdate = () => {
    console.log("update button clicked");

    axios
      .patch(`/api/generalIssues/${id}`, {
        customer_name: cname,
        customer_NIC: customerNIC,
        contact_number: contactNumber,
        GN_discription: gnDescription,
        issue_status: issueStatus,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/admin/view-general-issues");
      });
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Update General Issue</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    General Issue Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Customer Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Enter Customer Name"
                            defaultValue={data.customer_name}
                            type="text"
                            onChange={(e) => {
                              setCustomerName(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup className="d-flex flex-column">
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Issue Status
                          </label>
                          <Dropdown
                            isOpen={dropdownOpen}
                            color="primary"
                            toggle={toggle}
                          >
                            <DropdownToggle caret>
                              {issueStatus ? issueStatus : "Select Type"}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                value="Solved"
                                onClick={(e) => {
                                  setIssueStatus(e.target.value);
                                }}
                              >
                                Solved
                              </DropdownItem>
                              <DropdownItem
                                value="Pending"
                                onClick={(e) => {
                                  setIssueStatus(e.target.value);
                                }}
                              >
                                Pending
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                        <Col lg="6">
                            <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-username"
                            >
                                Customer NIC
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Enter Customer NIC" 
                                defaultValue={data.customer_NIC}
                                type="text"
                                onChange={(e) => {
                                setCustomerNIC(e.target.value);
                                }}
                            />
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                            <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-username"
                            >
                                Contact Number
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Enter Contact Number"
                                defaultValue={data.contact_number}
                                type="text"
                                onChange={(e) => {
                                setContactNumber(e.target.value);
                                }}
                            />
                            </FormGroup>
                        </Col>
                    </Row>
                  </div>

                  {/* Description */}
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-last-name"
                      >
                        Description
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Brief description about the issue"
                        defaultValue={data.GN_discription}
                        rows="4"
                        type="textarea"
                        onChange={(e) => {
                          setGnDiscription(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <Button color="primary" onClick={handleUpdate}>
                      Update
                    </Button>
                    <Button
                      color="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/admin/view-general-issues");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UpdateGeneralIssue;
