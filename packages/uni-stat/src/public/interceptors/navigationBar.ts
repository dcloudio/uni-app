/**
 * 拦截 `uni.setNavigationBarTitle`，把用户设置的标题写入 `domain/title` 内存。
 *
 * **不**直接 reporter.report；title 是字段维度的状态，由 statData.builder 在拼装
 * 页面事件时一次性读出。这样保证 ttn 与 lt=11 / lt=3 事件强相关，避免私有版"标题在
 * 全局对象、上报时机散落"的问题。
 */

import { interceptor } from '../infra/interceptor'
import { setPageTitle } from '../domain/title'

/**
 * 注册 setNavigationBarTitle 拦截器；不依赖 reporter。
 *
 * @returns 解绑函数。
 */
export function registerNavigationBarInterceptor(): () => void {
  return interceptor.add('setNavigationBarTitle', {
    invoke(args) {
      const a = args as { title?: unknown } | undefined
      if (a && 'title' in a) setPageTitle(a.title)
    },
  })
}
