/**
 * 拦截 `uni.login` 调用，complete 时上报一条 `lt=21, e_n=login` 自定义事件。
 *
 * 与私有版差异：
 *   - 走 `infra/interceptor.add`，多次 register 不会覆盖回调（修复缺陷 #26）。
 *   - 通过 `reporter` 注入，便于单测断言。
 */

import { interceptor } from '../infra/interceptor'
import { LT } from '../domain/eventTypes'

import type { InterceptorReporter } from './types'

/**
 * 注册 login 拦截器。
 *
 * @returns 解绑函数。同一 reporter 多次 register 视为多次回调（fanout）；卸载时只摘当次。
 */
export function registerLoginInterceptor(
  reporter: InterceptorReporter
): () => void {
  return interceptor.add('login', {
    complete() {
      reporter.report({ lt: LT.Event, custom: { e_n: 'login' } })
    },
  })
}
