import { __resetTitle, getCurrentTitle } from '../../../src/public/domain/title'
import { interceptor } from '../../../src/public/infra/interceptor'
import { installAllInterceptors } from '../../../src/public/interceptors'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

import type { InterceptorReporter } from '../../../src/public/interceptors/types'

interface AllUniMock {
  addInterceptor: jest.Mock
  removeInterceptor: jest.Mock
  __handlers: Record<
    string,
    {
      invoke?: (a: unknown) => void
      success?: () => void
      fail?: () => void
      complete?: () => void
    }
  >
}

function allUniMock(): AllUniMock {
  const handlers: AllUniMock['__handlers'] = {}
  return {
    addInterceptor: jest.fn(
      (api: string, h: AllUniMock['__handlers'][string]) => {
        handlers[api] = h
      }
    ),
    removeInterceptor: jest.fn((api: string) => {
      delete handlers[api]
    }),
    __handlers: handlers,
  }
}

describe('interceptors/installAll', () => {
  let uniMock: AllUniMock
  let reporter: { report: jest.Mock } & InterceptorReporter

  beforeEach(() => {
    uniMock = allUniMock()
    installMockUni({ patch: uniMock as unknown as Record<string, unknown> })
    interceptor.__reset()
    __resetTitle()
    reporter = { report: jest.fn() }
  })

  afterEach(() => {
    interceptor.__reset()
    __resetTitle()
    restoreMockUni()
  })

  test('一次 install → 4 个 api 全部注册', () => {
    installAllInterceptors(reporter)
    expect(Object.keys(uniMock.__handlers).sort()).toEqual([
      'login',
      'requestPayment',
      'setNavigationBarTitle',
      'share',
    ])
  })

  test('完整端到端：触发四类 → 上报 + title 更新', () => {
    installAllInterceptors(reporter)
    uniMock.__handlers['login'].complete!()
    uniMock.__handlers['share'].success!()
    uniMock.__handlers['requestPayment'].fail!()
    uniMock.__handlers['setNavigationBarTitle'].invoke!({ title: 'title-1' })

    expect(reporter.report.mock.calls.map((c) => c[0])).toEqual([
      { lt: '21', custom: { e_n: 'login' } },
      { lt: '21', custom: { e_n: 'share' } },
      { lt: '21', custom: { e_n: 'pay_fail' } },
    ])
    expect(getCurrentTitle().ttn).toBe('title-1')
  })

  test('两次 install → 不会重复装载（同 api 仅 1 次有效注册），fanout 各自触发', () => {
    const r2 = { report: jest.fn() } as {
      report: jest.Mock
    } & InterceptorReporter
    installAllInterceptors(reporter)
    installAllInterceptors(r2)
    uniMock.__handlers['login'].complete!()
    expect(reporter.report).toHaveBeenCalledTimes(1)
    expect(r2.report).toHaveBeenCalledTimes(1)
  })

  test('uninstall → 全部解绑', () => {
    const off = installAllInterceptors(reporter)
    off()
    expect(uniMock.__handlers['login']).toBeUndefined()
    expect(uniMock.__handlers['share']).toBeUndefined()
    expect(uniMock.__handlers['requestPayment']).toBeUndefined()
    expect(uniMock.__handlers['setNavigationBarTitle']).toBeUndefined()
  })
})
