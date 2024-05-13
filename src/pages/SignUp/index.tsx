import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { FormEvent } from "react";

export default function SignUp() {
  const navigate = useNavigate();

  function handleSumit(event: FormEvent) {
    event?.preventDefault();

    navigate("/dashboard");
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSumit}>
        <h1>Cadastre-se</h1>
        <input type="text" placeholder="Insira seu nome" />
        <input type="text" placeholder="Insira seu e-mail" />
        <input type="text" placeholder="Insira seu password" />
        <button>Sign Up</button>
        <Link to="/">Não tem cadastro? Clique aqui!</Link>
      </form>
    </div>
  );
}
