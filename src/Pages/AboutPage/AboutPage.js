import React from "react";
import "./AboutPage.css";
import Header from "../../Components/Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import about_1 from "../../images/About_1.jpg";
import about_3 from "../../images/About_3.jpeg";
import about_4 from "../../images/About_4.jpeg";
import about_5 from "../../images/About_5.jpeg";
import Footer from "../../Components/Footer/Footer";
import usePageSEO from "../../hooks/usePageSEO";
export default function AboutPage() {
      // Set SEO settings
      usePageSEO({
        title:"نبذة عنا",
        keywords: ["نبذة عنا"],
      });
  
  return (
    <>
      <Header />
      <Container>
        <Row className="d-flex justify-content-around align-items-center my-5">
          <Col md={5} className="d-flex justify-content-center">
            <img src={about_1} alt="about-img" className="image-about" />
          </Col>

          <Col md={5} dir="rtl">
            <h3 className="h1 title-about">نبذة عنا</h3>
            <p className="fs-5 mt-4 about-text">
              فرندا هى منصة الإعلانات المبوبة الرائدة للعقارات في مصر، هدفها
              الأساسي هو الربط بين المشترين والمستثمرين وأصحاب العقارات
              والبائعين والمستأجرين والوسطاء لتسهيل عملية البحث عن العقارات. لأن
              عملية البحث عن العقارات عملية مرهقة وتحتاج إلى كثير من الوقت
              والمجهود، نقدم لكم تجربة عقارية سهلة و مميزة تجعلك تبحث عن العقار
              المناسب لك سواء للإيجار، البيع أو الشراء كل ذلك من خلال منصة واحدة
              فقط
            </p>
          </Col>
        </Row>

        <Row className="my-5">
          <h4 className="text-center h2 title-about"> قيمنا</h4>
          <p dir="rtl" className=" my-4 about-text">
            قيمنا نحن هنا فى فرندا حريصين على تلبية احتياجات كل من المواطنين و
            الوافدين من كل أنحاء العالم لتسهيل عملية البحث عن العقارات في
            المنطقة، قدرنا نحقق ده من خلال دراسة السوق على نطاق واسع و ركزنا على
            إيجاد حلول تسهل على الباحثين عن عقارات إيجاد كل ما يناسبهم سواء
            أفراد أو وكلاء. شركتنا تتبنى قيم أساسية زي المصداقية والابتكار وتحمل
            المسئولية الكاملة في تحقيق احتياجات العملاء وهدفنا الأساسي هو
            الإرتقاء بمستوى السوق في المنطقة.
          </p>
          <Col md={4}>
            <img src={about_3} alt="about-img1" className="image-about m-2" />
          </Col>
          <Col md={4}>
            <img src={about_4} alt="about-img2" className="image-about m-2" />
          </Col>
          <Col md={4}>
            <img src={about_5} alt="about-img3" className="image-about m-2" />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
