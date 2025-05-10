import React, { useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  useEffect(() => {
    document.title = "Login - E-commerce App";
    localStorage.removeItem("token");
  }, []);

  return (
    <MainLayout>
      <LoginForm />
    </MainLayout>
  );
}
