import fs from 'fs'
import os from 'os'
import path from 'path'
import { createBuildOptions } from '../src/plugin/build'
import { virtualComponentPath, virtualPagePath } from '../src/plugins/entry'

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
  return createBuildOptions(inputDir, 'mp-weixin').rollupOptions!
    .output as Record<string, Function>
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
          `${inputDir}/utils/foo.ts?uni_mp_independent_root=package-a`,
          meta
        )
      ).toBe('package-a/common/utils/foo')
      expect(
        manualChunks(
          `${inputDir}/package-a/utils/foo.ts?uni_mp_independent_root=package-a`,
          meta
        )
      ).toBe('package-a/common/utils/foo')
      expect(
        manualChunks(
          `${inputDir}/node_modules/foo/index.js?uni_mp_independent_root=package-a`,
          meta
        )
      ).toBe('package-a/common/vendor')
      expect(
        manualChunks(
          `${inputDir}/static/logo.png?uni_mp_independent_root=package-a`,
          meta
        )
      ).toBe('package-a/common/assets')
      expect(
        manualChunks(
          `${inputDir}/main.ts?uni_mp_independent_root=package-a`,
          meta
        )
      ).toBeUndefined()
      expect(manualChunks(`${inputDir}/utils/foo.ts`, meta)).toBe('utils/foo')
    })
  })

  test('names independent dynamic chunks inside current root', async () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    clearCompileTarget()
    await withMiniProgramProject(async (inputDir) => {
      process.env.UNI_INPUT_DIR = inputDir
      const chunkFileNames = getRollupOutput(inputDir).chunkFileNames
      const independentPageId = `\0uni:mp-independent-page?root=package-a&page=${encodeURIComponent(
        'package-a/pages/index/index.vue'
      )}`

      expect(
        chunkFileNames({
          isDynamicEntry: true,
          facadeModuleId: `${inputDir}/utils/lazy.ts?uni_mp_independent_root=package-a`,
        })
      ).toBe('package-a/common/utils/lazy.js')
      expect(
        chunkFileNames({
          isDynamicEntry: true,
          facadeModuleId: independentPageId,
        })
      ).toBe('package-a/pages/index/index.js')
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
      expect(chunkFileNames({ isDynamicEntry: false })).toBe('[name].js')
    })
  })
})
