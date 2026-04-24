/**
 * 拦截 `uni.requestPayment`：
 *   - success → `lt=21, e_n=pay_success`
 *   - fail    → `lt=21, e_n=pay_fail`
 *
 * 与私有版差异：经由 `infra/interceptor.add` 去重；多 reporter 注册都会触发（fanout）。
 */

import { interceptor } from '../infra/interceptor'
import { LT } from '../domain/eventTypes'

import type { InterceptorReporter } from './types'

export function registerPaymentInterceptor(reporter: InterceptorReporter): () => void {
  return interceptor.add('requestPayment', {
    success() {
      reporter.report({ lt: LT.Event, custom: { e_n: 'pay_success' } })
    },
    fail() {
      reporter.report({ lt: LT.Event, custom: { e_n: 'pay_fail' } })
    },
  })
}
