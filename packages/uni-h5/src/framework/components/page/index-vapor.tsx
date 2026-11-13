import { defineSystemComponent } from '@dcloudio/uni-components'
import {
  type ComponentInternalInstance,
  type DefineComponent,
  getCurrentInstance,
  inject,
  provide,
  ref,
  shallowRef,
} from 'vue'
import { useDocumentTitle } from '../../../helpers/useDocumentTitle'
import { providePageMeta, usePageRoute } from '../../setup/provide'
import { getStateId } from '../../../helpers/dom'
import { usePageBodyScrollPosition } from '../../../helpers/pageBody'
import { dialogPageRenderer } from './dialogPageRenderer-vapor'
import PageHead from './pageHead-vapor'
import usePageBody from './pageBody-vapor'
import type { VaporPageRouteComponent } from './route-vapor'
import { createDialogPageId } from '../../setup/page'
import type { UniDialogPage } from '@dcloudio/uni-app-x/types/page'
import {
  SYSTEM_DIALOG_TAG,
  isDialogPageInstance,
  isNormalDialogPageInstance,
  isSystemDialogPageInstance,
} from '@dcloudio/uni-core'

// 功能开关保留为 JS 条件表达式，使项目发行时能裁剪关闭的分支及其组件依赖。
export default /*#__PURE__*/ defineSystemComponent({
  name: 'Page',
  inheritAttrs: false,
  setup() {
    const pageStyle = {} as Record<string, any>
    let pageMeta = providePageMeta(getStateId())
    const navigationBar = pageMeta.navigationBar
    const currentInstance = getCurrentInstance()!
    const pageBody = shallowRef<HTMLElement | null>(null)
    // Teleport 先于正文 ref 创建，目标需能随正文挂载重新求值。
    Object.defineProperty(currentInstance, '__pageBodyEl', {
      configurable: true,
      get: () => pageBody.value,
    })
    usePageBodyScrollPosition(currentInstance)
    const attrs = currentInstance.attrs
    const routeComponent = currentInstance.type as VaporPageRouteComponent
    const PageComponent = routeComponent.__uniPageComponent as DefineComponent
    // 单页面不会安装 Router，统一使用框架的路由取参逻辑。
    const pageProps = usePageRoute().query

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
      const parentInstance = inject(
        'parentInstance'
      ) as ComponentInternalInstance
      if (currentInstance && parentInstance) {
        currentInstance.$parentInstance = parentInstance
        assignDialogPage(currentInstance, parentInstance, currentInstance)
      }
    } else {
      provide('parentInstance', currentInstance)
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

    ;(currentInstance as any).__pageBodyId = pageMeta.id
    const renderPageBody = usePageBody(
      pageMeta,
      () => <PageComponent {...pageProps} ref={'page'}></PageComponent>,
      {
        attrs,
        style: pageStyle,
        onElement(element) {
          pageBody.value = element
        },
      }
    )

    return () => (
      <>
        {__UNI_FEATURE_NAVIGATIONBAR__ && (
          <PageHead
            v-if={
              !isDialogPageInstance(currentInstance) &&
              navigationBar.style !== 'custom'
            }
            ref={'pageHead'}
          />
        )}
        {renderPageBody()}
        {dialogPageRenderer.value?.(currentInstance)}
      </>
    )
  },
})
