import type { Plugin } from 'vite'
import * as uniCliShared from '@dcloudio/uni-cli-shared'
import { uniResolveIdPlugin } from '../src/configResolved/plugins/resolveId'

jest.mock('@dcloudio/uni-cli-shared', () => ({
  ...jest.requireActual('@dcloudio/uni-cli-shared'),
  resolveProjectVueI18n: jest.fn(),
  resolveVueI18n: jest.fn(),
  resolveVueI18nDependencies: jest.fn(),
}))

describe('resolve vue-i18n', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
  }

  beforeEach(() => {
    process.env.UNI_APP_X = 'true'
    process.env.UNI_UTS_PLATFORM = 'web'
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
    jest
      .mocked(uniCliShared.resolveProjectVueI18n)
      .mockReturnValue('/project/node_modules/vue-i18n/index.js')
    jest.mocked(uniCliShared.resolveVueI18nDependencies).mockReturnValue({})

    const plugin = uniResolveIdPlugin({} as any)

    expect(resolveId(plugin, 'vue-i18n')).toBeUndefined()
  })

  test('resolves built-in vue-i18n and its dependencies', () => {
    const dependencies = {
      '@intlify/core-base': '/internal/@intlify/core-base.mjs',
      '@intlify/message-compiler': '/internal/@intlify/message-compiler.mjs',
      '@intlify/shared': '/internal/@intlify/shared.mjs',
      '@vue/devtools-api': '/internal/@vue/devtools-api.js',
    }
    jest.mocked(uniCliShared.resolveProjectVueI18n).mockReturnValue(undefined)
    jest
      .mocked(uniCliShared.resolveVueI18nDependencies)
      .mockReturnValue(dependencies)
    jest
      .mocked(uniCliShared.resolveVueI18n)
      .mockReturnValue('/internal/vue-i18n.mjs')

    const plugin = uniResolveIdPlugin({} as any)

    expect(resolveId(plugin, 'vue-i18n')).toBe('/internal/vue-i18n.mjs')
    Object.entries(dependencies).forEach(([id, filename]) => {
      expect(resolveId(plugin, id)).toBe(filename)
    })
  })
})
