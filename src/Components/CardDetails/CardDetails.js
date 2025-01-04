import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Container, Row, Col, Button } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CardDetails.css";
import { Link } from "react-router-dom";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import VideoEmbed from "../../utility/VideoEmbed/VideoEmbed";
import ShowFilterToUser from "../Filters/ShowFilterToUser";
import usePageSEO from "../../hooks/usePageSEO";
import DOMPurify from "dompurify";

const CardDetails = ({ propertyDetails, relatedProperties }) => {
  const currentUrl = window.location.href;
  usePageSEO({
    title: propertyDetails.property["Arabic Name"],
    img: propertyDetails.property.primary_picture,
    url: currentUrl,
    canonical: currentUrl,
  });

  const position = [
    propertyDetails.property.latitude,
    propertyDetails.property.longitude,
  ];
  const myIcon = new L.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    shadowSize: [41, 41],
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

  const [subCategoryName, setSubCategoryName] = useState("");
  useEffect(() => {
    setSubCategoryName(
      propertyDetails.property["Sub Category"] === "فيلا منفصلة" ||
      propertyDetails.property["Sub Category"] === "تاون هاوس" ||
      propertyDetails.property["Sub Category"] === "توين هاوس"
    );
  }, [propertyDetails]);
  function stripHtml(html) {
    let temporalDivElement = document.createElement("div");
    temporalDivElement.innerHTML = html;
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
  }
  return (
    <>
      <div
        className="details-container mt-5"
        style={{ background: "#f7f7f7" }}
        dir="rtl"
      >
        <Container>
          <Row className="mb-4">
            <Col md={12} lg={8}>
              <Col style={{ position: "relative" }}>
                <Row>
                  <Col className="p-4" style={{ background: "white" }}>
                    <div>
                      <p style={{ color: "#1976d2", fontSize: "25px" }}>
                        {propertyDetails.property["Arabic Name"]}
                      </p>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <span
                        style={{
                          color: "#1976d2",
                          fontSize: "28px",
                          fontWeight: "bold",
                          marginLeft: "5px",
                          position: "relative",
                        }}
                      >
                        {Number(propertyDetails.property.price).toLocaleString(
                          "ar-EG"
                        )}
                        {propertyDetails.property.Discount && (
                          <span
                            style={{
                              position: "absolute",
                              right: "-60px",
                              top: "-10px",
                              fontSize: "13px",
                              color: "white",
                              background: "#1976d3d9",
                              borderRadius: "5px",
                              padding: "2px 3px",
                            }}
                          >
                            {" "}
                            خصم{propertyDetails.property.Discount}%
                          </span>
                        )}
                      </span>
                      <span>ج.م</span>
                    </div>
                  </Col>
                </Row>

                <Row style={{ background: "white" }}>
                  {propertyDetails.property.images.length > 0 ? (
                    <Slider {...sliderSettings}>
                      <div key={100} style={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img
                          src={propertyDetails.property.primary_picture}
                          alt={`صوره الاعلان الرئيسيه`}
                          className="img-fluid"
                          style={{
                            maxHeight: "500px",
                            maxWidth: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>
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
                        src={propertyDetails.property.primary_picture}
                        alt={`صوره الاعلان الرئيسيه`}
                        className="img-fluid w-100"
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  )}
                </Row>

                <Row className="p-4" style={{ background: "white" }}>
                  <h4 className="mb-4" style={{ color: "#1976d2" }}>
                    شرح العقار
                  </h4>
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


                <Row className="p-4 mt-3" style={{ background: "white" }}>
                  <Col lg={12}>
                    <h4 className="mb-3" style={{ color: "#1976d2" }}>
                      تفاصيل العقار
                    </h4>
                  </Col>
                  <Col lg={12}>
                    <table className="w-100" style={{ color: "#212529" }}>
                      <tbody>
                        <tr>
                          <th
                            className="w-50 p-3"
                            style={{ borderTop: "1px solid #dee2e6" }}
                          >
                            العقار
                          </th>
                          <th className="w-50 p-3 leftTablePart">
                            {propertyDetails.property.Type === "sale"
                              ? "للبيع"
                              : "للايجار"}
                          </th>
                        </tr>
                        <tr>
                          <th
                            className="w-50 p-3"
                            style={{ borderTop: "1px solid #dee2e6" }}
                          >
                            نوع العقار
                          </th>
                          <th className="w-50 p-3 leftTablePart">
                            {propertyDetails.property["Sub Category"]}
                          </th>
                        </tr>
                        <tr>
                          <th
                            className="w-50 p-3"
                            style={{ borderTop: "1px solid #dee2e6" }}
                          >
                            العقار من
                          </th>
                          <th className="w-50 p-3 leftTablePart">
                            {propertyDetails.advertiser_type}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>

                <Row className="p-4 mt-3" style={{ background: "white" }}>
                  <Col lg={12}>
                    <h4 className="mb-3" style={{ color: "#1976d2" }}>
                      تفاصيل أساسية
                    </h4>
                  </Col>
                  <Col lg={12}>
                    <table className="w-100" style={{ color: "#212529" }}>
                      <tbody>
                        <tr>
                          <th
                            className="w-50 p-3"
                            style={{ borderTop: "1px solid #dee2e6" }}
                          >
                            المساحة
                          </th>
                          <th className="w-50 p-3 leftTablePart">
                            {propertyDetails.property.area} متر مربع
                          </th>
                        </tr>
                        {(subCategoryName ||
                          propertyDetails.property.Category === "مبانى" ||
                          propertyDetails.property.Category === "منازل") &&
                          propertyDetails.property.floors != null && (
                            <tr>
                              <th
                                className="w-50 p-3"
                                style={{ borderTop: "1px solid #dee2e6" }}
                              >
                                عدد الأدوار
                              </th>
                              <th className="w-50 p-3 leftTablePart">
                                {propertyDetails.property.floors}
                              </th>
                            </tr>
                          )}

                        {propertyDetails.property.floor_number != null &&
                          !subCategoryName && (
                            <tr>
                              <th
                                className="w-50 p-3"
                                style={{ borderTop: "1px solid #dee2e6" }}
                              >
                                رقم الدور
                              </th>
                              <th className="w-50 p-3 leftTablePart">
                                {propertyDetails.property.floor_number === 0
                                  ? "دور ارضى"
                                  : propertyDetails.property.floor_number === 10
                                    ? "+10"
                                    : propertyDetails.property.floor_number}
                              </th>
                            </tr>
                          )}

                        <tr>
                          <th
                            className="w-50 p-3"
                            style={{ borderTop: "1px solid #dee2e6" }}
                          >
                            عدد الغرف
                          </th>
                          <th className="w-50 p-3 leftTablePart">
                            {propertyDetails.property.rooms === 10
                              ? "+10"
                              : propertyDetails.property.rooms}
                          </th>
                        </tr>
                        <tr>
                          <th
                            className="w-50 p-3"
                            style={{ borderTop: "1px solid #dee2e6" }}
                          >
                            عدد الحمامات
                          </th>
                          <th className="w-50 p-3 leftTablePart">
                            {propertyDetails.property.bathrooms === 6
                              ? "+6"
                              : propertyDetails.property.bathrooms}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>

                <Row className="p-4 mt-3" style={{ background: "white" }}>
                  <Col lg={12}>
                    <h4 className="mb-3" style={{ color: "#1976d2" }}>
                      السعر
                    </h4>
                  </Col>
                  <Col lg={12}>
                    <table className="w-100" style={{ color: "#212529" }}>
                      <tbody>
                        <tr>
                          <th
                            className="w-50 p-3"
                            style={{ borderTop: "1px solid #dee2e6" }}
                          >
                            السعر و الاستلام
                          </th>
                          <th className="w-50 p-3 leftTablePart">
                            {Number(
                              propertyDetails.property.price
                            ).toLocaleString("ar-EG")}{" "}
                            ج.م
                          </th>
                        </tr>
                        {propertyDetails.property.Type === "sale" && (
                          <>
                            {propertyDetails.property.payment_method && (
                              <tr>
                                <th
                                  className="w-50 p-3"
                                  style={{ borderTop: "1px solid #dee2e6" }}
                                >
                                  طريقة الدفع
                                </th>
                                <th className="w-50 p-3 leftTablePart">
                                  {propertyDetails.property.payment_method}
                                </th>
                              </tr>
                            )}
                            {propertyDetails.property.deliver_date && (
                              <tr>
                                <th
                                  className="w-50 p-3"
                                  style={{ borderTop: "1px solid #dee2e6" }}
                                >
                                  تاريخ التسليم
                                </th>
                                <th className="w-50 p-3 leftTablePart">
                                  {propertyDetails.property.deliver_date === "0"
                                    ? "فورى"
                                    : propertyDetails.property.deliver_date}
                                </th>
                              </tr>
                            )}
                            {propertyDetails.property.legal_papers && (
                              <tr>
                                <th
                                  className="w-50 p-3"
                                  style={{ borderTop: "1px solid #dee2e6" }}
                                >
                                  الأوراق القانونيه
                                </th>
                                <th className="w-50 p-3 leftTablePart">
                                  {propertyDetails.property.legal_papers}
                                </th>
                              </tr>
                            )}
                            {propertyDetails.property.finishing_type && (
                              <tr>
                                <th
                                  className="w-50 p-3"
                                  style={{ borderTop: "1px solid #dee2e6" }}
                                >
                                  مرحلة التشطيب
                                </th>
                                <th className="w-50 p-3 leftTablePart">
                                  {propertyDetails.property.finishing_type}

                                  {(propertyDetails.property.finishing_type ===
                                    "تشطيب بالأجهزة" ||
                                    propertyDetails.property.finishing_type ===
                                    "تشطيب كامل") && (
                                      <p
                                        style={{
                                          color: "#888",
                                          fontWeight: "700",
                                          margin: "0px",
                                        }}
                                      >
                                        {" "}
                                        (
                                        {propertyDetails.property.Furnished
                                          ? "مفروشه"
                                          : "غير مفروشه"}
                                        ){" "}
                                      </p>
                                    )}
                                </th>
                              </tr>
                            )}
                          </>
                        )}

                        {propertyDetails.property.Type === "rent" && (
                          <>
                            {propertyDetails.property.renting_type && (
                              <tr>
                                <th
                                  className="w-50 p-3"
                                  style={{ borderTop: "1px solid #dee2e6" }}
                                >
                                  نوع الايجار
                                </th>
                                <th className="w-50 p-3 leftTablePart">
                                  {propertyDetails.property.renting_type === "1"
                                    ? "شهرى"
                                    : propertyDetails.property.renting_type === "3"
                                      ? "ربع سنوى"
                                      : propertyDetails.property.renting_type === "6"
                                        ? "نصف سنوى"
                                        : propertyDetails.property.renting_type ===
                                          "12"
                                          ? "سنوى"
                                          : ""}
                                </th>
                              </tr>
                            )}
                          </>
                        )}
                      </tbody>
                    </table>
                  </Col>
                </Row>

                <Row className="p-4 mt-3" style={{ background: "white" }}>
                  <Col lg={12}>
                    <h4 className="mb-3" style={{ color: "#1976d2" }}>
                      الموقع
                    </h4>
                  </Col>
                  <Col lg={12}>
                    <table className="w-100" style={{ color: "#212529" }}>
                      <tbody>
                        {propertyDetails.property.governorate && (
                          <tr>
                            <th
                              className="w-50 p-3"
                              style={{ borderTop: "1px solid #dee2e6" }}
                            >
                              المحافظة
                            </th>
                            <th className="w-50 p-3 leftTablePart">
                              {propertyDetails.governorate_url ? (
                                <Link to={`/${propertyDetails.governorate_url}`} key={propertyDetails.governorate_url}>
                                  {propertyDetails.property.governorate}
                                </Link>
                              )
                                : propertyDetails.property.governorate}

                            </th>
                          </tr>
                        )}
                        {propertyDetails.property.city && (
                          <tr>
                            <th
                              className="w-50 p-3"
                              style={{ borderTop: "1px solid #dee2e6" }}
                            >
                              المدينة
                            </th>
                            <th className="w-50 p-3 leftTablePart">
                              {propertyDetails.city_url && propertyDetails.governorate_url ? (
                                <Link to={`/${propertyDetails.governorate_url + '/' + propertyDetails.city_url}`} key={propertyDetails.city_url}>
                                  {propertyDetails.property.city}
                                </Link>
                              ) : (
                                propertyDetails.property.city
                              )
                              }
                            </th>
                          </tr>
                        )}
                        {propertyDetails.property.region && (
                          <tr>
                            <th
                              className="w-50 p-3"
                              style={{ borderTop: "1px solid #dee2e6" }}
                            >
                              المنطقة
                            </th>
                            <th className="w-50 p-3 leftTablePart">
                              {propertyDetails.region_url && propertyDetails.city_url && propertyDetails.governorate_url ? (
                                <Link to={`/${propertyDetails.governorate_url + '/' + propertyDetails.city_url + '/' + propertyDetails.region_url}`} key={propertyDetails.region_url}>
                                  {propertyDetails.property.region}
                                </Link>
                              ) : (
                                propertyDetails.property.region
                              )
                              }
                            </th>
                          </tr>
                        )}
                        {propertyDetails.property.street && (
                          <tr>
                            <th
                              className="w-50 p-3"
                              style={{ borderTop: "1px solid #dee2e6" }}
                            >
                              الشارع
                            </th>
                            <th className="w-50 p-3 leftTablePart">
                              {propertyDetails.region_url && propertyDetails.city_url  && propertyDetails.street_url ? (
                                <Link to={`/${propertyDetails.governorate_url + '/' + propertyDetails.city_url + '/' + propertyDetails.street_url}`} key={propertyDetails.street_url}>
                                  {propertyDetails.property.region}
                                </Link>
                              ) : propertyDetails.property.street}
                            </th>
                          </tr>
                        )}
                        {propertyDetails.property.compound_name && (
                          <tr>
                            <th
                              className="w-50 p-3"
                              style={{ borderTop: "1px solid #dee2e6" }}
                            >
                              الكومباوند
                            </th>
                            <th className="w-50 p-3 leftTablePart">
                              { propertyDetails.compound_url && propertyDetails.governorate_url && propertyDetails.city_url   ? (
                                  <Link to={`/${propertyDetails.governorate_url + '/' + propertyDetails.city_url + '/' + propertyDetails.compound_url}`} key={propertyDetails.compound_url}>
                                  {propertyDetails.property.compound_name}
                                </Link>
                              ) : propertyDetails.property.compound_name}
                            </th>
                          </tr>
                        )}
                        {propertyDetails.property.mall_name && (
                          <tr>
                            <th
                              className="w-50 p-3"
                              style={{ borderTop: "1px solid #dee2e6" }}
                            >
                              المول
                            </th>
                            <th className="w-50 p-3 leftTablePart">
                              { propertyDetails.mall_url && propertyDetails.governorate_url && propertyDetails.city_url  ? (
                                <Link to={`/${propertyDetails.governorate_url + '/' + propertyDetails.city_url + '/' + propertyDetails.mall_url}`} key={propertyDetails.mall_url}>
                                  {propertyDetails.property.mall_name}
                                </Link>
                              ) :
                              propertyDetails.property.mall_name}
                            </th>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </Col>
                </Row>

                <Row className="p-2 mt-3" style={{ background: "white" }}>
                  <h4 className="mb-3" style={{ color: "#1976d2" }}>
                    تواصل مع صاحب الاعلان
                  </h4>
                  <Col lg={12}>
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
                          const mailtoLink = `mailto:${propertyDetails.email
                            }?subject=${encodeURIComponent(
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
                        href={`https://api.whatsapp.com/send?phone=2${propertyDetails.whats_phone
                          }&text=${encodeURIComponent(
                            "مرحباً، أنا مهتم بعقارك الموجود على فارندا.: "
                          )}${encodeURIComponent(`http://varnda.com/property/${encodeURIComponent(propertyDetails.slug)}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="success" className="m-2 btn-lg">
                          <FontAwesomeIcon icon={faWhatsapp} /> واتساب
                        </Button>
                      </a>
                    </div>
                  </Col>
                </Row>

                {propertyDetails.property.video_link && (
                  <Row className="p-3 mt-3" style={{ background: "white" }}>
                    <h4 className="mb-3" style={{ color: "#1976d2" }}>
                      <a
                        href={propertyDetails.property.video_link}
                        rel="noreferrer"
                        target="_blank"
                      >
                        فيديو للعقار
                      </a>
                    </h4>
                    <VideoEmbed
                      videoUrl={propertyDetails.property.video_link}
                    />
                  </Row>
                )}

                {propertyDetails.property.facilities.length > 0 && (
                  <Row className="p-3 mt-3" style={{ background: "white" }}>
                    <h4 className="mb-3" style={{ color: "#1976d2" }}>
                      المرافق
                    </h4>
                    <ul className="list-group mb-3">
                      {propertyDetails.property.facilities.map(
                        (advantage, index) => (
                          <li
                            key={index}
                            className="list-group-item extraTable"
                          >
                            {advantage}
                          </li>
                        )
                      )}
                    </ul>
                  </Row>
                )}

                {propertyDetails.property.facilities.length > 0 && (
                  <Row className="p-3 mt-3" style={{ background: "white" }}>
                    <h4 className="mb-3" style={{ color: "#1976d2" }}>
                      المميزات
                    </h4>
                    <ul className="list-group mb-3">
                      {propertyDetails.property.features.map(
                        (advantage, index) => (
                          <li
                            key={index}
                            className="list-group-item extraTable"
                          >
                            {advantage}
                          </li>
                        )
                      )}
                    </ul>
                  </Row>
                )}

                {propertyDetails.property.services.length > 0 && (
                  <Row className="p-3 mt-3" style={{ background: "white" }}>
                    <h4 className="mb-3" style={{ color: "#1976d2" }}>
                      الخدمات
                    </h4>
                    <ul className="list-group mb-3">
                      {propertyDetails.property.services.map(
                        (advantage, index) => (
                          <li
                            key={index}
                            className="list-group-item extraTable"
                          >
                            {advantage}
                          </li>
                        )
                      )}
                    </ul>
                  </Row>
                )}

                {propertyDetails.property.devices.length > 0 && (
                  <Row className="p-3 mt-3" style={{ background: "white" }}>
                    <h4 className="mb-3" style={{ color: "#1976d2" }}>
                      الأجهزه
                    </h4>
                    <ul className="list-group mb-3">
                      {propertyDetails.property.devices.map(
                        (advantage, index) => (
                          <li
                            key={index}
                            className="list-group-item extraTable"
                          >
                            {advantage}
                          </li>
                        )
                      )}
                    </ul>
                  </Row>
                )}

                {propertyDetails.property.accessories.length > 0 && (
                  <Row className="p-3 mt-3" style={{ background: "white" }}>
                    <h4 className="mb-3" style={{ color: "#1976d2" }}>
                      الملحقات
                    </h4>
                    <ul className="list-group mb-3">
                      {propertyDetails.property.accessories.map(
                        (advantage, index) => (
                          <li
                            key={index}
                            className="list-group-item extraTable"
                          >
                            {advantage}
                          </li>
                        )
                      )}
                    </ul>
                  </Row>
                )}
              </Col>
              <Col className="p-3 mt-3" style={{ background: "white" }}>
                <h4 className="mb-3" style={{ color: "#1976d2" }}>
                  العنوان بالكامل
                  <span
                    style={{
                      marginRight: "10px",
                      fontSize: "20px",
                      fontWeight: "400",
                      color: "#484848",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      style={{ marginLeft: "5px", color: "#1976d2" }}
                    />
                    {propertyDetails.property.full_address}
                  </span>
                </h4>
                <Col>
                  <MapContainer
                    center={position}
                    zoom={13}
                    scrollWheelZoom={true}
                    style={{ height: "400px", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position} icon={myIcon}>
                      <Popup>{propertyDetails.property.full_address}</Popup>
                    </Marker>
                  </MapContainer>
                </Col>
              </Col>
            </Col>

            <Col md={12} lg={4} dir="rtl">
              {/* Add Related Properties Section */}
              {relatedProperties && relatedProperties.length > 0 && (
                <Container>
                  <h4 className="my-3 h4">
                    اعلانات مشابهة
                  </h4>
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
                      const address = property.full_address || "";
                      const price = property.price || 0;

                      return (
                        <Col md={12} key={index} className="mb-2">
                          <Link to={`/property/${property.slug}`} className="related-property-card">
                            <div className="related-property-card">
                              <img
                                src={imageSrc}
                                alt={title}
                                className="img-fluid"
                                style={{
                                  width: "100%",
                                  height: "200px",
                                  objectFit: "cover",
                                }}
                              />
                              <h5 className="mt-2" style={{ color: "#333" , fontSize:"x-large" , marginTop:"10px" , fontWeight:"bold" }}>{title}</h5>
                              <p>{address}</p>
                              <p
                                style={{
                                  color: "#1976d2",
                                  fontSize: "28px",
                                  fontWeight: "bold",
                                  marginLeft: "5px",
                                  position: "relative",
                                  textAlign: "left",
                                }}
                              > {Number(price).toLocaleString("ar-EG")} ج.م </p>
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

export default CardDetails;


