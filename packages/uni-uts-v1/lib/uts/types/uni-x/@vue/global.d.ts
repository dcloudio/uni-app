import { Plugin } from '@vue/runtime-core'

// # 全局API
// ## 应用实例
import {
  createApp as createAppOrigin,
  createSSRApp as createSSRAppOrigin,
  App as AppOrigin,
} from '@vue/runtime-core'
// ## 通用
import {
  // version
  nextTick as nextTickOrigin,
  defineComponent as defineComponentOrigin,
  defineAsyncComponent as defineAsyncComponentOrigin,
  // defineCustomElement
  // 扩展
  defineMixin as defineMixinOrigin,
} from '@vue/runtime-core'

// # 组合式 API
// ## 响应式 API：核心
import {
  ref as refOrigin,
  computed as computedOrigin,
  reactive as reactiveOrigin,
  readonly as readonlyOrigin,
  watchEffect as watchEffectOrigin,
  watchPostEffect as watchPostEffectOrigin,
  watchSyncEffect as watchSyncEffectOrigin,
  watch as watchOrigin,
} from '@vue/runtime-core'
// ## 响应式 API：工具函数
import {
  isRef as isRefOrigin,
  unref as unrefOrigin,
  toRef as toRefOrigin,
  toValue as toValueOrigin,
  toRefs as toRefsOrigin,
  isProxy as isProxyOrigin,
  isReactive as isReactiveOrigin,
  isReadonly as isReadonlyOrigin,
} from '@vue/runtime-core'
// ## 响应式 API：进阶
import {
  shallowRef as shallowRefOrigin,
  triggerRef as triggerRefOrigin,
  customRef as customRefOrigin,
  shallowReactive as shallowReactiveOrigin,
  shallowReadonly as shallowReadonlyOrigin,
  toRaw as toRawOrigin,
  markRaw as markRawOrigin,
  effectScope as effectScopeOrigin,
  getCurrentScope as getCurrentScopeOrigin,
  onScopeDispose as onScopeDisposeOrigin,
} from '@vue/runtime-core'
// ## 组合式 API：生命周期钩子
import {
  onMounted as onMountedOrigin,
  onUpdated as onUpdatedOrigin,
  onUnmounted as onUnmountedOrigin,
  onBeforeMount as onBeforeMountOrigin,
  onBeforeUpdate as onBeforeUpdateOrigin,
  onBeforeUnmount as onBeforeUnmountOrigin,
  onErrorCaptured as onErrorCapturedOrigin,
  onRenderTracked as onRenderTrackedOrigin,
  onRenderTriggered as onRenderTriggeredOrigin,
  onActivated as onActivatedOrigin,
  onDeactivated as onDeactivatedOrigin,
  onServerPrefetch as onServerPrefetchOrigin,
} from '@vue/runtime-core'
// ## 组合式 API：依赖注入
import {
  provide as provideOrigin,
  inject as injectOrigin,
  hasInjectionContext as hasInjectionContextOrigin,
} from '@vue/runtime-core'

// # 选项式 API

// # 内置内容

// # 单文件组件
// ## <script setup>
import {
  useSlots as useSlotsOrigin,
  useAttrs as useAttrsOrigin,
  useModel as useModelOrigin,
} from '@vue/runtime-core'

// # 进阶 API
// ## 渲染函数 API
import {
  h as hOrigin,
  mergeProps as mergePropsOrigin,
  cloneVNode as cloneVNodeOrigin,
  isVNode as isVNodeOrigin,
  resolveComponent as resolveComponentOrigin,
  resolveDirective as resolveDirectiveOrigin,
  withDirectives as withDirectivesOrigin,
  withModifiers as withModifiersOrigin,
} from '@vue/runtime-core'
// ## 服务端渲染 API
// ## TypeScript 工具类型
import {
  PropType as PropTypeOrigin,
  MaybeRef as MaybeRefOrigin,
  // MaybeRefOrGetter as MaybeRefOrGetterOrigin,
  // ExtractPropTypes as ExtractPropTypesOrigin,
  // ExtractPublicPropTypes as ExtractPublicPropTypesOrigin,
  // ComponentCustomProperties as ComponentCustomPropertiesOrigin,
  // ComponentCustomOptions as ComponentCustomOptionsOrigin,
  // ComponentCustomProps as ComponentCustomPropsOrigin,
  // CSSProperties as CSSPropertiesOrigin,
  SlotsType as SlotsTypeOrigin,
} from '@vue/runtime-core'
// ### 其他类型信息
import {
  ComponentPublicInstance as ComponentPublicInstanceOrigin,
  ComponentInternalInstance as ComponentInternalInstanceOrigin,
  SetupContext as SetupContextOrigin,
  Ref as RefOrigin,
  OnCleanup as OnCleanupOrigin,
  DebuggerEvent as DebuggerEventOrigin,
  Directive as DirectiveOrigin,
  DirectiveBinding as DirectiveBindingOrigin,
  EffectScope as EffectScopeOrigin,
  WritableComputedOptions as WritableComputedOptionsOrigin,
} from '@vue/runtime-core'

