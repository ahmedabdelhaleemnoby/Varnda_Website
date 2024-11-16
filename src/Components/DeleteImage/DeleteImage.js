
import Delete from "@mui/icons-material/Delete";

export default function DeleteImage({setOld,setDel,OldImages,DeleteImages,img}) {
  
  function handleDeleteImage(delImage){
    setDel([...DeleteImages,delImage])
    let olded=OldImages.filter((e)=>e.image!=delImage)
    setOld(olded)
  }

  return (
    <>
      <Delete
        style={{
          zIndex: "100",
          position: "absolute",
          top: "0px",
          right: "10px",
          color: "white",
          cursor: "pointer",
          background: "red",
        }}
        onClick={() => handleDeleteImage(img)}
      />
    </>
  );
}
