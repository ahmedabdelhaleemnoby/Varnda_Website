import { useEffect, useState } from "react";
import { Button ,Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from "../../../API/ApiLink";
import OverPage from "../../../Components/OverPage/OverPage";
import DeleteItem from "../../../Components/DeleteItem/DeleteItem";
export default function AllDrafts() {

    const token = Cookies.get("token");
    const role = Cookies.get("role")
    const [overlay, setOverlay] = useState(false)
    const [loadId, setLoadId] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [articles, setArticles] = useState([])
    

// استرجاع المسودات 
const fetchArticles = async () => {
    try {
        setOverlay(true)
        const response = await api.get("/getDraftPosts",{
          headers: {
              Authorization: `Bearer ${token}`,
          }
      });
        setArticles(response.data.data.posts)
    } catch (error) {
        
        console.log(error);
    }finally{
        setOverlay(false)
    }
};
useEffect(() => {
    fetchArticles();
}, []);

   // حذف المسودة
   const handleDelete = async (id) => {
    setSelectedItemId(id);
    try {
        setLoadId(id);
        await api.delete(`deletePost/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        fetchArticles()
    } catch (err) {
        console.log(err);
    }finally {
      setSelectedItemId(null);
      setLoadId(false);
    }
};

//اعرض جزء من الوصف 
const renderLimitedText = (text, charLimit) => {
  if (text.length > charLimit) {
      return `${text.substring(0, charLimit)}....`;
  }
  return text;
};

return (
  <>
   <h2 className="text-center title-page py-1 pb-2 container my-3">
        جميع المسودات
      </h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>عنوان المسودة</th>
          <th>الميتا دسكريبشن</th>
          <th>الكلمات المفتاحيه</th>
          <th colSpan={2} className="text-center">
            أجراءات
          </th>
        </tr>
      </thead>
      {overlay ? (
        <OverPage />
      ) : (
        <tbody>
          {articles.map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.Title}</td>
              <td>
                {item.meta_description &&
                  renderLimitedText(item.meta_description, 60)}
              </td>
              <td>{item.key_words}</td>
              <td>
                <Button
                  variant="warning"
                  as={Link}
                  to="/dashboard/edit-Blog"
                  state={{ data: articles[index] }}
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
      )}
    </Table>
  </>
);
}