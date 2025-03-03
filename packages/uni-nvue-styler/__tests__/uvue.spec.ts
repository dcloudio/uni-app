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
      { type: 'uvue', mapOf: 'utsMapOf', chunk: 2 }
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
      { type: 'uvue', mapOf: 'utsMapOf', chunk: 2 }
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
      { type: 'uvue', mapOf: 'utsMapOf', chunk: 2, trim: true }
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
      { type: 'uvue', map: true, ts: true }
    )
    expect(messages).toHaveLength(0)
    expect(code).toMatchSnapshot()
  })

  test('support env', async () => {
    const {
      code,
      // messages
    } = await parse(
      `.top {
    padding-top: env(safe-area-inset-top, 20px);
    padding-left: env(
      safe-area-inset-top,
      20px
    );
  }`,
      { type: 'uvue', map: true, ts: true }
    )
    expect(code).toMatchSnapshot()
  })
})
