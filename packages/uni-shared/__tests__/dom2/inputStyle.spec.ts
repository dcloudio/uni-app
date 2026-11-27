import {
  INPUT_PLACEHOLDER_IMPORTANT_LAYER,
  INPUT_PLACEHOLDER_LEGACY_CONDITION,
  INPUT_PLACEHOLDER_STYLE_CLASS_PREFIX,
  createInputPlaceholderStyle,
  stringifyInputStyle,
} from '../../src/dom2/inputStyle'

test('占位内联样式同时序列化层叠规则和旧浏览器回退', () => {
  const style = createInputPlaceholderStyle(
    'color: red; color: blue !important; font-size: 16px'
  )
  const className = `.${INPUT_PLACEHOLDER_STYLE_CLASS_PREFIX}${style.key}`
  const selector = `input:where([uni-input])${className}::placeholder`
  const legacySelector = `input[uni-input]${className.repeat(3)}::placeholder`
  expect(stringifyInputStyle(style)).toBe(
    `@layer ${INPUT_PLACEHOLDER_IMPORTANT_LAYER}{${selector}{color:blue !important;}}` +
      `${selector}{color:red;font-size:16px;}` +
      `@supports ${INPUT_PLACEHOLDER_LEGACY_CONDITION}{${legacySelector}{color:red;font-size:16px;color:blue !important;}}`
  )
})

test.each([
  [0, 1],
  [1, 1],
  [2, 3],
  [3, 3],
])('占位样式转义闭合标签时保留 %i 个相邻反斜杠的语义', (before, after) => {
  const css = stringifyInputStyle(
    createInputPlaceholderStyle(
      `--label:"${'\\'.repeat(before)}</StYlE > </style/>"`
    )
  )

  expect(css).toContain(
    `--label:"${'\\'.repeat(after)}3c /StYlE > \\3c /style/>";`
  )
  expect(css).not.toMatch(/<\/style[\s/>]/i)
})

test('占位样式保留未跟闭合标签的长反斜杠串和相似文本', () => {
  const value = `"${'\\'.repeat(16384)}</stylesheet> < /style>"`
  const css = stringifyInputStyle(
    createInputPlaceholderStyle(`--label: ${value}`)
  )

  expect(css).toContain(`--label:${value};`)
})
