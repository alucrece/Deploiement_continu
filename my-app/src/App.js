import React from "react";
import RegistrationForm from "./components/registrationForm";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const port = process.env.REACT_APP_SERVER_PORT;
  let [, setUsersCount] = useState(0);
  
  useEffect(() => {
    async function countUsers() {
      try {
        const api = axios.create({
          baseURL: `http://localhost:${port}`
        });
        const response = await api.get(`/users`);
        setUsersCount(response.data.utilisateurs.length);
      } catch (error) {
        console.error(error);
      }
    }
    countUsers();
  }, [port]);

  return (
    <div>
      <h1>Formulaire d'inscription</h1>
      <RegistrationForm />
      
      {/* Ceci est obligatoire pour voir les toasts */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
}

export default App;