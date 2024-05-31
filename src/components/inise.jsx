import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import logo from "../assets/img/logo.png";
import styles from "../styles/Login.module.css";
import { client } from "../services/apirest";

const Login = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState();
  const [contrasena, setContrasena] = useState();
  let recaptchaRef = React.createRef();
  const handleResetPasswordClick = () => {
    navigate("/reinicioPassword");
  };

  const handleUserRecoveryClick = () => {
    navigate("/recuperarUsuario");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const recaptchaValue = recaptchaRef.current.getValue();
    if (recaptchaValue) {
      const res = await client.post(`/api/loginCliente`, {
        correo_electronico: correo,
        contrasena: contrasena,
        recaptchaToken: recaptchaValue,
      });
      if (res.status === 200) {
        localStorage.setItem("user-data", JSON.stringify(res.data));
        navigate("/");
      } else {
        console.error("Fallo login");
      }
    } else {
      alert("Please complete the reCAPTCHA.");
    }
  };

  const handleUserChange = (e) => {
    setCorreo(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setContrasena(e.target.value);
  };

  return (
    <div className={styles.Login}>
      <div className={styles.logocontainer}>
        <img src={logo} alt="Four Parking logo" className={styles.logo} />
      </div>
      <div className={styles.formcontainer}>
        <div className={styles.formcontent}>
          <h2>Iniciar Sesión</h2>
          <input
            type="text"
            onChange={handleUserChange}
            placeholder="Usuario"
            required
            className={styles.inputField}
          />
          <br />
          <input
            type="password"
            onChange={handlePasswordChange}
            placeholder="Contraseña"
            required
            className={styles.inputField}
          />
          <br />
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LehPe0pAAAAAKtkSQv_Rz2gH-aE_4mO9gZFUIwy" // Reemplaza esto con tu clave de sitio de reCAPTCHA
          />
          <br />
          <button onClick={handleLogin}>Iniciar Sesión</button>
          <p>
            <button
              type="button"
              onClick={handleResetPasswordClick}
              className={styles.linkButton}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </p>
          <p>
            <button
              type="button"
              onClick={handleUserRecoveryClick}
              className={styles.linkButton}
            >
              ¿Olvidaste tu usuario?
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
