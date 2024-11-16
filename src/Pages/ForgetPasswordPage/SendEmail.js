import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import api from "../../API/ApiLink.js";
import LoadingBtn from "../../Components/LoadingBtn.js";
import AlertMessage from "../../Components/Alert/Alert.js";
import OverPage from "../../Components/OverPage/OverPage.js";



export default function SendEmail() {
  const [validated, setValidated] = useState(false);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 })
  const [emailSended, setEmailSended] = useState("");
  
  const handelChange = (e) => {
    const {value } = e.target;
    setEmailSended(value);
  };

  const handelSubmit = async (e) => {
    setShow(false)
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    else {
      setLoad(true)
      try {
        await api.post("/forgot-password", {
          email: emailSended
        });
        setLoad(false)
        setOverlay(true)
        setShow(true)
        setAlert({ msg: "تم ارسال الرابط الى الايميل", variant: 1 })
      } catch (error) {
        setLoad(false)
        setShow(true)
        console.log(error)
        if (error.code === 'ERR_NETWORK') {
          setAlert({ msg: "خطا فى الشبكه. تأكد من الاتصال بالانترنت و اعد المحاوله", variant: 2 })
        }
        else if (error.response.status === 422) {
            setAlert({ msg: "هذا البريد الإلكتروني غير مسجل لدينا: هل تريد", variant: 4 })
        }
      }
    }
    setValidated(true);
  };



  return (
    <Container className="login-container mt-5" dir="rtl">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="text-center mb-4" style={{ color: "#007bff" }}>
            ادخل الايميل لاسترجاع كلمه المرور
          </h2>
          <Form
            noValidate
            validated={validated}
            className="p-4 border rounded"
            onSubmit={handelSubmit}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="fs-5 mb-3">البريد الإلكتروني</Form.Label>
              <Form.Control
                type="email"
                placeholder="ادخل البريد الإلكتروني"
                name="email"
                onChange={handelChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                من فضلك ادخل الايميل بشكل صحيح
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3"
              disabled={load}
            >
              {load ? <LoadingBtn /> : "ارسال"}
            </Button>
          </Form>
        </Col>
      </Row>
      {/*  */}
      {show && <>
        <AlertMessage msg={alert.msg} setShow={setShow} variant={alert.variant} />
      </>}
      {overlay && <><OverPage /></>}
      {/*  */}

    </Container>
  );
}