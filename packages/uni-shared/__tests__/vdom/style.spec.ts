import { UniCSSStyleDeclaration, proxyStyle } from '../../src/vdom/Style'

describe('vdom', () => {
  test('style', () => {
    const uniCSSStyle = proxyStyle(new UniCSSStyleDeclaration())
    expect(uniCSSStyle.toJSON()).toBeUndefined()
    uniCSSStyle.cssText = 'color:red'
    expect(uniCSSStyle.toJSON()).toBe(uniCSSStyle.cssText)
    uniCSSStyle.backgroundColor = 'black'
    expect(uniCSSStyle.toJSON()).toEqual([
      uniCSSStyle.cssText,
      { backgroundColor: uniCSSStyle.backgroundColor },
    ])
    const uniCSSStyle1 = proxyStyle(new UniCSSStyleDeclaration())
    uniCSSStyle1.setProperty('--window-top', '0px')
    expect(uniCSSStyle1.toJSON()).toEqual({
      '--window-top': uniCSSStyle1['--window-top'],
    })
  })
})
