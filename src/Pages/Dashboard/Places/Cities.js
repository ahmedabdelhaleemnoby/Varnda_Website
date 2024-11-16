import { useEffect, useState } from "react";
import { Form, Button, Table, Row, Col, Alert } from "react-bootstrap";
import api from "../../../API/ApiLink.js";
import LoadingBtn from "../../../Components/LoadingBtn.js";
import Cookies from "js-cookie";
import OverPage from "../../../Components/OverPage/OverPage.js";
import AlertMessage from "../../../Components/Alert/Alert.js";
import DeleteItem from "../../../Components/DeleteItem/DeleteItem.js";
import { Link, useNavigate } from "react-router-dom";

export default function Cities() {

  const navigate = useNavigate();
  const role = Cookies.get("role")
  // const role = localStorage.getItem("role")
  const token = Cookies.get("token");
  const [formData, setFormData] = useState({
    governorate: 1,
    name: "",
    english_name: "",
    meta_title: "",
    h1_title: "",
    meta_description: "",
    image: "",
    url: "",
  });


  const resetData = () => {
    setFormData({
      ...formData,
      name: "",
      english_name: "",
      meta_title: "",
      h1_title: "",
      meta_description: "",
      image: "",
      url: "",
    });
  };

  const [loadId, setLoadId] = useState(false);
  const [image, setImage] = useState(null);
  const [overlay, setOverlay] = useState(false);
  const [load, setLoad] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });
  const [governorates, setGovernorates] = useState([]);
  const [govUrL, setGovUrl] = useState("cairo");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [cities, setCities] = useState([]);


  const handelLocationChange = (e) => {
    const { name, value } = e.target;
    if (name === 'governorate') {
      let selectedGovernorate = governorates.find(gov => gov.id == value);
      if (selectedGovernorate) {
        setGovUrl(selectedGovernorate.url);
      } else {
        setGovUrl('');
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // استرجاع المحافظات
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
        console.log(error);
      } finally {
      }
    };
    fetchGov();
  }, []);

  //استرجاع المدن
  const fetchCity = async () => {
    try {
      setOverlay(true);
      const response = await api.get(
        `/governorates/${formData.governorate}/cities`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCities(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setOverlay(false);
    }
  };
  useEffect(() => {
    fetchCity();
  }, [formData.governorate]);

  // حذف المدينة
  const handleDelete = async (id) => {
    try {
      setLoadId(true);
      await api.post(`/deleteCity/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCity();
    } catch (err) {
      console.log(err);
    } finally {
      setLoadId(false);
    }
  };

  // اضافه مدينة
  const handleAddCities = async (e) => {
    e.preventDefault();
    if (formData.name) {
      setLoad(true);
      const allFormData = new FormData();
      // Append other form fields
      for (const [key, value] of Object.entries(formData)) {
        if (key !== "image") {
          allFormData.append(key, value);
        }
      }
      allFormData.append("governorate_id", formData.governorate);
      if (image) {
        allFormData.append("image", formData.image[0]);
      }
      try {
        const response = await api.post("/addCity", allFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        fetchCity();
        resetData();
        setImage(null);
      } catch (err) {
        if (err.response.data.status == 422) {
          setAlert({ msg: "هناك رابط اخر مشابهه لهذا", variant: 3 });
          setShowAlert(true);
        }
      } finally {
        setLoad(false);
      }
    }
  };

  function handelChange(e) {
    const { name, value, type, files } = e.target;
    if (type === "file" && name === "image") {
      setImage(files[0]);
      setFormData({
        ...formData,
        [name]: files,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  return (
    <>
      <Form onSubmit={handleAddCities} className="mt-3">
        <Row className="mb-2">
          <Form.Group as={Col} xs="6" controlId="formArName">
            <Form.Label className="required">اسم المدينة</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              placeholder="اسم المدينة بالعربى"
              onChange={handelChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} xs="6" controlId="formAEnName">
            <Form.Label>اسم المدينة انجليزى</Form.Label>
            <Form.Control
              type="text"
              name="english_name"
              value={formData.english_name}
              placeholder="اسم المدينة بالانجليزى"
              onChange={handelChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-2">
          <Form.Group as={Col} xs="6" controlId="formTitle">
            <Form.Label>العنوان الرئيسي</Form.Label>
            <Form.Control
              type="text"
              name="h1_title"
              value={formData.h1_title}
              onChange={handelChange}
            />
          </Form.Group>
          <Form.Group as={Col} xs="6" controlId="formMetaTitle">
            <Form.Label>عنوان الصفحه فى الميتا</Form.Label>
            <Form.Control
              type="text"
              name="meta_title"
              value={formData.meta_title}
              onChange={handelChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-2">
          <Form.Group as={Col} xs="6" controlId="formTitle">
            <Form.Label>رابط المدينة</Form.Label>
            <Form.Control
              type="text"
              name="url"
              value={formData.url}
              placeholder="يجب ان يكون فريد من نوعه"
              onChange={handelChange}
            />
          </Form.Group>

          <Form.Group as={Col} xs="6" controlId="formMetaTitle">
            <Form.Label>ميتا دسكريبشن</Form.Label>
            <Form.Control
              as="textarea"
              name="meta_description"
              value={formData.meta_description}
              onChange={handelChange}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group controlId="image" className="mb-3">
            <Form.Label>الصورة الأساسية للصفحة</Form.Label>
            <Form.Control type="file" name="image" onChange={handelChange} />
            {image && (
              <div className="mt-2">
                <h5>الصورة الأساسية</h5>
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
          </Form.Group>
        </Row>

        <Col className="my-2">
          <Button type="submit" disabled={load}>
            {load ? <LoadingBtn /> : "اضف المدينة"}
          </Button>
        </Col>
      </Form>

      <hr />
      <hr />

      <Form.Group controlId="governorate" className="mb-3">
        <Form.Label className="required">المحافظة</Form.Label>
        <Form.Select
          name="governorate"
          value={formData.governorate}
          onChange={handelLocationChange}
          required
        >
          {governorates.map((gov, index) => (
            <option key={gov.id} value={gov.id}>
              {gov.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      {overlay ? (
        <OverPage />
      ) : (
        <>
          {cities.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>اسم المدينة</th>
                  <th>الاسم بالانجليزى</th>
                  <th>عنوان الصفحه</th>
                  <th>الصوره</th>
                  <th>عنوان الميتا</th>
                  <th>الرابط</th>
                  <th colSpan={2} className="text-center">
                    أجراءات
                  </th>
                </tr>
              </thead>
              <tbody>
                {cities.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.english_name}</td>
                    <td>{item.h1_title}</td>
                    <td>
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={`صوره الصفحه`}
                          className="img-fluid w-100"
                          style={{ width: "100px", height: "70px" }}
                        />
                      ) : (
                        "لايوجد صوره"
                      )}
                    </td>
                    <td>{item.meta_title}</td>
                    <td>
                      {govUrL && item.url ? (
                        <Link to={`/${govUrL}/${item.url}`}>{item.url}</Link>
                      ) : (
                        <span>Invalid URL</span>
                      )}
                    </td>

                    <td>
                      <Button
                        variant="warning"
                        onClick={() => {
                          navigate("/dashboard/edit-cities", {
                            state: { data: cities[index] },
                          });
                        }}
                      >
                        تعديل
                      </Button>
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
          ) : (
            <Alert key="warning" variant="warning">
              لا يوجد مدن
            </Alert>
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
      )}
    </>
  );
}
