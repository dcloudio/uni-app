import { objectifier } from '../src'
import { parseCss } from './utils'

async function objectifierRoot(input: string) {
  const { root, messages } = await parseCss(input)
  return {
    json: objectifier(root),
    messages,
  }
}

describe('nvue-styler: parse', () => {
  test('basic', async () => {
    const code =
      'html {color: #000000;}\n\n.foo {color: red; background-color: rgba(255,255,255,0.6); -webkit-transform: rotate(90deg); width: 200px; left: 0; right: 0px; border-width: 1pt; font-weight: 100}\n\n.bar {background: red}'
    const { json, messages } = await objectifierRoot(code)
    expect(json).toEqual({
      foo: {
        color: '#FF0000',
        backgroundColor: 'rgba(255,255,255,0.6)',
        WebkitTransform: 'rotate(90deg)',
        width: '200px',
        left: 0,
        right: '0px',
        borderWidth: '1pt',
        fontWeight: '100',
      },
      bar: { backgroundColor: '#FF0000' },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'ERROR: Selector `html` is not supported. nvue only support classname selector',
      })
    )
    expect(messages[1]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'NOTE: property value `red` is autofixed to `#FF0000`',
      })
    )
    expect(messages[2]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'WARNING: `-webkit-transform` is not a standard property name (may not be supported)',
      })
    )
    expect(messages[3]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'NOTE: property value `red` is autofixed to `#FF0000`',
      })
    )
  })
  test('fix prop value', async () => {
    const code = '.foo {font-size: 200px;}'
    const { json, messages } = await objectifierRoot(code)
    expect(json).toEqual({ foo: { fontSize: '200px' } })
    expect(messages.length).toBe(0)
  })
  test('ensure number type value', async () => {
    const code = '.foo {line-height: 40;}\n\n .bar {line-height: 20px;}'
    const { json, messages } = await objectifierRoot(code)
    expect(json).toEqual({
      foo: { lineHeight: 40 },
      bar: { lineHeight: '20px' },
    })
    expect(messages.length).toBe(0)
  })
  test('complex class definition', async () => {
    const code =
      '.foo, .bar {font-size: 20;}\n\n .foo {color: #ff5000;}\n\n .bar {color: #000000;}'
    const { json, messages } = await objectifierRoot(code)
    expect(json).toEqual({
      foo: { fontSize: 20, color: '#ff5000' },
      bar: { fontSize: 20, color: '#000000' },
    })
    expect(messages.length).toBe(0)
  })
  test('more complex class definition', async () => {
    const code =
      '.foo, .bar {font-size: 20; color: #000000}\n\n .foo, .bar, .baz {color: #ff5000; height: 30;}'
    const { json, messages } = await objectifierRoot(code)
    expect(json).toEqual({
      foo: { fontSize: 20, color: '#ff5000', height: 30 },
      bar: { fontSize: 20, color: '#ff5000', height: 30 },
      baz: { color: '#ff5000', height: 30 },
    })
    expect(messages.length).toBe(0)
  })
  test('transition', async () => {
    const code =
      '.foo {transition-property: margin-top; transition-duration: 300ms; transition-delay: 0.2s; transition-timing-function: ease-in;}'
    const { json, messages } = await objectifierRoot(code)
    expect(json).toEqual({
      foo: {
        transitionDelay: 200,
        transitionDuration: 300,
        transitionProperty: 'marginTop',
        transitionTimingFunction: 'ease-in',
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'NOTE: property value `300ms` is autofixed to `300`',
      })
    )
    expect(messages[1]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'NOTE: property value `0.2s` is autofixed to `200`',
      })
    )
  })
})
