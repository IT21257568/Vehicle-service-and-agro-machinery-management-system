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

const UpdatePromotion = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // get vacancy id from url
  const { id } = useParams();

  const navigate = useNavigate();

  // form states
  const [data, setData] = useState([]);
  const [promotionTitle, setPromotionTitle] = useState("");
  const [promotionCode, setPromotionCode] = useState("");
  const [promotionDiscount, setPromotionDiscount] = useState("");
  const [promotionDescription, setPromotionDescription] = useState("");
  const [promotionStartDate, setPromotionStartDate] = useState("");
  const [promotionEndDate, setPromotionEndDate] = useState("");

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
    };
    getPromotion();
  }, [id]);

  const handleUpdate = () => {
    console.log("lol");

    axios
      .patch(`/api/promotions/${id}`, {
        promo_title: promotionTitle,
        promo_code: promotionCode,
        promo_discount: promotionDiscount,
        promo_description: promotionDescription,
        promo_startDate: promotionStartDate,
        promo_endDate: promotionEndDate,
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
                            type="date"
                            onChange={(e) => {
                              setPromotionEndDate(e.target.value);
                            }}
                          />
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
                      Promotion Description
                      </label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A brief description about the promotion"
                        defaultValue={data.promo_description}
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