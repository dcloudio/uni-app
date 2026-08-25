import { parse } from '../src/index'

describe('uvue-style', () => {
  test('js', async () => {
    const { code } = await parse(
      `
        .content {
            display: flex;
        } 
        .content .logo {
            width: 200rpx;
            height: 200rpx;
        }
        .text-area, .title {
            font-size: 36rpx;
        }
        `,
      { type: 'uvue', map: true }
    )
    expect(code).toMatchSnapshot()
  })
  test('ts', async () => {
    const { code } = await parse(
      `
        .content {
            display: flex;
        } 
        .content .logo {
            width: 200rpx;
            height: 200rpx;
        }
        .text-area, .title {
            font-size: 36rpx;
        }
        `,
      { type: 'uvue', map: true, ts: true }
    )
    expect(code).toMatchSnapshot()
  })
  test('chunk', async () => {
    const { code } = await parse(
      `
        .content {
            display: flex;
        } 
        .content .logo {
            width: 200rpx;
            height: 200rpx;
        }
        .text-area, .title {
            font-size: 36rpx;
        }
        `,
      { type: 'uvue', map: true, ts: true, chunk: 2 }
    )
    expect(code).toMatchSnapshot()
  })
  test('chunk with mapOf', async () => {
    const { code } = await parse(
      `
        .content {
            display: flex;
        } 
        .content .logo {
            width: 200rpx;
            height: 200rpx;
        }
        .text-area, .title {
            font-size: 36rpx;
        }
        `,
      {
        type: 'uvue',
        mapOf: 'utsMapOf',
        padStyleMapOf: 'padStyleMapOf',
        chunk: 2,
      }
    )
    expect(code).toMatchSnapshot()
  })
  test('chunk font-face', async () => {
    const { code } = await parse(
      `
        @font-face { 
          font-family: "font-family-name-1"; 
          src: url("font file url 1-1") format("truetype");
        }
        .content {
            display: flex;
        } 
        .content .logo {
            width: 200rpx;
            height: 200rpx;
        }
        .text-area, .title {
            font-size: 36rpx;
            transition-property: margin-top; 
            transition-duration: 300ms;
        }
        `,
      { type: 'uvue', map: true, ts: true, chunk: 2 }
    )
    expect(code).toMatchSnapshot()
  })
  test('chunk font-face with mapOf', async () => {
    const { code } = await parse(
      `
        @font-face { 
          font-family: "font-family-name-1"; 
          src: url("font file url 1-1") format("truetype");
        }
        .content {
            display: flex;
        } 
        .content .logo {
            width: 200rpx;
            height: 200rpx;
        }
        .text-area, .title {
            font-size: 36rpx;
            transition-property: margin-top; 
            transition-duration: 300ms;
        }
        `,
      {
        type: 'uvue',
        mapOf: 'utsMapOf',
        padStyleMapOf: 'padStyleMapOf',
        chunk: 2,
      }
    )
    expect(code).toMatchSnapshot()
  })
  test('chunk font-face with mapOf and trim', async () => {
    const { code } = await parse(
      `
        @font-face { 
          font-family: "font-family-name-1"; 
          src: url("font file url 1-1") format("truetype");
        }
        .content {
            display: flex;
        } 
        .content .logo {
            width: 200rpx;
            height: 200rpx;
        }
        .text-area, .title {
            font-size: 36rpx;
            transition-property: margin-top; 
            transition-duration: 300ms;
        }
        `,
      {
        type: 'uvue',
        mapOf: 'utsMapOf',
        padStyleMapOf: 'padStyleMapOf',
        chunk: 2,
        trim: true,
      }
    )
    expect(code).toMatchSnapshot()
  })
  test('css var', async () => {
    const { code, messages } = await parse(
      `
        .content {
            top: var(--window-top);
            bottom: var(--window-bottom);
            height: var(--status-bar-height);
        }
        `,
      { type: 'uvue', platform: 'app-android', map: true, ts: true }
    )
    expect(messages).toHaveLength(0)
    expect(code).toMatchSnapshot()

    const res2 = await parse(
      ` .test {
          --border-top-color: red;
          border-top-color: var(--border-top-color);
        }
        `,
      { type: 'uvue', platform: 'app-ios' }
    )
    expect(res2.messages).toHaveLength(0)
    expect(JSON.parse(res2.code)).toEqual({
      test: {
        '': {
          '--border-top-color': 'red',
          borderTopColor: 'var(--border-top-color)',
        },
      },
    })
  })
  test('css calc 不支持', async () => {
    const { code, messages } = await parse(
      `.content {
            top: calc(var(--window-top) + 10px);
            bottom: calc(10px - var(--window-bottom));
            height: calc(var(--status-bar-height) * 2);
        }`,
      { type: 'uvue', platform: 'app-android', map: true, ts: true }
    )
    expect(messages).toHaveLength(3)
    expect(code).toMatchSnapshot()

    const res2 = await parse(
      `.content {
          width: calc(100% - 20px);
          top: calc(var(--window-top) + 10px);
        }
        `,
      { type: 'uvue', platform: 'app-android', logLevel: 'WARNING' }
    )
    expect(res2.messages).toHaveLength(2)
    expect(res2.code).toBe('{}')
  })

  test('dom2 支持 css calc', async () => {
    const { code, messages } = await parse(
      `.content {
          width: calc(100% - 20px);
          height: CALC(100% - 10px);
          top: calc(var(--window-top) + 10px);
          padding-bottom: calc(100px - env(safe-area-inset-bottom));
          margin: calc(10px + 2px) 5px;
        }`,
      {
        type: 'uvue',
        dom2: true,
        platform: 'app-android',
        map: true,
        ts: true,
      }
    )

    expect(messages).toHaveLength(0)
    expect(code).toMatchSnapshot()
  })

  test('dom2 仅放行底层已支持的 css calc 属性', async () => {
    const { code, messages } = await parse(
      `.content {
          border-width: calc(10px + 2px);
          font-size: calc(10px + 2px);
          font-weight: CALC(var(--font-weight) + 100);
          line-height: calc(10px + 2px);
          min-width: calc(10px + 2px);
          min-height: calc(10px + 2px);
          max-width: calc(10px + 2px);
          max-height: calc(10px + 2px);
          flex-basis: calc(10px + 2px);
        }`,
      {
        type: 'uvue',
        dom2: true,
        platform: 'app-android',
        map: true,
        ts: true,
      }
    )

    expect(messages).toHaveLength(12)
    expect(code).toBe('new Map<string, Map<string, Map<string, any>>>([])')
  })

  test('dom2 支持 render 属性中的 css calc', async () => {
    const { code, messages } = await parse(
      `.content {
          border-radius: CALC(10% - 2px);
          border-bottom-left-radius: calc(10% - 2px);
          border-bottom-right-radius: calc(10% - 2px);
          border-top-left-radius: calc(10% - 2px);
          border-top-right-radius: calc(10% - 2px);
          transform: translateX(CALC(100% - 10px));
          transform-origin: calc(50% - 10px) calc(50% + 10px);
          box-shadow: calc(10px + 2px) 0 2px #000000;
          text-shadow: 0 calc(10px + 2px) 2px #000000;
          backdrop-filter: blur(CALC(10px + 2px));
          opacity: calc(1 - 0.2);
        }`,
      {
        type: 'uvue',
        dom2: true,
        platform: 'app-android',
        map: true,
        ts: true,
      }
    )

    expect(messages).toHaveLength(0)
    expect(code).toMatchSnapshot()
  })

  test('support env', async () => {
    const { code, messages } = await parse(
      `.top {
    padding-right: env(safe-area-inset-top, 20px);
    padding-top: env(safe-area-inset-top);
    padding-left: env(
      safe-area-inset-top,
      20px
    );
  }`,
      { type: 'uvue', platform: 'app-android' }
    )
    expect(messages).toHaveLength(0)
    expect(JSON.parse(code)).toEqual({
      top: {
        '': {
          paddingLeft: 'env(safe-area-inset-top,20px)',
          paddingRight: 'env(safe-area-inset-top,20px)',
          paddingTop: 'env(safe-area-inset-top)',
        },
      },
    })

    const res2 = await parse(
      `.top {
      padding-bottom: calc(100px - env(safe-area-inset-bottom));
    }`,
      { type: 'uvue', platform: 'app-android' }
    )

    expect(res2.messages).toHaveLength(1)
    expect(res2.code).toBe('{}')
  })

  test('support css text-shadow', async () => {
    const { code, messages } = await parse(
      `
        .content {
            text-shadow: 1px 1px 1px #000;
        }
        `,
      { type: 'uvue', platform: 'app-android', map: true, ts: true }
    )
    expect(code).toMatchSnapshot()
    expect(messages).toHaveLength(0)
  })

  test('css var --uni-safe-area-inset-[postion]', async () => {
    const { code, messages } = await parse(
      `
.bar {
  padding-top: var(--uni-safe-area-inset-top);
  padding-left: var(--uni-safe-area-inset-top, 10px);
}

`,
      { type: 'uvue', platform: 'app-android' }
    )

    expect(JSON.parse(code)).toEqual({
      bar: {
        '': {
          paddingTop: 'var(--uni-safe-area-inset-top)',
          paddingLeft: 'var(--uni-safe-area-inset-top, 10px)',
        },
      },
    })
    expect(messages.length).toBe(0)
  })

  test('flex', async () => {
    const { code, messages } = await parse(
      `
        .content {
            flex: 1;
        }
        `,
      { type: 'uvue', platform: 'app-android' }
    )
    expect(JSON.parse(code)).toEqual({
      content: {
        '': {
          flexBasis: '0%',
          flexGrow: 1,
          flexShrink: 1,
        },
      },
    })
    expect(messages).toHaveLength(0)

    const res2 = await parse(
      `
        .content {
            flex: -1;
        }
        .content2 {
            flex: 100px;
        }
        .content3 {
            flex: auto;
        }
        `,
      { type: 'uvue', platform: 'app-android' }
    )
    expect(res2.messages).toHaveLength(0)
    expect(JSON.parse(res2.code)).toEqual({
      content2: {
        '': {
          flexBasis: '100px',
          flexGrow: 1,
          flexShrink: 1,
        },
      },
      content3: {
        '': {
          flexBasis: 'auto',
          flexGrow: 1,
          flexShrink: 1,
        },
      },
    })
  })
})

