import { type Declaration, type Rule, parse } from 'postcss'
import { createTransformBackground } from '../src/expand/background'
import { createTransformBorder } from '../src/expand/border'
import { transformBorderColor } from '../src/expand/borderColor'
import { transformBorderRadius } from '../src/expand/borderRadius'
import { transformBorderStyle } from '../src/expand/borderStyle'
import { transformBorderWidth } from '../src/expand/borderWidth'
import {
  createTransformFlexFlow,
  transformFlexFlow,
} from '../src/expand/flexFlow'
import { transformFont } from '../src/expand/font'
import { createTransformBox } from '../src/expand/margin'
import {
  createTransformTransition,
  transformTransition,
} from '../src/expand/transition'
import { fillBorderPostion, postionTypes } from './test_utils'
import { createTransformFlex, transformFlex } from '../src/expand/flex'
export type { Declaration } from 'postcss'

function parseDecl(input: string) {
  return (parse(input).nodes[0] as Rule).nodes[0] as Declaration
}

const transformBackground = createTransformBackground({
  type: 'uvue',
})

describe('nvue-styler: expand', () => {
  test('transform transition', () => {
    const decl = parseDecl(`.test {
  transition: margin-top 500ms ease-in-out 1s
}`)
    expect(transformTransition(decl)).toEqual([
      {
        type: 'decl',
        prop: 'transition-property',
        value: 'margin-top',
        raws: decl.raws,
        source: decl.source,
      },
      {
        type: 'decl',
        prop: 'transition-duration',
        value: '500ms',
        raws: decl.raws,
        source: decl.source,
      },
      {
        type: 'decl',
        prop: 'transition-timing-function',
        value: 'ease-in-out',
        raws: decl.raws,
        source: decl.source,
      },
      {
        type: 'decl',
        prop: 'transition-delay',
        value: '1s',
        raws: decl.raws,
        source: decl.source,
      },
    ])
  })

  test('transform transition cubic-bezier', () => {
    const decl = parseDecl(`.test {
  transition: all 1s cubic-bezier(0.42, 0, 1.0, 3)
}`)
    expect(transformTransition(decl)).toEqual([
      {
        type: 'decl',
        prop: 'transition-property',
        value: 'all',
        raws: decl.raws,
        source: decl.source,
      },
      {
        type: 'decl',
        prop: 'transition-duration',
        value: '1s',
        raws: decl.raws,
        source: decl.source,
      },
      {
        type: 'decl',
        prop: 'transition-timing-function',
        value: 'cubic-bezier(0.42, 0, 1.0, 3)',
        raws: decl.raws,
        source: decl.source,
      },
    ])
  })

  test('transform transition all/none', () => {
    const propertyVal = ['all', 'none', 'width,height', 'all,width,height']
    propertyVal.forEach((property) => {
      const decl = parseDecl(`.test {
  transition: ${property} 500ms ease-in-out 1s
}
`)
      expect(transformTransition(decl)).toEqual([
        {
          type: 'decl',
          prop: 'transition-property',
          value: property,
          raws: decl.raws,
          source: decl.source,
        },
        {
          type: 'decl',
          prop: 'transition-duration',
          value: '500ms',
          raws: decl.raws,
          source: decl.source,
        },
        {
          type: 'decl',
          prop: 'transition-timing-function',
          value: 'ease-in-out',
          raws: decl.raws,
          source: decl.source,
        },
        {
          type: 'decl',
          prop: 'transition-delay',
          value: '1s',
          raws: decl.raws,
          source: decl.source,
        },
      ])
    })
  })
  test('transform margin/padding', function () {
    const types = ['margin', 'padding'] as const
    types.forEach((type) => {
      const transform = createTransformBox(type)
      const boxs: Record<string, Record<string, string>[]> = {
        '1px': [
          {
            type: 'decl',
            prop: `${type}-top`,
            value: '1px',
          },
          {
            type: 'decl',
            prop: `${type}-right`,
            value: '1px',
          },
          {
            type: 'decl',
            prop: `${type}-bottom`,
            value: '1px',
          },
          {
            type: 'decl',
            prop: `${type}-left`,
            value: '1px',
          },
        ],
        '21px 22px': [
          {
            type: 'decl',
            prop: `${type}-top`,
            value: '21px',
          },
          {
            type: 'decl',
            prop: `${type}-right`,
            value: '22px',
          },
          {
            type: 'decl',
            prop: `${type}-bottom`,
            value: '21px',
          },
          {
            type: 'decl',
            prop: `${type}-left`,
            value: '22px',
          },
        ],
        '31px 32px 33px': [
          {
            type: 'decl',
            prop: `${type}-top`,
            value: '31px',
          },
          {
            type: 'decl',
            prop: `${type}-right`,
            value: '32px',
          },
          {
            type: 'decl',
            prop: `${type}-bottom`,
            value: '33px',
          },
          {
            type: 'decl',
            prop: `${type}-left`,
            value: '32px',
          },
        ],
        '41px 42px 43px 44px': [
          {
            type: 'decl',
            prop: `${type}-top`,
            value: '41px',
          },
          {
            type: 'decl',
            prop: `${type}-right`,
            value: '42px',
          },
          {
            type: 'decl',
            prop: `${type}-bottom`,
            value: '43px',
          },
          {
            type: 'decl',
            prop: `${type}-left`,
            value: '44px',
          },
        ],
      }
      Object.keys(boxs).forEach((m) => {
        const decl = parseDecl(`.test {
    margin: ${m}
  }`)
        expect(transform(decl)).toEqual(
          boxs[m].map((node) => {
            return Object.assign({ raws: decl.raws, source: decl.source }, node)
          })
        )
      })
    })
  })
  test('transform border simple', function () {
    // simple
    expect(
      createTransformBorder({ type: 'uvue' })(
        parseDecl(`
.test{
  border:1px solid red;
}`)
      )
    ).toEqual([
      {
        prop: 'border-top-width',
        raws: expect.any(Object),
        source: expect.any(Object),
        type: 'decl',
        value: '1px',
      },
      {
        prop: 'border-right-width',
        raws: expect.any(Object),
        source: expect.any(Object),
        type: 'decl',
        value: '1px',
      },
      {
        prop: 'border-bottom-width',
        raws: expect.any(Object),
        source: expect.any(Object),
        type: 'decl',
        value: '1px',
      },
      {
        prop: 'border-left-width',
        raws: expect.any(Object),
        source: expect.any(Object),
        type: 'decl',
        value: '1px',
      },
      {
        prop: 'border-top-style',
        raws: expect.any(Object),
        source: expect.any(Object),
        type: 'decl',
        value: 'solid',
      },
      {
        prop: 'border-right-style',
        raws: expect.any(Object),
        source: expect.any(Object),
        type: 'decl',
        value: 'solid',
      },
      {
        prop: 'border-bottom-style',
        raws: expect.any(Object),
        source: expect.any(Object),
        type: 'decl',
        value: 'solid',
      },
      {
        prop: 'border-left-style',
        raws: expect.any(Object),
        source: expect.any(Object),
        type: 'decl',
        value: 'solid',
      },
      {
        prop: 'border-top-color',
        raws: expect.any(Object),
        source: expect.any(Object),
        type: 'decl',
        value: 'red',
      },
      {
        prop: 'border-right-color',
        raws: expect.any(Object),
        source: expect.any(Object),
        type: 'decl',
        value: 'red',
      },
      {
        prop: 'border-bottom-color',
        raws: expect.any(Object),
        source: expect.any(Object),
        type: 'decl',
        value: 'red',
      },
      {
        prop: 'border-left-color',
        raws: expect.any(Object),
        source: expect.any(Object),
        type: 'decl',
        value: 'red',
      },
    ])
  })
  test('transform border', function () {
    const createBorders = (
      border: string
    ): Record<string, Record<string, string>[]> => {
      return {
        '1px': [
          {
            type: 'decl',
            prop: `${border}-width`,
            value: '1px',
          },
          {
            type: 'decl',
            prop: `${border}-style`,
            value: 'none',
          },
          {
            type: 'decl',
            prop: `${border}-color`,
            value: '#000000',
          },
        ],
        '#ffffff': [
          {
            type: 'decl',
            prop: `${border}-width`,
            value: 'medium',
          },
          {
            type: 'decl',
            prop: `${border}-style`,
            value: 'none',
          },
          {
            type: 'decl',
            prop: `${border}-color`,
            value: '#ffffff',
          },
        ],
        thick: [
          {
            type: 'decl',
            prop: `${border}-width`,
            value: 'thick',
          },
          {
            type: 'decl',
            prop: `${border}-style`,
            value: 'none',
          },
          {
            type: 'decl',
            prop: `${border}-color`,
            value: '#000000',
          },
        ],
        '2px dashed': [
          {
            type: 'decl',
            prop: `${border}-width`,
            value: '2px',
          },
          {
            type: 'decl',
            prop: `${border}-style`,
            value: 'dashed',
          },
          {
            type: 'decl',
            prop: `${border}-color`,
            value: '#000000',
          },
        ],
        '3px dotted #ffffff': [
          {
            type: 'decl',
            prop: `${border}-width`,
            value: '3px',
          },
          {
            type: 'decl',
            prop: `${border}-style`,
            value: 'dotted',
          },
          {
            type: 'decl',
            prop: `${border}-color`,
            value: '#ffffff',
          },
        ],
        '14px double #8e44ad': [
          {
            type: 'decl',
            prop: `${border}-width`,
            value: '14px',
          },
          {
            type: 'decl',
            prop: `${border}-style`,
            value: 'double',
          },
          {
            type: 'decl',
            prop: `${border}-color`,
            value: '#8e44ad',
          },
        ],
      }
    }
    postionTypes.forEach((type) => {
      const borders = createBorders(type)
      Object.keys(borders).forEach((b) => {
        const decl = parseDecl(`.test {
      ${type}: ${b}
    }`)

        const transformBorder = createTransformBorder({
          type: 'uvue',
        })
        expect(transformBorder(decl)).toEqual(
          borders[b].map((node) => {
            const val = Object.assign(
              { raws: decl.raws, source: decl.source },
              node
            )
            return val
          })
        )
      })
    })
  })
  test('transform border-left', () => {
    expect(
      createTransformBorder({ type: 'uvue' })(
        parseDecl(`
.test{
  border-left:1px solid red;
}`)
      )
    ).toEqual([
      {
        prop: 'border-left-width',
        raws: expect.any(Object),
        source: expect.any(Object),
        type: 'decl',
        value: '1px',
      },
      {
        prop: 'border-left-style',
        raws: expect.any(Object),
        source: expect.any(Object),
        type: 'decl',
        value: 'solid',
      },
      {
        prop: 'border-left-color',
        raws: expect.any(Object),
        source: expect.any(Object),
        type: 'decl',
        value: 'red',
      },
    ])
  })
  test(`transform border-style`, () => {
    const borderStyles: Record<string, Record<string, string>[]> = {
      dotted: fillBorderPostion([
        {
          type: 'decl',
          prop: 'border-style',
          value: 'dotted',
        },
      ]),
      'dotted solid': [
        {
          type: 'decl',
          prop: 'border-top-style',
          value: 'dotted',
        },
        {
          type: 'decl',
          prop: 'border-right-style',
          value: 'solid',
        },
        {
          type: 'decl',
          prop: 'border-bottom-style',
          value: 'dotted',
        },
        {
          type: 'decl',
          prop: 'border-left-style',
          value: 'solid',
        },
      ],
      'dotted solid double': [
        {
          type: 'decl',
          prop: 'border-top-style',
          value: 'dotted',
        },
        {
          type: 'decl',
          prop: 'border-right-style',
          value: 'solid',
        },
        {
          type: 'decl',
          prop: 'border-bottom-style',
          value: 'double',
        },
        {
          type: 'decl',
          prop: 'border-left-style',
          value: 'solid',
        },
      ],
      'dotted solid double dashed': [
        {
          type: 'decl',
          prop: 'border-top-style',
          value: 'dotted',
        },
        {
          type: 'decl',
          prop: 'border-right-style',
          value: 'solid',
        },
        {
          type: 'decl',
          prop: 'border-bottom-style',
          value: 'double',
        },
        {
          type: 'decl',
          prop: 'border-left-style',
          value: 'dashed',
        },
      ],
    }
    Object.keys(borderStyles).forEach((value) => {
      const decl = parseDecl(`.test {
  border-style: ${value}
}`)

      expect(transformBorderStyle(decl)).toEqual(
        borderStyles[value].map((node) => {
          return Object.assign({ raws: decl.raws, source: decl.source }, node)
        })
      )
    })
  })
  test(`transform border-width`, () => {
    const borderWidths: Record<string, Record<string, string>[]> = {
      '1px': fillBorderPostion([
        {
          type: 'decl',
          prop: 'border-width',
          value: '1px',
        },
      ]),
      '21px 22px': [
        {
          type: 'decl',
          prop: 'border-top-width',
          value: '21px',
        },
        {
          type: 'decl',
          prop: 'border-right-width',
          value: '22px',
        },
        {
          type: 'decl',
          prop: 'border-bottom-width',
          value: '21px',
        },
        {
          type: 'decl',
          prop: 'border-left-width',
          value: '22px',
        },
      ],
      '31px 32px 33px': [
        {
          type: 'decl',
          prop: 'border-top-width',
          value: '31px',
        },
        {
          type: 'decl',
          prop: 'border-right-width',
          value: '32px',
        },
        {
          type: 'decl',
          prop: 'border-bottom-width',
          value: '33px',
        },
        {
          type: 'decl',
          prop: 'border-left-width',
          value: '32px',
        },
      ],
      '41px 42px 43px 44px': [
        {
          type: 'decl',
          prop: 'border-top-width',
          value: '41px',
        },
        {
          type: 'decl',
          prop: 'border-right-width',
          value: '42px',
        },
        {
          type: 'decl',
          prop: 'border-bottom-width',
          value: '43px',
        },
        {
          type: 'decl',
          prop: 'border-left-width',
          value: '44px',
        },
      ],
    }
    Object.keys(borderWidths).forEach((value) => {
      const decl = parseDecl(`.test {
  border-width: ${value}
}`)

      expect(transformBorderWidth(decl)).toEqual(
        borderWidths[value].map((node) => {
          return Object.assign({ raws: decl.raws, source: decl.source }, node)
        })
      )
    })
  })
  test(`transform border-color`, () => {
    const borderColors: Record<string, Record<string, string>[]> = {
      red: fillBorderPostion([
        {
          type: 'decl',
          prop: 'border-color',
          value: 'red',
        },
      ]),
      'red green': [
        {
          type: 'decl',
          prop: 'border-top-color',
          value: 'red',
        },
        {
          type: 'decl',
          prop: 'border-right-color',
          value: 'green',
        },
        {
          type: 'decl',
          prop: 'border-bottom-color',
          value: 'red',
        },
        {
          type: 'decl',
          prop: 'border-left-color',
          value: 'green',
        },
      ],
      'red green blue': [
        {
          type: 'decl',
          prop: 'border-top-color',
          value: 'red',
        },
        {
          type: 'decl',
          prop: 'border-right-color',
          value: 'green',
        },
        {
          type: 'decl',
          prop: 'border-bottom-color',
          value: 'blue',
        },
        {
          type: 'decl',
          prop: 'border-left-color',
          value: 'green',
        },
      ],
      'red green blue pink': [
        {
          type: 'decl',
          prop: 'border-top-color',
          value: 'red',
        },
        {
          type: 'decl',
          prop: 'border-right-color',
          value: 'green',
        },
        {
          type: 'decl',
          prop: 'border-bottom-color',
          value: 'blue',
        },
        {
          type: 'decl',
          prop: 'border-left-color',
          value: 'pink',
        },
      ],
    }
    Object.keys(borderColors).forEach((value) => {
      const decl = parseDecl(`.test {
  border-color: ${value}
}`)

      expect(transformBorderColor(decl)).toEqual(
        borderColors[value].map((node) => {
          return Object.assign({ raws: decl.raws, source: decl.source }, node)
        })
      )
    })
  })
  test(`transform border-radius`, () => {
    const borderRadius: Record<string, Record<string, string>[]> = {
      '1px': [
        {
          type: 'decl',
          prop: 'border-top-left-radius',
          value: '1px',
        },
        {
          type: 'decl',
          prop: 'border-top-right-radius',
          value: '1px',
        },
        {
          type: 'decl',
          prop: 'border-bottom-right-radius',
          value: '1px',
        },
        {
          type: 'decl',
          prop: 'border-bottom-left-radius',
          value: '1px',
        },
      ],
      '21px 22px': [
        {
          type: 'decl',
          prop: 'border-top-left-radius',
          value: '21px',
        },
        {
          type: 'decl',
          prop: 'border-top-right-radius',
          value: '22px',
        },
        {
          type: 'decl',
          prop: 'border-bottom-right-radius',
          value: '21px',
        },
        {
          type: 'decl',
          prop: 'border-bottom-left-radius',
          value: '22px',
        },
      ],
      '31px 32px 33px': [
        {
          type: 'decl',
          prop: 'border-top-left-radius',
          value: '31px',
        },
        {
          type: 'decl',
          prop: 'border-top-right-radius',
          value: '32px',
        },
        {
          type: 'decl',
          prop: 'border-bottom-right-radius',
          value: '33px',
        },
        {
          type: 'decl',
          prop: 'border-bottom-left-radius',
          value: '32px',
        },
      ],
      '41px 42px 43px 44px': [
        {
          type: 'decl',
          prop: 'border-top-left-radius',
          value: '41px',
        },
        {
          type: 'decl',
          prop: 'border-top-right-radius',
          value: '42px',
        },
        {
          type: 'decl',
          prop: 'border-bottom-right-radius',
          value: '43px',
        },
        {
          type: 'decl',
          prop: 'border-bottom-left-radius',
          value: '44px',
        },
      ],
    }
    Object.keys(borderRadius).forEach((value) => {
      const decl = parseDecl(`.test {
  border-radius: ${value}
}`)

      expect(transformBorderRadius(decl)).toEqual(
        borderRadius[value].map((node) => {
          return Object.assign({ raws: decl.raws, source: decl.source }, node)
        })
      )
    })
  })
  test('transform flex-flow', () => {
    const decl = parseDecl(`.test {
  flex-flow: row-reverse wrap
}`)
    expect(transformFlexFlow(decl)).toEqual([
      {
        type: 'decl',
        prop: 'flex-direction',
        value: 'row-reverse',
        raws: decl.raws,
        source: decl.source,
      },
      {
        type: 'decl',
        prop: 'flex-wrap',
        value: 'wrap',
        raws: decl.raws,
        source: decl.source,
      },
    ])
  })
  test('transform font', () => {
    const fonts: Record<string, Record<string, string>[]> = {
      '1.2em "Fira Sans", sans-serif': [
        {
          type: 'decl',
          prop: 'font-style',
          value: 'normal',
        },
        {
          type: 'decl',
          prop: 'font-weight',
          value: 'normal',
        },
        {
          type: 'decl',
          prop: 'font-size',
          value: '1.2em',
        },
        {
          type: 'decl',
          prop: 'line-height',
          value: 'normal',
        },
        {
          type: 'decl',
          prop: 'font-family',
          value: '"Fira Sans", sans-serif',
        },
      ],
      'italic 1.2em "Fira Sans", serif': [
        {
          type: 'decl',
          prop: 'font-style',
          value: 'italic',
        },
        {
          type: 'decl',
          prop: 'font-weight',
          value: 'normal',
        },
        {
          type: 'decl',
          prop: 'font-size',
          value: '1.2em',
        },
        {
          type: 'decl',
          prop: 'line-height',
          value: 'normal',
        },
        {
          type: 'decl',
          prop: 'font-family',
          value: '"Fira Sans", serif',
        },
      ],
      'italic small-caps bold 16px/2 cursive;': [
        {
          type: 'decl',
          prop: 'font-style',
          value: 'italic',
        },
        {
          type: 'decl',
          prop: 'font-weight',
          value: 'bold',
        },
        {
          type: 'decl',
          prop: 'font-size',
          value: '16px',
        },
        {
          type: 'decl',
          prop: 'line-height',
          value: '2',
        },
        {
          type: 'decl',
          prop: 'font-family',
          value: 'cursive',
        },
      ],
    }
    Object.keys(fonts).forEach((value) => {
      const decl = parseDecl(`.test {
  font: ${value}
}`)
      expect(transformFont(decl)).toEqual(
        fonts[value].map((node) => {
          return Object.assign({ raws: decl.raws, source: decl.source }, node)
        })
      )
    })
  })
  test('transform background', () => {
    const backgrounds: Record<string, Record<string, string>[]> = {
      '#000000': [
        {
          type: 'decl',
          prop: 'background-image',
          value: 'none',
        },
        {
          type: 'decl',
          prop: 'background-color',
          value: '#000000',
        },
      ],
      'rgb(255,255,255)': [
        {
          type: 'decl',
          prop: 'background-image',
          value: 'none',
        },
        {
          type: 'decl',
          prop: 'background-color',
          value: 'rgb(255,255,255)',
        },
      ],
      'linear-gradient(#e66465, #9198e5);': [
        {
          type: 'decl',
          prop: 'background-image',
          value: 'linear-gradient(#e66465, #9198e5)',
        },
        {
          type: 'decl',
          prop: 'background-color',
          value: 'transparent',
        },
      ],
      none: [
        {
          type: 'decl',
          prop: 'background-image',
          value: 'none',
        },
        {
          type: 'decl',
          prop: 'background-color',
          value: 'transparent',
        },
      ],
    }
    Object.keys(backgrounds).forEach((value) => {
      const decl = parseDecl(`.test {
  background: ${value}
}`)
      expect(transformBackground(decl)).toEqual(
        backgrounds[value].map((node) => {
          return Object.assign({ raws: decl.raws, source: decl.source }, node)
        })
      )
    })
  })
  test('transform flex', () => {
    const cases: Record<string, Record<string, string>[]> = {
      none: [
        { type: 'decl', prop: 'flex-grow', value: '0' },
        { type: 'decl', prop: 'flex-shrink', value: '0' },
        { type: 'decl', prop: 'flex-basis', value: 'auto' },
      ],
      auto: [
        { type: 'decl', prop: 'flex-grow', value: '1' },
        { type: 'decl', prop: 'flex-shrink', value: '1' },
        { type: 'decl', prop: 'flex-basis', value: 'auto' },
      ],
      // check
      initial: [
        { type: 'decl', prop: 'flex-grow', value: '0' },
        { type: 'decl', prop: 'flex-shrink', value: '1' },
        { type: 'decl', prop: 'flex-basis', value: 'auto' },
      ],
      '1': [
        { type: 'decl', prop: 'flex-grow', value: '1' },
        { type: 'decl', prop: 'flex-shrink', value: '1' },
        { type: 'decl', prop: 'flex-basis', value: '0%' },
      ],
      '2': [
        { type: 'decl', prop: 'flex-grow', value: '2' },
        { type: 'decl', prop: 'flex-shrink', value: '1' },
        { type: 'decl', prop: 'flex-basis', value: '0%' },
      ],
      '100px': [
        { type: 'decl', prop: 'flex-grow', value: '1' },
        { type: 'decl', prop: 'flex-shrink', value: '1' },
        { type: 'decl', prop: 'flex-basis', value: '100px' },
      ],
      'min-content': [
        { type: 'decl', prop: 'flex-grow', value: '1' },
        { type: 'decl', prop: 'flex-shrink', value: '1' },
        { type: 'decl', prop: 'flex-basis', value: 'min-content' },
      ],
      '1 3': [
        { type: 'decl', prop: 'flex-grow', value: '1' },
        { type: 'decl', prop: 'flex-shrink', value: '3' },
        { type: 'decl', prop: 'flex-basis', value: '0%' },
      ],
      '1 101px': [
        { type: 'decl', prop: 'flex-grow', value: '1' },
        { type: 'decl', prop: 'flex-shrink', value: '1' },
        { type: 'decl', prop: 'flex-basis', value: '101px' },
      ],
      '1 2 30%': [
        { type: 'decl', prop: 'flex-grow', value: '1' },
        { type: 'decl', prop: 'flex-shrink', value: '2' },
        { type: 'decl', prop: 'flex-basis', value: '30%' },
      ],
      '1 2 auto': [
        { type: 'decl', prop: 'flex-grow', value: '1' },
        { type: 'decl', prop: 'flex-shrink', value: '2' },
        { type: 'decl', prop: 'flex-basis', value: 'auto' },
      ],
    }
    Object.keys(cases).forEach((value) => {
      const decl = parseDecl(`.test {\n  flex: ${value}\n}`)
      const res = transformFlex(decl)
      expect(res).toEqual(
        cases[value].map((node) => {
          return Object.assign({ raws: decl.raws, source: decl.source }, node)
        })
      )
    })
  })

  // transform margin cssvar
  test('transform margin cssvar2', () => {
    const transform = createTransformBox('margin')

    const opt = {
      value: 'var(--marginVal, 6px)',
      important: false,
      raws: {
        before: '',
      },
    } as any

    const res = transform(opt).map((i) => ({
      prop: i.prop,
      value: i.value,
    }))

    expect(res).toEqual([
      {
        prop: 'margin-top',
        value: 'var(--marginVal, 6px)',
      },
      {
        prop: 'margin-right',
        value: 'var(--marginVal, 6px)',
      },
      {
        prop: 'margin-bottom',
        value: 'var(--marginVal, 6px)',
      },
      {
        prop: 'margin-left',
        value: 'var(--marginVal, 6px)',
      },
    ])
  })

  test('transform margin with var', () => {
    const transform = createTransformBox('margin')
    const decl = parseDecl(`.test { margin: 5px var(--aa, 5px) }`)
    const result = transform(decl)
    expect(result[0].value).toBe('5px')
    expect(result[1].value).toBe('var(--aa, 5px)')
    expect(result[2].value).toBe('5px')
    expect(result[3].value).toBe('var(--aa, 5px)')
  })

  test('transform border with var', () => {
    const transform = createTransformBorder({ type: 'uvue' })
    const decl = parseDecl(`.test { border: 1px solid var(--color, red) }`)
    const result = transform(decl)
    expect(result.length).toBe(12)
    const topColor = result.find((d) => d.prop === 'border-top-color')
    expect(topColor?.value).toBe('var(--color, red)')
  })

  test('transform border with single var in dom2', () => {
    const prevRunTime = (globalThis as any).__RUN_TIME__
    const prevHyphenate = (globalThis as any).__HYPHENATE__

    ;(globalThis as any).__RUN_TIME__ = true
    ;(globalThis as any).__HYPHENATE__ = true

    try {
      const transform = createTransformBorder({ type: 'uvue', dom2: true })
      const decl = parseDecl(`.test { border: var(--composite-border) }`)
      expect(transform(decl)).toEqual([
        {
          type: 'decl',
          prop: 'border-top-width',
          value: 'var(--composite-border)',
          raws: decl.raws,
          source: decl.source,
        },
        {
          type: 'decl',
          prop: 'border-right-width',
          value: 'var(--composite-border)',
          raws: decl.raws,
          source: decl.source,
        },
        {
          type: 'decl',
          prop: 'border-bottom-width',
          value: 'var(--composite-border)',
          raws: decl.raws,
          source: decl.source,
        },
        {
          type: 'decl',
          prop: 'border-left-width',
          value: 'var(--composite-border)',
          raws: decl.raws,
          source: decl.source,
        },
        {
          type: 'decl',
          prop: 'border-top-style',
          value: 'var(--composite-border)',
          raws: decl.raws,
          source: decl.source,
        },
        {
          type: 'decl',
          prop: 'border-right-style',
          value: 'var(--composite-border)',
          raws: decl.raws,
          source: decl.source,
        },
        {
          type: 'decl',
          prop: 'border-bottom-style',
          value: 'var(--composite-border)',
          raws: decl.raws,
          source: decl.source,
        },
        {
          type: 'decl',
          prop: 'border-left-style',
          value: 'var(--composite-border)',
          raws: decl.raws,
          source: decl.source,
        },
        {
          type: 'decl',
          prop: 'border-top-color',
          value: 'var(--composite-border)',
          raws: decl.raws,
          source: decl.source,
        },
        {
          type: 'decl',
          prop: 'border-right-color',
          value: 'var(--composite-border)',
          raws: decl.raws,
          source: decl.source,
        },
        {
          type: 'decl',
          prop: 'border-bottom-color',
          value: 'var(--composite-border)',
          raws: decl.raws,
          source: decl.source,
        },
        {
          type: 'decl',
          prop: 'border-left-color',
          value: 'var(--composite-border)',
          raws: decl.raws,
          source: decl.source,
        },
      ])
    } finally {
      ;(globalThis as any).__RUN_TIME__ = prevRunTime
      ;(globalThis as any).__HYPHENATE__ = prevHyphenate
    }
  })

  test('transform border-left with single var fallback in dom2', () => {
    const prevRunTime = (globalThis as any).__RUN_TIME__
    const prevHyphenate = (globalThis as any).__HYPHENATE__

    ;(globalThis as any).__RUN_TIME__ = true
    ;(globalThis as any).__HYPHENATE__ = true

    try {
      const transform = createTransformBorder({ type: 'uvue', dom2: true })
      const decl = parseDecl(
        `.test { border-left: var(--composite-border, 1px solid red) }`
      )
      expect(transform(decl)).toEqual([
        {
          type: 'decl',
          prop: 'border-left-width',
          value: 'var(--composite-border, 1px solid red)',
          raws: decl.raws,
          source: decl.source,
        },
        {
          type: 'decl',
          prop: 'border-left-style',
          value: 'var(--composite-border, 1px solid red)',
          raws: decl.raws,
          source: decl.source,
        },
        {
          type: 'decl',
          prop: 'border-left-color',
          value: 'var(--composite-border, 1px solid red)',
          raws: decl.raws,
          source: decl.source,
        },
      ])
    } finally {
      ;(globalThis as any).__RUN_TIME__ = prevRunTime
      ;(globalThis as any).__HYPHENATE__ = prevHyphenate
    }
  })

  test('transform margin with calc', () => {
    const transform = createTransformBox('margin')
    const decl = parseDecl(`.test { margin: calc(10px + 2px) 5px }`)
    const result = transform(decl)
    expect(result[0].value).toBe('calc(10px + 2px)')
    expect(result[1].value).toBe('5px')
  })

  test('transform border-color with var', () => {
    const decl = parseDecl(`.test { border-color: red var(--color, blue) }`)
    const result = transformBorderColor(decl)
    expect(result.length).toBe(4)
    expect(result[1].value).toBe('var(--color, blue)')
  })

  test('transform border-radius with var', () => {
    const decl = parseDecl(`.test { border-radius: 10px var(--radius, 20px) }`)
    const result = transformBorderRadius(decl)
    expect(result.length).toBe(4)
    expect(result[1].value).toBe('var(--radius, 20px)')
  })

  test('transform border-color with var spaces', () => {
    const decl = parseDecl(`.test { border-color: red var(--color,   blue) }`)
    const result = transformBorderColor(decl)
    expect(result.length).toBe(4)
    expect(result[1].value).toBe('var(--color, blue)')
  })

  test('transform margin with calc spaces', () => {
    const decl = parseDecl(`.test { margin: calc(10px  +  2px) 5px }`)
    const transform = createTransformBox('margin')
    const result = transform(decl)
    expect(result[0].value).toBe('calc(10px + 2px)')
    expect(result[1].value).toBe('5px')
  })

  test('transform flex with single var in dom2', () => {
    const prevRunTime = (globalThis as any).__RUN_TIME__
    const prevHyphenate = (globalThis as any).__HYPHENATE__

    ;(globalThis as any).__RUN_TIME__ = true
    ;(globalThis as any).__HYPHENATE__ = true

    try {
      const decl = parseDecl(`.test { flex: var(--composite-flex) }`)
      expect(createTransformFlex(true)(decl)).toEqual([
        {
          type: 'decl',
          prop: 'flex-grow',
          value: 'var(--composite-flex)',
          raws: decl.raws,
          source: decl.source,
        },
        {
          type: 'decl',
          prop: 'flex-shrink',
          value: 'var(--composite-flex)',
          raws: decl.raws,
          source: decl.source,
        },
        {
          type: 'decl',
          prop: 'flex-basis',
          value: 'var(--composite-flex)',
          raws: decl.raws,
          source: decl.source,
        },
      ])
    } finally {
      ;(globalThis as any).__RUN_TIME__ = prevRunTime
      ;(globalThis as any).__HYPHENATE__ = prevHyphenate
    }
  })

  test('transform flex-flow with single var in dom2', () => {
    const prevRunTime = (globalThis as any).__RUN_TIME__
    const prevHyphenate = (globalThis as any).__HYPHENATE__

    ;(globalThis as any).__RUN_TIME__ = true
    ;(globalThis as any).__HYPHENATE__ = true

    try {
      const decl = parseDecl(`.test { flex-flow: var(--composite-flow) }`)
      expect(createTransformFlexFlow(true)(decl)).toEqual([
        {
          type: 'decl',
          prop: 'flex-direction',
          value: 'var(--composite-flow)',
          raws: decl.raws,
          source: decl.source,
        },
        {
          type: 'decl',
          prop: 'flex-wrap',
          value: 'var(--composite-flow)',
          raws: decl.raws,
          source: decl.source,
        },
      ])
    } finally {
      ;(globalThis as any).__RUN_TIME__ = prevRunTime
      ;(globalThis as any).__HYPHENATE__ = prevHyphenate
    }
  })

  test('transform flex-flow with single var fallback in dom2', () => {
    const prevRunTime = (globalThis as any).__RUN_TIME__
    const prevHyphenate = (globalThis as any).__HYPHENATE__

    ;(globalThis as any).__RUN_TIME__ = true
    ;(globalThis as any).__HYPHENATE__ = true

    try {
      const decl = parseDecl(
        `.test { flex-flow: var(--composite-flow, row wrap) }`
      )
      expect(createTransformFlexFlow(true)(decl)).toEqual([
        {
          type: 'decl',
          prop: 'flex-direction',
          value: 'var(--composite-flow, row wrap)',
          raws: decl.raws,
          source: decl.source,
        },
        {
          type: 'decl',
          prop: 'flex-wrap',
          value: 'var(--composite-flow, row wrap)',
          raws: decl.raws,
          source: decl.source,
        },
      ])
    } finally {
      ;(globalThis as any).__RUN_TIME__ = prevRunTime
      ;(globalThis as any).__HYPHENATE__ = prevHyphenate
    }
  })

  test('transform border-color with rgba and spaces', () => {
    const decl = parseDecl(
      `.test { border-color: rgba(0, 0, 0, 0.5) rgba(255, 255, 255, 1) }`
    )
    const result = transformBorderColor(decl)
    expect(result.length).toBe(4)
    // Preservation of spaces inside parentheses (normalized)
    expect(result[0].value).toBe('rgba(0, 0, 0, 0.5)')
    expect(result[1].value).toBe('rgba(255, 255, 255, 1)')
  })

  test.each([
    {
      name: 'background',
      transform: createTransformBackground({ type: 'uvue', dom2: true }),
      value: 'var(--background, #ffffff)',
      properties: ['background-image', 'background-color'],
    },
    {
      name: 'transition',
      transform: createTransformTransition(true),
      value: 'var(--transition, opacity 1s ease)',
      properties: [
        'transition-property',
        'transition-duration',
        'transition-timing-function',
        'transition-delay',
      ],
    },
    {
      name: 'background',
      transform: createTransformBackground({ type: 'uvue', dom2: true }),
      value: 'var(--image) var(--color)',
      properties: ['background-image', 'background-color'],
    },
    {
      name: 'flex',
      transform: createTransformFlex(true),
      value: '1 var(--value)',
      properties: ['flex-grow', 'flex-shrink', 'flex-basis'],
    },
    {
      name: 'flex-flow',
      transform: createTransformFlexFlow(true),
      value: 'var(--direction) var(--wrap)',
      properties: ['flex-direction', 'flex-wrap'],
    },
  ])('transform ambiguous $name var shorthand in dom2', (testCase) => {
    const decl = parseDecl(
      `.test { ${testCase.name}: ${testCase.value} !important }`
    )

    expect(testCase.transform(decl)).toEqual(
      testCase.properties.map((prop) => ({
        type: 'decl',
        prop,
        value: testCase.value,
        important: true,
        raws: decl.raws,
        source: decl.source,
      }))
    )
  })

  test('transform flex-flow with mixed var in dom2', () => {
    const decl = parseDecl(
      `.test { flex-flow: var(--direction, row) wrap !important }`
    )

    expect(createTransformFlexFlow(true)(decl)).toEqual([
      {
        type: 'decl',
        prop: 'flex-direction',
        value: 'var(--direction, row)',
        important: true,
        raws: decl.raws,
        source: decl.source,
      },
      {
        type: 'decl',
        prop: 'flex-wrap',
        value: 'wrap',
        important: true,
        raws: decl.raws,
        source: decl.source,
      },
    ])
  })

  test.each([
    {
      name: 'background',
      transform: createTransformBackground({ type: 'uvue', dom2: true }),
      value: 'linear-gradient(red, blue) var(--color, red)',
      expected: [
        ['background-image', 'linear-gradient(red, blue)'],
        ['background-color', 'var(--color, red)'],
      ],
    },
    {
      name: 'background',
      transform: createTransformBackground({ type: 'uvue', dom2: true }),
      value: 'red var(--image, none)',
      expected: [
        ['background-image', 'var(--image, none)'],
        ['background-color', 'red'],
      ],
    },
    {
      name: 'border',
      transform: createTransformBorder({ type: 'uvue', dom2: true }),
      value: '1px solid var(--color, red)',
      expected: [
        ['border-top-width', '1px'],
        ['border-right-width', '1px'],
        ['border-bottom-width', '1px'],
        ['border-left-width', '1px'],
        ['border-top-style', 'solid'],
        ['border-right-style', 'solid'],
        ['border-bottom-style', 'solid'],
        ['border-left-style', 'solid'],
        ['border-top-color', 'var(--color, red)'],
        ['border-right-color', 'var(--color, red)'],
        ['border-bottom-color', 'var(--color, red)'],
        ['border-left-color', 'var(--color, red)'],
      ],
    },
    {
      name: 'flex',
      transform: createTransformFlex(true),
      value: 'var(--grow, 1) 1 20px',
      expected: [
        ['flex-grow', 'var(--grow, 1)'],
        ['flex-shrink', '1'],
        ['flex-basis', '20px'],
      ],
    },
    {
      name: 'transition',
      transform: createTransformTransition(true),
      value: 'opacity var(--duration, 1s) ease',
      expected: [
        'transition-property',
        'transition-duration',
        'transition-timing-function',
        'transition-delay',
      ].map((prop) => [prop, 'opacity var(--duration, 1s) ease']),
    },
    {
      name: 'transition',
      transform: createTransformTransition(true),
      value: 'opacity 1s cubic-bezier(var(--x, 0.42), 0, 1, 1)',
      expected: [
        ['transition-property', 'opacity'],
        ['transition-duration', '1s'],
        ['transition-timing-function', 'cubic-bezier(var(--x, 0.42), 0, 1, 1)'],
      ],
    },
  ])('transform $name with mixed var in dom2', (testCase) => {
    const decl = parseDecl(
      `.test { ${testCase.name}: ${testCase.value} !important }`
    )

    expect(testCase.transform(decl)).toEqual(
      testCase.expected.map(([prop, value]) => ({
        type: 'decl',
        prop,
        value,
        important: true,
        raws: decl.raws,
        source: decl.source,
      }))
    )
  })

  test.each([
    {
      property: 'border',
      value: 'calc(1px + 1px) solid red',
      expected: [
        ...['top', 'right', 'bottom', 'left'].map((position) => [
          `border-${position}-width`,
          'calc(1px + 1px)',
        ]),
        ...['top', 'right', 'bottom', 'left'].map((position) => [
          `border-${position}-style`,
          'solid',
        ]),
        ...['top', 'right', 'bottom', 'left'].map((position) => [
          `border-${position}-color`,
          'red',
        ]),
      ],
    },
    {
      property: 'border-left',
      value: 'calc(var(--width, 1px) + 1px) solid red',
      expected: [
        ['border-left-width', 'calc(var(--width, 1px) + 1px)'],
        ['border-left-style', 'solid'],
        ['border-left-color', 'red'],
      ],
    },
  ])('transform $property with calc width in dom2', (testCase) => {
    const decl = parseDecl(
      `.test { ${testCase.property}: ${testCase.value} !important }`
    )

    expect(createTransformBorder({ type: 'uvue', dom2: true })(decl)).toEqual(
      testCase.expected.map(([prop, value]) => ({
        type: 'decl',
        prop,
        value,
        important: true,
        raws: decl.raws,
        source: decl.source,
      }))
    )
  })

  test('does not transform border calc width outside dom2', () => {
    const decl = parseDecl(`.test { border: calc(1px + 1px) solid red }`)

    expect(createTransformBorder({ type: 'uvue', dom2: false })(decl)).toEqual([
      decl,
    ])
  })
})
