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
            },
          },
        ],
        globalStyle: {
          enableBackToTop: true,
          bounces: true,
          androidOverscroll: true,
          androidRefresherColor: '#007aff',
          backgroundColor: '#f8f8f8',
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
    })
  })
})
