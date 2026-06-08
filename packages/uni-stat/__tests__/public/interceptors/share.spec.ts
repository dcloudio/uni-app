import { interceptor } from '../../../src/public/infra/interceptor'
import { registerShareInterceptor } from '../../../src/public/interceptors/share'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

import type { InterceptorReporter } from '../../../src/public/interceptors/types'

interface ShareUniMock {
  addInterceptor: jest.Mock
  removeInterceptor: jest.Mock
  __handlers: Record<string, { success?: () => void; fail?: () => void }>
}

function shareUniMock(): ShareUniMock {
  const handlers: ShareUniMock['__handlers'] = {}
  return {
    addInterceptor: jest.fn(
      (api: string, h: { success?: () => void; fail?: () => void }) => {
        handlers[api] = h
      }
    ),
    removeInterceptor: jest.fn((api: string) => {
      delete handlers[api]
    }),
    __handlers: handlers,
  }
}

describe('interceptors/share', () => {
  let uniMock: ShareUniMock
  let reporter: { report: jest.Mock } & InterceptorReporter

  beforeEach(() => {
    uniMock = shareUniMock()
    installMockUni({ patch: uniMock as unknown as Record<string, unknown> })
    interceptor.__reset()
    reporter = { report: jest.fn() }
  })

  afterEach(() => {
    interceptor.__reset()
    restoreMockUni()
  })

  test('success → 上报一条 lt=21 e_n=share', () => {
    registerShareInterceptor(reporter)
    uniMock.__handlers['share']!.success!()
    expect(reporter.report).toHaveBeenCalledWith({
      lt: '21',
      custom: { e_n: 'share' },
    })
  })

  test('fail → 也上报一条 e_n=share', () => {
    registerShareInterceptor(reporter)
    uniMock.__handlers['share']!.fail!()
    expect(reporter.report).toHaveBeenCalledWith({
      lt: '21',
      custom: { e_n: 'share' },
    })
  })

  test('单次注册 → 多次 success/fail 仅触发对应次数（修复缺陷 #26 不重复）', () => {
    registerShareInterceptor(reporter)
    uniMock.__handlers['share']!.success!()
    uniMock.__handlers['share']!.success!()
    uniMock.__handlers['share']!.fail!()
    expect(reporter.report).toHaveBeenCalledTimes(3)
  })
})
