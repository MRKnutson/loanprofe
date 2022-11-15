import React, { useContext, useState, useRef } from "react";
import { Spinner, Container, Form, Overlay } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import "../StylesFolder/Styles_Login.css";
import {
  PrimaryColor,
  LoanproHeader,
  LoanproButton,
} from "../components/Styles.js";

const Signup = () => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const { handleRegister } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const auth = useContext(AuthContext);
  const errors = auth.errors;

  const loadingSpinner = () => {
    return <Spinner animation="border" />;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ email, password }, navigate);
  };

  return (
    <div
      style={{
        backgroundColor: `${PrimaryColor}`,
        height: "100vh",
        marginTop: "-5rem",
        paddingTop: "5rem",
      }}
    >
      <Container style={{ backgroundColor: `${PrimaryColor}` }}>
        <LoanproHeader
          style={{
            marginTop: "5rem",
            marginBottom: "2rem",
            marginLeft: "3rem",
          }}
        >
          Sign Up
          {spinner && loadingSpinner()}
        </LoanproHeader>
        <Form onSubmit={handleSubmit}>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            onClick={() => setShow(false) & setSpinner(false)}
          >
            <Form.Label
              style={{ color: "white", fontWeight: "700" }}
              ref={target}
            >
              Email Address:
            </Form.Label>
            <Form.Control
              style={{ marginLeft: ".5rem" }}
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            onClick={() => setShow(false) & setSpinner(false)}
          >
            <Form.Label style={{ color: "white", fontWeight: "700" }}>
              Password:
            </Form.Label>
            <Form.Control
              style={{ marginLeft: ".5rem" }}
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <LoanproButton
              style={{ width: "7rem" }}
              type="submit"
              onClick={() => setShow(true) & setSpinner(true)}
            >
              Register
            </LoanproButton>
          </div>
        </Form>

        {/* Front end authentication error */}
        <Overlay target={target.current} show={show} placement="right">
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{
                backgroundColor: "rgba(255, 100, 100, 0.85)",
                padding: "2px 10px",
                color: "white",
                borderRadius: 3,
                ...props.style,
              }}
            >
              {errors && errors}
            </div>
          )}
        </Overlay>
      </Container>
    </div>
  );
};

export default Signup;
