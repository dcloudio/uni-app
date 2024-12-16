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
maxWidth: max-content;
height: 100%;
paddingLeft: 300;
borderWidth: 1pt;
left: 0;
right: 0px;
top: auto;
bottom: 100%;
marginRight: asdf;
paddingTop: 11upx;
paddingBottom: 11rpx;
}`)
    expect(json).toEqual({
      foo: {
        '': {
          width: 200,
          minWidth: 100,
          height: '100%',
          paddingLeft: 300,
          left: 0,
          right: 0,
          top: 'auto',
          bottom: '100%',
          paddingBottom: '11rpx',
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'ERROR: property value `max-content` is not supported for `max-width` (supported values are: `number`|`pixel`)',
      })
    )
    expect(messages[1]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'ERROR: property value `1pt` is not supported for `border-width` (supported values are: `number`|`pixel`|`thin`|`medium`|`thick`)',
      })
    )
    expect(messages[2]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'ERROR: property value `asdf` is not supported for `margin-right` (supported values are: `number`|`pixel`|`percent`|`auto`)',
      })
    )
    expect(messages[3]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'ERROR: property value `11upx` is not supported for `padding-top` (supported values are: `number`|`pixel`|`percent`)',
      })
    )
  })

  test('enum', async () => {
    const { json, messages } = await objectifierRule(`.foo{
position: absolute;
display: flex;
flexDirection: row;
alignItems: baseline;
alignContent: stretch;
justifyContent: center;
flexWrap: nowrap;
overflow: auto;
boxSizing: content-box;
backgroundClip: padding-box;
borderLeftStyle: solid;
borderRightStyle: abc;
}`)
    expect(json).toEqual({
      foo: {
        '': {
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'stretch',
          justifyContent: 'center',
          flexWrap: 'nowrap',
          boxSizing: 'content-box',
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
        text: 'ERROR: property value `auto` is not supported for `overflow` (supported values are: `visible`|`hidden`)',
      })
    )
    expect(messages[2]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'ERROR: property value `padding-box` is not supported for `background-clip` (supported values are: `border-box`)',
      })
    )
    expect(messages[3]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'ERROR: property value `abc` is not supported for `border-right-style` (supported values are: `none`|`solid`|`dashed`|`dotted`)',
      })
    )
  })

  test('combined: length percentage enum', async () => {
    const { json, messages } = await objectifierRule(`.foo{
width: 200px;
maxWidth: 500px;
height: max-content;
marginLeft: 10px;
marginRight: 10rpx;
marginTop: 10%;
marginBottom: auto;
top: 20%;
bottom: 30xx;
left: auto;
right: abc;
flexBasis: fill;
}`)
    expect(json).toEqual({
      foo: {
        '': {
          width: 200,
          maxWidth: 500,
          marginLeft: 10,
          marginRight: '10rpx',
          marginTop: '10%',
          marginBottom: 'auto',
          top: '20%',
          left: 'auto',
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'ERROR: property value `max-content` is not supported for `height` (supported values are: `number`|`pixel`|`percent`|`auto`)',
      })
    )
    expect(messages[1]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'ERROR: property value `30xx` is not supported for `bottom` (supported values are: `number`|`pixel`|`percent`|`auto`)',
      })
    )
    expect(messages[2]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'ERROR: property value `abc` is not supported for `right` (supported values are: `number`|`pixel`|`percent`|`auto`)',
      })
    )
    expect(messages[3]).toEqual(
      expect.objectContaining({
        type: 'warning',
        text: 'ERROR: property value `fill` is not supported for `flex-basis` (supported values are: `number`|`pixel`|`percent`|`auto`)',
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
  test('integer', async () => {
    const { json, messages } = await objectifierRule(`
.foo{
  lines: 1;
  zIndex: 1;
},
.bar{
  lines: 0.5;
  zIndex: 0.5;
},
.baz{
  lines: a
},
.boo{
  lines: 0.5a
},
.zero{
  lines: 0
}
`)
    expect(json).toEqual({
      foo: {
        '': {
          lines: 1,
          zIndex: 1,
        },
      },
      zero: {
        '': {
          lines: 0,
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `0.5` is not supported for `lines` (supported values are: `integer`)',
      })
    )
    expect(messages[1]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `0.5` is not supported for `z-index` (supported values are: `integer`)',
      })
    )
    expect(messages[2]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `a` is not supported for `lines` (supported values are: `integer`)',
      })
    )
    expect(messages[3]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `0.5a` is not supported for `lines` (supported values are: `integer`)',
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

  test('string', async () => {
    const { json, messages } = await objectifierRule(`
