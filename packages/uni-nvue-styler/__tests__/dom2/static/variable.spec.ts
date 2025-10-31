import { parseDom2StaticStyle } from '../../../src/dom2'
import { TEST_OPTIONS_LIST } from '../utils'

describe('variable:', () => {
  test('define variable', () => {
    const input = `--color: red;--font-size: 16px;`
    TEST_OPTIONS_LIST.forEach((options) => {
      const result = parseDom2StaticStyle(input, { ...options, genCode: true })
      expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
    })
  })
})
