import fs from 'fs-extra'
import os from 'node:os'
import path from 'node:path'
import {
  getUasmModules,
  initUasmModules,
  parseUasmModuleName,
  parseUniAppXTargetArchs,
  resolveUasmCopyAssets,
  resolveUasmLoadPath,
  resolveUasmModule,
  resolveUasmTargetArch,
  uniUasmPlugin,
} from '../src/uasm'

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
    expect(resolveUasmLoadPath('uni_modules/test-uasm', 'app-ios', false)).toBe(
      'test-uasm'
    )
    expect(
      resolveUasmLoadPath('uni_modules/test-uasm', 'app-android', false, [])
    ).toBe('test-uasm')
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

    uniUasmPlugin(inputDir)
    expect(
      resolveUasmTargetArch('test-uasm', 'app-android', ['arm64-v8a'])
    ).toBe('arm64-v8a')
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
