import React from "react";
import { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../API/ApiLink.js";
import LoadingBtn from "../../Components/LoadingBtn.js";
import AlertMessage from "../../Components/Alert/Alert.js";
import Cookies from "js-cookie";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useLocation } from "react-router-dom"; //

export default function EditFilter() {

    const location = useLocation(); //
    const Filter = location.state?.data; //

    const [formData, setFormData] = useState({
      filter_name: "",
      url: "",
      type: "",
      sub_category: "",
      meta_description: "",
      key_words: "",
      gov: "",
      compound: "",
      department: "", //gov:mall
      city:"",
      region:""
    });
  
 // وضع القيم فى الخانات
 useEffect(() => {
  const fetchFilter = async () => {
    setFormData({
      filter_name: Filter.filter_name,
      url: Filter.url,
      type: Filter.type,
      sub_category:Filter.sub_category,
      meta_description: Filter.meta_description,
      key_words: Filter.key_words,
      compound: Filter.compound,
      department: Filter.department, 
      gov: Filter.gov,
      city:Filter.city,
      region:Filter.region
    });
  };
  if (Filter) fetchFilter();
}, [Filter]);

  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [govLoad, setGovLoad] = useState(false);
  const [cityLoad,setCityLoad]=useState(false);
  const [regionLoad,setRegionLoad]=useState(false);
  const [compoundLoad, setCompoundLoad] = useState(false);
  const [compounds, setCompounds] = useState([]);
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [governorates, setGovernorates] = useState([]);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });
 
