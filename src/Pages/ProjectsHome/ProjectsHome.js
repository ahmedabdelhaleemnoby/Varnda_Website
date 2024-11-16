import React, { useEffect, useState } from "react";
import { Container, Button, Col, Row, Alert } from "react-bootstrap";
import api from "../../API/ApiLink";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import OverPage from "../../Components/OverPage/OverPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import usePageSEO from "../../hooks/usePageSEO";
import "./projectsHome.css"
export default function ProjectsHome() {

    // Set SEO settings
    usePageSEO({
      title: "المشروعات العقارية",
      description: "تعرّف على أبرز المشروعات العقارية التي تناسب احتياجاتك بمواقع مميزة وخطط سداد مريحة. احصل على فرصة الاستثمار الأمثل اليوم",
      keywords: ["المشروعات العقارية"],
    });
  const [overlay, setOverlay] = useState(false);
  const [allGov, setAllGov] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [allCompounds, setAllCompounds] = useState([]);
  const [formData, setFormData] = useState({
    gov: "",
    city: "",
  });

  // المحافظات
  useEffect(() => {
    const fetchAllGov = async () => {
      try {
        setOverlay(true);
        const response = await api.get("/getAllGovernoratesForHomepage");
        setAllGov(response.data.data);
      } catch (err) {
        setAllGov([]);
        console.log(err);
      } finally {
        setOverlay(false);
      }
    };
    fetchAllGov();
  }, []);
  // المدن
  useEffect(() => {
    const fetchAllCity = async () => {
      try {
        setOverlay(true);
        const response = await api.get(`/getGovCities/${formData.gov}`);
        setAllCities(response.data.data);
      } catch (err) {
        setAllCities([]);
        console.log(err);
      } finally {
        setOverlay(false);
      }
    };
    if (formData.gov) {
      fetchAllCity();
    }
  }, [formData.gov]);

  // المشروعات
  useEffect(() => {
    const fetchAllCompound = async () => {
      try {
        setOverlay(true);
        const response = await api.get(`/getCityCompounds/${formData.city}`);
        setAllCompounds(response.data.data);
      } catch (err) {
        setAllCompounds([]);
        console.log(err);
      } finally {
        setOverlay(false);
      }
    };
    if (formData.city) {
      fetchAllCompound();
    }
  }, [formData.city]);

  return (
    <>
      <Header />
      <Container className="mb-3">
        <h1 className="text-center title-page py-1 pb-2 container my-3">
          المشروعات العقارية
        </h1>

        {overlay ? (
          <OverPage />
        ) : (
          <>
            {/* المحافظات */}
            {allGov.length > 0 && !formData.gov && (
              <Row className="g-3 my-1">
                {allGov.map(
                  (gov) =>
                    gov.url && (
                      <Col sm={6} md={4} lg={3}  className="text-center">
                        <button
                        className="project-btn" 
                          onClick={() => {
                            setFormData({
                              ...formData,
                              gov: gov.url,
                            });
                          }}
                        >
                          {gov.name}
                        </button>
                      </Col>
                    )
                )}
              </Row>
            )}
            {/* المدن */}
            {allCities.length > 0 && !formData.city && (
              <>
                <Row className="g-3">
                  {allCities.map(
                    (city) =>
                      city.url && (
                        <Col md={6} lg={4} className="text-center" >
                          <button className="project-btn" onClick={() => {
                              setFormData({
                                ...formData,
                                city: city.url,
                              });
                            }}>
                          {city.name}
                          </button>
                        </Col>
                      )
                  )}
                  <div className="d-flex justify-content-end my-2">
                    <Button
                      style={{ direction: "ltr" }}
                      onClick={() => {
                        setAllCities([]);
                        setFormData({
                          ...formData,
                          gov: "",
                        });
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                      <span className="ms-2">الرجوع</span>
                    </Button>
                  </div>
                </Row>
              </>
            )}
            {/* المشروعات العقارية */}
            {allCompounds.length > 0 ? (
              <Row className="g-3 justify-content-center">
                {allCompounds.map(
                  (compound) =>
                    compound.url && (
                      <Col md={9} lg={8} className="text-center">
                        <Link
                          to={`/projects/${compound.url}`}
                          key={compound.url}
                          className="project-link"
                        >
                          <button className="project-btn">
                            {compound.name}
                          </button>
                        </Link>
                      </Col>
                    )
                )}
              </Row>
            ) :formData.city? 
              <Alert key="warning" className="text-center" variant="warning">
                لا يوجد مشروعات
              </Alert>
            :<></>}
            {formData.gov&&formData.city && (
              <div className="d-flex justify-content-end my-2">
                <Button
                  style={{ direction: "ltr" }}
                  onClick={() => {
                    setAllCompounds([]);
                    setFormData({
                      ...formData,
                      city: "",
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span className="ms-2">الرجوع</span>
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}
