import { Spinner } from "react-bootstrap";
import Style from "./OverPage.module.css"
const OverPage = () => {
    return (
        <div className={Style.overlay}>
         <Spinner animation="border" role="status" className={Style.spinner}></Spinner>
        </div>
    );
}
export default OverPage;
