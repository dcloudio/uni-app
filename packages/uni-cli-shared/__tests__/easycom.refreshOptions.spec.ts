import os from 'os'
import path from 'path'
import fs from 'fs-extra'
import { initEasycoms, matchEasycom } from '../src/easycom'
import { normalizePath } from '../src/utils'

describe('easycom refresh options', () => {
  const originalDom2 = process.env.UNI_APP_X_DOM2
  const originalCompileTarget = process.env.UNI_COMPILE_TARGET
  let inputDir = ''

  beforeEach(() => {
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'easycom-options-'))
    fs.outputFileSync(
      path.join(inputDir, 'components/foo-a/foo-a.uvue'),
      '<template><view /></template>'
    )
    fs.outputFileSync(
      path.join(inputDir, 'components/foo-b/foo-b.uvue'),
      '<template><view /></template>'
    )
    fs.outputJsonSync(path.join(inputDir, 'pages.json'), {
      pages: [
        {
          path: 'pages/index/index',
        },
      ],
      easycom: {
        autoscan: false,
        custom: {
          '^foo$': '@/components/foo-a/foo-a.uvue',
        },
      },
    })
    fs.outputFileSync(
      path.join(inputDir, 'pages/index/index.uvue'),
      '<template><view /></template>'
    )
  })

  afterEach(() => {
    process.env.UNI_APP_X_DOM2 = originalDom2
    process.env.UNI_COMPILE_TARGET = originalCompileTarget
    if (inputDir) {
      fs.removeSync(inputDir)
    }
  })

  test('dom2 refresh uses latest easycom options', () => {
    process.env.UNI_APP_X_DOM2 = 'true'
    delete process.env.UNI_COMPILE_TARGET

    const ctx = initEasycoms(inputDir, {
      platform: 'app',
      dirs: [],
      isX: true,
    })

    expect(matchEasycom('foo')).toBe(
      normalizePath(path.join(inputDir, 'components/foo-a/foo-a.uvue'))
    )

    fs.outputJsonSync(path.join(inputDir, 'pages.json'), {
      pages: [
        {
          path: 'pages/index/index',
        },
      ],
      easycom: {
        autoscan: false,
        custom: {
          '^foo$': '@/components/foo-b/foo-b.uvue',
        },
      },
    })

    ctx.refresh()

    expect(matchEasycom('foo')).toBe(
      normalizePath(path.join(inputDir, 'components/foo-b/foo-b.uvue'))
    )
  })
})
