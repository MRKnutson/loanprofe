import React, { useState } from "react";
import api from "../api/api";

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);

  const handleRegister = async (user, navigate) => {
    setErrors(null);
    try {
      let response = await api.post("/users", user);
      setUser(response.data.user);
      localStorage.setItem("user", response.data.user.ID);
      localStorage.setItem("token", response.data.data);
      navigate("/operation");
    } catch (err) {
      setErrors(err.response.data.errors.full_messages);
    }
  };

  const handleLogin = async (user, navigate) => {
    setErrors(null);
    try {
      let response = await api.post("/users/login", user);
      setUser(response.data.user);
      localStorage.setItem("user", response.data.user.ID);
      localStorage.setItem("token", response.data.data);
      navigate("/records");
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  const handleLogout = async (navigate) => {
    setErrors(null);
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err.response.data.errors.full_messages);
      alert(err.response.data.errors.full_messages);
    }
  };

  console.log(user);
  return (
    <AuthContext.Provider
      value={{
        ...user,
        errors,
        setUser,
        handleRegister,
        handleLogin,
        handleLogout,
        authenticated: user !== null,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
