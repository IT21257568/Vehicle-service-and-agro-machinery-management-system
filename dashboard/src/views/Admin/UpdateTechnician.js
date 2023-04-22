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
  CardImg,
  //Dropdown,
  //DropdownToggle,
  //DropdownMenu,
  //DropdownItem,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const UpdateTechnician = () => {
 
  // get Technician id from url
  const { id } = useParams();

  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);

  //const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // form states
  const [data, setData] = useState([]);
  const [technician_name, SetTechnicianName] = useState("");
  const [technician_age, setTechnicianAge] = useState("");
  const [technician_experiences, SetTechnicianExperiences] = useState("");
  const [technician_expertise, SetTechnicianExpertise] = useState("");
  const [technician_picture_url, SetTechnicianPictureUrl] = useState("");
  const [technician_specialize_in, setTechnicianSpecializeIn] = useState("");

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
      setTechnicianSpecializeIn(res.data.technician_specialize_in);
    };
    getTechnician();
  }, [id]);

  //setting current image url in Update form
  const [image, setImage] = useState(data.technician_picture_url);

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

  const handleUpdate = () => {
    console.log("Ready to update");
    axios
      .patch(`/api/mTeams/${id}`, {
        technician_name: technician_name,
        technician_age: technician_age,
        technician_experiences: technician_experiences,
        technician_expertise: technician_expertise,
        technician_picture_url: image,
        technician_specialize_in: technician_specialize_in,
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
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Technician Specialize In
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data.technician_specialize_in}
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

                    <Row>
                      <Col lg="6">
                        <Media className="align-items-center">
                          <span>
                            <CardImg
                              height="50rem"
                              width="100%"
                              alt="Technician Picture"
                              src={data.technician_picture_url}
                            />
                          </span>
                           : Current Picture
                        </Media>
                        <br></br>

                        <Media className="align-items-center">
                          <span>
                            <CardImg
                              height="50rem"
                              width="100%"
                              alt=" : Updated Picture Will Appear Here"
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
                      </Col>
                    </Row>
                    <br></br>
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
