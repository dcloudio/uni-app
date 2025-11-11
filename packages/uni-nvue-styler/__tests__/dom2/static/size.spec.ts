import { parseDom2StaticStyle } from '../../../src/dom2'
import { TEST_OPTIONS_LIST } from '../utils'

describe('width/height:', () => {
  const properties = [
    'width',
    'height',
    'min-width',
    'min-height',
    'max-width',
    'max-height',
  ] as const
  ;['auto', '100px', '50%'].forEach((value) => {
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
