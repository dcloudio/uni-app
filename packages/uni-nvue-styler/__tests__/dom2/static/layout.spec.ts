import { parseDom2StaticStyle } from '../../../src/dom2'
import { TEST_OPTIONS_LIST } from '../utils'

describe('position:', () => {
  ;['relative', 'absolute', 'fixed', 'sticky', 'static'].forEach((value) => {
    test(value, () => {
      const input = `position: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('top/right/bottom/left:', () => {
  const properties = ['top', 'right', 'bottom', 'left'] as const
  ;['10px', '50%', 'auto'].forEach((value) => {
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

describe('display:', () => {
  ;['none', 'flex'].forEach((value) => {
    test(value, () => {
      const input = `display: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('visibility:', () => {
  ;['visible', 'hidden'].forEach((value) => {
    test(value, () => {
      const input = `visibility: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('background-color:', () => {
  ;['red', '#00ff00', 'rgba(0,0,255,0.5)'].forEach((value) => {
    test(value, () => {
      const input = `background-color: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('background-image:', () => {
  ;['linear-gradient(to bottom,#f5f5f5,#eff2f5)'].forEach((value) => {
    test(value, () => {
      const input = `background-image: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('background-clip:', () => {
  ;['border-box', 'padding-box', 'content-box'].forEach((value) => {
    test(value, () => {
      const input = `background-clip: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})
