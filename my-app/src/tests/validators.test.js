import {
  validationNameorCity,
  validationEmail,
  validationAge,
  validationPostalCode,
} from "../utils/validation";

describe("validationNameorCity", () => {
  it("valide des noms ou villes corrects", () => {
    expect(validationNameorCity("Jean Dupont")).toBe(true);
    expect(validationNameorCity("Élodie-Renée")).toBe(true);
    expect(validationNameorCity("St André de la Roche")).toBe(true);
    expect(validationNameorCity("Zoë")).toBe(true);
  });

  it("rejette des valeurs invalides", () => {
    expect(validationNameorCity("")).toBe(false);               // vide
    expect(validationNameorCity("1234")).toBe(false);           // chiffres
    expect(validationNameorCity("Jean@#")).toBe(false);         // caractères spéciaux
    expect(validationNameorCity(123)).toBe(false);              // non string
    expect(validationNameorCity(undefined)).toBe(false);        // undefined
    expect(validationNameorCity(null)).toBe(false);             // null
  });
});

describe("validationEmail", () => {
  it("valide un email correct", () => {
    expect(validationEmail("test@example.com")).toBe(true);
    expect(validationEmail("prenom.nom@etu.univ.fr")).toBe(true);
  });

  it("rejette un email invalide", () => {
    expect(validationEmail("not-an-email")).toBe(false);
    expect(validationEmail("test@.com")).toBe(false);
    expect(validationEmail("test@domain")).toBe(false);
    expect(validationEmail("")).toBe(false);
    expect(validationEmail(null)).toBe(false);         // non string
    expect(validationEmail(123)).toBe(false);          // non string
  });
});

describe("validationAge", () => {
  it("valide une date de naissance pour un majeur", () => {
    const birthdate = "2000-01-01";
    expect(validationAge(birthdate)).toBe(true);
  });

  it("rejette une personne mineure", () => {
    const recentBirthdate = new Date();
    recentBirthdate.setFullYear(recentBirthdate.getFullYear() - 10);
    expect(validationAge(recentBirthdate.toISOString().split("T")[0])).toBe(false);
  });

  it("rejette une date invalide ou vide", () => {
    expect(validationAge("")).toBe(false);             // vide
    expect(validationAge("abcd")).toBe(false);         // isNaN
    expect(validationAge(null)).toBe(false);           // null
    expect(validationAge(undefined)).toBe(false);      // undefined
  });

  it("rejette une date de naissance au format invalide (ex: 2025-13-01)", () => {
    expect(validationAge("2025-13-01")).toBe(false); // mois 13 n'existe pas
  });

  it("rejette une date invalide comme 2025-02-30", () => {
    expect(validationAge("2025-02-30")).toBe(false); // 30 février n'existe pas
  });
});

describe("validationPostalCode", () => {
  it("valide un code postal français à 5 chiffres", () => {
    expect(validationPostalCode("75001")).toBe(true);
    expect(validationPostalCode("13000")).toBe(true);
  });

  it("rejette un code postal invalide", () => {
    expect(validationPostalCode("7500")).toBe(false);           // trop court
    expect(validationPostalCode("ABCDE")).toBe(false);          // lettres
    expect(validationPostalCode("7500A")).toBe(false);          // mélange
    expect(validationPostalCode("")).toBe(false);               // vide
    expect(validationPostalCode(75001)).toBe(false);            // non string
    expect(validationPostalCode(null)).toBe(false);             // null
    expect(validationPostalCode(undefined)).toBe(false);        // undefined
  });
});