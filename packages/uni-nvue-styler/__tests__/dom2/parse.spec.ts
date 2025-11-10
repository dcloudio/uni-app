import { DOM2_APP_PLATFORM, DOM2_APP_TARGET, parse } from '../../src/index'

const fixMessageInputFile = (messages: any[]) => {
  messages.forEach((i) => {
    const file = i?.node?.source?.input?.file
    if (file) {
      // 兼容 Unix 路径 (/) 和 Windows 路径 (\)
      i.node.source.input.file = file.split(/[/\\]/).pop()
    }
  })
}

describe('dom2 parse', () => {
  test('basic', async () => {
    const { code, messages } = await parse(
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
        .invalid {
          display: grid;
          grid-auto-rows: 200px;
        }
        `,
      {
        type: 'uvue',
        platform: 'app-harmony',
        filename: 'foo.css',
        dom2: {
          platform: DOM2_APP_PLATFORM.APP_HARMONY,
          target: DOM2_APP_TARGET.DOM_C,
        },
      }
    )
    expect(code).toMatchSnapshot()

    fixMessageInputFile(messages)
    expect(messages).toMatchSnapshot()
  })
  test('variable', async () => {
    const { code } = await parse(
      `
      .content {
        --color: red;
        --font-size: 16px;
        color: var(--color);
        font-size: var(--font-size);
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
  test('null', async () => {
    const { code } = await parse(`.foo{box-shadow: none;}`, {
      type: 'uvue',
      dom2: {
        platform: DOM2_APP_PLATFORM.APP_HARMONY,
        target: DOM2_APP_TARGET.DOM_C,
      },
    })
    expect(code).toMatchSnapshot()
  })
  test('empty', async () => {
    const { code } = await parse(``, {
      type: 'uvue',
      dom2: {
        platform: DOM2_APP_PLATFORM.APP_HARMONY,
        target: DOM2_APP_TARGET.DOM_C,
      },
    })
    expect(code).toMatchSnapshot()
  })
  test('comment', async () => {
    const { code } = await parse(
      `
.content {
  margin: 0 /* auto */;
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
  test('transform', async () => {
    const { code } = await parse(
      `
.content {
  transform: translate(0%, 0%) scaleX(1) rotate(0deg);
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
