import fs from 'fs-extra'
import os from 'node:os'
import path from 'node:path'
import { type CopyOptions, initUasmModules } from '@dcloudio/uni-cli-shared'
import { createUniOptions } from '../src/plugins/utils'

type AppPlatform = 'app-android' | 'app-ios' | 'app-harmony'

function resolveCopyOptions(platform: AppPlatform) {
  const copyOptions = createUniOptions(platform)!
    .copyOptions as () => CopyOptions
  return copyOptions()
}

function resolveCopyAssets(platform: AppPlatform) {
  return resolveCopyOptions(platform).assets
}

describe('createUniOptions', () => {
  const originalEnv = {
    NODE_ENV: process.env.NODE_ENV,
    UNI_NODE_ENV: process.env.UNI_NODE_ENV,
    UNI_APP_X_TARGET_ARCHS: process.env.UNI_APP_X_TARGET_ARCHS,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_OUTPUT_DIR: process.env.UNI_OUTPUT_DIR,
  }
  let inputDir: string

  beforeEach(() => {
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-app-uts-utils-'))
    process.env.NODE_ENV = 'development'
    process.env.UNI_NODE_ENV = 'development'
    process.env.UNI_INPUT_DIR = inputDir
    process.env.UNI_OUTPUT_DIR = path.join(inputDir, 'output')
    delete process.env.UNI_APP_X_TARGET_ARCHS
  })

  afterEach(() => {
    fs.removeSync(inputDir)
    Object.entries(originalEnv).forEach(([key, value]) => {
      if (value === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = value
      }
    })
  })

  test.each(['app-android', 'app-harmony'] as const)(
    'copy the first matching %s uasm arch for each module',
    (platform) => {
      fs.outputFileSync(
        path.join(
          inputDir,
          'uni_modules/module-a/uasm',
          platform,
          'libs/arm64-v8a/libmodule-a.so'
        ),
        ''
      )
      fs.outputFileSync(
        path.join(
          inputDir,
          'uni_modules/module-a/uasm',
          platform,
          'libs/armeabi-v7a/libmodule-a.so'
        ),
        ''
      )
      fs.outputFileSync(
        path.join(
          inputDir,
          'uni_modules/module-b/uasm',
          platform,
          'libs/x86_64/libmodule-b.so'
        ),
        ''
      )
      process.env.UNI_APP_X_TARGET_ARCHS = JSON.stringify([
        'x86_64',
        'arm64-v8a',
        'armeabi-v7a',
      ])
      initUasmModules(inputDir)

      expect(resolveCopyAssets(platform)).toEqual(
        expect.arrayContaining([
          `uni_modules/module-a/uasm/${platform}/libs/arm64-v8a/**/*`,
          `uni_modules/module-b/uasm/${platform}/libs/x86_64/**/*`,
        ])
      )
      expect(resolveCopyAssets(platform)).not.toContain(
        `uni_modules/module-a/uasm/${platform}/libs/armeabi-v7a/**/*`
      )
    }
  )

  test.each(['app-android', 'app-harmony'] as const)(
    'does not copy %s uasm resources without target archs',
    (platform) => {
      expect(resolveCopyAssets(platform)).not.toEqual(
        expect.arrayContaining([
          expect.stringContaining(`uni_modules/*/uasm/${platform}`),
        ])
      )
    }
  )

  test('does not copy app-ios uasm frameworks', () => {
    process.env.UNI_APP_X_TARGET_ARCHS = JSON.stringify(['arm64'])

    expect(resolveCopyAssets('app-ios')).not.toEqual(
      expect.arrayContaining([
        expect.stringContaining('uni_modules/*/uasm/app-ios'),
      ])
    )
  })

  test('uses UNI_NODE_ENV before Vite restores NODE_ENV', () => {
    process.env.NODE_ENV = 'production'
    process.env.UNI_NODE_ENV = 'development'
    process.env.UNI_APP_X_TARGET_ARCHS = JSON.stringify(['arm64'])

    expect(resolveCopyAssets('app-ios')).not.toEqual(
      expect.arrayContaining([
        expect.stringContaining('uni_modules/*/uasm/app-ios'),
      ])
    )
  })

  test.each([
    ['app-android', 'libs'],
    ['app-harmony', 'libs'],
    ['app-ios', 'frameworks'],
  ] as const)(
    'copy all %s uasm resources for production',
    (platform, resourceDir) => {
      process.env.NODE_ENV = 'production'
      process.env.UNI_NODE_ENV = 'production'
      process.env.UNI_APP_X_TARGET_ARCHS = JSON.stringify(['arm64-v8a'])

      expect(resolveCopyAssets(platform)).toContain(
        `uni_modules/*/uasm/${platform}/${resourceDir}/**/*`
      )
    }
  )
})
