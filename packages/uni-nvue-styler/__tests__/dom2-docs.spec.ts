import { parse } from '../src'
import { decodeFontFamily } from '../src/utils/fontFamily'

const PROPERTY_DOCS_BASE_URL = 'https://doc.dcloud.net.cn/uni-app-x/css'
const SELECTOR_DOCS_URL = `${PROPERTY_DOCS_BASE_URL}/common/selector.html#selector`
const FONT_FACE_DOCS_URL = `${PROPERTY_DOCS_BASE_URL}/common/at-rules.html#tips`

function parseDom2(input: string) {
  return parse(input, {
    dom2: true,
    logLevel: 'WARNING',
    platform: 'app-android',
    type: 'uvue',
  })
}

describe('uvue-styler: dom2 warning documentation', () => {
  test('adds property documentation to property value warnings', async () => {
    const { messages } = await parseDom2('.foo { width: abc; }')

    expect(messages[0].text).toBe(
      'ERROR: property value `abc` is not supported for `width` (supported values are: `number`|`pixel`|`percent`|`auto`) ' +
        `详见：${PROPERTY_DOCS_BASE_URL}/width.html#suggestion`
    )
  })

  test('adds selector documentation to selector warnings', async () => {
    const { messages } = await parseDom2('#foo { width: 1px; }')

    expect(messages[0].text).toBe(
      'ERROR: Selector `#foo` is not supported. uvue only support classname selector ' +
        `详见：${SELECTOR_DOCS_URL}`
    )
  })

  test('does not add documentation to unknown property warnings', async () => {
    const { messages } = await parseDom2('.foo { unknown-prop: 1; }')

    expect(messages[0].text).toBe(
      'WARNING: `unknown-prop` is not a standard property name (may not be supported)'
    )
  })

  test('adds property documentation to known unsupported properties', async () => {
    const { messages } = await parseDom2(
      '.foo { text-decoration-style: dotted; }'
    )

    expect(messages[0].text).toBe(
      'WARNING: `text-decoration-style` is not a standard property name (may not be supported) ' +
        `详见：${PROPERTY_DOCS_BASE_URL}/text-decoration-style.html#suggestion`
    )
  })

  test('adds at-rule documentation to font-face context warnings', async () => {
    const { messages } = await parseDom2(`
@font-face {
  font-family: test;
  font-weight: 700;
}
.foo {
  src: url(test.ttf);
}
`)

    expect(messages.map((message) => message.text)).toEqual([
      'ERROR: property `font-weight` is not supported for `@font-face` (supported properties are: `font-family`|`src`) ' +
        `详见：${FONT_FACE_DOCS_URL}`,
      'WARNING: `src` is not a standard property name (may not be supported) ' +
        `详见：${FONT_FACE_DOCS_URL}`,
    ])
  })

  test('uses the reported animation longhand for documentation', async () => {
    const { messages } = await parseDom2(
      '.foo { animation: fade 1s reverse both; }'
    )

    expect(messages.map((message) => message.text)).toEqual([
      'ERROR: property value `reverse` is not supported for `animation-direction` (supported values are: `alternate`|`normal`) ' +
        `详见：${PROPERTY_DOCS_BASE_URL}/animation-direction.html#suggestion`,
      'ERROR: property value `both` is not supported for `animation-fill-mode` (supported values are: `forwards`) ' +
        `详见：${PROPERTY_DOCS_BASE_URL}/animation-fill-mode.html#suggestion`,
    ])
  })

  test('adds property documentation to shorthand expansion warnings', async () => {
    const { messages } = await parseDom2(
      '.foo { border: solid 1px var(--color); }'
    )

    expect(messages[0].text).toBe(
      'ERROR: property value `solid 1px var(--color)` is not supported for `border` (border shorthand with CSS variables must follow `width style color`, for example: `1px solid var(--color, #999999)`) ' +
        `详见：${PROPERTY_DOCS_BASE_URL}/border.html#suggestion`
    )
  })

  test('keeps non-dom2 warning text unchanged', async () => {
    const { messages } = await parse('.foo { width: abc; }', {
      logLevel: 'WARNING',
      platform: 'app-android',
      type: 'uvue',
    })

    expect(messages[0].text).toBe(
      'ERROR: property value `abc` is not supported for `width` (supported values are: `number`|`pixel`|`percent`|`auto`)'
    )
  })
})

test.each([
  [true, "O'Reilly"],
  [false, 'OReilly'],
])('字体解码仅调整 DOM2，保留非 DOM2 原有行为：%s', async (dom2, name) => {
  const { code, messages } = await parse(
    `.foo { font-family: "O'Reilly"; } @font-face { font-family: "O'Reilly"; src: url('/font.ttf'); }`,
    { type: 'uvue', platform: 'app-android', dom2 }
  )
  expect(messages).toEqual([])
  const result = JSON.parse(code)
  expect(result.foo[''].fontFamily).toBe(name)
  expect(result['@FONT-FACE'][0].fontFamily).toBe(name)
})

test.each([
  ["'scs-iconfont'", 'scs-iconfont'],
  ['"My Font"', 'My Font'],
  ['sans-serif', 'sans-serif'],
  ["  'My Font'  ", 'My Font'],
  [String.raw`'scs\2d iconfont'`, 'scs-iconfont'],
  [String.raw`'My\'Font'`, "My'Font"],
  [String.raw`'My\\41Font'`, String.raw`My\41Font`],
  [String.raw`'\5b8b\4f53'`, '宋体'],
  [String.raw`'\1f600'`, '😀'],
  [String.raw`'\E9'`, 'é'],
  [String.raw`'\0\d800\110000'`, '���'],
  [String.raw`'\000041B'`, 'AB'],
  ["'A\\\r\nB'", 'AB'],
  ["'A\\\nB\\\rC\\\fD'", 'ABCD'],
  ["'\\41\r\nB'", 'AB'],
  ["'\\41\tB'", 'AB'],
  ["'A!importantB'", 'A!importantB'],
  ["'  My Font  '", '  My Font  '],
  ["\t\n\r\f 'My Font' \t\n\r\f", 'My Font'],
  ['\u00a0Arial\u00a0', '\u00a0Arial\u00a0'],
  ['\vArial\v', '\vArial\v'],
  ["'", "'"],
  ["''", ''],
  ['Arial\\', 'Arial\\'],
  ["var(--font, 'scs-iconfont')", "var(--font, 'scs-iconfont')"],
  ["env(--font, 'scs-iconfont')", "env(--font, 'scs-iconfont')"],
])('字体解码与原生变量结果使用相同规则：%s', (value, expected) => {
  expect(decodeFontFamily(value)).toBe(expected)
})
