import fs from 'fs'
import os from 'os'
import path from 'path'
import { uniIndependentSubpackagePlugin } from '../src/plugins/independent'

function withPagesJson(pagesJson: unknown, test: (inputDir: string) => void) {
  const inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-independent-'))
  fs.writeFileSync(
    path.join(inputDir, 'pages.json'),
    JSON.stringify(pagesJson, null, 2)
  )
  try {
    test(inputDir)
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

  test('resolves and loads independent main virtual module', () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const plugin = uniIndependentSubpackagePlugin({} as any)
        ;(plugin.buildStart as Function).call({})
        const id = '\0uni:mp-independent-main?root=package-a'

        expect((plugin.resolveId as Function)(id)).toBe(id)
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

  test('resolves app factory to root-specific main module', () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const mainPath = path.join(inputDir, 'main.ts')
        fs.writeFileSync(mainPath, 'export function createApp() {}')

        const plugin = uniIndependentSubpackagePlugin({} as any)
        ;(plugin.buildStart as Function).call({})
        const id = '\0uni:mp-app-factory?root=package-a'

        expect((plugin.resolveId as Function)(id)).toBe(id)
        expect((plugin.load as Function)(id)).toEqual({
          code: `export { createApp } from ${JSON.stringify(
            `${mainPath}?uni_mp_independent_root=package-a`
          )}\n`,
          map: { mappings: '' },
        })
      }
    )
  })

  test('resolves independent pages virtual module as an empty stub', () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    withPagesJson(
      {
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      (inputDir) => {
        process.env.UNI_INPUT_DIR = inputDir
        const plugin = uniIndependentSubpackagePlugin({} as any)
        ;(plugin.buildStart as Function).call({})
        const id = '\0uni:mp-independent-pages?root=package-a'

        expect((plugin.resolveId as Function)(id)).toBe(id)
        expect((plugin.load as Function)(id)).toEqual({
          code: '',
          map: { mappings: '' },
        })
      }
    )
  })
})
