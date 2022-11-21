import { resolve } from 'path'
import {
  resolvePluginAndroidFiles,
  resolvePluginCommonFiles,
  resolvePluginIOSFiles,
} from '../src/manifest/manifest'

const pluginModuleDir = resolve(__dirname, 'examples/uts/uni_modules/test-uts')
const pluginDir = resolve(__dirname, 'examples/uts/utssdk/test-uts')

describe('manifest', () => {
  test('resolve common files', async () => {
    expect(await resolvePluginCommonFiles(pluginDir, false)).toEqual([
      'index.uts',
      'package.json',
      'common/utils.uts',
      'common/test/test.uts',
    ])
    expect(await resolvePluginCommonFiles(pluginModuleDir, true)).toEqual([
      'package.json',
      'utssdk/common/utils.uts',
    ])
  })
  test('resolve android files', async () => {
    expect(await resolvePluginAndroidFiles(pluginDir, false)).toEqual([
      'app-android/assets/test.json',
    ])
    expect(await resolvePluginAndroidFiles(pluginModuleDir, true)).toEqual([
      'utssdk/app-android/index.uts',
      'utssdk/app-android/assets/test.json',
    ])
  })
  test('resolve ios files', async () => {
    expect(await resolvePluginIOSFiles(pluginDir, false)).toEqual([])
    expect(await resolvePluginIOSFiles(pluginModuleDir, true)).toEqual([
      'utssdk/app-ios/index.uts',
      'utssdk/app-ios/assets/test.json',
    ])
  })
})
