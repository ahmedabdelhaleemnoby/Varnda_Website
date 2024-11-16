import { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import styles from './PropertiesTable.module.css'; // Import CSS module
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import DeleteItem from '../DeleteItem/DeleteItem';
import api from "../../API/ApiLink.js";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const PropertiesTable = ({ data }) => {
  const [loadId, setLoadId] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const token = Cookies.get("token");
  const navigate = useNavigate();

  // حذف الاعلان
  const handleDelete = async (id) => {
    setSelectedItemId(id);
    setLoadId(true);
    try {
      await api.post(
        `/deleteAd/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setSelectedItemId(null);
      setLoadId(false);
    }
  };
  // تعديل الاعلان
  const handleEdit = (type, category, property) => {
    // Handle edit logic here
    
    if (type) {
      navigate("/edit-quick-property", {
        state: { data: property },
      });
    }
    else{
      if(category==='شقق'){
        navigate("/edit-apartments-duplexes", {
          state: { data: property },
        });
      }
      else if(category==='قصور'){
        navigate("/edit-villas-palaces", {
          state: { data: property },
        });
      }
      else if(category==='منازل'){
        navigate("/edit-home-property", {
          state: { data: property },
        });
      }
      else if(category==='مصايف'){
        navigate("/edit-resorts-coasts", {
          state: { data: property },
        });
      }
      else if(category==='تجارية'){
        navigate("/edit-commercial-units", {
          state: { data: property },
        });
      }
      else if(category==='أراضي'){
        navigate("/edit-lands", {
          state: { data: property },
        });
      }
      else if(category==='مبانى'){
        navigate("/edit-buildings", {
          state: { data: property },
        });
      }
      else if(category==='مقابر'){
        navigate("/edit-cemeteries", {
          state: { data: property },
        });
      }
    }
  };

  return (
    <Table striped bordered hover responsive="lg">
      <thead>
        <tr>
          <th className={styles.header}>#</th>
          <th className={styles.header}>اسم العقار</th>
          <th className={styles.header}>الفئة</th>
          <th className={styles.header}>نوع العقار</th>
          <th className={styles.header}>رابط العقار</th>
          <th className={styles.header}>تاريخ الرفع</th>
          <th colSpan={2} className="text-center">
            أجراءات
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id} className="text-center">
            <td className="text-end">{item.id}</td>
            <td>{item.property["Arabic Name"]}</td>
            <td>{item.property.Category}</td>
            <td>{item.property["Sub Category"]}</td>
            <td>
              <Link to={`/property/${item.slug}`}>الذهاب للاعلان</Link>
            </td>
            <td>
              {format(
                new Date(item.property.created_at),
                "dd-MM-yyyy HH:mm:ss"
              )}
            </td>
            <td>
              <Button
                variant="warning"
                onClick={() =>
                  handleEdit(item.ad_type, item.property.Category, data[index])
                }
              >
                تعديل
              </Button>
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
  );
};

export default PropertiesTable;
