import { parseDom2StaticStyle } from '../../../src/dom2'
import { TEST_OPTIONS_LIST } from '../utils'

describe('flex-direction:', () => {
  ;['row', 'row-reverse', 'column', 'column-reverse'].forEach((value) => {
    test(value, () => {
      const input = `flex-direction: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('flex-wrap:', () => {
  ;['nowrap', 'wrap', 'wrap-reverse'].forEach((value) => {
    test(value, () => {
      const input = `flex-wrap: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('flex-basis:', () => {
  ;['auto', 'content', '10px', '50%'].forEach((value) => {
    test(value, () => {
      const input = `flex-basis: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('flex-grow:', () => {
  ;[0, 1, 2].forEach((value) => {
    test('' + value, () => {
      const input = `flex-grow: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('flex-shrink:', () => {
  ;[0, 1, 2].forEach((value) => {
    test('' + value, () => {
      const input = `flex-shrink: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('justify-content:', () => {
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
      const input = `justify-content: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})
