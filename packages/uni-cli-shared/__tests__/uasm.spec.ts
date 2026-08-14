import fs from 'fs-extra'
import os from 'node:os'
import path from 'node:path'
import * as ts from 'typescript'
import {
  compileUniModuleWithTsc,
  createUniXKotlinCompiler,
  toKotlin,
} from '@dcloudio/uni-uts-v1'

import {
  createLoadUasmTransformer,
  getUasmModules,
  initUasmModules,
  initUasmTransformOptions,
  initUasmTransformerCreator,
  initUasmWebTransformOptions,
  parseUasmModuleName,
  parseUniAppXTargetArchs,
  resolveUasmCopyAssets,
  resolveUasmLoadPath,
  resolveUasmModule,
  resolveUasmTargetArch,
  resolveUasmWebLoad,
  uniUasmPlugin,
} from '../src/uasm'

function transformLoadUasm(
  code: string,
  targetArchs: string[] = ['arm64-v8a', 'armeabi-v7a']
) {
  return ts.transpileModule(code, {
    transformers: {
      before: [
        createLoadUasmTransformer({
          typescript: ts,
          targetArchs,
          resolve(modulePath) {
            const normalized = modulePath.replace(/^@?\//, '')
            if (normalized === 'uni_modules/test-uasm') {
              return `${normalized}/uasm/app-android/libs/arm64-v8a/libtest-uasm.so`
            }
          },
          reportDiagnostic(_context, diagnostic) {
            throw new Error(diagnostic.messageText.toString())
          },
        }),
      ],
    },
  }).outputText
}

function transformWebLoadUasm(code: string) {
  const options = initUasmWebTransformOptions()
  return ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
    },
    transformers: {
      before: [
        options.createLoadUasmTransformer({
          ...options,
          typescript: ts,
          reportDiagnostic(_context, diagnostic) {
            throw new Error(diagnostic.messageText.toString())
          },
        }),
      ],
    },
  }).outputText
}

