import { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

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

const UpdateAgroProduct= () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const navigate = useNavigate();

    //get sparePart id from url
    const { id } = useParams();

    // image upload progress state
    const [uploadProgress, setUploadProgress] = useState(0);

    // form states
    const [data, setData] = useState([]);
    const [AgroProduct_name, setAgroProductName] = useState("");
    const [AgroProduct_price, setAgroProductPrice] = useState("");
    const [AgroProduct_discount, setAgroProductDiscount] = useState("");
    const [AgroProduct_description, setAgroProductDescription] = useState("");
    const [AgroProduct_status, setAgroProductStatus] = useState("");
    const [AgroProduct_picture_url, setAgroProductPictureUrl] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAgroProduct = async () => {
            const res = await axios .get(`/api/agroProducts/${id}`) 
            console.log(res.data);
            setData(res.data);

            setAgroProductName(res.data.p_name);
            setAgroProductPrice(res.data.p_price);
            setAgroProductDiscount(res.data.p_discount);
            setAgroProductDescription(res.data.p_description);
            setAgroProductStatus(res.data.p_status);
            setAgroProductPictureUrl(res.data.p_image);
        };
        getAgroProduct();
    }, [id]);

    //setting current image url in update form
    const [image, setImage] = useState(data.p_image);

    //handle image upload
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

  const handleUpdate = async () => {
    console.log("Update AgroProduct");

    try {
      await axios
        .patch(`/api/agroProducts/${id}`, {
          p_name : AgroProduct_name,
          p_image : image,
          p_price : AgroProduct_price,
          p_discount : AgroProduct_discount,
          p_description : AgroProduct_description,
          p_status : AgroProduct_status,
        })
        .then((res) => {
          console.log("Update AgroProduct added", res.data);
          navigate("/admin/agro-products");
        });
    } catch (error) {
      setError(error.message);
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
                    <h3 className="mb-0">Update Agro Product</h3>
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
                            defaultValue={data.p_name}
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
                            defaultValue={data.p_image}
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
                            defaultValue={data.p_price}
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
                            defaultValue={data.p_discount}
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
                            defaultValue={data.p_status}
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
                        defaultValue={data.p_description}
                        rows="4"
                        type="textarea"
                        onChange={(e) => {
                          setAgroProductDescription(e.target.value);
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

export default UpdateAgroProduct;
