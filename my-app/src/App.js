import React from "react";
import RegistrationForm from "./components/registrationForm";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const port = process.env.REACT_APP_SERVER_PORT;
  let [usersCount, setUsersCount] = useState(0);
  
  useEffect(() => {
    async function countUsers() {
      try {
        const api = axios.create({
          baseURL: `http://localhost:${port}`
        });
        const response = await api.get(`/users`);
        setUsersCount (response.data.utilisateurs.length)
      } catch (error) {
        console.error(error);
      }
    }
    countUsers()
  }, [])
  return (
    <div>
      <h1>Formulaire d'inscription</h1>
      <RegistrationForm />
    </div>
  );
}

export default App;