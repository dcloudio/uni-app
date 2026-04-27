import { interceptor } from '../../../src/public/infra/interceptor'
import { registerPaymentInterceptor } from '../../../src/public/interceptors/payment'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

import type { InterceptorReporter } from '../../../src/public/interceptors/types'

interface PayUniMock {
  addInterceptor: jest.Mock
  removeInterceptor: jest.Mock
  __handlers: Record<string, { success?: () => void; fail?: () => void }>
}

function payUniMock(): PayUniMock {
  const handlers: PayUniMock['__handlers'] = {}
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

describe('interceptors/payment', () => {
  let uniMock: PayUniMock
  let reporter: { report: jest.Mock } & InterceptorReporter

  beforeEach(() => {
    uniMock = payUniMock()
    installMockUni({ patch: uniMock as unknown as Record<string, unknown> })
    interceptor.__reset()
    reporter = { report: jest.fn() }
  })

  afterEach(() => {
    interceptor.__reset()
    restoreMockUni()
  })

  test('success → e_n=pay_success', () => {
    registerPaymentInterceptor(reporter)
    uniMock.__handlers['requestPayment']!.success!()
    expect(reporter.report).toHaveBeenCalledWith({
      lt: '21',
      custom: { e_n: 'pay_success' },
    })
  })

  test('fail → e_n=pay_fail', () => {
    registerPaymentInterceptor(reporter)
    uniMock.__handlers['requestPayment']!.fail!()
    expect(reporter.report).toHaveBeenCalledWith({
      lt: '21',
      custom: { e_n: 'pay_fail' },
    })
  })

  test('解绑后再触发 → 不再上报', () => {
    const off = registerPaymentInterceptor(reporter)
    off()
    if (uniMock.__handlers['requestPayment']) {
      uniMock.__handlers['requestPayment']!.success?.()
    }
    expect(reporter.report).not.toHaveBeenCalled()
  })
})
