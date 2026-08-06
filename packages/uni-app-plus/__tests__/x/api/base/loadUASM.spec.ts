import { loadUASM } from '../../../../src/x/api/base/uasm'

const convert2AbsFullPathMock = jest.fn((modulePath: string) => {
  return `/absolute/${modulePath}`
})

jest.mock('../../../../src/x/framework/app/app', () => ({
  getNativeApp: () => ({
    convert2AbsFullPath: convert2AbsFullPathMock,
  }),
}))

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
    convert2AbsFullPathMock.mockClear()
  })

  test('开发阶段将资源路径转换为绝对路径', async () => {
    const module = { add: (a: number, b: number) => a + b }
    loadUASMMock.mockReturnValue(module)
    const modulePath =
      'uni_modules/test-uasm/uasm/app-android/libs/arm64-v8a/libtest-uasm.so'

    const result = loadUASM<typeof module>(modulePath)

    expect(result).toBeInstanceOf(Promise)
    await expect(result).resolves.toBe(module)
    expect(convert2AbsFullPathMock).toHaveBeenCalledWith(modulePath)
    expect(loadUASMMock).toHaveBeenCalledWith(`/absolute/${modulePath}`)
  })

  test.each(['libtest-uasm.so', 'test-uasm'])(
    '发行库名或插件 ID %s 不转换路径',
    async (moduleName) => {
      loadUASMMock.mockReturnValue(moduleName)

      await expect(loadUASM(moduleName)).resolves.toBe(moduleName)
      expect(convert2AbsFullPathMock).not.toHaveBeenCalled()
      expect(loadUASMMock).toHaveBeenCalledWith(moduleName)
    }
  )

  test('非 UASM 资源路径不转换', async () => {
    const modulePath = 'other/path/libtest-uasm.so'
    loadUASMMock.mockReturnValue(modulePath)

    await expect(loadUASM(modulePath)).resolves.toBe(modulePath)
    expect(convert2AbsFullPathMock).not.toHaveBeenCalled()
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
