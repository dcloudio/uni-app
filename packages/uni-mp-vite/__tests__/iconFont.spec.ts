import fs from 'fs'
import os from 'os'
import path from 'path'
import {
  addMiniProgramPageJson,
  resetMiniProgramJsonFiles,
} from '@dcloudio/uni-cli-shared'
import { createConfigResolved } from '../src/plugin/configResolved'
import { initIndependentSubPackages } from '../src/plugins/independentUtils'

let transformCss: (filename: string, code: string) => string
jest.mock('@dcloudio/uni-cli-shared', () => ({
  ...jest.requireActual('@dcloudio/uni-cli-shared'),
  injectAssetPlugin: jest.fn(),
  injectCssPlugin: jest.fn(),
  injectCssPostPlugin: jest.fn(),
  cssPostPlugin: (_config: unknown, options: any) => {
    transformCss = options.chunkCssCode
    return { name: 'test-css' }
  },
  resolveMainPathOnce: () => '/project/main.uts',
  parsePagesJsonOnce: (inputDir: string, platform: UniApp.PLATFORM) =>
    jest
      .requireActual('@dcloudio/uni-cli-shared')
      .parsePagesJson(inputDir, platform),
}))

describe('X 小程序内置 uni-icon 字体', () => {
  const env = { ...process.env }
  let inputDir: string
  const fontCss = fs.readFileSync(
    path.resolve(__dirname, '../lib/uni-icon.css'),
    'utf8'
  )

  beforeEach(() => {
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mp-icon-'))
    fs.writeFileSync(path.join(inputDir, 'manifest.json'), '{}')
    fs.writeFileSync(
      path.join(inputDir, 'pages.json'),
      JSON.stringify({
        pages: [
          { path: 'pages/index/index', style: { enableUcssReset: false } },
        ],
        subPackages: [
          {
            root: 'independent',
            independent: true,
            pages: [
              { path: 'pages/index/index', style: { enableUcssReset: false } },
            ],
          },
        ],
      })
    )
    Object.assign(process.env, {
      UNI_INPUT_DIR: inputDir,
      UNI_PLATFORM: 'mp-weixin',
      UNI_APP_X: 'true',
    })
    initIndependentSubPackages([
      { root: 'independent', independent: true, pages: [] },
    ] as any)
    addMiniProgramPageJson('pages/index/index', {})
    addMiniProgramPageJson('independent/pages/index/index', {})
  })

  afterEach(() => {
    resetMiniProgramJsonFiles()
    initIndependentSubPackages([])
    for (const key of [
      'UNI_INPUT_DIR',
      'UNI_PLATFORM',
      'UNI_APP_X',
      'UNI_APP_X_DOM2',
    ]) {
      if (env[key] === undefined) delete process.env[key]
      else process.env[key] = env[key]
    }
    fs.rmSync(inputDir, { recursive: true, force: true })
  })

  function configure(extname: string, production = false, plugins: any[] = []) {
    const config = { plugins, isProduction: production } as any
    ;(
      createConfigResolved({
        style: { extname },
        template: {},
      } as any) as Function
    )(config)
    return config
  }

  test.each([false, true])(
    '应用和独立分包不依赖布局重置即可使用字体（Vapor=%s）',
    (vapor) => {
      if (vapor) process.env.UNI_APP_X_DOM2 = 'true'
      else delete process.env.UNI_APP_X_DOM2
      configure('.wxss')
      expect(transformCss('app.wxss', '.app{color:red}')).toContain(fontCss)
      expect(
        transformCss('pages/index/index.wxss', '.page{color:blue}')
      ).not.toContain('@font-face')
      const independent = transformCss(
        'independent/pages/index/index.wxss',
        '.page{color:blue}'
      )
      expect(independent).toContain(fontCss)
      expect(independent).not.toContain('@import')
      expect(
        transformCss('independent/components/item.wxss', '.item{}')
      ).not.toContain('@font-face')
    }
  )

  test.each(['.wxss', '.acss', '.ttss', '.qss', '.css'])(
    '字体跟随平台样式后缀输出：%s',
    (extname) => {
      configure(extname, true)
      const output = transformCss('app' + extname, '')
      expect(output.match(/@font-face/g)).toHaveLength(1)
      expect(output).toContain('data:font/woff2;base64,')
    }
  )

  test('独立分包开启布局重置时保留本包样式引用和字体', () => {
    const pagesFile = path.join(inputDir, 'pages.json')
    const pages = JSON.parse(fs.readFileSync(pagesFile, 'utf8'))
    pages.subPackages[0].pages[0].style.enableUcssReset = true
    fs.writeFileSync(pagesFile, JSON.stringify(pages))
    configure('.wxss')
    const output = transformCss('independent/pages/index/index.wxss', '.page{}')
    expect(output).toContain('@import "../../uvue.wxss";')
    expect(output.match(/@font-face/g)).toHaveLength(1)
    expect(output).toContain(fontCss)
  })

  test('UnoCSS 临时后缀和最终样式产物都保留字体', () => {
    const config = configure('.wxss', true, [
      { name: 'unocss:global:build:bundle' },
    ])
    const appCss = transformCss('app.css', '')
    const pageCss = transformCss('independent/pages/index/index.css', '.page{}')
    expect(appCss).toContain(fontCss)
    expect(pageCss).toContain(fontCss)
    const adjust = config.plugins.find(
      (plugin: any) => plugin.name === 'uni:adjust-css-extname'
    )
    const emitFile = jest.fn()
    adjust.generateBundle.handler.call(
      { emitFile },
      {},
      {
        'app.css': { type: 'asset', fileName: 'app.css', source: appCss },
        'independent/pages/index/index.css': {
          type: 'asset',
          fileName: 'independent/pages/index/index.css',
          source: pageCss,
        },
      }
    )
    expect(emitFile).toHaveBeenCalledWith(
      expect.objectContaining({
        fileName: 'app.wxss',
        source: expect.stringContaining(fontCss),
      })
    )
    expect(emitFile).toHaveBeenCalledWith(
      expect.objectContaining({
        fileName: 'independent/pages/index/index.wxss',
        source: expect.stringContaining(fontCss),
      })
    )
  })

  test('普通小程序不内置 X 字体', () => {
    process.env.UNI_APP_X = 'false'
    configure('.wxss')
    expect(transformCss('app.wxss', '.app{}')).not.toContain('@font-face')
    expect(
      transformCss('independent/pages/index/index.wxss', '.page{}')
    ).not.toContain('@font-face')
  })

  test('Web 与小程序内置相同的原始字体', () => {
    expect(fontCss).toBe(
      fs.readFileSync(
        path.resolve(__dirname, '../../uni-h5/style/framework/uni-icon.css'),
        'utf8'
      )
    )
    const bytes = Buffer.from(fontCss.match(/base64,([^']+)/)![1], 'base64')
    expect(bytes.toString('ascii', 0, 4)).toBe('wOF2')
    expect(bytes.length).toBe(996)
  })
})
