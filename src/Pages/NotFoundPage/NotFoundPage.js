import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Container className="mt-5 text-center" dir="rtl">
        <Row>
          <Col>
            <h1>404 - الصفحة غير موجودة</h1>
            <p>الصفحة التي تبحث عنها غير موجودة.</p>
            <Button variant="primary" onClick={() => navigate("/")}>
              العودة إلى الصفحة الرئيسية
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NotFoundPage;
