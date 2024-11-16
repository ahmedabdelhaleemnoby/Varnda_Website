import React, { useEffect, useState } from "react";
import "./Articles.css";
import ArticleCards from "../../Components/Articles/ArticleCards";
import api from "../../API/ApiLink.js";
import { Pagination ,Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header/Header.js";
import HeaderPageLink from "../../Components/HeaderPageLink/HeaderPageLink.js";
import AddPropertyCard from "../../Components/Cards/AddProperty/AddPropertyCard.js";
import Footer from "../../Components/Footer/Footer.js";
import OverPage from './../../Components/OverPage/OverPage';
import usePageSEO from "../../hooks/usePageSEO.js";

export default function ArticlesInCategory() {

  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const category_id=1;
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setOverlay(true)
        const response = await api.post(`/getPostsByCat/${category}`, {
          page: currentPage,
        });
        setArticles(response.data.data.posts);
        setTotalPages(response.data.data.total_pages);
      } catch (error) {
        setArticles([]);
        console.log(error);
      }finally{
        setOverlay(false)
      }
    };
    fetchArticle();
  }, [currentPage,category]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

// Set SEO settings
usePageSEO({
  title: category.replace(/-/g, " "),
  keywords:[category.replace(/-/g, " ")],
});

  return (
    <>
      <Header />
      <HeaderPageLink activeCategory={category} />
      <>
        <h2 className="text-center title-page py-1 pb-2 container my-3">
          {category.replace(/-/g, " ")}
        </h2>
        {overlay ? (
          <OverPage />
        ) : articles.length > 0 ? (
          <>
            <ArticleCards articles={articles} />
            {/* Pagination */}
            {/* Pagination */}
            <div className="d-flex justify-content-center mt-3">
              <Pagination dir="ltr">
                <Pagination.First
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                />

                <Pagination.Prev
                  onClick={() =>
                    handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                  }
                  disabled={currentPage === 1}
                />

                {currentPage > 3 && <Pagination.Ellipsis />}

                {/* Show pages around the current page */}
                {[...Array(totalPages)]
                  .map((_, index) => index + 1)
                  .filter(
                    (page) => page >= currentPage - 1 && page <= currentPage + 1
                  )
                  .map((page) => (
                    <Pagination.Item
                      key={page}
                      active={page === currentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Pagination.Item>
                  ))}

                {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
                <Pagination.Next
                  onClick={() =>
                    handlePageChange(
                      currentPage < totalPages ? currentPage + 1 : totalPages
                    )
                  }
                  disabled={currentPage === totalPages}
                />

                <Pagination.Last
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          </>
        ) : (
          <Alert key="warning" className="text-center" variant="warning">
            لا يوجد مقالات فى هذا التصنيف
          </Alert>
        )}
      </>
      <AddPropertyCard />
      <Footer />
    </>
  );
}
