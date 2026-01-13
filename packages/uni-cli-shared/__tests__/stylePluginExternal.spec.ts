import postcss from 'postcss'

import externalPlugin from '../src/postcss/plugins/stylePluginExternal'

const styleCode = `{color:red;}`

const externalSelectors = [
  // Basic :external transformation: generates two selectors
  // :external(.foo) -> .foo,.foo-external.foo-external.foo-external
  [':external(.foo)', '.foo,.foo-external.foo-external.foo-external'],
  [':external(.bar)', '.bar,.bar-external.bar-external.bar-external'],

  // Combined with other selectors
  [
    '.parent :external(.foo)',
    '.parent .foo,.parent .foo-external.foo-external.foo-external',
  ],
  [
    '.parent > :external(.foo)',
    '.parent > .foo,.parent > .foo-external.foo-external.foo-external',
  ],
  [
    ':external(.foo) .child',
    '.foo .child,.foo-external.foo-external.foo-external .child',
  ],
  [
    '.parent :external(.foo) .child',
    '.parent .foo .child,.parent .foo-external.foo-external.foo-external .child',
  ],

  // Multiple :external in one selector
  [
    ':external(.foo) :external(.bar)',
    '.foo .bar,.foo-external.foo-external.foo-external .bar-external.bar-external.bar-external',
  ],
  [
    '.parent :external(.foo) :external(.bar)',
    '.parent .foo .bar,.parent .foo-external.foo-external.foo-external .bar-external.bar-external.bar-external',
  ],

  // Multiple selectors (comma separated) - postcss preserves space after comma in original selectors
  [
    ':external(.foo), :external(.bar)',
    '.foo,.bar,.foo-external.foo-external.foo-external,.bar-external.bar-external.bar-external',
  ],
  [
    '.a :external(.foo), .b :external(.bar)',
    '.a .foo, .b .bar,.a .foo-external.foo-external.foo-external, .b .bar-external.bar-external.bar-external',
  ],

  // Empty :external() should be removed
  [':external()', ''],

  // Selectors without :external should remain unchanged
  ['.normal-class', '.normal-class'],
  ['.parent .child', '.parent .child'],
]

const processor = postcss([externalPlugin])

const options = { from: 'a.css', map: false }

describe('stylePluginExternal', () => {
  externalSelectors.forEach(([input, expected]) => {
    test(`transform "${input}" to "${expected}"`, async () => {
      const inputCss = input + styleCode
      const expectedCss = expected + styleCode
      const result = await processor.process(inputCss, options)
      expect(result.css).toBe(expectedCss)
    })
  })

  test('should skip direct keyframes rules', async () => {
    // In standard CSS, keyframes only contain keyframe selectors (from, to, 0%, 100%)
    // The skip logic applies when the rule's direct parent is the keyframes at-rule
    const inputCss = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
:external(.foo) { color: red; }`
    const result = await processor.process(inputCss, options)
    // The :external outside keyframes should be transformed to two selectors
    expect(result.css).toContain('.foo')
    expect(result.css).toContain('.foo-external.foo-external.foo-external')
    // Keyframes should remain unchanged
    expect(result.css).toContain('from')
    expect(result.css).toContain('to')
  })

  test('should handle nested media queries', async () => {
    const inputCss = `
@media (min-width: 768px) {
  :external(.foo) { color: red; }
}`
    const result = await processor.process(inputCss, options)
    expect(result.css).toContain('.foo')
    expect(result.css).toContain('.foo-external.foo-external.foo-external')
    expect(result.css).not.toContain(':external')
  })
})
