import { parse } from '../src'

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
