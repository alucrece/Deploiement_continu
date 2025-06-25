import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import axios from "axios";

jest.mock("axios");

describe("App component", () => {
  it("affiche le titre et le formulaire", () => {
    render(<App />);
    expect(screen.getByText(/formulaire d'inscription/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  });

  it("appelle axios.get pour récupérer les utilisateurs", async () => {
    const mockGet = jest.fn().mockResolvedValue({
      data: {
        utilisateurs: [{ nom: "Jean" }, { nom: "Alice" }],
      },
    });

    axios.create.mockReturnValue({ get: mockGet });

    render(<App />);

    await waitFor(() => {
      expect(mockGet).toHaveBeenCalledWith("/users");
    });
  });

  it("gère les erreurs si axios échoue", async () => {
    const mockGet = jest.fn().mockRejectedValue(new Error("Erreur réseau"));
    axios.create.mockReturnValue({ get: mockGet });

    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    render(<App />);

    await waitFor(() => {
      expect(mockGet).toHaveBeenCalledWith("/users");
      expect(consoleSpy).toHaveBeenCalled(); // Le catch s'est exécuté
    });

    consoleSpy.mockRestore();
  });
});
