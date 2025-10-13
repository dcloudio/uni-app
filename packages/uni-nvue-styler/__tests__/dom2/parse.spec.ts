import { DOM2_APP_PLATFORM, DOM2_APP_TARGET, parse } from '../../src/index'

describe('dom2 parse', () => {
  test('basic', async () => {
    const { code } = await parse(
      `
        .content {
            display: flex;
        } 
        .logo {
            width: 200px;
            height: 200px;
        }
        .text-area, .title {
            font-size: 36px;
        }
        `,
      {
        type: 'uvue',
        dom2: {
          platform: DOM2_APP_PLATFORM.APP_HARMONY,
          target: DOM2_APP_TARGET.DOM_C,
        },
      }
    )
    expect(code).toMatchSnapshot()
  })
})
