import React, { useEffect, useState } from "react";
import PropertiesTable from "../../Components/PropertiesTable/PropertiesTable";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Alert } from "react-bootstrap";
import styles from "./MyPropertiesPage.module.css"; // Import CSS module
import api from "../../API/ApiLink.js";
import Cookies from "js-cookie";
import OverPage from "../../Components/OverPage/OverPage.js";
import AlertMessage from "../../Components/Alert/Alert.js";
import usePageSEO from "../../hooks/usePageSEO.js";

const MyPropertiesPage = () => {

// Set SEO settings
usePageSEO({
  title: "تصفح عقاراتك",
  keywords:["تصفح عقاراتك"],
});

  const token = Cookies.get("token");
  const [data, setData] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });
  // استرجاع اعلانات الشخص
  const handelSearch = async () => {
    try {
      setOverlay(true);
      const response = await api.get(`/getAdsByUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setData(response.data.data);
    } catch (error) {
      if (error.response.status === 401) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setAlert({
          msg: "انتهت جلستك.يرجى تسجيل الدخول مره اخرى",
          variant: 3,
        });
        setShow(true);
        Object.keys(Cookies.get()).forEach(function (cookieName) {
          Cookies.remove(cookieName);
        });
      }
      console.log(error);
    } finally {
      setOverlay(false);
    }
  };
  useEffect(() => {
    handelSearch();
  }, [token]);

  return (
    <>
      <Header />
      {overlay ? (
        <OverPage />
      ) : (
        <>
          {data.length > 0 ? (
            <div className={styles.container}>
              <h1 className={styles.heading}>عقاراتي</h1>
              <PropertiesTable data={data} />
            </div>
          ) : (
            <Alert key="warning" className="text-center" variant="warning">
              لم تقم بنشر اعلانات بعد
            </Alert>
          )}
        </>
      )}
      <Footer />
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
};

export default MyPropertiesPage;
