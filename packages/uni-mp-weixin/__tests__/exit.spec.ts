import { initUni } from '@dcloudio/uni-mp-core'

import * as protocols from '../src/api/protocols'

const testGlobal = global as any

describe('mp-weixin exit', () => {
  const originalGlobal = testGlobal.__GLOBAL__
  const originalPlatform = testGlobal.__PLATFORM__
  const originalX = global.__X__

  afterEach(() => {
    testGlobal.__GLOBAL__ = originalGlobal
    testGlobal.__PLATFORM__ = originalPlatform
    global.__X__ = originalX
  })

  function createUniApi(exitMiniProgram: jest.Mock) {
    const platform = { exitMiniProgram }
    testGlobal.__GLOBAL__ = platform
    testGlobal.__PLATFORM__ = 'mp-weixin'
    global.__X__ = true
    return initUni({}, protocols, platform)
  }

  test('映射到 wx.exitMiniProgram 并透传回调', () => {
    const result = { errMsg: 'exitMiniProgram:ok' }
    const exitMiniProgram = jest.fn((options) => {
      options.success(result)
      options.complete(result)
    })
    const uniApi = createUniApi(exitMiniProgram)
    const success = jest.fn()
    const complete = jest.fn()

    uniApi.exit({ success, complete })

    expect(exitMiniProgram).toHaveBeenCalledWith({
      success: expect.any(Function),
      complete: expect.any(Function),
    })
    expect(success).toHaveBeenCalledWith(result)
    expect(complete).toHaveBeenCalledWith(result)
  })
})
