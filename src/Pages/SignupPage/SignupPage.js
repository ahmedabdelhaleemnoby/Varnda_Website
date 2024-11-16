import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "./SignupPage.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import api from "../../API/ApiLink.js";
import LoadingBtn from "../../Components/LoadingBtn.js";
import AlertMessage from "../../Components/Alert/Alert.js";
import AlertSignUp from "../../Components/Alert/AlertVerifySignup.js";
import usePageSEO from "../../hooks/usePageSEO.js";

export default function SignupPage() {
  
// Set SEO settings
usePageSEO({
  title: "إنشاء حساب",
  keywords:["إنشاء حساب"],
});
  const [validated, setValidated] = useState(false);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });
  const [formData, setFormData] = useState({});
  const isValidPhone = (phoneNumber) => {
    const egPhone = /^(010|011|012|015)\d{8}$/;
    return egPhone.test(phoneNumber);
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "phone") {
      if (!isValidPhone(value)) {
        e.target.setCustomValidity("يرجى إدخال رقم هاتف صحيح");
      } else {
        e.target.setCustomValidity("");
      }
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (formData.password !== formData.password_confirmation) {
        setAlert({
          msg: "كلمات المرور الجديدة غير متطابقة",
          variant: 3
        })
        setShow(true);
      } else {
        try {
          setLoad(true);
          const response = await api.post("/register", {
            ...formData,
          });
          Cookies.set("token", response.data.data.token);
          Cookies.set("user_id", response.data.data.user_id);
          Cookies.set('email', response.data.data.email);
          Cookies.set('phone', response.data.data.phone);
          Cookies.set('role', response.data.data.role);
          Cookies.set('verify',null)
          Cookies.set("image", response.data.data.image);
          Cookies.set('first_name', response.data.data.first_name);
          Cookies.set('last_name', response.data.data.last_name);
          Cookies.set('phone', response.data.data.phone);

          window.scrollTo({ top: 0, behavior: 'smooth' });
          setOverlay(true);
        } catch (err) {
          try {
            const errdata = err.response.data
            console.log(errdata);
            setAlert({ msg: "الايميل او الرقم مستخدم بالفعل", variant: 3 });
            setShow(true)
          } catch (err) {
            setAlert({ msg: "حدث خطأ. تاكد من الاتصال بالانترنت", variant: 2 });
            setShow(true)
          }
        }
        setLoad(false)
      }
    }

    setValidated(true);
  };

//Google
const logWithGoogle = () => {
  const clientId = '525682631663-v636i48t9vd183dbh7a8hvdp1lfov8co.apps.googleusercontent.com';
  const redirectUri = 'https://back.varnda.com/api/auth/google/callback';
  const scope = 'openid profile email';
  const responseType = 'code';
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
  window.location.href = googleAuthUrl;
};

  return (
    <Container className="signup-container mt-3" dir="rtl">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={7}>
          <h2 className="text-center mb-4" style={{ color: "#007bff" }}>
            إنشاء حساب
          </h2>

          <Form
            className="p-4 border rounded"
            noValidate
            validated={validated}
            onSubmit={handelSubmit}
          >
            <Row className="mb-2">
              <Form.Group as={Col} controlId="formFirstName">
                <Form.Label>الاسم الشخصى</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  placeholder="الاسم الشخصى"
                  onChange={handelChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formLastName">
                <Form.Label>اسم العائله</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  placeholder="اسم العائله"
                  onChange={handelChange}
                  required
                />
              </Form.Group>
            </Row>

            <Form.Group controlId="formBasicEmail" className="mt-2">
              <Form.Label className="fs-5 mb-2">البريد الإلكتروني</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="ادخل البريد الإلكتروني"
                onChange={handelChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                ادخل الايميل بشكل صحيح
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label className="mt-2">رقم التليفون</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                onChange={handelChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                ادخل رقم الهاتف بشكل صحيح "01xxxxxxxxx"
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mt-2">
              <Form.Label className="fs-5 mb-2">كلمة المرور</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="ادخل كلمة المرور"
                onChange={handelChange}
                required
                minLength={8}
              />
              <Form.Control.Feedback type="invalid">
                كلمه المرور لا تقل عن 8 احرف
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="passwordConfirmation" className="mt-2">
              <Form.Label className="fs-5 mb-2"> تأكيد كلمة المرور</Form.Label>
              <Form.Control
                type="password"
                name="password_confirmation"
                placeholder=" ادخل كلمة المرور مرة أخرى "
                onChange={handelChange}
                required
                minLength={8}
              />
              <Form.Control.Feedback type="invalid">
                كلمه المرور لا تقل عن 8 احرف
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={load} className="w-100 mt-2">
              {load ? <LoadingBtn /> : "إنشاء حساب"}
            </Button>

          </Form>
          {/* Google */}
          <div className="text-center mt-3">
            <Button variant="light" className="google-button w-100" onClick={logWithGoogle}>
              تسجيل الدخول باستخدام جوجل
              <FontAwesomeIcon icon={faGoogle} className="google-icon" />
            </Button>
          </div>
          <div className="text-center mt-2">
            <Link to="/login">لديك حساب بالفعل؟ تسجيل الدخول هنا</Link>
          </div>
        </Col>
      </Row>
      {/*  */}
      {show && (
        <>
          <AlertMessage
            msg={alert.msg}
            setShow={setShow}
            variant={alert.variant}
          />
        </>
      )}
      {overlay && (
        <>
          <div style={{
            position: 'absolute',
            top: '5px',
            left: '0px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <AlertSignUp />
          </div>
        </>
      )}
      {/*  */}
    </Container>
  );
}
