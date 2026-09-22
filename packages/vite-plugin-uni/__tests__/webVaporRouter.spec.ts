import {
  resolveBuiltIn,
  resolveWebVaporPackage,
} from '@dcloudio/uni-cli-shared'
import { uniResolveIdPlugin } from '../src/configResolved/plugins/resolveId'

describe('Web Vapor vue-router', () => {
  const envNames = [
    'UNI_APP_X',
    'UNI_APP_X_DOM2',
    'UNI_APP_X_VAPOR',
    'UNI_PLATFORM',
    'UNI_UTS_PLATFORM',
  ] as const
  const originalEnv = Object.fromEntries(
    envNames.map((name) => [name, process.env[name]])
  )

  afterEach(() => {
    Object.entries(originalEnv).forEach(([name, value]) => {
      if (value === undefined) {
        delete process.env[name]
      } else {
        process.env[name] = value
      }
    })
  })

  test('使用 Web Vapor 专用 vue-router 产物', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_APP_X_VAPOR = 'true'
    process.env.UNI_PLATFORM = 'h5'
    process.env.UNI_UTS_PLATFORM = 'web'

    const plugin = uniResolveIdPlugin({} as any)
    const resolveId = plugin.resolveId as (id: string) => string | undefined

    expect(resolveId('vue-router')).toBe(
      resolveWebVaporPackage('vue-router/dist/vue-router.js')
    )
  })

  test('非 Vapor 继续使用原有 vue-router 产物', () => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_PLATFORM = 'h5'
    process.env.UNI_UTS_PLATFORM = 'web'
    delete process.env.UNI_APP_X_DOM2
    delete process.env.UNI_APP_X_VAPOR

    const plugin = uniResolveIdPlugin({} as any)
    const resolveId = plugin.resolveId as (id: string) => string | undefined

    expect(resolveId('vue-router')).toBe(
      resolveBuiltIn('vue-router/dist/vue-router.esm-bundler.js')
    )
  })
})
