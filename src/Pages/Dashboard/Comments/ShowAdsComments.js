import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Cookies from "js-cookie";
import { Alert } from "react-bootstrap";
import api from "../../../API/ApiLink.js";
import AlertMessage from "../../../Components/Alert/Alert.js";
import OverPage from "../../../Components/OverPage/OverPage.js";
import { Avatar } from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEye } from "@fortawesome/free-solid-svg-icons";
import DeleteItem from "../../../Components/DeleteItem/DeleteItem.js";

export default function ShowAdsComments({ role }) {
const navigate = useNavigate();
  const [overlay, setOverlay] = useState(false);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });
  const token = Cookies.get("token");
  const [data, setData] = useState([]);
  
  const [loadId, setLoadId] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  // استرجاع كل تعليقات الاعلانات
  const handelGetAdsComments = async () => {
    try {
      setOverlay(true);
      const response = await api.get(`/get-ads-comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data);
    } catch (error) {
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
      }
      else{
        setAlert({ msg: "حدث خطأ اثناء استرجاع التعليقات .يرجى المحاوله مره اخرى", variant: 2 });
      }
        setShow(true);

    } finally {
      setOverlay(false);
    }
  };
  useEffect(() => {
    handelGetAdsComments();
  }, [token]);


    // حذف التعليق
    const handleDelete = async (id) => {
      setSelectedItemId(id);
      setLoadId(true);
      try {
        await api.post(
          `delete-comment`,
          { comment_id:id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        handelGetAdsComments();
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
          setTimeout(() => {
            navigate("/admin-login");
          }, 2500);
        }
        console.log(error);
      } finally {
        setSelectedItemId(null);
        setLoadId(null);
      }
    };

  return (
    <>
      {overlay ? (
        <OverPage />
      ) : (
        <>
         <h2 className="text-center title-page py-1 pb-2 container my-3">
        جميع تعليقات الاعلانات
      </h2>
          {data.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>التعليق</th>
                  <th>صاحب التعليق</th>
                  <th>صوره المستخدم</th>
                  <th>نوع المستخدم</th>
                  <th>رؤيه التعليق</th>
                  <th>تاريخ كتابته</th>
                  <th>أجراءات</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td>{item.id}</td>
                    <td>{item.comment}</td>
                    <td>{item.user_name}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        src={item.user_image}
                        sx={{ "--Avatar-size": "3rem" }}
                      />
                    </td>
                    <td>{item.user_role}</td>
                    <td>
                        <Link to={`/property/${item.ad_slug}`}>
                        <FontAwesomeIcon icon={faEye} /> عرض
                        </Link>
                      </td>
                    <td>
                      {format(new Date(item.created_at), "dd-MM-yyyy HH:mm:ss")}
                    </td>

                    <DeleteItem
                        id={selectedItemId}
                        setId={setSelectedItemId}
                        itemId={item.id}
                        DeleteFun={handleDelete}
                        load={loadId}
                      />
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert key="warning" className="text-center" variant="warning">
              لا يوجد مستخدمين
            </Alert>
          )}
          {/*  */}
          {show && (
            <>
              <AlertMessage
                msg={alert.msg}
                setShow={setShow}
                variant={alert.variant}
              />
            </>
          )}
          {/*  */}
        </>
      )}
    </>
  );
}
