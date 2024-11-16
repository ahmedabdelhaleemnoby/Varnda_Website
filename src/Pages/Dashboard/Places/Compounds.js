import { useEffect, useState } from "react";
import { Form, Button, Table,Row, Col, Alert } from "react-bootstrap";
import api from "../../../API/ApiLink.js";
import LoadingBtn from "../../../Components/LoadingBtn.js";
import Cookies from "js-cookie";
import OverPage from "../../../Components/OverPage/OverPage.js";
import AlertMessage from "../../../Components/Alert/Alert.js";
import DeleteItem from "../../../Components/DeleteItem/DeleteItem.js";
import { Link, useNavigate } from "react-router-dom";

export default function Compounds() {

  const navigate = useNavigate();
  const role = Cookies.get("role")
  const token = Cookies.get("token");
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    governorate: "",
    name: "",
    english_name: "",
    meta_title: "",
    h1_title: "",
    meta_description: "",
    image: "",
    url: "",
  });

  const [load, setLoad] = useState(false);
  const [loadId, setLoadId] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });
  const [governorates, setGovernorates] = useState([]);
  const [cities, setCities] = useState([]);
  const [compounds, setCompounds] = useState([]);
  const [govUrL, setGovUrl] = useState('');
  const [cityUrL, setCityUrl] = useState('');

  
  const [selectedItemId, setSelectedItemId] = useState(null);

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

  const handleGetChange = (e) => {
    const { name, value } = e.target;
   
    if (name === "city") {
      // خاصه باللينكات
      let selectedCity = cities.find((city) => city.id == value);
      if (selectedCity) {
        setCityUrl(selectedCity.url);
      } else {
        setCityUrl("");
      }
      setFormData({ ...formData, city: value });
      // setCities([]);
      setCompounds([]);
    } 

    if (name === "governorate") {
      // خاصه باللينكات
      let selectedGovernorate = governorates.find((gov) => gov.id == value);
      if (selectedGovernorate) {
        setGovUrl(selectedGovernorate.url);
      } else {
        setGovUrl("");
      }
      setFormData({ ...formData, governorate: value, city: "" });
      setCities([]);
      setCompounds([]);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // استرجاع المحافظات
  useEffect(() => {
    const fetchGov = async () => {
      try {
        setOverlay(true);
        const response = await api.get("/governorates", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGovernorates(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setOverlay(false);
      }
    };
    fetchGov();
  }, []);

  //استرجاع المدن
  useEffect(() => {
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
    if (formData.governorate) {
      fetchCity();
    }
  }, [formData.governorate]);

  // استرجاع الكومباوند
  const fetchCompound = async () => {
    try {
      setOverlay(true);
      const response = await api.get(
        `/get_compounds_by_city/${formData.city}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCompounds(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setOverlay(false);
    }
  };
  useEffect(() => {
    if (formData.city) {
      fetchCompound();
    }
  }, [formData.governorate, formData.city]);

  // حذف كومباوند
  const handleDelete = async (id) => {
    try {
      setLoadId(true);
      const response = await api.post(`/delete-compound/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCompound();
    } catch (err) {
      console.log(err);
    } finally {
      setLoadId(false);
    }
  };
  // اضافه كومباوند
  const handleAddCompounds = async (e) => {
    e.preventDefault();
    if (formData.city) {
      if (formData.name) {
        setLoad(true);
        const allFormData = new FormData();
        // Append other form fields
        for (const [key, value] of Object.entries(formData)) {
          if (key !== "image") {
            allFormData.append(key, value);
          }
        }
        allFormData.append("city_id", formData.city);
        if (image) {
          allFormData.append("image", formData.image[0]);
        }
        try {
          const response = await api.post("/add-compound", allFormData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
          fetchCompound();
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
    } else {
      setAlert({ msg: "يجب تحديد مدينه لاضافه الكومباوند داخلها", variant: 3 });
      setShowAlert(true);
      setLoad(false);
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
      <Form onSubmit={handleAddCompounds} className="mt-3">
        <Row className="mb-2">
          <Form.Group as={Col} xs="6" controlId="formArName">
            <Form.Label className="required">اسم الكومباوند</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              placeholder="اسم الكومباوند بالعربى"
              onChange={handelChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} xs="6" controlId="formAEnName">
            <Form.Label>اسم الكومباوند انجليزى</Form.Label>
            <Form.Control
              type="text"
              name="english_name"
              value={formData.english_name}
              placeholder="اسم الكومباوند بالانجليزى"
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
            <Form.Label>رابط الكومباوند</Form.Label>
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
            {load ? <LoadingBtn /> : "اضف الكومباوند"}
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
          onChange={handleGetChange}
          required
        >
          <option key={0} value="">
            اختر المحافظة
          </option>
          {governorates.map((gov, index) => (
            <option key={gov.id} value={gov.id}>
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
          onChange={handleGetChange}
          required
        >
          <option key={0} value="">
            اختر المدينة
          </option>
          {cities.map((city) => (
            <option key={city.name} value={city.id}>
              {city.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {showAlert && (
        <>
          <AlertMessage
            msg={alert.msg}
            setShow={setShowAlert}
            variant={alert.variant}
          />
        </>
      )}
      {overlay ? (
        <OverPage />
      ) : (
        <>
          {compounds.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>اسم الكومباوند</th>
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
                {compounds.map((item, index) => (
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
                      {govUrL && cityUrL && item.url ? (
                        <Link to={`/${govUrL}/${cityUrL}/${item.url}`}>{item.url}</Link>
                      ) : (
                        <span>Invalid URL</span>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => {
                          navigate("/dashboard/edit-compounds", {
                            state: { data: compounds[index] },
                          });
                        }}
                      >
                        تعديل
                      </Button>
                    </td>
                    {role==='admin'&&<DeleteItem
                      id={selectedItemId}
                      setId={setSelectedItemId}
                      itemId={item.id}
                      DeleteFun={handleDelete}
                      load={loadId}
                    />}
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert key="warning" variant="warning">
              لا يوجد كومباوندات
            </Alert>
          )}
        </>
      )}
    </>
  );
}
