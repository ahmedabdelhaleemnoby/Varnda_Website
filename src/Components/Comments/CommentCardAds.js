import {
  Box,
  Avatar,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Modal,
  ModalDialog,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import Delete from "@mui/icons-material/Delete";
import api from "../../API/ApiLink";
import Cookies from "js-cookie";
import LoadingBtn from "../LoadingBtn";
import AlertMessage from "../Alert/Alert";
import DeleteComment from "../DeleteItem/DeleteComment";
export default function CommentCardAds({ ads_id }) {
  const userId = Cookies.get("user_id");
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment_id, setComment_id] = useState();
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });
  // التعليقات الخاصه بالشيئ
  const fetchComments = async () => {
    try {
      const response = await api.get(`get-ad-comments/${ads_id}`);
      setComments(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (ads_id) {
      fetchComments();
    }
  }, [ads_id]);

  // حذف التعليق
  const handleDeleteComment = async () => {
    setLoad(true);
    try {
      await api.post(
        `delete-comment`,
        { comment_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpen(false);
      fetchComments();
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
      setLoad(false);
    }
  };

  return (
    <>
      <Row>
        <h3>التعليقات:</h3>
        {comments.length > 0 ? (
          <>
            {comments.map((comment) => (
              <Col className="mb-2" xs={6} md={3} lg={3} key={comment.id}>
                <Card
                  sx={{
                    width: "100%",
                    // width: 370,
                    // maxWidth: '100%',
                    boxShadow: "lg",
                    position: "relative",
                  }}
                >
                  <CardContent>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <Avatar
                        src={comment.user_image}
                        sx={{ "--Avatar-size": "3rem" }}
                      />
                      <Typography level="title-lg">
                        {comment.user_name}
                      </Typography>
                    </div>
                    <Typography level="body-md">{comment.comment}</Typography>
                  </CardContent>
                  {(role === "admin" ||
                    (userId == comment.user_id &&
                      comment.user_role === "user")) && (
                      <DeleteComment load={load} handleDeleteComment={handleDeleteComment} open={open} setOpen={setOpen} setComment_id={setComment_id} id={comment.id} />
                  )}
                </Card>
              </Col>
            ))}
          </>
        ) : (
          <Alert key="warning" className="text-center" variant="warning">
            لا يوجد تعليقات
          </Alert>
        )}
      </Row>
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
