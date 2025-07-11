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
    const { code } = await parse(
      `
        .content {
            top: var(--window-top);
            bottom: var(--window-bottom);
            height: var(--status-bar-height);
        }
        `,
      { type: 'uvue', map: true, ts: true }
    )
    expect(code).toMatchSnapshot()
  })
  test('css calc', async () => {
    const { code, messages } = await parse(
      `
        .content {
            top: calc(var(--window-top) + 10px);
            bottom: calc(10px - var(--window-bottom));
            height: calc(var(--status-bar-height) * 2);
        }
        `,
      { type: 'uvue', platform: 'app-android', map: true, ts: true }
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
    expect(JSON.parse(code)).toEqual({
      top: {
        '': {
          paddingLeft: 'env(safe-area-inset-top,20px)',
          paddingRight: 'env(safe-area-inset-top,20px)',
          paddingTop: 'env(safe-area-inset-top)',
        },
      },
    })
    expect(messages).toHaveLength(0)
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
