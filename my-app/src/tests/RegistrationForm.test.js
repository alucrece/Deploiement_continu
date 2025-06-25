import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RegistrationForm from "../components/registrationForm";

describe("RegistrationForm", () => {
  it("affiche tous les champs du formulaire", () => {
    render(<RegistrationForm />);
    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ville/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date de naissance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/code postal/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /s'inscrire/i })).toBeInTheDocument();
  });

  it("affiche une erreur si les champs sont vides à la soumission", () => {
    render(<RegistrationForm />);
    fireEvent.click(screen.getByRole("button", { name: /s'inscrire/i }));
    expect(screen.getByText(/le nom est requis/i)).toBeInTheDocument();
    expect(screen.getByText(/la ville est requise/i)).toBeInTheDocument();
    expect(screen.getByText(/l'email est requis/i)).toBeInTheDocument();
    expect(screen.getByText(/la date de naissance est requise/i)).toBeInTheDocument();
    expect(screen.getByText(/le code postal est requis/i)).toBeInTheDocument();
  });

  it("permet de remplir et soumettre le formulaire avec des données valides", () => {
    render(<RegistrationForm />);
    
    fireEvent.change(screen.getByLabelText(/nom/i), { target: { value: "Jean Dupont" } });
    fireEvent.change(screen.getByLabelText(/ville/i), { target: { value: "Paris" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "jean@example.com" } });
    fireEvent.change(screen.getByLabelText(/date de naissance/i), { target: { value: "1990-01-01" } });
    fireEvent.change(screen.getByLabelText(/code postal/i), { target: { value: "75001" } });

    fireEvent.click(screen.getByRole("button", { name: /s'inscrire/i }));

    // Optionnel : vérifier si une confirmation s'affiche
    // expect(screen.getByText(/inscription réussie/i)).toBeInTheDocument();
  });
});
