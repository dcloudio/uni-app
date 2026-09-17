import type { Plugin } from 'vite'
import * as uniCliShared from '@dcloudio/uni-cli-shared'
import { uniResolveIdPlugin } from '../src/configResolved/plugins/resolveId'

jest.mock('@dcloudio/uni-cli-shared', () => ({
  ...jest.requireActual('@dcloudio/uni-cli-shared'),
  resolvePiniaAlias: jest.fn(),
  resolveVueI18nAlias: jest.fn(),
}))

describe('resolve vue-i18n', () => {
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

  test('leaves project vue-i18n to vite', () => {
    const plugin = uniResolveIdPlugin({} as any)

    expect(resolveId(plugin, 'vue-i18n')).toBeUndefined()
  })

  test('resolves built-in vue-i18n aliases', () => {
    const vueI18nAliases = {
      'vue-i18n': '/internal/vue-i18n.mjs',
      'vue-i18n/runtime': '/internal/vue-i18n.runtime.mjs',
      'vue-i18n/package.json': '/internal/vue-i18n/package.json',
      '@intlify/core-base': '/internal/@intlify/core-base.mjs',
      '@intlify/message-compiler': '/internal/@intlify/message-compiler.mjs',
      '@intlify/shared': '/internal/@intlify/shared.mjs',
      '@vue/devtools-api': '/internal/@vue/devtools-api.js',
    }
    jest
      .mocked(uniCliShared.resolveVueI18nAlias)
      .mockReturnValue(vueI18nAliases)

    const plugin = uniResolveIdPlugin({} as any)

    Object.entries(vueI18nAliases).forEach(([id, filename]) => {
      expect(resolveId(plugin, id)).toBe(filename)
    })
  })
})
