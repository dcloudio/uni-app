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
  const envKeys = [
    'UNI_INPUT_DIR',
    'UNI_PLATFORM',
    'UNI_UTS_PLATFORM',
    'UNI_APP_X',
    'UNI_APP_X_DOM2',
  ] as const
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
    process.env.UNI_UTS_PLATFORM = 'mp-weixin'
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

  test('propagates root when alias resolves app pages json', async () => {
    const pagesJson = path.join(inputDir, 'pages.json')
    fs.writeFileSync(pagesJson, '{}')
    const importer = withIndependentRoot(
      path.join(inputDir, 'package-a/pages/index/index.vue'),
      'package-a'
    )
    const resolve = jest.fn(async (id: string) => ({ id: id + '?uts' }))

    const resolved = await customResolver.call(
      { resolve } as any,
      pagesJson,
      importer,
      {} as any
    )

    expect(resolve).toHaveBeenCalledWith(pagesJson, importer, {
      skipSelf: true,
    })
    expect(resolved).toEqual({
      id: withIndependentRoot(normalizePath(pagesJson) + '?uts', 'package-a'),
    })
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

  test('preserves query when aliased json re-enters the plugin chain', async () => {
    const jsonFile = path.join(inputDir, 'data.json')
    fs.writeFileSync(jsonFile, '{}')
    const source = jsonFile + '?raw'
    const importer = path.join(inputDir, 'index.uts')
    const resolve = jest.fn(async (id: string) => ({ id }))

    const resolved = await customResolver.call(
      { resolve } as any,
      source,
      importer,
      {} as any
    )

    expect(resolve).toHaveBeenCalledWith(source, importer, { skipSelf: true })
    expect(resolved).toEqual({ id: normalizePath(source) })
  })

  test('keeps the original json resolution in Android VDOM mode', () => {
    process.env.UNI_PLATFORM = 'app'
    process.env.UNI_UTS_PLATFORM = 'app-android'
    delete process.env.UNI_APP_X_DOM2
    const jsonFile = path.join(inputDir, 'data.json')
    fs.writeFileSync(jsonFile, '{}')
    const resolve = jest.fn()

    const resolved = customResolver.call(
      { resolve } as any,
      jsonFile,
      path.join(inputDir, 'index.uts'),
      {} as any
    )

    expect(resolve).not.toHaveBeenCalled()
    expect(resolved).toBe(normalizePath(jsonFile))
  })
})
