import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import { buildInCssSet } from '@dcloudio/uni-cli-shared'
import { uniInjectPlugin } from '../src/plugins/inject'

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
  })

  afterEach(() => {
    Object.entries(originalEnv).forEach(([name, value]) => {
      if (value === undefined) delete process.env[name]
      else process.env[name] = value
    })
    buildInCssSet.clear()
    originalCss.forEach((style) => buildInCssSet.add(style))
    fs.removeSync(inputDir)
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
