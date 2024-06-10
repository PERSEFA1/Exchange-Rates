import React from "react";
import "./App.css";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import CurrencyByDate from "./components/pages/CurrencyByDate";
import CurrencyDynamics from "./components/pages/CurrencyDynamics";
import CurrencyConverter from "./components/pages/CurrencyConverter";
import { HeaderComponent } from "./components/header/HeaderComponent.jsx";

function App() {
  return (
    <>
      <HeaderComponent />
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<CurrencyByDate />} />
            <Route path="/dynamics" element={<CurrencyDynamics />} />
            <Route path="/converter" element={<CurrencyConverter />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
