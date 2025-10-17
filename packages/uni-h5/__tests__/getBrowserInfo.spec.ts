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

  it('should return the correct browser info', async () => {
    const mockUA = `Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1`

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
})
