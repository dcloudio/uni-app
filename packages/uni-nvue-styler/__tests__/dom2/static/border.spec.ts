import { parseDom2StaticStyle } from '../../../src/dom2'
import { TEST_OPTIONS_LIST } from '../utils'

describe('border:', () => {
  ;['none', 'solid', 'dashed', 'dotted', 'invalid'].forEach((value) => {
    const borderValue = `1px ${value} red`
    test(borderValue, () => {
      const input = `border: ${borderValue}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})
describe('border-style:', () => {
  ;['solid'].forEach((value) => {
    test(value, () => {
      const input = `border-style: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('border-color:', () => {
  ;['red'].forEach((value) => {
    test(value, () => {
      const input = `border-color: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})
