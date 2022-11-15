import React from "react";
import { Toast } from "react-bootstrap";

const ErrorToast = (props) => {
  const { showToast, setShowToast } = props;

  return (
    <Toast
      onClose={() => setShowToast(false)}
      show={showToast}
      delay={15000}
      autohide
    >
      <Toast.Header>
        <strong className="me-auto">Input Error</strong>
      </Toast.Header>
      <Toast.Body>Input numbers must be valid numbers</Toast.Body>
    </Toast>
  );
};

export default ErrorToast;
