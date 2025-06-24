describe('Homepage', () => {
  it('visits the homepage', () => {
    cy.visit('/');
    cy.contains('Bienvenue'); // ou tout autre texte visible
  });
});