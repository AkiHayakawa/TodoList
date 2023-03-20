import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Navbar from "./components/Modules/Navbar";
import RegistrMentor from "./pages/AuthMentor/RegistrMentor";
import RegistrMentorStage from "./pages/AuthMentor/RegistrMentorStage";
import CreateNewPass from "./pages/CreateNewPass";
import LoginPage from "./pages/LoginPage";
import RecoveryPassPage from "./pages/RecoveryPassPage";
import RegistrPage from "./pages/RegistrPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/registr" element={<RegistrPage />} />
        <Route path="/registrMentor" element={<RegistrMentor />} />
        <Route path="/registrMentorStage" element={<RegistrMentorStage />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="/logout" element={<RegistrPage />} />
        <Route path="/recoveryPass" element={<RecoveryPassPage />} />
        <Route path="account/login" element={<CreateNewPass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
