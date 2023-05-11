import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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
  Badge,
} from "reactstrap";

// core components
import CareerHeader from "components/Headers/CareerHeader.js";

const CreateVacancy = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // get vacancy id from url
  const { id } = useParams();

  const navigate = useNavigate();
   const [cvFile, setCVFile] = useState(null);
   const [uploadProgress, setUploadProgress] = useState(0);

  // form states
  const [data, setData] = useState([]);
  const [vacancyTitle, setVacancyTitle] = useState("");
  const [vacancy_applicants, setVacancyApplicants] = useState("");
  const [vacancyRequirements, setVacancyRequirements] = useState("");

  useEffect(() => {
    const getVacancy = async () => {
      const res = await axios.get(`/api/vacancies/${id}`);
      console.log(res.data);
      setData(res.data);

      setVacancyTitle(res.data.vacancy_title);
      setVacancyRequirements(res.data.vacancy_requirements);
      setVacancyApplicants(res.data.vacancy_applicants)
    };
    getVacancy();
  }, [id]);

  // form states
  const [applicant_name, setApplicantName] = useState("");
  const [applicant_age, setApplicantAge] = useState("");
  const [applicant_gender, setApplicantGender] = useState("");
  const [applicant_contact, setApplicantContact] = useState("");
  const [applicant_email, setApplicantEmail] = useState("");
  const [applicant_CVFile_url, setApplicantCVFileUrl] = useState("");
  const [error, setError] = useState(null);


const handleImageUpload = (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "agd0dlhj");
  // formData.append("public_id", "your_public_id");
  formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);

  const options = {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setUploadProgress(percentCompleted);
    },
  };

  axios
    .post(
      `https://api.cloudinary.com/v1_1/dkk0hlcyk/image/upload`,
      formData,
      options
    )
    .then((response) => {
      setCVFile(response.data.secure_url);
      setUploadProgress(0);
    })
    .catch((error) => {
      console.error(error);
      setUploadProgress(0);
    });
};


  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    try {
      await axios
        .post("/api/cvSub", {
          applicant_name: applicant_name,
          applicant_age: applicant_age,
          applicant_gender: applicant_gender,
          applicant_contact: applicant_contact,
          applicant_email: applicant_email,
          applicant_CVFile_url: cvFile,
          vacancy_name: vacancyTitle,
        })
        .then((res) => {
          console.log("New Vacancy added", res.data);
          setApplicantName("");
          setApplicantAge("");
          setApplicantGender("");
          setApplicantContact("");
          setApplicantEmail("");
          setApplicantEmail("");
          setApplicantCVFileUrl("");
          setError(null);
          axios
            .patch(`/api/vacancies/${id}`, {
              vacancy_applicants: vacancy_applicants+1,
            })
            .then((res) => {
              console.log(res.data);
              navigate("/user/carrerpage");
            });
          
        });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { error: errorMessage, emptyFields } = error.response.data;
        const fields = emptyFields.join(", ");
        setError(`Please fill in all fields: ${fields}`);
      } else {
        console.log(error);
      }
    }
    
    
  };
  return (
    <>
      <CareerHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">
                      Apply For The{" "}
                      <Badge color="success">{data.vacancy_title}</Badge>
                    </h3>
                    <br></br>
                    <label
                      className="form-control-label"
                      htmlFor="input-last-name"
                      style={{ marginBottom: "0.5rem", fontWeight: "bold" }}
                    >
                      Requirements for the {data.vacancy_title} vacancy
                    </label>
                    <Input
                      className="form-control-alternative"
                      readOnly
                      value={data.vacancy_requirements}
                      rows="6"
                      type="textarea"
                      style={{ fontSize: "1rem", backgroundColor: "#f8f9fe" }}
                    />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Applicant Details
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Vacancy Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            readOnly
                            value={data.vacancy_title}
                            placeholder="Title"
                            type="text"
                            onChange={(e) => {
                              setVacancyTitle(e.target.value);
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
                            Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Eneter Your Name Here"
                            type="text"
                            onChange={(e) => {
                              setApplicantName(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Age
                          </label>

                          <Input
                            className="form-control-alternative"
                            defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="Enter Age"
                            type="number"
                            onChange={(e) => {
                              setApplicantAge(e.target.value);
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
                            Gender
                          </label>

                          <Dropdown
                            isOpen={dropdownOpen}
                            color="primary"
                            toggle={toggle}
                          >
                            <DropdownToggle caret>
                              {applicant_gender
                                ? applicant_gender
                                : "Select Gender"}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                value="Male"
                                onClick={(e) => {
                                  setApplicantGender(e.target.value);
                                }}
                              >
                                Male
                              </DropdownItem>
                              <DropdownItem
                                value="Female"
                                onClick={(e) => {
                                  setApplicantGender(e.target.value);
                                }}
                              >
                                Female
                              </DropdownItem>
                              <DropdownItem
                                value="Other"
                                onClick={(e) => {
                                  setApplicantGender(e.target.value);
                                }}
                              >
                                Other
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
                            htmlFor="input-first-name"
                          >
                            Contact Number
                          </label>

                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="Enter Your Working Contact Number Here"
                            type="text"
                            onChange={(e) => {
                              setApplicantContact(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Email
                          </label>

                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="Enter Your Email Here"
                            type="email"
                            onChange={(e) => {
                              setApplicantEmail(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <div className="pl-lg-4">
                    <Row>
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        Upload Your CV That Created As PDF
                      </label>
                      <Input
                        type="file"
                        className="form-control-alternative"
                        onChange={handleImageUpload}
                      />
                      {uploadProgress > 0 && (
                        <div>Uploading... {uploadProgress}%</div>
                      )}
                    </Row>
                    <FormGroup>
                      {error && (
                        <div
                          style={{
                            backgroundColor: "#ffffff",
                            color: "red",
                            // textAlign:"center",
                            display: "flex",
                            justifyContent: "center",
                            // fontWeight:"bold",
                            // paddingBottom: "5px",
                            // paddingTop: "5px",
                            padding: "10px",
                            marginTop: "15px",
                            borderStyle: "solid",
                            borderColor: "red",
                            borderWidth: "3px",
                            borderRadius: "20px",
                          }}
                        >
                          <span>
                            <b>{error}</b>
                          </span>
                        </div>
                      )}
                    </FormGroup>
                    <Button color="primary" onClick={handleSubmit}>
                      Apply
                    </Button>
                    <Button
                      color="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/user/carrerpage");
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

export default CreateVacancy;
