import fs from 'fs'
import path from 'path'
import type { Alias } from 'vite'
import { initWebVaporAliases, normalizePath } from '@dcloudio/uni-cli-shared'
import { uniSSRPlugin } from '../src/plugins/ssr'
import {
  getSsrExternalModules,
  initSSR,
  webVaporSsrNoExternal,
} from '../src/plugin/configureServer/ssr'
import { uniResolveIdPlugin } from '../src/plugins/resolveId'
import { createConfig } from '../src/plugin/config'

describe('h5 Web Vapor SSR', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_APP_X_VAPOR: process.env.UNI_APP_X_VAPOR,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_PLATFORM: process.env.UNI_PLATFORM,
  }

  beforeAll(() => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_X_VAPOR = 'true'
    process.env.UNI_INPUT_DIR = path.resolve(
      __dirname,
      '../../playground/ssr/src'
    )
    process.env.UNI_PLATFORM = 'h5'
    initWebVaporAliases()
  })

  afterAll(() => {
    Object.entries(originalEnv).forEach(([name, value]) => {
      if (value === undefined) {
        delete process.env[name]
      } else {
        process.env[name] = value
      }
    })
  })

  test('服务端渲染使用同一套 Web Vapor Vue 依赖', () => {
    const config = (uniSSRPlugin().config as Function)(
      { build: { ssr: true } },
      { command: 'build', mode: 'production' }
    )
    const aliases = config.resolve.alias as Alias[]
    const replacements = Object.fromEntries(
      aliases.map(({ find, replacement }) => [find, normalizePath(replacement)])
    )

    expect(replacements['@vue/server-renderer']).toContain(
      '/lib/dom2/web/@vue/server-renderer/'
    )
    expect(replacements['@vue/runtime-dom']).toContain(
      '/uni-h5-vue/dist-x-vapor/vue.runtime.esm.js'
    )
    expect(replacements['@vue/shared']).toContain(
      '/lib/dom2/web/@vue/shared/dist/shared.esm-bundler.js'
    )
  })

  test('服务端 bundle 使用 Web Vapor SSR 框架及其完整依赖图', () => {
    expect(getSsrExternalModules()).not.toContain('@dcloudio/uni-h5')
    const server = {
      _ssrExternals: [],
      ssrLoadModule: jest.fn(),
    } as any
    initSSR(server)
    server.ssrLoadModule('/entry-server.js')
    expect(server._ssrExternals).not.toContain('@dcloudio/uni-h5')

    const plugin = uniResolveIdPlugin() as any
    plugin.configResolved({})
    expect(
      normalizePath(
        plugin.resolveId('@dcloudio/uni-h5', undefined, { ssr: true })
      )
    ).toContain('/uni-h5/dist-x-vapor-ssr/uni-h5.es.js')
    expect(
      normalizePath(plugin.resolveId('vue', undefined, { ssr: true }))
    ).toContain('/uni-h5-vue/dist-x-vapor/vue.runtime.esm.js')

    const config = (createConfig({ resolvedConfig: null }) as Function)(
      { build: { ssr: true } },
      { command: 'build', mode: 'production' }
    )
    expect(config.ssr.noExternal).toEqual(webVaporSsrNoExternal)
    expect(config.ssr.noExternal).not.toBe(true)
    webVaporSsrNoExternal.forEach((id) => {
      expect(config.ssr.external).not.toContain(id)
      expect(config.build.rollupOptions.external).not.toContain(id)
    })
    expect(config.ssr.external).toContain('@dcloudio/uni-i18n')

    const devConfig = (createConfig({ resolvedConfig: null }) as Function)(
      { server: { middlewareMode: true } },
      { command: 'serve', mode: 'development' }
    )
    expect(devConfig.ssr.external).toContain('vue')
    expect(devConfig.ssr.external).not.toContain('@dcloudio/uni-h5')
    expect(devConfig.ssr.noExternal).toBeUndefined()
  })

  test('非 Vapor SSR 保持原有框架产物', () => {
    delete process.env.UNI_APP_X_DOM2
    delete process.env.UNI_APP_X_VAPOR
    expect(getSsrExternalModules()).toContain('@dcloudio/uni-h5')

    const config = (createConfig({ resolvedConfig: null }) as Function)(
      { build: { ssr: true } },
      { command: 'build', mode: 'production' }
    )
    expect(config.ssr.external).toContain('@dcloudio/uni-h5')
    expect(config.ssr.noExternal).toBeUndefined()

    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_X_VAPOR = 'true'
  })

  test('服务端框架产物不包含构建机绝对模块路径', () => {
    const code = fs.readFileSync(
      path.resolve(__dirname, '../../uni-h5/dist-x-vapor-ssr/uni-h5.es.js'),
      'utf8'
    )
    expect(code).not.toMatch(/const __moduleId = "(?:[A-Za-z]:\/|\/)/)
  })
})
