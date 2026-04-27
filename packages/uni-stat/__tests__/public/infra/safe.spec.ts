import {
  safeStringify,
  tryRun,
  withRetry,
} from '../../../src/public/infra/safe'

describe('infra/safe.safeStringify', () => {
  test('undefined → 空字符串', () => {
    expect(safeStringify(undefined)).toBe('')
  })

  test('字符串原样返回', () => {
    expect(safeStringify('hello')).toBe('hello')
  })

  test('对象走 JSON.stringify', () => {
    expect(safeStringify({ a: 1, b: 'x' })).toBe('{"a":1,"b":"x"}')
  })

  test('循环引用替换为 [Circular]', () => {
    const a: Record<string, unknown> = { name: 'a' }
    a.self = a
    const out = safeStringify(a)
    expect(out).toContain('"name":"a"')
    expect(out).toContain('[Circular]')
  })

  test('bigint 转字符串', () => {
    expect(safeStringify({ n: BigInt(123) })).toBe('{"n":"123"}')
  })

  test('function 序列化为 [Function name]', () => {
    function foo() {
      /* noop */
    }
    expect(safeStringify({ f: foo })).toContain('[Function foo]')
  })

  test('超过 max 截断并附 …[truncated]', () => {
    const s = 'x'.repeat(100)
    const out = safeStringify(s, 20)
    expect(out.length).toBe(20)
    expect(out.endsWith('…[truncated]')).toBe(true)
  })
})

describe('infra/safe.tryRun', () => {
  test('成功返回函数返回值', () => {
    expect(tryRun(() => 42, 0)).toBe(42)
  })

  test('抛错返回 fallback', () => {
    expect(
      tryRun(() => {
        throw new Error('x')
      }, 99)
    ).toBe(99)
  })
})

describe('infra/safe.withRetry', () => {
  test('首次成功不重试', async () => {
    const fn = jest.fn().mockResolvedValue('ok')
    await expect(
      withRetry(fn, {
        times: 3,
        baseDelayMs: 10,
        sleep: () => Promise.resolve(),
      })
    ).resolves.toBe('ok')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('全部失败抛最后一个错误', async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error('e1'))
      .mockRejectedValueOnce(new Error('e2'))
      .mockRejectedValueOnce(new Error('e3'))
    await expect(
      withRetry(fn, {
        times: 3,
        baseDelayMs: 10,
        sleep: () => Promise.resolve(),
      })
    ).rejects.toThrow('e3')
    expect(fn).toHaveBeenCalledTimes(3)
  })

  test('指数退避：sleep 调用顺序为 base, base*2, base*4...', async () => {
    const sleeps: number[] = []
    const sleep = (ms: number): Promise<void> => {
      sleeps.push(ms)
      return Promise.resolve()
    }
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error('e1'))
      .mockRejectedValueOnce(new Error('e2'))
      .mockResolvedValueOnce('ok')

    await expect(
      withRetry(fn, { times: 3, baseDelayMs: 100, sleep })
    ).resolves.toBe('ok')
    expect(sleeps).toEqual([100, 200])
  })

  test('times < 1 视为 1（不抛参数错误，至少跑一次）', async () => {
    const fn = jest.fn().mockResolvedValue('ok')
    await expect(
      withRetry(fn, {
        times: 0,
        baseDelayMs: 10,
        sleep: () => Promise.resolve(),
      })
    ).resolves.toBe('ok')
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
