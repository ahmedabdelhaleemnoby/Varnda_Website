import React, { useState } from 'react';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { Image, Col, Container, Row, Form, Button } from 'react-bootstrap';
import styles from './ProfilePage.module.css';
import AlertMessage from "../../Components/Alert/Alert.js";
import LoadingBtn from "../../Components/LoadingBtn.js";
import api from "../../API/ApiLink.js";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import usePageSEO from '../../hooks/usePageSEO.js';
const ProfilePage = () => {
  
// Set SEO settings
usePageSEO({
  title: "الملف الشخصى",
  keywords:["الملف الشخصى"],
});
  const token = Cookies.get('token');
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [load3, setLoad3] = useState(false);
  const navigate = useNavigate();
  const [profileImageFile, setProfileImageFile] = useState(null); // State for the image file

  // State for password form
  const [passwordForm, setPasswordForm] = useState({
    old_password: '',
    new_password: '',
    new_password_confirmation: ''
  });

  // State for user details form
  const [userForm, setUserForm] = useState({
    first_name: Cookies.get("first_name"),
    last_name: Cookies.get("last_name"),
    phone: Cookies.get("phone"),
    whats_phone: Cookies.get("whats_phone"),
    bio: Cookies.get("bio"),
    user_type: Cookies.get("user_type"),
  });

  // State for profile image
  const [profileImage, setProfileImage] = useState(Cookies.get("image"));
  const [imageSelected, setImageSelected] = useState(false);


  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle user form changes
  const handleUserFormChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prevState => ({
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
      if (passwordForm.new_password !== passwordForm.new_password_confirmation) {
        setAlert({
          msg: "كلمات المرور الجديدة غير متطابقة",
          variant: 3
        })
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setShow(true);
      } else {
        setLoad(true);
        try {
          await api.post("/change_password", {
            ...passwordForm
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          setAlert({
            msg: "تم تحديث كلمه السر بنجاح",
            variant: 1
          })
          Cookies.remove("token")
          setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
          if (error.response.data.status === 400) {
            setAlert({
              msg: "كلمه المرور غير صحيحه",
              variant: 3
            })
          }
          else if (error.response.status === 401) {
            setAlert({
              msg: "انتهت جلستك.يرجى تسجيل الدخول مره اخرى",
              variant: 3,
            });
            Object.keys(Cookies.get()).forEach(function (cookieName) {
              Cookies.remove(cookieName);
            });
          }
          else {
            setAlert({
              msg: "حدث خطا اثناء تغيير كلمه السر",
              variant: 2
            })
          }
        }
        finally{
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setShow(true);
          setLoad(false)
        }
      }
    }
    setValidated(true);
  };

  const handleUserFormSubmit = async (e) => {
    e.preventDefault();
    setLoad2(true);
    try {
      
      const response = await api.post("/updateUser", {
        ...userForm
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const userData = response.data.data
      Cookies.set("first_name", userData.first_name)
      Cookies.set("last_name", userData.last_name)
      Cookies.set("whats_phone", userData.whats_phone)
      Cookies.set("bio", userData.bio)
      Cookies.set("phone", userData.phone)
      Cookies.set("user_type", userData.user_type)

      setAlert({
        msg: "تم تحديث بياناتك بنجاح",
        variant: 1
      })
    } catch (error) {
      if (error.response.status === 401) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setAlert({
          msg: "انتهت جلستك.يرجى تسجيل الدخول مره اخرى",
          variant: 3,
        });
        Object.keys(Cookies.get()).forEach(function (cookieName) {
          Cookies.remove(cookieName);
        });
      }
      else{
      setAlert({
        msg: "حدث خطا اثناء تغيير البيانات",
        variant: 2
      })
    }
      console.log(error);
    }finally{
      setShow(true)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setLoad2(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setImageSelected(true);
      };
      reader.readAsDataURL(file);

      setProfileImageFile(file); // Save the image file to state
    }
  };

  const handleSaveImage = async () => {
    setLoad3(true);
    try {
      // Create FormData and append image file
      const formData = new FormData();
      if (profileImageFile) {
        formData.append("image", profileImageFile); 
      }
      const response = await api.post("/updateUser", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      const userData = response.data.data;
      Cookies.set("image", userData.image);
      setAlert({
        msg: "تم تحديث الصوره بنجاح",
        variant: 1
      });
      setImageSelected(false);
    } catch (error) {
      if (error.response.status === 401) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setAlert({
          msg: "انتهت جلستك.يرجى تسجيل الدخول مره اخرى",
          variant: 3,
        });
        setShow(true);
        Object.keys(Cookies.get()).forEach(function (cookieName) {
          Cookies.remove(cookieName);
        });
      }
      else{
        setAlert({
          msg: "حدث خطا اثناء تغيير الصوره",
          variant: 2
        });
      }
    }finally{
      setShow(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setLoad3(false);
    }
  };

  return (
    <>

      <Header />
      <Container className={`${styles.container} mt-5`}>
        <h2>صفحتي الشخصية</h2>
        <Row>
          <Col md={6} xs={12} className={`${styles.responsiveColumn} mb-4`}>
            <div className={styles.box}>
              <h5 className={styles.heading}>تغير الصورة الشخصية</h5>
              <Col xs={6} md={4} className={`mx-auto ${styles.avatar_cont}`}>
                <Image src={profileImage} className={`${styles.avatar}`}/>
              </Col>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="imageInput"
              />
              <div className="d-flex gap-5 flex-column flex-sm-row justify-content-between align-items-center mt-3">
                <Button
                  className="btn btn-primary  w-40 "
                  onClick={() => document.getElementById('imageInput').click()}
                >
                  اختيار الصورة
                </Button>
                <Button
                  className="btn btn-success  w-40 "
                  onClick={handleSaveImage}
                  disabled={!imageSelected}
                >
                  {load3 ? <LoadingBtn /> : "حفظ الصورة"}
                </Button>
              </div>
            </div>

            {/* تغيير كلمه السر */}
            <Form className={styles.box} noValidate validated={validated} onSubmit={handlePasswordSubmit}>
              <h5 className={`${styles.heading} mt-2`}>تغير كلمة المرور</h5>
              <Form.Group controlId="formCurrentPassword">
                <Form.Label className="mt-2">كلمة المرور الحالية</Form.Label>
                <Form.Control
                  type="password"
                  name="old_password"
                  value={passwordForm.old_password}
                  onChange={handlePasswordChange}
                  required
                  minLength={8}
                />
              </Form.Group>

              <Form.Group controlId="formNewPassword" className="mt-2">
                <Form.Label className="fs-5 mb-2">كلمة المرور الجديده</Form.Label>
                <Form.Control
                  type="password"
                  name="new_password"
                  value={passwordForm.new_password}
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
                  name="new_password_confirmation"
                  value={passwordForm.new_password_confirmation}
                  onChange={handlePasswordChange}
                  required
                  minLength={8}
                />
                <Form.Control.Feedback type="invalid">
                  كلمه المرور لا تقل عن 8 احرف
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" className="btn btn-primary mt-3 w-50" disabled={load}>{load ? <LoadingBtn /> : "حفظ التعديل"}</Button>
            </Form>
          </Col>

          {/* تعديل البيانات */}
          <Col md={6} xs={12}>
            <Form className={styles.box} onSubmit={handleUserFormSubmit}>
              <h5 className={`${styles.heading} mt-2`}>تعديل بياناتي</h5>
              <Row className="mb-2">
                <Form.Group as={Col} controlId="formFirstName">
                  <Form.Label>الاسم الشخصى</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    placeholder="الاسم الشخصى"
                    value={userForm.first_name}
                    onChange={handleUserFormChange}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formLastName">
                  <Form.Label>ااسم العائله</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    placeholder="اسم العائله"
                    value={userForm.last_name}
                    onChange={handleUserFormChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col} controlId="formPhone">
                  <Form.Label className='mt-2'>رقم الهاتف</Form.Label>
                  <Form.Control
                    type="number"
                    name="phone"
                    value={userForm.phone}
                    onChange={handleUserFormChange}
                  />
                </Form.Group>
                <Form.Group  as={Col} controlId="formWhatsApp">
                  <Form.Label className='mt-2'>رقم الواتس اب</Form.Label>
                  <Form.Control
                    type="number"
                    name="whats_phone"
                    value={userForm.whats_phone}
                    onChange={handleUserFormChange}
                  />
                </Form.Group>
              </Row>

              <Form.Group controlId="formUserType">
                        <Form.Label className='mt-2'>نوع المستخدم</Form.Label>
                        <Form.Select
                          name="user_type"
                          value={userForm.user_type}
                          onChange={handleUserFormChange}
                          required
                        >
                          <option value="">اختر</option>
                          <option key="1" value="مالك">مالك</option>
                          <option key="2" value="سمسار">سمسار</option>
                          <option key="3" value="شركة تسويق">شركة تسويق</option>
                          <option key="4" value="شركة عقارية">شركة عقارية</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          الرجاء اختيار نوع المستخدم.
                        </Form.Control.Feedback>
                      </Form.Group>

              <Form.Group controlId="formAbout">
                <Form.Label className='mt-4'>تكلم عن نفسك</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="تكلم عن نفسك ..."
                  name="bio"
                  value={userForm.bio}
                  onChange={handleUserFormChange}
                />
              </Form.Group>
              <Button type="submit" className="btn btn-primary mt-5 w-50" disabled={load2}>{load2 ? <LoadingBtn /> : "حفظ التعديل"}</Button>
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
      <Footer />
    </>
  );
}

export default ProfilePage;