const mockRoots = new Map<string, Record<string, any>>()
const mockMount = jest.fn()
const mockOnPageUnload = jest.fn()
const mockOnHidePopup = jest.fn()
const mockGetCurrentPageId = jest.fn(() => 1)

jest.mock('@dcloudio/uni-platform', () => ({
  getRealPath: (path: string) => path,
}))

jest.mock('@dcloudio/uni-api', () => ({
  ...jest.requireActual('../../uni-api/src/helpers/api'),
  ...jest.requireActual('../../uni-api/src/protocols/ui/showToast'),
  ...jest.requireActual('../../uni-api/src/protocols/ui/hideToast'),
  ...jest.requireActual('../../uni-api/src/protocols/ui/showLoading'),
  API_HIDE_LOADING: 'hideLoading',
}))

jest.mock('@dcloudio/uni-core', () => ({
  getCurrentPageId: () => mockGetCurrentPageId(),
  useI18n: () => ({ t: (key: string) => key }),
}))

jest.mock('../src/framework/setup/page', () => ({
  onPageUnload: (callback: Function) => mockOnPageUnload(callback),
}))

jest.mock('../src/service/api/ui/popup/toast', () => ({}))

jest.mock('../src/service/api/ui/popup/utils', () => ({
  createRootApp: (_component: unknown, state: Record<string, any>) => ({
    mount: (id: string) => {
      mockMount(id)
      mockRoots.set(id, state)
    },
  }),
  ensureRoot: (id: string) => id,
}))

