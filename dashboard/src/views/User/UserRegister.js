import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { register, reset } from "../../features/auth/authSlice";

// dotenv config
// import dotenv from "dotenv";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Spinner,
  FormFeedback,
} from "reactstrap";

import { FaPhone } from "react-icons/fa";

// dotenv.config();

const handleCreate = async (e, navigate) => {
  e.preventDefault();
  const json = {};
  const response = await axios.post("/api/users", json);
  if (response.status === 201) {
    navigate("/admin/users");
  }
};

const UserRegister = () => {
  // const [image, setImage] = useState(null);
  // const [uploadProgress, setUploadProgress] = useState(0);

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "agd0dlhj");
  //   // formData.append("public_id", "your_public_id");
  //   formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);

  //   const options = {
  //     onUploadProgress: (progressEvent) => {
  //       const percentCompleted = Math.round(
  //         (progressEvent.loaded * 100) / progressEvent.total
  //       );
  //       setUploadProgress(percentCompleted);
  //     },
  //   };

  //   axios
  //     .post(
  //       `https://api.cloudinary.com/v1_1/dkk0hlcyk/image/upload`,
  //       formData,
  //       options
  //     )
  //     .then((response) => {
  //       setImage(response.data.secure_url);
  //       setUploadProgress(0);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setUploadProgress(0);
  //     });
  // };

  // form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });

  const { name, email, phone, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const [passwordStrength, setPasswordStrength] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    if (name === "password") {
      if (value.length >= 8) {
        setPasswordStrength("strong");
      } else if (value.length >= 4) {
        setPasswordStrength("medium");
      } else {
        setPasswordStrength("weak");
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        phone,
        password,
      };

      dispatch(register(userData));
    }
  };

  let passwordStrengthClass = "";
  switch (passwordStrength) {
    case "weak":
      passwordStrengthClass = "text-danger";
      break;
    case "medium":
      passwordStrengthClass = "text-warning";
      break;
    case "strong":
      passwordStrengthClass = "text-success";
      break;
    default:
      passwordStrengthClass = "";
  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <big>
                Create a <span>Wheelmasters</span> account
              </big>
            </div>
            {/* {image && <img src={image} alt="Uploaded" />}
            <Input type="file" onChange={handleImageUpload} />
            {uploadProgress > 0 && <div>Uploading... {uploadProgress}%</div>} */}
            <Form role="form" onSubmit={onSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Name"
                    type="text"
                    value={name}
                    name="name"
                    onChange={onChange}
                  />
                  {/* <FormFeedback >
                    Sweet! that name is available
                  </FormFeedback> */}
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    name="email"
                    onChange={onChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <FaPhone style={{ transform: "scaleX(-1)" }} />{" "}
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Phone"
                    type="phone"
                    autoComplete="phone"
                    name="phone"
                    onChange={onChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    onChange={onChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                    name="password2"
                    onChange={onChange}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  Password strength:{" "}
                  <span className={`font-weight-700 ${passwordStrengthClass}`}>
                    {passwordStrength}
                  </span>
                </small>
              </div>
              {/* <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row> */}
              <div className="text-center">
                <Button
                  className="mt-4"
                  color="primary"
                  type="submit"
                  // onClick={handleCreate}
                >
                  {isLoading && (
                    <>
                      <Spinner size="sm"></Spinner>
                      <span> Creating Account</span>{" "}
                    </>
                  )}
                  {!isLoading && <>Create account</>}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default UserRegister;
