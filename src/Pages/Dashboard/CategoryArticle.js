import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Col,
  Form,
  InputGroup,
  Row,
  Modal,
  Alert,
} from "react-bootstrap";
import api from "../../API/ApiLink.js";
import Cookies from "js-cookie";
import LoadingBtn from "../../Components/LoadingBtn.js";
import OverPage from "./../../Components/OverPage/OverPage";
import DeleteItem from "./../../Components/DeleteItem/DeleteItem";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../Components/Alert/Alert.js";
function CategoryArticle() {
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });
  const [category_name, setCategory_name] = useState("");
  const [load, setLoad] = useState(false);
  const [loadId, setLoadId] = useState(false);
  const [data, setData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [show, setShow] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const handleClose = () => setShow(false);
  const [loadEdit, setLoadEdit] = useState(false);

  const handleShow = (id, name) => {
    setSelectedItemId(id, name);
    setNewCategory(name);
    setShow(true);
  };
  const [overlay, setOverlay] = useState(false);

  // Get All Category
  const fetchData = async () => {
    try {
      setOverlay(true);
      const response = await api.get(`/getallcategories`);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setOverlay(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEdite = async () => {
    if (newCategory) {
      try {
        setLoadEdit(true);
        const response = await api.post(
          `/categories/${selectedItemId}?category_name=${newCategory.trim().replace(/ /g, "-")}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchData();
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
        } else {
          setAlert({
            msg: "حدث خطأ اثناء تعديل التصنيف .يرجى المحاوله مره اخرى",
            variant: 2,
          });
        }
        setShowAlert(true);
      } finally {
        setLoadEdit(false);
        setShow(false);
      }
    }
  };

  const handleDelete = async (id) => {
    setLoadId(true);
    try {
      // const token = Cookies.get("token")
      const response = await api.delete(`/delCategory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
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
      } else {
        setAlert({
          msg: "حدث خطأ اثناء حذف التصنيف .يرجى المحاوله مره اخرى",
          variant: 2,
        });
      }
      setShowAlert(true);
    } finally {
      setLoadId(false);
    }
  };

  // New Category
  function handleNewCategory(e) {
    setNewCategory(e.target.value);
  }

  //Add Category
  function handleChangeCategory(e) {
    setCategory_name(e.target.value);
  }

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const response = await api.post(
        "/AddCategory",
        { category_name: category_name.trim().replace(/ /g, "-")},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
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
      } else {
        setAlert({
          msg: "حدث خطأ اثناء اضافة التصنيف .يرجى المحاوله مره اخرى",
          variant: 2,
        });
      }
      setShowAlert(true);
    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleAddCategory} className="mt-3">
        <Row className="align-items-center">
          <Col xs="8">
            <InputGroup className="mb-2">
              <Form.Control
                id="inlineFormInputGroup"
                className="text-end"
                name="category_name"
                onChange={handleChangeCategory}
                required
                placeholder="اكتب اسم التصنيف"
              />
            </InputGroup>
          </Col>
          <Col xs="4">
            <Button type="submit" className="mb-2">
              {load ? <LoadingBtn /> : "اضف تصنيف"}
            </Button>
          </Col>
        </Row>
      </Form>
      {overlay ? (
        <OverPage />
      ) : (
        <>
          {data.length > 0 ? (
            <>
              <h2 className="text-center title-page py-1 pb-2 container my-3">
                تصنيفات المدونات
              </h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>اسم التصنيف</th>
                    <th>تعديل</th>
                    <th>حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.category_name}</td>
                      <td>
                        <Button
                          variant="warning"
                          onClick={() => {
                            handleShow(item.id, item.category_name);
                          }}
                        >
                          تعديل
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header>
                            <Modal.Title>تعديل اسم التصنيف</Modal.Title>
                          </Modal.Header>

                          <Modal.Body>
                            <Form.Control
                              type="text"
                              name="newCategory"
                              value={newCategory}
                              onChange={handleNewCategory}
                            />
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              الغاء
                            </Button>
                            <Button
                              variant="primary"
                              onClick={handleEdite}
                              disabled={loadEdit}
                            >
                              {loadEdit ? <LoadingBtn /> : " حفظ التعديل"}
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </td>
                      {role === "admin" && (
                        <DeleteItem
                          id={selectedItemId}
                          setId={setSelectedItemId}
                          itemId={item.id}
                          DeleteFun={handleDelete}
                          load={loadId}
                        />
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <Alert key="warning" variant="warning">
              لا يوجد تصنيفات
            </Alert>
          )}
        </>
      )}

      {showAlert && (
        <>
          <AlertMessage
            msg={alert.msg}
            setShow={setShowAlert}
            variant={alert.variant}
          />
        </>
      )}
    </>
  );
}

export default CategoryArticle;
