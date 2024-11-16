import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Swapper.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay } from 'swiper/modules';
import api from "../../API/ApiLink.js";
export default function Swapper() {
const [articles,setArticles]=useState([])
 // استرجاع احدث 10 مقالات 
 useEffect(() => {
  const fetchArticles = async () => {
      try {
          const response = await api.get("/getlatest");
          setArticles(response.data.data)
      } catch (error) {
          console.log(error);
      }
  };
  fetchArticles();
}, []);
  return (
    <div className="container my-5">
      <h2 className="text-center my-5 h1">اعرف المزيد عن سوق العقارات في مصر</h2>
      <Swiper
        spaceBetween={50}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1000: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        className="p-2"
      >
        {articles.map(card => (
          <SwiperSlide key={card.id}> 
            <Link to={`/blog/${card.article_url}`} className="card-Home">
              <img src={card.article_image} alt={card.title} />
              <p className="cardP">{card.title}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
