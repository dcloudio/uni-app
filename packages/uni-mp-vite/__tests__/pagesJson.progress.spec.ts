import fs from 'fs'
import os from 'os'
import path from 'path'
import { PAGES_JSON_JS } from '@dcloudio/uni-cli-shared'
import { uniPagesJsonPlugin } from '../src/plugins/pagesJson'

jest.mock('@dcloudio/uni-cli-shared', () => ({
  ...jest.requireActual('@dcloudio/uni-cli-shared'),
  runByHBuilderX: jest.fn(() => true),
}))

describe('uni mini program pages json compile progress', () => {
  let inputDir: string
  const originalInputDir = process.env.UNI_INPUT_DIR
  const originalPlatform = process.env.UNI_PLATFORM
  const originalAppX = process.env.UNI_APP_X

  beforeEach(() => {
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-mp-pages-json-'))
    fs.writeFileSync(path.join(inputDir, 'manifest.json'), '{}')
    for (const page of ['pages/index/index', 'pages/about/about']) {
      const filename = path.join(inputDir, `${page}.vue`)
      fs.mkdirSync(path.dirname(filename), { recursive: true })
      fs.writeFileSync(filename, '<template><view /></template>')
    }
    process.env.UNI_INPUT_DIR = inputDir
    process.env.UNI_PLATFORM = 'mp-weixin'
    process.env.UNI_APP_X = 'true'
  })

  afterEach(() => {
    fs.rmSync(inputDir, { recursive: true, force: true })
    if (originalInputDir === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_INPUT_DIR')
    } else {
      process.env.UNI_INPUT_DIR = originalInputDir
    }
    if (originalPlatform === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_PLATFORM')
    } else {
      process.env.UNI_PLATFORM = originalPlatform
    }
    if (originalAppX === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_APP_X')
    } else {
      process.env.UNI_APP_X = originalAppX
    }
    jest.restoreAllMocks()
  })

  test('logs each SFC once and ignores Vue submodule requests', () => {
    const plugin = uniPagesJsonPlugin({
      app: {
        subpackages: false,
        independentSubpackages: false,
        usingComponents: false,
      },
      style: { extname: '.wxss' },
      json: {},
    } as any) as any
    const log = jest.spyOn(console, 'log').mockImplementation()
    const callTransform = (code: string, id: string) =>
      plugin.transform.call(
        {
          addWatchFile: jest.fn(),
          error(message: string) {
            throw new Error(message)
          },
        },
        code,
        id
      )

    callTransform(
      JSON.stringify({
        pages: [{ path: 'pages/index/index' }, { path: 'pages/about/about' }],
      }),
      path.join(inputDir, PAGES_JSON_JS)
    )

    const indexPage = path.join(inputDir, 'pages/index/index.vue')
    callTransform('', indexPage)
    callTransform('', `${indexPage}?vue&type=template`)
    callTransform('', path.join(inputDir, 'pages/about/about.vue'))

    expect(log).toHaveBeenCalledTimes(2)
    expect(log.mock.calls[0][0]).toContain('pages/index/index')
    expect(log.mock.calls[1][0]).toContain('pages/about/about')
  })
})
