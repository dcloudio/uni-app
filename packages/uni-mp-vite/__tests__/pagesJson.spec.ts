import fs from 'fs'
import os from 'os'
import path from 'path'
import {
  M,
  PAGES_JSON_JS,
  resetMiniProgramJsonFiles,
} from '@dcloudio/uni-cli-shared'
import { uniPagesJsonPlugin } from '../src/plugins/pagesJson'
import {
  getIndependentSubPackages,
  initIndependentSubPackages,
} from '../src/plugins/independentUtils'

async function withMiniProgramProject(
  test: (inputDir: string) => void | Promise<void>
) {
  const inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-pages-json-'))
  fs.writeFileSync(path.join(inputDir, 'manifest.json'), '{}')
  writePage(inputDir, 'pages/index/index')
  writePage(inputDir, 'package-a/pages/index/index')
  writePage(inputDir, 'package-a/pages/list/list')
  writePage(inputDir, 'package-b/pages/index/index')
  try {
    await test(inputDir)
  } finally {
    fs.rmSync(inputDir, { recursive: true, force: true })
  }
}

function writePage(inputDir: string, page: string) {
  const filename = path.join(inputDir, page + '.vue')
  fs.mkdirSync(path.dirname(filename), { recursive: true })
  fs.writeFileSync(filename, '<template><view /></template>')
}

function createPagesJsonPlugin() {
  return uniPagesJsonPlugin({
    app: {
      subpackages: true,
      usingComponents: true,
    },
    style: { extname: '.wxss' },
    json: {},
  } as any)
}

function callTransform(
  inputDir: string,
  pagesJson: unknown,
  context: Record<string, unknown> = {}
) {
  const plugin = createPagesJsonPlugin()
  ;(plugin.configResolved as Function).call({}, {})
  return (plugin.transform as Function).call(
    {
      addWatchFile: jest.fn(),
      error(message: string) {
        throw new Error(message)
      },
      ...context,
    },
    JSON.stringify(pagesJson),
    path.join(inputDir, PAGES_JSON_JS)
  )
}

describe('uniPagesJsonPlugin independent subpackages', () => {
  const originalPlatform = process.env.UNI_PLATFORM
  const originalInputDir = process.env.UNI_INPUT_DIR

  afterEach(() => {
    resetMiniProgramJsonFiles()
    jest.restoreAllMocks()
    if (originalPlatform === undefined) {
      delete (process.env as Record<string, string | undefined>).UNI_PLATFORM
    } else {
      process.env.UNI_PLATFORM = originalPlatform
    }
    if (originalInputDir === undefined) {
      delete (process.env as Record<string, string | undefined>).UNI_INPUT_DIR
    } else {
      process.env.UNI_INPUT_DIR = originalInputDir
    }
  })

  test('updates independent pages when roots are unchanged', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    await withMiniProgramProject(async (inputDir) => {
      process.env.UNI_INPUT_DIR = inputDir
      initIndependentSubPackages([
        {
          root: 'package-a',
          pages: ['pages/index/index'],
          independent: true,
        },
      ])

      callTransform(inputDir, {
        pages: [{ path: 'pages/index/index' }],
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }, { path: 'pages/list/list' }],
          },
        ],
      })

      expect(getIndependentSubPackages()).toEqual([
        {
          root: 'package-a',
          pages: ['pages/index/index', 'pages/list/list'],
          independent: true,
        },
      ])
    })
  })

  test('outputs restart command when independent roots changed', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    await withMiniProgramProject(async (inputDir) => {
      process.env.UNI_INPUT_DIR = inputDir
      initIndependentSubPackages([
        {
          root: 'package-a',
          pages: ['pages/index/index'],
          independent: true,
        },
      ])
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
        return undefined as never
      })

      callTransform(inputDir, {
        pages: [{ path: 'pages/index/index' }],
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
          {
            root: 'package-b',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      })

      expect(warnSpy).toHaveBeenCalledWith(
        M['dev.watching.restart.independentSubPackages']
      )
      expect(exitSpy).toHaveBeenCalledWith(0)
    })
  })
})
