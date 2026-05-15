import fs from 'fs-extra'
import { tmpdir } from 'os'
import { join, resolve } from 'path'
import { genConfigJson, requireUTSPluginCode } from '../src/utils'

describe('utils', () => {
  const originalUniAppX = process.env.UNI_APP_X
  const originalUniAppXDom2 = process.env.UNI_APP_X_DOM2

  let tempDir = ''

  function genIOSConfigJson(pluginId: string, indexContent: string) {
    const inputDir = resolve(tempDir, 'input')
    const outputDir = resolve(tempDir, 'output')
    const utsInputDir = resolve(
      inputDir,
      'uni_modules',
      pluginId,
      'utssdk',
      'app-ios'
    )
    fs.outputFileSync(resolve(utsInputDir, 'index.uts'), indexContent)

    genConfigJson(
      'app-ios',
      true,
      '',
      {},
      undefined,
      `uni_modules/${pluginId}`,
      true,
      inputDir,
      outputDir
    )

    return fs.readJSONSync(
      resolve(
        outputDir,
        'uni_modules',
        pluginId,
        'utssdk',
        'app-ios',
        'config.json'
      )
    )
  }

  beforeEach(() => {
    tempDir = fs.mkdtempSync(join(tmpdir(), 'uni-uts-v1-'))
    process.env.UNI_APP_X = 'true'
    delete process.env.UNI_APP_X_DOM2
  })

  afterEach(() => {
    fs.removeSync(tempDir)
    process.env.UNI_APP_X = originalUniAppX
    process.env.UNI_APP_X_DOM2 = originalUniAppXDom2
  })

  test('genConfigJson 在插件 id 和 Element 接口名不一致时复用接口名', () => {
    const configJson = genIOSConfigJson(
      'uni-map-tencent',
      `export interface UniMapElement extends JSExport {}`
    )

    expect(configJson.components).toEqual([
      {
        delegateClass: 'UniMapComponentRegister',
      },
    ])
  })

  test('genConfigJson 在多个 Element 接口时优先命中插件 id 对应接口', () => {
    process.env.UNI_APP_X_DOM2 = 'true'

    const configJson = genIOSConfigJson(
      'uni-web',
      `
export interface UniMapElement extends JSExport {}
export interface UniWebElement extends JSExport, UniElement {}
`
    )

    expect(configJson.components).toEqual([
      {
        delegateClass: 'UniWebElementRegister',
      },
    ])
  })

  test('requireUTSPluginCode 生成 CJS 代理', () => {
    expect(requireUTSPluginCode('uni-usercapturescreen', true)).toBe(
      `module.exports = uni.requireUTSPlugin('uni_modules/uni-usercapturescreen')`
    )
  })
})
