import {
    Box,
    Typography,
    Button,
    IconButton,
    Modal,
    ModalDialog,
  } from "@mui/joy";
  import LoadingBtn from "../LoadingBtn";
  import Delete from "@mui/icons-material/Delete";


  
export default function DeleteComment({load,handleDeleteComment,open,setOpen,setComment_id,id}) {
  return (
    <>
    <IconButton
      color="danger"
      variant="plain"
      size="sm"
      sx={{
        zIndex: "100",
        position: "absolute",
        top: "5px",
        left: "5px",
      }}
      onClick={() => {setOpen(true); setComment_id(id)}}
    >
      <Delete />

    </IconButton>
    <Modal open={open} onClose={() => setOpen(false)}>
    <ModalDialog
      aria-labelledby="nested-modal-title"
      aria-describedby="nested-modal-description"
      sx={(theme) => ({
        [theme.breakpoints.only("xs")]: {
          top: "unset",
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: 0,
          transform: "none",
          maxWidth: "unset",
        },
      })}
    >
      <Typography id="nested-modal-title" level="h2">
        هل انت متأكد من حذف التعليق؟
      </Typography>
      <Box
        sx={{
          mt: 1,
          display: "flex",
          gap: 1,
          flexDirection: {
            xs: "column",
            sm: "row-reverse",
          },
        }}
      >
        <Button
          variant="solid"
          color="danger"
          disabled={load}
          onClick={handleDeleteComment}
        >
          {load ? <LoadingBtn /> : "حذف"}
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(false)}
        >
          إلغاء
        </Button>
      </Box>
    </ModalDialog>
  </Modal>
  </>
  )
}
