<template>
  <uni-page :data-page="pageMeta.route" :style="pageStyle">
    <PageHead v-if="hasNavigationBar && navigationBar.style !== 'custom'" />
    <PageBody>
      <component :is="pageComponent" v-bind="pageProps" ref="page" />
    </PageBody>
    <component
      v-for="dialogPage in getDialogPages()"
      :key="dialogPage.route"
      :is="dialogPage.component"
      :style="dialogPageStyle"
      :data-type="dialogPage.type"
      :route="dialogPage.route"
    />
  </uni-page>
</template>

<script setup lang="ts">
import {
  type ComponentInternalInstance,
  getCurrentInstance,
  inject,
  provide,
  ref,
} from 'vue'

import { useDocumentTitle } from '../../../helpers/useDocumentTitle'
import { useBackgroundColorContent } from '../../../helpers/useBackgroundColorContent'
import { providePageMeta } from '../../setup/provide'
import { getStateId } from '../../../helpers/dom'
import { stringifyQuery } from '@dcloudio/uni-shared'

import PageHead from './pageHead.vue'
import PageBody from './pageBody.vue'
import type { VaporPageRouteComponent } from './route-vapor'

import { createDialogPageId } from '../../setup/page'
import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'
import {
  DIALOG_TAG,
  SYSTEM_DIALOG_TAG,
  isDialogPageInstance,
  isNormalDialogPageInstance,
  isSystemDialogPageInstance,
} from '@dcloudio/uni-core'

defineOptions({
  name: 'Page',
  __reserved: true,
  compatConfig: { MODE: 3 },
})

const hasNavigationBar = __UNI_FEATURE_NAVIGATIONBAR__
const pageStyle = {} as Record<string, any>
let pageMeta = providePageMeta(getStateId())
const navigationBar = pageMeta.navigationBar
const currentInstance = getCurrentInstance()!
const attrs = currentInstance.attrs
const routeComponent = currentInstance.type as VaporPageRouteComponent
const pageComponent = routeComponent.__uniPageComponent
const pageProps = routeComponent.__uniGetPageProps()

useDocumentTitle(pageMeta)

currentInstance.$dialogPages = ref<UniDialogPage[]>([])
currentInstance.$systemDialogPages = ref<UniDialogPage[]>([])
if (isDialogPageInstance(currentInstance)) {
  // pageMeta 是通过 route 取到的，需要更新为 dialogPage 的 meta
  pageMeta.route = attrs.route as string
  const routePageMeta = __uniRoutes.find(
    (route) => route.path === pageMeta.route.split('?')[0]
  )?.meta
  if (routePageMeta) {
    routePageMeta.navigationBar = Object.assign(
      navigationBar,
      routePageMeta.navigationBar
    )
    pageMeta = Object.assign(pageMeta, routePageMeta)
  }
  // dialogPage 不切换 history，需在子组件 setup 订阅事件前分配独立 ID。
  // $basePage 也从 pageMeta 初始化，保证组件订阅与页面桥接使用同一个 ID。
  pageMeta.id = createDialogPageId()
  if (!routePageMeta?.backgroundColorContent) {
    pageMeta.backgroundColorContent = 'transparent'
  }
  if (!routePageMeta?.navigationBar.style) {
    pageMeta.navigationBar.style = 'custom'
  }
  if (attrs['data-type'] === SYSTEM_DIALOG_TAG) {
    pageMeta.navigationBar.titleText = ''
  }
  const parentInstance = inject('parentInstance') as ComponentInternalInstance
  if (currentInstance && parentInstance) {
    currentInstance.$parentInstance = parentInstance
    assignDialogPage(currentInstance, parentInstance, currentInstance)
  }
} else {
  useBackgroundColorContent(pageMeta)
  provide('parentInstance', currentInstance)
}

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

function assignDialogPage(
  ctx: ComponentInternalInstance,
  parentInstance: ComponentInternalInstance,
  currentInstance: ComponentInternalInstance
) {
  let parentDialogPages: UniDialogPage[] = []
  if (isNormalDialogPageInstance(ctx)) {
    parentDialogPages = parentInstance.$dialogPages!.value
  }
  if (isSystemDialogPageInstance(ctx)) {
    parentDialogPages = parentInstance.$systemDialogPages!.value
  }
  if (!parentDialogPages.length) return

  // 当同时打开多个 dialogPage 时，将父页面 dialogPages 最后一项赋值给 currentInstance.$dialogPage 会导致 $page 指向不符合预期
  for (let i = 0; i < parentDialogPages.length; i++) {
    const dialogPage = parentDialogPages[i]
    // @ts-expect-error
    if (!dialogPage.$assigned) {
      // @ts-expect-error
      dialogPage.$assigned = true
      currentInstance.$dialogPage = dialogPage
      break
    }
  }
}
</script>
