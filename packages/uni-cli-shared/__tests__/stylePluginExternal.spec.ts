import postcss from 'postcss'

import externalPlugin from '../src/postcss/plugins/stylePluginExternal'

process.env.UNI_PLATFORM = 'mp-weixin'

describe('stylePluginExternal', () => {
  const originalPlatform = process.env.UNI_PLATFORM
  const originalInputDir = process.env.UNI_INPUT_DIR
  const originalPagePaths = process.env.UNI_COMPILE_EXT_API_PAGE_PATHS

  beforeEach(() => {
    // Set platform to mini-program
    process.env.UNI_PLATFORM = 'mp-weixin'
    // Set input directory
    process.env.UNI_INPUT_DIR = '/src'
    // Set page paths to include test page
    process.env.UNI_COMPILE_EXT_API_PAGE_PATHS = JSON.stringify([
      'pages/index/index',
    ])
  })

  afterEach(() => {
    process.env.UNI_PLATFORM = originalPlatform
    process.env.UNI_INPUT_DIR = originalInputDir
    process.env.UNI_COMPILE_EXT_API_PAGE_PATHS = originalPagePaths
  })

  const processor = postcss([externalPlugin])

  const pageOptions = { from: '/src/pages/index/index.vue', map: false }
  const componentOptions = { from: '/src/components/foo.vue', map: false }

  describe('mini-program platform', () => {
    test('basic class selector prepends page', async () => {
      const input = '.foo { color: red; }'
      const result = await processor.process(input, pageOptions)
      expect(result.css).toBe('page .foo { color: red; }')
    })

    test('compound class selector prepends page', async () => {
      const input = '.foo .bar { color: red; }'
      const result = await processor.process(input, pageOptions)
      expect(result.css).toBe('page .foo .bar { color: red; }')
    })

    test('multiple selectors (comma separated)', async () => {
      const input = '.foo, .bar { color: red; }'
      const result = await processor.process(input, pageOptions)
      // Note: extra space before .bar comes from original selector format
      expect(result.css).toBe('page .foo,page  .bar { color: red; }')
    })

    test('selector already starting with page remains unchanged', async () => {
      const input = 'page .foo { color: red; }'
      const result = await processor.process(input, pageOptions)
      expect(result.css).toBe('page .foo { color: red; }')
    })

    test('should skip keyframes rules', async () => {
      const input = `@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.foo { color: red; }`
      const result = await processor.process(input, pageOptions)
      expect(result.css).toContain('page .foo { color: red; }')
      expect(result.css).toContain('from { opacity: 0; }')
      expect(result.css).toContain('to { opacity: 1; }')
    })

    test('should handle nested media queries', async () => {
      const input = `@media (min-width: 768px) {
  .foo { color: red; }
}`
      const result = await processor.process(input, pageOptions)
      expect(result.css).toContain('page .foo { color: red; }')
    })

    test('preserves other declarations in the rule', async () => {
      const input = '.foo { color: red; background: blue; font-size: 14px; }'
      const result = await processor.process(input, pageOptions)
      expect(result.css).toBe(
        'page .foo { color: red; background: blue; font-size: 14px; }'
      )
    })

    test('should not process component files', async () => {
      const input = '.foo { color: red; }'
      const result = await processor.process(input, componentOptions)
      expect(result.css).toBe('.foo { color: red; }')
    })

    test('child combinator selector', async () => {
      const input = '.parent > .child { color: red; }'
      const result = await processor.process(input, pageOptions)
      expect(result.css).toBe('page .parent > .child { color: red; }')
    })

    test('id selector prepends page', async () => {
      const input = '#app { color: red; }'
      const result = await processor.process(input, pageOptions)
      expect(result.css).toBe('page #app { color: red; }')
    })

    test('tag selector prepends page', async () => {
      const input = 'div { color: red; }'
      const result = await processor.process(input, pageOptions)
      expect(result.css).toBe('page div { color: red; }')
    })
  })

  describe('non mini-program platform', () => {
    beforeEach(() => {
      process.env.UNI_PLATFORM = 'h5'
    })

    test('should not process on h5 platform', async () => {
      const input = '.foo { color: red; }'
      const result = await processor.process(input, pageOptions)
      expect(result.css).toBe('.foo { color: red; }')
    })
  })

  describe('no platform set', () => {
    beforeEach(() => {
      ;(process.env as any).UNI_PLATFORM = undefined
    })

    test('should not process when platform is not set', async () => {
      const input = '.foo { color: red; }'
      const result = await processor.process(input, pageOptions)
      expect(result.css).toBe('.foo { color: red; }')
    })
  })
})
