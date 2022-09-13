/// <reference types="cypress" />

context('Waiting', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('ssr-view', () => {
    cy.get('.ssr-view').should('have.text', 'ssr-view')
  })
  it('ssr-mismatch', () => {
    cy.wait(1000)
    cy.get('#ssr-log').should('not.contain.text', 'Hydration')
  })
})
