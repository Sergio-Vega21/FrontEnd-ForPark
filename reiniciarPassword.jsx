import React from "react";
import logo from "./assets/img/logo.png";
import styles from "./PasswordReset.module.css";
import { handleLoginClick } from "./assets/components/registration";
import { Navigate, useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.PasswordReset}>
      <div className={styles.logocontainer}>
        <img src={logo} alt="Four Parking logo" className={styles.logo} />
      </div>
      <h2 className={styles.p}>Olvidé mi Contraseña</h2>
      <div className={styles.formcontainer}>
        <div className={styles.formcontent}>
          <p>Escribe tu Correo Electrónico para Reestablecer tu Contraseña</p>
          <form>
            <input type="email" placeholder="Correo Electrónico" required />
            <br></br>
            <button type="submit">Enviar</button>
            <button
              type="button"
              onClick={() => handleLoginClick(navigate)}
              className={styles.linkButton}
            >
              Regresar al Inicio de Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
