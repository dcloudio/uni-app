import { parseDom2StaticStyle } from '../../../src/dom2'
import { TEST_OPTIONS_LIST } from '../utils'

describe('color:', () => {
  ;[
    'red',
    'transparent',
    '#090',
    '#009900',
    '#090a',
    '#009900aa',
    'rgb(255, 0, 0)',
    'rgba(255, 0, 0, 0.5)',
  ].forEach((value) => {
    test(value, () => {
      const input = `color: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})
