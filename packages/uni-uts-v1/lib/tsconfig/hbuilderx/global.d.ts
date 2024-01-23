import {
  VueAppContext as VueAppContextOrigin,
  createAppContext as createAppContextOrigin,
  VueAppConfig as VueAppConfigOrigin,
  VueApp as VueAppOrigin,
  definePlugin as definePluginOrigin,
  defineComponent as defineComponentOrigin,
  defineMixin as defineMixinOrigin,
  createApp as createAppOrigin,
  createSSRApp as createSSRAppOrigin,
  withDirectives as withDirectivesOrigin,
  VNode as VNodeOrigin,
  guardReactiveProps as guardReactivePropsOrigin,
  createVNode as createVNodeOrigin,
  createElementVNode as createElementVNodeOrigin,
  createCommentVNode as createCommentVNodeOrigin,
  isVNode as isVNodeOrigin,
  queuePostFlushCb as queuePostFlushCbOrigin,
  watchEffect as watchEffectOrigin,
  watchPostEffect as watchPostEffectOrigin,
  watchSyncEffect as watchSyncEffectOrigin,
  watch as watchOrigin,
  provide as provideOrigin,
  inject as injectOrigin,
  currentInstance as currentInstanceOrigin,
  getCurrentInstance as getCurrentInstanceOrigin,
  CreateVueComponent as CreateVueComponentOrigin,
  CreateVueAppComponent as CreateVueAppComponentOrigin,
  VueAppComponent as VueAppComponentOrigin,
  VueComponent as VueComponentOrigin,
  ComponentInternalInstance as ComponentInternalInstanceOrigin,
  getComponentName as getComponentNameOrigin,
  withCtx as withCtxOrigin,
  render as renderOrigin,
  h as hOrigin,
  padStyleMapOf as padStyleMapOfOrigin,
  normalizeCssStyles as normalizeCssStylesOrigin,
  injectHook as injectHookOrigin,
  injectHookWithArg as injectHookWithArgOrigin,
  onBeforeCreate as onBeforeCreateOrigin,
  onCreated as onCreatedOrigin,
  onBeforeMount as onBeforeMountOrigin,
  onMounted as onMountedOrigin,
  onBeforeUpdate as onBeforeUpdateOrigin,
  onUpdated as onUpdatedOrigin,
  onBeforeUnmount as onBeforeUnmountOrigin,
  onUnmounted as onUnmountedOrigin,
  onErrorCaptured as onErrorCapturedOrigin,
  onRenderTracked as onRenderTrackedOrigin,
  onRenderTriggered as onRenderTriggeredOrigin,
  onActivated as onActivatedOrigin,
  onDeactivated as onDeactivatedOrigin,
  onServerPrefetch as onServerPrefetchOrigin,
  vShow as vShowOrigin,
  vModelDynamic as vModelDynamicOrigin,
  withModifiers as withModifiersOrigin,
  RenderHelpers as RenderHelpersOrigin,
  resolveComponent as resolveComponentOrigin,
  resolveEasyComponent as resolveEasyComponentOrigin,
  resolveDynamicComponent as resolveDynamicComponentOrigin,
  toHandlers as toHandlersOrigin,
  renderSlot as renderSlotOrigin,
  withMemo as withMemoOrigin,
  isMemoSame as isMemoSameOrigin,
  resolveCache as resolveCacheOrigin,
  normalizePropsOptions as normalizePropsOptionsOrigin,
  toDisplayString as toDisplayStringOrigin,
  Directive as DirectiveOrigin,
  WatchOptions as WatchOptionsOrigin,
  VueComponentOptions as VueComponentOptionsOrigin,
  ComponentPublicInstance as ComponentPublicInstanceOrigin,
  EffectScope as EffectScopeOrigin,
  ReactiveEffect as ReactiveEffectOrigin,
  WritableComputedOptions as WritableComputedOptionsOrigin,
  computed as computedOrigin,
  effect as effectOrigin,
  effectScope as effectScopeOrigin,
  getCurrentScope as getCurrentScopeOrigin,
  onScopeDispose as onScopeDisposeOrigin,
  WatchEffect as WatchEffectOrigin,
  Ref as RefOrigin,
  isReactive as isReactiveOrigin,
  isReadonly as isReadonlyOrigin,
  isRef as isRefOrigin,
  reactive as reactiveOrigin,
  ref as refOrigin,
  toRef as toRefOrigin,
  toRefs as toRefsOrigin,
  toValue as toValueOrigin,
  triggerRef as triggerRefOrigin,
  readonly as readonlyOrigin,
  shallowReactive as shallowReactiveOrigin,
  shallowRef as shallowRefOrigin,
  shallowReadonly as shallowReadonlyOrigin,
  stop as stopOrigin,
  toRaw as toRawOrigin,
  markRaw as markRawOrigin,
  unref as unrefOrigin,
  customRef as customRefOrigin,
  isProxy as isProxyOrigin,
  PropType as PropTypeOrigin,
  SlotsType as SlotsTypeOrigin,
  DebuggerEvent as DebuggerEventOrigin,
  OnCleanup as OnCleanupOrigin
} from 'vue'

