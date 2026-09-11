const { defineConfig } = require('cypress')

module.exports = defineConfig({
  pageLoadTimeout: 200000,
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    baseUrl: 'http://localhost:5175',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: false,
  },
})
