import React, { useEffect, useState } from "react";
import logo from "../assets/img/logo.png";
import camioneta from "../assets/img/camioneta.png";
import dinero from "../assets/img/dinero.png";
import calendario from "../assets/img/calendario.png";
import mano from "../assets/img/mano.png";
import styles from "../styles/Homepage.module.css";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userData = localStorage.getItem("user-data");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const navigate = useNavigate();

  const handleReservationClick = () => {
    navigate("/reserva");
  };

  const handleRegistrationClick = () => {
    navigate("/registration");
  };

  const handleGerenteClick = () => {
    if (+user?.id_rol) {
      navigate("/gerente");
    } else {
      navigate("/");
    }
  };

  const handleIniseClick = () => {
    navigate("/inise");
  };

  const handleLogout = () => {
    localStorage.removeItem("user-data");
    window.location.reload();
  };

  const handleParqueadero = () => {
    if (+user?.id_rol) {
      navigate("/parqueadero");
    } else {
      navigate("/parqueadero");
    }
  };

  return (
    <div className={styles.Homepage}>
      <nav>
        <div className={styles.logocontainer}>
          <img src={logo} alt="Four Parking logo" className={styles.logo} />
        </div>
        <div className={styles.navLinks}>
          <a href="/">Inicio</a>
          <a onClick={handleParqueadero}>Parqueaderos</a>
          <a href="/somos">¿Quiénes somos?</a>
          {user ? (
            <>
              <button onClick={handleLogout} className={styles.Loginbutton}>
                Cerrar sesión
              </button>
              {+user.id_rol === 2 ? (
                <>
                  <button
                    onClick={handleReservationClick}
                    className={styles.Reservationbutton}
                  >
                    ¡Reserva ahora!
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleGerenteClick}
                    className={styles.Gerentebutton}
                  >
                    Acceso Gerente
                  </button>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </nav>
      <div className={styles.BannerContainer}>
        <img
          src={camioneta}
          alt="Camioneta suzuki"
          className={styles.SuzukiImage}
        />
        <div className={styles.BannerText}>
          <p>
            <h2 className={styles.MainBannerText}>
              ¡Parquea con facilidad en Colombia!
            </h2>
          </p>
          <br />
          <p>
            <h3 className={styles.SecondBannerText}>
              Bienvenido a FourPark, reserva tu espacio de estacionamiento en
              línea, sin complicaciones.
            </h3>
          </p>
          <div className={styles.BannerButtons}>
            {user ? (
              <></>
            ) : (
              <>
                <button
                  onClick={handleRegistrationClick}
                  className={styles.BannerButton}
                >
                  Únete ahora
                </button>
                <button
                  onClick={handleIniseClick}
                  className={styles.BannerButton}
                >
                  Ingresa ahora
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      |
      <div className={styles.BottomPart}>
        <div className={styles.TextContainer}>
          <p>
            <h2 className={styles.TextConth2}>¿Por qué elegirnos?</h2>
          </p>
          <br />
          <p>
            <h3 className={styles.TextConth3}>
              Ofrecemos una solución innovadora que le permite encontrar,
              reservar y pagar parqueaderos en todo Colombia desde la comodidad
              de su casa.
            </h3>
          </p>
        </div>
        <div className={styles.smallBanners}>
          <div className={styles.smallBanner}>
            <img src={dinero} alt="dinero" />
            <p>
              <h2>Precios competitivos</h2>
            </p>
            <br />
          </div>
          <div className={styles.smallBanner}>
            <img src={calendario} alt="calendario" />
            <p>
              <h2>Cancelación gratis</h2>
            </p>
            <br />
          </div>
          <div className={styles.smallBanner}>
            <img src={mano} alt="mano" />
            <p>
              <h2>Amplia selección de parqueaderos</h2>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
