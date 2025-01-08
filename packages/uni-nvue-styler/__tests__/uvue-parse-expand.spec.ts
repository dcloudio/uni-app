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

function normalizeStyle(name: string, value: unknown) {
  const decl = {
    replaceWith(newProps: Declaration[]) {
      props = newProps
    },

    ...createDeclaration(name, value),
  } as Declaration

  let props = [decl]
  processDeclaration(decl)
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