.foo {
  fontFamily: "Gill Sans", sans-serif;
}
.bar {
  fontFamily: 'Goudy Bookletter 1911', sans-serif;
}
`)
    expect(json).toEqual({
      foo: {
        '': {
          fontFamily: 'Gill Sans, sans-serif',
        },
      },
      bar: {
        '': {
          fontFamily: 'Goudy Bookletter 1911, sans-serif',
        },
      },
    })
    expect(messages.length).toEqual(0)
  })

  test('image', async () => {
    const { json, messages } = await objectifierRule(`
.foo {
  backgroundImage: linear-gradient(
    to bottom,
    rgba(255,255,0,0.5),
    rgba(0,0,255,0.5)
  );
}
.bar {
  backgroundImage: url("test.png");
}
.baz {
  backgroundImage: linear-gradient(to bottom,rgba(255,255,0,0.5),rgba(0,0,255,0.5));
}
`)
    expect(json).toEqual({
      foo: {
        '': {
          backgroundImage: `linear-gradient(\n    to bottom,\n    rgba(255,255,0,0.5),\n    rgba(0,0,255,0.5)\n  )`,
        },
      },
      baz: {
        '': {
          backgroundImage: `linear-gradient(to bottom,rgba(255,255,0,0.5),rgba(0,0,255,0.5))`,
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `url("test.png")` is not supported for `background-image` (supported values are: `linear-gradient`|`none`)',
      })
    )
  })

  test('shorthand', async () => {
    const { json, messages } = await objectifierRule(`
.foo {
  margin: 100px;
  padding: 50px;
  flexFlow: row nowrap;
}
.bar {
  margin: 
    10px auto;
  flexFlow: row;
  padding: 10px auto;
}
.baz {
  margin: 
    10rpx 
    20px 
    30px;
  padding: 10px 
    20px 30px 40rpx;
}
.boo {
  margin: abc;
}
.flex {
  flex: 1;
  flex: auto;
  flex: 1 2;
  flex: 1 2 auto;
  flex: none;
}
.flex1 {
  flex: min-content;
  flex: 2 unset;
  flex: 1 abc 100px;
}
`)
    expect(json).toEqual({
      foo: {
        '': {
          marginLeft: 100,
          marginRight: 100,
          marginTop: 100,
          marginBottom: 100,
          paddingLeft: 50,
          paddingRight: 50,
          paddingTop: 50,
          paddingBottom: 50,
          flexFlow: 'row nowrap',
        },
      },
      bar: {
        '': {
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingBottom: 10,
          paddingTop: 10,
          flexFlow: 'row',
        },
      },
      baz: {
        '': {
          marginTop: '10rpx',
          marginBottom: 30,
          marginLeft: 20,
          marginRight: 20,
          paddingTop: 10,
          paddingBottom: 30,
          paddingLeft: '40rpx',
          paddingRight: 20,
        },
      },
      flex: {
        '': {
          flex: 'none',
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `row` is not supported for `flex-flow` (both property values must be explicitly defined)',
      })
    )
    expect(messages[1]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `min-content` is not supported for `flex` (supported values are: `number`|`pixel`|`initial`|`auto`|`none`)',
      })
    )
    expect(messages[2]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `2 unset` is not supported for `flex` (supported values are: `number`|`pixel`|`initial`|`auto`|`none`)',
      })
    )
    expect(messages[3]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `1 abc 100px` is not supported for `flex` (supported values are: `number`|`pixel`|`initial`|`auto`|`none`)',
      })
    )
    expect(messages[4]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `auto` is not supported for `padding-right` (supported values are: `number`|`pixel`|`percent`)',
      })
    )
    expect(messages[5]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `auto` is not supported for `padding-left` (supported values are: `number`|`pixel`|`percent`)',
      })
    )
    expect(messages[6]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `abc` is not supported for `margin-top` (supported values are: `number`|`pixel`|`percent`|`auto`)',
      })
    )
    expect(messages[7]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `abc` is not supported for `margin-right` (supported values are: `number`|`pixel`|`percent`|`auto`)',
      })
    )
    expect(messages[8]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `abc` is not supported for `margin-bottom` (supported values are: `number`|`pixel`|`percent`|`auto`)',
      })
    )
    expect(messages[9]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `abc` is not supported for `margin-left` (supported values are: `number`|`pixel`|`percent`|`auto`)',
      })
    )
  })

  test('@font-face', async () => {
    const { json, messages } = await objectifierRule(`
