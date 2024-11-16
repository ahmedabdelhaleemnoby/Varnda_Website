import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./ArticleDetailes.css";
import Footer from "../../../Components/Footer/Footer";
import api from "../../../API/ApiLink.js";
import usePageSEO from "../../../hooks/usePageSEO";
import AddComment from "../../../Components/Comments/AddComment.js";
import CommentCard from "../../../Components/Comments/CommentCard.js";
import Header from "../../../Components/Header/Header.js";
import Share from "../../../Components/Cards/Share";
import OverPage from "../../../Components/OverPage/OverPage.js";
import ArticleCards from "../../../Components/Articles/ArticleCards.js";

export default function ArticleDetailes() {
  const [article, setArticle] = useState({});
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const { id } = useParams();
  // استرجاع مقاله حسب اللينك
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setOverlay(true);
        const response = await api.get(`/getPostByUrl/${id}`);
        setArticle(response.data.data.posts[0]);
        setRelatedPosts(response.data.data.related_posts)
      } catch (error) {
        setArticle("");
        console.log(error);
      } finally {
        setOverlay(false);
      }
    };
    fetchArticle();
  }, [id]);

  const currentUrl = window.location.href;
  // Set default SEO settings
  usePageSEO({
    title: article.Title || "مقالات",
    description: article.meta_description || "",
    keywords: article.key_words ? article.key_words.split(",") : [],
    img: article.Article_image,
    url: currentUrl,
  });
  return (
    <>
      <Header />
      {overlay ? (
        <OverPage />
      ) : (
        <>
          {article ? (
            <>
              <h1 className="text-center title-page py-1 pb-2 container my-3">
                {article.Title}
              </h1>
              <Container dir="rtl">
                <Row className="detailes-page">
                  <Col>
                    <div style={{ position: "relative" }}>
                      <img
                        src={article.Article_image}
                        alt={article.Title}
                        className="main-title-img"
                      />
                      {article.category_name && (
                        <span
                          style={{
                            position: "absolute",
                            bottom: "0px",
                            right: "0px",
                          }}
                        >
                          <Link
                            to={`/blog/type/${article.category_name}`}
                            className="categoryLink"
                          >
                            {article.category_name.replace(/-/g, " ")}
                          </Link>
                        </span>
                      )}
                    </div>

                    <div className="rtl mt-4">
                      <div
                        className="articleCont"
                        dangerouslySetInnerHTML={{
                          __html: article.Article_body,
                        }}
                      />
                    </div>
                    {article.tags && article.tags.length > 0 ? (
                      <div className="tag-cont">
                        {article.tags.map((tag) => (
                          <Button
                            as={Link}
                            to={`/blog/tags/${tag.replace(/ /g, "-")}`}
                            variant="outline-info"
                            className="tagBtn"
                          >
                            {tag}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              </Container>
            </>
          ) : (
            <Alert key="danger" className="text-center" variant="danger">
              404 عفوا, المدونة ليست موجوده
            </Alert>
          )}
          <hr />

          {relatedPosts.length && (
            <>
              <h2 className="text-center title-page py-1 pb-2 container my-3">
                مقالات قد تعجبك
              </h2>
              <ArticleCards articles={relatedPosts} />
            </>
          )}

          <hr />
          <Container>
            <CommentCard post_id={article.id} />
            <hr />
            <AddComment id={article.id} />
          </Container>
          <Footer />
          <Share
            text={`مدونه عن ${article.Title} فى موقع فارندا`}
            url={`http://varnda.com/blog/${encodeURIComponent(id)}`}
          />
        </>
      )}
    </>
  );
}
