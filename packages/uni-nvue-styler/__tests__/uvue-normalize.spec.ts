import { parse } from '../src'

// for uvue version
async function objectifierRule(input: string) {
  const { code, messages } = await parse(input, {
    logLevel: 'NOTE',
    type: 'uvue',
    platform: 'app-ios',
  })

  return {
    json: JSON.parse(code),
    messages,
  }
}

describe('uvue-styler: normalize', () => {
  test('basic', async () => {
    const { json, messages } = await objectifierRule(`.foo{
  zIndex: 4;
  }`)
    expect(json).toEqual({
      foo: {
        '': {
          // color: '#FF0000',
          // width: '200px',
          zIndex: 4,
        },
      },
    })
    expect(messages.length).toBe(0)
  })
  test('length', async () => {
    const { json, messages } = await objectifierRule(`.foo{
    width: 200px;
    paddingLeft: 300;
    borderWidth: 1pt;
    left: 0;
    right: 0px;
    marginRight: asdf;
    height: 10rpx;
    paddingTop: 11upx;
  }`)
    // borderWidth: '1pt', // ?
    // paddingTop: '11upx', // ?
    expect(json).toEqual({
      foo: {
        '': {
          width: 200,
          paddingLeft: 300,

          left: 0,
          right: 0,
          height: '10rpx',
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'ERROR: property value `1pt` is not supported for `border-width` (supported values are: `number`|`pixel`|`thin`|`medium`|`thick`)',
      })
    )
    expect(messages[1]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'ERROR: property value `asdf` is not supported for `margin-right` (supported values are: `number`|`pixel`|`percent`|`auto`)',
      })
    )
    expect(messages?.[2]?.text).toBe(
      'ERROR: property value `11upx` is not supported for `padding-top` (supported values are: `number`|`pixel`|`percent`)'
    )
  })
  test('number', async () => {
    const { json, messages } = await objectifierRule(`
  .foo{
    opacity: 1
  },
  .bar{
    opacity: 0.5
  },
  .baz{
    opacity: a
  },
  .boo{
    opacity: 0.5a
  },
  .zero{
    opacity: 0
  }
  `)
    expect(json).toEqual({
      foo: {
        '': {
          opacity: 1,
        },
      },
      bar: {
        '': {
          opacity: 0.5,
        },
      },
      zero: {
        '': {
          opacity: 0,
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `a` is not supported for `opacity` (supported values are: `number`)',
      })
    )
    expect(messages[1]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `0.5a` is not supported for `opacity` (supported values are: `number`)',
      })
    )
  })
  test('integer', async () => {
    const { json, messages } = await objectifierRule(`
  .foo{
    zIndex: 1
  },
  .bar{
    zIndex: 0.5
  },
  .baz{
    zIndex: a
  },
  .boo{
    zIndex: 0.5a
  },
  .zero{
    zIndex: 0
  }
  `)
    expect(json).toEqual({
      foo: {
        '': {
          zIndex: 1,
        },
      },
      zero: {
        '': {
          zIndex: 0,
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `0.5` is not supported for `z-index` (supported values are: `integer`)',
      })
    )
    expect(messages[1]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `a` is not supported for `z-index` (supported values are: `integer`)',
      })
    )
    expect(messages[2]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `0.5a` is not supported for `z-index` (supported values are: `integer`)',
      })
    )
  })
  test('color', async () => {
    const { json, messages } = await objectifierRule(`
  .foo {
    color: #FF0000;
    background-color: #ff0000;
  },
  .bar {
    color: #F00;
    background-color: #f00
  },
  .baz {
    color: red;
    background-color: lightpink
  },
  .rgba {
    color: rgb(23, 0, 255);
    background-color: rgba(234, 45, 99, .4)
  },
  .transparent {
    color: transparent;
    background-color: asdf
  },
  .errRgba {
    color: rgb(266,0,255);
    background-color: rgba(234,45,99,1.3)
  }
  `)
    expect(json).toEqual({
      foo: {
        '': {
          color: '#FF0000',
          backgroundColor: '#ff0000',
        },
      },
      bar: {
        '': {
          color: '#FF0000',
          backgroundColor: '#ff0000',
        },
      },
      baz: {
        '': {
          color: '#FF0000',
          backgroundColor: '#FFB6C1',
        },
      },
      rgba: {
        '': {
          color: 'rgb(23,0,255)',
          backgroundColor: 'rgba(234,45,99,0.4)',
        },
      },
      transparent: {
        '': {
          color: 'rgba(0,0,0,0)',
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        text: 'NOTE: property value `#F00` is autofixed to `#FF0000`',
      })
    )
    expect(messages[1]).toEqual(
      expect.objectContaining({
        text: 'NOTE: property value `#f00` is autofixed to `#ff0000`',
      })
    )
    expect(messages[2]).toEqual(
      expect.objectContaining({
        text: 'NOTE: property value `red` is autofixed to `#FF0000`',
      })
    )
    expect(messages[3]).toEqual(
      expect.objectContaining({
        text: 'NOTE: property value `lightpink` is autofixed to `#FFB6C1`',
      })
    )
    expect(messages[4]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `asdf` is not valid for `background-color`',
      })
    )
    expect(messages[5]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `rgb(266,0,255)` is not valid for `color`',
      })
    )
    expect(messages[6]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `rgba(234,45,99,1.3)` is not valid for `background-color`',
      })
    )
  })
  test('flex-wrap', async () => {
    const {
      json,
      //messages
    } = await objectifierRule(`
  .foo { flex-wrap: nowrap }
  .bar { flex-wrap: wrap }
  `)
    expect(json).toEqual({
      foo: { '': { flexWrap: 'nowrap' } },
      bar: { '': { flexWrap: 'wrap' } },
    })

    // 不同
    // console.log(messages)
    // expect(messages[0]).toEqual(
    //   expect.objectContaining({
    //     text: 'NOTE: property value `nowrap` is the DEFAULT value for `flex-wrap` (could be removed)',
    //   })
    // )
    // expect(messages[1]).toEqual(
    //   expect.objectContaining({
    //     text: 'NOTE: the flex-wrap property may have compatibility problem on native',
    //   })
    // )
  })
  test('transition-property', async () => {
    const { json, messages } = await objectifierRule(`
  .foo {
    transition-property: margin-top
  }
  .bar {
    transition-property: height
  }
  .foobar {
    transition-property: margin-top, height
  }
  .baz {
    transition-property: abc
  }
  `)
    expect(json).toEqual({
      '@TRANSITION': {
        bar: {
          property: 'height',
        },
        foo: {
          property: 'marginTop',
        },
        foobar: {
          property: 'marginTop,height',
        },
      },
      foo: {
        '': {
          transitionProperty: 'marginTop',
        },
      },
      bar: {
        '': {
          transitionProperty: 'height',
        },
      },
      foobar: {
        '': {
          transitionProperty: 'marginTop,height',
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `abc` is not supported for `transition-property` (supported values are: `css property`)',
      })
    )
  })
  test('transition-duration & transition-delay', async () => {
    const { json, messages } = await objectifierRule(`
  .foo{
    transition-duration: 200ms;
    transition-delay: 0.5s
  },
  .bar{
    transition-duration: 200;
    transition-delay: abc
  }
  `)
    // 不合法的直接丢掉了
    expect(json).toEqual({
      '@TRANSITION': {
        foo: {
          delay: '0.5s',
          duration: '200ms',
        },
      },
      foo: {
        '': {
          transitionDuration: '200ms',
          transitionDelay: '0.5s',
        },
      },
    })
    expect(messages?.[0]?.text).toBe(
      'ERROR: property value `200` is not supported for `transition-duration` (supported values are: `number of seconds`|`milliseconds`)'
    )
    expect(messages?.[1]?.text).toEqual(
      'ERROR: property value `abc` is not supported for `transition-delay` (supported values are: `number of seconds`|`milliseconds`)'
    )
  })
  test('transition-timing-function', async () => {
    const { json, messages } = await objectifierRule(`
  .foo {
    transition-timing-function: ease-in-out
  }
  .bar {
    transition-timing-function: cubic-bezier(.88, 1.0, -0.67, 1.37)
  }
  .baz {
    transition-timing-function: abc
  }
  `)
    expect(json).toEqual({
      '@TRANSITION': {
        bar: {
          timingFunction: 'cubic-bezier(0.88,1,-0.67,1.37)',
        },
        foo: {
          timingFunction: 'ease-in-out',
        },
      },
      foo: {
        '': {
          transitionTimingFunction: 'ease-in-out',
        },
      },
      bar: {
        '': {
          transitionTimingFunction: 'cubic-bezier(0.88,1,-0.67,1.37)',
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `abc` is not supported for `transition-timing-function` (supported values are: `linear`|`ease`|`ease-in`|`ease-out`|`ease-in-out`|`cubic-bezier(n,n,n,n)`)',
      })
    )
  })
  test('unknown', async () => {
    const { json, messages } = await objectifierRule(`
  .foo {
    background: #ff0000;
    abc: 123;
    def: 456px;
    ghi: 789pt;
    AbcDef: 456;
    abcDef: abc
  }
  `)
    expect(json).toEqual({
      foo: {
        '': {
          backgroundColor: '#ff0000',
          backgroundImage: 'none',
          abc: 123,
          def: '456px',
          ghi: '789pt',
          AbcDef: 456,
          abcDef: 'abc',
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        text: 'WARNING: `abc` is not a standard property name (may not be supported)',
      })
    )
    expect(messages[1]).toEqual(
      expect.objectContaining({
        text: 'WARNING: `def` is not a standard property name (may not be supported)',
      })
    )
    expect(messages[2]).toEqual(
      expect.objectContaining({
        text: 'WARNING: `ghi` is not a standard property name (may not be supported)',
      })
    )
    expect(messages[3]).toEqual(
      expect.objectContaining({
        text: 'WARNING: `-abc-def` is not a standard property name (may not be supported)',
      })
    )
    expect(messages[4]).toEqual(
      expect.objectContaining({
        text: 'WARNING: `abc-def` is not a standard property name (may not be supported)',
      })
    )
  })
  test('complex style code', async () => {
    const { json, messages } = await objectifierRule(`
  .foo {
    color: red;
    WebkitTransform: rotate(90deg);
    width: 200px
  }
  `)
    expect(json).toEqual({
      foo: {
        '': {
          color: '#FF0000',
          WebkitTransform: 'rotate(90deg)',
          width: 200,
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        text: 'NOTE: property value `red` is autofixed to `#FF0000`',
      })
    )
    expect(messages[1]).toEqual(
      expect.objectContaining({
        text: 'WARNING: `-webkit-transform` is not a standard property name (may not be supported)',
      })
    )
  })
})
