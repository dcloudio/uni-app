import { loadUasm } from '../src/x/service/api/base/uasm'

function load<T>(
  id: string,
  loader: () => Promise<{ default: unknown }>
): Promise<T> {
  return loadUasm({ id, loader } as unknown as string)
}

describe('loadUasm', () => {
  test('load the default factory', async () => {
    const module = { value: 1 }
    const factory = jest.fn(() => module)
    const loader = jest.fn(async () => ({ default: factory }))

    await expect(load('test-uasm-load', loader)).resolves.toBe(module)
    expect(loader).toHaveBeenCalledTimes(1)
    expect(factory).toHaveBeenCalledTimes(1)
  })

  test('cache the loading promise by plugin id', async () => {
    const module = { value: 1 }
    const factory = jest.fn(async () => module)
    const loader = jest.fn(async () => ({ default: factory }))

    const first = load('test-uasm-cache', loader)
    const second = load('test-uasm-cache', loader)

    expect(first).toBe(second)
    await expect(first).resolves.toBe(module)
    expect(loader).toHaveBeenCalledTimes(1)
    expect(factory).toHaveBeenCalledTimes(1)
  })

  test.each(['loader', 'factory'])(
    'allow retry after %s failure',
    async (step) => {
      const error = new Error(`${step} failed`)
      const module = { value: 1 }
      const loader = jest
        .fn<Promise<{ default: unknown }>, []>()
        .mockImplementationOnce(async () => {
          if (step === 'loader') {
            throw error
          }
          return { default: () => Promise.reject(error) }
        })
        .mockResolvedValue({ default: () => module })

      await expect(load(`test-uasm-retry-${step}`, loader)).rejects.toBe(error)
      await expect(load(`test-uasm-retry-${step}`, loader)).resolves.toBe(
        module
      )
      expect(loader).toHaveBeenCalledTimes(2)
    }
  )

  test('reject a module without a default factory', async () => {
    await expect(
      load('test-uasm-invalid-export', async () => ({ default: {} }))
    ).rejects.toThrow('uasm 插件[test-uasm-invalid-export]的默认导出必须是函数')
  })

  test('reject an untransformed parameter', async () => {
    await expect(loadUasm('uni_modules/test-uasm')).rejects.toThrow(
      'uni.loadUasm 参数未经过编译处理'
    )
  })
})