declare global {
  const VueAppContext: typeof VueAppContextOrigin
  type VueAppContext = VueAppContextOrigin
  const createAppContext: typeof createAppContextOrigin
  const VueAppConfig: typeof VueAppConfigOrigin
  type VueAppConfig = VueAppConfigOrigin
  const VueApp: typeof VueAppOrigin
  type VueApp = VueAppOrigin
  const definePlugin: typeof definePluginOrigin
  const defineMixin: typeof defineMixinOrigin
  const defineComponent: typeof defineComponentOrigin
  const createApp: typeof createAppOrigin
  const createSSRApp: typeof createSSRAppOrigin
  const withDirectives: typeof withDirectivesOrigin
  const VNode: typeof VNodeOrigin
  type VNode = VNodeOrigin
  const guardReactiveProps: typeof guardReactivePropsOrigin
  const createVNode: typeof createVNodeOrigin
  const createElementVNode: typeof createElementVNodeOrigin
  const createCommentVNode: typeof createCommentVNodeOrigin
  const isVNode: typeof isVNodeOrigin
  const queuePostFlushCb: typeof queuePostFlushCbOrigin
  const watchEffect: typeof watchEffectOrigin
  const watchPostEffect: typeof watchPostEffectOrigin
  const watchSyncEffect: typeof watchSyncEffectOrigin
  const watch: typeof watchOrigin
  const provide: typeof provideOrigin
  const inject: typeof injectOrigin
  const currentInstance: typeof currentInstanceOrigin
  const getCurrentInstance: typeof getCurrentInstanceOrigin
  const CreateVueComponent: typeof CreateVueComponentOrigin
  type CreateVueComponent = CreateVueComponentOrigin
  const CreateVueAppComponent: typeof CreateVueAppComponentOrigin
  type CreateVueAppComponent = CreateVueAppComponentOrigin
  const VueAppComponent: typeof VueAppComponentOrigin
  type VueAppComponent = VueAppComponentOrigin
  const VueComponent: typeof VueComponentOrigin
  type VueComponent = VueComponentOrigin
  const ComponentInternalInstance: typeof ComponentInternalInstanceOrigin
  type ComponentInternalInstance = ComponentInternalInstanceOrigin
  const getComponentName: typeof getComponentNameOrigin
  const withCtx: typeof withCtxOrigin
  const render: typeof renderOrigin
  const h: typeof hOrigin
  const padStyleMapOf: typeof padStyleMapOfOrigin
  const normalizeCssStyles: typeof normalizeCssStylesOrigin
  const injectHook: typeof injectHookOrigin
  const injectHookWithArg: typeof injectHookWithArgOrigin
  const onBeforeCreate: typeof onBeforeCreateOrigin
  const onCreated: typeof onCreatedOrigin
  const onBeforeMount: typeof onBeforeMountOrigin
  const onMounted: typeof onMountedOrigin
  const onBeforeUpdate: typeof onBeforeUpdateOrigin
  const onUpdated: typeof onUpdatedOrigin
  const onBeforeUnmount: typeof onBeforeUnmountOrigin
  const onUnmounted: typeof onUnmountedOrigin
  const onErrorCaptured: typeof onErrorCapturedOrigin
  const onRenderTracked: typeof onRenderTrackedOrigin
  const onRenderTriggered: typeof onRenderTriggeredOrigin
  const onActivated: typeof onActivatedOrigin
  const onDeactivated: typeof onDeactivatedOrigin
  const onServerPrefetch: typeof onServerPrefetchOrigin
  const vShow: typeof vShowOrigin
  const vModelDynamic: typeof vModelDynamicOrigin
  const withModifiers: typeof withModifiersOrigin
  const RenderHelpers: typeof RenderHelpersOrigin
  type RenderHelpers = RenderHelpersOrigin
  const resolveComponent: typeof resolveComponentOrigin
  const resolveEasyComponent: typeof resolveEasyComponentOrigin
  const resolveDynamicComponent: typeof resolveDynamicComponentOrigin
  const toHandlers: typeof toHandlersOrigin
  const renderSlot: typeof renderSlotOrigin
  const withMemo: typeof withMemoOrigin
  const isMemoSame: typeof isMemoSameOrigin
  const resolveCache: typeof resolveCacheOrigin
  const normalizePropsOptions: typeof normalizePropsOptionsOrigin
  const toDisplayString: typeof toDisplayStringOrigin
  type Directive = DirectiveOrigin
  type WatchOptions = WatchOptionsOrigin
  type VueComponentOptions = VueComponentOptionsOrigin
  type ComponentPublicInstance = ComponentPublicInstanceOrigin
  type EffectScope = EffectScopeOrigin
  const EffectScope: typeof EffectScopeOrigin
  const ReactiveEffect: typeof ReactiveEffectOrigin
  type WritableComputedOptions<T> = WritableComputedOptionsOrigin<T>
  const computed: typeof computedOrigin
  const effect: typeof effectOrigin
  const effectScope = effectScopeOrigin
  const getCurrentScope = getCurrentScopeOrigin
  const onScopeDispose = onScopeDisposeOrigin
  type WatchEffect = WatchEffectOrigin
  type Ref<T> = RefOrigin<T>
  const isReactive: typeof isReactiveOrigin
  const isReadonly: typeof isReadonlyOrigin
  const isRef: typeof isRefOrigin
  const reactive: typeof reactiveOrigin
  const ref: typeof refOrigin
  const toRef: typeof toRefOrigin
  const toRefs: typeof toRefsOrigin
  const toValue: typeof toValueOrigin
  const triggerRef: typeof triggerRefOrigin
  const readonly: typeof readonlyOrigin
  const shallowReactive: typeof shallowReactiveOrigin
  const shallowRef: typeof shallowRefOrigin
  const shallowReadonly: typeof shallowReadonlyOrigin
  const stop: typeof stopOrigin
  const toRaw: typeof toRawOrigin
  const markRaw: typeof markRawOrigin
  const unref: typeof unrefOrigin
  const customRef: typeof customRefOrigin
  const isProxy: typeof isProxyOrigin
  type PropType<T> = PropTypeOrigin<T>
  type SlotsType<T> = SlotsTypeOrigin<T>
  type DebuggerEvent = DebuggerEventOrigin
  type OnCleanup = OnCleanupOrigin
}
