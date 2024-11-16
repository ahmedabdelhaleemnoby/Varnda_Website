import { useEffect, useState } from "react";
import ArticleEditor from "../../../Components/Editor/Editor.js";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../../API/ApiLink.js";
import LoadingBtn from "../../../Components/LoadingBtn.js";
import AlertMessage from "../../../Components/Alert/Alert.js";
import Cookies from "js-cookie";
import AddTag from "./../../../Components/Tags/AddTag";
import { useLocation } from "react-router-dom";
import AlertArError from "../../../Components/Alert/AlertArError.js";

export default function EditArticle() {
  const navigate = useNavigate();
  const location = useLocation();
  const Article = location.state?.data;
  const token = Cookies.get("token");

  const [staticBody, setStaticBody] = useState("");
  const [article_body, setArticle_body] = useState("");
  const [article_image, setArticle_image] = useState(null);
  const [articleImage, setArticleImage] = useState(null);
  const [formData, setFormData] = useState({
    article_url: "",
    title: "",
    category_id: "",
    key_words: "",
    meta_description: "",
    article_id: "",
    finished: "",
  });
  const [TagsInBasket, setTagsInBasket] = useState([]);

  // وضع القيم فى الخانات
  useEffect(() => {
    const fetchArticle = async () => {
      setFormData({
        article_url: Article.Article_url,
        title: Article.Title,
        category_id: Article.category_id,
        key_words: Article.key_words,
        meta_description: Article.meta_description,
        article_id: Article.id,
        finished: "",
      });
      setTagsInBasket(Article.tags);
      setArticleImage(Article.Article_image);
      setArticle_body(Article.Article_body);
      setStaticBody(Article.Article_body);
    };
    if (Article) fetchArticle();
  }, [Article]);

  const [categories, setCategories] = useState([]);
  const [validated, setValidated] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });
  const [showArError, setShowArError] = useState(false);
  const [alertArError, setAlertArError] = useState([]);

  const handleClose = () => setShowConfirm(false);
  const handleShow = (finished) => {
    setShowConfirm(true);
    setFormData({
      ...formData,
      finished: finished,
    });
  };

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
        formData.category_id
      ) {
        const imageUrls = extractImageUrls(article_body);
        const formDataToSend = new FormData();
        if (article_image) {
          formDataToSend.append("article_image", article_image);
        }
        if (article_body !== Article.Article_body) {
          formDataToSend.append("article_body", article_body);
        }
        if (formData.article_url !== Article.Article_url) {
          formDataToSend.append("article_url", formData.article_url.trim().replace(/ /g, "-"));
        }
        if (formData.title !== Article.Title) {
          formDataToSend.append("title", formData.title);
        }
        if (formData.category_id !== Article.category_id) {
          formDataToSend.append("category_id", formData.category_id);
        }
        if (formData.key_words !== Article.key_words) {
          formDataToSend.append("key_words", formData.key_words);
        }
        if (formData.meta_description !== Article.meta_description) {
          formDataToSend.append("meta_description", formData.meta_description);
        }
        formDataToSend.append("finished", formData.finished);
        if(TagsInBasket.length>0){
          let tags = TagsInBasket.join(",");
          formDataToSend.append("tags", tags); 
        }
        // Set Post
        try {
          setLoad(true);
          await api.post(
            `/updatePost/${formData.article_id}`,
            formDataToSend,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          //Confirm images url
          try {
            await api.post(
              `/updatePost_images/${formData.article_id}`,
              { image_paths: imageUrls },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (formData.finished) {
              setAlert({ msg: "تم تعديل المدونة", variant: 1 });
              setTimeout(() => {
                navigate("/dashboard/Blogs");
              }, 2000);
            } else {
              setAlert({ msg: "تم تعديل المسودة", variant: 1 });
              setTimeout(() => {
                navigate("/dashboard/Drafts");
              }, 2000);
            }
            setShow(true);
          } catch (error) {
            console.log(error)        
              setAlert({ msg: "حدث خطا اثناء تعديل المدونة", variant: 2 });     
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
      } else {
        setAlert({ msg: "تاكد من ملئ جميع البيانات", variant: 2 });
        setShow(true);
        setShowConfirm(false);
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setValidated(true);
  };

  // Handle cases where data might not have been passed correctly
  if (!Article) {
    return <div>No data!</div>;
  }

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
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLink">
                <Form.Label>رابط المدونة:</Form.Label>
                <Form.Control
                  type="text"
                  name="article_url"
                  value={formData.article_url}
                  placeholder="عباره عن كلمه تكون فريده من نوعها"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>
            <Form.Group as={Col} controlId="formGridMeta">
              <Form.Label>ميتا دسكريبشن:</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="ادخل الميتا دسكريبشن"
                style={{ height: "100px" }}
                name="meta_description"
                value={formData.meta_description}
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
                value={formData.key_words}
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

              <div className="mt-2">
                <h5>الصورة الأساسية</h5>
                {article_image ? (
                  <img
                    src={URL.createObjectURL(article_image)}
                    alt="newarticleimage"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      margin: "0 10px 10px 0",
                      borderRadius: "5px",
                    }}
                  />
                ) : (
                  <img
                    src={articleImage}
                    alt="articleimage"
                    style={{
                      maxWidth: "100%",
                      height: "200px",
                      margin: "0 10px 10px 0",
                      borderRadius: "5px",
                    }}
                  />
                )}
              </div>
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
            <ArticleEditor
              setArticle_body={setArticle_body}
              article_body={article_body}
              staticBody={staticBody}
            />
          </Form.Group>
        </Row>

        <Row className="justify-content-evenly mt-3">
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
            تعديل المدونة
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
            تعديل المسودة
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
            هل متأكد من حفظ التعديل
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
              {load ? <LoadingBtn /> : "حفظ التعديل"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  );
}
