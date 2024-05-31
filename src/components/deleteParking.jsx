import React, { useState, useEffect } from "react";
import logo from "../assets/img/logo.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "../styles/Parqueadero.module.css";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { client } from "../services/apirest"; // Import the Axios client

const DeleteParking = () => {
  const navigate = useNavigate();
  const [parqueaderos, setParqueaderos] = useState([]);

  useEffect(() => {
    const fetchParqueaderos = async () => {
      try {
        const response = await client.get("/api/parqueaderos");
        setParqueaderos(response.data);
      } catch (error) {
        console.error("Error fetching parqueaderos:", error.response || error.message);
      }
    };

    fetchParqueaderos();
  }, []);

  const handleReservationClick = () => {
    navigate("/reserva");
  };

  const handleGerenteClick = () => {
    navigate("/gerente");
  };

  const handleDelete = async (index, id) => {
    // Optimistically update the state
    const newParqueaderos = parqueaderos.filter((_, i) => i !== index);
    setParqueaderos(newParqueaderos);
  
    try {
      const response = await client.delete(`http://localhost:3000/api/parqueaderos/${id}`);
      if (response.status !== 200) {
        throw new Error("Error deleting parqueadero");
      }
    } catch (error) {
      console.error("Error deleting parqueadero:", error.response || error.message);
      // Revert the state if the delete request fails
      setParqueaderos(parqueaderos);
    }
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
          <button onClick={handleGerenteClick} className={styles.Gerentebutton}>
            Acceso Gerente
          </button>
          <button onClick={handleReservationClick} className={styles.Reservationbutton}>
            ¡Reserva ahora!
          </button>
        </div>
      </nav>
      <div className={styles.BannerContainer}>
        <div className={styles.BannerText}>
          <h1 className={styles.MainBannerText}>Eliminar un parqueadero</h1>
          <h3>Ingrese el Id del parqueadero a eliminar</h3>
          <input type="number" placeholder="ID Parqueadero" required className={styles.inputField}/><button onClick={() => handleDelete(index, parqueadero.id_parqueadero)}className={styles.deleteButton}><FaTrashAlt />Eliminar</button><hr />
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
                  <th>Id parqueadero</th> 
                </tr>
              </thead>
              <tbody>
                {parqueaderos.length > 0 ? (
                  parqueaderos.map((parqueadero, index) => (
                    <tr key={parqueadero.id_parqueadero}>
                      <td>{parqueadero.nombre}</td>
                      <td>{parqueadero.ciudad}</td>
                      <td>{parqueadero.direccion}</td>
                      <td>{parqueadero.cantidad_espacios}</td>
                      <td>{parqueadero.desc_tipo}</td>
                      <td>{parqueadero.hora_apertura}</td>
                      <td>{parqueadero.hora_cierre}</td>
                      <td>{parqueadero.precio_minuto_moto}</td>
                      <td>{parqueadero.precio_minuto_auto}</td>
                      <td>{parqueadero.tarifap_moto}</td>
                      <td>{parqueadero.tarifap_auto}</td>
                      <td>{parqueadero.id_parqueadero}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12">No hay datos de parqueaderos disponibles.</td>
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
            <Marker key={parqueadero.id_parqueadero} position={[4.711, -74.0721]}>
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

export default DeleteParking;
