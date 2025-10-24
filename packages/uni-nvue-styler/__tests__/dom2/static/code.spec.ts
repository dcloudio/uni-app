import { parseDom2StaticStyle } from '../../../src/dom2'
import { TEST_OPTIONS_LIST } from '../utils'

describe('code:', () => {
  const style = `border: 1px solid red;color:red`
  test(style, () => {
    TEST_OPTIONS_LIST.forEach((options) => {
      const result = parseDom2StaticStyle(style, {
        ...options,
        genCode: true,
      })
      expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
    })
  })
})
