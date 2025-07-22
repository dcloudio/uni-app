// mock
const defineAsyncApiFn = jest.fn(
  (name: string, fn: Function, protocol?: any) => {
    // 返回一个函数，这个函数会调用传入的 fn 函数
    return (args: any = {}) => {
      // 创建 resolve 和 reject 函数
      const res = {
        resolve: jest.fn(),
        reject: jest.fn(),
      }

      // 调用传入的函数
      fn(args, res)

      // 返回一个 Promise 对象
      return Promise.resolve()
    }
  }
)
// mock getCurrentPage
const mockPage = {
  vm: {
    $fontFamilySet: new Set(),
    $nativePage: {
      loadFontFace: jest.fn(),
    },
  },
}

const getCurrentPageFn = jest.fn(() => mockPage)

// mock getNativeApp
// const mockApp = {
//   loadFontFace: jest.fn(),
// }

// const getNativeAppFn = jest.fn(() => mockApp)

// mock @dcloudio/uni-api
jest.mock('@dcloudio/uni-api', () => ({
  API_LOAD_FONT_FACE: 'loadFontFace',
  defineAsyncApi: defineAsyncApiFn,
}))
// mock @dcloudio/uni-core
jest.mock('@dcloudio/uni-core', () => ({
  getCurrentPage: getCurrentPageFn,
}))

// mock ../../framework/app/app
// jest.mock('../../framework/app/app', () => ({
//   getNativeApp: getNativeAppFn,
// }))
import { loadFontFace } from '../../src/x/api/ui/loadFontFace'

const base64Font = 'data:font/ttf;charset=utf-8;base64,AAEAAAAKAIAAAwA'

describe('loadFontFace', () => {
  it('should be defined', () => {
    expect(loadFontFace).toBeDefined()
  })
  it('should call defineAsyncApi', () => {
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
    expect(mockPage.vm.$nativePage.loadFontFace).toHaveBeenCalledWith({
      family: 'UniFontFamily2',
      source: base64Font,
      success: expect.any(Function),
      fail: expect.any(Function),
    })
  })
})