// # 其他
// ## compiler-core/runtimeHelpers
import {
  Fragment as FragmentOrigin,
  Teleport as TeleportOrigin,
  Suspense as SuspenseOrigin,
  KeepAlive as KeepAliveOrigin,
  BaseTransition as BaseTransitionOrigin,
  openBlock as openBlockOrigin,
  createBlock as createBlockOrigin,
  createElementBlock as createElementBlockOrigin,
  createVNode as createVNodeOrigin,
  createElementVNode as createElementVNodeOrigin,
  createCommentVNode as createCommentVNodeOrigin,
  createTextVNode as createTextVNodeOrigin,
  createStaticVNode as createStaticVNodeOrigin,
  // resolveComponent
  resolveDynamicComponent as resolveDynamicComponentOrigin,
  // resolveDirective as resolveDirectiveOrigin,
  // resolveFilter as resolveFilterOrigin,
  // withDirectives as withDirectivesOrigin,
  renderList as renderListOrigin,
  renderSlot as renderSlotOrigin,
  createSlots as createSlotsOrigin,
  toDisplayString as toDisplayStringOrigin,
  // mergeProps as mergePropsOrigin,
  normalizeClass as normalizeClassOrigin,
  normalizeStyle as normalizeStyleOrigin,
  normalizeProps as normalizePropsOrigin,
  guardReactiveProps as guardReactivePropsOrigin,
  toHandlers as toHandlersOrigin,
  camelize as camelizeOrigin,
  capitalize as capitalizeOrigin,
  toHandlerKey as toHandlerKeyOrigin,
  setBlockTracking as setBlockTrackingOrigin,
  pushScopeId as pushScopeIdOrigin,
  popScopeId as popScopeIdOrigin,
  withCtx as withCtxOrigin,
  // unref as unrefOrigin,
  // isRef as isRefOrigin,
  withMemo as withMemoOrigin,
  isMemoSame as isMemoSameOrigin,
} from '@vue/runtime-core'
// ## compiler-dom/runtimeHelpers
import {
  //   vModelRadio as vModelRadioOrigin,
  //   vModelCheckbox as vModelCheckboxOrigin,
  //   vModelText as vModelTextOrigin,
  //   vModelSelect as vModelSelectOrigin,
  //   vModelDynamic as vModelDynamicOrigin,
  //   vOnModifiersGuard as vOnModifiersGuardOrigin,
  //   vOnKeysGuard as vOnKeysGuardOrigin,
  vShow as vShowOrigin,
  //   Transition as TransitionOrigin,
  //   TransitionGroup as TransitionGroupOrigin,
} from '@vue/runtime-core'
// ## compiler-uts/runtimeHelpers

// ## 官方文档已不公开的
import { getCurrentInstance as getCurrentInstanceOrigin } from '@vue/runtime-core'

// ## 编译阶段使用的类型
import { VNode as VNodeOrigin } from '@vue/runtime-core'

