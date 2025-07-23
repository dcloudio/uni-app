// mock
const defineAsyncApiFn = jest.fn(
  (name: string, fn: Function, protocol?: any) => {
    return (args: any = {}) => {
      const res = {
        resolve: jest.fn(),
        reject: jest.fn(),
      }
      fn(args, res)
      return Promise.resolve()
    }
  }
)
// mock getCurrentPage
const loadFontFaceFn = jest.fn()
const mockPage = {
  vm: {
    $fontFamilySet: new Set(),
    $nativePage: {
      loadFontFace: loadFontFaceFn,
    },
  },
}

const getCurrentPageFn = jest.fn(() => mockPage)

// mock @dcloudio/uni-api
jest.mock('@dcloudio/uni-api', () => ({
  API_LOAD_FONT_FACE: 'loadFontFace',
  defineAsyncApi: defineAsyncApiFn,
}))
// mock @dcloudio/uni-core
jest.mock('@dcloudio/uni-core', () => ({
  getCurrentPage: getCurrentPageFn,
}))

import { loadFontFace } from '../../src/x/api/ui/loadFontFace'

const base64Font = 'data:font/ttf;charset=utf-8;base64,AAEAAAAKAIAAAwA'

describe('loadFontFace', () => {
  it('should be defined', () => {
    expect(loadFontFace).toBeDefined()
  })
  it('load base64', () => {
    loadFontFace({
      family: 'UniFontFamily2',
      source: `url(${base64Font})`,
      success() {
        console.log('loadFontFace uni.ttf(base64 format) success')
      },
      fail(error) {
        console.warn('loadFontFace uni.ttf(base64 format) fail', error.errMsg)
      },
    })
    expect(defineAsyncApiFn).toHaveBeenCalledWith(
      'loadFontFace',
      expect.any(Function),
      undefined
    )
    // 调用 arg[1] 函数
    const fn = defineAsyncApiFn.mock.calls[0][1]
    fn({
      family: 'UniFontFamily2',
      source: base64Font,
    })

    expect(loadFontFaceFn).toHaveBeenCalledWith({
      family: 'UniFontFamily2',
      source: base64Font,
      success: expect.any(Function),
      fail: expect.any(Function),
    })
  })
  it('load local font', () => {
    const localPath = '/static/fonts/uni.ttf'
    const fontFamily = 'UniFontFamily3'
    loadFontFace({
      family: fontFamily,
      source: `url(${localPath})`,
      success() {
        console.log('loadFontFace uni.ttf(local file) success')
      },
      fail(error) {
        console.warn('loadFontFace uni.ttf(local file) fail', error.errMsg)
      },
    })
    // 调用 arg[1] 函数，测试 wrap url()
    const fn = defineAsyncApiFn.mock.calls[0][1]
    fn({
      family: fontFamily,
      source: localPath,
    })

    expect(loadFontFaceFn).toHaveBeenCalledWith({
      family: fontFamily,
      source: localPath,
      success: expect.any(Function),
      fail: expect.any(Function),
    })
  })
})
