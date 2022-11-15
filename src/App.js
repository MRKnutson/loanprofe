import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Login from "./pages/Login";
import Operation from "./pages/Operation";
import Records from "./pages/Records";
import Signup from "./pages/SignUp";
import { AuthContext } from "./providers/AuthProvider";

function App() {
  const auth = useContext(AuthContext);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={auth.authenticated ? <Operation /> : <Login />}
        />
        <Route element={<RequireAuth />}>
          <Route path="/records" element={<Records />} />
          <Route path="/operation" element={<Operation />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
