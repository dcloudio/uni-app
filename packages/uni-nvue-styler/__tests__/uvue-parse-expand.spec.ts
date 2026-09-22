import { expand } from '../src/expand/index'
// import { expand } from '../dist/uni-nvue-styler.es'
import type { Declaration } from 'postcss'

const processDeclaration = expand({ type: 'uvue' }).Declaration as (
  decl: Declaration
) => void

function createDeclaration(prop: string, value: unknown) {
  const newValue = value + ''
  if (newValue.includes('!important')) {
    return {
      prop,
      value: newValue.replace(/\s*!important/, ''),
      important: true,
    }
  }
  return {
    prop,
    value: newValue,
    important: false,
  }
}

function normalizeStyle(
  name: string,
  value: unknown,
  processor = processDeclaration
) {
  const decl = {
    replaceWith(newProps: Declaration[]) {
      props = newProps
    },

    ...createDeclaration(name, value),
  } as Declaration

  let props = [decl]
  processor(decl)
  return props
}

describe('test esm expand', () => {
  test('basic', () => {
    const val = normalizeStyle('border', '1px solid red')
    expect(val).toEqual([
      {
        prop: 'border-top-width',
        raws: undefined,
        source: undefined,
        type: 'decl',
        value: '1px',
      },
      {
        prop: 'border-right-width',
        raws: undefined,
        source: undefined,
        type: 'decl',
        value: '1px',
      },
      {
        prop: 'border-bottom-width',
        raws: undefined,
        source: undefined,
        type: 'decl',
        value: '1px',
      },
      {
        prop: 'border-left-width',
        raws: undefined,
        source: undefined,
        type: 'decl',
        value: '1px',
      },
      {
        prop: 'border-top-style',
        raws: undefined,
        source: undefined,
        type: 'decl',
        value: 'solid',
      },
      {
        prop: 'border-right-style',
        raws: undefined,
        source: undefined,
        type: 'decl',
        value: 'solid',
      },
      {
        prop: 'border-bottom-style',
        raws: undefined,
        source: undefined,
        type: 'decl',
        value: 'solid',
      },
      {
        prop: 'border-left-style',
        raws: undefined,
        source: undefined,
        type: 'decl',
        value: 'solid',
      },
      {
        prop: 'border-top-color',
        raws: undefined,
        source: undefined,
        type: 'decl',
        value: 'red',
      },
      {
        prop: 'border-right-color',
        raws: undefined,
        source: undefined,
        type: 'decl',
        value: 'red',
      },
      {
        prop: 'border-bottom-color',
        raws: undefined,
        source: undefined,
        type: 'decl',
        value: 'red',
      },
      {
        prop: 'border-left-color',
        raws: undefined,
        source: undefined,
        type: 'decl',
        value: 'red',
      },
    ])
  })

  test('expands animation only for dom2 uvue', () => {
    const processDom2Declaration = expand({
      type: 'uvue',
      dom2: true,
      platform: 'app-android',
    }).Declaration as (decl: Declaration) => void
    const animation = normalizeStyle(
      'animation',
      'fade 1s ease-in forwards',
      processDom2Declaration
    )
    expect(animation.map(({ prop, value }) => ({ prop, value }))).toEqual([
      { prop: 'animation-name', value: 'fade' },
      { prop: 'animation-duration', value: '1s' },
      { prop: 'animation-delay', value: '0s' },
      { prop: 'animation-timing-function', value: 'ease-in' },
      { prop: 'animation-iteration-count', value: '1' },
      { prop: 'animation-direction', value: 'normal' },
      { prop: 'animation-fill-mode', value: 'forwards' },
      { prop: 'animation-play-state', value: 'running' },
    ])

    expect(
      normalizeStyle(
        'animation',
        'fade 1s ease-in',
        processDom2Declaration
      ).map(({ prop, value }) => ({ prop, value }))
    ).toEqual([
      { prop: 'animation-name', value: 'fade' },
      { prop: 'animation-duration', value: '1s' },
      { prop: 'animation-delay', value: '0s' },
      { prop: 'animation-timing-function', value: 'ease-in' },
      { prop: 'animation-iteration-count', value: '1' },
      { prop: 'animation-direction', value: 'normal' },
      { prop: 'animation-fill-mode', value: 'forwards' },
      { prop: 'animation-play-state', value: 'running' },
    ])

    expect(
      normalizeStyle(
        'animation',
        'fade 1s ease-in none',
        processDom2Declaration
      )
    ).toHaveLength(0)

    const variableAnimation = normalizeStyle(
      'animation',
      'var(--animation) !important',
      processDom2Declaration
    )
    expect(
      variableAnimation.map(({ prop, value, important }) => ({
        prop,
        value,
        important,
      }))
    ).toEqual(
      [
        'animation-name',
        'animation-duration',
        'animation-delay',
        'animation-timing-function',
        'animation-iteration-count',
        'animation-direction',
        'animation-fill-mode',
        'animation-play-state',
      ].map((prop) => ({
        prop,
        value: 'var(--animation)',
        important: true,
      }))
    )

    const mixedVariableAnimation = normalizeStyle(
      'animation',
      'fade var(--duration)',
      processDom2Declaration
    )
    expect(
      mixedVariableAnimation.map(({ prop, value }) => ({ prop, value }))
    ).toEqual(
      [
        'animation-name',
        'animation-duration',
        'animation-delay',
        'animation-timing-function',
        'animation-iteration-count',
        'animation-direction',
        'animation-fill-mode',
        'animation-play-state',
      ].map((prop) => ({
        prop,
        value: 'fade var(--duration)',
      }))
    )

    const legacyUVueAnimation = normalizeStyle('animation', 'fade 1s ease-in')
    expect(legacyUVueAnimation).toHaveLength(1)
    expect(legacyUVueAnimation[0]).toEqual(
      expect.objectContaining({
        prop: 'animation',
        value: 'fade 1s ease-in',
      })
    )

    const processNVueDeclaration = expand({ type: 'nvue' }).Declaration as (
      decl: Declaration
    ) => void
    const declaration = {
      ...createDeclaration('animation', 'fade 1s ease-in'),
      replaceWith() {
        throw new Error('nvue animation should not be expanded')
      },
    } as unknown as Declaration
    processNVueDeclaration(declaration)
    expect(declaration).toEqual(
      expect.objectContaining({
        prop: 'animation',
        value: 'fade 1s ease-in',
      })
    )
  })

  test('expands variable shorthands only for dom2', () => {
    const processNVueDeclaration = expand({ type: 'nvue' }).Declaration as (
      decl: Declaration
    ) => void
    const processLegacyUVueDeclaration = expand({
      type: 'uvue',
      dom2: false,
    }).Declaration as (decl: Declaration) => void
    const processDom2Declaration = expand({
      type: 'uvue',
      dom2: true,
    }).Declaration as (decl: Declaration) => void

    const flexFlowValue = 'var(--direction, row) wrap'
    for (const processor of [
      processNVueDeclaration,
      processLegacyUVueDeclaration,
    ]) {
      expect(normalizeStyle('flex-flow', flexFlowValue, processor)).toEqual([
        expect.objectContaining({ prop: 'flex-flow', value: flexFlowValue }),
      ])
    }

    expect(
      normalizeStyle(
        'background',
        'var(--background, #ffffff)',
        processLegacyUVueDeclaration
      )
    ).toEqual([
      expect.objectContaining({
        prop: 'background',
        value: 'var(--background, #ffffff)',
      }),
    ])

    expect(
      normalizeStyle(
        'font',
        'italic 16px var(--family)',
        processLegacyUVueDeclaration
      )
    ).toEqual([
      expect.objectContaining({
        prop: 'font',
        value: 'italic 16px var(--family)',
      }),
    ])

    expect(
      normalizeStyle('border', 'var(--border)', processLegacyUVueDeclaration)
        .filter(({ prop }) => prop.endsWith('-top-width'))
        .map(({ value }) => value)
    ).toEqual(['var(--border)'])
    expect(
      normalizeStyle('border', 'var(--border)', processLegacyUVueDeclaration)
        .filter(({ prop }) =>
          ['border-top-style', 'border-top-color'].includes(prop)
        )
        .map(({ value }) => value)
    ).toEqual(['none', '#000000'])

    expect(
      normalizeStyle('flex', 'var(--flex)', processLegacyUVueDeclaration).map(
        ({ prop, value }) => ({ prop, value })
      )
    ).toEqual([
      { prop: 'flex-grow', value: '1' },
      { prop: 'flex-shrink', value: '1' },
      { prop: 'flex-basis', value: 'var(--flex)' },
    ])

    expect(
      normalizeStyle('flex-flow', flexFlowValue, processDom2Declaration).map(
        ({ prop, value }) => ({ prop, value })
      )
    ).toEqual([
      { prop: 'flex-direction', value: 'var(--direction, row)' },
      { prop: 'flex-wrap', value: 'wrap' },
    ])

    for (const { shorthand, value, expected } of [
      {
        shorthand: 'background',
        value: 'linear-gradient(red, blue) var(--color, red)',
        expected: [
          {
            prop: 'background-image',
            value: 'linear-gradient(red, blue)',
          },
          { prop: 'background-color', value: 'var(--color, red)' },
        ],
      },
      {
        shorthand: 'border',
        value: '1px solid var(--color, red)',
        expected: [
          ...[
            'border-top-width',
            'border-right-width',
            'border-bottom-width',
            'border-left-width',
          ].map((prop) => ({ prop, value: '1px' })),
          ...[
            'border-top-style',
            'border-right-style',
            'border-bottom-style',
            'border-left-style',
          ].map((prop) => ({ prop, value: 'solid' })),
          ...[
            'border-top-color',
            'border-right-color',
            'border-bottom-color',
            'border-left-color',
          ].map((prop) => ({ prop, value: 'var(--color, red)' })),
        ],
      },
      {
        shorthand: 'flex',
        value: 'var(--grow, 1) 1 20px',
        expected: [
          { prop: 'flex-grow', value: 'var(--grow, 1)' },
          { prop: 'flex-shrink', value: '1' },
          { prop: 'flex-basis', value: '20px' },
        ],
      },
      {
        shorthand: 'transition',
        value: 'opacity var(--duration)',
        expected: [
          'transition-property',
          'transition-duration',
          'transition-timing-function',
          'transition-delay',
        ].map((prop) => ({ prop, value: 'opacity var(--duration)' })),
      },
    ]) {
      expect(
        normalizeStyle(shorthand, value, processDom2Declaration).map(
          ({ prop, value }) => ({ prop, value })
        )
      ).toEqual(expected)
    }
  })
})

