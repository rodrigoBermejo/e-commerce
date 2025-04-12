import RegisterForm from "../components/auth/RegisterForm";

export default function Register() {
  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Register</h2>
      <RegisterForm />
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
}
