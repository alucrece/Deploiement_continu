const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // adapte à ton app si besoin
    setupNodeEvents(on, config) {
      // implement node event listeners here si besoin
    },
  },
});