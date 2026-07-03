/**
 * 拦截器统一装配入口。
 *
 * 使用：
 *   ```ts
 *   import { installAllInterceptors } from './interceptors'
 *   const uninstall = installAllInterceptors(collector)  // collector 实现 InterceptorReporter
 *   // 卸载（hot reload / unit test）：
 *   uninstall()
 *   ```
 *
 * 重复 install 安全：每次 install 都会返回独立的 unbinder；多次 install 触发的 fanout
 * 由 `infra/interceptor` 统一去重 + 解绑。
 */

import { registerLoginInterceptor } from './login'
import { registerNavigationBarInterceptor } from './navigationBar'
import { registerPaymentInterceptor } from './payment'
import { registerShareInterceptor } from './share'

import type { InterceptorReporter } from './types'

export {
  registerLoginInterceptor,
  registerNavigationBarInterceptor,
  registerPaymentInterceptor,
  registerShareInterceptor,
}
export type { InterceptorReporter, InterceptorReportInput } from './types'

/**
 * 一次性装配全部拦截器。
 *
 * @returns 解绑函数（顺序解绑全部已注册的拦截器）。
 */
export function installAllInterceptors(
  reporter: InterceptorReporter
): () => void {
  const unbinders = [
    registerLoginInterceptor(reporter),
    registerShareInterceptor(reporter),
    registerPaymentInterceptor(reporter),
    registerNavigationBarInterceptor(),
  ]
  return () => {
    for (const u of unbinders) {
      try {
        u()
      } catch {
        // 单个解绑失败不影响其余
      }
    }
  }
}
