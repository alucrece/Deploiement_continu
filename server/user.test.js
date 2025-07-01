const request = require("supertest");
const app = require("./index"); // ou le fichier qui crée l'app express

describe("GET /", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });
});