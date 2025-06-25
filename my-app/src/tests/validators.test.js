import {
  validationNameorCity,
  validationEmail,
  validationAge,
  validationPostalCode,
} from "../utils/validation";

describe("validationNameorCity", () => {
  it("valide un nom correct", () => {
    expect(validationNameorCity("Jean Dupont")).toBe(true);
    expect(validationNameorCity("Élodie-Renée")).toBe(true);
  });

  it("rejette un nom vide ou invalide", () => {
    expect(validationNameorCity("")).toBe(false);
    expect(validationNameorCity("1234")).toBe(false);
    expect(validationNameorCity(null)).toBe(false);
  });
});

describe("validationEmail", () => {
  it("valide un email correct", () => {
    expect(validationEmail("test@example.com")).toBe(true);
  });

  it("rejette un email invalide", () => {
    expect(validationEmail("not-an-email")).toBe(false);
    expect(validationEmail("test@.com")).toBe(false);
    expect(validationEmail("")).toBe(false);
  });
});

describe("validationAge", () => {
  it("valide une date de naissance majeure", () => {
    const birthdate = "2000-01-01";
    expect(validationAge(birthdate)).toBe(true);
  });

  it("rejette une date vide ou invalide", () => {
    expect(validationAge("")).toBe(false);
    expect(validationAge("abcd")).toBe(false);
  });

  it("rejette une personne mineure", () => {
    const recentBirthdate = new Date();
    recentBirthdate.setFullYear(recentBirthdate.getFullYear() - 10);
    expect(validationAge(recentBirthdate.toISOString().split("T")[0])).toBe(false);
  });
});

describe("validationPostalCode", () => {
  it("valide un code postal à 5 chiffres", () => {
    expect(validationPostalCode("75001")).toBe(true);
  });

  it("rejette un code postal invalide", () => {
    expect(validationPostalCode("7500")).toBe(false);
    expect(validationPostalCode("ABCDE")).toBe(false);
    expect(validationPostalCode("")).toBe(false);
  });
});

describe("validationNameorCity - cas non string", () => {
  it("retourne false pour une valeur non string", () => {
    expect(validationNameorCity(123)).toBe(false);
    expect(validationNameorCity(undefined)).toBe(false);
  });
});

describe("validationAge - cas invalides", () => {
  it("retourne false pour une date vide ou invalide", () => {
    expect(validationAge("")).toBe(false); // !birthdate
    expect(validationAge("abcd")).toBe(false); // isNaN(date)
  });
});

describe("validationPostalCode - cas non string", () => {
  it("retourne false pour une valeur non string", () => {
    expect(validationPostalCode(75001)).toBe(false);
    expect(validationPostalCode(undefined)).toBe(false);
  });
});

test("validationAge retourne false si birthdate est vide ou invalide", () => {
  expect(validationAge(null)).toBe(false);
  expect(validationAge("invalid-date")).toBe(false);
});