import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/CreditCard.module.css";
import logo from "../assets/img/logo.png";
import valid from "card-validator";
import { FaLock } from "react-icons/fa";
import { client } from "../services/apirest";

const CreditCardForm = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  let user;

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("regdata"));
    const cardNumberValidation = valid.number(cardNumber);
    const expirationDateValidation = valid.expirationDate(expirationDate);
    const cvvValidation = valid.cvv(cvv);
    const cardholderNameValidation = cardholderName.trim() !== "";
    setIsFormValid(
      cardNumberValidation.isValid &&
        expirationDateValidation.isValid &&
        cvvValidation.isValid &&
        cardholderNameValidation
    );
  }, [cardNumber, expirationDate, cvv, cardholderName]);

  const finishRegister = async () => {
    try {
      const response = await client.post("/api/usuarios", user);
      if (response.status === 201) {
        console.log("Usuario registrado:", response.data);
      } else {
        console.error("Error:", response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error de registro:", error.response.data.message);
        alert(error.response.data.message);
        throw new Error({ message: "fallo" });
      } else {
        console.error("Error:", error.message);
        throw new Error({ message: "fallo" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      try {
        const tarjeta = {
          num_tarjeta: cardNumber,
          correo_electronico: user.correo_electronico,
          fecha_exp: expirationDate,
          codigo: cvv,
          titular: cardholderName,
        };
        await finishRegister();
        const response = await client.post("/api/tarjetas", tarjeta);
        if (response.status === 201) {
          navigate("/inise");
        } else {
          throw new Error(response.data.error || "Failed to add card");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    setCardNumber(value);
    const validation = valid.number(value);
    setErrors((prev) => ({
      ...prev,
      cardNumber: !validation.isValid ? "Número de tarjeta inválido" : "",
    }));
  };

  const handleExpirationDateChange = (e) => {
    const value = e.target.value;
    setExpirationDate(value);
    const validation = valid.expirationDate(value);
    setErrors((prev) => ({
      ...prev,
      expirationDate: !validation.isValid ? "Fecha de expiración inválida" : "",
    }));
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;
    setCvv(value);
    const validation = valid.cvv(value);
    setErrors((prev) => ({
      ...prev,
      cvv: !validation.isValid ? "CVV inválido" : "",
    }));
  };

  const handleCardholderNameChange = (e) => {
    const value = e.target.value;
    setCardholderName(value);
    setErrors((prev) => ({
      ...prev,
      cardholderName:
        value.trim() === "" ? "Nombre del titular es requerido" : "",
    }));
  };

  return (
    <div className={styles.CreditCard}>
      <div className={styles.logocontainer}>
        <img src={logo} alt="Four Parking logo" className={styles.logo} />
      </div>
      <div className={styles.formcontainer}>
        <form onSubmit={handleSubmit} className={styles.formcontent}>
          <h2>Antes de continuar, debes añadir un método de pago</h2>
          <div>
            <label htmlFor="cardNumber">Número de tarjeta:</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={handleCardNumberChange}
              required
            />
            {errors.cardNumber && (
              <p className={styles.error}>{errors.cardNumber}</p>
            )}
          </div>
          <div>
            <label htmlFor="expirationDate">Fecha de expiración:</label>
            <input
              type="text"
              id="expirationDate"
              value={expirationDate}
              onChange={handleExpirationDateChange}
              required
            />
            {errors.expirationDate && (
              <p className={styles.error}>{errors.expirationDate}</p>
            )}
          </div>
          <div>
            <label htmlFor="cvv">CVV:</label>
            <input
              type="password"
              id="cvv"
              value={cvv}
              onChange={handleCvvChange}
              required
            />
            {errors.cvv && <p className={styles.error}>{errors.cvv}</p>}
          </div>
          <div>
            <label htmlFor="cardholderName">Nombre del titular:</label>
            <input
              type="text"
              id="cardholderName"
              value={cardholderName}
              onChange={handleCardholderNameChange}
              required
            />
            {errors.cardholderName && (
              <p className={styles.error}>{errors.cardholderName}</p>
            )}
          </div>
          <button
            type="submit"
            className={styles.AddButton}
            disabled={!isFormValid}
          >
            {isFormValid ? "Agregar tarjeta" : <FaLock />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreditCardForm;
