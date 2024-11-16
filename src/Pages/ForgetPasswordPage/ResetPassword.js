import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import AlertMessage from "../../Components/Alert/Alert.js";
import LoadingBtn from "../../Components/LoadingBtn.js";
import api from "../../API/ApiLink.js";
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // State for password form
  const [passwordForm, setPasswordForm] = useState({
    password: '',
    password_confirmation: ''
  });

  const [urlParams, setUrlParams] = useState({
    token: '',
    email: ''
  });

  // Extract token and email from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const email = params.get('email');
    setUrlParams({ token, email });
  }, [location.search]);

  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (passwordForm.password !== passwordForm.password_confirmation) {
        setAlert({
          msg: "كلمات المرور الجديدة غير متطابقة",
          variant: 3
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setShow(true);
      } else {
        setLoad(true);
        try {
          const formData = new FormData();
          formData.append('password', passwordForm.password);
          formData.append('password_confirmation', passwordForm.password_confirmation);
          formData.append('token', urlParams.token);
          formData.append('email', urlParams.email);

          await api.post("/reset-password", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          setAlert({
            msg: "تم تحديث كلمه السر بنجاح",
            variant: 1
          });
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
          if (err.response?.data?.status === 422) {
            setAlert({
              msg: "انتهت صلاحية الرابط",
              variant: 3
            });
          } else {
            setAlert({
              msg: "حدث خطا اثناء تغيير كلمه السر",
              variant: 2
            });
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setShow(true);
        setLoad(false);
      }
    }
    setValidated(true);
  };

  return (
    <>
      <Container className="login-container mt-5" dir="rtl">
        <Row className="justify-content-center">
          <Col md={6} xs={12} className='mb-4'>
            <Form noValidate validated={validated} onSubmit={handlePasswordSubmit}>
              <Form.Group controlId="formNewPassword" className="mt-2">
                <Form.Label className="fs-5 mb-2">كلمة المرور الجديده</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={passwordForm.password}
                  onChange={handlePasswordChange}
                  required
                  minLength={8}
                />
                <Form.Control.Feedback type="invalid">
                  كلمه المرور لا تقل عن 8 احرف
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formConfirmNewPassword" className="mt-2">
                <Form.Label className="fs-5 mb-2"> تأكيد كلمة المرور الجديده</Form.Label>
                <Form.Control
                  type="password"
                  name="password_confirmation"
                  value={passwordForm.password_confirmation}
                  onChange={handlePasswordChange}
                  required
                  minLength={8}
                />
                <Form.Control.Feedback type="invalid">
                  كلمه المرور لا تقل عن 8 احرف
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" className="btn btn-primary mt-3 w-50" disabled={load}>
                {load ? <LoadingBtn /> : "حفظ التعديل"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      {show && (
        <>
          <AlertMessage
            msg={alert.msg}
            setShow={setShow}
            variant={alert.variant}
          />
        </>
      )}
    </>
  );
}

export default ResetPassword;
