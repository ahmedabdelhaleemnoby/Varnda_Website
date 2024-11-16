import { useEffect, useState } from "react";
import {
  Form,
  Button,
  Table,
  Modal,
  Row,
  Col,
  InputGroup,
  Alert,
} from "react-bootstrap";
import api from "../../../API/ApiLink.js";
import LoadingBtn from "../../../Components/LoadingBtn.js";
import Cookies from "js-cookie";
import OverPage from "../../../Components/OverPage/OverPage.js";
import AlertMessage from "../../../Components/Alert/Alert.js";
import DeleteItem from "../../../Components/DeleteItem/DeleteItem.js";

export default function Molls() {

  const role = Cookies.get("role")
  const token = Cookies.get("token");
  const [getForm, setGetForm] = useState({
    governorate: "",
    city: "",
  });
  const [load, setLoad] = useState(false);
  const [loadId, setLoadId] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });
  const [show, setShow] = useState(false);
  const [mollName, setMollName] = useState(""); //اسم الحاجه اللى هضيفها
  const [governorates, setGovernorates] = useState([]);
  const [cities, setCities] = useState([]);
  const [newMollName, setNewMollName] = useState("");
  const [molls, setMolls] = useState([]);
  const handleClose = () => setShow(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [loadEdit, setLoadEdit] = useState(false);
  const handleShow = (id, name) => {
    setSelectedItemId(id, name);
    setNewMollName(name);
    setShow(true);
  };
  const handleGetChange = (e) => {
    const { name, value } = e.target;
    if (name === "governorate") {
      setGetForm({ governorate: value, city: "" });
      setCities([]);
      setMolls([]);
    } else {
      setGetForm({
        ...getForm,
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
          `/governorates/${getForm.governorate}/cities`,
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
    if (getForm.governorate) {
      fetchCity();
    }
  }, [getForm.governorate]);

  // استرجاع المولات
  const fetchMoll = async () => {
    try {
      setOverlay(true);
      const response = await api.get(`/get_malls_by_city/${getForm.city}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMolls(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setOverlay(false);
    }
  };
  useEffect(() => {
    if (getForm.city) {
      fetchMoll();
    }
  }, [getForm.governorate, getForm.city]);

  //  تعديل المول
  const handleEdite = async (selec) => {
    if (newMollName) {
      try {
        setLoadEdit(true);
        const response = await api.post(
          `/update-mall`,
          { name: newMollName, city_id: getForm.city, mall_id: selectedItemId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchMoll();
      } catch (err) {
        console.log(err);
      } finally {
        setLoadEdit(false);
        setShow(false);
      }
    }
  };
  // حذف مول
  const handleDelete = async (id) => {
    try {
      setLoadId(true);
      const response = await api.post(`/delete-mall/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMoll();
    } catch (err) {
      console.log(err);
    } finally {
      setLoadId(false);
    }
  };
  // اضافه مول
  const handleAddMolls = async (e) => {
    e.preventDefault();
    setLoad(true);
    if (getForm.city) {
      try {
        const response = await api.post(
          "/add-mall",
          { name: mollName, city_id: getForm.city },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchMoll();
      } catch (err) {
        console.log(err);
      } finally {
        setLoad(false);
      }
    } else {
      setAlert({ msg: "يجب تحديد مدينه لاضافه الكومباوند داخلها", variant: 3 });
      setShowAlert(true);
      setLoad(false);
    }
  };
  function handleChangeMollName(e) {
    setMollName(e.target.value);
  }
  function handleNewMollName(e) {
    setNewMollName(e.target.value);
  }
  return (
    <>
      <Form.Group controlId="governorate" className="mb-3">
        <Form.Label className="required">المحافظة</Form.Label>
        <Form.Select
          name="governorate"
          value={getForm.governorate}
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
          value={getForm.city}
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

      <Form onSubmit={handleAddMolls}>
        <Row className="align-items-center">
          <Col xs="8">
            <InputGroup className="mb-2" dir="ltr">
              <Form.Control
                id="inlineFormInputGroup"
                className="text-end"
                name="mollName"
                onChange={handleChangeMollName}
                required
                placeholder="اكتب اسم المول"
              />
            </InputGroup>
          </Col>
          <Col xs="4">
            <Button type="submit" className="mb-2">
              {load ? <LoadingBtn /> : "اضف مول"}
            </Button>
          </Col>
        </Row>
      </Form>
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
          {molls.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>اسم المول</th>
                  <th colSpan={2} className="text-center">
                    أجراءات
                  </th>
                </tr>
              </thead>
              <tbody>
                {molls.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => {
                          handleShow(item.id, item.name);
                        }}
                      >
                        تعديل
                      </Button>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header>
                          <Modal.Title>تعديل اسم المول</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form.Control
                            type="text"
                            name="newMollName"
                            value={newMollName}
                            onChange={handleNewMollName}
                          />
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            الغاء
                          </Button>
                          <Button
                            variant="success"
                            onClick={handleEdite}
                            disabled={loadEdit}
                          >
                            {loadEdit ? <LoadingBtn /> : " حفظ التعديل"}
                          </Button>
                        </Modal.Footer>
                      </Modal>
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
              لا يوجد مولات
            </Alert>
          )}
        </>
      )}
    </>
  );
}