const props = ['border-left', 'border-right', 'border-top', 'border-bottom']
const expandStyle = normalizeStyle

describe('expandStyle border', () => {
  it('test border 0 param', () => {
    props.forEach((prop) => {
      let result = expandStyle(prop, '')
      expect(result).toEqual([
        {
          prop: prop + '-width',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: 'medium',
        },
        {
          prop: prop + '-style',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: 'none',
        },
        {
          prop: prop + '-color',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: '#000000',
        },
      ])
    })
  })
  it('test border 1 param', () => {
    props.forEach((prop) => {
      let result = expandStyle(prop, '1px')
      expect(result).toEqual([
        {
          prop: prop + '-width',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: '1px',
        },
        {
          prop: prop + '-style',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: 'none',
        },
        {
          prop: prop + '-color',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: '#000000',
        },
      ])
      result = expandStyle(prop, 'solid')
      expect(result).toEqual([
        {
          prop: prop + '-width',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: 'medium', //'1px',
        },
        {
          prop: prop + '-style',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: 'solid',
        },
        {
          prop: prop + '-color',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: '#000000',
        },
      ])
      result = expandStyle(prop, 'red')
      expect(result).toEqual([
        {
          prop: prop + '-width',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: 'medium',
        },
        {
          prop: prop + '-style',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: 'none',
        },
        {
          prop: prop + '-color',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: 'red',
        },
      ])
    })
  })
  it('test border 2 params', () => {
    props.forEach((prop) => {
      let result = expandStyle(prop, '1px solid')
      expect(result).toEqual([
        {
          prop: prop + '-width',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: '1px',
        },
        {
          prop: prop + '-style',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: 'solid',
        },
        {
          prop: prop + '-color',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: '#000000',
        },
      ])
      result = expandStyle(prop, '1px red')
      expect(result).toEqual([
        {
          prop: prop + '-width',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: '1px',
        },
        {
          prop: prop + '-style',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: 'none',
        },
        {
          prop: prop + '-color',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: 'red',
        },
      ])
      result = expandStyle(prop, 'solid red')
      expect(result).toEqual([
        {
          prop: prop + '-width',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: 'medium',
        },
        {
          prop: prop + '-style',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: 'solid',
        },
        {
          prop: prop + '-color',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: 'red',
        },
      ])
    })
  })

  it('test border 3 params', () => {
    props.forEach((prop) => {
      let result = expandStyle(prop, '1px solid red')
      expect(result).toEqual([
        {
          prop: prop + '-width',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: '1px',
        },
        {
          prop: prop + '-style',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: 'solid',
        },
        {
          prop: prop + '-color',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: 'red',
        },
      ])

      result = expandStyle(prop, 'medium solid red')
      // normal
      expect(result).toEqual([
        {
          prop: prop + '-width',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: 'medium',
        },
        {
          prop: prop + '-style',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: 'solid',
        },
        {
          prop: prop + '-color',
          raws: undefined,
          source: undefined,
          type: 'decl',
          value: 'red',
        },
      ])
    })
  })
})

