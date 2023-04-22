import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  //Dropdown,
  //DropdownToggle,
  //DropdownMenu,
  //DropdownItem,
  CardImg,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

const CreateVacancy = () => {
  
  const navigate = useNavigate();

  //const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // form states
  const [technician_name, setTechnicianName] = useState("");
  const [technician_age, setTechnicianAge] = useState("");
  const [technician_experiences, setTechnicianExperiences] = useState("");
  const [technician_expertise, setTechnicianExpertise] = useState("");
  const [technician_picture_url, setTechnicianPictureUrl] = useState("");
  const [technician_specialize_in, setTechnicianSpecializeIn] = useState("");
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
        setImage(response.data.secure_url);
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
        .post("/api/mTeams", {
          technician_name: technician_name,
          technician_age: technician_age,
          technician_experiences: technician_experiences,
          technician_expertise: technician_expertise,
          technician_picture_url: image,
          technician_specialize_in: technician_specialize_in,
        })
        .then((res) => {
          console.log("New Technician added", res.data);
          setTechnicianName("");
          setTechnicianAge("");
          setTechnicianExperiences("");
          setTechnicianExpertise("");
          setTechnicianPictureUrl("");
          setTechnicianSpecializeIn("");
          setError(null);
          navigate("/admin/technicians");
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
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Add Technician</h3>
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
                            id="input-username"
                            placeholder="Enter Name"
                            type="text"
                            onChange={(e) => {
                              setTechnicianName(e.target.value);
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
                            Technician Specialize In
                          </label>
                          <Input
                            className="form-control-alternative"
                            //defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="Enter Technician's main expertise"
                            type="text"
                            onChange={(e) => {
                              setTechnicianSpecializeIn(e.target.value);
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
                            Technician Age
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="select age"
                            type="number"
                            onChange={(e) => {
                              setTechnicianAge(e.target.value);
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
                            Technician Expirence
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="select number of years working on this field"
                            type="number"
                            onChange={(e) => {
                              setTechnicianExperiences(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup className="d-flex flex-column">
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Technician Picture
                          </label>{" "}
                          <br></br>
                          <Media className="align-items-center">
                            <span>
                              
                              <CardImg
                                height="50rem"
                                width="100%"
                                alt="Technician Picture"
                                src={image}
                              />
                            </span>
                          </Media>
                          <br></br>
                          <Input
                            type="file"
                            className="form-control-alternative"
                            onChange={handleImageUpload}
                          />
                          {uploadProgress > 0 && (
                            <div>Uploading... {uploadProgress}%</div>
                          )}
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
                        Techinician Expertice
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Enter Technician's Expertice here"
                        rows="4"
                        type="textarea"
                        onChange={(e) => {
                          setTechnicianExpertise(e.target.value);
                        }}
                      />
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
                      Create
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

export default CreateVacancy;
