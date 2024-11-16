import { Container, Row, Col, Button } from "react-bootstrap";
import Style from "./AddPropertyCard.module.css"
import { Link } from 'react-router-dom'
export default function AddPropertyCard() {
    return (
        <section style={{
            background: 'rgb(13, 110, 251)',
            color: 'white',
            height: '175px',
            display: 'flex',
            alignItems: 'center'
        }}>
            <Container>
                <Row>
                    <Col lg={8} className="tac-smd">
                        <div className={Style.textDiv}>
                            <h1>
                                أعلن عن عقارك الآن
                            </h1>
                            <p>
                                أظهر إعلانك الآن الي آلاف المهتمين.
                            </p>
                        </div>
                    </Col>
                    <Col lg={4} className={Style.btnCol}>
                        <div className={Style.btnDiv}>
                            <Link to="/submit-property">
                                <Button variant="outline-primary" className={Style.btn}
                                    size="lg">اضف عقارك الان</Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}