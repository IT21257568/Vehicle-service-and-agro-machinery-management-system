import { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardImg,
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

const UpdateSparePart= () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const navigate = useNavigate();

    //get sparePart id from url
    const { id } = useParams();

    // image upload progress state
    const [uploadProgress, setUploadProgress] = useState(0);

    // form states
    const [data, setData] = useState([]);
    const [SparePart_name, setSparePartName] = useState("");
    const [SparePart_price, setSparePartPrice] = useState("");
    const [SparePart_discount, setSparePartDiscount] = useState("");
    const [SparePart_description, setSparePartDescription] = useState("");
    const [SparePart_status, setSparePartStatus] = useState("");
    const [SparePart_picture_url, setSparePartPictureUrl] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const getSparePart = async () => {
            const res = await axios .get(`/api/spareParts/${id}`) 
            console.log(res.data);
            setData(res.data);

            setSparePartName(res.data.sp_name);
            setSparePartPrice(res.data.sp_price);
            setSparePartDiscount(res.data.sp_discount);
            setSparePartDescription(res.data.sp_description);
            setSparePartStatus(res.data.sp_status);
            setSparePartPictureUrl(res.data.sp_image);
        };
        getSparePart();
    }, [id]);

    //setting current image url in update form
    const [image, setImage] = useState(data.sp_image);

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
    console.log("Update sparePart");

    try {
      await axios
        .patch(`/api/spareParts/${id}`, {
          sp_name : SparePart_name,
          sp_image : image,
          sp_price : SparePart_price,
          sp_discount : SparePart_discount,
          sp_description : SparePart_description,
          sp_status : SparePart_status,
        })
        .then((res) => {
          console.log("Update sparePart added", res.data);
          navigate("/admin/spare-parts");
        });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid style={{marginBottom: '3rem'}}>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Update Spare Part</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Spare part Details
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username">
                            Spare Part Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            defaultValue={data.sp_name}
                            placeholder="Enter spare part Name"
                            type="text"
                            onChange={(e) => {
                              setSparePartName(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup className="d-flex flex-column">
                          <label
                            className="form-control-label"
                            htmlFor="input-email">
                            Spare Part Picture
                          </label> <br></br>
                          <Media className="align-items-center">
                          <span>
                            <CardImg
                              height="50rem"
                              width="100%"
                              src={data.sp_image}
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
                              src={image}
                            />
                            </span>
                            : Updated Picture Will Appear Here
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
                            Spare Part Price
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data.sp_price}
                            id="input-first-name"
                            placeholder="Enter spare part price"
                            type="number"
                            onChange={(e) => {
                              setSparePartPrice(e.target.value);
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
                            defaultValue={data.sp_discount}
                            id="input-first-name"
                            placeholder="Enter spare part discount"
                            type="number"
                            onChange={(e) => {
                              setSparePartDiscount(e.target.value);
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
                            defaultValue={data.sp_status}
                          >
                            <DropdownToggle caret>
                              {SparePart_status ? SparePart_status : "Select Status"}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                value="Available"
                                onClick={(e) => {
                                  setSparePartStatus(e.target.value);
                                }}
                              >
                                Available
                              </DropdownItem>
                              <DropdownItem
                                value="Out of Stock"
                                onClick={(e) => {
                                  setSparePartStatus(e.target.value);
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
                        placeholder="A brief description about the vacancy"
                        defaultValue={data.sp_description}
                        rows="4"
                        type="textarea"
                        onChange={(e) => {
                          setSparePartDescription(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <Button color="primary" onClick={handleUpdate} >
                      Save Changes
                    </Button>
                    <Button
                      color="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/admin/spare-parts");
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

export default UpdateSparePart;
