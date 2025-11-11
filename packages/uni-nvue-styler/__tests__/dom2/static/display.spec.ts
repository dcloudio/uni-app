import { parseDom2StaticStyle } from '../../../src/dom2'
import { TEST_OPTIONS_LIST } from '../utils'

describe('opacity:', () => {
  ;['1', '0.5', '0'].forEach((value) => {
    test(value, () => {
      const input = `opacity: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('overflow:', () => {
  ;['visible', 'hidden'].forEach((value) => {
    test(value, () => {
      const input = `overflow: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('pointer-events:', () => {
  ;['auto', 'none'].forEach((value) => {
    test(value, () => {
      const input = `pointer-events: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('z-index:', () => {
  ;['1', '100', '0', 'auto'].forEach((value) => {
    test(value, () => {
      const input = `z-index: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})
