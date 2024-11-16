import React from "react";
import "./FooterContactUs.css";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faInstagram,
  faPinterestP,
  faTwitter,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhoneAlt,
  faMapMarkerAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

export default function FooterContactUs() {

  return (
    <div className="footer py-5 mt-5">
      <Container fluid="md">
        <Row className="contactfooter-row">
          <Col className="contact-footer" xs={12}>
            {/* الهاتف */}
            <a href="tel:+201121495326" className="contact-footer-cont">
              <FontAwesomeIcon
                icon={faPhoneAlt}
                className="contact-icon"
                size="3x"
              />
              {/* href="tel:+201017130556" */}
              <p className="mt-2 contact-text">01121495326</p>
            </a>
            {/* العنوان */}
            <a
              href="https://www.google.com/maps/place/%D9%85%D9%88%D9%84+%D8%A3%D8%B1%D9%83%D8%A7%D9%86%E2%80%AD/@30.007413,31.0091763,17z/data=!3m1!4b1!4m6!3m5!1s0x145846cc14a5e735:0xc42b7f622351920!8m2!3d30.007413!4d31.0091763!16s%2Fg%2F11bx8km_rp"
              className="contact-footer-cont"
            >
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="contact-icon"
                size="3x"
              />
              <p className="mt-2 contact-text">
                مول اركان الشيخ زايد
              </p>
            </a>
            {/* البريد الإلكتروني */}
            <a href="mailto:info@varnda.com" className="contact-footer-cont">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="contact-icon"
                size="3x"
              />
              <p className="mt-2 contact-text">info@varnda.com</p>
            </a>
          </Col>

          <Col>
            <div className="contact-icon-social-container">
              <Link
                to="https://youtube.com/@varndagreats?si=lE4Gv9qkzKEkSrvV"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-social"
              >
                <FontAwesomeIcon icon={faYoutube} size="2x" />
              </Link>
              <Link
                to="https://www.instagram.com/varnda76"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-social"
              >
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </Link>
              <Link
                to="https://x.com/varndacom"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-social"
              >
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </Link>
              <Link
                to="https://www.pinterest.com/varnda3"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-social"
              >
                <FontAwesomeIcon icon={faPinterestP} size="2x" />
              </Link>
              <Link
                to="https://m.facebook.com/Varndaeg/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-social"
              >
                <FontAwesomeIcon icon={faFacebookF} size="2x" />
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
