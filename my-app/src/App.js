import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthdate: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Formulaire d'inscription</h2>
      <form>
        <input type="text" name="firstName" placeholder="Nom" onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Prénom" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="date" name="birthdate" onChange={handleChange} />
        <input type="text" name="city" placeholder="Ville" onChange={handleChange} />
        <input type="text" name="postalCode" placeholder="Code postal" onChange={handleChange} />
        <button type="submit">S'enregistrer</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
