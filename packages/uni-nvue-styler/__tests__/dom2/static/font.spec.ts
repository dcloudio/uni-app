import { parseDom2StaticStyle } from '../../../src/dom2'
import { TEST_OPTIONS_LIST } from '../utils'

describe('color:', () => {
  ;['red'].forEach((value) => {
    test(value, () => {
      const input = `color: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('font-size:', () => {
  ;['10px'].forEach((value) => {
    test(value, () => {
      const input = `font-size: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('font-family:', () => {
  ;['Arial'].forEach((value) => {
    test(value, () => {
      const input = `font-family: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('font-style:', () => {
  ;['normal', 'italic'].forEach((value) => {
    test(value, () => {
      const input = `font-style: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('font-weight:', () => {
  ;['normal', 'bold', 400, 700].forEach((value) => {
    test('' + value, () => {
      const input = `font-weight: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('letter-spacing:', () => {
  ;['10px'].forEach((value) => {
    test(value, () => {
      const input = `letter-spacing: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('line-height:', () => {
  ;['10px', 'normal'].forEach((value) => {
    test(value, () => {
      const input = `line-height: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('text-align:', () => {
  ;['left', 'right', 'center', 'justify'].forEach((value) => {
    test(value, () => {
      const input = `text-align: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('text-decoration-line:', () => {
  ;['none', 'underline', 'line-through', 'overline'].forEach((value) => {
    test(value, () => {
      const input = `text-decoration-line: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('text-overflow:', () => {
  ;['clip', 'ellipsis'].forEach((value) => {
    test(value, () => {
      const input = `text-overflow: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('text-shadow:', () => {
  ;[
    '1px 1px 2px pink',
    '#fc0 1px 0 10px',
    '5px 5px #558abb',
    'red 2px 5px',
    '5px 10px',
  ].forEach((value) => {
    test(value, () => {
      const input = `text-shadow: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('white-space:', () => {
  ;['normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line', 'break-spaces'].forEach(
    (value) => {
      test(value, () => {
        const input = `white-space: ${value}`
        TEST_OPTIONS_LIST.forEach((options) => {
          const result = parseDom2StaticStyle(input, options)
          expect(result).toMatchSnapshot(
            `${options.platform}(${options.target})`
          )
        })
      })
    }
  )
})

describe('view with font-size:', () => {
  ;['10px'].forEach((value) => {
    test(value, () => {
      const input = `font-size: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, {
          ...options,
          tagName: 'view',
        })
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})
