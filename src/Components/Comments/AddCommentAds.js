import { useState } from "react";
import { Box, Button, FormControl, Textarea } from "@mui/joy";
import api from "../../API/ApiLink";
import Cookies from "js-cookie";
import LoadingBtn from "../LoadingBtn";
import AlertMessage from "../Alert/Alert";
export default function AddCommentAds({ ads_id }) {
  const [comment, setComment] = useState("");
  const token = Cookies.get("token");
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({ msg: "", variant: 0 });

  const addComment = async () => {
    setLoad(true);
    try {
      await api.post(
        `add-ad-comment`,
        { ad_slug: ads_id, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setComment("");
      window.location.reload();
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
      <FormControl>
        <h3>كتابه تعليق:</h3>
        <Textarea
          placeholder="اكتب تعليق..."
          minRows={3}
          maxRows={4}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          endDecorator={
            <Box
              sx={{
                display: "flex",
                gap: "var(--Textarea-paddingBlock)",
                pt: "var(--Textarea-paddingBlock)",
                borderTop: "1px solid",
                borderColor: "divider",
                flex: "auto",
              }}
            >
              <Button
                sx={{ ml: "auto" }}
                disabled={load}
                onClick={() => {
                  addComment();
                }}
              >
                {load ? <LoadingBtn /> : "ارسال"}
              </Button>
            </Box>
          }
          sx={{
            minWidth: 300,
          }}
        />
      </FormControl>
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