describe('expand background', () => {
  it('test background 0 param', () => {
    let result = expandStyle('background', '')
    expect(result).toEqual([
      {
        prop: 'background-image',
        raws: undefined,
        source: undefined,
        type: 'decl',
        value: 'none',
      },
      {
        prop: 'background-color',
        raws: undefined,
        source: undefined,
        type: 'decl',
        value: 'transparent',
      },
    ])
  })
  it('test background 1 param', () => {
    let result = expandStyle('background', 'red')
    expect(result).toEqual([
      {
        prop: 'background-image',
        raws: undefined,
        source: undefined,
        type: 'decl',
        value: 'none',
      },
      {
        prop: 'background-color',
        raws: undefined,
        source: undefined,
        type: 'decl',
        value: 'red',
      },
    ])

    result = expandStyle(
      'background',
      'linear-gradient(to bottom,rgba(255, 255, 255, 0.95),rgba(255, 255, 255, 0.6))'
    )

    expect(result).toEqual([
      {
        prop: 'background-image',
        raws: undefined,
        source: undefined,
        type: 'decl',
        value:
          'linear-gradient(to bottom,rgba(255, 255, 255, 0.95),rgba(255, 255, 255, 0.6))',
      },
      {
        prop: 'background-color',
        raws: undefined,
        source: undefined,
        type: 'decl',
        value: 'transparent',
      },
    ])
  })
})
