import fs from 'fs'
import os from 'os'
import path from 'path'
import { PAGES_JSON_UTS } from '@dcloudio/uni-cli-shared'
import { uniAppPagesPlugin } from '../../src/plugins/js/pagesJson'

jest.mock('@dcloudio/uni-cli-shared', () => ({
  ...jest.requireActual('@dcloudio/uni-cli-shared'),
  runByHBuilderX: jest.fn(() => true),
}))

describe('uni app pages json compile progress', () => {
  let inputDir: string
  const originalInputDir = process.env.UNI_INPUT_DIR
  const originalPlatform = process.env.UNI_PLATFORM

  beforeEach(() => {
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-app-pages-json-'))
    fs.writeFileSync(path.join(inputDir, 'manifest.json'), '{}')
    for (const page of ['pages/index/index', 'pages/about/about']) {
      const filename = path.join(inputDir, `${page}.vue`)
      fs.mkdirSync(path.dirname(filename), { recursive: true })
      fs.writeFileSync(filename, '<template><view /></template>')
    }
    process.env.UNI_INPUT_DIR = inputDir
    process.env.UNI_PLATFORM = 'app'
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
    jest.restoreAllMocks()
  })

  test('logs each SFC once and ignores Vue submodule requests', () => {
    const plugin = uniAppPagesPlugin() as any
    const log = jest.spyOn(console, 'log').mockImplementation()
    const callTransform = (code: string, id: string) =>
      plugin.transform.call(
        {
          addWatchFile: jest.fn(),
          emitFile: jest.fn(),
        },
        code,
        id
      )

    callTransform(
      JSON.stringify({
        pages: [{ path: 'pages/index/index' }, { path: 'pages/about/about' }],
      }),
      path.join(inputDir, PAGES_JSON_UTS)
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
