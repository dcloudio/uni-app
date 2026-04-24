/**
 * 拦截 `uni.share` 调用，success / fail 都上报一条 `lt=21, e_n=share` 自定义事件。
 *
 * 与私有版差异（修复缺陷 #26）：
 *   - 私有版 `interceptShare(true)` 在 `onLoad` 内重复 wrap `onShareAppMessage`，
 *     连续打开同一页面会导致 share 事件被多次上报。
 *   - 公有版通过 `infra/interceptor` 单次 fanout 注册；onLoad 不再重复包装。
 */

import { interceptor } from '../infra/interceptor'
import { LT } from '../domain/eventTypes'

import type { InterceptorReporter } from './types'

export function registerShareInterceptor(reporter: InterceptorReporter): () => void {
  const fire = () => reporter.report({ lt: LT.Event, custom: { e_n: 'share' } })
  return interceptor.add('share', {
    success() {
      fire()
    },
    fail() {
      fire()
    },
  })
}