//Governments
useEffect(() => {
  const fetchGov = async () => {
    try {
      setGovLoad(true);
      const response = await api.get("/governorates", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGovernorates(response.data.data);
    } catch (error) {
      setGovernorates([]);
      console.log(error);
    } finally {
      setGovLoad(false);
    }
  };
  if(formData.department!=='mall'){
    fetchGov();
  }
}, [token,formData.department]);

    //City
    useEffect(() => {
      const fetchCity = async () => {
        const govId = governorates.find((e) => {
          return e.name === formData.gov;
        })["id"];
        try {
          setCityLoad(true)
          const response = await api.get(`/governorates/${govId}/cities`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCities(response.data.data);
        } catch (error) {
          setCities([])
          console.log(error);
        }finally{
          setCityLoad(false)
        }
      };
      if(formData.department==='city'||formData.department==='region')
      fetchCity();
    }, [formData.gov,formData.department, token, governorates]);
  
  // Region
  useEffect(() => {
    const fetchRegion = async () => {
      let cityId = cities.find((e) => {
        return e.name === formData.city
      })["id"]
      try {
        setRegionLoad(true)
        const response = await api.get(`/governorates/city/${cityId}/regions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRegions(response.data.data)
      } catch (error) {
        setRegions([])
        console.log(error);
      }finally{
        setRegionLoad(false)
      }
    };
    if(formData.department==='region'){
      fetchRegion();
    }
  }, [formData.city,formData.department,token,cities]);


//All Compounds
useEffect(() => {
  const fetchCompounds = async () => {
    try {
      setCompoundLoad(true);
      const response = await api.get("/get-all-compounds", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompounds(response.data.data);
    } catch (error) {
      setCompounds([]);
      console.log(error);
    } finally {
      setCompoundLoad(false);
    }
  };
  if(formData.department==='mall'){
    fetchCompounds();
  }
}, [token,formData.department]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOptionSelect = (value) => {
    setFormData({
      ...formData,
      compound: value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (
        formData.filter_name &&
        formData.url &&
        formData.type &&
        formData.meta_description &&
        formData.key_words &&
        (formData.gov ||
          formData.compound ||
          (formData.gov && formData.city) ||
          (formData.gov && formData.city && formData.regions))
      )  {
        // Set Post
        try {
          setLoad(true);
          await api.post(
            `/updateFilter/${Filter.id}`,
            { ...formData, department: formData.department },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setAlert({ msg: "تم تعديل الفلتر بنجاح", variant: 1 });
          setTimeout(() => {
            if (formData.department === "gov") {
              navigate("/dashboard/filters/governorates");
            } 
            else if(formData.department === "city"){
              navigate("/dashboard/filters/cities");
            }
            else if(formData.department === "region"){
              navigate("/dashboard/filters/regions");
            }
            else {
              navigate("/dashboard/filters/projects");
            }
          }, 2000);
        } catch (error) {
          console.log(error);
          if (error.response.status === 422) {
            setAlert({ msg: "هناك فلتر اخر بهذا الرابط", variant: 2 });
          } else if (error.response.status === 401) {
            setAlert({
              msg: "انتهت جلستك.يرجى تسجيل الدخول مره اخرى",
              variant: 3,
            });
            // localStorage.removeItem("role");
            Object.keys(Cookies.get()).forEach(function (cookieName) {
              Cookies.remove(cookieName);
            });
          }
        } finally {
          setLoad(false);
          setShow(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        setAlert({ msg: "تاكد من ملئ جميع البيانات", variant: 2 });
        setShow(true);
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setValidated(true);
  };

  const subCategories = [
    "شقة",
    "فيلا منفصلة",
    "دوبلكس",
    "بنتهاوس",
    "شاليه",
    "تاون هاوس",
    "توين هاوس",
    "أرض سكنية",
    "ستوديو",
    //
    "زراعية",
    "تجارية",
    "صناعية",
    "محل تجارى",
    "مكتب ادارى",
    "عيادة طبية",
    "معمل تحاليل",
    "صيدلية",
    "مطعم",
    "مخزن",
    "كافيه",
    "جراج",
  ];

  return (
    <>
      <h2 className="text-center title-page py-1 pb-2 container my-3">
        تعديل الفلتر
      </h2>
      <Form
        className="p-4 border rounded"
        noValidate
        validated={validated}
        onSubmit={handelSubmit}
        style={{ position: "relative" }}
      >
        {show && (
          <>
            <AlertMessage
              msg={alert.msg}
              setShow={setShow}
              variant={alert.variant}
            />
          </>
        )}

        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={6} controlId="form_filter_name">
            <Form.Label className="required">اسم الفلتر:</Form.Label>
            <Form.Control
              type="text"
              name="filter_name"
              value={formData.filter_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} controlId="formGridLink">
            <Form.Label className="required">رابط الفلتر:</Form.Label>
            <Form.Control
              type="text"
              name="url"
              value={formData.url}
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
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={6} controlId="type" className="mb-3">
            <Form.Label className="required">هدف الإعلان</Form.Label>
            <Form.Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">اختر الهدف</option>
              <option value="sale">بيع</option>
              <option value="rent">إيجار</option>
            </Form.Select>
          </Form.Group>

          <Form.Group
            as={Col}
            xs={12}
            md={6}
            controlId="subCategory"
            className="mb-3"
          >
            <Form.Label className="required">الفئة</Form.Label>
            <Form.Select
              name="sub_category"
              value={formData.sub_category}
              onChange={handleChange}
            >
              <option value="">اختر الفئة</option>
              <optgroup label="سكنى">
                {subCategories.slice(0, 9).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </optgroup>
              <optgroup label="تجارى">
                {subCategories.slice(9).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </optgroup>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3">
                    <>
            {formData.department !== "mall" ? (
              <Form.Group
                as={Col}
                xs={12}
                md={6}
                controlId="governorate"
                className="mb-3"
              >
                <Form.Label className="required">
                  {govLoad && <span className="loader"></span>}
                  المحافظة
                </Form.Label>
                <Form.Select
                  name="gov"
                  value={formData.gov}
                  onChange={handleChange}
                  required
                >
                  {!govLoad && (
                    <>
                      <option value="">اختر المحافظة</option>
                      {governorates.map((gov, index) => (
                        <option key={gov.id} value={gov.name}>
                          {gov.name}
                        </option>
                      ))}
                    </>
                  )}
                </Form.Select>
              </Form.Group>
            ) : (
              <Form.Group
                as={Col}
                xs={12}
                md={6}
                controlId="compound"
                className="mb-3"
              >
                <Form.Label className="required">
                  {compoundLoad && <span className="loader"></span>}
                  المشروع العقارى
                </Form.Label>
                <Autocomplete
                  disablePortal
                  onChange={(event, newValue) => {
                    handleOptionSelect(newValue ? newValue.name : "");
                  }}
                  options={compounds}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} label="اختر المشروع العقارى" />
                  )}
                />
              </Form.Group>
            )}
          </>

          <>
            {formData.department !== "mall" &&
              (formData.department === "city" || formData.department === "region") && (
                <Form.Group
                  as={Col}
                  xs={12}
                  md={6}
                  controlId="city"
                  className="mb-3"
                >
                  <Form.Label className="required">
                    {cityLoad && <span className="loader"></span>}
                    المدينة
                  </Form.Label>
                  <Form.Select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  >
                    {!cityLoad && (
                      <>
                        <option value="">اختر المدينة</option>
                        {cities.map((city, index) => (
                          <option key={city.id} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </>
                    )}
                  </Form.Select>
                </Form.Group>
              )}
          </>

          <>
            {formData.department !== "mall" &&
              formData.department === "region" && (
                <Form.Group
                  as={Col}
                  xs={12}
                  md={6}
                  controlId="region"
                  className="mb-3"
                >
                  <Form.Label className="required">
                    {regionLoad && <span className="loader"></span>}
                    المنطقة
                  </Form.Label>
                  <Form.Select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                  >
                    {!regionLoad && (
                      <>
                        <option value="">اختر المنطقة</option>
                        {regions.map((region, index) => (
                          <option key={region.id} value={region.name}>
                            {region.name}
                          </option>
                        ))}
                      </>
                    )}
                  </Form.Select>
                </Form.Group>
              )}
          </>

        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={6} controlId="formMeta_description">
            <Form.Label>ميتا دسكريبشن:</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="ادخل الميتا دسكريبشن"
              style={{ height: "80px" }}
              name="meta_description"
              value={formData.meta_description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} controlId="formKey_words">
            <Form.Label>الكلمات المفتاحية:</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="ادخل الكلمات المفتاحية: اكتب الكلمه ثم ',' فصله ثم الكلمه الاخرى على سبيل المثال: كلمه اولى , كلمه ثانيه وهكذا"
              style={{ height: "80px" }}
              name="key_words"
              value={formData.key_words}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <div className="text-center d-flex justify-content-center mt-4">
          <Button variant="primary" type="submit" disabled={load}>
            {load ? <LoadingBtn /> : "حفظ التعديل"}
          </Button>
        </div>
      </Form>
    </>
  );
}
