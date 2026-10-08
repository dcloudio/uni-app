import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import { initEasycoms, normalizePath } from '@dcloudio/uni-cli-shared'
import { uniEasycomPlugin } from '../src/plugins/easycom'

const { parseAst } = require('rollup/parseAst')

describe('h5 easycom', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_HX_VERSION_DEV: process.env.UNI_HX_VERSION_DEV,
    UNI_PLATFORM: process.env.UNI_PLATFORM,
    UNI_UTS_PLATFORM: process.env.UNI_UTS_PLATFORM,
  }
  let inputDir: string

  beforeEach(() => {
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'h5-easycom-'))
    fs.outputJsonSync(path.join(inputDir, 'pages.json'), {
      pages: [{ path: 'pages/index/index' }],
    })
    fs.outputFileSync(
      path.join(inputDir, 'uni_modules/uni-form/components/button/button.uvue'),
      '<template><view /></template>'
    )
    fs.outputFileSync(
      path.join(inputDir, 'uni_modules/uni-form/utssdk/app-android/index.uts'),
      ''
    )
    fs.outputFileSync(
      path.join(inputDir, 'components/Example/Example.uvue'),
      '<template><view /></template>'
    )
    process.env.UNI_APP_X = 'true'
    process.env.UNI_APP_X_DOM2 = 'true'
    process.env.UNI_HX_VERSION_DEV = 'true'
    process.env.UNI_PLATFORM = 'h5'
    process.env.UNI_UTS_PLATFORM = 'web'
    initEasycoms(inputDir, { dirs: [], platform: 'h5', isX: true })
  })

  afterEach(() => {
    Object.entries(originalEnv).forEach(([name, value]) => {
      if (value === undefined) {
        delete process.env[name]
      } else {
        process.env[name] = value
      }
    })
    fs.removeSync(inputDir)
  })

  function transform(code: string, parse = parseAst) {
    const plugin = uniEasycomPlugin({}) as any
    const result = plugin.transform.call(
      { parse },
      code,
      `${inputDir}/pages/index/index.uvue?vue&type=template`
    )
    return (result?.code ?? code) as string
  }

  test('Web Vapor 使用项目内的内置 easycom 组件', () => {
    const code = transform(
      'const n1 = _createAssetComponent("v-uni-button", null, () => n0, true)'
    )

    expect(code).toContain(
      `import __easycom_0 from '${normalizePath(
        path.join(
          inputDir,
          'uni_modules/uni-form/components/button/button.uvue'
        )
      )}';`
    )
    expect(code).toContain(
      '__createEasycomComponent(__easycom_0, null, () => n0, true)'
    )
    expect(code).not.toContain("from '@dcloudio/uni-h5'")
  })

  test('Web Vapor 去除只属于按名解析的自引用和命名空间参数', () => {
    const code = transform(
      'const n0 = _createAssetComponent("Example", { value: () => ({ a: 1 }) }, null, true, null, true, 1)'
    )

    expect(code).toContain(
      '__createEasycomComponent(__easycom_0, { value: () => ({ a: 1 }) }, null, true, null)'
    )
  })

  test('Web Vapor 未命中的组件保持运行时解析', () => {
    const source = 'const n0 = _createAssetComponent("Unknown")'

    expect(transform(source)).toBe(source)
  })

  test('不改写字符串中的组件调用文本', () => {
    const source = 'const text = \'_createAssetComponent("Example")\''

    expect(transform(source)).toBe(source)
  })

  test('嵌套组件调用分别转换', () => {
    const code =
      transform(`const outer = _createAssetComponent("Example", null, () => {
      const inner = _createAssetComponent("Example", null, null, true, null, true)
      return inner
    })`)

    expect(code).toContain('outer = __createEasycomComponent(__easycom_0')
    expect(code).toContain(
      'inner = __createEasycomComponent(__easycom_1, null, null, true, null)'
    )
  })

  test('非内部 dev 模式保持内置组件优先级', () => {
    delete process.env.UNI_HX_VERSION_DEV
    const code = transform('const n0 = _createAssetComponent("v-uni-button")')

    expect(code).toContain(
      "import { Button as __syscom_0 } from '@dcloudio/uni-h5';"
    )
    expect(code).toContain('__createEasycomComponent(__syscom_0)')
    expect(code).not.toContain(
      'uni_modules/uni-form/components/button/button.uvue'
    )
  })

  test('Web Vapor 同时处理多次出现的组件', () => {
    const code = transform(
      'const a = _createAssetComponent("Example"); const b = _resolveComponent("Example")'
    )

    expect(code).toContain('__createEasycomComponent(__easycom_0)')
    expect(code).toContain('const b = __easycom_1')
    expect(
      code.match(/createComponent as __createEasycomComponent/g)
    ).toHaveLength(1)
  })

  test('非 Vapor 继续使用原有 resolveComponent 路径', () => {
    delete process.env.UNI_APP_X_DOM2
    const parse = jest.fn(parseAst)
    const code = transform(
      'const a = _resolveComponent("v-uni-button"); const b = _createAssetComponent("Example")',
      parse
    )

    expect(code).toContain('const a = __easycom_0')
    expect(code).toContain('const b = _createAssetComponent("Example")')
    expect(code).not.toContain('__createEasycomComponent')
    expect(parse).not.toHaveBeenCalled()
  })
})
