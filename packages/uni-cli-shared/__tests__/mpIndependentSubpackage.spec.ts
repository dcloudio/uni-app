import fs from 'fs'
import os from 'os'
import path from 'path'
import { parseIndependentSubPackages } from '../src/json/mp/subpackage'

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

describe('parseIndependentSubPackages', () => {
  const originalPlatform = process.env.UNI_PLATFORM

  afterEach(() => {
    if (originalPlatform === undefined) {
      delete (process.env as Record<string, string | undefined>).UNI_PLATFORM
    } else {
      process.env.UNI_PLATFORM = originalPlatform
    }
  })

  test('returns independent subPackages on mp-weixin', () => {
    process.env.UNI_PLATFORM = 'mp-weixin'
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
      (inputDir) => {
        expect(parseIndependentSubPackages(inputDir)).toEqual([
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
      (inputDir) => {
        expect(parseIndependentSubPackages(inputDir)).toEqual([
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
      (inputDir) => {
        expect(parseIndependentSubPackages(inputDir)).toEqual([])
      }
    )
  })

  test('returns empty array on other platforms', () => {
    process.env.UNI_PLATFORM = 'mp-alipay'
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
        expect(parseIndependentSubPackages(inputDir)).toEqual([])
      }
    )
  })
})
