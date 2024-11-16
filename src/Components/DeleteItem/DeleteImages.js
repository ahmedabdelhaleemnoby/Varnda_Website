import { useState } from "react";
import LoadingBtn from "../LoadingBtn";
import api from "../../API/ApiLink.js";
import Cookies from 'js-cookie';
import AlertMessage from "../Alert/Alert.js";
import { Col, Container, Row, Button, Modal } from 'react-bootstrap';
export default function DeleteImages() {


  const token=Cookies.get("token")
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [load, setLoad] = useState(false);

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const [alert, setAlert] = useState({ msg: "", variant: 0 })
  const [show, setShow] = useState(false);

    const DeleteImages= async () => {
      try {
        setLoad(true);
        const response = await api.get("/cleanUpOldImages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setShowDeleteModal(false);
        setAlert({ msg: "تم حذف الصور الغير مستخدمة بنجاح", variant: 1 })
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setShow(true)
        setTimeout(() => {
          // navigate('/submit-property');
        }, 2000)

      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    };  
  return (
    <>
      <Container className="login-container mt-5" dir="rtl">
        <Row className="justify-content-center">
          <Col xs={8} className='d-flex justify-content-center'>
          <Button
          variant="danger"
          onClick={() => {
            setShowDeleteModal(true);
          }}
        >
          حذف الصور (غير مستخدمه)
        </Button>
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
          <Modal.Header>
            <Modal.Title>تأكيد الحذف</Modal.Title>
          </Modal.Header>
          <Modal.Body>هل أنت متأكد أنك تريد حذف  الصور الغير مستخدمه؟</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              إلغاء
            </Button>
            <Button
              variant="danger"
              disabled={load}
              onClick={DeleteImages}
            >
                {load?<LoadingBtn/>:"تأكيد الحذف"}
            </Button>
          </Modal.Footer>
        </Modal>
          </Col>
          </Row>
          </Container>

      {show && <>
          <AlertMessage msg={alert.msg} setShow={setShow} variant={alert.variant} />
        </>}

    </>
  );
}
