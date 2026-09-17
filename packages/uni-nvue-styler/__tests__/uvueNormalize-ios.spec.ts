import { parse } from '../src'
import type { ParseOptions } from '../src/parse'

function withDom2PropertyDocs(message: string, property: string) {
  return `${message} 详见：https://doc.dcloud.net.cn/uni-app-x/css/${property}.html#suggestion`
}

// for uvue version
async function objectifierRule(input: string, options: ParseOptions = {}) {
  const opt = Object.assign({}, options, {
    logLevel: 'NOTE',
    type: 'uvue',
    platform: 'app-ios',
  })

  const { code, messages } = await parse(input, opt)

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
  .color-length-8 {
    color: #aaffffaa;
    background-color: #aaffffaa
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
      'color-length-8': {
        '': {
          color: '#aaffffaa',
          backgroundColor: '#aaffffaa',
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
.transition-property-all{
  transition-property: all
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
        'transition-property-all': {
          property: 'all',
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
      'transition-property-all': {
        '': {
          transitionProperty: 'all',
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
  test('dom2 platform support uses unixVaporVer', async () => {
    const { json, messages } = await objectifierRule(
      `
  .foo {
    textDecorationColor: #21ff21;
  }
  `,
      { dom2: true }
    )
    expect(json).toEqual({
      foo: {
        '': {
          textDecorationColor: '#21ff21',
        },
      },
    })
    expect(messages.length).toBe(0)
  })
  test('dom2 platform unsupported still warns', async () => {
    const { json, messages } = await objectifierRule(
      `
  .foo {
    textDecorationStyle: dotted;
  }
  `,
      { dom2: true }
    )
    expect(json).toEqual({
      foo: {
        '': {
          textDecorationStyle: 'dotted',
        },
      },
    })
    expect(messages[0]).toEqual(
      expect.objectContaining({
        text: withDom2PropertyDocs(
          'WARNING: `text-decoration-style` is not a standard property name (may not be supported)',
          'text-decoration-style'
        ),
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

  test('多次出现 border 不同形式，保证最后一个生效', async () => {
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
          borderTopColor: '#0000FF',
          borderRightColor: '#0000FF',
          borderBottomColor: '#0000FF',
          borderLeftColor: '#0000FF',
          borderTopStyle: 'solid',
          borderRightStyle: 'solid',
          borderBottomStyle: 'solid',
          borderLeftStyle: 'solid',
          borderTopWidth: 1,
          borderRightWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          height: 100,
          width: 100,
        },
      },
    })
  })

  test('多次出现 border 不同形式，保证最后一个生效2', async () => {
    const { json } = await objectifierRule(`
.test {
		width: 100px;
		height: 100px;
		border-width: 1px;
		border-color: blue;
		/* border-left-color: blue;border-top-color: blue;border-bottom-color: blue;border-right-color: blue; */
		border-style: solid;
	}
  .test {
		border-left-color: red;
	}
`)
    expect(json).toEqual({
      test: {
        '': {
          borderTopColor: '#0000FF',
          borderRightColor: '#0000FF',
          borderBottomColor: '#0000FF',
          borderLeftColor: '#FF0000',
          borderTopStyle: 'solid',
          borderRightStyle: 'solid',
          borderBottomStyle: 'solid',
          borderLeftStyle: 'solid',
          borderTopWidth: 1,
          borderRightWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          height: 100,
          width: 100,
        },
      },
    })
  })

  // test --border-top-color: red
  test('test --border-top-color: red', async () => {
    const { json } = await objectifierRule(`
.test {
--border-top-color: red;
border-top-color: var(--border-top-color);
}
.foo {
--default-border: red;
border-color: var(--default-border);
}
.a1{
  --color1: red;
  --width1: 1px;
  --style1: solid;
  border:  var(--width1) var(--style1) var(--color1)
}
.a2{
  --top-width: 1px;
  --left-width: 2px;
  padding: var(--top-width) var(--left-width);
}
.a3{
  --default-border: 1px;
  border: var(--default-border);
}
  `)
    expect(json).toEqual({
      test: {
        '': {
          '--border-top-color': 'red',
          borderTopColor: 'var(--border-top-color)',
        },
      },
      foo: {
        '': {
          '--default-border': 'red',
          borderBottomColor: 'var(--default-border)',
          borderLeftColor: 'var(--default-border)',
          borderRightColor: 'var(--default-border)',
          borderTopColor: 'var(--default-border)',
        },
      },
      a1: {
        '': {
          '--color1': 'red',
          '--width1': '1px',
          '--style1': 'solid',
          borderBottomColor: 'var(--color1)',
          borderBottomStyle: 'var(--style1)',
          borderBottomWidth: 'var(--width1)',
          borderLeftColor: 'var(--color1)',
          borderLeftStyle: 'var(--style1)',
          borderLeftWidth: 'var(--width1)',
          borderRightColor: 'var(--color1)',
          borderRightStyle: 'var(--style1)',
          borderRightWidth: 'var(--width1)',
          borderTopColor: 'var(--color1)',
          borderTopStyle: 'var(--style1)',
          borderTopWidth: 'var(--width1)',
        },
      },
      a2: {
        '': {
          '--left-width': '2px',
          '--top-width': '1px',
          paddingBottom: 'var(--top-width)',
          paddingLeft: 'var(--left-width)',
          paddingRight: 'var(--left-width)',
          paddingTop: 'var(--top-width)',
        },
      },
      a3: {
        '': {
          '--default-border': '1px',
          borderBottomColor: 'var(--default-border)',
          borderBottomStyle: 'var(--default-border)',
          borderBottomWidth: 'var(--default-border)',
          borderLeftColor: 'var(--default-border)',
          borderLeftStyle: 'var(--default-border)',
          borderLeftWidth: 'var(--default-border)',
          borderRightColor: 'var(--default-border)',
          borderRightStyle: 'var(--default-border)',
          borderRightWidth: 'var(--default-border)',
          borderTopColor: 'var(--default-border)',
          borderTopStyle: 'var(--default-border)',
          borderTopWidth: 'var(--default-border)',
        },
      },
    })
  })

  test('border shorthand with css var must use width style color order', async () => {
    const { json, messages } = await objectifierRule(`
.test {
  --arrow-color: #999999;
  border-right: 1px var(--arrow-color, #999999) solid;
}
    `)

    expect(json).toEqual({
      test: {
        '': {
          '--arrow-color': '#999999',
        },
      },
    })
    expect(messages).toHaveLength(1)
    expect(messages[0].text).toBe(
      'ERROR: property value `1px var(--arrow-color, #999999) solid` is not supported for `border-right` (border shorthand with CSS variables must follow `width style color`, for example: `1px solid var(--color, #999999)`)'
    )
  })

  test('多次出现 border 不同形式，保证最后一个生效', async () => {
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
          borderTopColor: '#0000FF',
          borderRightColor: '#0000FF',
          borderBottomColor: '#0000FF',
          borderLeftColor: '#0000FF',
          borderTopStyle: 'solid',
          borderRightStyle: 'solid',
          borderBottomStyle: 'solid',
          borderLeftStyle: 'solid',
          borderTopWidth: 1,
          borderRightWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          height: 100,
          width: 100,
        },
      },
    })
  })

  test('测试 ::v-deep 的样式', async () => {
    const { json, messages } = await objectifierRule(`
.box ::v-deep .text1 {
  color: #fff000;
}
.box1 ::v-deep .box2 ::v-deep  .box3 {
  color: #000000;
}
`)
    // console.log(messages)
    expect(messages.length).toBe(0)
    expect(json).toEqual({
      text1: {
        '.box ': {
          color: '#fff000',
        },
      },
      box3: {
        '.box1 .box2 ': {
          color: '#000000',
        },
      },
    })
  })

  test('测试 ::v-deep(.xxx) 的样式', async () => {
    const { json, messages } = await objectifierRule(`
.box :deep(.text1) {
  color: #fff000;
}
.box :deep(.box2 .text2) {
  color: #000000;
}
.box .box3 .text3 {
  color: #000000;
}

`)
    expect(messages.length).toBe(0)
    expect(json).toEqual({
      text1: {
        '.box ': {
          color: '#fff000',
        },
      },
      text2: {
        '.box .box2 ': {
          color: '#000000',
        },
      },
      text3: {
        '.box .box3 ': {
          color: '#000000',
        },
      },
    })
  })

  test('css var 全局定义产生编码错误', async () => {
    const res = await objectifierRule(
      `
  --color: #fff000;
  .box {
    color: var(--color);
  }
  .box1{color:#FF0000}
`,
      {
        filename: 'index.uvue?vue&type=style&index=0&lang.css',
      }
    )
    expect(res.json).toEqual({
      box: {
        '': {
          color: 'var(--color)',
        },
      },
      box1: {
        '': {
          color: '#FF0000',
        },
      },
    })
    expect(res.messages.length).toBe(1)

    const res2 = await objectifierRule(`
  --color: #fff000;
  .box {
    color: var(--color);
  }
  .box1{color:#FF0000}
`)
    expect(res2.json).toEqual({
      '--color': '#fff000',
      box: {
        '': {
          color: 'var(--color)',
        },
      },
      box1: {
        '': {
          color: '#FF0000',
        },
      },
    })
    expect(res2.messages.length).toBe(0)
  })

  test('animation values respect dom2 platform support', async () => {
    const { json, messages } = await objectifierRule(
      `
.longhand {
  animation-direction: reverse, alternate-reverse;
  animation-fill-mode: none, backwards, both, forwards;
}
.shorthand {
  animation: fade 1s reverse both;
}
`,
      { dom2: true }
    )
    expect(json).toEqual({})
    expect(messages.map((message) => message.text)).toEqual([
      withDom2PropertyDocs(
        'ERROR: property value `reverse, alternate-reverse` is not supported for `animation-direction` (supported values are: `alternate`|`normal`)',
        'animation-direction'
      ),
      withDom2PropertyDocs(
        'ERROR: property value `none, backwards, both, forwards` is not supported for `animation-fill-mode` (supported values are: `forwards`)',
        'animation-fill-mode'
      ),
      withDom2PropertyDocs(
        'ERROR: property value `reverse` is not supported for `animation-direction` (supported values are: `alternate`|`normal`)',
        'animation-direction'
      ),
      withDom2PropertyDocs(
        'ERROR: property value `both` is not supported for `animation-fill-mode` (supported values are: `forwards`)',
        'animation-fill-mode'
      ),
    ])
  })
})
