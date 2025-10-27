import { DOM2_APP_PLATFORM, DOM2_APP_TARGET, parse } from '../../../src'
import { parseDom2StaticStyle } from '../../../src/dom2'
import { TEST_OPTIONS_LIST } from '../utils'

describe('parseDom2StaticStyle:', () => {
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

describe('parse', () => {
  const style = `.test {
  border-style:dashed!important;
  border: 1px solid red !important;
  color:red;
  color:blue!important;
  color:black;
}`
  test(style, async () => {
    const result = await parse(style, {
      type: 'uvue',
      platform: 'app-harmony',
      dom2: {
        platform: DOM2_APP_PLATFORM.APP_HARMONY,
        target: DOM2_APP_TARGET.DOM_C,
      },
    })
    expect(result).toMatchSnapshot()
  })
})
