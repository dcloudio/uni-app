import type { Plugin } from 'vite'
import { uniUTSUVueJavaScriptPlugin } from '../src/vite/plugins/uts/uvue'

function getTransform(plugin: Plugin) {
  return typeof plugin.transform === 'function'
    ? plugin.transform
    : plugin.transform!.handler
}

describe('uniUTSUVueJavaScriptPlugin', () => {
  const originalDom2 = process.env.UNI_APP_X_DOM2

  afterEach(() => {
    if (originalDom2 === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_APP_X_DOM2')
    } else {
      process.env.UNI_APP_X_DOM2 = originalDom2
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
        '<script lang="js">const value = 1</script>',
        '/pages/index/index.uvue'
      )
    ).toEqual(
      expect.objectContaining({
        code: '<script lang="ts">const value = 1</script>',
      })
    )
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

  test('keeps the existing non-DOM2 UTS behavior', () => {
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
})
