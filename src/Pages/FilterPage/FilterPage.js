import React, { useEffect, useState } from "react";
import "./SearchPage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Container, Row, Col,Alert} from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropertyCard from "../../Components/Cards/Card";
import AddPropertyCard from "../../Components/Cards/AddProperty/AddPropertyCard";
import { useParams } from "react-router-dom";
import api from "../../API/ApiLink"
import ShowFilterToUser from "../../Components/Filters/ShowFilterToUser";
import usePageSEO from "../../hooks/usePageSEO";

export default function FilterPage() {

  let { filter} = useParams();
  const [data,setData]=useState([])
  const [loading,setLoading]=useState(true)
  const [notFound,setNotFound]=useState(false)
  
  const GetFilterAds = async () => {
    setLoading(true)
    const formDataToSend = new FormData();
    formDataToSend.append("url", filter);
    try {
        const response = await api.post(`/search-byFilter`,  formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
        setData(response.data.data)
    } catch (err) {
      if(err.response.status===404){
        setNotFound(true)
      }
        console.log(err);
    } finally {
      setLoading(false)
    }
}

useEffect(()=>{
if(filter){
  GetFilterAds()
}
},[filter])

// Set SEO settings
usePageSEO({
  title: data.filter.filter_name||"فارندا - Varnda",
  description: data.filter.meta_description?data.filter.meta_description:"",
  keywords:data.filter.key_words ? data.filter.key_words.split(",") : [],
});

  return (
    <>
      <Header />
      <Container>
        <Row className="d-flex justify-content-between mt-4">
          {/* ال Cards */}
          {notFound ? (
            <Alert key="warning" className="text-center" variant="warning">
              هذا الفلتر غير موجود 404
            </Alert>
          ) : (
            <Col md={8} dir="rtl">
              <PropertyCard properties={data.ads} loading={loading} />
            </Col>
          )}

          <Col md={4} dir="rtl">
            <ShowFilterToUser
              type={data.filter.type}
              gov={data.filter.gov}
              city={data.filter.city}
              region={data.filter.region}
              compound={data.filter.compound}
            />
          </Col>
        </Row>
      </Container>
      <AddPropertyCard />
      <Footer />
      {/* <AddQuickCard /> */}
    </>
  );
}
