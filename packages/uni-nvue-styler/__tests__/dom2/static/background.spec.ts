import { parseDom2StaticStyle } from '../../../src/dom2'
import { TEST_OPTIONS_LIST } from '../utils'

describe('background:', () => {
  ;['none', '#ffffff'].forEach((value) => {
    test(value, () => {
      const input = `background: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})
