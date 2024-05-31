import React from "react";
import logo from "../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Gerente.module.css";

function Gerente() {
  const navigate = useNavigate();

  const handleBackingClick = () => {
    navigate("/");
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  const handleDeleteButtonClick = () => {
    navigate("/deleteParking");
  };

  return (
    <div className={styles.gerente}>
      <div className={styles.logocontainer}>
        <img src={logo} alt="Four Parking logo" className={styles.logo} />
      </div>
      <div className={styles.formcontainer}>
        <h1>Panel del Gerente</h1>
        <button
          className={styles.actionButton}
          onClick={() => navigateTo("/agregarParqueadero")}
        >
          Agregar un nuevo parqueadero
        </button>
        <br />
        <button
          className={styles.actionButton}
          onClick={() => navigateTo("/modificarParqueadero")}
        >
          Modificar un parqueadero existente
        </button>
        <br />
        <button
          className={styles.actionButton}
          onClick={handleDeleteButtonClick}
        >
          Eliminar un parqueadero
        </button>
        <br />
        <button
          className={styles.actionButton}
          onClick={() => navigateTo("/emploRegister")}
        >
          Registrar Empleado
        </button>
        <br />
        <button
          className={styles.actionButton}
          onClick={() => navigateTo("/emploRegister")}
        >
          Ver Informe
        </button>
        <p>
          <button
            type="button"
            className={styles.exitButton}
            onClick={handleBackingClick}
          >
            Salir
          </button>
        </p>
      </div>
    </div>
  );
}

export default Gerente;
