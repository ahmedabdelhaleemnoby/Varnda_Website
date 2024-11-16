import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';


import QuickAds from '../../images/QuickAds.jpg';

import image1 from '../../images/image1.jpg';
import image2 from '../../images/image2.jpg';
import image3 from '../../images/image3.jpg';
import image4 from '../../images/image4.jpg';
import image5 from '../../images/image5.jpg';
import image6 from '../../images/image6.jpg';
import image7 from '../../images/image7.jpg';
import image8 from '../../images/image8.jpg';


function SubmitpropertyPage() {
  // Array containing property cards data
  const propertyCards = [
    {
      image: image1,
      alt: 'شقق و دوبلكس',
      title: 'شقق و دوبلكس',
      description: 'شقة، دوبلكس، بنتهاوس، ستوديو، غرفة، قصر',
      link: '/add-apartments-duplexes',
    },
    {
      image: image2,
      alt: 'فلل وقصور',
      title: 'فلل وقصور',
      description: 'قصر، فيلا منفصلة، توين هاوس ، تاون هاوس',
      link: '/add-villas-palaces',
    },
    {
      image: image3,
      alt: 'منازل وبيوت',
      title: 'منازل وبيوت',
      description: 'منازل وبيوت',
      link: '/add-home-property',
    },
    {
      image: image4,
      alt: 'مصايف وساحلي',
      title: 'مصايف وساحلي',
      description: 'شاليه، دوبلكس، بنتهاوس، ستديو، فيلا، توين وتاون هاوس',
      link: '/add-resorts-coasts',
    },
    {
      image: image5,
      alt: 'وحدات تجارية & إدارية وطبية',
      title: 'وحدات تجارية & إدارية وطبية',
      description: 'محل، مكتب، عيادة، صيدلية، مطعم، كافيه، مخزن، جراج',
      link: '/add-commercial-units',
    },
    {
      image: image6,
      alt: 'أراضي',
      title: 'أراضي',
      description: 'زراعية، سكنية، صناعية، تجارية',
      link: '/add-lands',
    },
    {
      image: image7,
      alt: 'مباني',
      title: 'مباني',
      description: 'عمارة، مول، برج، مصنع، مستودع',
      link: '/add-buildings',
    },
    {
      image: image8,
      alt: 'مقابر ومدافن',
      title: 'مقابر ومدافن',
      description: 'مقابر ومدافن للبيع',
      link: '/add-cemeteries',
    },

  ];

  return (
    <div>
      <Header />

      <section className="py-5">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="text-primary mb-3">انشر إعلانك</h2>
              <p>اختر الفئة</p>
            </Col>
          </Row>




          <Row className='justify-content-center'>
            <Col key="0" sm={6} md={6} lg={5} className="mb-4">
              <Link to="/add-quick-property" className="text-decoration-none">
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={QuickAds}
                    alt="quick-property"
                    className="img-fluid"
                    // style={{ height: '300px' }}
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-primary">اعلان سريع</Card.Title>
                    <Card.Text className="flex-grow-1">اضف اعلانك بسرعه وسهوله </Card.Text>
                    <div className="text-end mt-auto">
                      <small className="text-muted">
                        اضافه اعلانك <FontAwesomeIcon icon={faArrowRight} />
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            {propertyCards.map((property, index) => (
              <Col key={index} sm={6} md={4} lg={3} className="mb-4">
                <Link to={property.link} className="text-decoration-none">
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={property.image}
                      alt={property.alt}
                      className="img-fluid"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="text-primary">{property.title}</Card.Title>
                      <Card.Text className="flex-grow-1">{property.description}</Card.Text>
                      <div className="text-end mt-auto">
                        <small className="text-muted">
                          اضافه اعلانك <FontAwesomeIcon icon={faArrowRight} />
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Footer />
    </div>
  );
}

export default SubmitpropertyPage;
