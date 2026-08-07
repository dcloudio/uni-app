import fs from 'fs'
import os from 'os'
import path from 'path'
import {
  PAGES_JSON_JS,
  normalizePath,
  parseIndependentSubPackages,
} from '@dcloudio/uni-cli-shared'
import { virtualComponentPath } from '../src/plugins/entry'
import {
  normalizeCopyOptions,
  transformIndependentMiniProgramComponentJs,
} from '../src/plugin/copy'
import { uniMiniProgramPlugin } from '../src/plugin'
import {
  resolveNVueCssFilename,
  resolveUVueCssFilename,
} from '../src/plugin/configResolved'
import { uniIndependentSubpackagePlugin } from '../src/plugins/independent'
import { uniPagesJsonPlugin } from '../src/plugins/pagesJson'
import {
  INDEPENDENT_MAIN_PREFIX,
  UNI_MP_RUNTIME_ID,
  VUE_EXPORT_HELPER_ID,
  formatIndependentVirtualId,
  initIndependentSubPackages,
  withIndependentRoot,
} from '../src/plugins/independentUtils'

async function withPagesJson(
  pagesJson: unknown,
  test: (inputDir: string) => void | Promise<void>
) {
  const inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-independent-'))
  writePagesJson(inputDir, pagesJson)
  initIndependentSubPackages(
    parseIndependentSubPackages(pagesJson as UniApp.PagesJson)
  )
  try {
    await test(inputDir)
  } finally {
    fs.rmSync(inputDir, { recursive: true, force: true })
  }
}

function writePagesJson(inputDir: string, pagesJson: unknown) {
  fs.writeFileSync(
    path.join(inputDir, 'pages.json'),
    JSON.stringify(pagesJson, null, 2)
  )
}

function callBuildStart(plugin: any) {
  const addWatchFile = jest.fn()
  if (plugin.buildStart) {
    ;(plugin.buildStart as Function).call({ addWatchFile })
  }
  return { addWatchFile }
}

function callGenerateBundle(plugin: any, context: any, bundle: any) {
  const generateBundle = plugin.generateBundle
  if (typeof generateBundle === 'function') {
    return generateBundle.call(context, {}, bundle)
  }
  return generateBundle.handler.call(context, {}, bundle)
}

