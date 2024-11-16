import { Alert } from "react-bootstrap";
import Style from "./alert.module.css";
export default function AlertSideBar({ msg, setShow }) {

  return (
    <>
      <Alert
        variant="warning"
        onClose={() => setShow(false)}
        dismissible
        className={Style.alertSideBar}
      >
        <p>
          {msg}
        </p>
      </Alert>
    </>
  );
}
