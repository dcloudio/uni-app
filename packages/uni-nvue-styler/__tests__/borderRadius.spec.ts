import { parse } from '../src'
import type { NormalizeOptions } from '../src/utils'

const properties = [
  'border-top-left-radius',
  'border-top-right-radius',
  'border-bottom-left-radius',
  'border-bottom-right-radius',
]
const platforms: NormalizeOptions['platform'][] = [
  'app-android',
  'app-ios',
  'app-harmony',
]
const options = platforms.flatMap((platform) =>
  [false, true].flatMap((dom2) =>
    [false, true].map((keepUnitPx) => ({
      type: 'uvue' as const,
      platform,
      dom2,
      keepUnitPx,
    }))
  )
)
const tip =
  '(two radius values are not supported on this platform; use a single radius value instead)'

describe.each(options)('单角圆角诊断 %j', (options) => {
  test('双值报错保留原始值且移除声明', async () => {
    const values = [
      '200px 12px',
      '+200px 12px',
      '-0px 12px',
      '20% 12px',
      '.5rpx 0',
      '200px\t12px',
    ]
    if (options.dom2) {
      values.push(
        'calc(200px) 12px',
        '12px calc(200px)',
        'calc(50% - 8px) calc(10px + 2px)',
        'CALC(50% - calc(2px + 1px)) 12px',
        'calc(var(--radius, 20px) + 2px) 12px'
      )
    }
    for (const property of properties) {
      for (const value of values) {
        const { code, messages } = await parse(
          `.foo { ${property}: ${value}; }`,
          options
        )
        expect(code).toBe('{}')
        expect(messages.map((message) => message.text)).toEqual([
          `ERROR: property value \`${value}\` is not supported for \`${property}\` ${tip}` +
            (options.dom2
              ? ` 详见：https://doc.dcloud.net.cn/uni-app-x/css/${property}.html#suggestion`
              : ''),
        ])
      }
    }
  })

  test('单值保留原有转换结果', async () => {
    for (const [value, expected] of [
      ['+12px', options.keepUnitPx ? '"+12px"' : '12'],
      ['-0px', options.keepUnitPx ? '"-0px"' : '0'],
      ['20%', '"20%"'],
    ]) {
      const { code, messages } = await parse(
        `.foo { border-bottom-right-radius: ${value}; }`,
        options
      )
      expect(messages).toHaveLength(0)
      expect(code).toBe(`{"foo":{"":{"borderBottomRightRadius":${expected}}}}`)
    }
    const value = 'calc(50% - 8px)'
    const { code, messages } = await parse(
      `.foo { border-bottom-right-radius: ${value}; }`,
      options
    )
    if (options.dom2) {
      expect(messages).toHaveLength(0)
      expect(code).toBe(`{"foo":{"":{"borderBottomRightRadius":${value}}}}`)
    } else {
      expect(code).toBe('{}')
      expect(messages).toHaveLength(1)
      expect(messages[0].text).toContain('supported values are:')
    }
  })

  test('其他非法值保留通用报错', async () => {
    for (const value of ['abc def', '-1px 12px', '1pt 12px', '12px 1px 2px']) {
      const { code, messages } = await parse(
        `.foo { border-bottom-right-radius: ${value}; }`,
        options
      )
      expect(code).toBe('{}')
      expect(messages).toHaveLength(1)
      expect(messages[0].text).toContain('supported values are:')
      expect(messages[0].text).not.toContain(tip)
    }
  })

  test('普通简写和 CSS 变量保持兼容', async () => {
    const { code, messages } = await parse(
      '.foo { border-radius: 200px 12px; }',
      options
    )
    expect(messages).toHaveLength(0)
    const large = options.keepUnitPx ? '200px' : 200
    const small = options.keepUnitPx ? '12px' : 12
    expect(JSON.parse(code)).toEqual({
      foo: {
        '': {
          borderTopLeftRadius: large,
          borderTopRightRadius: small,
          borderBottomRightRadius: large,
          borderBottomLeftRadius: small,
        },
      },
    })
    const variable = await parse(
      '.foo { border-bottom-right-radius: var(--radius, 12px); }',
      options
    )
    expect(variable.messages).toHaveLength(0)
    expect(variable.code).toContain('var(--radius, 12px)')
  })
})

test('nvue 不应用 uvue 的圆角诊断', async () => {
  const { code, messages } = await parse(
    '.foo { border-bottom-right-radius: 200px 12px; }',
    { type: 'nvue' }
  )
  expect(code).toBe('{}')
  expect(messages.map((message) => message.text)).toEqual([
    'ERROR: property value `200px 12px` is not supported for `border-bottom-right-radius` (supported values are: `number`|`pixel`)',
  ])
})