describe('uniIndependentSubpackagePlugin', () => {
  const originalPlatform = process.env.UNI_PLATFORM
  const originalInputDir = process.env.UNI_INPUT_DIR
  const originalAppX = process.env.UNI_APP_X
  const originalCompileTarget = process.env.UNI_COMPILE_TARGET

  afterEach(() => {
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
    if (originalAppX === undefined) {
      delete (process.env as Record<string, string | undefined>).UNI_APP_X
    } else {
      process.env.UNI_APP_X = originalAppX
    }
    if (originalCompileTarget === undefined) {
      delete (process.env as Record<string, string | undefined>)
        .UNI_COMPILE_TARGET
    } else {
      process.env.UNI_COMPILE_TARGET = originalCompileTarget
    }
  })

  test('resolves and loads independent main virtual module', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const id = formatIndependentVirtualId(
          INDEPENDENT_MAIN_PREFIX,
          'package-a'
        )

        await expect((plugin.resolveId as Function)(id)).resolves.toBe(id)
        const result = (plugin.load as Function)(id)
        expect(result.map).toEqual({ mappings: '' })
        expect(result.code).toContain(
          `import { createIndependentSubpackageApp } from ${JSON.stringify(
            withIndependentRoot(UNI_MP_RUNTIME_ID, 'package-a')
          )}`
        )
        expect(result.code).toContain(
          `import { createSSRApp } from ${JSON.stringify(
            withIndependentRoot('vue', 'package-a')
          )}`
        )
        expect(result.code).toContain(
          `import ${JSON.stringify(
            withIndependentRoot(PAGES_JSON_JS, 'package-a')
          )}`
        )
        expect(result.code).toContain(
          `const app = createSSRApp({})
app.mount('#app', "package-a", { independent: true, createApp: createIndependentSubpackageApp })`
        )
      }
    )
  })

  test('loads independent root main when it exists', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    delete (process.env as Record<string, string | undefined>).UNI_APP_X
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        fs.mkdirSync(path.join(inputDir, 'package-a'), { recursive: true })
        fs.writeFileSync(
          path.join(inputDir, 'package-a/main.ts'),
          'export function createApp(app) { app.use(plugin) }'
        )
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const id = formatIndependentVirtualId(
          INDEPENDENT_MAIN_PREFIX,
          'package-a'
        )
        const result = (plugin.load as Function)(id)

        expect(result.code).toContain(
          `import { createApp as createIndependentApp } from ${JSON.stringify(
            withIndependentRoot(
              normalizePath(path.join(inputDir, 'package-a/main.ts')),
              'package-a'
            )
          )}`
        )
        expect(result.code).toContain(
          `const app = createSSRApp({})
createIndependentApp(app)
app.mount('#app', "package-a", { independent: true, createApp: createIndependentSubpackageApp })`
        )
      }
    )
  })

  test('prefers independent root main uts for app x', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    process.env.UNI_APP_X = 'true'
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        fs.mkdirSync(path.join(inputDir, 'package-a'), { recursive: true })
        fs.writeFileSync(path.join(inputDir, 'package-a/main.uts'), '')
        fs.writeFileSync(path.join(inputDir, 'package-a/main.ts'), '')
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const id = formatIndependentVirtualId(
          INDEPENDENT_MAIN_PREFIX,
          'package-a'
        )
        const result = (plugin.load as Function)(id)

        expect(result.code).toContain(
          withIndependentRoot(
            normalizePath(path.join(inputDir, 'package-a/main.uts')),
            'package-a'
          )
        )
      }
    )
  })

  test('propagates root query from importer', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const resolve = jest.fn(async () => ({ id: '/project/src/App.vue' }))

        const result = await (plugin.resolveId as Function).call(
          { resolve },
          './App.vue',
          withIndependentRoot('/project/src/main.ts', 'package-a')
        )

        expect(resolve).toHaveBeenCalledWith(
          './App.vue',
          '/project/src/main.ts',
          {
            skipSelf: true,
          }
        )
        expect(result.id).toBe(
          withIndependentRoot('/project/src/App.vue', 'package-a')
        )
      }
    )
  })

  test('resolves explicit root query dependency without importer', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const resolve = jest.fn(async () => ({
          id: '/project/node_modules/@dcloudio/uni-mp-weixin/dist/uni.mp.esm.js',
        }))

        const result = await (plugin.resolveId as Function).call(
          { resolve },
          withIndependentRoot(UNI_MP_RUNTIME_ID, 'package-a')
        )

        expect(resolve).toHaveBeenCalledWith(UNI_MP_RUNTIME_ID, undefined)
        expect(result.id).toBe(
          withIndependentRoot(
            '/project/node_modules/@dcloudio/uni-mp-weixin/dist/uni.mp.esm.js',
            'package-a'
          )
        )
      }
    )
  })

  test('marks independent mini program runtime without changing other modules', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const runtimeId = withIndependentRoot(
          '/project/node_modules/@dcloudio/uni-mp-weixin/dist/uni.mp.esm.js',
          'package-a'
        )
        const code =
          'const isIndependentRuntime = typeof __UNI_MP_INDEPENDENT_RUNTIME__ !== "undefined" && __UNI_MP_INDEPENDENT_RUNTIME__ === true'

        const result = (plugin.transform as Function)(code, runtimeId)

        expect(result.code).toBe(
          'const isIndependentRuntime = typeof true !== "undefined" && true === true'
        )
        expect(
          (plugin.transform as Function)(
            code,
            withIndependentRoot(
              '/project/src/pages/index/index.js',
              'package-a'
            )
          )
        ).toBeUndefined()
      }
    )
  })

  test('resolves explicit root query dependency from alias fallback', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
          vite: {
            alias: {
              [UNI_MP_RUNTIME_ID]:
                '/project/node_modules/@dcloudio/uni-mp-weixin/dist/uni.mp.esm.js',
            },
          },
        } as any)
        callBuildStart(plugin)
        const resolve = jest.fn(async () => null)

        const result = await (plugin.resolveId as Function).call(
          { resolve },
          withIndependentRoot(UNI_MP_RUNTIME_ID, 'package-a')
        )

        expect(result).toBe(
          withIndependentRoot(
            '/project/node_modules/@dcloudio/uni-mp-weixin/dist/uni.mp.esm.js',
            'package-a'
          )
        )
      }
    )
  })

  test('resolves and loads root-specific vue export helper', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const id = withIndependentRoot(VUE_EXPORT_HELPER_ID, 'package-a')

        await expect((plugin.resolveId as Function)(id)).resolves.toBe(id)
        const result = (plugin.load as Function)(id)
        expect(result.map).toEqual({ mappings: '' })
        expect(result.code).toContain('sfc.__vccOpts')
      }
    )
  })

  test('does not append root query to root-aware virtual component url', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const resolve = jest.fn()

        await expect(
          (plugin.resolveId as Function).call(
            { resolve },
            virtualComponentPath('package-a/components/foo.vue', 'package-a'),
            withIndependentRoot(
              `${inputDir}/package-a/pages/index/index.vue`,
              'package-a'
            )
          )
        ).resolves.toBeUndefined()
        expect(resolve).not.toHaveBeenCalled()
      }
    )
  })

  test('validates style and propagates root query for assets', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const resolve = jest.fn(async (source: string) => ({
          id: path.join(inputDir, 'package-a/pages/index', source),
        }))

        await expect(
          (plugin.resolveId as Function).call(
            { resolve },
            './style.css',
            withIndependentRoot(
              `${inputDir}/package-a/pages/index/index.vue`,
              'package-a'
            )
          )
        ).resolves.toBeUndefined()
        const assetResult = await (plugin.resolveId as Function).call(
          { resolve },
          './logo.png',
          withIndependentRoot(
            `${inputDir}/package-a/pages/index/index.vue`,
            'package-a'
          )
        )
        expect(assetResult.id).toBe(
          withIndependentRoot(
            path.join(inputDir, 'package-a/pages/index/logo.png'),
            'package-a'
          )
        )
        expect(resolve).toHaveBeenCalledTimes(2)
      }
    )
  })

  test('throws when independent root module imports root-outside project file', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const resolve = jest.fn(async () => ({
          id: path.join(inputDir, 'utils/foo.ts'),
        }))

        await expect(
          (plugin.resolveId as Function).call(
            { resolve },
            '../../utils/foo',
            withIndependentRoot(
              `${inputDir}/package-a/pages/index/index.vue`,
              'package-a'
            )
          )
        ).rejects.toThrow(
          '独立分包 "package-a" 不能引用 root 外依赖：utils/foo.ts'
        )
      }
    )
  })

  test('allows independent root module to import app pages json with root query', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const resolve = jest.fn(async () => ({
          id: path.join(inputDir, 'pages.json'),
        }))

        const result = await (plugin.resolveId as Function).call(
          { resolve },
          '@/pages.json',
          withIndependentRoot(
            `${inputDir}/package-a/pages/index/index.uvue`,
            'package-a'
          )
        )

        expect(result.id).toBe(
          withIndependentRoot(
            normalizePath(path.join(inputDir, 'pages.json')),
            'package-a'
          )
        )
      }
    )
  })

  test('infers root when root-inside module imports app pages json without root query', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const resolve = jest.fn(async () => ({
          id: path.join(inputDir, 'pages.json'),
        }))

        const result = await (plugin.resolveId as Function).call(
          { resolve },
          '@/pages.json',
          `${inputDir}/package-a/pages/index/index.uvue`
        )

        expect(result.id).toBe(
          withIndependentRoot(
            normalizePath(path.join(inputDir, 'pages.json')),
            'package-a'
          )
        )
      }
    )
  })

  test('throws when independent root module imports root-outside asset', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const resolve = jest.fn(async () => ({
          id: path.join(inputDir, 'static/logo.png'),
        }))

        await expect(
          (plugin.resolveId as Function).call(
            { resolve },
            '../../static/logo.png',
            withIndependentRoot(
              `${inputDir}/package-a/pages/index/index.vue`,
              'package-a'
            )
          )
        ).rejects.toThrow(
          '独立分包 "package-a" 不能引用 root 外依赖：static/logo.png'
        )
      }
    )
  })

  test('emits and injects independent bootstrap', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const emitFile = jest.fn(() => 'asset-reference')
        const bundle = {
          'package-a/pages/index/index.js': {
            type: 'chunk',
            fileName: 'package-a/pages/index/index.js',
            code: 'wx.createPage({})',
          },
          'package-a/components/foo.js': {
            type: 'chunk',
            fileName: 'package-a/components/foo.js',
            code: 'wx.createComponent({})',
          },
          'package-a/common/main.js': {
            type: 'chunk',
            fileName: 'package-a/common/main.js',
            code: 'require("../../App.vue_vue_type_style_index_0_lang.js");\nmain()',
          },
          'App.vue_vue_type_style_index_0_lang.js': {
            type: 'chunk',
            fileName: 'App.vue_vue_type_style_index_0_lang.js',
            code: '"use strict";',
          },
          'pages/index/index.js': {
            type: 'chunk',
            fileName: 'pages/index/index.js',
            code: 'wx.createPage({})',
          },
        }

        callGenerateBundle(plugin, { emitFile }, bundle)

        expect(emitFile).toHaveBeenCalledWith({
          type: 'asset',
          fileName: 'package-a/common/index.js',
          source: "require('./main.js');\n",
        })
        expect(bundle['package-a/pages/index/index.js'].code).toBe(
          "require('../../common/index.js');\nwx.createPage({})"
        )
        expect(bundle['package-a/components/foo.js'].code).toBe(
          "require('../common/index.js');\nwx.createComponent({})"
        )
        expect(bundle['package-a/common/main.js'].code).toBe(
          'require("./App.vue_vue_type_style_index_0_lang.js");\nmain()'
        )
        expect(
          bundle['package-a/common/App.vue_vue_type_style_index_0_lang.js']
        ).toMatchObject({
          type: 'chunk',
          fileName: 'package-a/common/App.vue_vue_type_style_index_0_lang.js',
        })
        expect(bundle['pages/index/index.js'].code).toBe('wx.createPage({})')
      }
    )
  })

  test('throws when independent output js references root-outside chunk', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const bundle = {
          'package-a/pages/index/index.js': {
            type: 'chunk',
            fileName: 'package-a/pages/index/index.js',
            code: 'require("../../../common/vendor.js");\nwx.createPage({})',
          },
          'common/vendor.js': {
            type: 'chunk',
            fileName: 'common/vendor.js',
            code: '"use strict";',
          },
        }

        expect(() =>
          callGenerateBundle(plugin, { emitFile: jest.fn() }, bundle)
        ).toThrow('独立分包 "package-a" 的 JS 不能引用 root 外产物')
      }
    )
  })

  test('does not copy app style into independent package', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const emitFile = jest.fn(() => 'asset-reference')
        const bundle = {
          'app.wxss': {
            type: 'asset',
            fileName: 'app.wxss',
            source:
              'page{color:red}.logo{background:url("package-a/static/logo.png")}',
          },
          'package-a/pages/index/index.wxss': {
            type: 'asset',
            fileName: 'package-a/pages/index/index.wxss',
            source: '.page{color:blue}',
          },
          'package-a/components/foo.wxss': {
            type: 'asset',
            fileName: 'package-a/components/foo.wxss',
            source: '.component{color:green}',
          },
        }

        callGenerateBundle(plugin, { emitFile }, bundle)

        expect(emitFile).not.toHaveBeenCalledWith(
          expect.objectContaining({
            fileName: 'package-a/common/main.wxss',
          })
        )
        expect(bundle['package-a/pages/index/index.wxss'].source).toBe(
          '.page{color:blue}'
        )
        expect(bundle['package-a/components/foo.wxss'].source).toBe(
          '.component{color:green}'
        )
      }
    )
  })

  test('throws when independent style imports main app style', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const bundle = {
          'app.wxss': {
            type: 'asset',
            fileName: 'app.wxss',
            source: 'page{color:red}',
          },
          'package-a/pages/index/index.wxss': {
            type: 'asset',
            fileName: 'package-a/pages/index/index.wxss',
            source: '@import "../../../app.wxss";\n.page{color:blue}',
          },
        }

        expect(() =>
          callGenerateBundle(plugin, { emitFile: jest.fn() }, bundle)
        ).toThrow('独立分包 "package-a" 的样式不能引用主包 app.wxss')
      }
    )
  })

  test('throws when independent style references root-outside asset', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const bundle = {
          'app.wxss': {
            type: 'asset',
            fileName: 'app.wxss',
            source: 'page{color:red}',
          },
          'package-a/pages/index/index.wxss': {
            type: 'asset',
            fileName: 'package-a/pages/index/index.wxss',
            source: '.page{background:url("../../../static/logo.png")}',
          },
        }

        expect(() =>
          callGenerateBundle(plugin, { emitFile: jest.fn() }, bundle)
        ).toThrow('独立分包 "package-a" 的样式不能引用 root 外资源')
      }
    )
  })

  test('resolves x built-in asset paths inside independent root', async () => {
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        fs.writeFileSync(path.join(inputDir, 'manifest.json'), '{}')

        expect(
          resolveUVueCssFilename('package-a/pages/index/index.wxss', '.wxss')
        ).toBe('package-a/uvue.wxss')
        expect(resolveUVueCssFilename('pages/index/index.wxss', '.wxss')).toBe(
          'uvue.wxss'
        )
        expect(
          resolveNVueCssFilename('package-a/pages/index/index.wxss', '.wxss')
        ).toBe('package-a/nvue.wxss')
        expect(resolveNVueCssFilename('pages/index/index.wxss', '.wxss')).toBe(
          'nvue.wxss'
        )
        const plugin = uniMiniProgramPlugin({
          vite: { alias: {}, copyOptions: {}, inject: {} },
          global: 'wx',
          app: { usingComponents: true },
          template: {
            extname: '.wxml',
            directive: 'wx:',
            class: { array: true },
            slot: {},
            filter: {
              lang: 'wxs',
              extname: '.wxs',
              setStyle: true,
              generate(filter: { name: string }, filename: string) {
                return `<wxs src="${filename}.wxs" module="${filter.name}"/>`
              },
            },
          },
          style: { extname: '.wxss' },
        } as any)
        const generate = (plugin.uni!.compilerOptions as any).miniProgram.filter
          .generate
        expect(
          generate(
            { id: 'uniView', name: 'uV', type: 'filter' },
            '/common/uniView',
            path.join(inputDir, 'package-a/pages/index/index.uvue')
          )
        ).toBe('<wxs src="../../common/uniView.wxs" module="uV"/>')
        expect(
          generate(
            { id: 'uniView', name: 'uV', type: 'filter' },
            '/common/uniView',
            path.join(inputDir, 'pages/index/index.uvue')
          )
        ).toBe('<wxs src="/common/uniView.wxs" module="uV"/>')
      }
    )
  })

  test('emits x built-in assets for independent roots', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    process.env.UNI_APP_X = 'true'
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        fs.writeFileSync(path.join(inputDir, 'manifest.json'), '{}')
        const plugin = uniMiniProgramPlugin({
          vite: { alias: {}, copyOptions: {}, inject: {} },
          global: 'wx',
          app: { usingComponents: true },
          template: {
            extname: '.wxml',
            directive: 'wx:',
            class: { array: true },
            slot: {},
            filter: {
              lang: 'wxs',
              extname: '.wxs',
              setStyle: true,
              generate(filter: { name: string }, filename: string) {
                return `<wxs src="${filename}.wxs" module="${filter.name}"/>`
              },
            },
          },
          style: { extname: '.wxss' },
        } as any)
        const emitFile = jest.fn()

        ;(plugin.generateBundle as Function).call(
          { emitFile, getModuleInfo: jest.fn() },
          {},
          {}
        )

        expect(emitFile).toHaveBeenCalledWith(
          expect.objectContaining({ fileName: 'common/uniView.wxs' })
        )
        expect(emitFile).toHaveBeenCalledWith(
          expect.objectContaining({ fileName: 'package-a/common/uniView.wxs' })
        )
        expect(emitFile).toHaveBeenCalledWith(
          expect.objectContaining({ fileName: 'uvue.wxss' })
        )
        expect(emitFile).toHaveBeenCalledWith(
          expect.objectContaining({ fileName: 'package-a/uvue.wxss' })
        )
      }
    )
  })

  test('emits nvue built-in style for independent roots', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    delete (process.env as Record<string, string | undefined>).UNI_APP_X
    await withPagesJson(
      {
        pages: [{ path: 'pages/home/index' }],
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        fs.writeFileSync(path.join(inputDir, 'manifest.json'), '{}')
        fs.mkdirSync(path.join(inputDir, 'pages/home'), {
          recursive: true,
        })
        fs.writeFileSync(
          path.join(inputDir, 'pages/home/index.vue'),
          '<template><view /></template>'
        )
        fs.mkdirSync(path.join(inputDir, 'package-a/pages/index'), {
          recursive: true,
        })
        fs.writeFileSync(
          path.join(inputDir, 'package-a/pages/index/index.nvue'),
          '<template><view /></template>'
        )

        const options = {
          vite: { alias: {}, copyOptions: {}, inject: {} },
          global: 'wx',
          app: {
            subpackages: true,
            independentSubpackages: true,
            usingComponents: true,
          },
          template: {
            extname: '.wxml',
            directive: 'wx:',
            class: { array: true },
            slot: {},
          },
          style: { extname: '.wxss' },
        } as any
        const resolvedConfig = {
          plugins: [],
          createResolver: () => jest.fn(),
        } as any
        const pagesPlugin = uniPagesJsonPlugin(options)
        ;(pagesPlugin.configResolved as Function).call({}, resolvedConfig)
        ;(pagesPlugin.transform as Function).call(
          { addWatchFile: jest.fn() },
          fs.readFileSync(path.join(inputDir, 'pages.json'), 'utf8'),
          path.join(inputDir, PAGES_JSON_JS)
        )

        const plugin = uniMiniProgramPlugin(options)
        ;(plugin.configResolved as Function).call({}, resolvedConfig)
        const emitFile = jest.fn()

        ;(plugin.generateBundle as Function).call(
          { emitFile, getModuleInfo: jest.fn() },
          {},
          {}
        )

        expect(emitFile).toHaveBeenCalledWith(
          expect.objectContaining({ fileName: 'nvue.wxss' })
        )
        expect(emitFile).toHaveBeenCalledWith(
          expect.objectContaining({ fileName: 'package-a/nvue.wxss' })
        )
      }
    )
  })

  test('moves component copy assets to transformed target', async () => {
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const componentAssets = [
          'wxcomponents',
          'uni_modules/*/wxcomponents/**/*',
          'package-a/wxcomponents',
          'package-a/uni_modules/*/wxcomponents/**/*',
        ]
        const copyOptions = normalizeCopyOptions(
          {
            assets: [...componentAssets, 'static/**/*'],
            targets: [],
          },
          {
            app: {
              independentSubpackages: true,
            },
            template: {
              component: {
                dir: 'wxcomponents',
              },
            },
          } as any
        )
        expect(copyOptions.assets).toEqual(['static/**/*'])
        expect(copyOptions.targets?.[0].src).toEqual(componentAssets)
        expect(
          copyOptions.targets?.[0].transform!(
            Buffer.from('Component({})'),
            path.join(inputDir, 'package-a/wxcomponents/native-badge/index.js')
          )
        ).toBe("require('../../common/vendor.js');\nComponent({})")
      }
    )
  })

  test('keeps strict directive before injected root runtime', async () => {
    await withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      async (inputDir) => {
        expect(
          transformIndependentMiniProgramComponentJs(
            '"use strict";\nComponent({})',
            path.join(inputDir, 'package-a/wxcomponents/badge/index.js'),
            {
              componentDir: 'wxcomponents',
              independentRoots: ['package-a'],
              inputDir,
            }
          )
        ).toBe(
          '"use strict";\nrequire(\'../../common/vendor.js\');\nComponent({})'
        )
      }
    )
  })
})
