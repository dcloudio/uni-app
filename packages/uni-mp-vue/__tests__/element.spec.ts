import { hyphenateCssProperty } from '../src/dom/UniCSSStyleDeclaration'
import { UniElement } from '../src/dom/UniElement'

describe('uni-mp-vue: UniElement', () => {
  it('UniCSSStyleDeclaration', () => {
    const element = new UniElement()
    element.style['color'] = 'red'
    expect(element.style['color']).toBe('red')
    expect(element.style.getPropertyValue('color')).toBe('red')
    expect(element.style.cssText).toBe('color:red;')
    element.style.setProperty('color', 'blue')
    expect(element.style['color']).toBe('blue')
    expect(element.style.getPropertyValue('color')).toBe('blue')
    expect(element.style.cssText).toBe('color:blue;')
    element.style.setProperty('margin-top', '10px')
    expect(element.style['margin-top']).toBe('10px')
    expect(element.style.getPropertyValue('margin-top')).toBe('10px')
    expect(element.style.cssText).toBe('color:blue;margin-top:10px;')
    element.style.setProperty('marginBottom', '10px')
    expect(element.style['marginBottom']).toBe('10px')
    expect(element.style.getPropertyValue('marginBottom')).toBe('10px')
    expect(element.style['margin-bottom']).toBe('10px')
    expect(element.style.getPropertyValue('margin-bottom')).toBe('10px')
    expect(element.style.cssText).toBe(
      'color:blue;margin-top:10px;margin-bottom:10px;'
    )
  })
  it('hyphenateCssProperty', () => {
    expect(hyphenateCssProperty('WebkitTransform')).toBe('-webkit-transform')
    expect(hyphenateCssProperty('WebkitTransitionOpacity')).toBe(
      '-webkit-transition-opacity'
    )
    expect(hyphenateCssProperty('marginTop')).toBe('margin-top')
  })
})
