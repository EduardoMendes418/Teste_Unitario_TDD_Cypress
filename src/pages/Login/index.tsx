import { FormEvent } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent) {
    event?.preventDefault();

    navigate("/dashboard");
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <input
          type="text"
          value="test@example.com"
          placeholder="Insira seu email"
        />
        <input type="text" value="password123" placeholder="Insira sua senha" />
        <button>Login</button>
        <Link to="/sign-up">Não tem cadastro? Clique aqui!</Link>
      </form>
    </div>
  );
}
