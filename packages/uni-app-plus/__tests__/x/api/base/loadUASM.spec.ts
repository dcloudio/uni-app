import { loadUASM } from '../../../../src/x/api/base/uasm'

const loadUASMMock = jest.fn()

jest.mock('../../../../src/x/framework/app/app', () => ({
  getNativeApp: () => ({
    loadUASM: loadUASMMock,
  }),
}))

describe('loadUASM', () => {
  beforeEach(() => {
    loadUASMMock.mockReset()
  })

  test('通过 native app 加载 UASM', async () => {
    const module = { add: (a: number, b: number) => a + b }
    loadUASMMock.mockReturnValue(module)
    const modulePath =
      'uni_modules/test-uasm/uasm/app-android/libs/arm64-v8a/libtest-uasm.so'

    const result = loadUASM<typeof module>(modulePath)

    expect(result).toBeInstanceOf(Promise)
    await expect(result).resolves.toBe(module)
    expect(loadUASMMock).toHaveBeenCalledWith(modulePath)
  })

  test('将同步返回值封装为 Promise', async () => {
    const module = { add: (a: number, b: number) => a + b }
    loadUASMMock.mockReturnValue(module)

    const result = loadUASM<typeof module>('libtest-uasm.so')

    expect(result).toBeInstanceOf(Promise)
    await expect(result).resolves.toBe(module)
  })

  test('将同步异常转换为 Promise rejection', async () => {
    const error = new Error('load failed')
    loadUASMMock.mockImplementation(() => {
      throw error
    })

    await expect(loadUASM('libtest-uasm.so')).rejects.toBe(error)
  })
})
