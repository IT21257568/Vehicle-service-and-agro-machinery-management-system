import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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



const UpdateRepairJob = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // get vacancy id from url
  const { id } = useParams();

  const navigate = useNavigate();

  //image uploading section
  const [uploadProgress, setUploadProgress] = useState(0);

  // form states
  const [data, setData] = useState([]);
  const [name, setCustomerName] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [requiredParts, setRequiredParts] = useState("");
  const [imageUrl, setImageUrl] = useState("");
 

  useEffect(() => {
    const getRepairJob = async () => {
      const res = await axios.get(`/api/damageValuation/${id}`);
      console.log(res.data);
      setData(res.data);

      setCustomerName(res.data.customer_name);
      setVehicleModel(res.data.vehicle_Model);
      setCustomerId(res.data.customer_id);
      setCustomerEmail(res.data.customer_email);
      setVehicleNumber(res.data.vehicle_Number);
      setEstimatedCost(res.data.estimated_cost);
      setRequiredParts(res.data.required_parts);
      setImageUrl(res.data.damage_picture_url);


    };
    getRepairJob();
  }, [id]);

  
  //setting current image url in pudate form
  const [image, setImage] = useState(data.damage_picture_url);

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
    console.log("updated");


    // Get the original values before updating
    const originalCustomer_name = name;
    const originalVehicle_Model = vehicleModel;
    const originalCustomer_id = customerId;
    const originalVehicle_Number = vehicleNumber;
    const originalCustomer_email = customerEmail;
    const originalEstimated_cost = estimatedCost;
    const originalRequired_parts = requiredParts;

    axios
      .patch(`/api/damageValuation/${id}`, {
        customer_name: name,
        vehicle_Model: vehicleModel,
        customer_id: customerId,
        vehicle_Number: vehicleNumber,
        customer_email: customerEmail,
        estimated_cost: estimatedCost,
        required_parts: requiredParts,
        damage_picture_url: image,
      })
      .then((res) => {
        console.log(res.data);
        const {
          customer_name,
          vehicle_Model,
          customer_id,
          vehicle_Number,
          customer_email,
          estimated_cost,
          required_parts,
        } = res.data;

        const changedFields = [];

        // Compare each field with the original value
        if (customer_name !== originalCustomer_name) {
          // changedFields.push(`Vacancy Title: ${vacancy_title}`);
          changedFields.push(`Customer Name`);
        }
        if (vehicle_Model !== originalVehicle_Model) {
          // changedFields.push(`Vacancy Type: ${vacancy_type}`);
          changedFields.push(`Vehicle Model`);
        }
        if (customer_id !== originalCustomer_id) {
          // changedFields.push(`Vacancy Count: ${vacancy_count}`);
          changedFields.push(`Customer ID `);
        }
        if (vehicle_Number !== originalVehicle_Number) {
          // changedFields.push(`Vacancy Requirements: ${vacancy_requirements}`);
          changedFields.push(` Vehicle Number`);
        }
        if (customer_email !== originalCustomer_email) {
          // changedFields.push(`Vacancy Requirements: ${vacancy_requirements}`);
          changedFields.push(`Customer Email`);
        }
        if (estimated_cost !== originalEstimated_cost) {
          // changedFields.push(`Vacancy Requirements: ${vacancy_requirements}`);
          changedFields.push(`Estimated Cost`);
        }
        if (required_parts !== originalRequired_parts) {
          // changedFields.push(`Vacancy Requirements: ${vacancy_requirements}`);
          changedFields.push(`Required Parts`);
        }

        if (changedFields.length > 0) {
          toast.success(`Updated Fields :: ${changedFields.join(", ")} `, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000, // Optional: Auto-close the toast after 3 seconds
          });
        } else {
          toast.warning("No fields were changed.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000, // Optional: Auto-close the toast after 3 seconds
          });
        }

        navigate("/admin/view-repair-jobs");
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
                    <h3 className="mb-0">Update Repair Job</h3>
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
                                defaultValue={data.customer_id}
                                type="text"
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
                                defaultValue={data.vehicle_Number}
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
                                placeholder="Customer Email"
                                defaultValue={data.customer_email}
                                type="text"
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
                                placeholder="Estimated Cost"
                                defaultValue={data.estimated_cost}
                                type="text"
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
                            Change Picture
                          </label> <br></br>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Current Picture : {data.damage_picture_url}
                          </label> <br></br>
                          <Input
                            type="file"
                            className="form-control-alternative"
                            onChange={handleImageUpload}
                            defaultValue={data.damage_picture_url}
                            
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
                        placeholder="This are no required parts"
                        defaultValue={data.required_parts}
                        rows="4"
                        type="textarea"
                        onChange={(e) => {
                          setRequiredParts(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <Button color="primary" onClick={handleUpdate}>
                      Save
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

export default UpdateRepairJob;