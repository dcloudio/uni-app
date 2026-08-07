import fs from 'fs'
import os from 'os'
import path from 'path'
import {
  normalizePath,
  setIndependentSubPackages,
  withIndependentRoot,
  withoutIndependentRoot,
} from '@dcloudio/uni-cli-shared'
import { customResolver } from '../src/config/resolve'

describe('customResolver independent root', () => {
  const envKeys = ['UNI_INPUT_DIR', 'UNI_PLATFORM', 'UNI_APP_X'] as const
  const prevEnv: Record<string, string | undefined> = {}
  let inputDir = ''

  const resolveAlias = (updatedId: string, importer: string) => {
    return customResolver.call(
      {} as any,
      updatedId,
      importer,
      {} as any
    ) as string
  }

  beforeEach(() => {
    envKeys.forEach((key) => {
      prevEnv[key] = process.env[key]
    })
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-resolve-'))
    fs.mkdirSync(path.join(inputDir, 'package-a/pages/index'), {
      recursive: true,
    })
    fs.mkdirSync(path.join(inputDir, 'package-a/utils'), { recursive: true })
    fs.mkdirSync(path.join(inputDir, 'common'), { recursive: true })
    process.env.UNI_INPUT_DIR = inputDir
    setIndependentSubPackages([
      {
        root: 'package-a',
        pages: ['pages/index/index'],
        independent: true,
      },
    ])
    process.env.UNI_PLATFORM = 'mp-weixin'
    process.env.UNI_APP_X = 'true'
  })

  afterEach(() => {
    fs.rmSync(inputDir, { recursive: true, force: true })
    envKeys.forEach((key) => {
      if (prevEnv[key] === undefined) {
        delete process.env[key]
      } else {
        const env = process.env as Record<string, string | undefined>
        env[key] = prevEnv[key]
      }
    })
    setIndependentSubPackages([])
  })

  test('propagates root when alias resolves app pages json', () => {
    const pagesJson = path.join(inputDir, 'pages.json')
    fs.writeFileSync(pagesJson, '{}')

    const resolved = resolveAlias(
      pagesJson,
      withIndependentRoot(
        path.join(inputDir, 'package-a/pages/index/index.vue'),
        'package-a'
      )
    )

    expect(resolved).toBe(
      withIndependentRoot(normalizePath(pagesJson), 'package-a')
    )
  })

  test('propagates root when alias resolves file inside current root', () => {
    const filename = path.join(inputDir, 'package-a/utils/foo.ts')
    fs.writeFileSync(filename, 'export const foo = 1')

    const resolved = resolveAlias(
      filename,
      withIndependentRoot(
        path.join(inputDir, 'package-a/pages/index/index.vue'),
        'package-a'
      )
    )

    expect(resolved).toBe(
      withIndependentRoot(normalizePath(filename), 'package-a')
    )
  })

  test('does not propagate root when alias resolves root-outside project file', () => {
    const filename = path.join(inputDir, 'common/foo.ts')
    fs.writeFileSync(filename, 'export const foo = 1')

    const resolved = resolveAlias(
      filename,
      withIndependentRoot(
        path.join(inputDir, 'package-a/pages/index/index.vue'),
        'package-a'
      )
    )

    expect(withoutIndependentRoot(resolved as string)).toBe(
      normalizePath(filename)
    )
    expect(resolved).toBe(normalizePath(filename))
  })

  test('does not propagate root for css requests', () => {
    const filename = path.join(inputDir, 'package-a/style.css')
    fs.writeFileSync(filename, '.foo {}')

    const resolved = resolveAlias(
      filename,
      withIndependentRoot(
        path.join(inputDir, 'package-a/pages/index/index.vue'),
        'package-a'
      )
    )

    expect(resolved).toBe(normalizePath(filename))
  })

  test('does not propagate root on non mini program platform', () => {
    process.env.UNI_PLATFORM = 'h5'
    const filename = path.join(inputDir, 'package-a/utils/foo.ts')
    fs.writeFileSync(filename, 'export const foo = 1')

    const resolved = resolveAlias(
      filename,
      withIndependentRoot(
        path.join(inputDir, 'package-a/pages/index/index.vue'),
        'package-a'
      )
    )

    expect(resolved).toBe(normalizePath(filename))
  })
})
