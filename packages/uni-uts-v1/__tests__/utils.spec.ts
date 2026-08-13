import fs from 'fs-extra'
import { tmpdir } from 'os'
import { join, resolve } from 'path'
import { genConfigJson } from '../src/utils'

describe('utils', () => {
  const originalUniAppX = process.env.UNI_APP_X
  const originalUniAppXDom2 = process.env.UNI_APP_X_DOM2

  let tempDir = ''

  function genIOSConfigJson(pluginId: string, indexContent: string) {
    const inputDir = resolve(tempDir, 'input')
    const outputDir = resolve(tempDir, 'output')
    const cacheDir = resolve(tempDir, 'cache')
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
      outputDir,
      cacheDir
    )

    const configJson = fs.readJSONSync(
      resolve(
        outputDir,
        'uni_modules',
        pluginId,
        'utssdk',
        'app-ios',
        'config.json'
      )
    )
    expect(
      fs.readJSONSync(
        resolve(
          cacheDir,
          'app-ios',
          'uts',
          'uni_modules',
          pluginId,
          'config.json'
        )
      )
    ).toEqual(configJson)
    return configJson
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

  test('genConfigJson 在多个 Element 接口且无插件 id 精确命中时生成多个 delegateClass', () => {
    const configJson = genIOSConfigJson(
      'uni-form',
      `
export interface UniInputElement extends JSExport, UniViewElement {
  value: string
  focus(): void
}
export interface UniTextareaElement extends JSExport, UniViewElement {
  value: string
  blur(): void
}
`
    )

    expect(configJson.components).toEqual([
      {
        delegateClass: 'UniInputComponentRegister',
      },
      {
        delegateClass: 'UniTextareaComponentRegister',
      },
    ])
  })

  test('genConfigJson 在插件 id 命中且存在多个 View Element 接口时生成多个 delegateClass', () => {
    const configJson = genIOSConfigJson(
      'uni-input',
      `
export interface UniInputElement extends JSExport, UniViewElement {
  value: string
  focus(): void
}
export interface UniTextareaElement extends JSExport, UniViewElement {
  value: string
  blur(): void
}
`
    )

    expect(configJson.components).toEqual([
      {
        delegateClass: 'UniInputComponentRegister',
      },
      {
        delegateClass: 'UniTextareaComponentRegister',
      },
    ])
  })
})
