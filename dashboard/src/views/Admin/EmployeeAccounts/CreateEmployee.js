import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// react toastify settings
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// toastify container
import { ToastContainer } from "react-toastify";

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

const CreateVacancy = () => {
  const [dropdown1Open, setDropdown1Open] = useState(false);
  const toggle1 = () => setDropdown1Open((prevState) => !prevState);
  const [dropdown2Open, setDropdown2Open] = useState(false);
  const toggle2 = () => setDropdown2Open((prevState) => !prevState);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [profileImg, setProfileImg] = useState(
    "https://api.dicebear.com/6.x/initials/svg?seed=AB"
  );

  const [uploadedImg, setUploadedImg] = useState("");

  const [uploadProgress, setUploadProgress] = useState(0);

  // form states
  const [empName, setEmpName] = useState("");
  const [empCode, setEmpCode] = useState("");
  const [empType, setEmpType] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empPhone, setEmpPhone] = useState("");
  const [empUsername, setEmpUsername] = useState("");
  const [empDept, setEmpDept] = useState("");
  const [empPassword, setEmpPassword] = useState("");

  const [error, setError] = useState(null);

  //password visibility
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "agd0dlhj");
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
        setUploadedImg(response.data.secure_url);
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
        .post("http://localhost:4000/api/employees", {
          name: empName,
          empCode: empCode,
          username: empUsername,
          email: empEmail,
          phone: empPhone,
          empType: empType,
          empDept: empDept,
          password: empPassword,
          profileImg: uploadedImg || profileImg,
        })
        .then((res) => {
          console.log("New Employee added", res.data);
          // toast message success
          toast.success("New Employee added");
        });
    } catch (error) {
      console.log(error);
      // toast error message
      toast.error("Error adding new employee");
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
                    <h3 className="mb-0">Create Employee Account</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Personal Details
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Employee Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Enter Name"
                            type="text"
                            onChange={(e) => {
                              setEmpName(e.target.value);
                              setProfileImg(
                                `https://api.dicebear.com/6.x/initials/svg?seed=${e.target.value}`
                              );
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
                            Phone Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            //defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="077 123 4567"
                            type="number"
                            onChange={(e) => {
                              setEmpPhone(e.target.value);
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
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            // id="input-first-name"
                            placeholder="Email"
                            type="email"
                            onChange={(e) => {
                              setEmpEmail(e.target.value);
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
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            // id="input-first-name"
                            placeholder="Username"
                            type="text"
                            onChange={(e) => {
                              setEmpUsername(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <label
                          className="form-control-label"
                          // htmlFor="input-first-name"
                        >
                          Account Password
                        </label>
                        <FormGroup className="d-flex">
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            // id="input-first-name"
                            placeholder="Enter a password"
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => {
                              setEmpPassword(e.target.value);
                            }}
                          />
                          <Button
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              outline: "none",
                            }}
                            // className="tf-button-submit mg-t-15"
                            onClick={(e) => {
                              e.preventDefault();
                              togglePasswordVisibility();
                            }}
                          >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup className="d-flex flex-column">
                          <label
                            className="form-control-label mb-4  "
                            htmlFor="input-email"
                          >
                            Profile Image
                          </label>{" "}
                          <Media className="align-items-center mb-4">
                            <span>
                              {profileImg && (
                                <img
                                  //className="rounded-circle"
                                  src={
                                    uploadedImg !== ""
                                      ? uploadedImg
                                      : profileImg
                                  }
                                  alt="Uploaded"
                                  style={{
                                    width: "150px",
                                    height: "150px",
                                    borderRadius: "300px",
                                    objectFit: "cover",
                                  }}
                                />
                              )}
                            </span>
                          </Media>
                          <Input
                            type="file"
                            className="form-control-alternative "
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
                  <div className="pl-lg-4"></div>
                  <h6 className="heading-small text-muted mb-4 mt-4">
                    Role Details
                  </h6>
                  <div className="pl-lg-4">
                    <Col lg="3">
                      <FormGroup className="d-flex flex-column">
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Employee Type
                        </label>
                        <Dropdown
                          isOpen={dropdown1Open}
                          color="primary"
                          toggle={toggle1}
                        >
                          <DropdownToggle caret>
                            {empType ? empType : "Select Type"}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              value="Manager"
                              onClick={(e) => {
                                setEmpType(e.target.value);
                              }}
                            >
                              Manager
                            </DropdownItem>
                            <DropdownItem
                              value="Supervisor"
                              onClick={(e) => {
                                setEmpType(e.target.value);
                              }}
                            >
                              Supervisor
                            </DropdownItem>
                            <DropdownItem
                              value="Support Agent"
                              onClick={(e) => {
                                setEmpType(e.target.value);
                              }}
                            >
                              Support Agent
                            </DropdownItem>
                            <DropdownItem
                              value="Consultant"
                              onClick={(e) => {
                                setEmpType(e.target.value);
                              }}
                            >
                              Consultant
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </FormGroup>
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-first-name"
                        >
                          Employee Code
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue=""
                          // id="input-first-name"
                          placeholder="Employee Code"
                          type="text"
                          onChange={(e) => {
                            setEmpCode(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup className="d-flex flex-column">
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Employee Department
                        </label>
                        <Dropdown
                          isOpen={dropdown2Open}
                          color="primary"
                          toggle={toggle2}
                        >
                          <DropdownToggle caret>
                            {empDept ? empDept : "Select Department"}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              value="Sales"
                              onClick={(e) => {
                                setEmpDept(e.target.value);
                              }}
                            >
                              Sales
                            </DropdownItem>
                            <DropdownItem
                              value="Repairs"
                              onClick={(e) => {
                                setEmpDept(e.target.value);
                              }}
                            >
                              Repairs
                            </DropdownItem>
                            <DropdownItem
                              value="Customer Service"
                              onClick={(e) => {
                                setEmpDept(e.target.value);
                              }}
                            >
                              Customer Service
                            </DropdownItem>
                            <DropdownItem
                              value="Consultancy"
                              onClick={(e) => {
                                setEmpDept(e.target.value);
                              }}
                            >
                              Consultancy
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </FormGroup>
                      <Button color="primary" onClick={handleSubmit}>
                        Create
                      </Button>
                      <Button
                        color="warning"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/admin/view-employees");
                        }}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default CreateVacancy;
