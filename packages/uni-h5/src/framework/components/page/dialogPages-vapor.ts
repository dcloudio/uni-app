// @ts-expect-error 当前 Vue 类型尚未升级到 3.6，Vapor runtime 已导出该方法
import { createDynamicComponent, createFor } from 'vue'
import type { ComponentInternalInstance } from 'vue'
import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'
import { stringifyQuery } from '@dcloudio/uni-shared'
import { DIALOG_TAG, SYSTEM_DIALOG_TAG } from '@dcloudio/uni-core'

// 由 openDialogPage 按需引入；Page 不直接依赖本文件，以便空项目裁剪渲染实现。
export function renderDialogPages(currentInstance: ComponentInternalInstance) {
  interface DialogPageInfo {
    component: UniDialogPage['$component']
    type: string
    route: string
    style: { '--uni-dialog-page-index': number }
  }

  function getDialogPages(): DialogPageInfo[] {
    const pages = [
      ...currentInstance.$dialogPages!.value.map((page) => ({
        page,
        type: DIALOG_TAG,
      })),
      ...currentInstance.$systemDialogPages!.value.map((page) => ({
        page,
        type: SYSTEM_DIALOG_TAG,
      })),
    ]
    pages.sort((a, b) => {
      const aId = a.page.vm?.$basePage?.id || Number.MAX_SAFE_INTEGER
      const bId = b.page.vm?.$basePage?.id || Number.MAX_SAFE_INTEGER
      return aId - bId
    })
    return pages.map(({ page, type }, index) => ({
      component: page.$component,
      type,
      route: `${page.route}${stringifyQuery(page.options)}`,
      // 同一弹页的各根节点共享索引，具体层级由 CSS 统一定义。
      style: { '--uni-dialog-page-index': index },
    }))
  }

  return createFor(
    () => getDialogPages(),
    (dialogPage: { value: DialogPageInfo }) =>
      createDynamicComponent(() => dialogPage.value.component, {
        style: () => dialogPage.value.style,
        'data-type': () => dialogPage.value.type,
        route: () => dialogPage.value.route,
      }),
    (dialogPage: DialogPageInfo) => dialogPage.route,
    18 /* IS_COMPONENT | IS_FRAGMENT：沿用原列表的卸载、插入和按 key 复用行为。 */
  )
}
