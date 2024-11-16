import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./ArticleCards.css"

// Function to strip HTML tags and limit text length
function stripHtml(html, maxLength) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const text = tempDiv.innerText || tempDiv.textContent;
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

export default function ArticleCards({ articles }) {
  return (
    <Container>
      <Row className="g-3">
        {articles.map((article) => (
          <Col sm={12} md={6} lg={4} key={article.id}>
            <Card as={Link} to={`/blog/${article.Article_url}`}>
              <Card.Img variant="top" src={article.Article_image} className='article-main-image' />
              <Card.Body>
                <Card.Title>{article.Title}</Card.Title>
                <Card.Text className='article-body'>
                  <div className="rtl">
                    {stripHtml(article.Article_body, 180)}
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
