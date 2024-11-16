import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Cookies from "js-cookie";
import api from "../../../API/ApiLink.js";
import LoadingBtn from "../../../Components/LoadingBtn.js";
import AlertMessage from "../../../Components/Alert/Alert.js";
import { useNavigate } from "react-router-dom";

export default function AddUsers() {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });
  const [formData, setFormData] = useState({});
  const isValidPhone = (phoneNumber) => {
    const egPhone = /^(010|011|012|015)\d{8}$/;
    return egPhone.test(phoneNumber);
  };

  const [image, setImage] = useState(null);

  const handelChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "phone" && value!="") {
      if (!isValidPhone(value)) {
        e.target.setCustomValidity("يرجى إدخال رقم هاتف صحيح");
      } else {
        e.target.setCustomValidity("");
      }
    }

    if (type === "file" && name === "image") {
      setImage(files[0]);
      setFormData({
        ...formData,
        [name]: files,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        setLoad(true);
        const formDataToSend = new FormData();
        for (const key in formData) {
          if (key === "image") {
            formDataToSend.append(key, formData[key][0]); // إضافة الصورة
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
        await api.post("/admin/createUser", formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAlert({ msg: "تم انشاء الحساب بنجاح", variant: 1 });
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          setAlert({
            msg: "انتهت جلستك.يرجى تسجيل الدخول مره اخرى",
            variant: 3,
          });
          Object.keys(Cookies.get()).forEach(function (cookieName) {
            Cookies.remove(cookieName);
          });
          setTimeout(() => {
            navigate("/admin-login");
          }, 2500);
        } else if(error.response.status === 422) {
          setAlert({ msg: "الايميل مستخدم بالفعل", variant: 3 });
        }
        else{
          setAlert({ msg: "حدث خطأ. تاكد من الاتصال بالانترنت", variant: 2 });
        }
      } finally {
        setShow(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setLoad(false);
      }
    }
    setValidated(true);
  };

  return (
    <Container className="signup-container mt-3" dir="rtl">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={7}>
          <h2 className="text-center mb-4" style={{ color: "#007bff" }}>
            إنشاء حساب لمستخدم جديد
          </h2>

          <Form
            className="p-4 border rounded"
            noValidate
            validated={validated}
            onSubmit={handelSubmit}
          >
            <Form.Group as={Col} controlId="formFirstName">
              <Form.Label className="fs-5 mb-2 required">اسم المستخدم</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="اسم المستخدم"
                onChange={handelChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mt-2">
              <Form.Label className="fs-5 mb-2 required">
                البريد الإلكتروني
              </Form.Label>
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

            <Form.Group controlId="formBasicPassword" className="mt-2">
              <Form.Label className="fs-5 mb-2 required">
                كلمة المرور
              </Form.Label>
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

            <Form.Group controlId="formRole" className="mb-3">
              <Form.Label className="fs-5 mb-2 required">
                نوع المستخدم
              </Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Admin"
                  name="role"
                  type="radio"
                  id="admin"
                  value="admin"
                  onChange={handelChange}
                  required
                />
                <Form.Check
                  inline
                  label="SEO"
                  name="role"
                  type="radio"
                  id="seo"
                  value="seo"
                  onChange={handelChange}
                  required
                />
                <Form.Check
                  inline
                  label="Writer"
                  name="role"
                  type="radio"
                  id="writer"
                  value="writer"
                  onChange={handelChange}
                  required
                />
              </div>
              <Form.Control.Feedback type="invalid">
                يجب اختيار نوع المستخدم
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label className="fs-5 mb-2">رقم التليفون</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                onChange={handelChange}
                placeholder="ادخل رقم المستخدم"
              />
              <Form.Control.Feedback type="invalid">
                ادخل رقم الهاتف بشكل صحيح "01xxxxxxxxx"
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="image" className="mb-3">
              <Form.Label className="fs-5 mb-2">صورة الشخص</Form.Label>
              <Form.Control type="file" name="image" onChange={handelChange} />
              {image && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="MainImage"
                    style={{
                      maxWidth: "300px",
                      height: "auto",
                      margin: "0 10px 10px 0",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              )}
              <Form.Control.Feedback type="invalid">
                يجب اختيار صوره للاعلان
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={load}
              className="w-100 mt-2"
            >
              {load ? <LoadingBtn /> : "إنشاء حساب"}
            </Button>
          </Form>
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
      {/*  */}

      
    </Container>
  );
}
