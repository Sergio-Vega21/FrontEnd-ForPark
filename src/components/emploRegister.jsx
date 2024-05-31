import React, { useState } from "react";
import logo from "../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import styles from "../styles/EmploRegister.module.css";

const EmploRegister = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    nombre: "",
    apellido: "",
    contraseña: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el envío del formulario
  };

  const handleBackingClick = () => {
    navigate("/gerente");
  };

  return (
    <div className={styles.EmploRegister}>
      <div className={styles.logocontainer}>
        <img src={logo} alt="Four Parking logo" className={styles.logo} />
      </div>
      <div className={styles.formcontainer}>
        <h2>Registro de Empleados</h2>
        <form onSubmit={handleSubmit} className={styles.formcontent}>
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            required
            className={styles.inputfield}
            value={input.email}
            onChange={handleInput}
          />
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            required
            className={styles.inputfield}
            value={input.nombre}
            onChange={handleInput}
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            required
            className={styles.inputfield}
            value={input.apellido}
            onChange={handleInput}
          />
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            required
            className={styles.inputfield}
            value={input.contraseña}
            onChange={handleInput}
          />
          <button type="submit" className={styles.registerButton}>
            Registrar
          </button>
          <br />
          <button
            type="button"
            className={styles.linkButton}
            onClick={handleBackingClick}
          >
            Volver
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmploRegister;