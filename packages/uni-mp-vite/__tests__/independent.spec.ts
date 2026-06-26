import fs from 'fs'
import os from 'os'
import path from 'path'
import { uniIndependentSubpackagePlugin } from '../src/plugins/independent'

async function withPagesJson(
  pagesJson: unknown,
  test: (inputDir: string) => void | Promise<void>
) {
  const inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-independent-'))
  fs.writeFileSync(
    path.join(inputDir, 'pages.json'),
    JSON.stringify(pagesJson, null, 2)
  )
  try {
    await test(inputDir)
  } finally {
    fs.rmSync(inputDir, { recursive: true, force: true })
  }
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
        const plugin = uniIndependentSubpackagePlugin({ global: 'wx' } as any)
        ;(plugin.buildStart as Function).call({})
        const id = '\0uni:mp-independent-main?root=package-a'

        await expect((plugin.resolveId as Function)(id)).resolves.toBe(id)
        const result = (plugin.load as Function)(id)
        expect(result.map).toEqual({ mappings: '' })
        expect(result.code).toContain(
          'import "uni-mp-runtime?uni_mp_independent_root=package-a"'
        )
        expect(result.code).toContain(
          'import { createApp as createUserApp } from "\\u0000uni:mp-app-factory?root=package-a"'
        )
        expect(result.code).toContain(
          'import "\\u0000uni:mp-independent-pages?root=package-a"'
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
        fs.writeFileSync(mainPath, 'export function createApp() {}')

        const plugin = uniIndependentSubpackagePlugin({ global: 'wx' } as any)
        ;(plugin.buildStart as Function).call({})
        const id = '\0uni:mp-app-factory?root=package-a'

        await expect((plugin.resolveId as Function)(id)).resolves.toBe(id)
        expect((plugin.load as Function)(id)).toEqual({
          code: `export { createApp } from ${JSON.stringify(
            `${mainPath}?uni_mp_independent_root=package-a`
          )}\n`,
          map: { mappings: '' },
        })
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
        const plugin = uniIndependentSubpackagePlugin({ global: 'wx' } as any)
        ;(plugin.buildStart as Function).call({})
        const id = '\0uni:mp-independent-pages?root=package-a'
        const addWatchFile = jest.fn()

        await expect((plugin.resolveId as Function)(id)).resolves.toBe(id)
        const result = (plugin.load as Function).call({ addWatchFile }, id)
        expect(addWatchFile).toHaveBeenCalledWith(
          path.join(inputDir, 'pages.json')
        )
        expect(result.map).toEqual({ mappings: '' })
        expect(result.code).toContain(
          'import("\\u0000uni:mp-independent-page?root=package-a&page=package-a%2Fpages%2Findex%2Findex.vue")'
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
        const plugin = uniIndependentSubpackagePlugin({ global: 'wx' } as any)
        ;(plugin.buildStart as Function).call({})
        const id =
          '\0uni:mp-independent-page?root=package-a&page=package-a%2Fpages%2Findex%2Findex.vue'
        const addWatchFile = jest.fn()

        await expect((plugin.resolveId as Function)(id)).resolves.toBe(id)
        const result = (plugin.load as Function).call({ addWatchFile }, id)

        expect(addWatchFile).toHaveBeenCalledWith(pagePath)
        expect(result).toEqual({
          code: `import MiniProgramPage from ${JSON.stringify(
            `${pagePath}?uni_mp_independent_root=package-a`
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
        const plugin = uniIndependentSubpackagePlugin({ global: 'wx' } as any)
        ;(plugin.buildStart as Function).call({})
        const resolve = jest.fn(async () => ({ id: '/project/src/App.vue' }))

        const result = await (plugin.resolveId as Function).call(
          { resolve },
          './App.vue',
          '/project/src/main.ts?uni_mp_independent_root=package-a'
        )

        expect(resolve).toHaveBeenCalledWith(
          './App.vue',
          '/project/src/main.ts',
          {
            skipSelf: true,
          }
        )
        expect(result.id).toBe(
          '/project/src/App.vue?uni_mp_independent_root=package-a'
        )
      }
    )
  })

  test('validates but does not propagate root query for style and assets', async () => {
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
        const plugin = uniIndependentSubpackagePlugin({ global: 'wx' } as any)
        ;(plugin.buildStart as Function).call({})
        const resolve = jest.fn(async (source: string) => ({
          id: path.join(inputDir, 'package-a/pages/index', source),
        }))

        await expect(
          (plugin.resolveId as Function).call(
            { resolve },
            './style.css',
            `${inputDir}/package-a/pages/index/index.vue?uni_mp_independent_root=package-a`
          )
        ).resolves.toBeUndefined()
        await expect(
          (plugin.resolveId as Function).call(
            { resolve },
            './logo.png',
            `${inputDir}/package-a/pages/index/index.vue?uni_mp_independent_root=package-a`
          )
        ).resolves.toBeUndefined()
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
        const plugin = uniIndependentSubpackagePlugin({ global: 'wx' } as any)
        ;(plugin.buildStart as Function).call({})
        const resolve = jest.fn(async () => ({
          id: path.join(inputDir, 'utils/foo.ts'),
        }))

        await expect(
          (plugin.resolveId as Function).call(
            { resolve },
            '../../utils/foo',
            `${inputDir}/package-a/pages/index/index.vue?uni_mp_independent_root=package-a`
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
        const plugin = uniIndependentSubpackagePlugin({ global: 'wx' } as any)
        ;(plugin.buildStart as Function).call({})
        const resolve = jest.fn(async () => ({
          id: path.join(inputDir, 'static/logo.png'),
        }))

        await expect(
          (plugin.resolveId as Function).call(
            { resolve },
            '../../static/logo.png',
            `${inputDir}/package-a/pages/index/index.vue?uni_mp_independent_root=package-a`
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
        const plugin = uniIndependentSubpackagePlugin({ global: 'wx' } as any)
        ;(plugin.buildStart as Function).call({})
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
            code: 'main()',
          },
          'pages/index/index.js': {
            type: 'chunk',
            fileName: 'pages/index/index.js',
            code: 'wx.createPage({})',
          },
        }

        ;(plugin.generateBundle as Function).call({ emitFile }, {}, bundle)

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
        expect(bundle['package-a/common/main.js'].code).toBe('main()')
        expect(bundle['pages/index/index.js'].code).toBe('wx.createPage({})')
      }
    )
  })
})
