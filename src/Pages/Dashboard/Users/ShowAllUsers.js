import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Cookies from "js-cookie";
import { Alert } from "react-bootstrap";
import api from "../../../API/ApiLink";
import AlertMessage from "../../../Components/Alert/Alert.js";
import OverPage from "../../../Components/OverPage/OverPage.js";
import { Avatar } from "@mui/joy";
import DeleteUser from "../../../Components/DeleteItem/DeleteUser.js";
import { useNavigate } from "react-router-dom";

export default function ShowAllUsers({ role }) {
const navigate = useNavigate();
  const [overlay, setOverlay] = useState(false);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });
  const token = Cookies.get("token");
  const [data, setData] = useState([]);
  
  const [loadId, setLoadId] = useState(false);
  // استرجاع كل المستخدمين
  const handelGetAllUser = async () => {
    try {
      setOverlay(true);
      const response = await api.get(`/admin/getAllUsers?role=${role}`, {
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
        setAlert({ msg: "حدث خطأ اثناء استرجاع المستخدمين .يرجى المحاوله مره اخرى", variant: 2 });
      }
        setShow(true);

    } finally {
      setOverlay(false);
    }
  };
  useEffect(() => {
    handelGetAllUser();
  }, [role,token]);

  // حذف مستخدم
  const handleDelete = async (role, email) => {
    setLoadId(true);
    try {
      const dataToSend = new FormData();
      dataToSend.append("role", role);
      dataToSend.append("email", email);
      await api.post(`admin/deleteUser`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handelGetAllUser()
    } catch (error) {
      console.log(error)
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
        setAlert({ msg: "حدث خطأ اثناء حذف المستخدم .يرجى المحاوله مره اخرى", variant: 2 });
      }
        setShow(true);
    } finally {
      setLoadId(false);
    }
  };
  return (
    <>
      {overlay ? (
        <OverPage />
      ) : (
        <>
          {data.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>اسم المستخدم</th>
                  <th>الايميل</th>
                  <th>رقم الهاتف</th>
                  <th>صوره المستخدم</th>
                  <th>دور المستخدم</th>
                  <th>أجراءات</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        src={item.image}
                        sx={{ "--Avatar-size": "3rem" }}
                      />
                    </td>
                    <td>{item.role}</td>
                    <DeleteUser
              DeleteFun={handleDelete}
              load={loadId}
              role={item.role}
              email={item.email}
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