describe('uasm', () => {
  let inputDir: string

  beforeEach(() => {
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-uasm-'))
  })

  afterEach(() => {
    fs.removeSync(inputDir)
  })

  test('parse target archs', () => {
    expect(
      parseUniAppXTargetArchs(
        JSON.stringify(['arm64-v8a', '', 1, 'armeabi-v7a'])
      )
    ).toEqual(['arm64-v8a', 'armeabi-v7a'])
    expect(parseUniAppXTargetArchs('arm64-v8a')).toEqual([])
    expect(parseUniAppXTargetArchs('{}')).toEqual([])
  })

  test('initialize shared transform options', () => {
    const originalTargetArchs = process.env.UNI_APP_X_TARGET_ARCHS
    process.env.UNI_APP_X_TARGET_ARCHS = JSON.stringify(['arm64-v8a'])
    fs.outputFileSync(
      path.join(
        inputDir,
        'uni_modules/test-uasm/uasm/app-android/libs/arm64-v8a/libtest-uasm.so'
      ),
      ''
    )
    initUasmModules(inputDir)

    const options = initUasmTransformOptions('app-android')
    if (!options) {
      throw new Error('Expected UASM transform options')
    }

    expect(options.targetArchs).toEqual(['arm64-v8a'])
    expect(options.resolve('uni_modules/test-uasm')).toBe('libtest-uasm.so')
    expect(options.createLoadUasmTransformer).toBe(createLoadUasmTransformer)

    if (originalTargetArchs === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_APP_X_TARGET_ARCHS')
    } else {
      process.env.UNI_APP_X_TARGET_ARCHS = originalTargetArchs
    }
  })

  test('transform Android UTS loader from module id', () => {
    const originalDom2 = process.env.UNI_APP_X_DOM2
    const originalNodeEnv = process.env.NODE_ENV
    const originalUniNodeEnv = process.env.UNI_NODE_ENV
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.NODE_ENV = 'production'
    process.env.UNI_NODE_ENV = 'production'
    fs.outputFileSync(
      path.join(
        inputDir,
        'uni_modules/test-uasm/uasm/app-android/libs/arm64-v8a/libtest-uasm.so'
      ),
      ''
    )
    initUasmModules(inputDir)

    try {
      const creator = initUasmTransformerCreator('app-android')!
      const transform = (code: string) =>
        ts.transpileModule(code, {
          compilerOptions: { target: ts.ScriptTarget.ESNext },
          transformers: { before: [creator(ts).before] },
        }).outputText
      expect(transform(`uni.loadUASM('uni_modules/test-uasm')`)).toContain(
        'uni.loadUASM("libtest-uasm.so", () => uts.sdk.modules.testUasm.TestUasm)'
      )
      expect(
        transform(`uni.loadUASM<CompressionBridge>('uni_modules/test-uasm')`)
      ).toContain(
        'uni.loadUASM("libtest-uasm.so", () => uts.sdk.modules.testUasm.TestUasm)'
      )
    } finally {
      restoreEnv('UNI_APP_X_DOM2', originalDom2)
      restoreEnv('NODE_ENV', originalNodeEnv)
      restoreEnv('UNI_NODE_ENV', originalUniNodeEnv)
    }
  })

  test('generate Android UASM loader in Kotlin', async () => {
    const originalEnv = { ...process.env }
    const outputDir = path.join(inputDir, 'unpackage/dist/build/app-android')
    const tscDir = path.join(inputDir, 'unpackage/cache/.tsc')
    const uvueDir = path.join(inputDir, 'unpackage/cache/.uvue')
    const callerDir = path.join(inputDir, 'uni_modules/test-caller')
    const callerFile = path.join(callerDir, 'utssdk/app-android/index.uts')

    Object.assign(process.env, {
      NODE_ENV: 'production',
      UNI_NODE_ENV: 'production',
      UNI_COMPILE_TARGET: '',
      UNI_UTS_MODULE_PREFIX: '',
      UNI_APP_X: 'true',
      UNI_APP_X_DOM2: 'true',
      UNI_APP_X_TSC: 'true',
      UNI_INPUT_DIR: inputDir,
      UNI_OUTPUT_DIR: outputDir,
      UNI_UTS_PLATFORM: 'app-android',
      UNI_APP_X_CACHE_DIR: path.join(inputDir, 'unpackage/cache/app-android'),
      UNI_APP_X_TSC_DIR: tscDir,
      UNI_APP_X_UVUE_DIR: uvueDir,
      UNI_APP_X_TSC_CACHE_DIR: path.join(inputDir, 'unpackage/cache/tsc'),
    })
    fs.outputFileSync(
      path.join(
        inputDir,
        'uni_modules/test-uasm/uasm/app-android/libs/arm64-v8a/libtest-uasm.so'
      ),
      ''
    )
    fs.outputFileSync(
      callerFile,
      `export function load() {
  return uni.loadUASM('uni_modules/test-uasm')
}`
    )
    fs.outputFileSync(
      path.join(tscDir, 'uni-ext-api.d.ts'),
      `interface Uni {
  loadUASM<T>(module: string): Promise<T>
}`
    )
    initUasmModules(inputDir)

    try {
      await compileUniModuleWithTsc(
        'app-android',
        callerDir,
        createUniXKotlinCompiler({
          resolveWorkers: () => ({}),
          loadUasmTransformer: initUasmTransformerCreator('app-android'),
        }),
        {
          rootFiles: [],
          preprocessor: async (content) => content,
        }
      )
      await toKotlin(callerFile, {
        inputDir,
        outputDir,
        sourceMap: false,
        isX: true,
        isSingleThread: true,
        isPlugin: true,
        components: {},
        uniModules: [],
      })

      const kotlin = fs.readFileSync(
        path.join(
          outputDir,
          'uni_modules/test-caller/utssdk/app-android/index.kt'
        ),
        'utf8'
      )
      expect(kotlin).toMatch(
        /uni_loadUASM\("libtest-uasm\.so", fun\(\): uts\.sdk\.modules\.testUasm\.TestUasm\s*\{\s*return uts\.sdk\.modules\.testUasm\.TestUasm\s*\}\s*\)/
      )
    } finally {
      process.env = originalEnv
    }
  })

  test.each([
    'uni_modules/test-uasm',
    '/uni_modules/test-uasm',
    '@/uni_modules/test-uasm',
  ])('transforms UASM load path %s', (modulePath) => {
    expect(
      transformLoadUasm(`uni.loadUASM<TestUASM>('${modulePath}')`)
    ).toContain(
      'uni.loadUASM("uni_modules/test-uasm/uasm/app-android/libs/arm64-v8a/libtest-uasm.so")'
    )
  })

  test('keeps other UASM load arguments', () => {
    expect(
      transformLoadUasm(`uni.loadUASM('uni_modules/test-uasm', true)`)
    ).toContain(
      'uni.loadUASM("uni_modules/test-uasm/uasm/app-android/libs/arm64-v8a/libtest-uasm.so", true)'
    )
  })

  test('transforms a no-substitution UASM path template literal', () => {
    expect(
      transformLoadUasm('uni.loadUASM(`uni_modules/test-uasm`)')
    ).toContain(
      'uni.loadUASM("uni_modules/test-uasm/uasm/app-android/libs/arm64-v8a/libtest-uasm.so")'
    )
  })

  test('reports an unresolved UASM load path', () => {
    expect(() => transformLoadUasm(`uni.loadUASM('')`)).toThrow(
      '无法加载 uasm 插件[]，当前设备支持的 ABI：arm64-v8a, armeabi-v7a。请确认插件路径正确，且插件已提供匹配的库文件'
    )
  })

  test('reports an unspecified target ABI', () => {
    expect(() => transformLoadUasm(`uni.loadUASM('')`, [])).toThrow(
      '无法加载 uasm 插件[]，当前设备支持的 ABI：未指定。请确认插件路径正确，且插件已提供匹配的库文件'
    )
  })

  test('reports a dynamic UASM load path', () => {
    expect(() => transformLoadUasm(`uni.loadUASM(modulePath)`)).toThrow(
      'uni.loadUASM(modulePath) 的 modulePath 参数必须是字符串字面量'
    )
  })

  test('cache all platform and arch resources', () => {
    fs.outputFileSync(
      path.join(
        inputDir,
        'uni_modules/test-uasm/uasm/app-android/libs/arm64-v8a/libtest-uasm.so'
      ),
      ''
    )
    fs.outputFileSync(
      path.join(
        inputDir,
        'uni_modules/test-uasm/uasm/app-android/libs/armeabi-v7a/libtest-uasm.so'
      ),
      ''
    )
    fs.outputFileSync(
      path.join(
        inputDir,
        'uni_modules/test-uasm/uasm/app-ios/frameworks/Test.framework/Test'
      ),
      ''
    )

    expect(initUasmModules(inputDir)).toEqual({
      'test-uasm': {
        name: 'test-uasm',
        platforms: {
          'app-android': {
            dir: 'uni_modules/test-uasm/uasm/app-android/libs',
            archs: {
              'arm64-v8a': {
                dir: 'uni_modules/test-uasm/uasm/app-android/libs/arm64-v8a',
                file: 'uni_modules/test-uasm/uasm/app-android/libs/arm64-v8a/libtest-uasm.so',
              },
              'armeabi-v7a': {
                dir: 'uni_modules/test-uasm/uasm/app-android/libs/armeabi-v7a',
                file: 'uni_modules/test-uasm/uasm/app-android/libs/armeabi-v7a/libtest-uasm.so',
              },
            },
          },
          'app-ios': {
            dir: 'uni_modules/test-uasm/uasm/app-ios/frameworks',
            archs: {},
          },
        },
      },
    })
    expect(getUasmModules()).toEqual(initUasmModules(inputDir))
  })

  test('cache and resolve web entry', () => {
    fs.outputFileSync(
      path.join(inputDir, 'uni_modules/test-uasm/uasm/web/test-uasm.js'),
      ''
    )
    initUasmModules(inputDir)

    expect(getUasmModules()).toEqual({
      'test-uasm': {
        name: 'test-uasm',
        platforms: {},
        web: {
          entry: 'uni_modules/test-uasm/uasm/web/test-uasm.js',
        },
      },
    })
    for (const modulePath of [
      'uni_modules/test-uasm',
      '/uni_modules/test-uasm',
      '@/uni_modules/test-uasm',
    ]) {
      expect(resolveUasmWebLoad(modulePath)).toEqual({
        id: 'test-uasm',
        entry: '@/uni_modules/test-uasm/uasm/web/test-uasm.js',
      })
      expect(
        transformWebLoadUasm(`uni.loadUASM<TestUASM>('${modulePath}', true)`)
      ).toContain(
        'uni.loadUASM({ id: "test-uasm", loader: () => import("@/uni_modules/test-uasm/uasm/web/test-uasm.js") }, true)'
      )
    }
  })

  test('report a missing web entry', () => {
    initUasmModules(inputDir)

    expect(() =>
      transformWebLoadUasm(`uni.loadUASM('uni_modules/test-uasm')`)
    ).toThrow(
      '无法加载 uasm 插件[uni_modules/test-uasm]，请确认插件路径正确，且插件已提供入口文件 uni_modules/test-uasm/uasm/web/test-uasm.js'
    )
  })

  test('resolve the first existing target arch from cache', () => {
    fs.outputFileSync(
      path.join(
        inputDir,
        'uni_modules/test-uasm/uasm/app-harmony/libs/x86_64/other.so'
      ),
      ''
    )
    fs.outputFileSync(
      path.join(
        inputDir,
        'uni_modules/test-uasm/uasm/app-harmony/libs/arm64-v8a/libtest-uasm.so'
      ),
      ''
    )
    fs.outputFileSync(
      path.join(
        inputDir,
        'uni_modules/test-uasm/uasm/app-harmony/libs/armeabi-v7a/libtest-uasm.so'
      ),
      ''
    )
    initUasmModules(inputDir)

    const targetArchs = ['x86_64', 'arm64-v8a', 'armeabi-v7a']
    expect(resolveUasmTargetArch('test-uasm', 'app-harmony', targetArchs)).toBe(
      'arm64-v8a'
    )
    expect(
      resolveUasmModule('test-uasm', 'app-harmony', targetArchs)
    ).toMatchObject({
      name: 'test-uasm',
      platform: 'app-harmony',
      arch: 'arm64-v8a',
      dir: 'uni_modules/test-uasm/uasm/app-harmony/libs/arm64-v8a',
      file: 'uni_modules/test-uasm/uasm/app-harmony/libs/arm64-v8a/libtest-uasm.so',
    })
    expect(
      resolveUasmTargetArch('test-uasm', 'app-harmony', ['x86_64'])
    ).toBeUndefined()
  })

  test('resolve load path', () => {
    fs.outputFileSync(
      path.join(
        inputDir,
        'uni_modules/test-uasm/uasm/app-android/libs/arm64-v8a/libtest-uasm.so'
      ),
      ''
    )
    fs.outputFileSync(
      path.join(
        inputDir,
        'uni_modules/test-uasm/uasm/app-harmony/libs/arm64-v8a/libtest-uasm.so'
      ),
      ''
    )
    fs.outputFileSync(
      path.join(
        inputDir,
        'uni_modules/test-uasm/uasm/app-ios/frameworks/Test.framework/Test'
      ),
      ''
    )
    initUasmModules(inputDir)

    const androidFile =
      'uni_modules/test-uasm/uasm/app-android/libs/arm64-v8a/libtest-uasm.so'
    for (const modulePath of [
      'uni_modules/test-uasm',
      '/uni_modules/test-uasm',
      '@/uni_modules/test-uasm',
    ]) {
      expect(parseUasmModuleName(modulePath)).toBe('test-uasm')
      expect(
        resolveUasmLoadPath(modulePath, 'app-android', false, ['arm64-v8a'])
      ).toBe(androidFile)
    }

    expect(
      resolveUasmLoadPath('uni_modules/test-uasm', 'app-android', true)
    ).toBe('libtest-uasm.so')
    expect(
      resolveUasmLoadPath('uni_modules/test-uasm', 'app-harmony', true)
    ).toBe('libtest-uasm.so')
    expect(
      resolveUasmLoadPath('uni_modules/test-uasm', 'app-harmony', false, [
        'arm64-v8a',
      ])
    ).toBe('libtest-uasm.so')
    expect(resolveUasmLoadPath('uni_modules/test-uasm', 'app-ios', false)).toBe(
      'test-uasm'
    )
    expect(
      resolveUasmLoadPath('uni_modules/test-uasm', 'app-android', false, [])
    ).toBeUndefined()
    expect(
      resolveUasmLoadPath('uni_modules/test-uasm', 'app-harmony', false, [])
    ).toBeUndefined()
    expect(
      resolveUasmLoadPath('uni_modules/test-uasm', 'app-android', false, [
        'x86_64',
      ])
    ).toBeUndefined()
    expect(
      resolveUasmLoadPath('uni_modules/test-uasm', 'app-harmony', false, [
        'x86_64',
      ])
    ).toBeUndefined()
    expect(parseUasmModuleName('./uni_modules/test-uasm')).toBeUndefined()
    expect(parseUasmModuleName('../uni_modules/test-uasm')).toBeUndefined()
    expect(parseUasmModuleName('uni_modules/test-uasm/subpath')).toBeUndefined()
    expect(
      resolveUasmLoadPath('uni_modules/missing', 'app-android', true)
    ).toBeUndefined()
  })

  test.each(['app-android', 'app-harmony'] as const)(
    'reject %s resources without a correctly named so',
    (platform) => {
      fs.outputFileSync(
        path.join(
          inputDir,
          `uni_modules/test-uasm/uasm/${platform}/libs/arm64-v8a/other.so`
        ),
        ''
      )
      initUasmModules(inputDir)

      expect(getUasmModules()).not.toHaveProperty(
        `test-uasm.platforms.${platform}`
      )
      expect(
        resolveUasmLoadPath('uni_modules/test-uasm', platform, true)
      ).toBeUndefined()
      expect(
        resolveUasmLoadPath('uni_modules/test-uasm', platform, false, [
          'arm64-v8a',
        ])
      ).toBeUndefined()
    }
  )

  test('resolve copy assets in development', () => {
    fs.outputFileSync(
      path.join(
        inputDir,
        'uni_modules/module-a/uasm/app-android/libs/arm64-v8a/libmodule-a.so'
      ),
      ''
    )
    fs.outputFileSync(
      path.join(
        inputDir,
        'uni_modules/module-b/uasm/app-android/libs/x86_64/libmodule-b.so'
      ),
      ''
    )
    initUasmModules(inputDir)

    expect(
      resolveUasmCopyAssets('app-android', false, ['x86_64', 'arm64-v8a'])
    ).toEqual([
      'uni_modules/module-a/uasm/app-android/libs/arm64-v8a/**/*',
      'uni_modules/module-b/uasm/app-android/libs/x86_64/**/*',
    ])
    expect(resolveUasmCopyAssets('app-ios', false)).toEqual([])
    expect(resolveUasmCopyAssets('app-android', false, [])).toEqual([])
  })

  test('initialize the cache when creating the Vite plugin', () => {
    const arm64File = path.join(
      inputDir,
      'uni_modules/test-uasm/uasm/app-android/libs/arm64-v8a/libtest-uasm.so'
    )
    fs.outputFileSync(arm64File, '')

    const plugin = uniUasmPlugin(inputDir)
    expect(
      resolveUasmTargetArch('test-uasm', 'app-android', ['arm64-v8a'])
    ).toBe('arm64-v8a')
    expect(plugin.enforce).toBe('post')
  })

  describe('copy ios frameworks in development', () => {
    let dependenciesDir: string
    let originalEnv: Record<string, string | undefined>

    beforeEach(() => {
      dependenciesDir = path.resolve(inputDir, 'dependencies')
      originalEnv = {
        UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
        UNI_NODE_ENV: process.env.UNI_NODE_ENV,
        UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
        UNI_COMPILE_TARGET: process.env.UNI_COMPILE_TARGET,
        HX_DEPENDENCIES_DIR: process.env.HX_DEPENDENCIES_DIR,
        HX_RUN_DEVICE_TYPE: process.env.HX_RUN_DEVICE_TYPE,
      }
      process.env.UNI_UTS_PLATFORM = 'app-ios'
      process.env.UNI_NODE_ENV = 'development'
      process.env.UNI_APP_X_DOM2 = 'true'
      Reflect.deleteProperty(process.env, 'UNI_COMPILE_TARGET')
      Reflect.deleteProperty(process.env, 'HX_RUN_DEVICE_TYPE')
      process.env.HX_DEPENDENCIES_DIR = dependenciesDir
    })

    afterEach(() => {
      jest.restoreAllMocks()
      Object.entries(originalEnv).forEach(([key, value]) => {
        if (value === undefined) {
          Reflect.deleteProperty(process.env, key)
        } else {
          process.env[key] = value
        }
      })
    })

    function createFramework(moduleName: string, frameworkName = moduleName) {
      const xcframeworkDir = path.resolve(
        inputDir,
        `uni_modules/${moduleName}/uasm/app-ios/frameworks/${frameworkName}.xcframework`
      )
      const deviceFile = path.resolve(
        xcframeworkDir,
        `ios-arm64/${frameworkName}.framework/${frameworkName}`
      )
      const simulatorFile = path.resolve(
        xcframeworkDir,
        `ios-arm64-simulator/${frameworkName}.framework/${frameworkName}`
      )
      fs.outputFileSync(deviceFile, `${frameworkName}-device`)
      fs.outputFileSync(simulatorFile, `${frameworkName}-simulator`)
      return { deviceFile, simulatorFile }
    }

    function getManifest(moduleName: string) {
      return fs.readJsonSync(
        path.resolve(
          dependenciesDir,
          'app-ios',
          'uasm',
          'uni_modules',
          moduleName,
          'uasm',
          'manifest.json'
        )
      )
    }

    function writeBundle() {
      const plugin = uniUasmPlugin(inputDir)
      Reflect.apply(plugin.writeBundle as () => void, plugin, [])
    }

    test.each([
      ['device', undefined, 'ios-arm64', 'zstd-device'],
      ['simulator', 'ios_simulator', 'ios-arm64-simulator', 'zstd-simulator'],
    ])('copy the %s slice', (_, deviceType, libraryIdentifier, content) => {
      createFramework('zstd')
      if (deviceType) {
        process.env.HX_RUN_DEVICE_TYPE = deviceType
      }

      writeBundle()

      expect(
        fs.readFileSync(
          path.resolve(dependenciesDir, 'modules/zstd.framework/zstd'),
          'utf8'
        )
      ).toBe(content)
      expect(getManifest('zstd')).toMatchObject({
        version: 1,
        libraryIdentifier,
        files: {
          'zstd.xcframework/zstd.framework/zstd': {
            size: content.length,
            mtimeMs: expect.any(Number),
            mode: expect.any(Number),
          },
        },
      })
    })

    test('isolate manifests by module', () => {
      createFramework('zstd')
      createFramework('other')

      writeBundle()

      expect(Object.keys(getManifest('zstd').files)).toEqual([
        'zstd.xcframework/zstd.framework/zstd',
      ])
      expect(Object.keys(getManifest('other').files)).toEqual([
        'other.xcframework/other.framework/other',
      ])
    })

    test('support multiple xcframeworks in one module', () => {
      createFramework('zstd')
      createFramework('zstd', 'helper')

      writeBundle()

      expect(Object.keys(getManifest('zstd').files)).toEqual([
        'helper.xcframework/helper.framework/helper',
        'zstd.xcframework/zstd.framework/zstd',
      ])
      expect(
        fs.readFileSync(
          path.resolve(dependenciesDir, 'modules/helper.framework/helper'),
          'utf8'
        )
      ).toBe('helper-device')
    })

    test('reuse the cache until the source or device type changes', () => {
      const { deviceFile } = createFramework('zstd')
      const copySync = jest.spyOn(fs, 'copySync')

      writeBundle()
      writeBundle()
      expect(copySync).toHaveBeenCalledTimes(1)

      fs.outputFileSync(deviceFile, 'zstd-device-changed')
      writeBundle()
      expect(copySync).toHaveBeenCalledTimes(2)

      process.env.HX_RUN_DEVICE_TYPE = 'ios_simulator'
      writeBundle()
      expect(copySync).toHaveBeenCalledTimes(3)
    })

    test('track xcframework and framework symbolic links', () => {
      const frameworksDir = path.resolve(
        inputDir,
        'uni_modules/zstd/uasm/app-ios/frameworks'
      )
      const xcframeworkDir = path.resolve(inputDir, 'external/zstd.xcframework')
      const versionsDir = path.resolve(
        xcframeworkDir,
        'ios-arm64/zstd.framework/Versions'
      )
      fs.outputFileSync(path.resolve(versionsDir, 'A/zstd'), 'zstd')
      fs.outputFileSync(path.resolve(versionsDir, 'B/zstd'), 'zstd')
      fs.ensureDirSync(frameworksDir)
      fs.symlinkSync(
        xcframeworkDir,
        path.resolve(frameworksDir, 'zstd.xcframework'),
        'dir'
      )
      const currentLink = path.resolve(versionsDir, 'Current')
      fs.symlinkSync('A', currentLink, 'dir')
      const copySync = jest.spyOn(fs, 'copySync')

      writeBundle()
      expect(copySync).toHaveBeenCalledTimes(1)
      expect(
        getManifest('zstd').files[
          'zstd.xcframework/zstd.framework/Versions/Current'
        ].link
      ).toBe('A')
      expect(
        fs.readlinkSync(
          path.resolve(
            dependenciesDir,
            'modules/zstd.framework/Versions/Current'
          )
        )
      ).toBe('A')

      fs.removeSync(currentLink)
      fs.symlinkSync('B', currentLink, 'dir')
      writeBundle()

      expect(copySync).toHaveBeenCalledTimes(2)
      expect(
        getManifest('zstd').files[
          'zstd.xcframework/zstd.framework/Versions/Current'
        ].link
      ).toBe('B')
      expect(
        fs.readlinkSync(
          path.resolve(
            dependenciesDir,
            'modules/zstd.framework/Versions/Current'
          )
        )
      ).toBe('B')
    })

    test.each([
      ['other platform', 'UNI_UTS_PLATFORM', 'app-android'],
      ['production', 'UNI_NODE_ENV', 'production'],
      ['non-DOM2', 'UNI_APP_X_DOM2', 'false'],
      ['special compile target', 'UNI_COMPILE_TARGET', 'uni_modules'],
      ['missing dependencies directory', 'HX_DEPENDENCIES_DIR', undefined],
    ])('skip copying for %s', (_, envName, envValue) => {
      createFramework('zstd')
      if (envValue === undefined) {
        Reflect.deleteProperty(process.env, envName)
      } else {
        process.env[envName] = envValue
      }
      const copySync = jest.spyOn(fs, 'copySync')

      writeBundle()

      expect(copySync).not.toHaveBeenCalled()
    })

    test('process only once in the same plugin instance', () => {
      createFramework('zstd')
      const plugin = uniUasmPlugin(inputDir)
      const copySync = jest.spyOn(fs, 'copySync')

      Reflect.apply(plugin.writeBundle as () => void, plugin, [])
      Reflect.apply(plugin.writeBundle as () => void, plugin, [])

      expect(copySync).toHaveBeenCalledTimes(1)
    })
  })

  test('resolve all platform resources in production', () => {
    expect(resolveUasmCopyAssets('app-android', true)).toEqual([
      'uni_modules/*/uasm/app-android/libs/**/*',
    ])
    expect(resolveUasmCopyAssets('app-ios', true)).toEqual([
      'uni_modules/*/uasm/app-ios/frameworks/**/*',
    ])
  })
})

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) {
    Reflect.deleteProperty(process.env, name)
  } else {
    process.env[name] = value
  }
}
