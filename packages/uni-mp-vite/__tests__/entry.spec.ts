import fs from 'fs'
import os from 'os'
import path from 'path'
import {
  addMiniProgramComponentPackageRoot,
  normalizePath,
  resetMiniProgramJsonFiles,
} from '@dcloudio/uni-cli-shared'
import {
  parseVirtualComponentPath,
  parseVirtualComponentPathInfo,
  parseVirtualPagePath,
  parseVirtualPagePathInfo,
  uniEntryPlugin,
  virtualComponentPath,
  virtualPagePath,
} from '../src/plugins/entry'
import { emitFile, getTemplateFiles } from '../src/plugin/template'
import {
  UNI_MP_RUNTIME_ID,
  withIndependentRoot,
} from '../src/plugins/independentUtils'

async function withEntryProject(
  test: (inputDir: string) => void | Promise<void>
) {
  const inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-entry-'))
  const originalInputDir = process.env.UNI_INPUT_DIR
  const originalPlatform = process.env.UNI_PLATFORM
  try {
    process.env.UNI_INPUT_DIR = inputDir
    process.env.UNI_PLATFORM = 'mp-weixin'
    fs.writeFileSync(path.join(inputDir, 'manifest.json'), '{}')
    await test(inputDir)
  } finally {
    if (originalInputDir === undefined) {
      delete (process.env as Record<string, string | undefined>).UNI_INPUT_DIR
    } else {
      process.env.UNI_INPUT_DIR = originalInputDir
    }
    if (originalPlatform === undefined) {
      delete (process.env as Record<string, string | undefined>).UNI_PLATFORM
    } else {
      process.env.UNI_PLATFORM = originalPlatform
    }
    fs.rmSync(inputDir, { recursive: true, force: true })
  }
}

describe('entry virtual paths', () => {
  test('keeps legacy page virtual path format', () => {
    const id = virtualPagePath('pages/index/index.vue')

    expect(parseVirtualPagePath(id)).toBe('pages/index/index.vue')
    expect(parseVirtualPagePathInfo(id)).toEqual({
      filepath: 'pages/index/index.vue',
    })
  })

  test('encodes page root metadata', () => {
    const id = virtualPagePath('package-a/pages/index/index.vue', 'package-a')

    expect(parseVirtualPagePath(id)).toBe('package-a/pages/index/index.vue')
    expect(parseVirtualPagePathInfo(id)).toEqual({
      filepath: 'package-a/pages/index/index.vue',
      root: 'package-a',
    })
  })

  test('keeps legacy component virtual path format', () => {
    const id = virtualComponentPath('components/foo.vue')

    expect(parseVirtualComponentPath(id)).toBe('components/foo.vue')
    expect(parseVirtualComponentPathInfo(id)).toEqual({
      filepath: 'components/foo.vue',
    })
  })

  test('encodes component root metadata', () => {
    const id = virtualComponentPath('package-a/components/foo.vue', 'package-a')

    expect(parseVirtualComponentPath(id)).toBe('package-a/components/foo.vue')
    expect(parseVirtualComponentPathInfo(id)).toEqual({
      filepath: 'package-a/components/foo.vue',
      root: 'package-a',
    })
  })

  test('loads independent page with root runtime createPage', async () => {
    await withEntryProject((inputDir) => {
      const page = 'package-a/pages/index/index.vue'
      const filepath = path.join(inputDir, page)
      fs.mkdirSync(path.dirname(filepath), { recursive: true })
      fs.writeFileSync(filepath, '<template><view /></template>')
      const plugin = uniEntryPlugin({
        global: 'wx',
        template: { extname: '.wxml' },
        style: { extname: '.wxss' },
      } as any)

      const result = (plugin.load as Function).call(
        { addWatchFile: jest.fn() },
        virtualPagePath(page, 'package-a')
      )
      const runtimeId = withIndependentRoot(UNI_MP_RUNTIME_ID, 'package-a')
      const pageId = withIndependentRoot(
        normalizePath(path.join(inputDir, page)),
        'package-a'
      )
      const expectedCode = [
        `import { createPage as __uniCreatePage } from ${JSON.stringify(
          runtimeId
        )}`,
        `import MiniProgramPage from '${pageId}'`,
        '__uniCreatePage(MiniProgramPage)',
      ].join('\n')

      expect(result.code).toBe(expectedCode)
    })
  })

  test('loads independent component with root runtime createComponent', async () => {
    await withEntryProject((inputDir) => {
      const component = 'package-a/components/foo.vue'
      const filepath = path.join(inputDir, component)
      fs.mkdirSync(path.dirname(filepath), { recursive: true })
      fs.writeFileSync(filepath, '<template><view /></template>')
      const plugin = uniEntryPlugin({
        global: 'wx',
        template: { extname: '.wxml' },
        style: { extname: '.wxss' },
      } as any)

      const result = (plugin.load as Function).call(
        { addWatchFile: jest.fn() },
        virtualComponentPath(component, 'package-a')
      )
      const runtimeId = withIndependentRoot(UNI_MP_RUNTIME_ID, 'package-a')
      const componentId = withIndependentRoot(
        normalizePath(path.join(inputDir, component)),
        'package-a'
      )
      const expectedCode = [
        `import { createComponent as __uniCreateComponent } from ${JSON.stringify(
          runtimeId
        )}`,
        `import Component from '${componentId}'`,
        '__uniCreateComponent(Component)',
      ].join('\n')

      expect(result.code).toBe(expectedCode)
    })
  })

  test('loads package scoped uni_modules component without changing source id', async () => {
    await withEntryProject((inputDir) => {
      const component = 'uni_modules/foo/components/foo/foo.vue'
      const filepath = path.join(inputDir, component)
      fs.mkdirSync(path.dirname(filepath), { recursive: true })
      fs.writeFileSync(filepath, '<template><view /></template>')
      const plugin = uniEntryPlugin({
        global: 'wx',
        template: { extname: '.wxml' },
        style: { extname: '.wxss' },
      } as any)

      const result = (plugin.load as Function).call(
        { addWatchFile: jest.fn() },
        virtualComponentPath(component, undefined, 'pages-a')
      )

      expect(result.code).toContain(
        `import Component from '${normalizePath(filepath)}'`
      )
    })
  })

  test('emits package scoped template only while one package root uses the component', async () => {
    await withEntryProject((inputDir) => {
      const component = normalizePath(
        path.join(inputDir, 'uni_modules/foo/components/foo/foo.vue')
      )
      resetMiniProgramJsonFiles()
      addMiniProgramComponentPackageRoot(component, 'pages-a')

      emitFile({
        type: 'asset',
        fileName: component,
        source: '<view />',
      } as any)

      expect(getTemplateFiles({} as any)).toMatchObject({
        'pages-a/uni_modules/foo/components/foo/foo': '<view />',
      })

      addMiniProgramComponentPackageRoot(component, 'pages-b')
      emitFile({
        type: 'asset',
        fileName: component,
        source: '<view />',
      } as any)

      expect(getTemplateFiles({} as any)).toMatchObject({
        'uni_modules/foo/components/foo/foo': '<view />',
      })
    })
  })
})
