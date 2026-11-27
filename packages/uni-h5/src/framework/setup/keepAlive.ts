import { type ComponentInternalInstance, nextTick, onMounted } from 'vue'
import { ShapeFlags, invokeArrayFns } from '@vue/shared'

type KeepAliveRootInstance = ComponentInternalInstance & {
  a: ((...args: any[]) => any)[] | null
}

/**
 * 页面组件通过 defineAsyncComponent 异步加载，渲染在 KeepAlive 缓存的路由组件内。
 * 首次进入页面时，路由组件先挂载并派发 activated，此时页面组件尚未加载完成，
 * 页面及其子组件的 onActivated 还没有注册，所以首次进入不触发 onActivated；
 * 再次进入时页面模块已加载、同步渲染，会正常触发。
 * 页面在其 KeepAlive 根组件挂载之后才挂载时，在挂载完成后补发一次 activated。
 * https://github.com/dcloudio/uni-app/issues/5979
 */
export function initAsyncPageActivated(instance: ComponentInternalInstance) {
  const asyncWrapper = instance.parent
  if (
    !asyncWrapper ||
    !(asyncWrapper.type as { __asyncLoader?: unknown }).__asyncLoader ||
    asyncWrapper.vnode.shapeFlag & ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE
  ) {
    // 非异步加载，或异步组件直接作为 KeepAlive 子节点（Vue 已处理）
    return
  }
  let keepAliveRoot = asyncWrapper.parent
  while (
    keepAliveRoot &&
    !(keepAliveRoot.vnode.shapeFlag & ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE)
  ) {
    keepAliveRoot = keepAliveRoot.parent
  }
  if (!keepAliveRoot || !keepAliveRoot.isMounted) {
    // KeepAlive 根组件尚未挂载时，挂载完成后由 Vue 正常派发 activated
    return
  }
  const root = keepAliveRoot as KeepAliveRootInstance
  onMounted(() => {
    // 与 Vue 一致，在 mounted 之后派发。页面及子组件的 onActivated 都已注入到 KeepAlive 根组件
    nextTick(() => {
      if (!instance.isUnmounted && root.a) {
        invokeArrayFns(root.a)
      }
    })
  })
}