// link: parse-nvue.spec.ts
describe('uvue 部分 css 改动', () => {
  test('border', async () => {
    const { code, messages } = await parse(
      `.foo {
  border: 1px solid red;
}
  .a{
border-top:1px solid red;
}
.b{
border-width:1px;
border-style: solid;
border-color: red;
}
.c{
border-top-width:1px;
border-top-color: red;
border-top-style: solid;
}
        `,
      { type: 'uvue', platform: 'app-ios' }
    )
    expect(JSON.parse(code)).toEqual({
      foo: {
        '': {
          borderBottomColor: '#FF0000',
          borderBottomStyle: 'solid',
          borderBottomWidth: 1,
          borderLeftColor: '#FF0000',
          borderLeftStyle: 'solid',
          borderLeftWidth: 1,
          borderRightColor: '#FF0000',
          borderRightStyle: 'solid',
          borderRightWidth: 1,
          borderTopColor: '#FF0000',
          borderTopStyle: 'solid',
          borderTopWidth: 1,
        },
      },
      a: {
        '': {
          borderTopColor: '#FF0000',
          borderTopStyle: 'solid',
          borderTopWidth: 1,
        },
      },
      b: {
        '': {
          borderBottomColor: '#FF0000',
          borderBottomStyle: 'solid',
          borderBottomWidth: 1,
          borderLeftColor: '#FF0000',
          borderLeftStyle: 'solid',
          borderLeftWidth: 1,
          borderRightColor: '#FF0000',
          borderRightStyle: 'solid',
          borderRightWidth: 1,
          borderTopColor: '#FF0000',
          borderTopStyle: 'solid',
          borderTopWidth: 1,
        },
      },
      c: {
        '': {
          borderTopColor: '#FF0000',
          borderTopStyle: 'solid',
          borderTopWidth: 1,
        },
      },
    })
    expect(messages).toHaveLength(0)
  })
  test('background', async () => {
    const { code, messages } = await parse(
      `
.a {
  background: #ffffff;
}
.b {
  background: rgba(255,255,255,1);
}
.c {
  background: rgb(255,255,255);
}
.d {
  background: linear-gradient(#e66465, #9198e5);
}
        `,
      { type: 'uvue', platform: 'app-ios' }
    )
    expect(JSON.parse(code)).toEqual({
      a: {
        '': {
          backgroundColor: '#ffffff',
          backgroundImage: 'none',
        },
      },
      b: {
        '': {
          backgroundColor: 'rgba(255,255,255,1)',
          backgroundImage: 'none',
        },
      },
      c: {
        '': {
          backgroundColor: 'rgb(255,255,255)',
          backgroundImage: 'none',
        },
      },
      d: {
        '': {
          backgroundColor: 'rgba(0,0,0,0)',
          backgroundImage: 'linear-gradient(#e66465, #9198e5)',
        },
      },
    })
    expect(messages).toHaveLength(0)
  })
})
