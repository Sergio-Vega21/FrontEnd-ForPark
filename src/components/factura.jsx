import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Factura.module.css";

const Factura = () => {
  const navigate = useNavigate(); // Get useNavigate hook instance

  const [form, setForm] = useState({
    email: "",
    idReserva: "",
    idFactura: "",
    horaInicio: "",
    horaFin: "",
    fechaInicio: "",
    fechaFin: "",
    precio: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="AddParking">
      <div className="formcontainer">
        <h1>Factura</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            ID Reserva:
            <input
              type="number"
              name="idReserva"
              value={form.idReserva}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            ID Factura:
            <input
              type="number"
              name="idFactura"
              value={form.idFactura}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Hora Inicio:
            <input
              type="time"
              name="horaInicio"
              value={form.horaInicio}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Hora Fin:
            <input
              type="time"
              name="horaFin"
              value={form.horaFin}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Fecha Inicio:
            <input
              type="date"
              name="fechaInicio"
              value={form.fechaInicio}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Fecha Fin:
            <input
              type="date"
              name="fechaFin"
              value={form.fechaFin}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Precio:
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit" className="actionButton">
            Imprimir Factura
          </button>
        </form>
        <button className="exitButton" onClick={() => navigate("/")}>
          Salir
        </button>
      </div>
    </div>
  );
};

export default Factura;
