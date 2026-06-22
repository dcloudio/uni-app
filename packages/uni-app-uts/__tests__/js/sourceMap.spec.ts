import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import { pathToFileURL } from 'node:url'
import { normalizePath } from '@dcloudio/uni-cli-shared'
import {
  resolveAppServiceSourceMapFileUrl,
  resolveAppServiceSourceMapSourceRoot,
  resolveAppServiceSourceMapUrl,
  rewriteAppServiceSourceMappingURL,
  writeAppServiceSourceMapToCache,
} from '../../src/plugins/js/sourceMap'

describe('app service sourcemap', () => {
  const originalEnv = {
    NODE_ENV: process.env.NODE_ENV,
    UNI_APP_X_CACHE_DIR: process.env.UNI_APP_X_CACHE_DIR,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_OUTPUT_DIR: process.env.UNI_OUTPUT_DIR,
    UNI_PLATFORM: process.env.UNI_PLATFORM,
  }
  let tempDir: string

  afterEach(() => {
    Object.entries(originalEnv).forEach(([key, value]) => {
      if (value === undefined) {
        Reflect.deleteProperty(process.env, key)
      } else {
        process.env[key] = value
      }
    })
    if (tempDir) {
      fs.removeSync(tempDir)
      tempDir = ''
    }
  })

  test('resolves app-service sourcemap paths to cache', () => {
    const projectDir = '/project'
    ;[
      {
        platform: 'app-android',
        cacheDir: '.app-android',
      },
      {
        platform: 'app-ios',
        cacheDir: '.app-ios',
      },
    ].forEach(({ platform, cacheDir }) => {
      const outputDir = path.resolve(
        projectDir,
        `unpackage/dist/dev/${platform}`
      )
      const sourceMapFileName = path.resolve(
        projectDir,
        `unpackage/cache/vapor/${cacheDir}/sourcemap/app-service.js.map`
      )

      expect(
        resolveAppServiceSourceMapUrl(
          outputDir,
          'app-service.js',
          sourceMapFileName
        )
      ).toBe(`../../../cache/vapor/${cacheDir}/sourcemap/app-service.js.map`)
      expect(
        resolveAppServiceSourceMapSourceRoot(sourceMapFileName, projectDir)
      ).toBe('../../../../..')
    })
    expect(
      resolveAppServiceSourceMapFileUrl(
        path.resolve(
          projectDir,
          'unpackage/cache/vapor/.app-android/sourcemap/app-service.js.map'
        )
      )
    ).toBe(
      pathToFileURL(
        path.resolve(
          projectDir,
          'unpackage/cache/vapor/.app-android/sourcemap/app-service.js.map'
        )
      ).href
    )
    expect(
      rewriteAppServiceSourceMappingURL(
        'console.log(1)\n//# sourceMappingURL=app-service.js.map',
        '../../../cache/vapor/.app-android/sourcemap/app-service.js.map'
      )
    ).toBe(
      'console.log(1)\n//# sourceMappingURL=../../../cache/vapor/.app-android/sourcemap/app-service.js.map'
    )
  })

  test('writes cache sourcemap and rewrites app-service.js reference', () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-app-uts-sourcemap-'))
    const outputDir = path.resolve(tempDir, 'unpackage/dist/dev/app-android')
    const cacheDir = path.resolve(tempDir, 'unpackage/cache/vapor/.app-android')
    const bundle = {
      'app-service.js': {
        type: 'chunk',
        code: 'console.log(1)\n//# sourceMappingURL=app-service.js.map',
      },
      'app-service.js.map': {
        type: 'asset',
        source: JSON.stringify({
          version: 3,
          file: 'app-service.js',
          sources: ['pages/index/index.uvue'],
          names: [],
          mappings: '',
        }),
      },
    } as any

    writeAppServiceSourceMapToCache({
      file: 'app-service.js.map',
      sourceMap: bundle['app-service.js.map'].source,
      bundle,
      inputDir: tempDir,
      outputDir,
      cacheDir,
      keepSourceMapInBundle: false,
      useCacheSourceMapUrl: true,
      sourceMapUrlMode: 'absolute',
      sourceRootMode: 'relative',
    })

    const sourceMapFileName = path.resolve(
      cacheDir,
      'sourcemap/app-service.js.map'
    )
    expect(bundle['app-service.js'].code).toContain(
      `//# sourceMappingURL=${resolveAppServiceSourceMapFileUrl(
        sourceMapFileName
      )}`
    )
    expect(bundle['app-service.js.map']).toBeUndefined()
    expect(
      JSON.parse(fs.readFileSync(sourceMapFileName, 'utf8'))
    ).toMatchObject({
      sourceRoot: '../../../../..',
    })
  })

  test('writes iOS cache sourcemap with relative URL and absolute sourceRoot', () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-app-uts-sourcemap-'))
    const outputDir = path.resolve(tempDir, 'unpackage/dist/dev/app-ios')
    const cacheDir = path.resolve(tempDir, 'unpackage/cache/vapor/.app-ios')
    const bundle = {
      'app-service.js': {
        type: 'chunk',
        code: 'console.log(1)\n//# sourceMappingURL=app-service.js.map',
      },
      'app-service.js.map': {
        type: 'asset',
        source: JSON.stringify({
          version: 3,
          file: 'app-service.js',
          sources: ['pages/index/index.uvue', 'App.uvue'],
          names: [],
          mappings: '',
        }),
      },
    } as any

    writeAppServiceSourceMapToCache({
      file: 'app-service.js.map',
      sourceMap: bundle['app-service.js.map'].source,
      bundle,
      inputDir: tempDir,
      outputDir,
      cacheDir,
      keepSourceMapInBundle: false,
      useCacheSourceMapUrl: true,
      sourceMapUrlMode: 'relative',
      sourceRootMode: 'absolute',
    })

    const sourceMapFileName = path.resolve(
      cacheDir,
      'sourcemap/app-service.js.map'
    )
    expect(bundle['app-service.js'].code).toContain(
      '//# sourceMappingURL=../../../cache/vapor/.app-ios/sourcemap/app-service.js.map'
    )
    expect(bundle['app-service.js.map']).toBeUndefined()
    expect(
      JSON.parse(fs.readFileSync(sourceMapFileName, 'utf8'))
    ).toMatchObject({
      sourceRoot: normalizePath(tempDir),
      sources: ['pages/index/index.uvue', 'App.uvue'],
    })
  })

  test('keeps default sourceRoot when cache URL rewrite is disabled', () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-app-uts-sourcemap-'))
    const outputDir = path.resolve(tempDir, 'unpackage/dist/build/app-android')
    const cacheDir = path.resolve(tempDir, 'unpackage/cache/.app-android')
    const bundle = {
      'app-service.js': {
        type: 'chunk',
        code: 'console.log(1)',
      },
      'app-service.js.map': {
        type: 'asset',
        source: JSON.stringify({
          version: 3,
          file: 'app-service.js',
          sources: ['pages/index/index.uvue'],
          names: [],
          mappings: '',
        }),
      },
    } as any

    writeAppServiceSourceMapToCache({
      file: 'app-service.js.map',
      sourceMap: bundle['app-service.js.map'].source,
      bundle,
      inputDir: tempDir,
      outputDir,
      cacheDir,
      keepSourceMapInBundle: false,
      useCacheSourceMapUrl: false,
      sourceMapUrlMode: 'relative',
      sourceRootMode: 'absolute',
    })

    const sourceMapFileName = path.resolve(
      cacheDir,
      'sourcemap/app-service.js.map'
    )
    expect(bundle['app-service.js'].code).toBe('console.log(1)')
    expect(
      JSON.parse(fs.readFileSync(sourceMapFileName, 'utf8'))
    ).toMatchObject({
      sourceRoot: normalizePath(tempDir),
    })
  })
})
