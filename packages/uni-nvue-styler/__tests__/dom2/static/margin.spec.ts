import { parseDom2StaticStyle } from '../../../src/dom2'
import { TEST_OPTIONS_LIST } from '../utils'

describe('margin:', () => {
  ;['1em', '5% 0', '10px 50px 20px', '10px 50px 20px 0', '0', 'auto'].forEach(
    (value) => {
      test(value, () => {
        const input = `margin: ${value}`
        TEST_OPTIONS_LIST.forEach((options) => {
          const result = parseDom2StaticStyle(input, options)
          expect(result).toMatchSnapshot(
            `${options.platform}(${options.target})`
          )
        })
      })
    }
  )
})
