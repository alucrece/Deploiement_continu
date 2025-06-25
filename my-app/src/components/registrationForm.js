import React, { useState, useEffect } from "react";
import { validationNameorCity, validationAge, validationPostalCode, validationEmail } from "../utils/validation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
console.log("Test coverage running...");
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthdate: "",
    city: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!validationNameorCity(formData.firstName)) {
      validationErrors.firstName = "Le nom contient des caractères invalides.";
    }
    if (!validationNameorCity(formData.lastName)) {
      validationErrors.lastName = "Le prénom contient des caractères invalides.";
    }
    if (!validationEmail(formData.email)) {
      validationErrors.email = "Veuillez fournir un email valide.";
    }
    if (!validationAge(formData.birthdate)) {
      validationErrors.birthdate = "Vous devez avoir au moins 18 ans.";
    }
    if (!validationNameorCity(formData.city)) {
      validationErrors.city = "Le nom de la ville contient des caractères invalides.";
    }
    if (!validationPostalCode(formData.postalCode)) {
      validationErrors.postalCode = "Le code postal doit être un format valide (5 chiffres).";
    }

    if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
      toast.error("Veuillez corriger les erreurs du formulaire.");
    } else {
      setErrors({});
      localStorage.setItem("formData", JSON.stringify(formData));
      toast.success("Formulaire soumis avec succès !");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        birthdate: "",
        city: "",
        postalCode: "",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="Nom"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Prénom"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            data-testid="birthdate"
          />
          {errors.birthdate && <p style={{ color: "red" }}>{errors.birthdate}</p>}
        </div>
        <div>
          <input
            type="text"
            name="city"
            placeholder="Ville"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
        </div>
        <div>
          <input
            type="text"
            name="postalCode"
            placeholder="Code postal"
            value={formData.postalCode}
            onChange={handleChange}
          />
          {errors.postalCode && <p style={{ color: "red" }}>{errors.postalCode}</p>}
        </div>
        <div>
          <button
            type="submit"
            //disabled={Object.values(formData).some((val) => !val)}
          >
            S'enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;