import { Alert } from "react-bootstrap";
import Style from "./alert.module.css";
import { Link } from "react-router-dom";
export default function AlertMessage({ msg, setShow, variant }) {
  const color =variant === 1 ? "success" : variant === 2 ? "danger" : "warning";

  return (
    <>
      <Alert
        variant={color}
        onClose={() => setShow(false)}
        dismissible
        className={Style.alert}
      >
        <p>
          {msg}
          {variant === 4 && (
            <Alert.Link as={Link} to="/signup">
              إنشاء حساب
            </Alert.Link>
          )}
          .
        </p>
      </Alert>
    </>
  );
}
