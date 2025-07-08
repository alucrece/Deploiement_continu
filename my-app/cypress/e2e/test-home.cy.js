describe("Homepage", () => {
  it("loads the home page", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Formulaire d'inscription").should("exist");
  });
});