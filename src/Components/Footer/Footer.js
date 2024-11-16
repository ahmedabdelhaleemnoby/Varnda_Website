import React from "react";
import "./Footer.css";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faInstagram,
  faPinterestP,
  faTwitter,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logo from "../../images/footer-logo.webp";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="footer py-5 mt-5">
      <Container fluid="md">
        <Row className="footer-row">
          <Col>
            <div className="icon-div">
              <p className="icon-text">فارندا</p>
              <img src={logo} alt="footer-icon" className="icon-img" />
            </div>
            <p className="footer-text">
              موقع فارندا يساعدك على بيع وشراء العقارات بسهولة بالإضافة إلى
              توفير معلومات أساسية لإتخاذ واحد من أهم القرارات الاستثمارية في
              حياتك.
            </p>
          </Col>

          {/* <Col md={6} className="d-flex justify-content-between align-items-center"> */}
          <Col>
            <div dir="rtl" className="footer-links mb-3">
              <Link to="/about-us" className="footer-link">
                <span className="footer-link-circle"></span>
                <span>نبذه عنا</span>
              </Link>
              <Link to="/contact-us" className="footer-link">
                <span className="footer-link-circle"></span>
                <span>اتصل بنا</span>
              </Link>
              <Link to="/privacy-policy" className="footer-link">
                <span className="footer-link-circle"></span>
                <span>سياسة الخصوصية</span>
              </Link>
              <Link to="/terms" className="ms-3 fs-5 footer-link">
                <span className="footer-link-circle"></span>
                <span>شروط الأستخدام</span>
              </Link>
            </div>

            <div className="icon-social-container">
              <Link to="https://youtube.com/@varndagreats?si=lE4Gv9qkzKEkSrvV" target="_blank" rel="noopener noreferrer" className="icon-social">
                <FontAwesomeIcon icon={faYoutube} />
              </Link>
              <Link to="https://www.instagram.com/varnda76" target="_blank" rel="noopener noreferrer" className="icon-social" >
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
              <Link to="https://x.com/varndacom" target="_blank" rel="noopener noreferrer" className="icon-social">
                <FontAwesomeIcon icon={faTwitter} />
              </Link>
              <Link to="https://www.pinterest.com/varnda3" target="_blank" rel="noopener noreferrer" className="icon-social">
                <FontAwesomeIcon icon={faPinterestP} />
              </Link>
              <Link to="https://m.facebook.com/Varndaeg/" target="_blank" rel="noopener noreferrer" className="icon-social">
                <FontAwesomeIcon icon={faFacebookF} />
              </Link>
            </div>
          </Col>
        </Row>
        <div className="scroll-to-top">
          <button onClick={scrollToTop} className="btn btn-primary">
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
        </div>
      </Container>
    </div>
  );
}
