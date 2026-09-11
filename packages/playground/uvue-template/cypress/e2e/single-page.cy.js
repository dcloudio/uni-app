/// <reference types="cypress" />

describe('single-page uni-app x web', () => {
  it('does not warn about a missing vue-router injection', () => {
    cy.on('window:before:load', (win) => {
      cy.spy(win.console, 'warn').as('consoleWarn')
    })

    cy.visit('/')
    cy.get('#page-ready').should('have.text', 'single-page-ready')
    cy.get('@consoleWarn').should(
      'not.have.been.calledWithMatch',
      'injection "Symbol(router)" not found'
    )
  })
})
