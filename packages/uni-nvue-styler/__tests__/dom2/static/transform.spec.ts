import { parseDom2StaticStyle } from '../../../src/dom2'
import { TEST_OPTIONS_LIST } from '../utils'

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
