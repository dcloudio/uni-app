import fs from 'fs'
import os from 'os'
import path from 'path'
import {
  applyPageSelectorBackgroundColors,
  collectPageSelectorBackgroundColor,
  resetPageSelectorBackgroundColors,
  restoreCachedPageSelectorBackgroundColor,
} from '../../src/plugins/dom2/pageBackground'

describe('dom2 page selector background colors', () => {
  const originalInputDir = process.env.UNI_INPUT_DIR
  const originalExtApiPagePaths = process.env.UNI_COMPILE_EXT_API_PAGE_PATHS
  let inputDir: string

  beforeEach(() => {
    inputDir = fs.mkdtempSync(
      path.join(os.tmpdir(), 'uni-dom2-page-background-')
    )
    process.env.UNI_INPUT_DIR = inputDir
    // 让测试不依赖 pages.json 插件维护的 pagesCacheSet。
    process.env.UNI_COMPILE_EXT_API_PAGE_PATHS = JSON.stringify([
      'pages/index/index',
      'pages/about/about',
    ])
    resetPageSelectorBackgroundColors()
  })

  afterEach(() => {
    fs.rmSync(inputDir, { recursive: true, force: true })
    if (originalInputDir === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_INPUT_DIR')
    } else {
      process.env.UNI_INPUT_DIR = originalInputDir
    }
    if (originalExtApiPagePaths === undefined) {
      Reflect.deleteProperty(process.env, 'UNI_COMPILE_EXT_API_PAGE_PATHS')
    } else {
      process.env.UNI_COMPILE_EXT_API_PAGE_PATHS = originalExtApiPagePaths
    }
  })

  test('aggregates global and page values into the sparse config shape', () => {
    const pageFilename = path.join(inputDir, 'pages/index/index.vue')

    collectPageSelectorBackgroundColor('App.uvue', {
      light: '#ffffff',
      dark: '#000000',
    })
    collectPageSelectorBackgroundColor(pageFilename, { light: '#f8f8f8' })

    const pagesJson = {
      pages: [{ path: 'pages/index/index' }, { path: 'pages/about/about' }],
    } as UniApp.PagesJson
    applyPageSelectorBackgroundColors(pagesJson)

    expect((pagesJson as any).pageSelectorBackgroundColor).toEqual({
      global: { light: '#ffffff', dark: '#000000' },
      pages: {
        'pages/index/index': { light: '#f8f8f8' },
      },
    })
  })

  test('restores metadata when a CSS chunk is served from cache', () => {
    const pageFilename = path.join(inputDir, 'pages/about/about.vue')
    const pagesJson = {
      pages: [{ path: 'pages/about/about' }],
    } as UniApp.PagesJson

    collectPageSelectorBackgroundColor(pageFilename, {
      dark: '#101010',
    })
    resetPageSelectorBackgroundColors()
    restoreCachedPageSelectorBackgroundColor(pageFilename)
    applyPageSelectorBackgroundColors(pagesJson)

    expect((pagesJson as any).pageSelectorBackgroundColor).toEqual({
      pages: {
        'pages/about/about': { dark: '#101010' },
      },
    })
  })

  test('removes stale metadata when a changed chunk has no page background', () => {
    const pageFilename = path.join(inputDir, 'pages/index/index.vue')
    const pagesJson = {
      pages: [{ path: 'pages/index/index' }],
    } as UniApp.PagesJson

    collectPageSelectorBackgroundColor(pageFilename, { light: '#ffffff' })
    applyPageSelectorBackgroundColors(pagesJson)
    expect(pagesJson).toHaveProperty('pageSelectorBackgroundColor')

    resetPageSelectorBackgroundColors()
    collectPageSelectorBackgroundColor(pageFilename, undefined)
    applyPageSelectorBackgroundColors(pagesJson)

    expect(pagesJson).not.toHaveProperty('pageSelectorBackgroundColor')
  })

  test('keeps page and App chunks isolated', () => {
    const pageFilename = path.join(inputDir, 'pages/index/index.vue')

    collectPageSelectorBackgroundColor('App.vue', { light: '#ffffff' })
    collectPageSelectorBackgroundColor(pageFilename, { dark: '#000000' })

    const pagesJson = {
      pages: [{ path: 'pages/index/index' }],
    } as UniApp.PagesJson
    applyPageSelectorBackgroundColors(pagesJson)

    expect((pagesJson as any).pageSelectorBackgroundColor).toEqual({
      global: { light: '#ffffff' },
      pages: {
        'pages/index/index': { dark: '#000000' },
      },
    })
  })
})
