import fs from 'fs'
import os from 'os'
import path from 'path'
import {
  M,
  MANIFEST_JSON_JS,
  PAGES_JSON_JS,
  findMiniProgramUsingComponents,
  normalizePath,
  resetMiniProgramJsonFiles,
} from '@dcloudio/uni-cli-shared'
import { parseVirtualPagePathInfo } from '../src/plugins/entry'
import { uniPagesJsonPlugin } from '../src/plugins/pagesJson'
import {
  getIndependentSubPackages,
  initIndependentSubPackages,
  withIndependentRoot,
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

function writePagesJson(inputDir: string, pagesJson: unknown) {
  fs.writeFileSync(path.join(inputDir, 'pages.json'), JSON.stringify(pagesJson))
}

function createPagesJsonPlugin(
  independentSubpackages = true,
  json: Record<string, unknown> = {}
) {
  return uniPagesJsonPlugin({
    app: {
      subpackages: true,
      independentSubpackages,
      usingComponents: true,
    },
    style: { extname: '.wxss' },
    json,
  } as any)
}

function callTransform(
  inputDir: string,
  pagesJson: unknown,
  context: Record<string, unknown> = {}
) {
  const plugin = createPagesJsonPlugin()
  ;(plugin.configResolved as Function).call({}, {})
  return callTransformWithPlugin(plugin, inputDir, pagesJson, context)
}

function callTransformWithPlugin(
  plugin: any,
  inputDir: string,
  pagesJson: unknown,
  context: Record<string, unknown> = {},
  id = path.join(inputDir, PAGES_JSON_JS)
) {
  return (plugin.transform as Function).call(
    {
      addWatchFile: jest.fn(),
      error(message: string) {
        throw new Error(message)
      },
      ...context,
    },
    JSON.stringify(pagesJson),
    id
  )
}

function callTransformWithoutIndependentSubpackages(
  inputDir: string,
  pagesJson: unknown
) {
  const plugin = createPagesJsonPlugin(false)
  ;(plugin.configResolved as Function).call({}, {})
  return callTransformWithPlugin(plugin, inputDir, pagesJson)
}

function readFirstVirtualPageInfo(code: string) {
  const match = code.match(/import\((['"])(.*?)\1\)/)
  if (!match) {
    return
  }
  return parseVirtualPagePathInfo(match[2])
}

async function loadAndTransformPagesJson(plugin: any, id: string) {
  const resolved = await (plugin.resolveId as Function)(id)
  const resolvedId = typeof resolved === 'string' ? resolved : resolved.id
  const code = (plugin.load as Function).call(
    { addWatchFile: jest.fn() },
    resolvedId
  )
  return (plugin.transform as Function).call(
    {
      addWatchFile: jest.fn(),
      error(message: string) {
        throw new Error(message)
      },
    },
    code,
    resolvedId
  )
}

describe('uniPagesJsonPlugin independent subpackages', () => {
  const originalPlatform = process.env.UNI_PLATFORM
  const originalInputDir = process.env.UNI_INPUT_DIR

  afterEach(() => {
    resetMiniProgramJsonFiles()
    initIndependentSubPackages([])
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

  test('initializes independent page usingComponents when transforming root-scoped pages-json-js', async () => {
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
      const pagesJson = {
        pages: [{ path: 'pages/index/index' }],
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [
              {
                path: 'pages/index/index',
                style: {
                  usingComponents: {
                    'native-badge': '../../wxcomponents/native-badge/index',
                  },
                },
              },
            ],
          },
        ],
      }
      writePagesJson(inputDir, pagesJson)
      const nativeJson = path.join(
        inputDir,
        'wxcomponents/native-badge/index.json'
      )
      fs.mkdirSync(path.dirname(nativeJson), { recursive: true })
      fs.writeFileSync(nativeJson, '{"component":true}')
      const plugin = createPagesJsonPlugin()
      ;(plugin.configResolved as Function).call({}, {})
      const id = withIndependentRoot(PAGES_JSON_JS, 'package-a')

      await loadAndTransformPagesJson(plugin, id)

      expect(
        findMiniProgramUsingComponents({
          filename: path.join(inputDir, 'package-a/pages/index/index.vue'),
          inputDir,
          componentsDir: 'wxcomponents',
        })
      ).toMatchObject({
        'native-badge': 'component',
      })
    })
  })

  test('loads root-scoped pages-json-js from pages.json', async () => {
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
      const pagesJson = {
        pages: [{ path: 'pages/index/index' }],
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      }
      writePagesJson(inputDir, pagesJson)
      const plugin = createPagesJsonPlugin()
      ;(plugin.configResolved as Function).call({}, {})
      const id = withIndependentRoot(PAGES_JSON_JS, 'package-a')

      const resolvedId = await (plugin.resolveId as Function)(id)
      expect(resolvedId).toBe(normalizePath(path.join(inputDir, id)))
      expect((plugin.resolveId as Function)(`${PAGES_JSON_JS}?raw`)).toBe(
        undefined
      )
      const result = await loadAndTransformPagesJson(plugin, id)

      expect(result.map).toEqual({ mappings: '' })
      expect(result.code).toContain('uniPage://')
      expect(result.code).not.toContain(MANIFEST_JSON_JS)
      expect(readFirstVirtualPageInfo(result.code)).toMatchObject({
        filepath: 'package-a/pages/index/index.vue',
        root: 'package-a',
      })
    })
  })

  test('reuses pages json state for root-scoped pages-json-js', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    await withMiniProgramProject(async (inputDir) => {
      process.env.UNI_INPUT_DIR = inputDir
      initIndependentSubPackages([
        {
          root: 'package-a',
          pages: ['pages/index/index'],
          independent: true,
        },
        {
          root: 'package-b',
          pages: ['pages/index/index'],
          independent: true,
        },
      ])
      const pagesJson = {
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
      }
      writePagesJson(inputDir, pagesJson)
      const formatAppJson = jest.fn()
      const plugin = createPagesJsonPlugin(true, { formatAppJson })
      ;(plugin.configResolved as Function).call({}, {})

      await loadAndTransformPagesJson(
        plugin,
        withIndependentRoot(PAGES_JSON_JS, 'package-a')
      )
      callTransformWithPlugin(plugin, inputDir, pagesJson)
      await loadAndTransformPagesJson(
        plugin,
        withIndependentRoot(PAGES_JSON_JS, 'package-b')
      )

      expect(formatAppJson).toHaveBeenCalledTimes(1)
    })
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

  test('treats independent subpackages as normal subpackages when app option does not support it', async () => {
    process.env.UNI_PLATFORM = 'mp-alipay'
    await withMiniProgramProject(async (inputDir) => {
      process.env.UNI_INPUT_DIR = inputDir
      initIndependentSubPackages([])

      const result = callTransformWithoutIndependentSubpackages(inputDir, {
        pages: [{ path: 'pages/index/index' }],
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      })

      expect(getIndependentSubPackages()).toEqual([])
      expect(result.code).toContain('uniPage://')
      expect(result.code).not.toContain('uni_mp_independent_root')
    })
  })
})
