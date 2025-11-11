import { parseDom2StaticStyle } from '../../../src/dom2'
import { TEST_OPTIONS_LIST } from '../utils'

describe('padding:', () => {
  const properties = [
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
  ] as const
  ;['10px', '5%'].forEach((value) => {
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