describe('web toast controllers', () => {
  let api: typeof import('../src/service/api/ui/popup/showToast')
  let nextTick: typeof import('vue').nextTick
  let bridge: typeof UniServiceJSBridge

  async function flush(ms = 10) {
    await nextTick()
    jest.advanceTimersByTime(ms)
    await nextTick()
  }

  beforeEach(async () => {
    jest.resetModules()
    jest.useFakeTimers()
    mockRoots.clear()
    jest.clearAllMocks()
    mockGetCurrentPageId.mockReturnValue(1)
    bridge = UniServiceJSBridge
    ;(global as any).UniServiceJSBridge = { on: mockOnHidePopup }
    nextTick = (await import('vue')).nextTick
    api = await import('../src/service/api/ui/popup/showToast')
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
    ;(global as any).UniServiceJSBridge = bridge
  })

  test('reuses one application toast across positions and restarts duration', async () => {
    api.showToast({ title: 'first', position: 'top', duration: 100 })
    await flush()
    const state = mockRoots.get('u-a-at')!
    await flush(50)
    api.showToast({ title: 'second', position: 'bottom', duration: 200 })
    await flush(100)

    expect(mockMount).toHaveBeenCalledTimes(1)
    expect(state).toMatchObject({
      title: 'second',
      position: 'bottom',
      visible: true,
    })
    await flush(110)
    expect(state.visible).toBe(false)
  })

  test('keeps page and application toasts visible with independent timers', async () => {
    api.showToast({ title: 'app', position: 'top', duration: 200 })
    api.showToast({ title: 'page', icon: 'none', duration: 100 })
    await flush()

    expect(mockMount).toHaveBeenCalledTimes(2)
    expect(mockRoots.get('u-a-at')).toMatchObject({
      title: 'app',
      visible: true,
    })
    expect(mockRoots.get('u-a-t')).toMatchObject({
      title: 'page',
      visible: true,
    })
    await flush(110)
    expect(mockRoots.get('u-a-t')!.visible).toBe(false)
    expect(mockRoots.get('u-a-at')!.visible).toBe(true)
  })

  test('hides only the page toast by default and both with allType', async () => {
    api.showToast({ title: 'app', position: 'center' })
    api.showToast({ title: 'page' })
    await flush()
    const success = jest.fn()
    const complete = jest.fn()
    api.hideToast({ success, complete })
    await flush()

    expect(mockRoots.get('u-a-t')!.visible).toBe(false)
    expect(mockRoots.get('u-a-at')!.visible).toBe(true)
    expect(success).toHaveBeenCalledTimes(1)
    expect(complete).toHaveBeenCalledTimes(1)
    api.hideToast({ allType: true })
    await flush()
    expect(mockRoots.get('u-a-at')!.visible).toBe(false)
  })

  test('closes only the toast owned by the unloaded page', async () => {
    api.showToast({ title: 'app', position: 'top' })
    api.showToast({ title: 'page' })
    await flush()
    const unload = mockOnPageUnload.mock.calls[0][0]
    unload(2)
    await flush()
    expect(mockRoots.get('u-a-t')!.visible).toBe(true)
    unload(1)
    await flush()
    expect(mockRoots.get('u-a-t')!.visible).toBe(false)
    expect(mockRoots.get('u-a-at')!.visible).toBe(true)
  })

  test('pending hide does not close a replacement application toast', async () => {
    api.showToast({ title: 'first', position: 'top' })
    await flush()
    api.hideToast({ allType: true })
    api.showToast({ title: 'second', position: 'bottom' })
    await flush()
    expect(mockRoots.get('u-a-at')).toMatchObject({
      title: 'second',
      visible: true,
    })
  })

  test('hiding before the show timer prevents an application toast appearing', async () => {
    api.showToast({ title: 'app', position: 'bottom' })
    api.hideToast({ allType: true })
    await flush()
    expect(mockRoots.get('u-a-at')!.visible).toBe(false)
  })

  test('page popup cleanup does not hide the application toast', async () => {
    api.showToast({ title: 'app', position: 'bottom' })
    api.showToast({ title: 'page' })
    await flush()
    mockOnHidePopup.mock.calls[0][1]()
    await flush()
    expect(mockRoots.get('u-a-t')!.visible).toBe(false)
    expect(mockRoots.get('u-a-at')!.visible).toBe(true)
  })

  test('consecutive calls before mounting keep only the last application toast', async () => {
    api.showToast({ title: 'first', position: 'top', duration: 50 })
    api.showToast({ title: 'second', position: 'center', duration: 100 })
    api.showToast({ title: 'last', position: 'bottom', duration: 200 })
    await flush()
    expect(mockMount).toHaveBeenCalledTimes(1)
    expect(mockRoots.get('u-a-at')).toMatchObject({
      title: 'last',
      position: 'bottom',
      visible: true,
    })
    await flush(110)
    expect(mockRoots.get('u-a-at')!.visible).toBe(true)
    await flush(100)
    expect(mockRoots.get('u-a-at')!.visible).toBe(false)
  })

  test('same-duration replacement restarts the timer', async () => {
    api.showToast({ title: 'first', position: 'top', duration: 100 })
    await flush()
    await flush(50)
    api.showToast({ title: 'second', position: 'top', duration: 100 })
    await flush(60)
    expect(mockRoots.get('u-a-at')).toMatchObject({
      title: 'second',
      visible: true,
    })
    await flush(50)
    expect(mockRoots.get('u-a-at')!.visible).toBe(false)
  })

  test('unloading an old page does not close its replacement toast', async () => {
    api.showToast({ title: 'old page' })
    await flush()
    mockGetCurrentPageId.mockReturnValue(2)
    api.showToast({ title: 'new page' })
    mockOnPageUnload.mock.calls[0][0](1)
    await flush()
    expect(mockRoots.get('u-a-t')).toMatchObject({
      title: 'new page',
      visible: true,
    })
    mockOnPageUnload.mock.calls[0][0](2)
    await flush()
    expect(mockRoots.get('u-a-t')!.visible).toBe(false)
  })

  test('loading stays visible until hideLoading and leaves application toast alone', async () => {
    api.showToast({ title: 'app', position: 'bottom', duration: 10000 })
    api.showToast({ title: 'page', duration: 100 })
    await flush()
    api.showLoading({ title: 'loading' })
    await flush(200)
    expect(mockRoots.get('u-a-t')).toMatchObject({
      title: 'loading',
      icon: 'loading',
      visible: true,
    })
    api.hideLoading(undefined)
    await flush()
    expect(mockRoots.get('u-a-t')!.visible).toBe(false)
    expect(mockRoots.get('u-a-at')!.visible).toBe(true)
  })

  test.each([
    [undefined, 'u-a-t', undefined],
    ['top', 'u-a-at', 'top'],
    ['center', 'u-a-at', 'center'],
    ['bottom', 'u-a-at', 'bottom'],
    ['', 'u-a-at', 'center'],
    [null, 'u-a-at', 'center'],
    ['invalid', 'u-a-at', 'center'],
  ])('handles position %s in web only', async (position, root, expected) => {
    api.showToast({ title: 'toast', position } as UniApp.ShowToastOptions)
    await flush()
    expect(mockRoots.get(root!)).toMatchObject({
      position: expected,
      visible: true,
    })
    expect(mockMount).toHaveBeenCalledTimes(1)
  })

  test('unloading a page before its toast appears cancels the pending show', async () => {
    api.showToast({ title: 'page' })
    mockOnPageUnload.mock.calls[0][0](1)
    await flush()
    expect(mockRoots.get('u-a-t')!.visible).toBe(false)
  })

  test('a toast shown from the hide callback survives the pending hide', async () => {
    api.showToast({ title: 'first', position: 'top' })
    await flush()
    api.hideToast({
      allType: true,
      success: () => {
        api.showToast({ title: 'replacement', position: 'bottom' })
      },
    })
    await flush()
    expect(mockRoots.get('u-a-at')).toMatchObject({
      title: 'replacement',
      visible: true,
    })
  })

  test('allType hides application toast without hiding a loading indicator', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      api.showLoading({ title: 'loading' })
      api.showToast({ title: 'app', position: 'top' })
      await flush()
      api.hideToast({ allType: true })
      await flush()
      expect(mockRoots.get('u-a-t')!.visible).toBe(true)
      expect(mockRoots.get('u-a-at')!.visible).toBe(false)
      expect(warn).toHaveBeenCalledTimes(1)
    } finally {
      warn.mockRestore()
    }
  })

  test('switching from loading to toast restores automatic dismissal', async () => {
    api.showLoading({ title: 'loading' })
    await flush()
    api.showToast({ title: 'page', icon: 'none', duration: 100 })
    await flush()
    expect(mockRoots.get('u-a-t')).toMatchObject({
      title: 'page',
      icon: 'none',
      visible: true,
    })
    await flush(100)
    expect(mockRoots.get('u-a-t')!.visible).toBe(false)
  })

  test('replacement after automatic timeout survives the delayed hide', async () => {
    api.showToast({ title: 'first', position: 'top', duration: 100 })
    await flush()
    await flush(100)
    api.showToast({ title: 'replacement', position: 'center', duration: 100 })
    await flush()
    expect(mockRoots.get('u-a-at')).toMatchObject({
      title: 'replacement',
      visible: true,
    })
    await flush(100)
    expect(mockRoots.get('u-a-at')!.visible).toBe(false)
  })
})
