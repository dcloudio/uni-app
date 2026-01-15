import postcss from 'postcss'

import externalPlugin from '../src/postcss/plugins/stylePluginExternal'

const processor = postcss([externalPlugin])

const options = { from: 'a.css', map: false }

describe('stylePluginExternal', () => {
  test('basic :external(.foo) generates two rules', async () => {
    const input = ':external(.foo) { color: red; }'
    const result = await processor.process(input, options)
    // postcss outputs rules without newline between them
    expect(result.css).toBe(
      '.foo { color: red; }.foo-external.foo-external.foo-external { color: red; }'
    )
  })

  test('combined with parent selector', async () => {
    const input = '.parent :external(.foo) { color: red; }'
    const result = await processor.process(input, options)
    expect(result.css).toBe(
      '.parent .foo { color: red; }.parent .foo-external.foo-external.foo-external { color: red; }'
    )
  })

  test('combined with child combinator', async () => {
    const input = '.parent > :external(.foo) { color: red; }'
    const result = await processor.process(input, options)
    expect(result.css).toBe(
      '.parent > .foo { color: red; }.parent > .foo-external.foo-external.foo-external { color: red; }'
    )
  })

  test('combined with child selector', async () => {
    const input = ':external(.foo) .child { color: red; }'
    const result = await processor.process(input, options)
    expect(result.css).toBe(
      '.foo .child { color: red; }.foo-external.foo-external.foo-external .child { color: red; }'
    )
  })

  test('combined with parent and child', async () => {
    const input = '.parent :external(.foo) .child { color: red; }'
    const result = await processor.process(input, options)
    expect(result.css).toBe(
      '.parent .foo .child { color: red; }.parent .foo-external.foo-external.foo-external .child { color: red; }'
    )
  })

  test('multiple :external in one selector', async () => {
    const input = ':external(.foo) :external(.bar) { color: red; }'
    const result = await processor.process(input, options)
    expect(result.css).toBe(
      '.foo .bar { color: red; }.foo-external.foo-external.foo-external .bar-external.bar-external.bar-external { color: red; }'
    )
  })

  test('multiple selectors (comma separated)', async () => {
    const input = ':external(.foo), :external(.bar) { color: red; }'
    const result = await processor.process(input, options)
    expect(result.css).toBe(
      '.foo,.bar { color: red; }.foo-external.foo-external.foo-external,.bar-external.bar-external.bar-external { color: red; }'
    )
  })

  test('empty :external() should be removed', async () => {
    const input = ':external() { color: red; }'
    const result = await processor.process(input, options)
    expect(result.css).toBe(' { color: red; }')
  })

  test(':external with complex selector (.a .b) should just unwrap', async () => {
    const input = ':external(.a .b) { color: red; }'
    const result = await processor.process(input, options)
    // Complex selectors are not supported, just remove :external wrapper
    expect(result.css).toBe('.a .b { color: red; }')
  })

  test('selectors without :external should remain unchanged', async () => {
    const input = '.normal-class { color: red; }'
    const result = await processor.process(input, options)
    expect(result.css).toBe('.normal-class { color: red; }')
  })

  test('should skip keyframes rules', async () => {
    const input = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
:external(.foo) { color: red; }`
    const result = await processor.process(input, options)
    expect(result.css).toContain('.foo { color: red; }')
    expect(result.css).toContain(
      '.foo-external.foo-external.foo-external { color: red; }'
    )
    expect(result.css).toContain('from')
    expect(result.css).toContain('to')
  })

  test('should handle nested media queries', async () => {
    const input = `
@media (min-width: 768px) {
  :external(.foo) { color: red; }
}`
    const result = await processor.process(input, options)
    expect(result.css).toContain('.foo { color: red; }')
    expect(result.css).toContain(
      '.foo-external.foo-external.foo-external { color: red; }'
    )
    expect(result.css).not.toContain(':external')
  })

  test('preserves other declarations in the rule', async () => {
    const input =
      ':external(.foo) { color: red; background: blue; font-size: 14px; }'
    const result = await processor.process(input, options)
    expect(result.css).toBe(
      '.foo { color: red; background: blue; font-size: 14px; }.foo-external.foo-external.foo-external { color: red; background: blue; font-size: 14px; }'
    )
  })
})
