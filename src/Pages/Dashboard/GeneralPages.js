import { useState } from "react";
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import OverPage from '../../Components/OverPage/OverPage';
import AlertMessage from "../../Components/Alert/Alert";

export default function GeneralPages() {

    // const [data, setData] = useState([])
    const [overlay, setOverlay] = useState(false)
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState({ msg: "", variant: 0 });

    const data = [
      {
        id: 1,
        url: "projects",
        name: "المشروعات العقارية",
        meta_description:
          "تعرّف على أبرز المشروعات العقارية التي تناسب احتياجاتك بمواقع مميزة وخطط سداد مريحة. احصل على فرصة الاستثمار الأمثل اليوم",
        key_words: "المشروعات العقارية",
      },
      {
        id: 2,
        url: "governorates",
        name: "المحافظات",
        meta_description:
          "استكشف أفضل العقارات في المحافظات والمدن مع خيارات متنوعة تناسب جميع الاحتياجات. اختر موقعك المثالي الآن وابدأ رحلتك في السكن والاستثمار.",
        key_words: "المحافظات",
      },
      {
        id: 3,
        url: "blog",
        name: "المدونات",
        meta_description: "",
        key_words: "المدونات",
      },
      {
        id: 4,
        url: "about-us",
        name: "نبذة عنا",
        meta_description: "",
        key_words: "نبذة عنا",
      },
      {
        id: 5,
        url: "contact-us",
        name: "اتصل بنا",
        meta_description: "",
        key_words: "اتصل بنا",
      },
      {
        id: 6,
        url: "privacy-policy",
        name: "سياسة الخصوصية",
        meta_description: "",
        key_words: "سياسة الخصوصية",
      },
      {
        id: 7,
        url: "terms",
        name: "شروط الأستخدام",
        meta_description: "",
        key_words: "شروط الأستخدام",
      },
    ];
    return (
      <>
        {overlay ? (
          <OverPage />
        ) : (
          <>
            <h2 className="text-center title-page py-1 pb-2 container my-3">
              الصفحات العامة للموقع
            </h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>اسم الصفحة</th>
                  <th>رابط الصفحة</th>
                  <th>ميتا دسكريبشن</th>
                  <th>الكلمات المفتاحية</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      <Link to={`/${item.url}`}>{item.url}</Link>
                    </td>
                    <td>{item.meta_description}</td>
                    <td>{item.key_words}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
      </>
    );
}