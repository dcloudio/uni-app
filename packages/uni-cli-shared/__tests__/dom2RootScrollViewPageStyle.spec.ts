import os from 'os'
import path from 'path'
import fs from 'fs'
import { normalizeUniAppXAppPagesJson, parseUniXPageOptions } from '../src'

describe('dom2 root scroll-view page style', () => {
  const originalInputDir = process.env.UNI_INPUT_DIR
  let inputDir: string

  beforeEach(() => {
    inputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uni-dom2-page-style-'))
    fs.mkdirSync(path.join(inputDir, 'pages/index'), { recursive: true })
    fs.writeFileSync(path.join(inputDir, 'pages/index/index.uvue'), '')
    process.env.UNI_INPUT_DIR = inputDir
  })

  afterEach(() => {
    fs.rmSync(inputDir, { recursive: true, force: true })
    if (originalInputDir === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_INPUT_DIR')
    } else {
      process.env.UNI_INPUT_DIR = originalInputDir
    }
  })

  test('passes root scroll-view properties from pages.json', () => {
    normalizeUniAppXAppPagesJson(
      JSON.stringify({
        pages: [
          {
            path: 'pages/index/index',
            style: {
              enableBackToTop: false,
              bounces: false,
              androidOverscroll: false,
              androidRefresherColor: '',
              backgroundColor: '',
              backgroundTextStyle: 'dark',
            },
          },
        ],
        globalStyle: {},
      })
    )

    expect(
      parseUniXPageOptions(path.join(inputDir, 'pages/index/index.uvue'))
    ).toMatchObject({
      enableBackToTop: false,
      bounces: false,
      androidOverscroll: false,
      androidRefresherColor: '',
      backgroundColor: '',
      backgroundTextStyle: 'dark',
    })
  })

  test('inherits global style with page style taking precedence', () => {
    normalizeUniAppXAppPagesJson(
      JSON.stringify({
        pages: [
          {
            path: 'pages/index/index',
            style: {
              bounces: false,
              backgroundColor: '#ffffff',
              backgroundTextStyle: 'light',
            },
          },
        ],
        globalStyle: {
          enableBackToTop: true,
          bounces: true,
          androidOverscroll: true,
          androidRefresherColor: '#007aff',
          backgroundColor: '#f8f8f8',
          backgroundTextStyle: 'dark',
        },
      })
    )

    expect(
      parseUniXPageOptions(path.join(inputDir, 'pages/index/index.uvue'))
    ).toMatchObject({
      enableBackToTop: true,
      bounces: false,
      androidOverscroll: true,
      androidRefresherColor: '#007aff',
      backgroundColor: '#ffffff',
      backgroundTextStyle: 'light',
    })
  })

  test('ignores theme references used as root scroll-view colors', () => {
    normalizeUniAppXAppPagesJson(
      JSON.stringify({
        pages: [
          {
            path: 'pages/index/index',
            style: {},
          },
        ],
        globalStyle: {
          androidRefresherColor: '@refresherColor',
          backgroundColor: '@backgroundColor',
        },
      })
    )

    const globalThemeOptions = parseUniXPageOptions(
      path.join(inputDir, 'pages/index/index.uvue')
    )
    expect(globalThemeOptions?.androidRefresherColor).toBeUndefined()
    expect(globalThemeOptions?.backgroundColor).toBeUndefined()

    normalizeUniAppXAppPagesJson(
      JSON.stringify({
        pages: [
          {
            path: 'pages/index/index',
            style: {
              androidRefresherColor: '@pageRefresherColor',
              backgroundColor: '@pageBackgroundColor',
            },
          },
        ],
        globalStyle: {
          androidRefresherColor: '#007aff',
          backgroundColor: '#f8f8f8',
        },
      })
    )

    const pageThemeOptions = parseUniXPageOptions(
      path.join(inputDir, 'pages/index/index.uvue')
    )
    expect(pageThemeOptions?.androidRefresherColor).toBeUndefined()
    expect(pageThemeOptions?.backgroundColor).toBeUndefined()
  })
})
