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
      { map: true }
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
      { map: true, ts: true }
    )
    expect(code).toMatchSnapshot()
  })
})
