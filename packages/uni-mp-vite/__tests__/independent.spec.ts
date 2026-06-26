import fs from 'fs'
import os from 'os'
import path from 'path'
import { parseIndependentSubPackages } from '@dcloudio/uni-cli-shared'
import { virtualComponentPath, virtualPagePath } from '../src/plugins/entry'
import { uniIndependentSubpackagePlugin } from '../src/plugins/independent'
import {
  APP_FACTORY_PREFIX,
  INDEPENDENT_MAIN_PREFIX,
  INDEPENDENT_PAGES_PREFIX,
  UNI_MP_RUNTIME_ID,
  VUE_EXPORT_HELPER_ID,
  formatIndependentPageVirtualId,
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
    parseIndependentSubPackages(
      pagesJson as UniApp.PagesJson,
      process.env.UNI_PLATFORM
    )
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
          `import ${JSON.stringify(
            withIndependentRoot(UNI_MP_RUNTIME_ID, 'package-a')
          )}`
        )
        expect(result.code).toContain(
          `import { createApp as createUserApp } from ${JSON.stringify(
            formatIndependentVirtualId(APP_FACTORY_PREFIX, 'package-a')
          )}`
        )
        expect(result.code).toContain(
          `import ${JSON.stringify(
            formatIndependentVirtualId(INDEPENDENT_PAGES_PREFIX, 'package-a')
          )}`
        )
        expect(result.code).toContain("createUserApp().app.mount('#app')")
      }
    )
  })

  test('resolves app factory to root-specific main module', async () => {
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
        const mainPath = path.join(inputDir, 'main.ts')
        const appVuePath = path.join(inputDir, 'App.vue')
        fs.writeFileSync(mainPath, 'export function createApp() {}')
        fs.writeFileSync(appVuePath, '<script></script>')

        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const id = formatIndependentVirtualId(APP_FACTORY_PREFIX, 'package-a')
        const addWatchFile = jest.fn()

        await expect((plugin.resolveId as Function)(id)).resolves.toBe(id)
        expect((plugin.load as Function).call({ addWatchFile }, id)).toEqual({
          code: `export { createApp } from ${JSON.stringify(
            withIndependentRoot(mainPath, 'package-a')
          )}\n`,
          map: { mappings: '' },
        })
        expect(addWatchFile).toHaveBeenCalledWith(mainPath)
        expect(addWatchFile).toHaveBeenCalledWith(appVuePath)
      }
    )
  })

  test('resolves and loads independent pages virtual module', async () => {
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
        const pagePath = path.join(inputDir, 'package-a/pages/index/index.vue')
        fs.mkdirSync(path.dirname(pagePath), { recursive: true })
        fs.writeFileSync(pagePath, '<template><view /></template>')
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const id = formatIndependentVirtualId(
          INDEPENDENT_PAGES_PREFIX,
          'package-a'
        )

        await expect((plugin.resolveId as Function)(id)).resolves.toBe(id)
        const result = (plugin.load as Function)(id)
        expect(result.map).toEqual({ mappings: '' })
        expect(result.code).toContain(
          `import(${JSON.stringify(
            virtualPagePath('package-a/pages/index/index.vue', 'package-a')
          )})`
        )
      }
    )
  })

  test('loads independent page virtual module', async () => {
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
        const pagePath = path.join(inputDir, 'package-a/pages/index/index.vue')
        fs.mkdirSync(path.dirname(pagePath), { recursive: true })
        fs.writeFileSync(pagePath, '<template><view /></template>')
        const plugin = uniIndependentSubpackagePlugin({
          global: 'wx',
          style: { extname: '.wxss' },
        } as any)
        callBuildStart(plugin)
        const id = formatIndependentPageVirtualId(
          'package-a',
          'package-a/pages/index/index.vue'
        )
        const addWatchFile = jest.fn()

        await expect((plugin.resolveId as Function)(id)).resolves.toBe(id)
        const result = (plugin.load as Function).call({ addWatchFile }, id)

        expect(addWatchFile).toHaveBeenCalledWith(pagePath)
        expect(result).toEqual({
          code: `import MiniProgramPage from ${JSON.stringify(
            withIndependentRoot(pagePath, 'package-a')
          )}
wx.createPage(MiniProgramPage)`,
          map: { mappings: '' },
        })
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
            skipSelf: false,
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

  test('emits and injects independent global style', async () => {
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

        expect(emitFile).toHaveBeenCalledWith({
          type: 'asset',
          fileName: 'package-a/common/main.wxss',
          source: 'page{color:red}.logo{background:url("../static/logo.png")}',
        })
        expect(bundle['package-a/pages/index/index.wxss'].source).toBe(
          '@import "../../common/main.wxss";\n.page{color:blue}'
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
})
