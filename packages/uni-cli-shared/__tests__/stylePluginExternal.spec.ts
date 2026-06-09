import postcss from 'postcss'

import {
  clearPageExternalClasses,
  updatePageExternalClasses,
} from '../src/mp/externalClasses'
import externalPlugin from '../src/postcss/plugins/stylePluginExternal'

process.env.UNI_PLATFORM = 'mp-weixin'
process.env.NODE_ENV = 'development'

describe('stylePluginExternal', () => {
  const originalPlatform = process.env.UNI_PLATFORM
  const originalInputDir = process.env.UNI_INPUT_DIR
  const originalPagePaths = process.env.UNI_COMPILE_EXT_API_PAGE_PATHS
  const originalNodeEnv = process.env.NODE_ENV

  beforeEach(() => {
    // Set platform to mini-program
    process.env.UNI_PLATFORM = 'mp-weixin'
    process.env.NODE_ENV = 'development'
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
    process.env.NODE_ENV = originalNodeEnv
    clearPageExternalClasses('/src/pages/index/index.vue')
  })

  const processor = postcss([externalPlugin])

  const pageOptions = { from: '/src/pages/index/index.vue', map: false }
  const componentOptions = { from: '/src/components/foo.vue', map: false }

  describe('mini-program platform', () => {
    test('basic class selector appends [class]', async () => {
      const input = '.foo { color: red; }'
      const result = await processor.process(input, pageOptions)
      expect(result.css).toBe('.foo[class] { color: red; }')
    })

    test('compound class selector appends [class] to rightmost class', async () => {
      const input = '.foo .bar { color: red; }'
      const result = await processor.process(input, pageOptions)
      expect(result.css).toBe('.foo .bar[class] { color: red; }')
    })

    test('multiple selectors (comma separated)', async () => {
      const input = '.foo, .bar { color: red; }'
      const result = await processor.process(input, pageOptions)
      expect(result.css).toBe('.foo[class], .bar[class] { color: red; }')
    })

    test('selector already containing [class] appends another [class]', async () => {
      const input = '.foo[class] { color: red; }'
      const result = await processor.process(input, pageOptions)
      expect(result.css).toBe('.foo[class][class] { color: red; }')
    })

    test('selector already starting with page appends [class] to rightmost class', async () => {
      const input = 'page .foo { color: red; }'
      const result = await processor.process(input, pageOptions)
      expect(result.css).toBe('page .foo[class] { color: red; }')
    })

    test('should skip keyframes rules', async () => {
      const input = `@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.foo { color: red; }`
      const result = await processor.process(input, pageOptions)
      expect(result.css).toContain('.foo[class] { color: red; }')
      expect(result.css).toContain('from { opacity: 0; }')
      expect(result.css).toContain('to { opacity: 1; }')
    })

    test('should handle nested media queries', async () => {
      const input = `@media (min-width: 768px) {
  .foo { color: red; }
}`
      const result = await processor.process(input, pageOptions)
      expect(result.css).toContain('.foo[class] { color: red; }')
    })

    test('preserves other declarations in the rule', async () => {
      const input = '.foo { color: red; background: blue; font-size: 14px; }'
      const result = await processor.process(input, pageOptions)
      expect(result.css).toBe(
        '.foo[class] { color: red; background: blue; font-size: 14px; }'
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
      expect(result.css).toBe('.parent > .child[class] { color: red; }')
    })

    test('pseudo selector appends [class] before pseudo', async () => {
      const input = '.foo:hover, .bar::after { color: red; }'
      const result = await processor.process(input, pageOptions)
      expect(result.css).toBe(
        '.foo[class]:hover, .bar[class]::after { color: red; }'
      )
    })

    test('selector without class remains unchanged', async () => {
      const input = '#app { color: red; }'
      const result = await processor.process(input, pageOptions)
      expect(result.css).toBe('#app { color: red; }')
    })

    test('tag selector without class remains unchanged', async () => {
      const input = 'div { color: red; }'
      const result = await processor.process(input, pageOptions)
      expect(result.css).toBe('div { color: red; }')
    })

    test('static externalClasses only processes matched selectors', async () => {
      process.env.NODE_ENV = 'production'
      updatePageExternalClasses('/src/pages/index/index.vue', {
        staticClasses: new Set(['foo']),
        hasDynamic: false,
      })

      const input = '.foo .bar, .baz { color: red; }'
      const result = await processor.process(input, pageOptions)
      expect(result.css).toBe('.foo .bar[class], .baz { color: red; }')
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
