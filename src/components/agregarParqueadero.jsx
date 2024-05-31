import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AddParking.module.css";
import logo from "../assets/img/logo.png";

const AgregarParqueadero = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    idparqueadero: "",
    idciudad: "",
    iddisponibilidad: "",
    idtipo: "",
    nombreparqueadero: "",
    cantidadespacios: "",
    preciomoto: "",
    preciocarro: "",
    tarifamoto: "",
    tarifacarro: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleBackClick = () => {
    navigate("/gerente");
  };

  return (
    <div className={styles.AddParking}>
      <div className={styles.logocontainer}>
        <img src={logo} alt="Four Parking logo" className={styles.logo} />
      </div>
      <div className={styles.formcontainer}>
        <div className={styles.formcontent}>
          <h2>Agregar un parqueadero</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="Id del parqueadero"
              name="idparqueadero"
              onChange={handleChange}
            />
            <br />
            <input
              type="number"
              placeholder="Id de la ciudad"
              name="idciudad"
              onChange={handleChange}
            />
            <br />
            <input
              type="number"
              placeholder="Id de la disponibilidad"
              name="iddisponibilidad"
              onChange={handleChange}
            />
            <br />
            <input
              type="number"
              placeholder="Id del tipo"
              name="idtipo"
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              placeholder="Nombre del parqueadero"
              name="nombreparqueadero"
              onChange={handleChange}
            />
            <br />
            <input
              type="number"
              placeholder="Cantidad de espacios"
              name="cantidadespacios"
              onChange={handleChange}
            />
            <br />
            <input
              type="number"
              placeholder="Precio por minuto (MOTO)"
              name="preciomoto"
              onChange={handleChange}
            />
            <br />
            <input
              type="number"
              placeholder="Precio por minuto (CARRO)"
              name="preciocarro"
              onChange={handleChange}
            />
            <br />
            <input
              type="number"
              placeholder="Tarifa plena (MOTO)"
              name="tarifamoto"
              onChange={handleChange}
            />
            <br />
            <input
              type="number"
              placeholder="Tarifa plena (CARRO)"
              name="tarifacarro"
              onChange={handleChange}
            />
            <br />
            <button type="submit">GUARDAR</button>
            <br />
            <p>
              <button
                type="button"
                onClick={handleBackClick}
                className={styles.linkButton}
              >
                Volver
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgregarParqueadero;
