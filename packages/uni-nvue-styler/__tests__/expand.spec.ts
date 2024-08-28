import { type Declaration, type Rule, parse } from 'postcss'
import { transformBackground } from '../src/expand/background'
import { createTransformBorder } from '../src/expand/border'
import { transformBorderColor } from '../src/expand/borderColor'
import { transformBorderRadius } from '../src/expand/borderRadius'
import { transformBorderStyle } from '../src/expand/borderStyle'
import { transformBorderWidth } from '../src/expand/borderWidth'
import { transformFlexFlow } from '../src/expand/flexFlow'
import { transformFont } from '../src/expand/font'
import { createTransformBox } from '../src/expand/margin'
import { transformTransition } from '../src/expand/transition'

function parseDecl(input: string) {
  return (parse(input).nodes[0] as Rule).nodes[0] as Declaration
}

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
  test('transform border', function () {
    const types = [
      'border',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
    ]
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
      }
    }
    types.forEach((type) => {
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
            return Object.assign({ raws: decl.raws, source: decl.source }, node)
          })
        )
      })
    })
  })
  test(`transform border-style`, () => {
    const borderStyles: Record<string, Record<string, string>[]> = {
      dotted: [
        {
          type: 'decl',
          prop: 'border-style',
          value: 'dotted',
        },
      ],
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
      if (!value.includes(' ')) {
        expect(transformBorderStyle(decl)).toEqual([decl])
      } else {
        expect(transformBorderStyle(decl)).toEqual(
          borderStyles[value].map((node) => {
            return Object.assign({ raws: decl.raws, source: decl.source }, node)
          })
        )
      }
    })
  })
  test(`transform border-width`, () => {
    const borderWidths: Record<string, Record<string, string>[]> = {
      '1px': [
        {
          type: 'decl',
          prop: 'border-width',
          value: '1px',
        },
      ],
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
      if (!value.includes(' ')) {
        expect(transformBorderWidth(decl)).toEqual([decl])
      } else {
        expect(transformBorderWidth(decl)).toEqual(
          borderWidths[value].map((node) => {
            return Object.assign({ raws: decl.raws, source: decl.source }, node)
          })
        )
      }
    })
  })
  test(`transform border-color`, () => {
    const borderColors: Record<string, Record<string, string>[]> = {
      red: [
        {
          type: 'decl',
          prop: 'border-color',
          value: 'red',
        },
      ],
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
      if (!value.includes(' ')) {
        expect(transformBorderColor(decl)).toEqual([decl])
      } else {
        expect(transformBorderColor(decl)).toEqual(
          borderColors[value].map((node) => {
            return Object.assign({ raws: decl.raws, source: decl.source }, node)
          })
        )
      }
    })
  })
  test(`transform border-radius`, () => {
    const borderRadius: Record<string, Record<string, string>[]> = {
      '1px': [
        {
          type: 'decl',
          prop: 'border-radius',
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
      if (!value.includes(' ')) {
        expect(transformBorderRadius(decl)).toEqual([decl])
      } else {
        expect(transformBorderRadius(decl)).toEqual(
          borderRadius[value].map((node) => {
            return Object.assign({ raws: decl.raws, source: decl.source }, node)
          })
        )
      }
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
          value: '',
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
          value: '',
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
          value: '',
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
})
