import type { Plugin } from 'vite'
import * as uniCliShared from '@dcloudio/uni-cli-shared'
import { uniResolveIdPlugin } from '../src/configResolved/plugins/resolveId'

jest.mock('@dcloudio/uni-cli-shared', () => ({
  ...jest.requireActual('@dcloudio/uni-cli-shared'),
  resolvePiniaAlias: jest.fn(),
  resolveVueI18nAlias: jest.fn(),
}))

describe('resolve pinia', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
  }

  beforeEach(() => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_UTS_PLATFORM = 'web'
    jest.mocked(uniCliShared.resolvePiniaAlias).mockReturnValue({})
    jest.mocked(uniCliShared.resolveVueI18nAlias).mockReturnValue({})
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
    const plugin = uniResolveIdPlugin({} as any)

    expect(resolveId(plugin, 'pinia')).toBeUndefined()
  })

  test('resolves built-in pinia aliases', () => {
    const piniaAliases = {
      pinia: '/internal/pinia.mjs',
      'pinia/package.json': '/internal/pinia/package.json',
      '@vue/devtools-api': '/internal/@vue/devtools-api.js',
    }
    jest.mocked(uniCliShared.resolvePiniaAlias).mockReturnValue(piniaAliases)

    const plugin = uniResolveIdPlugin({} as any)

    Object.entries(piniaAliases).forEach(([id, filename]) => {
      expect(resolveId(plugin, id)).toBe(filename)
    })
  })
})
