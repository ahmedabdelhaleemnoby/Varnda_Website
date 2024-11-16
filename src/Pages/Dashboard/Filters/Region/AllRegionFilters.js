import { useEffect, useState } from "react";
import {
  Button,
  Table,
  Alert,
} from "react-bootstrap";
import api from "../../../../API/ApiLink.js";
import Cookies from "js-cookie";
import OverPage from "../../../../Components/OverPage/OverPage.js";
import DeleteItem from "../../../../Components/DeleteItem/DeleteItem.js";
import { Link, useNavigate } from 'react-router-dom';

export default function AllRegionFilters() {
  
  const role = Cookies.get("role")
  const navigate = useNavigate();
  const [loadId, setLoadId] = useState(false);
  const [filters, setFilters] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const token = Cookies.get("token");

  //استرجاع الفلاتر
  const fetchFilters = async () => {
    try {
      setOverlay(true);
      const formDataToSend = new FormData();
      formDataToSend.append("department", 'region');
      const response = await api.post(`/getFilters-by-department`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFilters(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setOverlay(false);
    }
  };
  useEffect(() => {
      fetchFilters();
  }, []);

  // حذف الفلتر
  const handleDelete = async (id) => {
    try {
      setLoadId(true);
      await api.delete(`/deleteFilter/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchFilters();
    } catch (err) {
      console.log(err);
    } finally {
      setLoadId(false);
    }
  };

  return (
    <>
      <h2 className="text-center title-page py-1 pb-2 container my-3">
        جميع فلاتر المناطق
      </h2>
      {overlay ? (
        <OverPage />
      ) : (
        <>
          {filters.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>اسم الفلتر</th>
                  <th>رابط الفلتر</th>
                  <th>هدف الإعلان</th>
                  <th>الفئة</th>
                  <th colSpan={3} className="text-center">المكان</th>
                  <th colSpan={2} className="text-center">
                    أجراءات
                  </th>
                </tr>
              </thead>
              <tbody>
                {filters.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.filter_name}</td>
                    <td>
                        <Link to={`/filter/${item.url}`}>{item.url}</Link>
                      </td>
                    <td>{item.type}</td>
                    <td>{item.sub_category}</td>
                    <td>{item.gov}</td>
                    <td>{item.city}</td>
                    <td>{item.region}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => {
                          navigate("/dashboard/filters/edit-filter", {
                            state: { data: filters[index] },
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
              لا يوجد فلاتر
            </Alert>
          )}
        </>
      )}
    </>
  );
}
