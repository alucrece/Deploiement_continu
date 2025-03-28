import { validationNameorCity, validationEmail, validationAge, validationPostalCode } from "../utils/validation";

describe("Validation Functions", () => {
  
  test("validationNameorCity should return true for valid names or cities", () => {
    expect(validationNameorCity("John")).toBe(true);
    expect(validationNameorCity("Paris")).toBe(true);
    expect(validationNameorCity("Àlvaro")).toBe(true);
    expect(validationNameorCity("Saint-Jean")).toBe(true);
  });

  test("validationNameorCity should return false for invalid names or cities", () => {
    expect(validationNameorCity("John123")).toBe(false);
    expect(validationNameorCity("Paris#")).toBe(false);
    expect(validationNameorCity("123")).toBe(false);
    expect(validationNameorCity("!@#$")).toBe(false);
  });

  test("validationEmail should return true for valid email addresses", () => {
    expect(validationEmail("test@example.com")).toBe(true);
    expect(validationEmail("john.doe@example.co.uk")).toBe(true);
    expect(validationEmail("user@domain.org")).toBe(true);
  });

  test("validationEmail should return false for invalid email addresses", () => {
    expect(validationEmail("testexample.com")).toBe(false);
    expect(validationEmail("user@domain")).toBe(false);
  });

  test("validationAge should return true for ages 18 and above", () => {
    expect(validationAge("2000-01-01")).toBe(true);
    expect(validationAge("1990-05-15")).toBe(true);
  });

  test("validationAge should return false for invalid birthdates", () => {
    expect(validationAge("invalid-date")).toBe(false);
    expect(validationAge("")).toBe(false);
  });

  test("validationPostalCode should return true for valid postal codes", () => {
    expect(validationPostalCode("75001")).toBe(true);
    expect(validationPostalCode("12345")).toBe(true);
    expect(validationPostalCode("99999")).toBe(true);
  });

  test("validationPostalCode should return false for invalid postal codes", () => {
    expect(validationPostalCode("7500A")).toBe(false);
    expect(validationPostalCode("123456")).toBe(false);
    expect(validationPostalCode("ABCDE")).toBe(false);
  });

});
