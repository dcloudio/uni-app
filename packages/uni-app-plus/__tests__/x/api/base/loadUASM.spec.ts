import { loadUASM } from '../../../../src/x/api/base/uasm'

describe('loadUASM', () => {
  const loadUASMMock = jest.fn()

  beforeAll(() => {
    Object.defineProperty(globalThis, '__uniLoadUASM', {
      configurable: true,
      value: loadUASMMock,
    })
  })

  afterAll(() => {
    delete (globalThis as any).__uniLoadUASM
  })

  beforeEach(() => {
    loadUASMMock.mockReset()
  })

  test('将同步返回值封装为 Promise', async () => {
    const module = { add: (a: number, b: number) => a + b }
    loadUASMMock.mockReturnValue(module)

    const result = loadUASM<typeof module>('@/uni_modules/test-uasm')

    expect(result).toBeInstanceOf(Promise)
    await expect(result).resolves.toBe(module)
    expect(loadUASMMock).toHaveBeenCalledWith('@/uni_modules/test-uasm')
  })

  test('将同步异常转换为 Promise rejection', async () => {
    const error = new Error('load failed')
    loadUASMMock.mockImplementation(() => {
      throw error
    })

    await expect(loadUASM('@/uni_modules/test-uasm')).rejects.toBe(error)
  })
})
