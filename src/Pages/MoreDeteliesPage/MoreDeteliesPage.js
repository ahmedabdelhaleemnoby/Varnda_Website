import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Container } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cookies from 'js-cookie';
import api from "../../API/ApiLink.js";
import CardDetails from "../../Components/CardDetails/CardDetails.js";
import { useParams } from "react-router-dom";
import CommentCardAds from "../../Components/Comments/CommentCardAds.js";
import AddCommentAds from "../../Components/Comments/AddCommentAds.js";
import Share from "../../Components/Cards/Share.js";
import OverPage from "../../Components/OverPage/OverPage.js";
import NotFoundPage from './../NotFoundPage/NotFoundPage';
import QuickCardDetails from "../../Components/CardDetails/QuickCardDetails.js";

const MoreDeteliesPage = () => {
  const { id } = useParams();
  const [over, setOver] = useState(true);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const getOneAds = async () => {
      try {
        setLoading(true); // Set loading to true before API call
        const token = Cookies.get("token");
        const response = await api.get(`/getAd/${id}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const adsData = response.data.data;
        setData(adsData);
      } catch (err) {
        if (err.response?.data?.status === 404) {
          setData("NotFound");
        }
      } finally {
        setOver(false);
        setLoading(false); // Set loading to false after API call
      }
    };
    getOneAds();
  }, [id]);

  return (
    <>
      {loading && ( // Loader element
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      {data === "NotFound" ? (
        <NotFoundPage />
      ) : data === "" ? (
        <></>
      ) : (
        <>
          <Header />
          {data.ad.ad_type ? (
            <QuickCardDetails
              propertyDetails={data.ad}
              relatedProperties={data.related_properties}
            />
          ) : (
            <CardDetails
              propertyDetails={data.ad}
              relatedProperties={data.related_properties}
            />
          )}
          <hr />
          <Container>
            <CommentCardAds ads_id={id} />
            <hr />
            <AddCommentAds ads_id={id} />
          </Container>
          <Footer />
          {data.ad && (
            <Share
              text={data.ad.property["Arabic Name"]}
              url={`http://varnda.com/property/${encodeURIComponent(id)}`}
            />
          )}
          {over && <OverPage />}
        </>
      )}
    </>
  );
};

export default MoreDeteliesPage;
