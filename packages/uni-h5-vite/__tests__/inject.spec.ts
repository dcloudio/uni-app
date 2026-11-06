import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import { buildInCssSet } from '@dcloudio/uni-cli-shared'
import { uniInjectPlugin } from '../src/plugins/inject'
import * as resolve from '../../uni-cli-shared/src/resolve'
import * as utils from '../../uni-cli-shared/src/utils'

const { parseAst } = require('rollup/parseAst')

describe('h5 API 样式注入', () => {
  const originalEnv = {
    UNI_APP_X: process.env.UNI_APP_X,
    UNI_APP_X_DOM2: process.env.UNI_APP_X_DOM2,
    UNI_INPUT_DIR: process.env.UNI_INPUT_DIR,
    UNI_PLATFORM: process.env.UNI_PLATFORM,
    UNI_COMPILE_TARGET: process.env.UNI_COMPILE_TARGET,
    UNI_AUTOMATOR_WS_ENDPOINT: process.env.UNI_AUTOMATOR_WS_ENDPOINT,
  }
  let inputDir: string
  let originalCss: string[]

  beforeEach(() => {
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'h5-api-style-'))
    fs.outputJsonSync(path.join(inputDir, 'manifest.json'), {})
    process.env.UNI_APP_X = 'true'
    process.env.UNI_INPUT_DIR = inputDir
    process.env.UNI_PLATFORM = 'h5'
    delete process.env.UNI_COMPILE_TARGET
    delete process.env.UNI_AUTOMATOR_WS_ENDPOINT
    originalCss = [...buildInCssSet]
    buildInCssSet.clear()
    // 这里只测试样式收集，无需依赖本地是否已有框架构建产物。
    jest
      .spyOn(resolve, 'resolveBuiltIn')
      .mockReturnValue(
        path.resolve(__dirname, '../../uni-h5/dist-x-vapor/uni-h5.es.js')
      )
  })

  afterEach(() => {
    jest.restoreAllMocks()
    Object.entries(originalEnv).forEach(([name, value]) => {
      if (value === undefined) delete process.env[name]
      else process.env[name] = value
    })
    buildInCssSet.clear()
    originalCss.forEach((style) => buildInCssSet.add(style))
    fs.removeSync(inputDir)
  })

  test.each([
    '/workspace/[demo]/uni-h5/dist-x-vapor/uni-h5.es.js',
    'C:\\workspace\\[demo]\\uni-h5\\dist-x-vapor\\uni-h5.es.js',
    '\\\\server\\share\\[demo]\\uni-h5\\dist-x-vapor\\uni-h5.es.js',
  ])('仅排除当前 Vapor 框架的 CSS 收集，不跳过 API 注入：%s', (frameworkId) => {
    process.env.UNI_APP_X_DOM2 = 'true'
    jest.replaceProperty(utils, 'isWindows', frameworkId.includes('\\'))
    jest.spyOn(resolve, 'resolveBuiltIn').mockReturnValue(frameworkId)
    for (const combine of [false, true]) {
      buildInCssSet.clear()
      const plugin = uniInjectPlugin() as any
      plugin.configResolved({
        command: 'build',
        build: { cssCodeSplit: combine },
      })
      expect(resolve.resolveBuiltIn).toHaveBeenLastCalledWith(
        '@dcloudio/uni-h5/dist-x-vapor/uni-h5.es.js'
      )
      const transformed = plugin.transform.call(
        { parse: parseAst },
        'uni.showToast({}); uni.showActionSheet({});',
        frameworkId.replace(/\\/g, '/')
      )
      expect(transformed.code).toContain('showToast as')
      expect(transformed.code).toContain('showActionSheet as')
      expect(transformed.code).not.toContain('.css')
      expect(buildInCssSet.size).toBe(0)
      // 用户文件和第三方依赖中的调用仍需收集，不能按 node_modules 等目录整体排除。
      for (const id of [
        path.join(inputDir, 'main.js'),
        '/node_modules/plugin/index.js',
      ]) {
        const { code } = plugin.transform.call(
          { parse: parseAst },
          'uni.showToast({});',
          id
        )
        const styles = combine ? [...buildInCssSet].join('\n') : code
        expect(styles).toContain('@dcloudio/uni-h5/style/api/toast.css')
      }
    }
  })

  test.each([false, true])(
    'VDOM 保留框架内部 CSS 收集（合并=%s）',
    (combine) => {
      delete process.env.UNI_APP_X_DOM2
      const plugin = uniInjectPlugin() as any
      plugin.configResolved({
        command: 'build',
        build: { cssCodeSplit: combine },
      })
      const { code } = plugin.transform.call(
        { parse: parseAst },
        'uni.showToast({});',
        '/node_modules/@dcloudio/uni-h5/dist-x/uni-h5.es.js'
      )
      const styles = combine ? [...buildInCssSet].join('\n') : code
      expect(styles).toContain('@dcloudio/uni-h5/style/api/toast.css')
    }
  )

  test.each([
    ['setClipboardData', ['@dcloudio/uni-h5/style/api/toast.css']],
    ['showActionSheet', []],
    ['openLocation', ['@dcloudio/uni-h5/style/map.css']],
    [
      'previewImage',
      [
        '@dcloudio/uni-components/style-x-vapor/swiper.css',
        '@dcloudio/uni-components/style-x-vapor/swiper-item.css',
        '@dcloudio/uni-components/style-x-vapor/loading.css',
      ],
    ],
    [
      'showModal',
      [
        '@dcloudio/uni-h5/style/vapor/textarea.css',
        '@dcloudio/uni-h5/style/vapor/scroll-view.css',
      ],
    ],
    [
      'chooseLocation',
      [
        '@dcloudio/uni-h5/style/vapor/input.css',
        '@dcloudio/uni-h5/style/map.css',
        '@dcloudio/uni-h5/style/vapor/scroll-view.css',
        '@dcloudio/uni-components/style-x-vapor/loading.css',
      ],
    ],
    ['showLoading', ['@dcloudio/uni-components/style-x-vapor/loading.css']],
    [
      'showNavigationBarLoading',
      ['@dcloudio/uni-components/style-x-vapor/loading.css'],
    ],
    ['hideNavigationBarLoading', []],
  ] as const)('Vapor 调用 %s 时仅加载实际依赖', (name, expectedStyles) => {
    process.env.UNI_APP_X_DOM2 = 'true'
    for (const combine of [false, true]) {
      buildInCssSet.clear()
      const plugin = uniInjectPlugin() as any
      plugin.configResolved({
        command: 'build',
        build: { cssCodeSplit: combine },
      })
      const { code } = plugin.transform.call(
        { parse: parseAst },
        `uni.${name}({});`,
        path.join(inputDir, 'main.js')
      )
      const styles = combine
        ? [...buildInCssSet]
        : [...code.matchAll(/import ['"]([^'"]+\.css)['"]/g)].map(
            (match) => match[1]
          )
      expect(styles).toEqual(expectedStyles)
    }
  })

  test.each([
    [false, false],
    [false, true],
    [true, false],
    [true, true],
  ])(
    '仅调用 previewImage 也加载正确样式（Vapor=%s，合并=%s）',
    (vapor, combine) => {
      if (vapor) process.env.UNI_APP_X_DOM2 = 'true'
      else delete process.env.UNI_APP_X_DOM2
      const plugin = uniInjectPlugin() as any
      plugin.configResolved({
        command: 'build',
        build: { cssCodeSplit: combine },
      })
      const { code } = plugin.transform.call(
        { parse: parseAst },
        'uni.previewImage({ urls: [] });',
        path.join(inputDir, 'main.js')
      )
      const styles = combine ? [...buildInCssSet].join('\n') : code
      const styleDir = vapor ? 'style-x-vapor' : 'style'
      const otherStyleDir = vapor ? 'style' : 'style-x-vapor'
      expect(code).toContain('previewImage as')
      for (const name of ['swiper', 'swiper-item']) {
        expect(styles).toContain(
          `@dcloudio/uni-components/${styleDir}/${name}.css`
        )
        expect(styles).not.toContain(
          `@dcloudio/uni-components/${otherStyleDir}/${name}.css`
        )
      }
      if (combine) {
        expect(code).not.toContain('.css')
      } else {
        expect(buildInCssSet.size).toBe(0)
      }
    }
  )
})
