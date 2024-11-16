import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';
import "./Company.css";
import imgcompany1 from "../../images/com1_new.webp";
import imgcompany2 from "../../images/com2_new.webp";
import imgcompany3 from "../../images/com3_new.webp";
import imgcompany4 from "../../images/com4_new.webp";
import imgcompany5 from "../../images/com5_new.webp";
import imgcompany6 from "../../images/com6_new.webp";
import imgcompany7 from "../../images/com7_new.webp";
import imgcompany8 from "../../images/com8_new.webp";
import { Container } from "react-bootstrap";
export default function Company() {



  return (
    <Container>
      <h2 className="company-h2 mt-4 mb-3">
        تصفح المدن والمناطق العقارية فى مصر
      </h2>

      <Row className="my-3">
        <Col xs={12} md={6} lg={3} className="mb-4">
          <Link to={`/search?city=القاهرة الجديدة`} className="card">
            <Card>
              <Card.Img variant="top" src={imgcompany1} alt="القاهرة الجديدة محافظة القاهرة" />
              <Card.Body>
                <Card.Title>القاهرة الجديدة</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-4" >
          <Link to={`/search?city=الشيخ زايد`} className="card">
            <Card>
              <Card.Img variant="top" src={imgcompany2} alt="الشيخ زايد محافظة الجيزة" />
              <Card.Body>
                <Card.Title>الشيخ زايد </Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-4" >
          <Link to={`/search?city=مصر الجديدة`} className="card">
          <Card>
            <Card.Img variant="top" src={imgcompany3} alt="مصر الجديدة محافظة القاهرة" />
            <Card.Body>
              <Card.Title>مصر الجديدة </Card.Title>
            </Card.Body>
          </Card>
          </Link>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-4" >
          <Link to={`/search?city=مدينة نصر`} className="card">
            <Card>
              <Card.Img variant="top" src={imgcompany4} alt="مدينة نصر محافظة القاهرة" />
              <Card.Body>
                <Card.Title>مدينة نصر </Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
      <Row className="my-3">
        <Col xs={12} md={6} lg={3} className="mb-4" >
          <Link to={`/search?city=6 اكتوبر`} className="card">
            <Card>
              <Card.Img variant="top" src={imgcompany5} alt="6 اكتوبر محافظة الجيزة"/>
              <Card.Body>
                <Card.Title> 6 أكتوبر</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-4" >
          <Link to={`/search?city=المعادي`} className="card">
            <Card>
              <Card.Img variant="top" src={imgcompany6} alt="المعادى محافظة القاهرة" />
              <Card.Body>
                <Card.Title>المعادى </Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col xs={12} md={6} lg={3} className="mb-4" >
          <Link to={`/search?city=مدينتي`} className="card">
            <Card>
              <Card.Img variant="top" src={imgcompany7} alt="مدينتى محافظة القاهرة" />
              <Card.Body>
                <Card.Title>مدينتى </Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        <Col xs={12} md={6} lg={3} className="mb-4" >
          <Link to={`/search?city= الساحل الشمالي`} className="card">
            <Card>
              <Card.Img variant="top" src={imgcompany8} alt="الساحل الشمالى محافظة الإسكندرية" />
              <Card.Body>
                <Card.Title> الساحل الشمالي </Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}
