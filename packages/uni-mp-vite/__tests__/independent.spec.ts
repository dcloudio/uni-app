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
        const plugin = uniIndependentSubpackagePlugin({} as any)
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

        const plugin = uniIndependentSubpackagePlugin({} as any)
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

  test('resolves independent pages virtual module as an empty stub', async () => {
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
        const plugin = uniIndependentSubpackagePlugin({} as any)
        ;(plugin.buildStart as Function).call({})
        const id = '\0uni:mp-independent-pages?root=package-a'

        await expect((plugin.resolveId as Function)(id)).resolves.toBe(id)
        expect((plugin.load as Function)(id)).toEqual({
          code: '',
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
        const plugin = uniIndependentSubpackagePlugin({} as any)
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

  test('does not propagate root query for style and assets', async () => {
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
        const plugin = uniIndependentSubpackagePlugin({} as any)
        ;(plugin.buildStart as Function).call({})
        const resolve = jest.fn()

        await expect(
          (plugin.resolveId as Function).call(
            { resolve },
            './style.css',
            '/project/src/main.ts?uni_mp_independent_root=package-a'
          )
        ).resolves.toBeUndefined()
        await expect(
          (plugin.resolveId as Function).call(
            { resolve },
            './logo.png',
            '/project/src/main.ts?uni_mp_independent_root=package-a'
          )
        ).resolves.toBeUndefined()
        expect(resolve).not.toHaveBeenCalled()
      }
    )
  })
})
