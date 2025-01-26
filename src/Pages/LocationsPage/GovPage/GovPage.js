import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";
import PageSwapper from "../../../Components/Swapper/PageSwapper/PageSwapper";
import { useEffect, useState } from "react";
import api from "../../../API/ApiLink.js";
import { useParams } from "react-router-dom";
import OverPage from "./../../../Components/OverPage/OverPage";
import usePageSEO from "../../../hooks/usePageSEO.js";
import NotFoundPage from "../../NotFoundPage/NotFoundPage.js";
import CardPage from "../../../Components/Cards/CardPage.js";

export default function GovPage() {
  let { gov } = useParams();
  const [data, setData] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  // API for get data to choose from it
  useEffect(() => {
    const fetchGov = async () => {
      if(gov !== 'buy' && gov !== 'rent' ) {
        try {
          setOverlay(true);
          setLoading(true);
          const response = await api.get(`/getAdsByGovernorate/${gov}`);
          setData(response.data.data);
        } catch (error) {
          console.log(error);
          if (error.response.data.status === 404) {
            setNotFound(true);
          }
        } finally {
          setOverlay(false);
          setLoading(false);
        }
      }else{
        try {
          setOverlay(true);
          setLoading(true);
          const response = await api.get(`/getTypeSearch/?type_search=${gov}`);
          setData(response.data.data);
        } catch (error) {
          console.log(error);
          if (error.response.data.status === 404) {
            setNotFound(true);
          }
        } finally {
          setOverlay(false);
          setLoading(false);
        }
      }
    };
    fetchGov();
  }, [gov]);
  
  const currentUrl = window.location.href;
  // Set default SEO settings
  usePageSEO({
    title: data.meta_title || "محافظة",
    description: data.meta_description || "",
    canonical: `https://varnda.com/${gov}`,
    img: data.image?data.image:'',
    url: currentUrl,
  });

  return (
    <>
      {notFound ? (
        <NotFoundPage />
      ) : (
        <>
          <Header />
          <h1 className="text-center title-page py-1 pb-2 container my-3">
            {data.h1_title ? data.h1_title : data.name}
          </h1>
          {data.image && (
            <div className="container">
              <img
                src={data.image}
                alt={data.h1_title}
                style={{ width: "100%", height: "400px" }}
              />
            </div>
          )}

          {overlay ? (
            <OverPage />
          ) : (
            <>
              <PageSwapper swapperData={data.cities} pageType="gov" />
              <CardPage properties={data.Ads} loading={loading} />
            </>
          )}
          <Footer />
        </>
      )}
    </>
  );
}
