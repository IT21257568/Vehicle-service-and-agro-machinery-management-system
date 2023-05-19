import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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
  Media,
  CardImg,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const UpdatePromotion = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // get promotion id from url
  const { id } = useParams();

  const navigate = useNavigate();

  //image upload progress load
  const [uploadProgress, setUploadProgress] = useState(0);

  // form states
  const [data, setData] = useState([]);
  const [promotionTitle, setPromotionTitle] = useState("");
  const [promotionCode, setPromotionCode] = useState("");
  const [promotionDiscount, setPromotionDiscount] = useState("");
  const [promotionDescription, setPromotionDescription] = useState("");
  const [promotionStartDate, setPromotionStartDate] = useState("");
  const [promotionEndDate, setPromotionEndDate] = useState("");
  const [promotionPictureUrl, SetPromotionPictureUrl] = useState("");

  useEffect(() => {
    const getPromotion = async () => {
      const res = await axios.get(`/api/promotions/${id}`);
      console.log(res.data);
      setData(res.data);

      setPromotionTitle(res.data.promo_title);
      setPromotionCode(res.data.promo_code);
      setPromotionDiscount(res.data.promo_discount);
      setPromotionDescription(res.data.promo_description);
      setPromotionStartDate(res.data.promo_startDate);
      setPromotionEndDate(res.data.promo_endDate);
      SetPromotionPictureUrl(res.data.promo_picture_url);
    };
    getPromotion();
  }, [id]);

  //setting current image url in update form
  const [image, setImage] = useState(data.promo_picture_url);

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
    console.log("Promotion updated");
    toast.success("Promotion updated successfully");

    axios
      .patch(`/api/promotions/${id}`, {
        promo_title: promotionTitle,
        promo_code: promotionCode,
        promo_discount: promotionDiscount,
        promo_description: promotionDescription,
        promo_startDate: promotionStartDate,
        promo_endDate: promotionEndDate,
        promo_picture_url: image,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/admin/promotions");
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
                    <h3 className="mb-0">Update Promotion</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Promotion Title
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-title"
                          >
                            Promotion Title
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="update-title"
                            defaultValue={data.promo_title}
                            placeholder="Promotion Title"
                            type="text"
                            required="true"
                            onChange={(e) => {
                              setPromotionTitle(e.target.value);
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
                            Promotion Code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="update-promo-code"
                            defaultValue={data.promo_code}
                            placeholder="enter promo code"
                            required="true"
                            type="text"
                            onChange={(e) => {
                              setPromotionCode(e.target.value);
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
                            htmlFor="input-discount"
                          >
                            Promotion discount
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="update-discount"
                            defaultValue={data.promo_discount}
                            placeholder="select discount"
                            required="true"
                            type="number"
                            onChange={(e) => {
                              setPromotionDiscount(e.target.value);
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
                            htmlFor="input-start-date"
                          >
                            Starting Date
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="update-start-date"
                            defaultValue={data.promo_startDate}
                            required="true"
                            type="date"
                            onChange={(e) => {
                              setPromotionStartDate(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-end-date"
                          >
                            Ending Date
                          </label>
                          <Input
                            className="form-control-alternative"
                            
                            id="input-end-date"
                            defaultValue={data.promo_endDate}
                            required="true"
                            type="date"
                            onChange={(e) => {
                              setPromotionEndDate(e.target.value);
                            }}
                          />
                        </FormGroup>
                      </Col>
                     </Row>
                     <Row>
                     <Col lg="6">
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Change Picture
                          </label> <br></br>
                          <Media className="align-items-center">
                          <span>
                            <CardImg
                              height="50rem"
                              width="100%"
                              alt="Technician Picture"
                              src={data.promo_picture_url}
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
                            required="true"
                            
                          />
                          {uploadProgress > 0 && (
                            <div>Uploading... {uploadProgress}%</div>
                          )}
                        
                      </Col>
                    </Row>
                  </div>

                   {/* Description */}
                  <div className="pl-lg-4" style={{marginTop:'1.8rem'}}>
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-description"
                      >
                      Promotion Description
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A brief description about the promotion"
                        defaultValue={data.promo_description}
                        required="true"
                        rows="4"
                        type="textarea"
                        onChange={(e) => {
                          setPromotionDescription(e.target.value);
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
                        navigate("/admin/promotions");
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

export default UpdatePromotion;