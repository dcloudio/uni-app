const mockTypeScript = { version: 'test' }
const mockDom2ScriptPlugin = jest.fn((options: Record<string, any>) => ({
  name: 'uni:vapor-script',
  options,
}))
const mockUniHelpers: { D2SP?: typeof mockDom2ScriptPlugin } = {
  D2SP: mockDom2ScriptPlugin,
}

jest.mock('../src/uts', () => ({
  resolveUTSCompiler: () => ({
    getTypeScript: () => mockTypeScript,
  }),
}))

jest.mock('../src/utils', () => ({
  isNormalCompileTarget: () => !process.env.UNI_COMPILE_TARGET,
  requireUniHelpers: () => mockUniHelpers,
}))

jest.mock('../src/dom2/sharedData', () => ({
  initUts2jsSharedDataOptions: () => ({
    resolveFieldMeta: 'resolveFieldMeta',
  }),
}))

import { uniVaporScriptPlugin } from '../src/dom2/script'

describe('uniVaporScriptPlugin', () => {
  const originalNodeEnv = process.env.NODE_ENV
  const originalUniNodeEnv = process.env.UNI_NODE_ENV
  const originalUtsPlatform = process.env.UNI_UTS_PLATFORM
  const originalCompileTarget = process.env.UNI_COMPILE_TARGET

  beforeEach(() => {
    Reflect.deleteProperty(process.env, 'UNI_NODE_ENV')
  })

  afterEach(() => {
    if (originalNodeEnv === undefined) {
      Reflect.deleteProperty(process.env, 'NODE_ENV')
    } else {
      process.env.NODE_ENV = originalNodeEnv
    }
    if (originalUniNodeEnv === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_NODE_ENV')
    } else {
      process.env.UNI_NODE_ENV = originalUniNodeEnv
    }
    if (originalUtsPlatform === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_UTS_PLATFORM')
    } else {
      process.env.UNI_UTS_PLATFORM = originalUtsPlatform
    }
    if (originalCompileTarget === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_COMPILE_TARGET')
    } else {
      process.env.UNI_COMPILE_TARGET = originalCompileTarget
    }
    mockUniHelpers.D2SP = mockDom2ScriptPlugin
    mockDom2ScriptPlugin.mockClear()
  })

  test('returns an empty plugin when D2SP is unavailable', () => {
    mockUniHelpers.D2SP = undefined

    expect(uniVaporScriptPlugin()).toEqual({ name: 'uni:vapor-script' })
    expect(mockDom2ScriptPlugin).not.toHaveBeenCalled()
  })

  test('adapts compiler and SharedData options for uni_helpers', () => {
    process.env.NODE_ENV = 'production'
    Reflect.deleteProperty(process.env, 'UNI_COMPILE_TARGET')
    const plugin = uniVaporScriptPlugin({
      sharedDataLibName: 'libentry.so',
      sharedDataLibAsGlobal: false,
    })

    expect(plugin.name).toBe('uni:vapor-script')
    expect(mockDom2ScriptPlugin).toHaveBeenCalledWith({
      typescript: mockTypeScript,
      collectExtApi: true,
      sharedData: {
        resolveFieldMeta: 'resolveFieldMeta',
        sharedDataLibName: 'libentry.so',
        sharedDataLibAsGlobal: false,
      },
    })
  })

  test.each(['app-android', 'app-ios', 'app-harmony'] as const)(
    'skips Ext API collection for %s development builds',
    (platform) => {
      process.env.NODE_ENV = 'development'
      process.env.UNI_UTS_PLATFORM = platform
      Reflect.deleteProperty(process.env, 'UNI_COMPILE_TARGET')

      uniVaporScriptPlugin()

      expect(mockDom2ScriptPlugin).toHaveBeenCalledWith(
        expect.objectContaining({ collectExtApi: false })
      )
    }
  )

  test.each(['app-android', 'app-ios', 'app-harmony'] as const)(
    'uses UNI_NODE_ENV for %s before Vite restores NODE_ENV',
    (platform) => {
      process.env.NODE_ENV = 'production'
      process.env.UNI_NODE_ENV = 'development'
      process.env.UNI_UTS_PLATFORM = platform
      Reflect.deleteProperty(process.env, 'UNI_COMPILE_TARGET')

      uniVaporScriptPlugin()

      expect(mockDom2ScriptPlugin).toHaveBeenCalledWith(
        expect.objectContaining({ collectExtApi: false })
      )
    }
  )

  test('collects Ext API usage for production builds', () => {
    process.env.NODE_ENV = 'production'
    process.env.UNI_UTS_PLATFORM = 'app-android'
    Reflect.deleteProperty(process.env, 'UNI_COMPILE_TARGET')

    uniVaporScriptPlugin()

    expect(mockDom2ScriptPlugin).toHaveBeenCalledWith(
      expect.objectContaining({ collectExtApi: true })
    )
  })

  test.each(['uni_modules', 'ext-api'] as const)(
    'skips Ext API collection for %s builds',
    (compileTarget) => {
      process.env.NODE_ENV = 'production'
      process.env.UNI_UTS_PLATFORM = 'app-harmony'
      process.env.UNI_COMPILE_TARGET = compileTarget

      uniVaporScriptPlugin()

      expect(mockDom2ScriptPlugin).toHaveBeenCalledWith(
        expect.objectContaining({ collectExtApi: false })
      )
    }
  )
})
