import fs from 'fs'
import os from 'os'
import path from 'path'
import { parseMiniProgramPagesJson } from '../src/json/mp/pages'
import { parseIndependentSubPackages } from '../src/json/mp/subpackage'

function withPagesJson(
  pagesJson: unknown,
  test: (inputDir: string, pagesJson: UniApp.PagesJson) => void
) {
  const inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-independent-'))
  fs.writeFileSync(
    path.join(inputDir, 'pages.json'),
    JSON.stringify(pagesJson, null, 2)
  )
  try {
    test(inputDir, pagesJson as UniApp.PagesJson)
  } finally {
    fs.rmSync(inputDir, { recursive: true, force: true })
  }
}

describe('parseIndependentSubPackages', () => {
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

  test('returns independent subPackages', () => {
    withPagesJson(
      {
        subPackages: [
          {
            root: '/package-a/',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
          {
            root: 'package-b',
            independent: false,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      (_inputDir, pagesJson) => {
        expect(parseIndependentSubPackages(pagesJson)).toEqual([
          {
            root: 'package-a',
            pages: ['pages/index/index'],
            independent: true,
          },
        ])
      }
    )
  })

  test('supports lowercase subpackages', () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    withPagesJson(
      {
        subpackages: [
          {
            root: 'package-a',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
        ],
      },
      (_inputDir, pagesJson) => {
        expect(parseIndependentSubPackages(pagesJson)).toEqual([
          {
            root: 'package-a',
            pages: ['pages/index/index'],
            independent: true,
          },
        ])
      }
    )
  })

  test('filters invalid independent subpackages', () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    withPagesJson(
      {
        subPackages: [
          {
            root: '',
            independent: true,
            pages: [{ path: 'pages/index/index' }],
          },
          { root: 'package-a', independent: true, pages: [] },
          { root: 'package-b', independent: true, pages: [{ path: '' }] },
        ],
      },
      (_inputDir, pagesJson) => {
        expect(parseIndependentSubPackages(pagesJson)).toEqual([])
      }
    )
  })

  test('supports appJson style page strings', () => {
    expect(
      parseIndependentSubPackages({
        subPackages: [
          {
            root: 'package-a',
            independent: true,
            pages: ['pages/index/index'],
          },
        ],
      } as unknown as UniApp.PagesJson)
    ).toEqual([
      {
        root: 'package-a',
        pages: ['pages/index/index'],
        independent: true,
      },
    ])
  })

  test('keeps independent field in app json subPackages', () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
    withPagesJson(
      {
        pages: [{ path: 'pages/index/index' }],
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
        fs.writeFileSync(path.join(inputDir, 'manifest.json'), '{}')
        const { appJson } = parseMiniProgramPagesJson(
          fs.readFileSync(path.join(inputDir, 'pages.json'), 'utf8'),
          'mp-weixin',
          { subpackages: true, independentSubpackages: true }
        )
        expect(appJson.subPackages).toEqual([
          {
            root: 'package-a',
            pages: ['pages/index/index'],
            independent: true,
          },
        ])
      }
    )
  })

  test('removes independent field when app json does not support independent subpackages', () => {
    withPagesJson(
      {
        pages: [{ path: 'pages/index/index' }],
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
        fs.writeFileSync(path.join(inputDir, 'manifest.json'), '{}')
        const { appJson } = parseMiniProgramPagesJson(
          fs.readFileSync(path.join(inputDir, 'pages.json'), 'utf8'),
          'mp-alipay',
          { subpackages: true }
        )
        expect(appJson.subPackages).toEqual([
          {
            root: 'package-a',
            pages: ['pages/index/index'],
          },
        ])
      }
    )
  })
})
