import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../providers/AuthProvider";

const RequireAuth = () => {
  const [checkingAuthStatus, setCheckingAuthStatus] = useState(true);
  const auth = useContext(AuthContext);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    if (auth.authenticated || !localStorage.getItem("access-token")) {
      setCheckingAuthStatus(false);
      return;
    }
    try {
      let token = localStorage.getItem("token");
      let user = localStorage.getItem("user");
      const res = await api.get(`/${user}/auth/validate_token`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      auth.setUser(res.data.user);
    } catch (err) {
      console.log("unable to validate token");
    } finally {
      setCheckingAuthStatus(false);
    }
  };
  if (checkingAuthStatus) {
    return <p>Checking if logged in or not</p>;
  }

  if (!auth.authenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default RequireAuth;
