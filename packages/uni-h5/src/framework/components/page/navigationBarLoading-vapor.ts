import type Loading from '../../../../../uni-components/src/vue/loading'

// 仅共享组件定义，不保存页面状态，也不注册到应用组件表。
// 显示 API 先提供组件，再更新页面的 loading 状态，无需额外的响应式监听。
export let NavigationBarLoading: typeof Loading

export function setNavigationBarLoadingComponent(component: typeof Loading) {
  NavigationBarLoading = component
}
