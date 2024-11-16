import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay, Navigation } from "swiper/modules"; // Import modules correctly
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, Link } from "react-router-dom";
import "./PageSwapper.css";
import { Container } from "react-bootstrap";

const PageSwapper = ({ swapperData = [] ,pageType=""}) => {
  
  const { gov ,city ,compound } = useParams();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    function filterArray() {
      const newData = swapperData.filter((ele) => ele.url);
      setFilteredData(newData);
    }
    if (swapperData.length > 0) {
      filterArray();
    }
  }, [swapperData]);

  return (
    <>
      {filteredData.length > 0 && (
        <Container className="my-3 SwiperContainer">
          <Swiper
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
            modules={[Navigation, Autoplay]}
            spaceBetween={50}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            autoplay={{ delay: 4000 }}
            breakpoints={{
              575: {
                slidesPerView: 1,
              },
              650: {
                slidesPerView: 2,
              },
              900: {
                slidesPerView: 3,
              },
            }}
            className="p-2"
          >
            <div className="swiper-button-prev-custom">
              <FontAwesomeIcon icon={faArrowRight} size="2x" />
            </div>
            <div className="swiper-button-next-custom">
              <FontAwesomeIcon icon={faArrowLeft} size="2x" />
            </div>

            {filteredData.map((ele, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <div className="link-cont">
                  {pageType === "gov" ? (
                    <Link to={`/${gov}/${ele.url}`} className="link-txt">
                      <h4>{ele.name}</h4>
                    </Link>
                  ) : (
                    <Link
                      to={`/${gov}/${city}/${ele.url}`}
                      className="link-txt"
                    >
                      <h4>{ele.name}</h4>
                    </Link>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      )}
    </>
  );
};

export default PageSwapper;
