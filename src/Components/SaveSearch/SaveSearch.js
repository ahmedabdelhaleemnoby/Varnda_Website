import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function SaveSearch() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        حفظ البحث
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>حفظ البحث</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
        type="text"
        placeholder="قم بتسمية عمليه البحث"
        id="inputTextSearch"
      />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            الغاء
          </Button>
          <Button variant="primary" onClick={handleClose}>
            حفظ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SaveSearch;