import React from "react";
import { useFormik } from "formik";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./ContactPage.css";
import Header from "../../Components/Header/Header";
import imageEgypt from "../../images/مصر.svg";
import usePageSEO from "../../hooks/usePageSEO";
import FooterContactUs from "../../Components/Footer/FooterContactUs";




// import emailjs from 'emailjs-com';


export default function ContactPage() {
  // Set SEO settings
  usePageSEO({
    title: "اتصل بنا",
    keywords: ["اتصل بنا"],
  });

  const myIcon = new L.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    shadowSize: [41, 41],
  });


  // const formik = useFormik({
  //   initialValues: {
  //     name: '',
  //     email: '',
  //     phone: '',
  //     subject: '',
  //     message: '',
  //   },
  //   onSubmit: (values) => {
  //     emailjs.send('service_op6qfdo', 'template_9hylbbc', {
  //       name: values.name,
  //       email: values.email,
  //       phone: values.phone,
  //       subject: values.subject,
  //       message: values.message,
  //     }, '-ZFmtBPRhlqlWYnYN')
  //       .then((response) => {
  //         console.log('SUCCESS!', response.status, response.text);
  //       })
  //       .catch((error) => {
  //         console.error('FAILED...', error);
  //       });
  //   },
  // });

  // const formik = useFormik({
  //   initialValues: {
  //     name: "",
  //     email: "",
  //     phone: "",
  //     subject: "",
  //     message: "",
  //   },
  //   onSubmit: (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });



  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
    },
  });

  
  const position = [30.0444, 31.2357];
  
  return (
    <div style={{ background: "#eee" }}>
      <Header />
      <h2
        className="text-center h1 py-2"
        style={{ fontWeight: "700", color: "#0d6efd" }}
      >
        اتصل بنا
      </h2>
      <div className="fs-5 container my-1 p-2">
        <h4
          dir="rtl"
          style={{ color: "#555", borderRadius: "5px", marginBottom: "8px" }}
        >
          هل تريد الإستفسار عن عقار معين؟
        </h4>
        <p
          dir="rtl"
          className=" p-2"
          style={{ background: "#fff", color: "blue", borderRadius: "5px" }}
        >
          للاستفسار عن أي عقار، يرجى فتح صفحة العقار والتواصل مع المعلن مباشرة
          عن طريق الضغط على زر "اتصل" أو عن طريق إرسال رسالة على "الايميل" او
          "الواتساب" للمعلن. شركة فارندا لا تملك العقارات المعروضة على الموقع،
          لهذا في حالة رغبتك في الاستفسار عن عقار معين، يرجى التواصل مباشرة مع
          المعلن من داخل صفحة إعلان العقار.
        </p>
      </div>
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "350px", width: "80%", margin: "0px auto" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={myIcon}>
          <Popup>نحن هنا</Popup>
        </Marker>
        <ZoomControl position="topright" />
      </MapContainer>

      {/* <form onSubmit={formik.handleSubmit} className="p-3 form" dir="rtl">
        <div>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="الاسم*"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="البريد الالكترونى*"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div>
          <input
            id="phone"
            name="phone"
            type="phone"
            placeholder="الهاتف*"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
        </div>
        <div>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="عنوان الرسالة*"
            onChange={formik.handleChange}
            value={formik.values.subject}
          />
        </div>
        <div>
          <textarea
            id="message"
            name="message"
            placeholder="نص الرسالة*"
            onChange={formik.handleChange}
            value={formik.values.message}
          />
        </div>
        <button type="submit" className="w-100 text-center sendEmail">
          إرسال عبر البريد الإلكتروني
        </button>
      </form> */}

      <form onSubmit={formik.handleSubmit} className="p-3 form" dir="rtl">
        <div>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="الاسم*"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="البريد الالكترونى*"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div>
          <input
            id="phone"
            name="phone"
            type="phone"
            placeholder="الهاتف*"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
        </div>
        <div>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="عنوان الرسالة*"
            onChange={formik.handleChange}
            value={formik.values.subject}
          />
        </div>
        <div>
          <textarea
            id="message"
            name="message"
            placeholder="نص الرسالة*"
            onChange={formik.handleChange}
            value={formik.values.message}
          />
        </div>
        <button type="submit" className="w-100 text-center sendEmail">
          إرسال عبر البريد الإلكتروني
        </button>
      </form>

      <h2 className="h1 text-center">العنوان</h2>
      <p
        className="fs-5 my-4 text-center "
        style={{ fontWeight: "700", color: "#0d6efd" }}
      >
        مول اركان الشيخ زايد{" "}
        <img src={imageEgypt} alt="مصر" width="50" className="ms-3" />
      </p>
      <FooterContactUs />
    </div>
  );
}
