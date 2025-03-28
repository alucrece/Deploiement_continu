import { validationNameorCity, validationEmail, validationAge, validationPostalCode } from "../utils/validation";
console.log("RegistrationForm exécuté")
test("validationNameorCity accepte les noms valides", () => {
    expect(validationNameorCity("Jean")) .toBe(true);
    expect(validationNameorCity("Saint-Pierre")) .toBe(true);
    expect(validationNameorCity("O'Connell")) .toBe(true);
    expect(validationNameorCity("")) .toBe(false);
    expect(validationNameorCity("1234")) .toBe(false);
});

test("validationEmail accepte les emails valides", () => {
    expect(validationEmail("test@example.com")).toBe(true);
    expect(validationEmail("user.name+tag@domain.co.uk")).toBe(true);
    expect(validationEmail("invalid-email")) .toBe(false);
    expect(validationEmail("user@.com")) .toBe(false);
});

test("validationAge refuse les moins de 18 ans", () => {
    expect(validationAge("2000-01-01")).toBe(true);
    expect(validationAge("2010-01-01")).toBe(false);
    expect(validationAge("not a date")).toBe(false);
});

test("validationPostalCode accepte uniquement des codes postaux à 5 chiffres", () => {
    expect(validationPostalCode("75001")).toBe(true);
    expect(validationPostalCode("123")).toBe(false);
    expect(validationPostalCode("ABCDE")).toBe(false);
});