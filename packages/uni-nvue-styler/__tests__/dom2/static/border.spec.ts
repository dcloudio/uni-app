import { parseDom2StaticStyle } from '../../../src/dom2'
import { TEST_OPTIONS_LIST } from '../utils'

describe('border:', () => {
  ;['none', 'solid', 'dashed', 'dotted', 'invalid'].forEach((value) => {
    const borderValue = `1px ${value} red`
    test(borderValue, () => {
      const input = `border: ${borderValue}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('border-style:', () => {
  ;['none', 'solid', 'dashed', 'dotted'].forEach((value) => {
    test(value, () => {
      const input = `border-style: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('border-color:', () => {
  ;['red'].forEach((value) => {
    test(value, () => {
      const input = `border-color: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

const BORDER_SIDE_VALUES = ['none', 'solid', 'dashed', 'dotted']

describe('border-*-style:', () => {
  const properties = [
    'border-top-style',
    'border-right-style',
    'border-bottom-style',
    'border-left-style',
  ] as const
  properties.forEach((property) => {
    BORDER_SIDE_VALUES.forEach((value) => {
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

describe('border-*-color:', () => {
  const properties = [
    'border-top-color',
    'border-right-color',
    'border-bottom-color',
    'border-left-color',
  ] as const
  ;['red', '#00ff00'].forEach((value) => {
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

describe('border-*-width:', () => {
  const properties = [
    'border-top-width',
    'border-right-width',
    'border-bottom-width',
    'border-left-width',
  ] as const
  ;['1px', '0', 'thin', 'medium', 'thick'].forEach((value) => {
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

describe('border-radius:', () => {
  const properties = [
    'border-top-left-radius',
    'border-top-right-radius',
    'border-bottom-right-radius',
    'border-bottom-left-radius',
  ] as const
  ;['10px', '50%'].forEach((value) => {
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
