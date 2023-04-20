import { useState} from "react";
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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

const CreateAgroProduct= () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const navigate = useNavigate();

  //const [isLoading, setIsLoading] = useState(false);

  // image upload states
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // form states
  const [AgroProduct_name, setAgroProductName] = useState("");
  const [AgroProduct_price, setAgroProductPrice] = useState("");
  const [AgroProduct_discount, setAgroProductDiscount] = useState("");
  const [AgroProduct_description, setAgroProductDescription] = useState("");
  const [AgroProduct_status, setAgroProductStatus] = useState("");
  const [AgroProduct_picture_url, setAgroProductPictureUrl] = useState("");
  const [error, setError] = useState(null);

  // handle image upload
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
        .post("/api/agroProducts", {
          p_name : AgroProduct_name,
          p_image : image,
          p_price : AgroProduct_price,
          p_discount : AgroProduct_discount,
          p_description : AgroProduct_description,
          p_status : AgroProduct_status,
        })
        .then((res) => {
          console.log("New AgroProduct added", res.data);
          setAgroProductName("");
          setAgroProductPrice("");
          setAgroProductDiscount("");
          setAgroProductDescription("");
          setAgroProductPictureUrl("");
          setAgroProductStatus("");
          setError(null);
          navigate("/admin/agro-products");
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
                    <h3 className="mb-0">Add Agro Product</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Agro Product Details
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username">
                            Agro Product Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Enter Agro Product Name"
                            type="text"
                            onChange={(e) => {
                              setAgroProductName(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup className="d-flex flex-column">
                          <label
                            className="form-control-label"
                            htmlFor="input-email">
                            Agro Product Picture
                          </label> <br></br>
                          <Media className="align-items-center">
                            <span className="avatar avatar-sm rounded-circle">
                              {image && (
                                <img
                                  //className="rounded-circle"
                                  src={image}
                                  alt="Uploaded"
                                />
                              )}
                            </span>
                          </Media><br></br>
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

                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Agro Product Price
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="Enter Agro Product price"
                            type="number"
                            onChange={(e) => {
                              setAgroProductPrice(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Discount
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="Enter Agro Product discount"
                            type="number"
                            onChange={(e) => {
                              setAgroProductDiscount(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup className="d-flex flex-column">
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Status
                          </label>
                          <Dropdown
                            isOpen={dropdownOpen}
                            color="primary"
                            toggle={toggle}
                          >
                            <DropdownToggle caret>
                              {AgroProduct_status ? AgroProduct_status : "Select Status"}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                value="Available"
                                onClick={(e) => {
                                  setAgroProductStatus(e.target.value);
                                }}
                              >
                                Available
                              </DropdownItem>
                              <DropdownItem
                                value="Out of Stock"
                                onClick={(e) => {
                                  setAgroProductStatus(e.target.value);
                                }}
                              >
                                Out of Stock
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
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
                        placeholder="A brief description about the Agro Product"
                        rows="4"
                        type="textarea"
                        onChange={(e) => {
                          setAgroProductDescription(e.target.value);
                        }}
                      />
                       {error && (
                          <div
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              padding: "10px",
                              marginTop: "10px",
                            }}
                          >
                            <p>{error}</p>
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
                        navigate("/admin/agro-products");
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

export default CreateAgroProduct;
