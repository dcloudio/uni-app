import path, { resolve } from 'path'
import {
  checkManifest,
  genManifestFile,
  resolveManifestJson,
  resolvePluginFiles,
} from '../src/manifest/manifest'
import { checkKotlinCompile, checkSwiftCompile } from '../src/manifest/index'
import {
  resolveSourceMapCacheFilename,
  resolveSourceMapFilename,
} from '../src/manifest/sourceMap'

const pluginModuleDir = resolve(__dirname, 'examples/uts/uni_modules/test-uts')
const pluginDir = resolve(__dirname, 'examples/uts/utssdk/test-uts')

const outputDir = resolve(__dirname, 'examples/uts/unpackage/dist/dev/app-plus')
const cacheDir = resolve(__dirname, 'examples/uts/unpackage/cache')
const env = { compilerVersion: '3.6.10' }

const pluginModuleOptions = {
  id: 'test-uts',
  env,
  cacheDir,
  outputDir,
  pluginDir: pluginModuleDir,
  pluginRelativeDir: 'uni_modules/test-uts',
  is_uni_modules: true,
}

const pluginOptions = {
  id: 'test-uts',
  env,
  cacheDir,
  outputDir,
  pluginDir,
  pluginRelativeDir: 'utssdk/test-uts',
  is_uni_modules: false,
}

describe('manifest', () => {
  test('resolve android files', async () => {
    expect(await resolvePluginFiles('app-android', pluginDir, false)).toEqual([
      'index.uts',
      'interface.uts',
      'package.json',
      'common/utils.uts',
      'common/test/test.uts',
    ])
    expect(
      await resolvePluginFiles('app-android', pluginModuleDir, true)
    ).toEqual([
      'package.json',
      'utssdk/index.uts',
      'utssdk/common/utils.uts',
      'utssdk/app-android/index.uts',
      'utssdk/app-android/index.vue',
      'utssdk/app-android/assets/test.json',
    ])
  })
  test('resolve ios files', async () => {
    expect(await resolvePluginFiles('app-ios', pluginDir, false)).toEqual([
      'index.uts',
      'interface.uts',
      'package.json',
      'common/utils.uts',
      'common/test/test.uts',
    ])
    expect(await resolvePluginFiles('app-ios', pluginModuleDir, true)).toEqual([
      'package.json',
      'utssdk/index.uts',
      'utssdk/common/utils.uts',
      'utssdk/app-ios/index.uts',
      'utssdk/app-ios/assets/test.json',
    ])
  })
  test('check manifest', async () => {
    await genManifestFile('app-android', pluginModuleOptions)
    await genManifestFile('app-ios', pluginModuleOptions)
    await genManifestFile('app-android', pluginOptions)
    await genManifestFile('app-ios', pluginOptions)
    const manifest = resolveManifestJson(
      'app-android',
      pluginModuleOptions.pluginRelativeDir,
      cacheDir
    )!
    expect(
      await checkManifest(manifest, {
        env: { compilerVersion: '3.6.11' },
        files: [],
        pluginDir: pluginModuleDir,
      })
    ).toBe(false)
    expect(
      await checkManifest(manifest, {
        env,
        files: Object.keys(manifest.files),
        pluginDir: pluginModuleDir,
      })
    ).toBe(true)
    const manifest1 = JSON.parse(JSON.stringify(manifest))
    const filename = 'utssdk/app-android/assets/test.json'
    manifest1.files[filename]['md5'] = ''
    expect(
      await checkManifest(manifest1, {
        env,
        files: Object.keys(manifest.files),
        pluginDir: pluginModuleDir,
      })
    ).toBe(filename)
  })
  test('gen android manifest', async () => {
    const res = await checkKotlinCompile('standard', pluginModuleOptions)
    expect(res.expired).toBe(false)
    expect(res.files.length).toBe(6)
    expect(res.tips).toBeTruthy()

    const res1 = await checkKotlinCompile('standard', pluginOptions)
    expect(res1.expired).toBe(false)
    expect(res1.files.length).toBe(5)
    expect(res1.tips).toBe('')
  })
  test('gen ios manifest', async () => {
    const res = await checkSwiftCompile('standard', pluginModuleOptions)
    expect(res.expired).toBe(false)
    expect(res.files.length).toBe(5)
    expect(res.tips).toBe('')
    const res1 = await checkSwiftCompile('standard', pluginOptions)
    expect(res1.expired).toBe(false)
    expect(res1.files.length).toBe(5)
    expect(res1.tips).toBe('')
  })
  test('sourcemap', () => {
    expect(
      resolveSourceMapFilename(
        'app-android',
        pluginModuleOptions.pluginRelativeDir,
        outputDir,
        true
      ).endsWith(
        path.join(
          '.sourcemap',
          'app',
          'uni_modules',
          pluginModuleOptions.id,
          'utssdk',
          'app-android',
          'index.kt.map'
        )
      )
    ).toBe(true)

    expect(
      resolveSourceMapFilename(
        'app-ios',
        pluginModuleOptions.pluginRelativeDir,
        outputDir,
        true
      ).endsWith(
        path.join(
          '.sourcemap',
          'app',
          'uni_modules',
          pluginModuleOptions.id,
          'utssdk',
          'app-ios',
          'index.swift.map'
        )
      )
    ).toBe(true)

    expect(
      resolveSourceMapCacheFilename(
        'app-android',
        cacheDir,
        pluginModuleOptions.pluginRelativeDir
      ).endsWith(path.join('uni_modules', 'test-uts', 'index.kt.map'))
    ).toBe(true)

    expect(
      resolveSourceMapCacheFilename(
        'app-ios',
        cacheDir,
        pluginModuleOptions.pluginRelativeDir
      ).endsWith(path.join('uni_modules', 'test-uts', 'index.swift.map'))
    ).toBe(true)

    expect(
      resolveSourceMapFilename(
        'app-android',
        pluginOptions.pluginRelativeDir,
        outputDir,
        false
      ).endsWith(
        path.join(
          '.sourcemap',
          'app',
          'utssdk',
          pluginOptions.id,
          'app-android',
          'index.kt.map'
        )
      )
    ).toBe(true)

    expect(
      resolveSourceMapFilename(
        'app-ios',
        pluginOptions.pluginRelativeDir,
        outputDir,
        false
      ).endsWith(
        path.join(
          '.sourcemap',
          'app',
          'utssdk',
          pluginOptions.id,
          'app-ios',
          'index.swift.map'
        )
      )
    ).toBe(true)

    expect(
      resolveSourceMapCacheFilename(
        'app-android',
        cacheDir,
        pluginOptions.pluginRelativeDir
      ).endsWith(path.join('utssdk', 'test-uts', 'index.kt.map'))
    ).toBe(true)

    expect(
      resolveSourceMapCacheFilename(
        'app-ios',
        cacheDir,
        pluginOptions.pluginRelativeDir
      ).endsWith(path.join('utssdk', 'test-uts', 'index.swift.map'))
    ).toBe(true)
  })
})
