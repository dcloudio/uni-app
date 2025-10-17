describe('getBrowserInfo', () => {
  beforeEach(() => {
    jest.resetModules()

    // 提前 mock window 用到的字段
    Object.defineProperty(global, 'window', {
      value: {
        screen: {
          orientation: { angle: 0 },
        },
        orientation: 0,
        matchMedia: () => ({ matches: false }),
      },
      configurable: true,
      writable: true,
    })

    Object.defineProperty(global, '__uniConfig', {
      value: { darkmode: false },
      configurable: true,
      writable: true,
    })
  })

  it('should return the correct browser info for ios 26.0', async () => {
    // ios26.0
    const mockUA =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1'

    // mock UA
    const userAgentSpy = jest
      .spyOn(navigator, 'userAgent', 'get')
      .mockReturnValue(mockUA)

    const { getBrowserInfo } = await import(
      '../src/service/api/base/getBrowserInfo'
    )

    const browserInfo = getBrowserInfo()

    expect(browserInfo.osname).toBe('iOS')
    expect(browserInfo.osversion).toBe('26.0')
    expect(browserInfo.platform).toBe('ios')

    userAgentSpy.mockRestore()
  })

  it('should return the correct browser info for Android emulator', async () => {
    // android 模拟器
    const mockUA =
      'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36'

    // mock UA
    const userAgentSpy = jest
      .spyOn(navigator, 'userAgent', 'get')
      .mockReturnValue(mockUA)

    const { getBrowserInfo } = await import(
      '../src/service/api/base/getBrowserInfo'
    )

    const browserInfo = getBrowserInfo()

    expect(browserInfo.osname).toBe('Android')
    expect(browserInfo.osversion).toBe('10')
    expect(browserInfo.platform).toBe('android')

    userAgentSpy.mockRestore()
  })

  it('should return the correct browser info for Harmony', async () => {
    // harmony 模拟器
    const mockUA =
      'Mozilla/5.0 (Phone; OpenHarmony 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36  ArkWeb/5.1.0.207 Mobile HuaweiBrowser/5.1.6.311'

    // mock UA
    const userAgentSpy = jest
      .spyOn(navigator, 'userAgent', 'get')
      .mockReturnValue(mockUA)

    const { getBrowserInfo } = await import(
      '../src/service/api/base/getBrowserInfo'
    )

    const browserInfo = getBrowserInfo()

    expect(browserInfo.osname).toBe('Harmony')
    expect(browserInfo.osversion).toBe('5.1')
    expect(browserInfo.platform).toBe('harmony')

    userAgentSpy.mockRestore()
  })
})
