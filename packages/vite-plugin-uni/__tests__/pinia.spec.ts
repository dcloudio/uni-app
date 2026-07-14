import type { Plugin } from 'vite'
import * as uniCliShared from '@dcloudio/uni-cli-shared'
import { uniResolveIdPlugin } from '../src/configResolved/plugins/resolveId'

jest.mock('@dcloudio/uni-cli-shared', () => ({
  ...jest.requireActual('@dcloudio/uni-cli-shared'),
  resolvePinia: jest.fn(),
  resolvePiniaDependencies: jest.fn(),
  resolveProjectPinia: jest.fn(),
  resolveVueI18nDependencies: jest.fn(),
}))

describe('resolve pinia', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
  }

  beforeEach(() => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_UTS_PLATFORM = 'web'
    jest.mocked(uniCliShared.resolveVueI18nDependencies).mockReturnValue({})
  })

  afterEach(() => {
    jest.resetAllMocks()
    Object.entries(originalEnv).forEach(([key, value]) => {
      if (value === undefined) {
        Reflect.deleteProperty(process.env, key)
      } else {
        process.env[key] = value
      }
    })
  })

  function resolveId(plugin: Plugin, id: string) {
    return (plugin.resolveId as Function)(id)
  }

  test('leaves project pinia to vite', () => {
    jest
      .mocked(uniCliShared.resolveProjectPinia)
      .mockReturnValue('/project/node_modules/pinia/index.js')
    jest.mocked(uniCliShared.resolvePiniaDependencies).mockReturnValue({})

    const plugin = uniResolveIdPlugin({} as any)

    expect(resolveId(plugin, 'pinia')).toBeUndefined()
  })

  test('resolves built-in pinia and its dependencies', () => {
    const dependencies = {
      '@vue/devtools-api': '/internal/@vue/devtools-api.js',
    }
    jest.mocked(uniCliShared.resolveProjectPinia).mockReturnValue(undefined)
    jest
      .mocked(uniCliShared.resolvePiniaDependencies)
      .mockReturnValue(dependencies)
    jest
      .mocked(uniCliShared.resolvePinia)
      .mockReturnValue('/internal/pinia.mjs')

    const plugin = uniResolveIdPlugin({} as any)

    expect(resolveId(plugin, 'pinia')).toBe('/internal/pinia.mjs')
    Object.entries(dependencies).forEach(([id, filename]) => {
      expect(resolveId(plugin, id)).toBe(filename)
    })
  })
})
