import React, { useEffect, useState } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import api from "../../API/ApiLink.js";
import Cookies from 'js-cookie';
import CardFav from '../../Components/Cards/CardFav.js';
import AlertMessage from '../../Components/Alert/Alert.js';
import usePageSEO from '../../hooks/usePageSEO.js';

export default function FavPage() {

// Set SEO settings
usePageSEO({
  title: "الأعلانات المفضلة",
  keywords:["الأعلانات المفضلة"],
});
const token=Cookies.get("token")
  const[properties,setProperties]=useState([])
  const[overlay,setOverlay]=useState(false)
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });
  useEffect(() => {
    const fetchFavAds=async()=>{
      try {
        setOverlay(true);
        const response = await api.get("/get-favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProperties(response.data.data);
      } catch (error) {
        if (error.response.status === 401) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setAlert({
            msg: "انتهت جلستك.يرجى تسجيل الدخول مره اخرى",
            variant: 3,
          });
          setShow(true);
          Object.keys(Cookies.get()).forEach(function (cookieName) {
            Cookies.remove(cookieName);
          });
        }
        console.log(error);
      } finally {
        setOverlay(false);
      }
    }
    fetchFavAds()
  }, [token])
  return (
    <>
      <Header />
      <h2 className="text-center mt-3 mb-4" style={{ color: 'blue' }}>
        الاعلانات المفضلة
      </h2>
      <Container>
        <Row className="d-flex justify-content-between">
          <Col dir="rtl" sm={12} md={10} lg={8}>
          <CardFav properties={properties} overlay={overlay}/> 
          </Col>
        </Row>
      </Container>
      <Footer />
      {show && (
          <>
            <AlertMessage
              msg={alert.msg}
              setShow={setShow}
              variant={alert.variant}
            />
          </>
        )}
    </>
  );
}
