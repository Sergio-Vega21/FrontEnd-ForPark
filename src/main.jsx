import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./components/registration";
import Inise from "./components/inise";
import AgregarParqueadero from "./components/agregarParqueadero";
import Reserva from "./components/reserva";
import "./styles/Registration.module.css";
//import PasswordReset from "./reiniciarPassword";
//import UserRecovery from "./recuperarUsuario";
import Factura from "./components/factura";
import Home from "./components/homepage";
import Parqueadero from "./components/parqueadero";
import Somos from "./components/somos";
import EmploRegister from "./components/emploRegister";
import Gerente from "./components/gerente";
import ModificarParqueadero from "./components/modificarParqueadero";
import RegisterSpecial from "./components/RegisterSpecial";
import CreditCardAdd from "./components/creditCardAdd";
import DeleteParking from "./components/deleteParking";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/registration" element={<Registration />} />
      <Route path="/inise" element={<Inise />} />
      <Route path="/agregarParqueadero" element={<AgregarParqueadero />} />
      <Route path="/reserva" element={<Reserva />} />
      {/*<Route path="/reinicioPassword" element={<PasswordReset />} />*/}
      <Route path="/factura" element={<Factura />} />
      <Route path="/" element={<Home />} />
      <Route path="/parqueadero" element={<Parqueadero />} />
      <Route path="/somos" element={<Somos />} />
      <Route path="/emploRegister" element={<EmploRegister />} />
      <Route path="/gerente" element={<Gerente />} />
      <Route path="/modificarParqueadero" element={<ModificarParqueadero />} />
      <Route path="/registrofuncionario" element={<RegisterSpecial />} />
      <Route path="/credito" element={<CreditCardAdd />} />
      <Route path="/deleteParking" element={<DeleteParking />} />
    </Routes>
  </Router>
);
