const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  pageLoadTimeout: 200000,
  e2e: {
    baseUrl: 'http://localhost:5188',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: false,
  },
})
