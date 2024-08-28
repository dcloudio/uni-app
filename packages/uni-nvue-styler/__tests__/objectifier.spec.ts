import { parse } from '../src'

async function objectifierRoot(input: string) {
  const { code, messages } = await parse(input, { logLevel: 'NOTE' })
  return {
    json: JSON.parse(code),
    messages,
  }
}

describe('nvue-styler: objectifier', () => {
  test('basic', async () => {
    const code =
      'html {color: #000000;}\n\n.foo {color: red; background-color: rgba(255,255,255,0.6); -webkit-transform: rotate(90deg); width: 200px; left: 0; right: 0px; border-width: 1pt; font-weight: 100}\n\n.bar {background: red}'
    const { json, messages } = await objectifierRoot(code)
    expect(json).toEqual({
      foo: {
        '': {
          color: '#FF0000',
          backgroundColor: 'rgba(255,255,255,0.6)',
          WebkitTransform: 'rotate(90deg)',
          width: 200,
          left: 0,
          right: 0,
          borderWidth: '1pt',
          fontWeight: '100',
        },
      },
      bar: {
        '': {
          backgroundColor: '#FF0000',
          backgroundImage: '',
        },
      },
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
    expect(json).toEqual({ foo: { '': { fontSize: 200 } } })
    expect(messages.length).toBe(0)
  })
  test('ensure number type value', async () => {
    const code = '.foo {line-height: 40;}\n\n .bar {line-height: 20px;}'
    const { json, messages } = await objectifierRoot(code)
    expect(json).toEqual({
      foo: { '': { lineHeight: 40 } },
      bar: { '': { lineHeight: 20 } },
    })
    expect(messages.length).toBe(0)
  })
  test('complex class definition', async () => {
    const code =
      '.foo, .bar {font-size: 20;}\n\n .foo {color: #ff5000;}\n\n .bar {color: #000000;}'
    const { json, messages } = await objectifierRoot(code)
    expect(json).toEqual({
      foo: { '': { fontSize: 20, color: '#ff5000' } },
      bar: { '': { fontSize: 20, color: '#000000' } },
    })
    expect(messages.length).toBe(0)
  })
  test('more complex class definition', async () => {
    const code =
      '.foo, .bar {font-size: 20; color: #000000}\n\n .foo, .bar, .baz {color: #ff5000; height: 30;}'
    const { json, messages } = await objectifierRoot(code)
    expect(json).toEqual({
      foo: { '': { fontSize: 20, color: '#ff5000', height: 30 } },
      bar: { '': { fontSize: 20, color: '#ff5000', height: 30 } },
      baz: { '': { color: '#ff5000', height: 30 } },
    })
    expect(messages.length).toBe(0)
  })
  test('transition', async () => {
    const code =
      '.foo {transition-property: margin-top; transition-duration: 300ms; transition-delay: 0.2s; transition-timing-function: ease-in;}'
    const { json, messages } = await objectifierRoot(code)
    expect(json).toEqual({
      '@TRANSITION': {
        foo: {
          delay: 200,
          duration: 300,
          property: 'marginTop',
          timingFunction: 'ease-in',
        },
      },
      foo: {
        '': {
          transitionDelay: 200,
          transitionDuration: 300,
          transitionProperty: 'marginTop',
          transitionTimingFunction: 'ease-in',
        },
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
  test('transition transform', async () => {
    const code =
      '.foo {transition-property: transform; transition-duration: 300ms; transition-delay: 0.2s; transition-timing-function: ease-in-out;}'
    const { json, messages } = await objectifierRoot(code)
    expect(json).toEqual({
      '@TRANSITION': {
        foo: {
          property: 'transform',
          duration: 300,
          delay: 200,
          timingFunction: 'ease-in-out',
        },
      },
      foo: {
        '': {
          transitionDelay: 200,
          transitionDuration: 300,
          transitionProperty: 'transform',
          transitionTimingFunction: 'ease-in-out',
        },
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
  test('multi transition properties', async () => {
    const code =
      '.foo {transition-property: margin-top, height; transition-duration: 300ms; transition-delay: 0.2s; transition-timing-function: ease-in-out;}'
    const { json, messages } = await objectifierRoot(code)
    expect(json).toEqual({
      '@TRANSITION': {
        foo: {
          property: 'marginTop,height',
          duration: 300,
          delay: 200,
          timingFunction: 'ease-in-out',
        },
      },
      foo: {
        '': {
          transitionDelay: 200,
          transitionDuration: 300,
          transitionProperty: 'marginTop,height',
          transitionTimingFunction: 'ease-in-out',
        },
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
  test('complex transition', async () => {
    const code =
      '.foo {font-size: 20; color: #000000}\n\n .foo, .bar {color: #ff5000; height: 30; transition-property: margin-top; transition-duration: 300ms; transition-delay: 0.2s; transition-timing-function: ease-in;}'
    const { json, messages } = await objectifierRoot(code)
    expect(json).toEqual({
      '@TRANSITION': {
        foo: {
          property: 'marginTop',
          duration: 300,
          delay: 200,
          timingFunction: 'ease-in',
        },
        bar: {
          property: 'marginTop',
          duration: 300,
          delay: 200,
          timingFunction: 'ease-in',
        },
      },
      foo: {
        '': {
          fontSize: 20,
          color: '#ff5000',
          height: 30,
          transitionDelay: 200,
          transitionDuration: 300,
          transitionProperty: 'marginTop',
          transitionTimingFunction: 'ease-in',
        },
      },
      bar: {
        '': {
          color: '#ff5000',
          height: 30,
          transitionDelay: 200,
          transitionDuration: 300,
          transitionProperty: 'marginTop',
          transitionTimingFunction: 'ease-in',
        },
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
  test('transition shorthand', async () => {
    const code =
      '.foo {font-size: 20; transition: margin-top 500ms ease-in-out 1s}'
    const { json, messages } = await objectifierRoot(code)
    expect(json).toEqual({
      '@TRANSITION': {
        foo: {
          property: 'marginTop',
          duration: 500,
          delay: 1000,
          timingFunction: 'ease-in-out',
        },
      },
      foo: {
        '': {
          fontSize: 20,
          transitionDelay: 1000,
          transitionDuration: 500,
          transitionProperty: 'marginTop',
          transitionTimingFunction: 'ease-in-out',
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'NOTE: property value `500ms` is autofixed to `500`',
      })
    )
    expect(messages[1]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'NOTE: property value `1s` is autofixed to `1000`',
      })
    )
  })
  test('padding & margin shorthand', async () => {
    const code =
      '.foo { padding: 20px; margin: 30px 40; } .bar { margin: 10px 20 30; padding: 10 20px 30px 40;}'
    const { json } = await objectifierRoot(code)
    expect(json).toEqual({
      foo: {
        '': {
          paddingTop: 20,
          paddingRight: 20,
          paddingBottom: 20,
          paddingLeft: 20,
          marginTop: 30,
          marginRight: 40,
          marginBottom: 30,
          marginLeft: 40,
        },
      },
      bar: {
        '': {
          paddingTop: 10,
          paddingRight: 20,
          paddingBottom: 30,
          paddingLeft: 40,
          marginTop: 10,
          marginRight: 20,
          marginBottom: 30,
          marginLeft: 20,
        },
      },
    })
  })
  test('padding & margin shorthand with important', async () => {
    const code =
      '.foo { padding: 20px !important; margin: 30px 40 !important; } .bar { margin: 10px 20 30 !important; padding: 10 20px 30px 40 !important;}'
    const { json } = await objectifierRoot(code)
    expect(json).toEqual({
      foo: {
        '': {
          '!paddingTop': 20,
          '!paddingRight': 20,
          '!paddingBottom': 20,
          '!paddingLeft': 20,
          '!marginTop': 30,
          '!marginRight': 40,
          '!marginBottom': 30,
          '!marginLeft': 40,
        },
      },
      bar: {
        '': {
          '!paddingTop': 10,
          '!paddingRight': 20,
          '!paddingBottom': 30,
          '!paddingLeft': 40,
          '!marginTop': 10,
          '!marginRight': 20,
          '!marginBottom': 30,
          '!marginLeft': 20,
        },
      },
    })
  })
  test('override padding & margin shorthand', async () => {
    const code =
      '.foo { padding: 20px; padding-left: 30px; } .bar { margin: 10px 20; margin-bottom: 30px;}'
    const { json } = await objectifierRoot(code)
    expect(json).toEqual({
      foo: {
        '': {
          paddingTop: 20,
          paddingRight: 20,
          paddingBottom: 20,
          paddingLeft: 30,
        },
      },
      bar: {
        '': {
          marginTop: 10,
          marginRight: 20,
          marginBottom: 30,
          marginLeft: 20,
        },
      },
    })
  })
  test('pseudo class', async () => {
    const code =
      '.class-a {color: #0000ff;} .class-a:last-child:focus {color: #ff0000;}'
    const { json } = await objectifierRoot(code)
    expect(json).toEqual({
      'class-a': {
        '': {
          color: '#0000ff',
          'color:last-child:focus': '#ff0000',
        },
      },
    })
  })
  test('iconfont', async () => {
    const code =
      '@font-face {font-family: "font-family-name-1"; src: url("font file url 1-1") format("truetype");} @font-face {font-family: "font-family-name-2"; src: url("font file url 2-1") format("truetype"), url("font file url 2-2") format("woff");}'
    const { json } = await objectifierRoot(code)
    expect(json).toEqual({
      '@FONT-FACE': [
        {
          fontFamily: 'font-family-name-1',
          src: 'url("font file url 1-1") format("truetype")',
        },
        {
          fontFamily: 'font-family-name-2',
          src: 'url("font file url 2-1") format("truetype"), url("font file url 2-2") format("woff")',
        },
      ],
    })
  })
  test('syntax error', async () => {
    const code = 'asdf'
    const { messages } = await objectifierRoot(code)
    expect(messages[0].text).toContain('Unknown word')
  })
})
