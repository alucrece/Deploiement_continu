import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegistrationForm from "../components/registrationForm";

describe("RegistrationForm", () => {
  it("affiche tous les champs du formulaire", () => {
    render(<RegistrationForm />);
    expect(screen.getByPlaceholderText("Nom")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Prénom")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ville")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Code postal")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /s'enregistrer/i })).toBeInTheDocument();
  });

  it("affiche une erreur si tous les champs sont vides à la soumission", async () => {
    render(<RegistrationForm />);
    fireEvent.click(screen.getByRole("button", { name: /s'enregistrer/i }));

    await waitFor(() => {
      expect(screen.getByText(/le nom contient des caractères invalides/i)).toBeInTheDocument();
      expect(screen.getByText(/le prénom contient des caractères invalides/i)).toBeInTheDocument();
      expect(screen.getByText(/veuillez fournir un email valide/i)).toBeInTheDocument();
      expect(screen.getByText(/vous devez avoir au moins 18 ans/i)).toBeInTheDocument();
      expect(screen.getByText(/le nom de la ville contient des caractères invalides/i)).toBeInTheDocument();
      expect(screen.getByText(/le code postal doit être un format valide/i)).toBeInTheDocument();
    });
  });

  it("permet de remplir et soumettre le formulaire avec des données valides", () => {
    render(<RegistrationForm />);
    
    fireEvent.change(screen.getByPlaceholderText("Nom"), { target: { value: "Dupont" } });
    fireEvent.change(screen.getByPlaceholderText("Prénom"), { target: { value: "Jean" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "jean@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Ville"), { target: { value: "Paris" } });
    fireEvent.change(screen.getByPlaceholderText("Code postal"), { target: { value: "75001" } });
    fireEvent.change(screen.getByTestId("birthdate"), { target: { value: "1990-01-01" } });

    fireEvent.click(screen.getByRole("button", { name: /s'enregistrer/i }));
  });

  it("affiche une erreur si l'utilisateur a moins de 18 ans", async () => {
    render(<RegistrationForm />);
    
    fireEvent.change(screen.getByPlaceholderText("Nom"), { target: { value: "Dupont" } });
    fireEvent.change(screen.getByPlaceholderText("Prénom"), { target: { value: "Jean" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "jean@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Ville"), { target: { value: "Paris" } });
    fireEvent.change(screen.getByPlaceholderText("Code postal"), { target: { value: "75001" } });
    
    // Date de naissance moins de 18 ans
    const lessThan18Date = new Date();
    lessThan18Date.setFullYear(lessThan18Date.getFullYear() - 16);
    const lessThan18DateString = lessThan18Date.toISOString().slice(0, 10);
    
    fireEvent.change(screen.getByTestId("birthdate"), { target: { value: lessThan18DateString } });

    fireEvent.click(screen.getByRole("button", { name: /s'enregistrer/i }));

    await waitFor(() => {
      expect(screen.getByText(/vous devez avoir au moins 18 ans/i)).toBeInTheDocument();
    });
  });
});
