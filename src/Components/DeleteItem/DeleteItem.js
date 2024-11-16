import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import LoadingBtn from "../LoadingBtn";
export default function DeleteItem({
  id,
  setId,
  itemId,
  DeleteFun,
  load,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setId(null);
  };

  return (
    <>
      <td>
        <Button
          variant="danger"
          onClick={() => {
            setShowDeleteModal(true);
            setId(itemId);
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
              onClick={() => DeleteFun(id)}
            >
                {load?<LoadingBtn/>:"حذف"}
            </Button>
          </Modal.Footer>
        </Modal>
      </td>
    </>
  );
}
