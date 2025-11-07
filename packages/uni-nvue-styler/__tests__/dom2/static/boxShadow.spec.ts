import { parseDom2StaticStyle } from '../../../src/dom2'
import { TEST_OPTIONS_LIST } from '../utils'

describe('box-shadow:', () => {
  ;[
    'none',
    '5px 5px red',
    '5px 5px 10px rgba(0,0,0,0.3)',
    'inset 0 0 5px #123456',
    'invalid',
  ].forEach((value) => {
    test(value, () => {
      const input = `box-shadow: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('box-sizing:', () => {
  ;['border-box', 'content-box'].forEach((value) => {
    test(value, () => {
      const input = `box-sizing: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('margin:', () => {
  const properties = [
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left',
  ] as const
  ;['10px', 'auto'].forEach((value) => {
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

describe('transform:', () => {
  ;[
    'translate(40px, 0px) rotate(30deg) scale(1.2)',
    'translateX(40px) translateY(20px) translateZ(10px) rotateX(45deg) rotateY(60deg) rotateZ(90deg)',
    'translate3d(40px, 20px, 10px) scale3d(1.2, 1.5, 1.0) rotate3d(1, 1, 1, 45deg)',
    'transform: skew(15deg, 30deg) skewX(20deg) skewY(25deg)',
    'matrix(1, 0.5, -0.5, 1, 10, 20)',
    'transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 10, 20, 0, 1)',
    'perspective(1000px)',
    'translate(40px, 0px) rotate(30deg) scale(1.2) skew(15deg, 0deg)',
    'translate(40px, 0px)',
    'translate3d(40px, 0px, 10px)',
    'scale(1.2)',
    'scale(1.2, 1.5)',
    'scale3d(1.2, 1.5, 1.0)',
    'rotate(30deg)',
    'rotateX(45deg)',
    'rotateY(60deg)',
    'rotateZ(90deg)',
    'rotate3d(1, 1, 1, 45deg)',
    'skew(15deg, 0deg)',
    'skew(15deg, 30deg)',
    'skewX(20deg)',
    'skewY(25deg)',
  ].forEach((value) => {
    test(value, () => {
      const input = `transform: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('transform-origin:', () => {
  ;[
    'left',
    'center',
    'right',
    'top',
    'bottom',
    'top left',
    '50% 50%',
    '20px 30px',
    'center center',
    'left top',
    'right bottom',
    '20px 50% 10px',
    '30%',
    'left center',
    '25% 75%',
    '10px 20px 5px',
    '30% 60% 15px',
    'left top 60px',
    'left top right',
    'bottom center 10%',
  ].forEach((value) => {
    test(value, () => {
      const input = `transform-origin: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('transition-delay:', () => {
  ;['0s', '0.5s', '200ms'].forEach((value) => {
    test(value, () => {
      const input = `transition-delay: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('transition-duration:', () => {
  ;['0.3s', '1s', '150ms'].forEach((value) => {
    test(value, () => {
      const input = `transition-duration: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('transition-property:', () => {
  ;[
    'all',
    'none',
    'width',
    'height',
    'margin',
    'margin-top',
    'margin-bottom',
    'margin-left',
    'margin-right',
    'left',
    'right',
    'top',
    'bottom',
    'padding',
    'padding-left',
    'padding-right',
    'padding-top',
    'padding-bottom',
    'opacity',
    'background-color',
    'border-color',
    'border-top-color',
    'border-bottom-color',
    'border-left-color',
    'border-right-color',
    'transform',
  ].forEach((value) => {
    test(value, () => {
      const input = `transition-property: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})

describe('transition-timing-function:', () => {
  ;[
    'ease',
    'ease-in',
    'ease-out',
    'ease-in-out',
    'linear',
    'cubic-bezier',
  ].forEach((value) => {
    test(value, () => {
      const input = `transition-timing-function: ${value}`
      TEST_OPTIONS_LIST.forEach((options) => {
        const result = parseDom2StaticStyle(input, options)
        expect(result).toMatchSnapshot(`${options.platform}(${options.target})`)
      })
    })
  })
})
