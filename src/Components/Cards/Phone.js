import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
function Phone({ phone }) {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button variant="primary" className="m-2 btn-sm" onClick={() => setShow(true)}>
                <FontAwesomeIcon icon={faPhone} /> اتصل
            </Button>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-60w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header>
                    <Modal.Title id="example-custom-modal-styling-title">
                        اتصل بنا
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        يمكنك الاتصال على صاحب الاعلان على هذا الرقم:
                    </p>
                        <span style={{
                            padding: '8px',
                            background: '#11387e',
                            color: 'white',
                            fontWeight: 'bold',
                            borderRadius: '6px',
                            margin: '5px'
                        }}>{phone}</span>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Phone;