@font-face {
  fontFamily: "font-family";
  src: url("font file url") format("woff");
  fontWeight: bold;
  fontStyle: normal;
}
.foo {
  src: url("font file url") format("woff");
  fontWeight: bold;
  fontStyle: normal;
}
`)
    expect(json).toEqual({
      '@FONT-FACE': [
        {
          fontFamily: 'font-family',
          src: 'url("font file url") format("woff")',
        },
      ],
      foo: {
        '': {
          fontWeight: 'bold',
          fontStyle: 'normal',
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property `font-weight` is not supported for `@font-face` (supported properties are: `font-family`|`src`)',
      })
    )
    expect(messages[1]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property `font-style` is not supported for `@font-face` (supported properties are: `font-family`|`src`)',
      })
    )
    expect(messages[2]).toEqual(
      expect.objectContaining({
        text: 'WARNING: `src` is not a standard property name (may not be supported)',
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
  transition-delay: abc
},
.bar{
  transition-duration: 200;
  transition-delay: 0.5s
}
`)
    expect(json).toEqual({
      '@TRANSITION': {
        bar: {
          delay: '0.5s',
        },
        foo: {
          duration: '200ms',
        },
      },
      foo: {
        '': {
          transitionDuration: '200ms',
        },
      },
      bar: {
        '': {
          transitionDelay: '0.5s',
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `abc` is not supported for `transition-delay` (supported values are: `number of seconds`|`milliseconds`)',
      })
    )
    expect(messages[1]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `200` is not supported for `transition-duration` (supported values are: `number of seconds`|`milliseconds`)',
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
  test('remove px unit', async () => {
    const { json, messages } = await objectifierRule(`
.foo {
  width: 200px;
  line-height: 16px;
  flex: 30px;
}
.bar {
  line-height: 1.5;
  flex: 1;
}
.baz {
  line-height: 2em;
  flex: 1 30px 2;
}
.boo {
  line-height: abc;
  flex: 1 abc;
}
`)
    expect(json).toEqual({
      foo: {
        '': {
          width: 200,
          lineHeight: '16px',
          flex: '30px',
        },
      },
      bar: {
        '': {
          lineHeight: 1.5,
          flex: 1,
        },
      },
      baz: {
        '': {
          lineHeight: '2em',
          flex: '1 30px 2',
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `abc` is not supported for `line-height` (supported values are: `number`|`pixel`)',
      })
    )
    expect(messages[1]).toEqual(
      expect.objectContaining({
        text: 'ERROR: property value `1 abc` is not supported for `flex` (supported values are: `number`|`pixel`|`initial`|`auto`|`none`)',
      })
    )
  })
  test('current platform unsupported', async () => {
    const { json, messages } = await objectifierRule(`
.foo {
  textDecoration: underline dotted red;
  textDecorationColor: #21ff21;
  textDecorationStyle: dotted;
  textOverflow: ellipsis;
}
`)
    expect(json).toEqual({
      foo: {
        '': {
          textDecoration: 'underline dotted red',
          textDecorationColor: '#21ff21',
          textDecorationStyle: 'dotted',
          textOverflow: 'ellipsis',
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        text: 'WARNING: `text-decoration` is not a standard property name (may not be supported)',
      })
    )
    expect(messages[1]).toEqual(
      expect.objectContaining({
        text: 'WARNING: `text-decoration-color` is not a standard property name (may not be supported)',
      })
    )
    expect(messages[2]).toEqual(
      expect.objectContaining({
        text: 'WARNING: `text-decoration-style` is not a standard property name (may not be supported)',
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

  test.only('多次出现 border 不同形式，保证最后一个生效', async () => {
    const { json } = await objectifierRule(`
.test {
		border-left-color: red;
	}

	.test {
		width: 100px;
		height: 100px;
		border-width: 1px;
		border-color: blue;
		/* border-left-color: blue;border-top-color: blue;border-bottom-color: blue;border-right-color: blue; */
		border-style: solid;
	}
`)
    expect(json).toEqual({
      test: {
        '': {
          borderColor: '#0000FF',
          borderLeftColor: '#FF0000',
          borderStyle: 'solid',
          borderWidth: 1,
          height: 100,
          width: 100,
        },
      },
    })
  })
})
