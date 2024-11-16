import { useEffect, useState } from "react";
import ArticleEditor from "../../../Components/Editor/Editor.js";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../../API/ApiLink.js";
import LoadingBtn from "../../../Components/LoadingBtn.js";
import AlertMessage from "../../../Components/Alert/Alert.js";
import Cookies from "js-cookie";
import AddTag from "./../../../Components/Tags/AddTag";
import AlertArError from "../../../Components/Alert/AlertArError.js";

export default function AddArticle() {
  const token = Cookies.get("token");
  const adminId = Cookies.get("user_id");

  const [article_body, setArticle_body] = useState("");
  const [categories, setCategories] = useState([]);
 
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClose = () => setShowConfirm(false);
  const handleShow = (finished) => {
    setShowConfirm(true);
    setFormData({
      ...formData,
      finished: finished,
    });
  };

  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });

  const [showArError, setShowArError] = useState(false);
  const [alertArError, setAlertArError] = useState([]);

  const [TagsInBasket, setTagsInBasket] = useState([]);
  const [formData, setFormData] = useState({
    title: "", //req
    article_url: "", //req
    meta_description: "",
    key_words: "",
    category_id: "",
    finished: "",
  });
  const [article_image, setArticle_image] = useState(null);

  function extractImageUrls(htmlString) {
    const urls = [];
    const regex = /<img[^>]+src="([^">]+)"/g;
    let match;
    while ((match = regex.exec(htmlString)) !== null) {
      urls.push(match[1]);
    }
    return urls;
  }

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (name === "article_image") {
        setArticle_image(files[0]);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // API for get Category
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get("/getallcategories");
        setCategories(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);




  const handelSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (
        formData.title &&
        formData.article_url &&
        formData.meta_description &&
        formData.key_words &&
        formData.category_id &&
        article_image
      ) {
        const imageUrls = extractImageUrls(article_body);
        const formDataToSend = new FormData();
        formDataToSend.append("article_image", article_image);
        formDataToSend.append("article_body", article_body);
        formDataToSend.append("admin_id", adminId);
        let tags = TagsInBasket.join(",");
        formDataToSend.append("tags", tags);

        for (const key in formData) {
          if(key==='article_url'){
            formDataToSend.append(key, formData[key].trim().replace(/ /g, "-"));
          }
          else{
            formDataToSend.append(key, formData[key]);
          }
        }

        // Set Post
        try {
          setLoad(true);
          const response = await api.post("/storePost", formDataToSend, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
          const postId = response.data.data.post_id;
          //Confirm images url
          try {
            await api.post(
              `/handlingPostImages/${postId}`,
              { image_paths: imageUrls },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if(formData.finished){
                setAlert({ msg: "تم نشر المدونة", variant: 1 });
                setTimeout(() => {
                  navigate("/dashboard/Blogs");
                }, 2000);
            }
            else{
                setAlert({ msg: "تم حفظ المسودة", variant: 1 });
                setTimeout(() => {
                  navigate("/dashboard/Drafts");
                }, 2000);
            }
            setShow(true);
          } catch (error) {
            console.log(error)        
            setAlert({ msg: "حدث خطا اثناء نشر المدونة", variant: 2 });    
            setShow(true) 
          }
        } catch (error) {
          console.log(error)
          if (error.response.status === 422) {
            setAlertArError(error.response.data.data)
            setShowArError(true)
          } else if (error.response.status === 401) {
            setAlert({
              msg: "انتهت جلستك.يرجى تسجيل الدخول مره اخرى",
              variant: 3,
            });
              // localStorage.removeItem("role");
              Object.keys(Cookies.get()).forEach(function (cookieName) {
                Cookies.remove(cookieName);
              });
              setShow(true);
          }
        } finally {
          setLoad(false);
          setShowConfirm(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } 
      else {
        setAlert({ msg: "تاكد من ملئ جميع البيانات", variant: 2 });
        setShow(true);
        setShowConfirm(false);
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setValidated(true);
  };

  return (
    <>
      <Form
        className="p-4 border rounded"
        noValidate
        validated={validated}
        onSubmit={handelSubmit}
        style={{ position: "relative" }}
      >
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
        <Row>
          <Col xs={12} md={8}>
            <Row>
              <Form.Group as={Col} controlId="formGridTitle">
                <Form.Label>عنوان المدونة:</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLink">
                <Form.Label>رابط المدونة:</Form.Label>
                <Form.Control
                  type="text"
                  name="article_url"
                  placeholder="عباره عن كلمه تكون فريده من نوعها"
                  onChange={handleChange}
                  required
                  isInvalid
                />
                <Form.Control.Feedback type="invalid">
                  يمنع استخدام علامه '/' فى الكلمه
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group as={Col} controlId="formGridMeta">
              <Form.Label>ميتا دسكريبشن:</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="ادخل الميتا دسكريبشن"
                style={{ height: "100px" }}
                name="meta_description"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridKeywords">
              <Form.Label>الكلمات المفتاحية:</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="ادخل الكلمات المفتاحية: اكتب الكلمه ثم ',' فصله ثم الكلمه الاخرى على سبيل المثال: كلمه اولى , كلمه ثانيه وهكذا"
                style={{ height: "100px" }}
                name="key_words"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="category">
              <Form.Label className="required">نوع المدونة: </Form.Label>
              <Form.Select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
              >
                <option value="">اختر نوع المدونة</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group controlId="article_image" className="mb-3">
              <Form.Label className="required">الصورة الأساسية للمقال:</Form.Label>
              <Form.Control
                type="file"
                name="article_image"
                onChange={handleChange}
                required
              />
              {article_image && (
                <div className="mt-2">
                  <h5>الصورة الأساسية</h5>
                  <img
                    src={URL.createObjectURL(article_image)}
                    alt="articleimage"
                    style={{
                      maxWidth: "100%",
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
          </Col>
        </Row>
        <Row>
          <AddTag
            TagsInBasket={TagsInBasket}
            setTagsInBasket={setTagsInBasket}
          />
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>المدونة:</Form.Label>
            <ArticleEditor setArticle_body={setArticle_body} />
          </Form.Group>
        </Row>
        <Row className="justify-content-evenly  mt-3">
          <Button
            as={Col}
            xs={5}
            md={4}
            lg={3}
            variant="primary"
            onClick={() => {
              handleShow(1);
            }}
          >
            نشر المدونة
          </Button>
          <Button
            as={Col}
            xs={5}
            md={4}
            lg={3}
            variant="info"
            onClick={() => {
              handleShow(0);
            }}
          >
            حفظ كمسودة
          </Button>
        </Row>

        <Modal
          show={showConfirm}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body
            style={{ fontSize: "30px", fontWeight: "bold", color: "#06377e" }}
          >
            هل متأكد من الحفظ
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              الغاء
            </Button>
            <Button
              variant="success"
              // type="submit"
              disabled={load}
              onClick={(e) => {
                handelSubmit(e);
              }}
            >
              {load ? <LoadingBtn /> : "حفظ"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  );
}
