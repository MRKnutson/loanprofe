import React, { useContext } from "react";
import { Container, Nav, NavDropdown } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import {
  LoanproNavbar,
  LoanproButton,
  SmallButton,
  PrimaryColor,
} from "../components/Styles.js";
import avatar from "../images/avatar.jpeg";

const Layout = () => {
  const navigate = useNavigate();

  const { authenticated, handleLogout, email } = useContext(AuthContext);

  const renderUILinks = () => {
    if (authenticated) {
      return (
        <>
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: `${PrimaryColor}`,
            }}
          >
            <Nav onSelect={handleSelect}>
              <Nav.Link className="navbar-links" eventKey="/operation">
                New Operation
              </Nav.Link>
              <Nav.Link className="navbar-links" eventKey="/records">
                Records
              </Nav.Link>
            </Nav>
          </Container>
          <Nav>
            <img
              src={avatar}
              alt="User Avatar"
              style={{
                height: "2.8rem",
                width: "2.8rem",
                borderRadius: "1.4rem",
                border: ".13rem solid #FFFF",
                objectFit: "cover",
              }}
            />
            {email && (
              <NavDropdown
                onSelect={handleSelect}
                style={{ marginRight: "1.5rem" }}
                id="navdropdown-arrow"
                title={<span className="navdropdown-title">{email}</span>}
              >
                <NavDropdown.Item eventKey="/records">Records</NavDropdown.Item>
                <NavDropdown.Item eventKey="/operation">
                  New Operation
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLogout(navigate)}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {!email && (
              <NavDropdown
                onSelect={handleSelect}
                style={{ marginRight: "1.5rem" }}
                id="navdropdown-arrow"
                title={<span className="navdropdown-title">User</span>}
              >
                <NavDropdown.Item eventKey="/records">Records</NavDropdown.Item>
                <NavDropdown.Item eventKey="/operation">
                  New Operation
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLogout(navigate)}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </>
      );
    } else {
      return (
        <Container
          style={{
            display: "flex",
            justifyContent: "right",
            alignContent: "center",
            backgroundColor: `${PrimaryColor}`,
          }}
          onSelect={handleSelect}
        >
          <LoanproButton style={{ backgroundColor: "transparent" }}>
            <Nav.Link style={{ color: "white" }} href="/login">
              Log In
            </Nav.Link>
          </LoanproButton>
          <SmallButton>
            <Nav.Link style={{ color: "white" }} href="/signup">
              Sign Up
            </Nav.Link>
          </SmallButton>
        </Container>
      );
    }
  };

  const handleSelect = (eventKey) => {
    navigate(eventKey);
  };

  return (
    <>
      <LoanproNavbar
        className="navbar-dark"
        style={{ borderBottom: ".18rem solid #FFFF" }}
        expand="md"
        collapseOnSelect
      >
        <Container fluid>
          <LoanproNavbar.Toggle aria-controls="response-navbar-nav" />
          <LoanproNavbar.Collapse id="responsive-navbar-nav">
            {renderUILinks()}
          </LoanproNavbar.Collapse>
        </Container>
      </LoanproNavbar>
      <Outlet />
    </>
  );
};

export default Layout;
