import { parseDom2StaticStyle } from '../../../src/dom2'
import { TEST_OPTIONS_LIST } from '../utils'

describe('transition-delay:', () => {
  ;['0s', '0.5s', '200ms', '2s, 4ms'].forEach((value) => {
    test(value, () => {
      const input = `transition-delay: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('transition-duration:', () => {
  ;['0.3s', '1s', '150ms'].forEach((value) => {
    test(value, () => {
      const input = `transition-duration: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('transition-property:', () => {
  ;[
    'all',
    'none',
    'width',
    'height',
    'margin',
    'margin-top',
    'margin-bottom',
    'margin-left',
    'margin-right',
    'left',
    'right',
    'top',
    'bottom',
    'padding',
    'padding-left',
    'padding-right',
    'padding-top',
    'padding-bottom',
    'opacity',
    'background-color',
    'border-color',
    'border-top-color',
    'border-bottom-color',
    'border-left-color',
    'border-right-color',
    'transform',
  ].forEach((value) => {
    test(value, () => {
      const input = `transition-property: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('transition-timing-function:', () => {
  ;[
    'ease',
    'ease-in',
    'ease-out',
    'ease-in-out',
    'linear',
    'cubic-bezier',
  ].forEach((value) => {
    test(value, () => {
      const input = `transition-timing-function: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})
