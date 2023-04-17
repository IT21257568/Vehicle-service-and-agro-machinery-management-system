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
  Media,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const UpdateTechnician = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // get Technician id from url
  const { id } = useParams();

  const navigate = useNavigate();

  // form states
  const [data, setData] = useState([]);
  const [technician_name, SetTechnicianName] = useState("");
  const [technician_age, setTechnicianAge] = useState("");
  const [technician_experiences, SetTechnicianExperiences] = useState("");
  const [technician_expertise, SetTechnicianExpertise] = useState("");
  const [technician_picture_url, SetTechnicianPictureUrl] = useState("");
  

  useEffect(() => {
    const getTechnician = async () => {
      const res = await axios.get(`/api/mTeams/${id}`);
      console.log(res.data);
      setData(res.data);

      SetTechnicianName(res.data.technician_name);
      setTechnicianAge(res.data.technician_age);
      SetTechnicianExperiences(res.data.technician_experiences);
      SetTechnicianExpertise(res.data.technician_expertise);
      SetTechnicianPictureUrl(res.data.technician_picture_url);
    };
    getTechnician();
  }, [id]);

  const handleUpdate = () => {
    console.log("lol");

    axios
      .patch(`/api/mTeams/${id}`, {
        technician_name: technician_name,
        technician_age: technician_age,
        technician_experiences: technician_experiences,
        technician_expertise: technician_expertise,
        technician_picture_url: technician_picture_url,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/admin/technicians");
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
                    <h3 className="mb-0">Update Technician</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Technician Details
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Technician Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data.technician_name}
                            placeholder="Name"
                            type="text"
                            onChange={(e) => {
                              SetTechnicianName(e.target.value);
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
                            Technician Age
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data.technician_age}
                            placeholder="Age"
                            type="text"
                            onChange={(e) => {
                              setTechnicianAge(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <Media className="align-items-center">
                          <span className="avatar avatar-sm rounded-circle">
                            <img
                              alt="..."
                              src={require("../../assets/img/theme/team-4-800x800.jpg")}
                            />
                          </span>
                        </Media>
                        <br>                  
                        </br>
                        <Input
                          type="file"
                          defaultValue={data.technician_picture_url}
                          className="form-control-alternative"
                          onChange={(e) => {
                            SetTechnicianPictureUrl(e.target.value);
                          }}
                        />
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Experiences
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data.technician_experiences}
                            placeholder="select count"
                            type="number"
                            onChange={(e) => {
                              SetTechnicianExperiences(e.target.value);
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
                        Expertice
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A brief description of the vacancy"
                        rows="4"
                        defaultValue={data.technician_expertise}
                        onChange={(e) => {
                          SetTechnicianExpertise(e.target.value);
                        }}
                        type="textarea"
                      />
                    </FormGroup>
                    <Button color="primary" onClick={handleUpdate}>
                      Save
                    </Button>
                    <Button
                      color="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/admin/technicians");
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

export default UpdateTechnician;