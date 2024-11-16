import React, { useState } from "react";
import "./SearchPage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Container, Row, Col} from "react-bootstrap";
import HeaderSearchAdvanced from "../../Components/HeaderSearchAdvanced/HeaderSearchAdvanced";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropertyCard from "../../Components/Cards/Card";
import { useLocation, useNavigate } from "react-router-dom";
import AddPropertyCard from "../../Components/Cards/AddProperty/AddPropertyCard";
import ShowFilterToUser from "../../Components/Filters/ShowFilterToUser";
import usePageSEO from "../../hooks/usePageSEO";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function SearchPage() {

// Set SEO settings
usePageSEO({
  title: "فارندا - Varnda",
});
  const query = useQuery();//
  const navigate = useNavigate();//
  const [properties,setProperties]=useState([])
  const [loading,setLoading]=useState(false)
  const [sendfilter, setSendfilter] = useState({
    type: "",
    gov: "",
    city: "",
    region: "",
    compound: "",
  });
  return (
    <>
      <Header />
      <HeaderSearchAdvanced
        query={query}
        navigate={navigate}
        setProperties={setProperties}
        setLoading={setLoading}
        setSendfilter={setSendfilter}
      />

      <Container>
        <Row className="d-flex justify-content-between">
          {/* ال Cards */}
          <Col md={8} dir="rtl">
            <PropertyCard properties={properties} loading={loading} />
          </Col>

          <Col md={4} dir="rtl">
            <ShowFilterToUser
              type={sendfilter.type}
              gov={sendfilter.gov}
              city={sendfilter.city}
              region={sendfilter.region}
              compound={sendfilter.compound}
            />
          </Col>
        </Row>
      </Container>
      <AddPropertyCard />
      <Footer />
    </>
  );
}
