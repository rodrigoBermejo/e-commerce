import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  return (
    <>
      <h2>Login</h2>
      <LoginForm />
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </>
  );
}
