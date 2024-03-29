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

const UpdateProgressStatus = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // get vacancy id from url
  const { id } = useParams();

  const navigate = useNavigate();

  //image upload progress load
  
  const [uploadProgress, setUploadProgress] = useState(0);

  // form states
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [vehiNumber, setVehiNumber] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [progressPictureUrl, setProgressPictureUrl] = useState("");

  useEffect(() => {
    const getProgress = async () => {
      const res = await axios.get(`/api/progress/${id}`);
      console.log(res.data);
      setData(res.data);

      setName(res.data.name);
      setVehiNumber(res.data.vehi_number);
      setStatus(res.data.status);
      setDate(res.data.date);
      setDescription(res.data.description);
      setProgressPictureUrl(res.data.progress_picture_url);
    };
    getProgress();
  }, [id]);

  //setting current image url in pudate form
  const [image, setImage] = useState(data.progress_picture_url);

  //handling image upload
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
    console.log("lol");

    axios
      .patch(`/api/progress/${id}`, {
        name : name,
        vehi_number : vehiNumber,
        status : status,
        date  : date,
        description  : description,
        progress_picture_url: image,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/admin/progress");
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
                    <h3 className="mb-0">Update Progress Status</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                  Progress Status Title
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-title"
                          >
                            Customer Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-title"
                            defaultValue={data.name}
                            placeholder="customer name"
                            type="text"
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-promo-code"
                          >
                            Vehicle Registration Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-promo-code"
                            defaultValue={data.vehi_number}
                            placeholder="enter vehicle number"
                            type="text"
                            onChange={(e) => {
                              setVehiNumber(e.target.value);
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
                            htmlFor="input-title"
                          >
                            Progress Status
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-title"
                            defaultValue={data.status}
                            placeholder="enter status"
                            type="text"
                            onChange={(e) => {
                              setStatus(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-start-date"
                          >
                            Service Date
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-start-date"
                            defaultValue={data.date}
                            type="date"
                            onChange={(e) => {
                              setDate(e.target.value);
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
                            Change Picture
                          </label> <br></br>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Current Picture : {data.progress_picture_url}
                          </label> <br></br>
                          <Input
                            type="file"
                            className="form-control-alternative"
                            onChange={handleImageUpload}
                            defaultValue={data.progress_picture_url}
                            
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
                        htmlFor="input-description"
                      >
                      Service Progress Status Description
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A brief description about the Service Progress Status"
                        defaultValue={data.description}
                        rows="4"
                        type="textarea"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <Button color="primary" onClick={handleUpdate}>
                      Save Changes
                    </Button>
                    <Button
                      color="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/admin/progress");
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

export default UpdateProgressStatus;