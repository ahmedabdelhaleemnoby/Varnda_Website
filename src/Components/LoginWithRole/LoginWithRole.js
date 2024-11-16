import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import api from "../../API/ApiLink.js";
import Cookies from 'js-cookie';
import LoadingBtn from "../../Components/LoadingBtn.js";
import AlertMessage from "../../Components/Alert/Alert.js";
import { useNavigate } from 'react-router-dom';
import OverPage from "../../Components/OverPage/OverPage.js";

export default function LoginWithRole({role}) {

  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 })
  const [formData, setFormData] = useState({});
  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        const response = await api.post("/admin/login", {
          email: formData.email,
          password: formData.password,
          role
        });

        Cookies.set('token', response.data.data.token);
        Cookies.set("image", response.data.data.user.image);
        Cookies.set('role', response.data.data.user.role);
        Cookies.set('email', response.data.data.user.email);
        Cookies.set('first_name', response.data.data.user.name);
        Cookies.set('phone', response.data.data.user.phone);
        Cookies.set("user_id", response.data.data.user.id);
        Cookies.set("verify",true)

        setLoad(false)
        setOverlay(true)
        setShow(true)
        setAlert({ msg: "تم تسجيل الدخول بنجاح", variant: 1 })
     
        navigate('/dashboard')

      } catch (error) {
        setLoad(false)
        setShow(true)
        console.log(error)
        if (error.code === 'ERR_NETWORK') {
          setAlert({ msg: "خطا فى الشبكه. تأكد من الاتصال بالانترنت و اعد المحاوله", variant: 2 })
        }
        else if (error.response.status === 401) {
          setAlert({ msg: "البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التحقق والمحاولة مرة أخرى.", variant: 3 })
        }
        else if (error.response.status === 404) {
          setAlert({ msg: "هذا البريد الإلكتروني غير مسجل لدينا", variant: 3 })
        }
      }
    }
    setValidated(true);
  };


  return (
    <Container className="login-container mt-5" dir="rtl">
      
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={5}>
          <h2 className="text-center mb-4" style={{ color: "#007bff" }}>
            تسجيل الدخول "{role}"
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

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label className="fs-5 mb-3">كلمة المرور</Form.Label>
              <Form.Control
                type="password"
                placeholder="ادخل كلمة المرور"
                name="password"
                onChange={handelChange}
                required
                minLength={6}
              />
              <Form.Control.Feedback type="invalid">
                من فضلك ادخل كلمه المرور بشكل صحيح
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3"
              disabled={load}
            >
              {load ? <LoadingBtn /> : "تسجيل الدخول"}
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