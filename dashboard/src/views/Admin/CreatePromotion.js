import { useState, useEffect } from "react";
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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

const CreatePromotion = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const navigate = useNavigate();

  // form states
  const [data, setData] = useState([]);
  const [promoTitle, setPromoTitle] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState("");
  const [promoDiscription, setPromoDescription] = useState("");
  const [promoStartDate, setPromoStartDate] = useState("");
  const [promoEndDate, setPromoEndDate] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    try {
      await axios
        .post("/api/promotions", {
            promo_title : promoTitle,
            promo_code : promoCode,
            promo_discount : promoDiscount,
            promo_description : promoDiscription,
            promo_startDate : promoStartDate,
            promo_endDate : promoEndDate,
        })
        .then((res) => {
          console.log("New promotion added", res.data);
          setPromoTitle("");
          setPromoCode("");
          setPromoDiscount("");
          setPromoDescription("");
          setPromoStartDate("");
          setPromoEndDate("");
          setError(null);
          navigate("/admin/vacancies");
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
                    <h3 className="mb-0">Create Promotion</h3>
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
                            id="input-title"
                            placeholder="Promotion Title"
                            type="text"
                            onChange={(e) => {
                              setPromoTitle(e.target.value);
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
                            id="input-promo-code"
                            placeholder="enter promo code"
                            type="text"
                            onChange={(e) => {
                              setPromoCode(e.target.value);
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
                            
                            id="input-discount"
                            placeholder="select discount"
                            type="number"
                            onChange={(e) => {
                              setPromoDiscount(e.target.value);
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
                            id="input-start-date"
                            
                            type="date"
                            onChange={(e) => {
                              setPromoStartDate(e.target.value);
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
                           
                            type="date"
                            onChange={(e) => {
                              setPromoEndDate(e.target.value);
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
                        rows="4"
                        type="textarea"
                        onChange={(e) => {
                          setPromoDescription(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <Button color="primary" onClick={handleSubmit}>
                      Create
                    </Button>
                    <Button
                      color="warning"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/admin/vacancies");
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

export default CreatePromotion;
