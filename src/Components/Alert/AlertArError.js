import { Alert } from "react-bootstrap";
import Style from "./alert.module.css";

export default function AlertArError({ msg=[], setShowArError }) {
  return (
    <>
      <Alert
        variant="danger"
        onClose={() => setShowArError(false)}
        dismissible
        className={Style.alertArError}
      >
        {msg.map((message, index) => (
          <p key={index}>{index+1} - {message}</p>
        ))}
      </Alert>
    </>
  );
}
