import React, { useEffect } from "react";
import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  useEffect(() => {
    document.title = "Login - E-commerce App";
    localStorage.removeItem("token");
  }, []);

  return <LoginForm />;
}
