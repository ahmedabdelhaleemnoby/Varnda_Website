import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../../Components/Header/Header";
import Footer from '../../../Components/Footer/Footer';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Form, Button, Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faDollarSign, faBed, faBath, faRulerCombined } from '@fortawesome/free-solid-svg-icons';
import api from "../../../API/ApiLink.js";
import Cookies from 'js-cookie';
import "./EditApartmentsAndDuplexesPage.css"
import LoadingBtn from "../../../Components/LoadingBtn.js";
import AlertMessage from "../../../Components/Alert/Alert.js";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom"; //
import DeleteImage from "../../../Components/DeleteImage/DeleteImage.js";//
import {Autocomplete,TextField} from "@mui/material";
import AlertArError from '../../../Components/Alert/AlertArError.js';

const EditApartmentsAndDuplexesPage = () => {
  
    const location = useLocation(); //
    const Ad = location.state?.data; //
    const token = Cookies.get("token")
    const [showArError, setShowArError] = useState(false);
    const [alertArError, setAlertArError] = useState([]);
 // خاصين بتعديل الصور
 const [oldImages, setOldImages] = useState([]);
 const [deleteImages, setDeleteImages] = useState([]);
 const [old_primary_picture, setOld_primary_picture] = useState([]);
 /////////
 const [formData, setFormData] = useState({
  name_ad_ar: '',//👍
  details_ar: '',//👍
  type: '',//👍
  price: '',//👍
  discount: '',//👍
  payment_method: '',//👍
  rent_type: '',//👍
  legal_papers: '',//👍
  area: '',//👍
  rooms: '',//👍
  bathrooms: '',//👍
  floor_number: '',//👍
  primary_picture: '',//👍  
  'images[]': '',//👍
  video_link: '',//👍
  full_address: '',//👍
  governorate: '',//👍
  city: '',//👍
  region: '',//👍
  street: '',//👍
  compound_name: '',//👍
  mall_name:'',//👍
  deliver_date: '',//👍
  finishing_type: '',//👍
  furnished: '',//👍
  'facilities[]': [],//👍
  'features[]': [],//👍
  'services[]': [],//👍
  'devices[]': [],//👍
  sub_category:'',
  //ADS
  advertiser_type: "",
  phone: '',
  email: '',
  whats_phone: '',
});
 // وضع القيم فى الخانات
 useEffect(() => {
  const fetchAd = async () => {
    setFormData({
      id: Ad.id,
      name_ad_ar: Ad.property["Arabic Name"],
      details_ar: Ad.property.details_ar,
      type: Ad.property.Type,
      price: Ad.property.price,
      discount: Ad.property.Discount,
      payment_method: Ad.property.payment_method,
      rent_type: Ad.property.renting_type,
      legal_papers: Ad.property.legal_papers,
      area: Ad.property.area,
      rooms: Ad.property.rooms,
      bathrooms: Ad.property.bathrooms, 
      floor_number: Ad.property.floor_number,
      floors:Ad.property.floors,
      price_per:Ad.property.price_per,
      "images[]": Ad.property.images?.map((img) => img.image),
      video_link: Ad.property.video_link,
      full_address: Ad.property.full_address,
      governorate: Ad.property.governorate || "",
      city: Ad.property.city || "",
      region: Ad.property.region || "",
      street: Ad.property.street || "",
      compound_name: Ad.property.compound_name || "",
      mall_name: Ad.property.mall_name || "",
      deliver_date: Ad.property.deliver_date,
      finishing_type: Ad.property.finishing_type,
      furnished: Ad.property.Furnished,
      "facilities[]": Ad.property.facilities,
      "features[]": Ad.property.features,
      "services[]": Ad.property.services,
      "devices[]": Ad.property.devices,
      sub_category: Ad.property["Sub Category"],
      advertiser_type: Ad.advertiser_type,
      phone: Ad.phone,
      email: Ad.email,
      whats_phone: Ad.whats_phone,
    });
    setOldImages(Ad.property.images);
    setPriceText(Number(Ad.property.price).toLocaleString('en-US'))
    setPosition([Ad.property.latitude,Ad.property.longitude])
    setOld_primary_picture(Ad.property.primary_picture)
  };
  if (Ad) fetchAd();
}, [Ad]);
const [position, setPosition] = useState([30.044376903556085, 31.235749743857397]);

  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 })
  const navigate = useNavigate();

  const myIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    shadowSize: [41, 41],
  });

 
  const [primary_picture, setPrimary_picture] = useState(null);
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [streets, setStreets] = useState([]);
  const [compounds, setCompounds] = useState([]);
  const [validated, setValidated] = useState(false);

  const [priceText,setPriceText]=useState("")

  const categories = {
    مرافق: ["عداد كهرباء", "عداد مياه", "غاز طبيعي", "تليفون أرضي"],
    ميزات: ["شرفة", "غرف خدم", "غرفة غسيل", "غرفة ملابس", "حديقة خاصة", "موقف سيارات مغطي"],
    خدمات: ["حمام سباحة", "أسانسير", "أمن"],
    أجهزة: ["تدفئة", "تكييف", "اجهزة المطبخ", "أجهزة كشف الحريق"]
  };

  const [governorates, setGovernorates] = useState([])

  // API for get data to choose from it
  const[govLoad,setGovLoad]=useState(false);
  const[cityLoad,setCityLoad]=useState(false);
  const[regionLoad,setRegionLoad]=useState(false);
  const[streetLoad,setStreetLoad]=useState(false);
  const[compoundLoad,setCompoundLoad]=useState(false);
  //Governments
  useEffect(() => {
    const fetchGov = async () => {
      try {
        setGovLoad(true)
        const response = await api.get("/governorates", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGovernorates(response.data.data)
      } catch (error) {
        setGovernorates([])
        console.log(error);
      }finally{
        setGovLoad(false)
      }
    };
    fetchGov();
  }, []);
    //City
    useEffect(() => {
      const fetchCity = async () => {
        const govId = governorates.find((e) => {
          return e.name === formData.governorate;
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
      fetchCity();
    }, [formData.governorate, token, governorates]);
  
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
    if(formData.city){
      fetchRegion();
    }
  }, [formData.city,token,cities]);

  // Street
  useEffect(() => {
    const fetchStreet = async () => {
      let streetId = regions.find((e) => {
        return e.name === formData.region
      })["id"]
      try {
        setStreetLoad(true)
        const response = await api.get(`/streetsByRegion/${streetId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStreets(response.data.data)
      } catch (error) {
        setStreets([])
        console.log(error);
      }finally{
        setStreetLoad(false)
      }
    };
    if(formData.region){
      fetchStreet();
    }
  }, [formData.region,token,regions]);

   // Compound
   useEffect(() => {
    const fetchCompound = async () => {
      let cityId = cities.find((e) => {
        return e.name === formData.city
      })["id"]
        try {
          setCompoundLoad(true)
            const response = await api.get(`/get_compounds_by_city/${cityId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCompounds(response.data.data)
        } catch (error) {
            setCompounds([])
            console.log(error);
        }finally{
          setCompoundLoad(false)
        }
    };
    if(formData.city){
      fetchCompound();
    }
}, [formData.city,token,cities]);
  const isValidPhone = (phoneNumber) => {
    const egPhone = /^(010|011|012|015)\d{8}$/;
    return egPhone.test(phoneNumber);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "video_link") {
      if (!validateUrl(value)) {
        e.target.setCustomValidity("يرجى إدخال رابط صحيح");
      } else {
        e.target.setCustomValidity("");
      }
    }
    if (name === "phone"||name === "whats_phone") {
      if (!isValidPhone(value)) {
        e.target.setCustomValidity("يرجى إدخال رقم هاتف صحيح");
      } else {
        e.target.setCustomValidity("");
      }
    }
    if (type === 'file') {
      if (name === 'primary_picture') {
        setPrimary_picture(files[0]);
      } else if (name === 'images[]') {
        setImages(Array.from(files));
      }
      setFormData({
        ...formData,
        [name]: files,
      });
    } else {
      if (name === "governorate") {
        setFormData({
          ...formData,
          [name]: value,
          city: "",
          region: "",
          street: "",
          compound_name: "",
          mall_name: "",
        });
        setCities([])
        setRegions([])
        setStreets([])
        setCompounds([])
      } else if (name === "city") {
        setFormData({
          ...formData,
          [name]: value,
          region: "",
          street: "",
          compound_name: "",
          mall_name: "",
        });
        setRegions([])
        setStreets([])
        setCompounds([])
      } else if (name === "region") {
        setFormData({
          ...formData,
          [name]: value,
          street: "",
        });
        setStreets([])
      }
      else{
        setFormData({
        ...formData,
        [name]: value,
        });
      }
    }
  };

  const fieldMapping = {
    "مرافق": "facilities[]",
    "ميزات": "features[]",
    "خدمات": "services[]",
    "أجهزة": "devices[]"
  };
  const toggleAmenity = (category, amenity) => {

    const fieldName = fieldMapping[category];

    setFormData(prevState => ({
      ...prevState,
      [fieldName]: prevState[fieldName].includes(amenity)
        ? prevState[fieldName].filter(item => item !== amenity)
        : [...prevState[fieldName], amenity]
    }));
  };

  const fetchAddress = async (lat, lng) => {
    const apiKey = 'ede130c0ba4f4355b0e56461701f0455';
    try {
      const response = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`);
      const address = response.data.features[0].properties.formatted;
      setFormData({
        ...formData,
        full_address: address,
      });
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  function MyComponent() {
    useMapEvents({
      click: (e) => {
        setPosition([e.latlng.lat, e.latlng.lng]);
        fetchAddress(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  }

  // تعديل الاعلان
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setAlert({ msg: "يرجى التأكد من ملئ الحقول المطلوبه *", variant: 3 })
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setShow(true)
    }
    else {
      try {
        setLoad(true)
        const allFormData = new FormData();

        // Append other form fields
        for (const [key, value] of Object.entries(formData)) {
          if(key!=="images[]"&&key!=="primary_picture"&&value){
            allFormData.append(key, value);
          }
        }
        // Append images
        if (images) {
          for (let i = 0; i < images.length; i++) {
            allFormData.append('images[]', formData['images[]'][i]);
          }
        }
        if (primary_picture) {
          allFormData.append('primary_picture', formData.primary_picture[0]);
        }
        // Append position
        allFormData.append('latitude', position[0]);
        allFormData.append('longitude', position[1]);

        // ارسال الصور المحذوفه
        let deleted_images = deleteImages.join(",");
        if(deleted_images){
          allFormData.append("deleted_images", deleted_images);
        }


        // Post the data
        await api.post(
          `/updateAd/${formData.id}`,
          allFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setAlert({ msg: "تم تعديل الإعلان بنجاح", variant: 1 });
        window.scrollTo({ top: 0, behavior: "smooth" });
        setShow(true);
        setTimeout(() => {
          navigate("/myproperties");
        }, 2000);
      } catch (error) {
        console.log(error)
        if (error.response.status === 422) {
          setAlertArError(error.response.data.data)
          setShowArError(true)
        }
        else{
          setAlert({ msg: "حدث خطا اثناء تعديل الاعلان يرجى المحاوله مره ثانيه", variant: 2 })
          setShow(true)
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      finally{
        setLoad(false)
      }
    }
    setValidated(true);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const totalPages = 8; // Total number of form pages

  // Calculate progress percentage
  const progress = Math.ceil((currentPage / totalPages) * 100);



  const validateUrl = (url) => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // Protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // Domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // Fragment locator
    return !!urlPattern.test(url);
  };

// لتنسيق شكل الرقم
const handlePriceChange = (e) => {
  const { value } = e.target;
  const price = value.replace(/,/g, '')
  if (!isNaN(price)) {
    setPriceText(Number(price).toLocaleString('en-US'))//For view
    setFormData({
      ...formData,
      "price": price,
    });
  }
}

const handleOptionSelect = (value) => {
  setFormData({
    ...formData,
    compound_name: value,
  });
};

  return (
    <>
      <Header />
      <Container fluid className="px-0">
        <div className="bg-primary text-white py-3 mb-4">
          <h1 className="text-center mb-0">تعديل الاعلان</h1>
        </div>
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8}>
              <div className="shadow-sm p-4 mb-5 bg-white rounded">
                <h2 className="text-center mb-4">شقق و دوبلكس</h2>
                <ProgressBar
                  now={progress}
                  label={`${progress}%`}
                  className="my-4"
                />

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  {currentPage === 1 && (
                    <>
                      <Row>
                        <Col xs={12} md={6}>
                          <Form.Group controlId="name_ad_ar" className="mb-3">
                            <Form.Label className="required">
                              <FontAwesomeIcon icon={faHome} className="me-2" />
                              اسم الإعلان
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="name_ad_ar"
                              value={formData.name_ad_ar}
                              onChange={handleChange}
                              maxLength="70"
                            />
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
                            >
                              <option value="sale">بيع</option>
                              <option value="rent">إيجار</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group controlId="details_ar" className="mb-3">
                        <Form.Label className="required">
                          أضف تفاصيل العقار
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="details_ar"
                          value={formData.details_ar}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Row>
                        <Col xs={12} md={6}>
                          <Form.Group controlId="price" className="mb-3">
                            <Form.Label className="required">
                              <FontAwesomeIcon
                                icon={faDollarSign}
                                className="me-2"
                              />
                              سعر الوحدة
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="priceText"
                              value={priceText}
                              onChange={handlePriceChange}
                            />
                          </Form.Group>
                        </Col>

                        <Col xs={12} md={6}>
                          <Form.Group controlId="discount" className="mb-3">
                            <Form.Label>خصم حصري (إن وجد)</Form.Label>
                            <Form.Control
                              type="number"
                              name="discount"
                              value={formData.discount}
                              onChange={handleChange}
                              placeholder="ادخل نسبه الخصم"
                              min={0}
                              max={99.9}
                              step={0.1}
                            />
                            <Form.Control.Feedback type="invalid">
                              ادخل نسبه مئويه صحيحه (0-99.9)
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <div className="text-center d-flex justify-content-end">
                        <Button variant="secondary" onClick={handleNextPage}>
                          الصفحة التالية
                        </Button>
                      </div>
                    </>
                  )}
                  {currentPage === 2 && (
                    <>
                      <Form.Group controlId="sub_category" className="mb-3">
                        <Form.Label className="required">نوع الوحدة</Form.Label>
                        <Form.Select
                          name="sub_category"
                          value={formData.sub_category}
                          onChange={handleChange}
                        >
                          <option value="">اختر</option>
                          <option value="شقة">شقة</option>
                          <option value="دوبلكس">دوبلكس</option>
                          <option value="بنتهاوس">بنتهاوس</option>
                          <option value="ستوديو">ستوديو</option>
                        </Form.Select>
                      </Form.Group>

                      {formData.type === "rent" && (
                        <Form.Group controlId="rent_type" className="mb-3">
                          <Form.Label>نوع الايجار</Form.Label>
                          <Form.Select
                            name="rent_type"
                            value={formData.rent_type}
                            onChange={handleChange}
                          >
                            <option value="">اختر</option>
                            <option value="1">شهرى</option>
                            <option value="3">ربع سنوى</option>
                            <option value="6">نصف سنوى</option>
                            <option value="12">سنوى</option>
                          </Form.Select>
                        </Form.Group>
                      )}
                      {formData.type === "sale" && (
                        <>
                          <Form.Group
                            controlId="payment_method"
                            className="mb-3"
                          >
                            <Form.Label>طريقة الدفع</Form.Label>
                            <Form.Select
                              name="payment_method"
                              value={formData.payment_method}
                              onChange={handleChange}
                            >
                              <option value="">اختر</option>
                              <option value="كاش">كاش</option>
                              <option value="تقسيط">تقسيط</option>
                            </Form.Select>
                          </Form.Group>

                          <Form.Group controlId="deliver_date" className="mb-3">
                            <Form.Label>تاريخ التسليم</Form.Label>
                            <Form.Select
                              name="deliver_date"
                              value={formData.deliver_date}
                              onChange={handleChange}
                            >
                              <option value="">اختر</option>
                              <option value="0">استلام فوري</option>
                              {Array.from(
                                { length: 9 },
                                (_, i) => new Date().getFullYear() + i
                              ).map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>

                          <Form.Group controlId="legal_papers" className="mb-3">
                            <Form.Label>الأوراق القانونية للعقار</Form.Label>
                            <Form.Select
                              name="legal_papers"
                              value={formData.legal_papers}
                              onChange={handleChange}
                            >
                              <option value="">اختر</option>
                              <option value="مرخص">مرخص</option>
                              <option value="قابل للترخيص">قابل للترخيص</option>
                              <option value="غير مرخص">غير مرخص</option>
                            </Form.Select>
                          </Form.Group>
                        </>
                      )}
                      <div className="text-center d-flex justify-content-between">
                        <Button
                          variant="secondary"
                          onClick={handlePreviousPage}
                          className="me-2"
                        >
                          الصفحة السابقة
                        </Button>
                        <Button variant="secondary" onClick={handleNextPage}>
                          الصفحة التالية
                        </Button>
                      </div>
                    </>
                  )}
                  {currentPage === 3 && (
                    <>
                      <Row>
                        <Col xs={12} md={6}>
                          <Form.Group controlId="area" className="mb-3">
                            <Form.Label className="required">
                              <FontAwesomeIcon
                                icon={faRulerCombined}
                                className="me-2"
                              />
                              المساحة (م2)
                            </Form.Label>
                            <Form.Control
                              type="number"
                              name="area"
                              value={formData.area}
                              onChange={handleChange}
                              min={2}
                            />
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Group controlId="rooms" className="mb-3">
                            <Form.Label className="required">
                              <FontAwesomeIcon icon={faBed} className="me-2" />
                              عدد غرف النوم
                            </Form.Label>
                            <Form.Select
                              name="rooms"
                              value={formData.rooms}
                              onChange={handleChange}
                            >
                              <option value="">اختر</option>
                              {Array.from({ length: 9 }, (_, i) => i + 1).map(
                                (number) => (
                                  <option key={number} value={number}>
                                    {number}
                                  </option>
                                )
                              )}
                              <option value="10">+10</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          <Form.Group controlId="bathrooms" className="mb-3">
                            <Form.Label>
                              <FontAwesomeIcon icon={faBath} className="me-2" />
                              عدد الحمامات
                            </Form.Label>
                            <Form.Select
                              name="bathrooms"
                              value={formData.bathrooms}
                              onChange={handleChange}
                            >
                              <option value="">اختر</option>
                              {Array.from({ length: 5 }, (_, i) => i + 1).map(
                                (number) => (
                                  <option key={number} value={number}>
                                    {number}
                                  </option>
                                )
                              )}
                              <option value="6">+6</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Group controlId="floor_number" className="mb-3">
                            <Form.Label>الدور</Form.Label>
                            <Form.Select
                              name="floor_number"
                              value={formData.floor_number}
                              onChange={handleChange}
                            >
                              <option value="">اختر</option>
                              <option value="0">أرضي</option>
                              {Array.from({ length: 9 }, (_, i) => i + 1).map(
                                (floor_number) => (
                                  <option
                                    key={floor_number}
                                    value={floor_number}
                                  >
                                    {floor_number}
                                  </option>
                                )
                              )}
                              <option value="10">+10</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group controlId="finishing_type" className="mb-3">
                        <Form.Label className="required">
                          مرحلة التشطيب
                        </Form.Label>
                        <Form.Select
                          name="finishing_type"
                          value={formData.finishing_type}
                          onChange={handleChange}
                        >
                          <option value="">اختر</option>
                          <option value="علي الطوب">علي الطوب</option>
                          <option value="محارة وحلوق">محارة وحلوق</option>
                          <option value="نصف تشطيب">نصف تشطيب</option>
                          <option value="تشطيب كامل">تشطيب كامل</option>
                          <option value="تشطيب بالأجهزة">تشطيب بالأجهزة</option>
                        </Form.Select>
                      </Form.Group>
                      {(formData.finishing_type === "تشطيب بالأجهزة" ||
                        formData.finishing_type === "تشطيب كامل") && (
                        <Form.Group controlId="furnished" className="mb-3">
                          <Form.Label>مفروش</Form.Label>
                          <Form.Select
                            name="furnished"
                            value={formData.furnished}
                            onChange={handleChange}
                          >
                            <option value="">اختر</option>
                            <option value="1">نعم</option>
                            <option value="0">لا</option>
                          </Form.Select>
                        </Form.Group>
                      )}
                      <div className="text-center d-flex justify-content-between">
                        <Button
                          variant="secondary"
                          onClick={handlePreviousPage}
                          className="me-2"
                        >
                          الصفحة السابقة
                        </Button>
                        <Button variant="secondary" onClick={handleNextPage}>
                          الصفحة التالية
                        </Button>
                      </div>
                    </>
                  )}
                  {currentPage === 4 && (
                    <>
                      <Container className="amenities-container">
                        {Object.entries(categories).map(([category, items]) => (
                          <div key={category} className="category-section">
                            <h5>{category}</h5>
                            <Row>
                              {items.map((item) => (
                                <Col key={item} xs="auto" className="mb-2">
                                  <Button
                                    variant={
                                      formData[fieldMapping[category]].includes(
                                        item
                                      )
                                        ? "primary"
                                        : "outline-secondary"
                                    }
                                    onClick={() =>
                                      toggleAmenity(category, item)
                                    }
                                    className="amenity-button"
                                  >
                                    {item}
                                  </Button>
                                </Col>
                              ))}
                            </Row>
                          </div>
                        ))}
                      </Container>

                      <div className="text-center d-flex justify-content-between mt-4">
                        <Button
                          variant="secondary"
                          onClick={handlePreviousPage}
                          className="me-2"
                        >
                          الصفحة السابقة
                        </Button>
                        <Button variant="secondary" onClick={handleNextPage}>
                          الصفحة التالية
                        </Button>
                      </div>
                    </>
                  )}
                  {currentPage === 5 && (
                    <>
                      <Form.Group controlId="primary_picture" className="mb-3">
                        <Form.Label className="required">
                          الصورة الأساسية للإعلان
                        </Form.Label>
                        <Form.Control
                          type="file"
                          name="primary_picture"
                          onChange={handleChange}
                        />
                        {old_primary_picture && (
                          <div className="mt-2">
                            <h5>الصورة القديمة</h5>
                            <img
                              key={old_primary_picture}
                              src={old_primary_picture}
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
                        {primary_picture && (
                          <div className="mt-2">
                            <h5>الصورة المراد اضافتها</h5>
                            <img
                              key={primary_picture}
                              src={URL.createObjectURL(primary_picture)}
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
                      <Form.Group controlId="images[]" className="mb-3">
                        <Form.Label className="required">
                          قم بتحميل صور الاعلان
                        </Form.Label>
                        <Form.Control
                          type="file"
                          name="images[]"
                          onChange={handleChange}
                          multiple
                        />
                        {images.length > 0 && (
                          <div className="mt-2">
                            <h5>الصور الجديدة:</h5>
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

                        {oldImages.length > 0 && (
                          <div className="mt-2">
                            <h5>الصور القديمة:</h5>
                            <div className="d-flex flex-wrap">
                              {oldImages.map((image, index) => (
                                <div
                                  key={index}
                                  style={{
                                    position: "relative",
                                  }}
                                >
                                  <img
                                    key={index}
                                    src={image.image}
                                    alt={`AdditionalImage ${index}`}
                                    style={{
                                      maxWidth: "150px",
                                      height: "auto",
                                      margin: "0 10px 10px 0",
                                      borderRadius: "5px",
                                      position: "relative",
                                    }}
                                  />
                                  <DeleteImage
                                    setOld={setOldImages}
                                    setDel={setDeleteImages}
                                    OldImages={oldImages}
                                    DeleteImages={deleteImages}
                                    img={image.image}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </Form.Group>
                      <div className="text-center d-flex justify-content-between">
                        <Button
                          variant="secondary"
                          onClick={handlePreviousPage}
                          className="me-2"
                        >
                          الصفحة السابقة
                        </Button>
                        <Button variant="secondary" onClick={handleNextPage}>
                          الصفحة التالية
                        </Button>
                      </div>
                    </>
                  )}
                  {currentPage === 6 && (
                    <>
                      <Form.Group controlId="video_link" className="mb-3">
                        <Form.Label>رابط فيديو لعرض العقار</Form.Label>
                        <Form.Control
                          type="url"
                          name="video_link"
                          value={formData.video_link}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          اكتب رابط بشكل صحيح
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="full_address" className="mb-3">
                        <Form.Label className="required">
                          العنوان بالكامل
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="full_address"
                          value={formData.full_address}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <span>اضغط على العلامة الزرقاء فى مكان موقع العقار.</span>

                      <MapContainer
                        center={position}
                        zoom={13}
                        scrollWheelZoom={true}
                        style={{ height: "400px", width: "100%" }}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={position} icon={myIcon}>
                          <Popup>{formData.full_address}</Popup>
                        </Marker>
                        <MyComponent />
                      </MapContainer>
                      <div className="text-center  d-flex justify-content-between mt-5 ">
                        <Button
                          variant="secondary"
                          onClick={handlePreviousPage}
                          className="me-2"
                        >
                          الصفحة السابقة
                        </Button>
                        <Button variant="secondary" onClick={handleNextPage}>
                          الصفحة التالية
                        </Button>
                      </div>
                    </>
                  )}
                  {currentPage === 7 && (
                    <>
                      <Form.Group controlId="governorate" className="mb-3">
                        <Form.Label className="required">
                          {govLoad && <span className="loader"></span>}
                          المحافظة
                        </Form.Label>
                        <Form.Select
                          name="governorate"
                          value={formData.governorate}
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

                      <Form.Group controlId="city" className="mb-3">
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
                              {cities.map((city) => (
                                <option key={city.name} value={city.name}>
                                  {city.name}
                                </option>
                              ))}
                            </>
                          )}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group controlId="region" className="mb-3">
                        <Form.Label>
                          {regionLoad && <span className="loader"></span>}
                          المنطقة
                        </Form.Label>
                        <Form.Select
                          name="region"
                          value={formData.region}
                          onChange={handleChange}
                        >
                          {!regionLoad && (
                            <>
                              <option value="">اختر المنطقة</option>
                              {regions.map((region) => (
                                <option key={region.id} value={region.name}>
                                  {region.name}
                                </option>
                              ))}
                            </>
                          )}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group controlId="street" className="mb-3">
                        <Form.Label>
                          {streetLoad && <span className="loader"></span>}
                          الشارع
                        </Form.Label>
                        <Form.Select
                          name="street"
                          value={formData.street}
                          onChange={handleChange}
                        >
                          {!streetLoad && (
                            <>
                              <option value="">اختر الشارع</option>
                              {streets.map((street) => (
                                <option key={street.id} value={street.name}>
                                  {street.name}
                                </option>
                              ))}
                            </>
                          )}
                        </Form.Select>
                        {/* فى حاله عدم وجود شارع */}
                        <Form.Control
                          className="mt-3"
                          type="text"
                          name="street"
                          placeholder="فى حاله عدم وجود الشارع يرجى كتابته هنا"
                          value={formData.street}
                          onChange={handleChange}
                           
                        />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        controlId="compound"
                        className="mb-3"
                      >
                        <Form.Label className="required">
                          {compoundLoad && <span className="loader"></span>}
                          اختار اسم الكمبوند السكني (إن وجد)
                        </Form.Label>
                        {Ad.property.compound_name && (
                          <p>اختيارك القديم:({Ad.property.compound_name})</p>
                        )}
                        <Autocomplete
                          disablePortal
                          onChange={(event, newValue) => {
                            handleOptionSelect(newValue ? newValue.name : "");
                          }}
                          options={compounds}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="اختر الكمبوند السكني"
                            />
                          )}
                        />
                      </Form.Group>

                      <div className="text-center d-flex justify-content-between">
                        <Button
                          variant="secondary"
                          onClick={handlePreviousPage}
                          className="me-2"
                        >
                          الصفحة السابقة
                        </Button>
                        <Button variant="secondary" onClick={handleNextPage}>
                          الصفحة التالية
                        </Button>
                      </div>
                    </>
                  )}
                  {currentPage === 8 && (
                    <>
                      <Form.Group controlId="phone" className="mb-3">
                        <Form.Label>رقم الهاتف للتواصل</Form.Label>
                        <Form.Control
                          type="number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          ادخل رقم الهاتف بشكل صحيح "01xxxxxxxxx"
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="whatsapp" className="mb-3">
                        <Form.Label>رقم الواتس اب</Form.Label>
                        <Form.Control
                          type="number"
                          name="whats_phone"
                          value={formData.whats_phone}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          ادخل رقم الهاتف بشكل صحيح "01xxxxxxxxx"
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="formBasicEmail" className="mt-3">
                        <Form.Label className="fs-5 mb-3">
                          البريد الإلكتروني
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          placeholder="ادخل البريد الإلكتروني"
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          ادخل الايميل بشكل صحيح
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group controlId="formUserType">
                        <Form.Label className="mt-2">نوع المستخدم</Form.Label>
                        <Form.Select
                          name="advertiser_type"
                          value={formData.advertiser_type}
                          onChange={handleChange}
                        >
                          <option value="">اختر</option>
                          <option key="1" value="مالك">
                            مالك
                          </option>
                          <option key="2" value="سمسار">
                            سمسار
                          </option>
                          <option key="3" value="شركة تسويق">
                            شركة تسويق
                          </option>
                          <option key="4" value="شركة عقارية">
                            شركة عقارية
                          </option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          الرجاء اختيار نوع المستخدم.
                        </Form.Control.Feedback>
                      </Form.Group>

                      <div className="text-center d-flex justify-content-between mt-4">
                        <Button
                          variant="secondary"
                          onClick={handlePreviousPage}
                          className="me-2"
                        >
                          الصفحة السابقة
                        </Button>
                        <Button variant="primary" type="submit" disabled={load}>
                          {load ? <LoadingBtn /> : "تعديل الإعلان"}
                        </Button>
                      </div>
                    </>
                  )}
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

export default EditApartmentsAndDuplexesPage;
