import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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



const CreateRepairjob = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const navigate = useNavigate();

  //image uploading section
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // form states
  const [data, setData] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [requiredParts, setRequiredParts] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);

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

  const showErrorToast = (errorMessage) => {
    toast.error(errorMessage, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    try {
      await axios
        .post("/api/damageValuation", {
          customer_id: customerId,
          customer_name: customerName,
          vehicle_Number: vehicleNumber,
          vehicle_Model: vehicleModel,
          customer_email: customerEmail,
          estimated_cost: estimatedCost,
          required_parts: requiredParts,
          damage_picture_url: image,
        })
        .then((res) => {
          console.log("New repair job added", res.data);
          setCustomerId("");
          setCustomerName("");
          setVehicleNumber("");
          setVehicleModel("");
          setCustomerEmail("");
          setEstimatedCost("");
          setRequiredParts("");
          setImageUrl("");
          setError(null);
          toast.success("You have successfully added a new Repair Job", {
            position: toast.POSITION.TOP_CENTER,
          });
          navigate("/admin/view-repair-jobs");
        });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { error: errorMessage, emptyFields } = error.response.data;
        const fields = emptyFields.join(", ");
        const toastMessage = `Please fill in all fields: ${fields}`;
        setError(toastMessage);
        showErrorToast(toastMessage);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
    <ToastContainer />
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Create Repair Job</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Job Details
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
                            Vehicle Type
                          </label>
                          <Dropdown
                            isOpen={dropdownOpen}
                            color="primary"
                            toggle={toggle}
                          >
                            <DropdownToggle caret>
                              {vehicleModel ? vehicleModel : "Select Type"}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                value="Toyota"
                                onClick={(e) => {
                                  setVehicleModel(e.target.value);
                                }}
                              >
                                Toyota
                              </DropdownItem>
                              <DropdownItem
                                value="Nissan"
                                onClick={(e) => {
                                  setVehicleModel(e.target.value);
                                }}
                              >
                                Nissan
                              </DropdownItem>
                              <DropdownItem
                                value="Honda"
                                onClick={(e) => {
                                  setVehicleModel(e.target.value);
                                }}
                              >
                                Honda
                              </DropdownItem>
                              <DropdownItem
                                value="Mazda"
                                onClick={(e) => {
                                  setVehicleModel(e.target.value);
                                }}
                              >
                                Mazda
                              </DropdownItem>
                              <DropdownItem
                                value="Suzuki"
                                onClick={(e) => {
                                  setVehicleModel(e.target.value);
                                }}
                              >
                                Suzuki
                              </DropdownItem>
                              <DropdownItem
                                value="Other"
                                onClick={(e) => {
                                  setVehicleModel(e.target.value);
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
                                htmlFor="input-username"
                            >
                                Customer NIC
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Enter Customer NIC"
                                type="number"
                                onChange={(e) => {
                                setCustomerId(e.target.value);
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
                                Vehicle Number
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Enter Vehicle Number"
                                type="text"
                                onChange={(e) => {
                                setVehicleNumber(e.target.value);
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
                                htmlFor="input-username"
                            >
                                Customer Email
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Enter Customer Email"
                                type="email"
                                onChange={(e) => {
                                setCustomerEmail(e.target.value);
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
                                Estimated Cost
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Enter Estimated Cost"
                                type="number"
                                onChange={(e) => {
                                setEstimatedCost(e.target.value);
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
                            Post Picture
                          </label> <br></br>
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
                        Required Parts
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Enter Required Parts"
                        rows="4"
                        type="textarea"
                        onChange={(e) => {
                          setRequiredParts(e.target.value);
                        }}
                      />
                      {/* {error && (
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
                      )} */}
                    </FormGroup>
                    <Button color="primary" onClick={handleSubmit}>
                      Create
                    </Button>
                    <Button
                      color="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/admin/view-repair-jobs");
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

export default CreateRepairjob;
