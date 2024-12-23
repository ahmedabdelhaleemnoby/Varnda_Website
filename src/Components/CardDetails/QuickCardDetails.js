import React, { useEffect } from "react";
import Slider from "react-slick";
import { Container, Row, Col, Button } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CardDetails.css";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ShowFilterToUser from "../Filters/ShowFilterToUser";
import usePageSEO from "../../hooks/usePageSEO";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

const QuickCardDetails = ({ propertyDetails, relatedProperties }) => {
  const currentUrl = window.location.href;
  usePageSEO({
    title: "فارندا - Varnda",
    img: propertyDetails.property.images[0].image,
    url: currentUrl,
  });

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };

  function stripHtml(html) {
    let temporalDivElement = document.createElement("div");
    temporalDivElement.innerHTML = html;
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
  }

  function truncateText(text, maxLength) {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  }

  return (
    <>
      <div className="details-container mt-5" dir="rtl">
        <Container>
          <Row className="mb-4">
            <Col xs={12} lg={8} style={{ position: "relative" }}>
              {propertyDetails.property.images.length > 1 ? (
                <Slider {...sliderSettings}>
                  {propertyDetails.property.images.map((image, index) => (
                    <div key={index} style={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img
                        src={image.image}
                        alt={`Slide ${index}`}
                        className="img-fluid"
                        style={{
                          maxHeight: "500px",
                          maxWidth: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div key={100} style={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img
                    src={propertyDetails.property.images[0].image}
                    alt={`صور الاعلان `}
                    className="img-fluid"
                    style={{
                      maxHeight: "500px",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
              <Col xs={12} lg={12} className="details">
                <Row className="mb-3">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(propertyDetails.property.details_ar),
                    }}
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "rgb(72, 72, 72)",
                    }}
                  />
                </Row>
                <h3 className="mb-2" style={{ color: "#0d6efd" }}>
                  تواصل مع صاحب الاعلان:
                </h3>
                <Row>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <a href={`tel:+2${propertyDetails.phone}`}>
                      <Button variant="primary" className="m-2 btn-lg">
                        <FontAwesomeIcon icon={faPhone} /> اتصل
                      </Button>
                    </a>
                    <Button
                      variant="secondary"
                      className="m-2 btn-lg"
                      onClick={() => {
                        const mailtoLink = `mailto:${propertyDetails.email}?subject=${encodeURIComponent(
                          "عقار على فارندا"
                        )}&body=${encodeURIComponent(
                          `الرقم التعريفى للاعلان: ${propertyDetails.id}`
                        )}`;
                        window.location.href = mailtoLink;
                      }}
                    >
                      <FontAwesomeIcon icon={faEnvelope} /> الإيميل
                    </Button>
                    <a
                      href={`https://api.whatsapp.com/send?phone=2${propertyDetails.whats_phone}&text=${encodeURIComponent(
                        "مرحباً، أنا مهتم بعقارك الموجود على فارندا.: "
                      )}${encodeURIComponent(
                        ` http://varnda.com/property/${encodeURIComponent(propertyDetails.slug)}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="success" className="m-2 btn-lg">
                        <FontAwesomeIcon icon={faWhatsapp} /> واتساب
                      </Button>
                    </a>
                  </div>
                </Row>
              </Col>
            </Col>

            {/* Existing ShowFilterToUser Component */}
            <Col xs={12} lg={4} dir="rtl">
              {/* Add Related Properties Section */}
              {relatedProperties && relatedProperties.length > 0 && (
                <Container>
                  <h4 className="my-3 h4">اعلانات مشابهة</h4>
                  <Col>
                    {relatedProperties.map((property, index) => {
                      const imageSrc =
                        property.primary_picture ||
                        (property.images &&
                          property.images[0] &&
                          property.images[0].image) ||
                        "placeholder.jpg";
                      const title =
                        stripHtml(property["Arabic Name"] || property["details_ar"] || "بدون عنوان");
                      const truncatedTitle = truncateText(title, 100);
                      const address = property.full_address || "";

                      return (
                        <Col md={12} key={index} className="mb-4">
                          <Link to={`/property/${property.slug}`}>
                            <div className="related-property-card">
                              <img
                                src={imageSrc}
                                alt={truncatedTitle}
                                className="img-fluid"
                                style={{
                                  width: "100%",
                                  height: "200px",
                                  objectFit: "cover",
                                }}
                              />
                              <h5 className="mt-2">{truncatedTitle}</h5>
                              <p>{address}</p>
                            </div>
                          </Link>
                        </Col>
                      );
                    })}
                  </Col>
                </Container>
              )}
              <ShowFilterToUser
                type={propertyDetails.property.Type}
                gov={propertyDetails.property.governorate}
                city={propertyDetails.property.city}
                region={propertyDetails.property.region}
                compound={propertyDetails.property.compound}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default QuickCardDetails;
