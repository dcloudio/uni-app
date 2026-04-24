import { interceptor } from '../../../public/infra/interceptor'
import { registerLoginInterceptor } from '../../../public/interceptors/login'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

import type { InterceptorReporter } from '../../../public/interceptors/types'

interface UniWithInterceptor {
  addInterceptor: jest.Mock
  removeInterceptor: jest.Mock
  __handlers?: Record<
    string,
    {
      invoke?: () => void
      success?: () => void
      fail?: () => void
      complete?: () => void
    }
  >
}

function uniWithInterceptor(): UniWithInterceptor {
  const handlers: Record<string, { complete?: () => void }> = {}
  return {
    addInterceptor: jest.fn((api: string, h: { complete?: () => void }) => {
      handlers[api] = h
    }),
    removeInterceptor: jest.fn((api: string) => {
      delete handlers[api]
    }),
    __handlers: handlers,
  }
}

describe('interceptors/login', () => {
  let uniMock: UniWithInterceptor
  let reporter: { report: jest.Mock } & InterceptorReporter

  beforeEach(() => {
    uniMock = uniWithInterceptor()
    installMockUni({ patch: uniMock as unknown as Record<string, unknown> })
    interceptor.__reset()
    reporter = { report: jest.fn() }
  })

  afterEach(() => {
    interceptor.__reset()
    restoreMockUni()
  })

  test('注册后 complete → 上报 1 条 lt=21 e_n=login', () => {
    registerLoginInterceptor(reporter)
    expect(uniMock.addInterceptor).toHaveBeenCalledWith(
      'login',
      expect.any(Object)
    )
    uniMock.__handlers!['login']!.complete!()
    expect(reporter.report).toHaveBeenCalledTimes(1)
    expect(reporter.report).toHaveBeenCalledWith({
      lt: '21',
      custom: { e_n: 'login' },
    })
  })

  test('多 reporter 注册 → fanout 各自触发一次（修复缺陷 #26 不丢失）', () => {
    const r2 = { report: jest.fn() } as {
      report: jest.Mock
    } & InterceptorReporter
    registerLoginInterceptor(reporter)
    registerLoginInterceptor(r2)
    uniMock.__handlers!['login']!.complete!()
    expect(reporter.report).toHaveBeenCalledTimes(1)
    expect(r2.report).toHaveBeenCalledTimes(1)
  })

  test('解绑后再触发 → 不再上报', () => {
    const off = registerLoginInterceptor(reporter)
    off()
    if (uniMock.__handlers!['login']) {
      uniMock.__handlers!['login']!.complete?.()
    }
    expect(reporter.report).not.toHaveBeenCalled()
  })
})
