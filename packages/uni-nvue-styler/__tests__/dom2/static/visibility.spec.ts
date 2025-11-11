import { parseDom2StaticStyle } from '../../../src/dom2'
import { TEST_OPTIONS_LIST } from '../utils'

describe('display:', () => {
  ;['none', 'flex'].forEach((value) => {
    test(value, () => {
      const input = `display: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('visibility:', () => {
  ;['visible', 'hidden'].forEach((value) => {
    test(value, () => {
      const input = `visibility: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})
