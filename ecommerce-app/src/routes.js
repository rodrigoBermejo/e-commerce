import { Routes, Route } from "react-router-dom";
import Login from "../src/pages/Login";
import Home from "../src/pages/Home";
import Register from "../src/pages/Register";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