declare global {
  // # 全局API
  // ## 应用实例
  const createApp: typeof createAppOrigin
  const createSSRApp: typeof createSSRAppOrigin
  type VueApp = AppOrigin
  // ## 通用
  const nextTick: typeof nextTickOrigin
  const defineComponent: typeof defineComponentOrigin
  const defineAsyncComponent: typeof defineAsyncComponentOrigin
  // 扩展
  const defineMixin: typeof defineMixinOrigin

  // # 组合式 API
  // ## 响应式 API：核心
  const ref: typeof refOrigin
  const computed: typeof computedOrigin
  const reactive: typeof reactiveOrigin
  const readonly: typeof readonlyOrigin
  const watchEffect: typeof watchEffectOrigin
  const watchPostEffect: typeof watchPostEffectOrigin
  const watchSyncEffect: typeof watchSyncEffectOrigin
  const watch: typeof watchOrigin
  // ## 响应式 API：工具函数
  const isRef: typeof isRefOrigin
  const unref: typeof unrefOrigin
  const toRef: typeof toRefOrigin
  const toValue: typeof toValueOrigin
  const toRefs: typeof toRefsOrigin
  const isProxy: typeof isProxyOrigin
  const isReactive: typeof isReactiveOrigin
  const isReadonly: typeof isReadonlyOrigin
  // ## 响应式 API：进阶
  const shallowRef: typeof shallowRefOrigin
  const triggerRef: typeof triggerRefOrigin
  const customRef: typeof customRefOrigin
  const shallowReactive: typeof shallowReactiveOrigin
  const shallowReadonly: typeof shallowReadonlyOrigin
  const toRaw: typeof toRawOrigin
  const markRaw: typeof markRawOrigin
  const effectScope: typeof effectScopeOrigin
  const getCurrentScope: typeof getCurrentScopeOrigin
  const onScopeDispose: typeof onScopeDisposeOrigin
  // ## 组合式 API：生命周期钩子
  const onMounted: typeof onMountedOrigin
  const onUpdated: typeof onUpdatedOrigin
  const onUnmounted: typeof onUnmountedOrigin
  const onBeforeMount: typeof onBeforeMountOrigin
  const onBeforeUpdate: typeof onBeforeUpdateOrigin
  const onBeforeUnmount: typeof onBeforeUnmountOrigin
  const onErrorCaptured: typeof onErrorCapturedOrigin
  const onRenderTracked: typeof onRenderTrackedOrigin
  const onRenderTriggered: typeof onRenderTriggeredOrigin
  const onActivated: typeof onActivatedOrigin
  const onDeactivated: typeof onDeactivatedOrigin
  const onServerPrefetch: typeof onServerPrefetchOrigin
  // ## 组合式 API：依赖注入
  const provide: typeof provideOrigin
  const inject: typeof injectOrigin
  const hasInjectionContext: typeof hasInjectionContextOrigin

  // # 选项式 API

  // # 内置内容

  // # 单文件组件
  // ## <script setup>
  const useSlots: typeof useSlotsOrigin
  const useAttrs: typeof useAttrsOrigin
  const useModel: typeof useModelOrigin

  // # 进阶 API
  // ## 渲染函数 API
  const h: typeof hOrigin
  const mergeProps: typeof mergePropsOrigin
  const cloneVNode: typeof cloneVNodeOrigin
  const isVNode: typeof isVNodeOrigin
  const resolveComponent: typeof resolveComponentOrigin
  const resolveDirective: typeof resolveDirectiveOrigin
  const withDirectives: typeof withDirectivesOrigin
  const withModifiers: typeof withModifiersOrigin
  // ## 服务端渲染 API
  // ## TypeScript 工具类型
  type PropType<T> = PropTypeOrigin<T>
  type MaybeRef<T> = MaybeRefOrigin<T>
  type SlotsType<T extends Record<string, any> = Record<string, any>> =
    SlotsTypeOrigin<T>

  // ### 其他类型信息
  type ComponentPublicInstance = ComponentPublicInstanceOrigin
  type ComponentInternalInstance = ComponentInternalInstanceOrigin
  type SetupContext = SetupContextOrigin
  type Ref<T> = RefOrigin<T>
  type OnCleanup = OnCleanupOrigin
  type DebuggerEvent = DebuggerEventOrigin
  type Directive<T = any, V = any> = DirectiveOrigin<T, V>
  type DirectiveBinding<V = any> = DirectiveBindingOrigin<V>
  type EffectScope = EffectScopeOrigin
  type WritableComputedOptions<T> = WritableComputedOptionsOrigin<T>

  // # 其他
  // ## core/runtimeHelpers
  const Fragment: typeof FragmentOrigin
  const Teleport: typeof TeleportOrigin
  const Suspense: typeof SuspenseOrigin
  const KeepAlive: typeof KeepAliveOrigin
  const BaseTransition: typeof BaseTransitionOrigin
  const openBlock: typeof openBlockOrigin
  const createBlock: typeof createBlockOrigin
  const createElementBlock: typeof createElementBlockOrigin
  const createVNode: typeof createVNodeOrigin
  const createElementVNode: typeof createElementVNodeOrigin
  const createCommentVNode: typeof createCommentVNodeOrigin
  const createTextVNode: typeof createTextVNodeOrigin
  const createStaticVNode: typeof createStaticVNodeOrigin
  const resolveDynamicComponent: typeof resolveDynamicComponentOrigin
  const renderList: typeof renderListOrigin
  const renderSlot: typeof renderSlotOrigin
  const createSlots: typeof createSlotsOrigin
  const toDisplayString: typeof toDisplayStringOrigin
  const normalizeClass: typeof normalizeClassOrigin
  const normalizeStyle: typeof normalizeStyleOrigin
  const normalizeProps: typeof normalizePropsOrigin
  const guardReactiveProps: typeof guardReactivePropsOrigin
  const toHandlers: typeof toHandlersOrigin
  const camelize: typeof camelizeOrigin
  const capitalize: typeof capitalizeOrigin
  const toHandlerKey: typeof toHandlerKeyOrigin
  const setBlockTracking: typeof setBlockTrackingOrigin
  const pushScopeId: typeof pushScopeIdOrigin
  const popScopeId: typeof popScopeIdOrigin
  const withCtx: typeof withCtxOrigin

  const withMemo: typeof withMemoOrigin
  const isMemoSame: typeof isMemoSameOrigin

  // ## dom/runtimeHelpers
  const vShow: typeof vShowOrigin

  // ## 官方文档已不公开的
  const getCurrentInstance: typeof getCurrentInstanceOrigin

  // ## 编译阶段使用的类型
  type VNode = VNodeOrigin

  // 自定义
  const defineApp: typeof defineComponentOrigin
  const definePlugin: (plugin: Plugin) => Plugin

  // 简写
  const _cC: typeof createCommentVNodeOrigin
  const _cE: typeof createElementVNodeOrigin
  const _cV: typeof createVNodeOrigin
  const _tD: typeof toDisplayStringOrigin
  const _nC: typeof normalizeClassOrigin
  const _nS: typeof normalizeStyleOrigin
}
