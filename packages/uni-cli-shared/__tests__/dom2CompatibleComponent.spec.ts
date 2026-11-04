import os from 'os'
import path from 'path'
import fs from 'fs-extra'

import { initEasycoms, matchEasycom } from '../src/easycom'
import { M } from '../src/messages'
import { resolveUTSAppJsEntry, resolveUTSAppModule } from '../src/uts'
import { normalizePath } from '../src/utils'

describe('dom2 compatible component', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_COMPILE_TARGET: process.env.UNI_COMPILE_TARGET,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
    UNI_APP_X_UVUE_SCRIPT_ENGINE: process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE,
  }
  let inputDir = ''

  function createDom2CompatiblePlugin() {
    fs.outputJsonSync(path.join(inputDir, 'manifest.json'), {
      name: 'test',
      appid: '__UNI__TEST',
    })
    fs.outputJsonSync(path.join(inputDir, 'pages.json'), {
      pages: [
        {
          path: 'pages/index/index',
        },
      ],
    })
    fs.outputFileSync(
      path.join(inputDir, 'pages/index/index.uvue'),
      '<template><view /></template>'
    )
    fs.outputFileSync(
      path.join(
        inputDir,
        'uni_modules/uts-button/utssdk/app-android/index.vue'
      ),
      '<script>export default { name: "uts-button" }</script>'
    )
  }

  beforeEach(() => {
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dom2-compatible-'))
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    Reflect.deleteProperty(process.env, 'UNI_COMPILE_TARGET')
    process.env.UNI_INPUT_DIR = inputDir
    process.env.UNI_UTS_PLATFORM = 'app-android'
  })

  afterEach(() => {
    Object.entries(originalEnv).forEach(([key, value]) => {
      if (value === undefined) {
        Reflect.deleteProperty(process.env, key)
      } else {
        process.env[key] = value
      }
    })
    if (inputDir) {
      fs.removeSync(inputDir)
    }
  })

  test('matchEasycom throws dom2 compatible component error', () => {
    createDom2CompatiblePlugin()

    initEasycoms(inputDir, {
      platform: 'app',
      dirs: [],
      isX: true,
    })

    expect(() => matchEasycom('uts-button')).toThrow(
      M['dom2.compatible.component']
        .replace('{name}', '<uts-button>')
        .replace(
          '{file}',
          'uni_modules/uts-button/utssdk/app-android/index.vue'
        )
    )
  })

  test('resolveUTSAppModule throws dom2 compatible component error', () => {
    createDom2CompatiblePlugin()

    const pluginDir = normalizePath(
      path.join(inputDir, 'uni_modules/uts-button')
    )

    expect(() =>
      resolveUTSAppModule('app-android', pluginDir, inputDir)
    ).toThrow(
      M['dom2.compatible.component']
        .replace('{name}', '[uts-button]')
        .replace(
          '{file}',
          'uni_modules/uts-button/utssdk/app-android/index.vue'
        )
    )
  })

  test('resolves app-js entries in uts, ts, js order', () => {
    process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE = 'js'
    const appJsDir = path.join(
      inputDir,
      'uni_modules/test-plugin/utssdk/app-js'
    )
    fs.outputFileSync(path.join(appJsDir, 'index.js'), '')
    fs.outputFileSync(path.join(appJsDir, 'index.ts'), '')

    expect(resolveUTSAppJsEntry(appJsDir)).toBe(path.join(appJsDir, 'index.ts'))
    expect(
      resolveUTSAppModule(
        'app-android',
        path.join(inputDir, 'uni_modules/test-plugin'),
        inputDir
      )
    ).toBe(path.join(appJsDir, 'index.ts'))

    fs.outputFileSync(path.join(appJsDir, 'index.uts'), '')
    expect(resolveUTSAppJsEntry(appJsDir)).toBe(
      path.join(appJsDir, 'index.uts')
    )
    expect(
      resolveUTSAppModule(
        'app-android',
        path.join(inputDir, 'uni_modules/test-plugin'),
        inputDir
      )
    ).toBe(path.join(appJsDir, 'index.uts'))

    fs.removeSync(path.join(appJsDir, 'index.ts'))
    fs.removeSync(path.join(appJsDir, 'index.uts'))
    expect(resolveUTSAppJsEntry(appJsDir)).toBe(path.join(appJsDir, 'index.js'))
    expect(
      resolveUTSAppModule(
        'app-android',
        path.join(inputDir, 'uni_modules/test-plugin'),
        inputDir
      )
    ).toBe(path.join(appJsDir, 'index.js'))
  })
})
