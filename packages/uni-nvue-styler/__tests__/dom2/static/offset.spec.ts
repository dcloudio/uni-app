import { parseDom2StaticStyle } from '../../../src/dom2'
import { TEST_OPTIONS_LIST } from '../utils'

describe('top/right/bottom/left:', () => {
  const properties = ['top', 'right', 'bottom', 'left'] as const
  ;['10px', '50%', 'auto'].forEach((value) => {
    properties.forEach((property) => {
      test(`${property}-${value}`, () => {
        const input = `${property}: ${value}`
        TEST_OPTIONS_LIST.forEach((options) => {
          const result = parseDom2StaticStyle(input, options)
          expect(result).toMatchSnapshot(
            `${options.platform}(${options.target})`
          )
        })
      })
    })
  })
})
