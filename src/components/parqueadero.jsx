import React, { useState, useEffect } from "react";
import logo from "../assets/img/logo.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "../styles/Parqueadero.module.css";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { client } from "../services/apirest"; // Import the Axios client

const Parqueadero = () => {
  const navigate = useNavigate();
  const [parqueaderos, setParqueaderos] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    const userData = localStorage.getItem("user-data");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const fetchParqueaderos = async () => {
      try {
        const response = await client.get("http://localhost:3000/api/parqueaderos");
        setParqueaderos(response.data);
      } catch (error) {
        console.error(
          "Error fetching parqueaderos:",
          error.response || error.message
        );
      }
    };

    fetchParqueaderos();
  }, []);

  const handleReservationClick = () => {
    navigate("/reserva");
  };

  const handleGerenteClick = () => {
    if (+user?.id_rol) {
      navigate("/gerente");
    } else {
      navigate("/");
    }
  };

  const handleDelete = async (index, id) => {
    try {
      const response = await client.delete(`/parqueaderos/${id}`);
      if (response.status === 200) {
        const newParqueaderos = parqueaderos.filter((_, i) => i !== index);
        setParqueaderos(newParqueaderos);
      }
    } catch (error) {
      console.error(
        "Error deleting parqueadero:",
        error.response || error.message
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user-data");
    window.location.reload();
  };

  const handleIniseClick = () => {
    navigate("/inise");
  };

  const handleRegistrationClick = () => {
    navigate("/registration");
  };

  return (
    <div className={styles.parqueadero}>
      <nav>
        <div className={styles.logocontainer}>
          <img src={logo} alt="Four Parking logo" className={styles.logo} />
        </div>
        <div className={styles.navLinks}>
          <a href="/">Inicio</a>
          <a href="/parqueadero">Parqueaderos</a>
          <a href="/somos">¿Quiénes somos?</a>
          {user ? (
            <>
              <button onClick={handleLogout} className={styles.Loginbutton}>
                Cerrar sesión
              </button>
              {+user.id_rol === 2 ? (
                <button
                  onClick={handleReservationClick}
                  className={styles.Reservationbutton}
                >
                  ¡Reserva ahora!
                </button>
              ) : (
                <button
                  onClick={handleGerenteClick}
                  className={styles.Gerentebutton}
                >
                  Acceso Gerente
                </button>
              )}
            </>
          ) : (
            <>
              <button onClick={handleIniseClick} className={styles.Loginbutton}>
                Ingresa ahora
              </button>
              <button onClick={handleRegistrationClick} className={styles.Loginbutton}>
                Únete ahora
              </button>
            </>
          )}
        </div>
      </nav>
      <div className={styles.BannerContainer}>
        <div className={styles.BannerText}>
          <h1 className={styles.MainBannerText}>Información de Parqueaderos</h1>
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th>Nombre del Parqueadero</th>
                  <th>Ciudad</th>
                  <th>Dirección</th>
                  <th>Cantidad de Espacios</th>
                  <th>Tipo</th>
                  <th>Hora Apertura</th>
                  <th>Hora Cierre</th>
                  <th>Tarifa Moto por Minuto</th>
                  <th>Tarifa Carro por Minuto</th>
                  <th>Tarifa Plena Moto</th>
                  <th>Tarifa Plena Carro</th>
                </tr>
              </thead>
              <tbody>
                {parqueaderos.length > 0 ? (
                  parqueaderos.map((parqueadero, index) => (
                    <tr key={parqueadero.id_parqueadero}>
                      <td>{parqueadero.nombre}</td>
                      <td>{parqueadero.ciudad}</td>
                      <td>{parqueadero.direccion}</td>{" "}
                      {/* Se agrega la dirección */}
                      <td>{parqueadero.cantidad_espacios}</td>
                      <td>{parqueadero.desc_tipo}</td>
                      <td>{parqueadero.hora_apertura}</td>
                      <td>{parqueadero.hora_cierre}</td>
                      <td>{parqueadero.precio_minuto_moto}</td>
                      <td>{parqueadero.precio_minuto_auto}</td>
                      <td>{parqueadero.tarifap_moto}</td>
                      <td>{parqueadero.tarifap_auto}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12">
                      No hay datos de parqueaderos disponibles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={styles.mapContainer}>
        <MapContainer
          center={[4.711, -74.0721]}
          zoom={6}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {parqueaderos.map((parqueadero) => (
            <Marker
              key={parqueadero.id_parqueadero}
              position={[4.711, -74.0721]} // Ejemplo: posición fija
            >
              <Popup>
                <b>{parqueadero.nombre}</b>
                <br />
                {parqueadero.direccion}
                <br />
                {parqueadero.idciudad}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Parqueadero;
