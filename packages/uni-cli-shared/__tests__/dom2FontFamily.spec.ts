import {
  ANY_JS_STYLE_PLACEHOLDER_RE,
  JS_STYLE_PLACEHOLDER_MARKER,
  createJsStylePlaceholder,
  createJsStylePlaceholderRegExp,
} from '../src/dom2/fontFamily'

describe('dom2 font family placeholder', () => {
  const id = '/pages/index/index.uvue'
  const placeholder = createJsStylePlaceholder(id)
  const hashId = JSON.parse(placeholder)[JS_STYLE_PLACEHOLDER_MARKER]

  test.each([
    placeholder,
    `{ '${JS_STYLE_PLACEHOLDER_MARKER}': '${hashId}' }`,
    `{ '${JS_STYLE_PLACEHOLDER_MARKER}': "${hashId}" }`,
    `{ "${JS_STYLE_PLACEHOLDER_MARKER}": '${hashId}' }`,
    `{ ${JS_STYLE_PLACEHOLDER_MARKER}: '${hashId}' }`,
    `{ ${JS_STYLE_PLACEHOLDER_MARKER}: "${hashId}" }`,
  ])('createJsStylePlaceholderRegExp matches %s', (source) => {
    expect(
      source.replace(createJsStylePlaceholderRegExp(id), 'fontFaces')
    ).toBe('fontFaces')
  })

  test.each([
    placeholder,
    `{ '${JS_STYLE_PLACEHOLDER_MARKER}': '${hashId}' }`,
    `{ '${JS_STYLE_PLACEHOLDER_MARKER}': "${hashId}" }`,
    `{ "${JS_STYLE_PLACEHOLDER_MARKER}": '${hashId}' }`,
    `{ ${JS_STYLE_PLACEHOLDER_MARKER}: '${hashId}' }`,
    `{ ${JS_STYLE_PLACEHOLDER_MARKER}: "${hashId}" }`,
  ])('ANY_JS_STYLE_PLACEHOLDER_RE matches %s', (source) => {
    expect(source.replace(ANY_JS_STYLE_PLACEHOLDER_RE, '{}')).toBe('{}')
  })
})
