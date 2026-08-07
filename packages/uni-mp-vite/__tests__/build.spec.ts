import fs from 'fs'
import os from 'os'
import path from 'path'
import { createBuildOptions } from '../src/plugin/build'
import { virtualComponentPath, virtualPagePath } from '../src/plugins/entry'
import { withIndependentRoot } from '../src/plugins/independentUtils'

async function withMiniProgramProject(
  test: (inputDir: string) => void | Promise<void>
) {
  const inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-mp-build-'))
  fs.writeFileSync(path.join(inputDir, 'manifest.json'), '{}')
  fs.writeFileSync(path.join(inputDir, 'main.ts'), 'export {}')
  fs.writeFileSync(
    path.join(inputDir, 'pages.json'),
    JSON.stringify({
      pages: [{ path: 'pages/index/index' }],
      subPackages: [
        {
          root: 'package-a',
          independent: true,
          pages: [{ path: 'pages/index/index' }],
        },
      ],
    })
  )
  try {
    await test(inputDir)
  } finally {
    fs.rmSync(inputDir, { recursive: true, force: true })
  }
}

function getRollupOutput(inputDir: string) {
  return createBuildOptions(inputDir, 'mp-weixin', {
    app: { independentSubpackages: true },
  }).rollupOptions!.output as Record<string, Function>
}

function clearCompileTarget() {
  delete (process.env as Record<string, string | undefined>).UNI_COMPILE_TARGET
}

describe('mp vite build options', () => {
  const originalPlatform = process.env.UNI_PLATFORM
  const originalInputDir = process.env.UNI_INPUT_DIR
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
    if (originalCompileTarget === undefined) {
      clearCompileTarget()
    } else {
      process.env.UNI_COMPILE_TARGET = originalCompileTarget
    }
  })

  test('routes independent root modules to root common chunks', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    clearCompileTarget()
    await withMiniProgramProject(async (inputDir) => {
      process.env.UNI_INPUT_DIR = inputDir
      const manualChunks = getRollupOutput(inputDir).manualChunks
      const meta = { getModuleInfo: jest.fn() }

      expect(
        manualChunks(
          withIndependentRoot(`${inputDir}/utils/foo.ts`, 'package-a'),
          meta
        )
      ).toBe('package-a/common/utils/foo')
      expect(
        manualChunks(
          withIndependentRoot(
            `${inputDir}/package-a/utils/foo.ts`,
            'package-a'
          ),
          meta
        )
      ).toBe('package-a/common/utils/foo')
      expect(
        manualChunks(
          withIndependentRoot(
            `${inputDir}/node_modules/foo/index.js`,
            'package-a'
          ),
          meta
        )
      ).toBe('package-a/common/vendor')
      expect(
        manualChunks(
          withIndependentRoot(`${inputDir}/static/logo.png`, 'package-a'),
          meta
        )
      ).toBe('package-a/common/assets')
      expect(
        manualChunks(
          withIndependentRoot(`${inputDir}/pages.json`, 'package-a'),
          meta
        )
      ).toBe('package-a/common/vendor')
      expect(
        manualChunks(
          withIndependentRoot(`${inputDir}/main.ts`, 'package-a'),
          meta
        )
      ).toBeUndefined()
      expect(manualChunks(`${inputDir}/utils/foo.ts`, meta)).toBe('utils/foo')
    })
  })

  test('adds independent input only when app option supports it', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    clearCompileTarget()
    await withMiniProgramProject(async (inputDir) => {
      process.env.UNI_INPUT_DIR = inputDir

      expect(
        createBuildOptions(inputDir, 'mp-weixin', {
          app: { independentSubpackages: true },
        }).rollupOptions!.input
      ).toMatchObject({
        'package-a/common/main': expect.any(String),
      })
      expect(
        createBuildOptions(inputDir, 'mp-weixin', {
          app: { independentSubpackages: false },
        }).rollupOptions!.input
      ).not.toHaveProperty('package-a/common/main')
    })
  })

  test('names independent dynamic chunks inside current root', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    clearCompileTarget()
    await withMiniProgramProject(async (inputDir) => {
      process.env.UNI_INPUT_DIR = inputDir
      const chunkFileNames = getRollupOutput(inputDir).chunkFileNames

      expect(
        chunkFileNames({
          isDynamicEntry: true,
          facadeModuleId: withIndependentRoot(
            `${inputDir}/utils/lazy.ts`,
            'package-a'
          ),
        })
      ).toBe('package-a/common/utils/lazy.js')
      expect(
        chunkFileNames({
          isDynamicEntry: true,
          facadeModuleId: virtualPagePath(
            'package-a/pages/index/index.vue',
            'package-a'
          ),
        })
      ).toBe('package-a/pages/index/index.js')
      expect(
        chunkFileNames({
          isDynamicEntry: true,
          facadeModuleId: virtualComponentPath(
            'package-a/components/foo.vue',
            'package-a'
          ),
        })
      ).toBe('package-a/components/foo.js')
      expect(
        chunkFileNames({
          isDynamicEntry: true,
          facadeModuleId: `${inputDir}/utils/lazy.ts`,
        })
      ).toBe('utils/lazy.js')
      expect(
        chunkFileNames({
          isDynamicEntry: false,
          name: 'App.vue_vue_type_style_index_0_lang',
          moduleIds: [
            withIndependentRoot(
              `${inputDir}/App.vue?vue&type=style&index=0&lang.css`,
              'package-a'
            ),
          ],
        })
      ).toBe('package-a/common/App.vue_vue_type_style_index_0_lang.js')
      expect(chunkFileNames({ isDynamicEntry: false })).toBe('[name].js')
    })
  })
})
