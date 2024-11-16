import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import LoadingBtn from "../LoadingBtn";
export default function DeleteUser({
  DeleteFun,
  load,
  role,
  email
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <td>
        <Button
          variant="danger"
          onClick={() => {
            setShowDeleteModal(true);
          }}
        >
          حذف
        </Button>
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
          <Modal.Header>
            <Modal.Title>تأكيد الحذف</Modal.Title>
          </Modal.Header>
          <Modal.Body>هل أنت متأكد أنك تريد حذف هذا العنصر؟</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              إلغاء
            </Button>
            <Button
              variant="danger"
              disabled={load}
              onClick={() => DeleteFun(role,email)}
            >
                {load?<LoadingBtn/>:"حذف"}
            </Button>
          </Modal.Footer>
        </Modal>
      </td>
    </>
  );
}
