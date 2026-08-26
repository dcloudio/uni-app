import type { Plugin } from 'vite'
import { uniUTSUVueJavaScriptPlugin } from '../src/vite/plugins/uts/uvue'

function getTransform(plugin: Plugin) {
  return typeof plugin.transform === 'function'
    ? plugin.transform
    : plugin.transform!.handler
}

describe('uniUTSUVueJavaScriptPlugin', () => {
  const originalAppX = process.env.UNI_APP_X
  const originalDom2 = process.env.UNI_APP_X_DOM2
  const originalPlatform = process.env.UNI_PLATFORM
  const originalUtsPlatform = process.env.UNI_UTS_PLATFORM

  beforeEach(() => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_UTS_PLATFORM = 'app-android'
  })

  afterEach(() => {
    if (originalAppX === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_APP_X')
    } else {
      process.env.UNI_APP_X = originalAppX
    }
    if (originalDom2 === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
    } else {
      process.env.UNI_APP_X_DOM2 = originalDom2
    }
    if (originalPlatform === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_PLATFORM')
    } else {
      process.env.UNI_PLATFORM = originalPlatform
    }
    if (originalUtsPlatform === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_UTS_PLATFORM')
    } else {
      process.env.UNI_UTS_PLATFORM = originalUtsPlatform
    }
  })

  test('preserves TypeScript and normalizes JavaScript in DOM2', () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    const transform = getTransform(uniUTSUVueJavaScriptPlugin())

    expect(
      transform.call(
        {} as any,
        '<script setup lang="ts">const value = 1</script>',
        '/pages/index/index.uvue'
      )
    ).toEqual(
      expect.objectContaining({
        code: '<script setup vapor lang="ts">const value = 1</script>',
      })
    )
    expect(
      transform.call(
        {} as any,
        '<script setup lang="js">const value = 1</script>',
        '/pages/index/index.uvue'
      )
    ).toEqual(
      expect.objectContaining({
        code: '<script setup vapor lang="ts">const value = 1</script>',
      })
    )
  })

  test('keeps normal and external JavaScript scripts unchanged in DOM2', () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    const transform = getTransform(uniUTSUVueJavaScriptPlugin())

    expect(
      transform.call(
        {} as any,
        '<script lang="js">const value = 1</script>',
        '/pages/index/index.uvue'
      )
    ).toBeUndefined()
    expect(
      transform.call(
        {} as any,
        '<script setup src="./index.js" lang="js"></script>',
        '/pages/index/index.uvue'
      )
    ).toEqual(
      expect.objectContaining({
        code: '<script setup src="./index.js" vapor lang="js"></script>',
      })
    )
  })

  test('normalizes normal and setup JavaScript together in DOM2', () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    const transform = getTransform(uniUTSUVueJavaScriptPlugin())

    expect(
      transform.call(
        {} as any,
        '<script lang="js">export default {}</script>\n<script setup lang="js">const value = 1</script>',
        '/pages/index/index.uvue'
      )
    ).toEqual(
      expect.objectContaining({
        code: '<script lang="ts">export default {}</script>\n<script setup vapor lang="ts">const value = 1</script>',
      })
    )
  })

  test('ignores script tags in comments and script content in DOM2', () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    const transform = getTransform(uniUTSUVueJavaScriptPlugin())

    expect(
      transform.call(
        {} as any,
        '<!-- <script lang="uts"></script> -->\n<script setup lang="js">const value = 1</script>',
        '/pages/index/index.uvue'
      )
    ).toEqual(
      expect.objectContaining({
        code: '<!-- <script lang="uts"></script> -->\n<script setup vapor lang="ts">const value = 1</script>',
      })
    )
    expect(
      transform.call(
        {} as any,
        '<script setup lang="js">const source = \'<script lang="uts">\'</script>',
        '/pages/index/index.uvue'
      )
    ).toEqual(
      expect.objectContaining({
        code: '<script setup vapor lang="ts">const source = \'<script lang="uts">\'</script>',
      })
    )
  })

  test('keeps the script group language when an external script exists', () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    const transform = getTransform(uniUTSUVueJavaScriptPlugin())

    expect(
      transform.call(
        {} as any,
        '<script src="./index.js" lang="js"></script>\n<script setup lang="js">const value = 1</script>',
        '/pages/index/index.uvue'
      )
    ).toEqual(
      expect.objectContaining({
        code: '<script src="./index.js" lang="js"></script>\n<script setup vapor lang="js">const value = 1</script>',
      })
    )
  })

  test('keeps UTS and implicit UTS scripts out of JavaScript normalization', () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    const transform = getTransform(uniUTSUVueJavaScriptPlugin())

    expect(
      transform.call(
        {} as any,
        '<script lang="uts">export default {}</script>\n<script setup lang="js">const value = 1</script>',
        '/pages/index/index.uvue'
      )
    ).toEqual(
      expect.objectContaining({
        code: '<script lang="uts">export default {}</script>\n<script setup vapor lang="js">const value = 1</script>',
      })
    )
    expect(
      transform.call(
        {} as any,
        '<script>export default {}</script>\n<script setup lang="js">const value = 1</script>',
        '/pages/index/index.uvue'
      )
    ).toEqual(
      expect.objectContaining({
        code: '<script lang="uts">export default {}</script>\n<script setup vapor lang="js">const value = 1</script>',
      })
    )
  })

  test('matches complete setup and vapor attributes in DOM2', () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    const transform = getTransform(uniUTSUVueJavaScriptPlugin())

    expect(
      transform.call(
        {} as any,
        '<script data-setup="x" lang="js">const value = 1</script>\n<script setup-mode="x" lang="js">const other = 2</script>',
        '/pages/index/index.uvue'
      )
    ).toBeUndefined()
    expect(
      transform.call(
        {} as any,
        '<script setup data-vapor="x" lang="js">const value = 1</script>',
        '/pages/index/index.uvue'
      )
    ).toEqual(
      expect.objectContaining({
        code: '<script setup data-vapor="x" vapor lang="ts">const value = 1</script>',
      })
    )
    expect(
      transform.call(
        {} as any,
        '<script setup="" vapor="" lang="ts">const value = 1</script>',
        '/pages/index/index.uvue'
      )
    ).toBeUndefined()
    expect(
      transform.call(
        {} as any,
        '<SCRIPT SETUP LANG="js">const value = 1</SCRIPT>',
        '/pages/index/index.uvue'
      )
    ).toEqual(
      expect.objectContaining({
        code: '<SCRIPT SETUP vapor lang="ts">const value = 1</SCRIPT>',
      })
    )
  })

  test('returns an empty source map for the DOM2 script tag transform', () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    const transform = getTransform(uniUTSUVueJavaScriptPlugin())
    const result = transform.call(
      {} as any,
      '<script setup lang="js">\nconst value = 1\n</script>',
      '/pages/index/index.uvue'
    ) as any

    expect(result.map).toEqual({ mappings: '' })
  })

  test('keeps the empty DOM2 transform map when build sourcemaps are disabled', () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_PLATFORM = 'app-harmony'
    const plugin = uniUTSUVueJavaScriptPlugin()
    const transform = getTransform(plugin)
    const id = '/pages/index/index.uvue'
    const source = '<script setup lang="ts">uni.loadUasm(modulePath)</script>'

    if (typeof plugin.configResolved === 'function') {
      plugin.configResolved({
        command: 'build',
        build: { sourcemap: false },
        plugins: [],
      } as any)
    }

    const result = transform.call({} as any, source, id) as any

    expect(result.map).toEqual({ mappings: '' })
  })

  test('keeps UTS as the default language in DOM2', () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    const transform = getTransform(uniUTSUVueJavaScriptPlugin())

    expect(
      transform.call(
        {} as any,
        '<script setup>const value = 1</script>',
        '/pages/index/index.uvue'
      )
    ).toEqual(
      expect.objectContaining({
        code: '<script setup vapor lang="uts">const value = 1</script>',
      })
    )
  })

  test('matches the complete JavaScript lang attribute in DOM2', () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    const transform = getTransform(uniUTSUVueJavaScriptPlugin())

    expect(
      transform.call(
        {} as any,
        '<script setup lang = "js">const value = 1</script>',
        '/pages/index/index.uvue'
      )
    ).toEqual(
      expect.objectContaining({
        code: '<script setup vapor lang="ts">const value = 1</script>',
      })
    )
    expect(
      transform.call(
        {} as any,
        '<script setup lang="j&#115;">const value = 1</script>',
        '/pages/index/index.uvue'
      )
    ).toEqual(
      expect.objectContaining({
        code: '<script setup vapor lang="ts">const value = 1</script>',
      })
    )
    expect(
      transform.call(
        {} as any,
        '<script lang="&#106;s">export default {}</script>\n<script setup lang="js">const value = 1</script>',
        '/pages/index/index.uvue'
      )
    ).toEqual(
      expect.objectContaining({
        code: '<script lang="ts">export default {}</script>\n<script setup vapor lang="ts">const value = 1</script>',
      })
    )
    expect(
      transform.call(
        {} as any,
        '<script setup lang="jsx">const value = <view /></script>',
        '/pages/index/index.uvue'
      )
    ).toEqual(
      expect.objectContaining({
        code: '<script setup vapor lang="jsx">const value = <view /></script>',
      })
    )
    expect(
      transform.call(
        {} as any,
        '<script setup lang="tsx">const value = <view /></script>',
        '/pages/index/index.uvue'
      )
    ).toEqual(
      expect.objectContaining({
        code: '<script setup vapor lang="tsx">const value = <view /></script>',
      })
    )
  })

  test('does not treat data-lang as the script language', () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    const transform = getTransform(uniUTSUVueJavaScriptPlugin())

    expect(
      transform.call(
        {} as any,
        '<script setup data-lang="js">const value = 1</script>',
        '/pages/index/index.uvue'
      )
    ).toEqual(
      expect.objectContaining({
        code: '<script setup data-lang="js" vapor lang="uts">const value = 1</script>',
      })
    )
  })

  test('keeps vite esbuild in DOM2', () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    const plugin = uniUTSUVueJavaScriptPlugin()
    const esbuildPlugin = { name: 'vite:esbuild' }
    const config = { plugins: [esbuildPlugin] }

    if (typeof plugin.configResolved === 'function') {
      plugin.configResolved(config as any)
    }

    expect(config.plugins).toContain(esbuildPlugin)
  })

  test.each(['web', 'mp-weixin', 'app-ios', 'app-harmony'] as const)(
    'supports standard scripts without enabling Vapor on %s',
    (platform) => {
      Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
      process.env.UNI_UTS_PLATFORM = platform
      const plugin = uniUTSUVueJavaScriptPlugin()
      const transform = getTransform(plugin)
      const esbuildPlugin = { name: 'vite:esbuild' }
      const config = { plugins: [esbuildPlugin] }

      expect(
        transform.call(
          {} as any,
          '<script setup lang="js">const value = 1</script>',
          '/pages/index/index.uvue'
        )
      ).toEqual(
        expect.objectContaining({
          code: '<script setup lang="ts">const value = 1</script>',
          map: { mappings: '' },
        })
      )
      if (typeof plugin.configResolved === 'function') {
        plugin.configResolved(config as any)
      }
      expect(config.plugins).toContain(esbuildPlugin)
    }
  )

  test('keeps the legacy empty source map for default UTS scripts on Harmony', () => {
    Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
    process.env.UNI_UTS_PLATFORM = 'app-harmony'
    process.env.UNI_PLATFORM = 'app-harmony'
    const transform = getTransform(uniUTSUVueJavaScriptPlugin())

    expect(
      transform.call(
        {} as any,
        '<script>export default {}</script>',
        '/pages/index/index.uvue'
      )
    ).toEqual({
      code: '<script lang="uts">export default {}</script>',
      map: { mappings: '' },
    })
  })

  test('keeps the existing Android VDOM UTS behavior', () => {
    Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
    const plugin = uniUTSUVueJavaScriptPlugin()
    const transform = getTransform(plugin)
    const esbuildPlugin = { name: 'vite:esbuild' }
    const config = { plugins: [esbuildPlugin] }

    expect(
      transform.call(
        {} as any,
        '<script lang="ts">const value = 1</script>',
        '/pages/index/index.uvue'
      )
    ).toEqual(
      expect.objectContaining({
        code: '<script lang="uts">const value = 1</script>',
      })
    )
    if (typeof plugin.configResolved === 'function') {
      plugin.configResolved(config as any)
    }
    expect(config.plugins).not.toContain(esbuildPlugin)
  })

  test('keeps the legacy empty source map for explicit UTS scripts on App VDOM', () => {
    Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
    process.env.UNI_PLATFORM = 'app'
    process.env.UNI_UTS_PLATFORM = 'app-ios'
    const transform = getTransform(uniUTSUVueJavaScriptPlugin())
    const source = '<script setup lang="uts">const value = 1</script>'

    expect(
      transform.call({} as any, source, '/pages/index/index.uvue')
    ).toEqual({
      code: source,
      map: { mappings: '' },
    })
  })
})
