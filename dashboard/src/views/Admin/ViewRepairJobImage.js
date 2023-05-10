import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
  Row,
  Button,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImg,
  Col,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

const ViewRepairJobImage = () => {
  // get Technician id from url
  const { id } = useParams();

  // states
  const [data, setData] = useState([]);
  const [viewImage, setDamageImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [repair_job_picture_url, SetRepairJobPictureUrl] = useState("");
  const [error, setError] = useState(null);

  // set visible rows
  const [visible, setVisible] = useState(10);

  const navigate = useNavigate();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  // retrieve all vacancies from database
  useEffect(() => {
    const fetchRepairJob = async () => {
      try {
        const res = await axios.get(`/api/damageValuation/${id}`);
        setDamageImage(res.data);
        setIsLoading(false);
        SetRepairJobPictureUrl(res.data.damage_picture_url);
        setData(res.data);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchRepairJob();
  }, [id]);

  //setting current image url in Update form
  const [image, setImage] = useState(data.damage_picture_url);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Light Table */}
        <Row>
          <div className="col">
            <Card className="shadow" color="lighter">
              <CardHeader
                className="border-0"
                style={{ marginBottom: "1.8rem" }}
              >
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">All Repair Jobs</h3>
                  </div>
                
                </Row>
              </CardHeader>

              <Container
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Row>
                  <Card
                    key={data._id}
                    style={{
                      width: "44rem",
                      height: "30rem",
                      borderRadius: "0.2rem",
                      margin: "0.8rem",
                    }}
                  >
                    <CardImg
                      width="100%"
                      alt="Sample"
                      height="83%"
                      src={data.damage_picture_url}
                    />
                    <CardBody
                    style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Row>
                        <Button
                          color="warning"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/admin/view-repair-jobs");
                          }}
                        >
                          Close
                        </Button>
                      </Row>
                    </CardBody>
                  </Card>
                </Row>
              </Container>

              <CardFooter className="py-4" style={{ marginTop: "1.8rem" }}>
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#pablo" onClick={showMoreItems}>
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ViewRepairJobImage;
