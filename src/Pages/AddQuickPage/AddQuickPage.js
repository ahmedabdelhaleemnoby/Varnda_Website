import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import api from "../../API/ApiLink.js";
import Cookies from "js-cookie";
import "./AddQuickPage.css";
import LoadingBtn from "../../Components/LoadingBtn.js";
import AlertMessage from "../../Components/Alert/Alert.js";
import { useNavigate } from "react-router-dom";
import AlertArError from "../../Components/Alert/AlertArError.js";
import ArticleEditor from "../../Components/Editor/Editor.js";
const AddQuickPage = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");  
  const [showArError, setShowArError] = useState(false);
  const [alertArError, setAlertArError] = useState([]);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });

  // function extractImageUrls(htmlString) {
  //   const urls = [];
  //   const regex = /<img[^>]+src="([^">]+)"/g;
  //   let match;
  //   while ((match = regex.exec(htmlString)) !== null) {
  //     urls.push(match[1]);
  //   }
  //   return urls;
  // }
  const [formData, setFormData] = useState({
    user_id: Cookies.get("user_id"), //👍
    details_ar: "", //👍
    "images[]": "", //👍
    governorate: "", //👍
    city: "", //👍
    type: "sale", //👍
    phone: Cookies.get("phone"),
    email: Cookies.get("email"),
  });
  const [images, setImages] = useState([]);
  const [cities, setCities] = useState([]);
  const [validated, setValidated] = useState(false);
  const [governorates, setGovernorates] = useState([]);

  // API for get data to choose from it
  useEffect(() => {
    const fetchGov = async () => {
      try {
        const response = await api.get("/governorates", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGovernorates(response.data.data);
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
        console.log(error);
      }
    };
    fetchGov();
  }, [token]);
  //City
  useEffect(() => {
    const fetchCity = async () => {
      const govId = governorates.find((e) => {
        return e.name === formData.governorate;
      })["id"];
      try {
        const response = await api.get(`/governorates/${govId}/cities`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCities(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCity();
  }, [formData.governorate, token, governorates]);

  const isValidPhone = (phoneNumber) => {
    const egPhone = /^(010|011|012|015)\d{8}$/;
    return egPhone.test(phoneNumber);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && name === "images[]") {
      setImages(Array.from(files));
      setFormData({
        ...formData,
        [name]: files,
      });
    } else if (name === "phone") {
      if (!isValidPhone(value)) {
        e.target.setCustomValidity("يرجى إدخال رقم هاتف صحيح");
      } else {
        e.target.setCustomValidity("");
      }
      setFormData({ ...formData, phone: value, whats_phone: value });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setAlert({ msg: "يرجى التأكد من ملئ الحقول المطلوبه *", variant: 3 });
      window.scrollTo({ top: 0, behavior: "smooth" });
      setShow(true);
    } else {
      const token = Cookies.get("token");
      try {
        setLoad(true);
        const allFormData = new FormData();

        // Append other form fields
        allFormData.append("user_id", formData.user_id);
        allFormData.append("details_ar", formData.details_ar);
        allFormData.append("governorate", formData.governorate);
        allFormData.append("city", formData.city);
        allFormData.append("type", formData.type);

        // Append images
        if (images) {
          for (let i = 0; i < images.length; i++) {
            allFormData.append("images[]", formData["images[]"][i]);
          }
        }

        // Make property
        const response = await api.post("/AddProperties", allFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        const prop_id = response.data.data.property_id;
        // Make Ads
        try {
          await api.post(
            "/makeAd",
            {
              property_id: prop_id,
              phone: formData.phone,
              whats_phone: formData.phone,
              email: formData.email,
              ad_type: 1,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // ملئ بيانات التواصل مباشرة
          const phone = Cookies.get("phone") || null;
          const whats_phone = Cookies.get("whats_phone") || null;
           
           
          if (phone === null) {
            Cookies.set("phone", formData.phone);
          }
          if (whats_phone === null) {
            Cookies.set("whats_phone", formData.whats_phone);
          }
          setAlert({ msg: "تم حفظ الإعلان بنجاح", variant: 1 });
          window.scrollTo({ top: 0, behavior: "smooth" });
          setShow(true);
          setTimeout(() => {
            navigate("/submit-property");
          }, 2000);
        } catch (err) {
          console.log(err);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 422) {
          setAlertArError(error.response.data.data)
          setShowArError(true)
        }else{
          setAlert({
            msg: "حدث خطا اثناء حفظ الاعلان يرجى المحاوله مره ثانيه",
            variant: 2,
          });
        setShow(true);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      } finally {
        setLoad(false);
      }
    }
    setValidated(true);
  };

  return (
    <>
      <Header />
      <Container fluid className="px-0">
        <div className="bg-primary text-white py-3 mb-4">
          <h1 className="text-center mb-0">إضافة إعلان سريع</h1>
        </div>
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8}>
              <div className="shadow-sm p-4 mb-5 bg-white rounded">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group controlId="details_ar" className="mb-3">
                    <Form.Label className="required">
                      أضف تفاصيل العقار
                    </Form.Label>
                    <ArticleEditor
    value={formData.details_ar}
    setArticle_body={(content) =>
      setFormData({ ...formData, details_ar: content })
    }
  />
                    {/* <Form.Control
                      as="textarea"
                      rows={4}
                      name="details_ar"
                      value={formData.details_ar}
                      onChange={handleChange}
                      required
                    /> */}
                  </Form.Group>

                  <Form.Group controlId="governorate" className="mb-3">
                    <Form.Label className="required">المحافظة</Form.Label>
                    <Form.Select
                      name="governorate"
                      value={formData.governorate}
                      onChange={handleChange}
                      required
                    >
                      <option value="">اختر المحافظة</option>
                      {governorates.map((gov, index) => (
                        <option key={gov.id} value={gov.name}>
                          {gov.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group controlId="city" className="mb-3">
                    <Form.Label className="required">المدينة</Form.Label>
                    <Form.Select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    >
                      <option value="">اختر المدينة</option>
                      {cities.map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group controlId="phone" className="mb-3">
                        <Form.Label className="required">
                          رقم الهاتف او الواتساب
                        </Form.Label>
                        <Form.Control
                          type="number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          ادخل رقم الهاتف بشكل صحيح "01xxxxxxxxx"
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group controlId="type" className="mb-3">
                        <Form.Label className="required">
                          هدف الإعلان
                        </Form.Label>
                        <Form.Select
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          required
                        >
                          <option value="sale">بيع</option>
                          <option value="rent">إيجار</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId="images[]" className="mb-3">
                    <Form.Label className="required">
                      قم بتحميل صور الاعلان
                    </Form.Label>
                    <Form.Control
                      type="file"
                      name="images[]"
                      onChange={handleChange}
                      multiple
                      required
                    />
                    {images.length > 0 && (
                      <div className="mt-2">
                        <h5>الصور:</h5>
                        <div className="d-flex flex-wrap">
                          {images.map((image, index) => (
                            <img
                              key={index}
                              src={URL.createObjectURL(image)}
                              alt={`AdditionalImage ${index}`}
                              style={{
                                maxWidth: "150px",
                                height: "auto",
                                margin: "0 10px 10px 0",
                                borderRadius: "5px",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </Form.Group>

                  <div className="text-center d-flex justify-content-center">
                    <Button variant="primary" type="submit" disabled={load}>
                      {load ? <LoadingBtn /> : "تجهيز الاعلان "}
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
        {showArError && (
          <>
            <AlertArError
              msg={alertArError}
              setShowArError={setShowArError}
            />
          </>
        )}
        {show && (
          <>
            <AlertMessage
              msg={alert.msg}
              setShow={setShow}
              variant={alert.variant}
            />
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default AddQuickPage;
