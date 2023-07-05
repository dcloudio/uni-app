import { parse } from '../src'

async function objectifierRule(input: string) {
  const { code, messages } = await parse(input, {
    logLevel: 'NOTE',
    type: 'uvue',
    platform: 'app-android',
  })
  return {
    json: JSON.parse(code),
    messages,
  }
}

describe('uvue-styler: normalize', () => {
  test('basic', async () => {
    const { json, messages } = await objectifierRule(`.foo{
color: #FF0000;
width: 200;
height: 200;
position: relative;
}`)
    expect(json).toEqual({
      foo: {
        '': {
          color: '#FF0000',
          width: 200,
          height: 200,
          position: 'relative',
        },
      },
    })
    expect(messages.length).toBe(0)
  })

  test('length', async () => {
    const { json, messages } = await objectifierRule(`.foo{
width: 200px;
minWidth: 100px;
paddingLeft: 300;
borderWidth: 1pt;
left: 0;
right: 0px;
top: auto;
marginRight: asdf;
height: 10rpx;
paddingTop: 11upx;
}`)
    expect(json).toEqual({
      foo: {
        '': {
          width: 200,
          minWidth: 100,
          paddingLeft: 300,
          borderWidth: '1pt',
          left: 0,
          right: 0,
          top: 'auto',
          height: '10rpx',
          paddingTop: '11upx',
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'ERROR: property value `asdf` is not supported for `margin-right` (supported values are: `number`|`pixel`|`percent`)',
      })
    )
  })

  test('enum', async () => {
    const { json, messages } = await objectifierRule(`.foo{
position: absolute;
display: flex;
flexDirection: row;
alignItems: baseline;
justifyContent: center;
flexWrap: nowrap;
borderLeftStyle: solid;
borderRightStyle: abc;
}`)
    expect(json).toEqual({
      foo: {
        '': {
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'nowrap',
          borderLeftStyle: 'solid',
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'ERROR: property value `baseline` is not supported for `align-items` (supported values are: `center`|`flex-start`|`flex-end`|`stretch`)',
      })
    )
    expect(messages[1]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'ERROR: property value `abc` is not supported for `border-right-style` (supported values are: `solid`|`dashed`|`dotted`)',
      })
    )
  })

  test('combined: length percentage enum', async () => {
    const { json, messages } = await objectifierRule(`.foo{
width: 200px;
maxWidth: 500px;
height: max-content;
top: 20%;
bottom: 30%;
left: auto;
right: auto;
}`)
    expect(json).toEqual({
      foo: {
        '': {
          width: 200,
          maxWidth: 500,
          top: '20%',
          bottom: '30%',
          left: 'auto',
          right: 'auto',
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'ERROR: property value `max-content` is not supported for `height` (supported values are: `number`|`pixel`|`percent`)',
      })
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
    expect(json).toEqual({
      '@TRANSITION': {
        bar: {
          duration: 200,
        },
        foo: {
          delay: 500,
          duration: 200,
        },
      },
      foo: {
        '': {
          transitionDuration: 200,
          transitionDelay: 500,
        },
      },
      bar: {
        '': {
          transitionDuration: 200,
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        text: 'NOTE: property value `200ms` is autofixed to `200`',
      })
    )
    expect(messages[1]).toEqual(
      expect.objectContaining({
        text: 'NOTE: property value `0.5s` is autofixed to `500`',
      })
    )
    expect(messages[2]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `abc` is not supported for `transition-delay` (supported values are: `number of seconds`|`milliseconds`)',
      })
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
