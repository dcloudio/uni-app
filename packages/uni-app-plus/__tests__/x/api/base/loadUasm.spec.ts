import { loadUasm, loadUasmSync } from '../../../../src/x/api/base/uasm'

const loadUasmMock = jest.fn()

jest.mock('../../../../src/x/framework/app/app', () => ({
  getNativeApp: () => ({
    loadUasm: loadUasmMock,
  }),
}))

describe('loadUasm', () => {
  beforeEach(() => {
    loadUasmMock.mockReset()
  })

  test('通过 native app 加载 UASM', async () => {
    const module = { add: (a: number, b: number) => a + b }
    loadUasmMock.mockReturnValue(module)
    const modulePath =
      'uni_modules/test-uasm/uasm/app-android/libs/arm64-v8a/libuasmTestUasm.so'

    const result = loadUasm<typeof module>(modulePath)

    expect(result).toBeInstanceOf(Promise)
    await expect(result).resolves.toBe(module)
    expect(loadUasmMock).toHaveBeenCalledWith(modulePath)
  })

  test('将同步返回值封装为 Promise', async () => {
    const module = { add: (a: number, b: number) => a + b }
    loadUasmMock.mockReturnValue(module)

    const result = loadUasm<typeof module>('libuasmTestUasm.so')

    expect(result).toBeInstanceOf(Promise)
    await expect(result).resolves.toBe(module)
  })

  test('将同步异常转换为 Promise rejection', async () => {
    const error = new Error('load failed')
    loadUasmMock.mockImplementation(() => {
      throw error
    })

    await expect(loadUasm('libuasmTestUasm.so')).rejects.toBe(error)
  })

  test('异步加载无结果时 Promise rejection', async () => {
    loadUasmMock.mockReturnValue(null)

    await expect(loadUasm('libuasmTestUasm.so')).rejects.toThrow(
      'uni.loadUasm[libuasmTestUasm.so] 加载失败'
    )
  })

  test('同步返回 native app 加载结果', () => {
    const module = { add: (a: number, b: number) => a + b }
    loadUasmMock.mockReturnValue(module)

    expect(loadUasmSync<typeof module>('libuasmTestUasm.so')).toBe(module)
    expect(loadUasmMock).toHaveBeenCalledWith('libuasmTestUasm.so')
  })

  test('同步加载无结果时返回 null', () => {
    loadUasmMock.mockReturnValue(null)

    expect(loadUasmSync('libuasmTestUasm.so')).toBeNull()
  })

  test('同步抛出 native app 加载异常', () => {
    const error = new Error('load failed')
    loadUasmMock.mockImplementation(() => {
      throw error
    })

    expect(() => loadUasmSync('libuasmTestUasm.so')).toThrow(error)
  })
})
