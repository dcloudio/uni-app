import { parseDom2StaticStyle } from '../../../src/dom2'
import { TEST_OPTIONS_LIST } from '../utils'

describe('align-content:', () => {
  ;[
    'auto',
    'flex-start',
    'center',
    'flex-end',
    'stretch',
    'baseline',
    'space-between',
    'space-around',
    'space-evenly',
  ].forEach((value) => {
    test(value, () => {
      const input = `align-content: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('align-items:', () => {
  ;[
    'auto',
    'flex-start',
    'center',
    'flex-end',
    'stretch',
    'baseline',
    'space-between',
    'space-around',
    'space-evenly',
  ].forEach((value) => {
    test(value, () => {
      const input = `align-items: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('align-self:', () => {
  ;[
    'auto',
    'flex-start',
    'center',
    'flex-end',
    'stretch',
    'baseline',
    'space-between',
    'space-around',
    'space-evenly',
  ].forEach((value) => {
    test(value, () => {
      const input = `align-self: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})
