/// <reference types="cypress" />

describe('Web Vapor 内置组件', () => {
  beforeEach(() => {
    cy.on('window:before:load', (win) => {
      cy.spy(win.console, 'warn').as('consoleWarn')
      cy.spy(win.console, 'error').as('consoleError')
    })
    cy.visit('/')
    cy.get('#page-ready').should('have.text', 'web-vapor-components-ready')
  })

  afterEach(() => {
    cy.get('@consoleWarn').should('not.have.been.calledWithMatch', '[Vue warn]')
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('渲染全部 17 个已启用组件，未混入旧 picker 样式', () => {
    for (const name of [
      'checkbox',
      'checkbox-group',
      'form',
      'label',
      'loading',
      'match-media',
      'navigator',
      'picker',
      'picker-view',
      'picker-view-column',
      'progress',
      'radio',
      'radio-group',
      'slider',
      'swiper',
      'swiper-item',
      'switch',
    ]) {
      cy.get(`#test-${name}`).should('exist')
    }
    cy.get('#test-picker-view-column .uni-picker-view-mask').should(
      'have.css',
      'transform',
      'none'
    )
    cy.get('#test-swiper').should('have.css', 'height', '150px')
  })

  it('动态属性更新', () => {
    cy.get('#test-increment').click()
    cy.get('#test-count').should('have.text', '1')
    cy.get('#test-progress').should('contain.text', '10%')
  })

  it('分组控件事件与表单提交', () => {
    cy.get('#test-checkbox').click()
    cy.get('#test-checkbox-value').should('have.text', 'one')
    cy.get('#test-radio').click()
    cy.get('#test-radio-value').should('have.text', 'one')
    cy.get('#test-switch').click()
    cy.get('#test-switch-value').should('have.text', 'true')
    cy.get('#test-submit').click()
    cy.get('#test-form-value')
      .invoke('text')
      .then((text) => {
        expect(JSON.parse(text)).to.include({
          choice: 'one',
          enabled: true,
          amount: 25,
        })
        expect(JSON.parse(text).choices).to.deep.equal(['one'])
      })
  })

  it('swiper 响应 current 更新并触发 change', () => {
    cy.get('#test-next').click()
    cy.get('#test-swiper-value').should('have.text', '1')
  })
})
