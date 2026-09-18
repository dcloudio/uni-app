import path from 'path'
import type { Alias } from 'vite'
import { initWebVaporAliases, normalizePath } from '@dcloudio/uni-cli-shared'
import { uniSSRPlugin } from '../src/plugins/ssr'

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
})
