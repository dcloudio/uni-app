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
    return pages.map(({ page, type }) => ({
      component: page.$component,
      type,
      route: `${page.route}${stringifyQuery(page.options)}`,
    }))
  }

  const dialogPageStyle = {
    position: 'fixed',
    zIndex: 999,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }
  return createFor(
    () => getDialogPages(),
    (dialogPage: { value: DialogPageInfo }) =>
      createDynamicComponent(() => dialogPage.value.component, {
        style: () => dialogPageStyle,
        'data-type': () => dialogPage.value.type,
        route: () => dialogPage.value.route,
      }),
    (dialogPage: DialogPageInfo) => dialogPage.route,
    18 /* IS_COMPONENT | IS_FRAGMENT：沿用原列表的卸载、插入和按 key 复用行为。 */
  )
}
