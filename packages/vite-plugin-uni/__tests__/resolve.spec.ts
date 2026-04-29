import os from 'os'
import path from 'path'
import fs from 'fs-extra'
import type { PluginContext } from 'rollup'

import { customResolver } from '../src/config/resolve'

describe('resolve', () => {
  const originalEnv = {
    UNI_PLATFORM: process.env.UNI_PLATFORM,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_APP_X: process.env.UNI_APP_X,
  }

  let inputDir = ''

  beforeEach(() => {
    inputDir = fs.mkdtempSync(
      path.join(os.tmpdir(), 'vite-plugin-uni-resolve-')
    )
    process.env.UNI_PLATFORM = 'app'
    process.env.UNI_UTS_PLATFORM = 'app-android'
    process.env.UNI_INPUT_DIR = inputDir
    process.env.UNI_APP_X = 'false'

    fs.outputFileSync(
      path.join(
        inputDir,
        'uni_modules/uts-button/utssdk/app-android/index.uts'
      ),
      'export const utsButton = 1'
    )
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

  test('customResolver prefixes app uts absolute paths with /@fs/ on Windows', () => {
    const utsModuleDir = path.join(inputDir, 'uni_modules/uts-button')
    const pluginContext = {} as PluginContext
    const resolved = customResolver.call(
      pluginContext,
      utsModuleDir,
      undefined,
      {
        attributes: {},
        isEntry: false,
      }
    )

    expect(resolved).toBe(
      '/@fs/' + utsModuleDir.replace(/\\/g, '/') + '?uts-proxy'
    )
  })
})
