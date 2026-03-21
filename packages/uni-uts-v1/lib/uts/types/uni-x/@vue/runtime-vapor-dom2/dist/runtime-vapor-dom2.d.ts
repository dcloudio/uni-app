import { AppContext, ComponentInternalOptions, ComponentPropsOptions, ComponentPublicInstance, CreateAppFunction, EffectScope, EmitFn, EmitsOptions, GenericAppContext, GenericComponentInstance, LifecycleHook, NormalizedPropsOptions, ObjectEmitsOptions, SuspenseBoundary, defineComponent, defineComponent as defineVaporSharedDataComponent, ref, shallowRef } from "@vue/runtime-core";
import { hyphenate } from "@vue/shared";
import { EffectScope as EffectScope$1, Reactive, Ref, ShallowRef } from "@vue/reactivity";
import "@vue/compiler-core";
import "@vue/compiler-sfc";
import "@vue/compiler-dom";
import "@vue/compiler-vapor";
import { Element as Element$1 } from "@dcloudio/uni-app-x/types/native";
export * from "@vue/runtime-x";

//#region temp/packages/runtime-vapor-dom2/src/fragment.d.ts
declare class VaporFragment {
  nodes: Block;
  anchor?: Node;
  parentComponent?: VaporSharedDataComponentInstance | null;
  insert?: (parent: ParentNode, anchor: Node | null) => void;
  remove?: (parent?: ParentNode) => void;
  onUpdated?: ((nodes?: Block) => void)[];
  constructor(nodes: Block);
}
declare class DynamicFragment extends VaporFragment {
  scope: EffectScope$1 | undefined;
  current?: BlockFn$1;
  fallback?: BlockFn$1;
  getScope?: (key: any) => EffectScope$1 | undefined;
  slotOwner: VaporSharedDataComponentInstance | null;
  constructor(anchorLabel?: string);
  update(render?: BlockFn$1 | null, key?: any): void;
  private renderBranch;
}
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/block.d.ts
type Block = Node | VaporFragment | DynamicFragment | VaporSharedDataComponentInstance | Block[];
type BlockFn$1 = (...args: any[]) => void;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/componentProps.d.ts
type RawProps = Record<string, () => unknown> & {
  $?: DynamicPropsSource[];
};
type DynamicPropsSource = (() => Record<string, unknown>) | Record<string, () => unknown>;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/componentSlots.d.ts
type RawSlots = Record<string, VaporSlot$1> & {
  $?: DynamicSlotSource[];
};
type StaticSlots = Record<string, VaporSlot$1>;
type VaporSlot$1<T extends UniSharedData = any> = BlockFn$1 & {
  sharedDataVFor?: UniSharedDataVFor<T>;
};
type VaporScopedSlot<T extends UniSharedData = any> = ((slotProps: any, sharedData: T) => void) & {
  sharedDataVFor?: UniSharedDataVFor<T>;
};
type DynamicSlot$1 = {
  name: string;
  fn: VaporSlot$1;
};
type DynamicSlotFn = () => DynamicSlot$1 | DynamicSlot$1[];
export type DynamicSlotSource = StaticSlots | DynamicSlotFn;
/**
* Wrap a slot function to track the slot owner.
*
* This ensures:
* 1. createSlot gets rawSlots from the correct instance (slot owner)
* 2. elements inherit the slot owner's scopeId
*/
export declare function withSharedDataVaporCtx(fn: (...args: any[]) => any, type?: "string"): BlockFn$1;
export declare function createSharedDataSlot(name: string | (() => string), rawProps?: LooseRawProps | null, setSharedDataSlotProps?: ((data: UniSharedData) => void) | null, fallback?: VaporSlot$1, noSlotted?: boolean, once?: boolean): void;
export declare function createSharedDataScopedSlot<S extends UniSharedData>(sharedDataVFor: UniSharedDataVFor<S>, fn: VaporScopedSlot<S>): VaporScopedSlot<S>;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/component.d.ts
export type VaporSharedDataComponent = ObjectVaporSharedDataComponent & {
  __className?: string;
  externalClasses?: string[];
  styleIsolation?: "isolated" | "app" | "app-shared" | "app-and-page";
  rootElement?: {
    class?: string;
  };
};
type VaporSharedDataSetupFn = (props: any, ctx: Pick<VaporSharedDataComponentInstance, "slots" | "attrs" | "emit" | "expose" | "pageId">) => UniSharedData;
interface ObjectVaporSharedDataComponent extends ComponentInternalOptions, SharedInternalOptions {
  setup?: VaporSharedDataSetupFn;
  inheritAttrs?: boolean;
  props?: ComponentPropsOptions;
  emits?: EmitsOptions;
  render?(ctx: any, props?: any, emit?: EmitFn, attrs?: any, slots?: Record<string, VaporSlot$1>): Block;
  name?: string;
  vapor?: boolean;
}
interface SharedInternalOptions {
  /**
  * Cached normalized props options.
  * In vapor mode there are no mixins so normalized options can be cached
  * directly on the component
  */
  __propsOptions?: NormalizedPropsOptions;
  /**
  * Cached normalized props proxy handlers.
  */
  __propsHandlers?: [ProxyHandler<any> | null, ProxyHandler<any>];
  /**
  * Cached normalized emits options.
  */
  __emitsOptions?: ObjectEmitsOptions;
  /**
  * fixed by uts
  * Cached external classes options.
  */
  __externalClassesOptions?: string[];
}
type LooseRawProps = Record<string, (() => unknown) | DynamicPropsSource[]> & {
  $?: DynamicPropsSource[];
};
type LooseRawSlots = Record<string, VaporSlot$1 | DynamicSlotSource[]> & {
  $?: DynamicSlotSource[];
};
export declare function createSharedDataComponent<C = any, SharedData extends string = (C extends {
  __className: infer K extends string;
} ? `${K}SharedData` : string)>(definedComponent: C, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, isSingleRoot?: boolean, once?: boolean, appContext?: GenericAppContext): VaporSharedDataComponentInstance<SharedData>;
declare class VaporSharedDataComponentInstance<SharedData extends string = string> implements GenericComponentInstance {
  pageId?: number;
  sharedData: InferSharedData<SharedData, UniSharedDataComponent> | InferSharedData<SharedData, UniSharedDataPage>;
  component: UniSharedDataComponent;
  _sharedDataScope?: UniSharedDataPage;
  get sharedDataScope(): UniSharedDataPage;
  set sharedDataScope(scope: UniSharedDataPage);
  vapor: true;
  uid: number;
  type: VaporSharedDataComponent;
  root: VaporSharedDataComponentInstance | null;
  parent: VaporSharedDataComponentInstance | null;
  page: UniPage | null;
  appContext: GenericAppContext;
  block: Block;
  scope: EffectScope;
  rawProps: RawProps;
  rawSlots: RawSlots;
  props: Record<string, any>;
  attrs: Record<string, any>;
  propsDefaults: Record<string, any> | null;
  slots: StaticSlots;
  scopeId?: string | null;
  rawPropsRef?: ShallowRef<any>;
  rawSlotsRef?: ShallowRef<any>;
  emit: EmitFn;
  emitted: Record<string, boolean> | null;
  expose: (exposed: Record<string, any>) => void;
  exposed: Record<string, any> | null;
  exposeProxy: Record<string, any> | null;
  refs: Record<string, any>;
  provides: Record<string, any>;
  ids: [string, number, number];
  suspense: SuspenseBoundary | null;
  suspenseId: number;
  asyncDep: Promise<any> | null;
  asyncResolved: boolean;
  hasFallthrough: boolean;
  shapeFlag?: number;
  oncePropsCache?: Record<string | symbol, any>;
  isMounted: boolean;
  isUnmounted: boolean;
  isDeactivated: boolean;
  isUpdating: boolean;
  bc?: LifecycleHook;
  c?: LifecycleHook;
  bm?: LifecycleHook;
  m?: LifecycleHook;
  bu?: LifecycleHook;
  u?: LifecycleHook;
  um?: LifecycleHook;
  bum?: LifecycleHook;
  da?: LifecycleHook;
  a?: LifecycleHook;
  rtg?: LifecycleHook;
  rtc?: LifecycleHook;
  ec?: LifecycleHook;
  sp?: LifecycleHook<() => Promise<unknown>>;
  /**
  * fixed by uts
  * 页面 ready 之前收集到的 mounted 事件列表，包括自己和子组件的
  * 为了确保 mounted 事件在页面 ready 之前执行
  * 目前页面 ready 是 c 层 waitNativeRender 触发的
  * 如果在 mountComponent 的时候，把 mounted 放到 waitNativeRender 里执行，此时还没有任务，会导致执行过早
  * 如果放到 nextTick 或 queuePostFlushCb 里执行，又会导致执行过晚(比如页面 ready 之后才执行)
  * 所以简单起见先收集，等页面 ready 了，再统一执行
  * 另一个方案是 mounted 也由 c 层触发，但这样还要判断开发者是否监听了 mounted 事件，还牵扯多次跨语言通讯的问题
  * 所以采用方案1，简单处理
  */
  mountedJobs?: Array<() => void>;
  setupState?: Record<string, any>;
  devtoolsRawSetupState?: any;
  hmrRerender?: () => void;
  hmrReload?: (newComp: VaporSharedDataComponent) => void;
  propsOptions?: NormalizedPropsOptions;
  emitsOptions?: ObjectEmitsOptions | null;
  isSingleRoot?: boolean;
  /**
  * dev only flag to track whether $attrs was used during render.
  * If $attrs was used during render then the warning for failed attrs
  * fallthrough can be suppressed.
  */
  accessedAttrs: boolean;
  renderer: "app" | "page" | "component";
  private cachedCid;
  constructor(comp: VaporSharedDataComponent, rawProps?: RawProps | null, rawSlots?: RawSlots | null, appContext?: GenericAppContext, once?: boolean);
  /**
  * Expose `getKeysFromRawProps` on the instance so it can be used in code
  * paths where it's needed, e.g. `useModel`
  */
  rawKeys(): string[];
  $waitNativeRender(fn: () => void): void;
  get cid(): string;
}
export declare function isVaporSharedDataComponent(value: unknown): value is VaporSharedDataComponentInstance;
/**
* Used when a component cannot be resolved at compile time
* and needs rely on runtime resolution - where it might fallback to a plain
* element if the resolution fails.
*/
export declare function createSharedDataComponentWithFallback(comp: VaporSharedDataComponent | string | any, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, isSingleRoot?: boolean, once?: boolean, appContext?: GenericAppContext): VaporSharedDataComponentInstance | null;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/apiCreateApp.d.ts
export declare const createVaporApp: CreateAppFunction<ParentNode, VaporSharedDataComponent>;
export declare const createVaporSSRApp: CreateAppFunction<ParentNode, VaporSharedDataComponent>;
export declare const createApp: CreateAppFunction<ParentNode, VaporSharedDataComponent>;
//#endregion
//#region packages/runtime-vapor-dom2/src/block.d.ts
type BlockFn = (...args: any[]) => void;
//#endregion
//#region packages/runtime-vapor-dom2/src/componentSlots.d.ts
type VaporSlot<T extends UniSharedData = any> = BlockFn & {
  sharedDataVFor?: UniSharedDataVFor<T>;
};
type DynamicSlot = {
  name: string;
  fn: VaporSlot;
};
//#endregion
//#region packages/runtime-vapor-dom2/src/types/element.d.ts
declare global {
  type UniElementDynamicSlot = DynamicSlot;
}
//#endregion
//#region packages/runtime-vapor-dom2/src/types/nativeView.d.ts
declare global {
  type UniNativeViewDynamicSlot = DynamicSlot;
}
//#endregion
//#region temp/packages/compiler-vapor-dom2/src/style/processors/color.d.ts
export declare function toUniNativeColor(value: string | number, defaultValue?: number): number | undefined;
//#endregion
//#region temp/packages/compiler-vapor-dom2/src/style/processors/runtime/index.d.ts
export declare function toSharedDataStyle(style: Map<string, unknown>, result?: Record<number, unknown>, options?: {
  filename?: string | null;
}): Record<number, unknown>;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/apiMountPage.d.ts
export declare function createMountPage(appContext: AppContext): (pageComponent: ReturnType<typeof defineComponent> | VaporSharedDataComponent, pageProps: Record<string, any>, pageContainer?: Element$1) => ComponentPublicInstance;
export declare function unmountPage(pageInstance: ComponentPublicInstance): void;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/apiCreateIf.d.ts
export declare function createSharedDataIf(condition: () => any, b1: () => void, b2?: (() => void) | null, once?: boolean): void;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/apiCreateFor.d.ts
type ItemOf<S> = S extends readonly (infer T)[] ? T : S extends Reactive<readonly (infer T)[]> ? T : S extends Set<infer T> ? T : S extends Map<infer K, infer V> ? [K, V] : S extends string ? string : S extends number ? number : S extends Record<any, infer V> ? V : S extends Iterable<infer T> ? T : any;
type KeyOf<S> = S extends Record<any, any> ? string : number;
type IndexOfKey<K> = K extends string ? number : undefined;
export declare const createSharedDataFor: <S extends UniSharedData, Source>(sharedDataVFor: UniSharedDataVFor<S>, src: () => Source, renderItem: (shareDataVForItem: S, item: ShallowRef<ItemOf<Source>>, key: ShallowRef<KeyOf<Source>>, index: ShallowRef<number | undefined>) => VaporSharedDataComponentInstance | null, getKey?: (shareDataVForItem: S, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any, flags?: number, setup?: (_: {
  createSelector: (source: () => any) => (cb: () => void) => void;
}) => void) => void;
export declare function createSharedDataForSlots<S extends UniSharedData, Source>(sharedDataVFor: UniSharedDataVFor<S>, rawSource: Source, getSlot: (sharedData: S, item: ItemOf<Source>, key: KeyOf<Source>, index?: IndexOfKey<KeyOf<Source>>) => DynamicSlot$1): DynamicSlot$1[];
export declare function getSharedDataRestElement(val: any, keys: string[]): any;
export declare function getSharedDataDefaultValue(val: any, defaultVal: any): any;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/apiCreateRecycleFor.d.ts
export declare const preCreateSharedDataRecycleFor: <Source>(src: () => Source, getKey?: (item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any) => (() => Source);
declare class RecycleContext {}
export declare function createRecycleContext(): RecycleContext;
export declare const createSharedDataRecycleFor: <S extends UniSharedData, Source>(recycleContext: RecycleContext, sharedDataVFor: UniSharedDataVFor<S>, src: () => Source, renderItem: (shareDataVForItem: S, item: ShallowRef<ItemOf<Source>>, key: ShallowRef<KeyOf<Source>>, index: ShallowRef<number | undefined>) => VaporSharedDataComponentInstance | null, getKey?: (shareDataVForItem: S, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any, getType?: (shareDataVForItem: S, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any, flags?: number, setup?: (_: {
  createSelector: (source: () => any) => (cb: () => void) => void;
}) => void) => void;
/**
* list-item内的组件在进入等待复用状态时不会触发onUnmount钩子
* 复用时如果需要移除此时会触发onUnmount钩子
*/
export declare function useRecycleState<T>(getState: () => T): Ref<T>;
declare function onReused(callback: () => void): void;
declare function onBeforeRecycle(callback: () => void): void;
export declare const onRecycle: typeof onBeforeRecycle;
export declare const onReuse: typeof onReused;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/apiTemplateRef.d.ts
type NodeRef = string | Ref | ((ref: Element) => void);
type RefEl = UniElement | VaporSharedDataComponentInstance | DynamicFragment | VaporFragment;
type setRefFn = (el: RefEl | null, ref: NodeRef, refFor?: boolean | null, refKey?: string | null) => NodeRef | undefined;
export declare function createSharedDataTemplateRefSetter(): setRefFn;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/apiCreateDynamicComponent.d.ts
export declare function createSharedDataDynamicComponent(getter: () => any, setter: (ins: VaporSharedDataComponentInstance | null) => any, rawProps?: RawProps | null, rawSlots?: RawSlots | null, isSingleRoot?: boolean, once?: boolean): VaporSharedDataComponentInstance | null;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/apiCreateFragment.d.ts
/**
* Create a dynamic fragment keyed by a reactive value for Vapor transitions.
* The fragment is re-rendered when the key changes to trigger enter/leave
* animations.
*
* Example:
* <VaporTransition>
*   <h1 :key="count">{{ count }}</h1>
* </VaporTransition>
*/
export declare function createSharedDataKeyedFragment(key: () => any, render: BlockFn$1): Block;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/apiUseComputedStyle.d.ts
type UseComputedStyleOptions = {
  /**
  * 需要监听的样式属性列表
  */
  properties: string[];
  /**
  * 是否从原根节点过滤 properties 中的属性，默认过滤
  * @default true
  */
  filterProperties?: boolean | null;
};
export declare function useComputedStyle(options: UseComputedStyleOptions): Map<string, any | null>;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/renderEffect.d.ts
export declare function renderSharedDataEffect(fn: () => void, noLifecycle?: boolean): void;
export declare function nextSharedDataTick(fn: () => void): Promise<void>;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/sharedData/index.d.ts
export declare function setSharedData<S extends UniSharedData, V>(sharedData: S, key: string, value: V): V;
export declare function setSharedDataDynamicProps<S extends UniSharedData>(sharedData: S, key: string, value: any[]): UniSharedDataJSONObject;
export declare function setSharedDataDynamicEvents<S extends UniSharedData>(sharedData: S, key: string, events: Record<string, (...args: any[]) => any>): UniSharedDataJSONObject;
export declare function setSharedDataClass<S extends UniSharedData, V>(sharedData: S, key: string, value: V): string[];
export declare function setSharedDataStyle<S extends UniSharedData, V>(sharedData: S, key: string, value: V): UniElementStyles;
export declare function setSharedDataAttr<S extends UniSharedData, V>(sharedData: S, key: string, value: V): V;
export declare function setSharedDataEvent<S extends UniSharedData>(sharedData: S, key: string, value: UniSharedDataFunctionEventListener): UniSharedDataFunctionEventListener;
export declare function setSharedDataModel<S extends UniSharedData, V>(sharedData: S, key: string, get: () => V, set: (v: V) => void, modifiers?: {
  [key: string]: true;
}): UniSharedDataFunctionEventListener;
export declare function setSharedDataTemplateRef<S extends UniSharedData>(sharedData: S, key: string, value: UniSharedDataFunctionSetTemplateRef): UniSharedDataFunctionSetTemplateRef;
export declare function toSharedDataBoolean(value: any | null): boolean;
export declare function toSharedDataAttrBoolean(value: any | null, defaultValue?: boolean): boolean;
export declare function toSharedDataNumber(value: any | null): number;
export declare function toSharedDataString(value: any | null): string;
export declare function toSharedDataColor(value: any | null): number;
export declare function createSharedDataVFor<T extends UniSharedData>(scope: UniSharedDataPage, create: () => T): UniSharedDataVFor<T>;
export declare const createSharedDataVSlot: typeof createSharedDataVFor;
interface WithSharedDataComponentOptions {
  scriptCpp?: boolean;
}
export declare function useSharedDataRenderer(): "app" | "page" | "component";
export declare function withSharedDataPage<T extends UniSharedDataPage>(sharedData: T, options?: WithSharedDataComponentOptions | null): T;
export declare function withSharedDataComponent<T extends UniSharedDataComponent>(sharedData: T, options?: WithSharedDataComponentOptions | null): T;
/**
* 仅限页面 renderSharedData 紧跟着 useSharedDataPage 使用，用于及时给页面示例挂靠 sharedDataScope
* 这样组件 create 的时候，就可以及时获取到sharedDataScope
* @param scope
* @returns
*/
export declare function useSharedDataScope<T extends UniSharedDataPage>(scope?: T): T;
export declare function useSharedDataPageId(): number;
declare enum UniSharedDataComponentStyleIsolation {
  Isolated = 0,
  App = 1,
  AppAndPage = 2
}
declare enum UniSharedDataComponentRenderer {
  Component = 0,
  Page = 1
}
declare enum UniSharedDataComponentFlatten {
  None = 0,
  True = 1,
  False = 2
}
interface UniSharedDataComponentOptions {
  vueId: number;
  styleIsolation: UniSharedDataComponentStyleIsolation;
  renderer: UniSharedDataComponentRenderer;
  flatten: UniSharedDataComponentFlatten;
}
export declare function useSharedDataPageOptions(): UniSharedDataComponentOptions;
export declare function useSharedDataComponentOptions(): UniSharedDataComponentOptions;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/sharedData/enum/global.d.ts
/**
* 将字符串值转换为 UniSlotType 枚举类型
* @param value - 字符串值
* @returns UniSlotType 枚举值
*/
export declare function toSharedDataGlobalSlot(value: string): UniSlotType;
export declare const toSharedDataViewSlot: (value: string) => UniSlotType;
export declare const toSharedDataTextSlot: (value: string) => UniSlotType;
export declare const toSharedDataImageSlot: (value: string) => UniSlotType;
export declare const toSharedDataScrollViewSlot: (value: string) => UniSlotType;
export declare const toSharedDataNativeViewSlot: (value: string) => UniSlotType;
export declare const toSharedDataNestedScrollHeaderSlot: (value: string) => UniSlotType;
export declare const toSharedDataNestedScrollBodySlot: (value: string) => UniSlotType;
export declare const toSharedDataRichTextNativeSlot: (value: string) => UniSlotType;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/sharedData/enum/image.d.ts
/**
* 将字符串值转换为 UniImageModeType 枚举类型
* @param value - 字符串值
* @returns UniImageModeType 枚举值
*/
export declare function toSharedDataImageMode(value: string): UniImageModeType;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/sharedData/enum/scroll-view.d.ts
/**
* 将字符串值转换为 UniNativeScrollViewDirectionType 枚举类型
* @param value - 字符串值
* @returns UniNativeScrollViewDirectionType 枚举值
*/
export declare function toSharedDataScrollViewDirection(value: string): UniNativeScrollViewDirectionType;
/**
* 将字符串值转换为 UniNativeScrollViewRefresherStyleType 枚举类型
* @param value - 字符串值
* @returns UniNativeScrollViewRefresherStyleType 枚举值
*/
export declare function toSharedDataScrollViewRefresherDefaultStyle(value: string): UniNativeScrollViewRefresherStyleType;
/**
* 将字符串值转换为 UniNativeScrollViewType 枚举类型
* @param value - 字符串值
* @returns UniNativeScrollViewType 枚举值
*/
export declare function toSharedDataScrollViewType(value: string): UniNativeScrollViewType;
/**
* 将字符串值转换为 UniNativeScrollViewAssociativeContainerType 枚举类型
* @param value - 字符串值
* @returns UniNativeScrollViewAssociativeContainerType 枚举值
*/
export declare function toSharedDataScrollViewAssociativeContainer(value: string): UniNativeScrollViewAssociativeContainerType;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/types/element.d.ts
export declare function getCurrentElementVaporComponentInstance(): VaporSharedDataComponentInstance | null;
type TemplateFactory = (page: UniPage) => UniElement & {
  $root?: true;
};
export declare function elementFactory(page: UniPage, factory: TemplateFactory, root?: boolean): () => UniElement;
export declare function renderElementEffect(fn: (first: boolean) => void, noLifecycle?: boolean): void;
export declare function nextElement(node: UniElement): UniElement;
export declare function nthChildElement(node: UniElement, i: number): UniElement;
export declare function childElement(node: UniElement): UniElement;
export declare function createElementComponent<S extends UniSharedDataComponent>(sharedData?: S | null, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, isSingleRoot?: boolean | null, appContext?: GenericAppContext): VaporSharedDataComponentInstance;
export declare function createElementComponentWithFallback<S extends UniSharedDataComponent>(page: UniPage, sharedData?: S | null, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, isSingleRoot?: boolean): VaporSharedDataComponentInstance;
export declare function createElementDynamicComponent(page: UniPage, getter: () => any, rawProps?: RawProps | null, rawSlots?: RawSlots | null, isSingleRoot?: boolean): VaporFragment;
export declare function withElementVaporCtx(fn: Function): BlockFn$1;
export declare function createElementSlot(page: UniPage, name: string | (() => string), getSlotProps?: (() => UniSharedData | null) | null, fallback?: VaporSlot$1): Block;
export declare function createElementFor<Source extends UniSharedData>(page: UniPage, src: () => UniSharedDataVFor<Source> | string | number, renderItem: (shareDataVForItem: Source, item: ItemOf<Source>, key: KeyOf<Source>, index: number | undefined) => void, getKey?: ((shareDataVForItem: Source, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any) | null, flags?: number, setup?: (_: {
  createSelector: (source: () => any) => (cb: () => void) => void;
}) => void): VaporFragment;
export declare function createElementRecycleFor<Source extends UniSharedData>(page: UniPage, recycleContext: ElementRecycleContext, src: () => UniSharedDataVFor<Source>, renderItem: (shareDataVForItem: Source, item: ShallowRef<ItemOf<Source>>, key: ShallowRef<KeyOf<Source>>, index: ShallowRef<number | undefined>) => void, getKey?: ((shareDataVForItem: Source, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any) | null, getType?: ((shareDataVForItem: Source, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any) | null, flags?: number, setup?: (_: {
  createSelector: (source: () => any) => (cb: () => void) => void;
}) => void): VaporFragment;
export declare class ElementRecycleContext {}
export declare function createElementRecycleContext(): ElementRecycleContext;
export declare function createElementForSlots<Source extends UniSharedData>(rawSource: UniSharedDataVFor<Source>, getSlot: (shareDataVForItem: Source, key: KeyOf<Source>, index?: number) => DynamicSlot$1): DynamicSlot$1[];
declare global {
  type UniElementDynamicSlot = DynamicSlot$1;
}
export declare function createElementDynamicSlot(name: string, fn: VaporSlot$1): DynamicSlot$1;
export declare function createElementIf(page: UniPage, condition: () => any, b1: BlockFn$1, b2?: BlockFn$1 | null, once?: boolean): Block;
export declare function setElementText(el: UniElement | UniText | null, value: string): void;
export declare function setElementHtml(el: UniElement, value: string): void;
export declare function setElementAttr(el: UniElement, key: string, value: any): void;
export declare function setElementClass(component: UniSharedDataComponent, el: UniElement, value: any): void;
export declare function setElementHoverClass(component: UniSharedDataComponent, el: UniElement, value: any): void;
export declare function setElementStyle(component: UniSharedDataComponent, el: UniElement, value: UniElementStyles): void;
export declare function setElementExtStyle(el: UniElement, value: unknown): void;
export declare function setElementDynamicProps(component: UniSharedDataComponent, el: UniElement, args: UniSharedDataJSONObject): void;
export declare function setElementDynamicEvents(el: UniElement, args: UniSharedDataJSONObject): void;
type setElementRefFn = (el: UniElement, refId: number, refFor?: boolean) => void;
export declare function createElementTemplateRefSetter(): setElementRefFn;
export declare function applyElementTextModel(el: UniElement, get: () => any, listener: UniSharedDataFunctionEventListener, options?: {
  trim?: true;
  number?: true;
  lazy?: true;
}): void;
export declare function applyElementDynamicModel(el: UniElement, get: () => any, listener: UniSharedDataFunctionEventListener, options?: {
  trim?: true;
  number?: true;
  lazy?: true;
}): void;
export declare function applyElementVShow(target: UniElement, source: () => boolean): void;
export declare function setElementInsertionState(parent: UniElement, anchor?: UniElement | 0 | null | number, last?: boolean): void;
export declare function getElementInsertionParent(): UniElement | null;
export declare function onElement(node: UniElement, event: string, fn: (event: UniEvent) => void, options?: AddEventListenerOptions & {
  effect?: boolean;
  stop?: boolean;
}): void;
export declare function onElementRef(node: UniElement, fn: Function): void;
export declare function createElementDynamicSlotVector(slots: any | null): any | null;
export declare function createElementKeyedFragment(page: UniPage, key: () => string, render: BlockFn$1): Block;
export declare function createElementScopedSlot<S extends UniSharedData>(sharedDataVFor: UniSharedDataVFor<S>, fn: VaporSlot$1): VaporSlot$1;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/types/nativeView.d.ts
export declare function getCurrentNativeViewVaporComponentInstance(): VaporSharedDataComponentInstance | null;
type NativeViewFactory = (page: UniPage) => UniNativeBaseView & {
  $root?: true;
};
type NativeViewArrayFactory = (page: UniPage) => UniNativeBaseViewArray;
export declare function nativeViewFactory(page: UniPage, factory: NativeViewFactory, root?: boolean): () => UniNativeBaseView;
export declare function nativeViewFactory(page: UniPage, factory: NativeViewArrayFactory, root?: boolean): () => UniNativeBaseViewArray;
export declare function renderNativeViewEffect(fn: (first: boolean) => void, noLifecycle?: boolean): void;
export declare function nextNativeView(node: UniNativeBaseView): UniNativeBaseView;
export declare function nthChildNativeView(node: UniNativeBaseView, i: number): UniNativeBaseView;
export declare function childNativeView(node: UniNativeBaseView): UniNativeBaseView;
/**
* 因为nativeView本身并没有提供树状结构，需要内部通过ext存储子元素的树形结构，然后next，child，nthChild等API从ext中获取
* @param node
* @param child
*/
export declare function appendNativeViewChild(node: UniNativeBaseView, child: UniNativeBaseView | null): void;
export declare function createNativeViewFor<Source extends UniSharedData>(page: UniPage, src: () => UniSharedDataVFor<Source> | string | number, renderItem: (shareDataVForItem: Source, item: ItemOf<Source>, key: KeyOf<Source>, index: number | undefined) => void, getKey?: ((shareDataVForItem: Source, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any) | null, flags?: number, setup?: (_: {
  createSelector: (source: () => any) => (cb: () => void) => void;
}) => void): VaporFragment;
export declare function createNativeViewRecycleFor<Source extends UniSharedData>(page: UniPage, recycleContext: NativeViewRecycleContext, src: () => UniSharedDataVFor<Source>, renderItem: (shareDataVForItem: Source, item: ShallowRef<ItemOf<Source>>, key: ShallowRef<KeyOf<Source>>, index: ShallowRef<number | undefined>) => void, getKey?: ((shareDataVForItem: Source, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any) | null, getType?: ((shareDataVForItem: Source, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any) | null, flags?: number, setup?: (_: {
  createSelector: (source: () => any) => (cb: () => void) => void;
}) => void): VaporFragment;
export declare class NativeViewRecycleContext {}
export declare function createNativeViewRecycleContext(): NativeViewRecycleContext;
export declare function createNativeViewIf(page: UniPage, condition: () => any, b1: BlockFn$1, b2?: BlockFn$1 | null, once?: boolean): Block;
export declare function setNativeViewAttr(el: UniNativeBaseView, key: string, value: any): void;
export declare function setNativeViewInsertionState(parent: UniNativeBaseView, anchor?: UniNativeBaseView | 0 | null | number, last?: boolean): void;
export declare function getNativeViewInsertionParent(): UniNativeBaseView | null;
export declare function createNativeViewComponent<S extends UniSharedDataComponent>(sharedData?: S | null, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, isSingleRoot?: boolean | null, appContext?: GenericAppContext): VaporSharedDataComponentInstance;
export declare function createNativeViewComponentWithFallback<S extends UniSharedDataComponent>(page: UniPage, sharedData?: S | null, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, isSingleRoot?: boolean): VaporSharedDataComponentInstance;
export declare function createNativeViewDynamicComponent(page: UniPage, getter: () => any, rawProps?: RawProps | null, rawSlots?: RawSlots | null, isSingleRoot?: boolean): VaporFragment;
export declare function setNativeViewDynamicProps(component: UniSharedDataComponent, view: UniNativeBaseView, args: UniSharedDataJSONObject): void;
export declare function withNativeViewVaporCtx(fn: Function): BlockFn$1;
export declare function createNativeViewSlot(page: UniPage, name: string | (() => string), getSlotProps?: (() => UniSharedData | null) | null, fallback?: VaporSlot$1): Block;
export declare function createNativeViewForSlots<Source extends UniSharedData>(rawSource: UniSharedDataVFor<Source>, getSlot: (shareDataVForItem: Source, key: KeyOf<Source>, index?: number) => DynamicSlot$1): DynamicSlot$1[];
declare global {
  type UniNativeViewDynamicSlot = DynamicSlot$1;
}
export declare function createNativeViewDynamicSlot(name: string, fn: VaporSlot$1): DynamicSlot$1;
export declare function createNativeViewDynamicSlotVector(slots: any | null): any | null;
export declare function createNativeViewKeyedFragment(page: UniPage, key: () => string, render: BlockFn$1): Block;
export declare function createNativeViewScopedSlot<S extends UniSharedData>(sharedDataVForGetter: () => UniSharedDataVFor<S>, fn: VaporSlot$1): VaporSlot$1;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/types/index.d.ts
export declare function runOnMainQueue(fn: () => void): void;
export declare function createUserClass<T>(): T;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/registry.d.ts
/**
* 根据 uid 查找 Vue 实例
* 主要用于 root element 通过 uid 获取对应的 vue 实例，以访问组件数据和方法
* 1. 内置组件的 Element 暴露的属性方法需要访问组件实例
* 2. 自动化测试框架需要通过 Element 获取组件实例，以访问组件数据和方法
* @param uid
* @returns
*/
export declare function findVueInstanceByUid(uid: number): VaporSharedDataComponentInstance | null;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/dynamic/bridge/adapterContracts.d.ts
export interface IUniDynamicSharedData {
  getField(fieldId: number): unknown;
  getFlag(flagGroupId: number): number;
}
export interface IUniDynamicSharedDataComponent extends IUniDynamicSharedData {
  getVueId?(): number;
  getFlatten?(): unknown;
  getRenderer?(): unknown;
}
export interface IUniDynamicSharedDataPage extends IUniDynamicSharedDataComponent {}
export interface DynamicVmBlockInvokeOptions {
  args?: unknown[];
  sharedDataInstance?: IUniDynamicSharedData | null;
}
export interface DynamicVmBlockHandle {
  invoke(options?: DynamicVmBlockInvokeOptions): unknown;
}
export interface DynamicRuntimeAdapter<NodeRef = unknown> {
  instantiateTemplate?(templateId: number): NodeRef;
  child?(node: NodeRef): NodeRef;
  next?(node: NodeRef): NodeRef;
  nthChild?(node: NodeRef, index: number): NodeRef;
  setInsertionState?(node: NodeRef, anchor: NodeRef | null, last: boolean): void;
  createFor?(source: unknown, renderBlock: DynamicVmBlockHandle, keyBlock?: DynamicVmBlockHandle | null): NodeRef;
  createRecycleFor?(source: unknown, renderBlock: DynamicVmBlockHandle, keyBlock?: DynamicVmBlockHandle | null, typeBlock?: DynamicVmBlockHandle | null): NodeRef;
  createComponent?(source: unknown): NodeRef;
  createComponentFallback?(source: unknown): NodeRef;
  createDynamicComponent?(source: unknown): NodeRef;
  createSlot?(node: NodeRef, slotName: unknown, blockValue: unknown): void;
  createDynamicSlot?(node: NodeRef, slotName: unknown, blockValue: unknown): void;
  createForSlots?(node: NodeRef, source: unknown, renderBlock: DynamicVmBlockHandle): void;
  createDynamicSlotVector?(node: NodeRef): void;
  createKeyedFragment?(key: unknown, blockValue: unknown): NodeRef;
  setProp?(node: NodeRef, propName: unknown, args: unknown[]): void;
  setDynamicProps?(node: NodeRef, value: unknown): void;
  setText?(node: NodeRef, value: unknown): void;
  setEvent?(node: NodeRef, eventName: unknown, handler: unknown, options: unknown): void;
  setDynamicEvents?(node: NodeRef, value: unknown): void;
  setTemplateRef?(node: NodeRef, value: unknown): void;
  applyVShow?(node: NodeRef, value: unknown): void;
}
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/dynamic/vm/types.d.ts
export interface DynamicVmInstruction {
  op: number;
  a: number;
  b: number;
  c: number;
}
export type DynamicVmTemplateCreateKind = "viewElement" | "textElement" | "imageElement" | "scrollViewElement" | "nativeViewElement" | "nestedScrollHeaderElement" | "nestedScrollBodyElement" | "richTextNativeElement" | "nativeView" | "nativeTextView" | "nativeImageView" | "nativeScrollView" | "nativeCustomView" | "nativeNestedScrollHeaderView" | "nativeNestedScrollBodyView" | "nativeRichTextNativeView" | "textNode" | "commentNode" | "anchorNode";
export type DynamicVmTemplateFlattenMode = "staticFalse" | "staticTrue" | "mainSharedDataFlatten" | "mainSharedDataFlattenDefaultTrue";
export interface DynamicVmTemplateCreateNodeOp {
  kind: "createNode";
  nodeId: string;
  create: DynamicVmTemplateCreateKind;
  flatten: DynamicVmTemplateFlattenMode;
}
export interface DynamicVmTemplateAppendChildOp {
  kind: "appendChild";
  parentNodeId: string;
  childNodeId: string;
}
export interface DynamicVmTemplateSetTextLiteralOp {
  kind: "setTextLiteral";
  nodeId: string;
  value: string;
}
export interface DynamicVmTemplateSetVueComponentIdOp {
  kind: "setVueComponentId";
  nodeId: string;
}
export interface DynamicVmTemplateEnumRefValue {
  kind: "enumRef";
  owner: string;
  member: string;
}
export interface DynamicVmTemplateStaticArrayValue {
  kind: "array";
  items: DynamicVmTemplateStaticValue[];
}
export interface DynamicVmTemplateStaticObjectEntry {
  key: DynamicVmTemplateStaticValue;
  value: DynamicVmTemplateStaticValue;
}
export interface DynamicVmTemplateStaticObjectValue {
  kind: "object";
  entries: DynamicVmTemplateStaticObjectEntry[];
}
export type DynamicVmTemplateStaticCallable = string | DynamicVmTemplateEnumRefValue;
export interface DynamicVmTemplateStaticCallValue {
  kind: "call";
  callee: DynamicVmTemplateStaticCallable;
  args: DynamicVmTemplateStaticValue[];
}
export interface DynamicVmTemplateStaticNewValue {
  kind: "new";
  callee: string;
  args: DynamicVmTemplateStaticValue[];
}
export type DynamicVmTemplateStaticValue = string | number | boolean | null | undefined | DynamicVmTemplateEnumRefValue | DynamicVmTemplateStaticArrayValue | DynamicVmTemplateStaticObjectValue | DynamicVmTemplateStaticCallValue | DynamicVmTemplateStaticNewValue;
export interface DynamicVmTemplateSetStaticPropOp {
  kind: "setStaticProp";
  nodeId: string;
  method: string;
  args: DynamicVmTemplateStaticValue[];
}
export interface DynamicVmTemplateIncreaseNativeViewCounterOp {
  kind: "increaseNativeViewCounter";
  count: number;
}
export type DynamicVmTemplateFactoryOp = DynamicVmTemplateCreateNodeOp | DynamicVmTemplateAppendChildOp | DynamicVmTemplateSetTextLiteralOp | DynamicVmTemplateSetVueComponentIdOp | DynamicVmTemplateSetStaticPropOp | DynamicVmTemplateIncreaseNativeViewCounterOp;
export interface DynamicVmTemplateFactory {
  templateId: number;
  renderer: string;
  factoryName: string;
  rootNodeIds: string[];
  supported: boolean;
  unsupportedReason?: string;
  ops: DynamicVmTemplateFactoryOp[];
}
export interface DynamicVmBlockEffect {
  blockId: number;
  instructions: DynamicVmInstruction[];
}
export interface DynamicVmSharedField {
  fieldId: number;
  sharedDataClassId: number;
  valueTag: number;
  nullable: boolean;
  flagGroup: number;
  flagBit: number;
}
export interface DynamicVmSharedDataClassMeta {
  sharedDataClassId: number;
  classKind: number;
  firstFieldId: number;
  fieldCount: number;
}
export interface DynamicVmSharedSchema {
  classCount: number;
  fieldCount: number;
  flagGroupCount: number;
  classes: DynamicVmSharedDataClassMeta[];
  fields: DynamicVmSharedField[];
}
export interface DynamicVmProgram {
  id: string;
  engine: number;
  renderer: number;
  regCount: number;
  constPool: unknown[];
  instructions: DynamicVmInstruction[];
  effectInstructions: DynamicVmInstruction[];
  blockEffects?: DynamicVmBlockEffect[];
}
export interface DynamicVmBundle {
  sharedSchema?: DynamicVmSharedSchema;
  templates?: DynamicVmTemplateFactory[];
  programs: DynamicVmProgram[];
}
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/dynamic/artifacts/index.d.ts
export type DynamicRuntimeArtifactBundleKind = "cpp" | "kt";
export type DynamicRuntimeArtifactFileKind = "bin" | "decoded" | "manifest";
export interface DynamicRuntimeArtifactManifestBundle {
  kind: DynamicRuntimeArtifactBundleKind;
  file: string;
  decodedFile?: string;
  programCount: number;
  renderers: number[];
  engines: number[];
}
export interface DynamicRuntimeArtifactManifest {
  version: 1;
  schemaVersion: number;
  bundles: DynamicRuntimeArtifactManifestBundle[];
}
export interface DynamicRuntimeArtifactFile {
  bundleKind?: DynamicRuntimeArtifactBundleKind;
  fileKind: DynamicRuntimeArtifactFileKind;
  fileName: string;
  content: Uint8Array | string;
}
export interface DynamicRuntimeArtifactResolvedBundle {
  manifest: DynamicRuntimeArtifactManifestBundle;
  bytes: Uint8Array;
  decodedJson?: string;
  parsed: DynamicVmBundle;
}
export interface DynamicRuntimeArtifactBundleLoader {
  manifest: DynamicRuntimeArtifactManifest;
  files: ReadonlyMap<string, Uint8Array | string>;
  bundles: DynamicRuntimeArtifactResolvedBundle[];
  listBundles(): DynamicRuntimeArtifactResolvedBundle[];
  hasBundle(kind: DynamicRuntimeArtifactBundleKind): boolean;
  bundle(kind: DynamicRuntimeArtifactBundleKind): DynamicRuntimeArtifactResolvedBundle | undefined;
  requireBundle(kind: DynamicRuntimeArtifactBundleKind): DynamicRuntimeArtifactResolvedBundle;
  hasRenderer(renderer: number): boolean;
  bundleForRenderer(renderer: number): DynamicRuntimeArtifactResolvedBundle | undefined;
  requireBundleForRenderer(renderer: number): DynamicRuntimeArtifactResolvedBundle;
}
export declare function createDynamicRuntimeArtifactFileMap(files: readonly DynamicRuntimeArtifactFile[]): ReadonlyMap<string, Uint8Array | string>;
export declare function createDynamicRuntimeArtifactBundleLoader(manifest: DynamicRuntimeArtifactManifest, files: readonly DynamicRuntimeArtifactFile[] | ReadonlyMap<string, Uint8Array | string>): DynamicRuntimeArtifactBundleLoader;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/dynamic/vm/templateFactoryResolver.d.ts
type DynamicVmTemplateFactoryResolver = (templateId: number, renderer: number) => DynamicVmTemplateFactory | undefined;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/dynamic/vm/interpreter.d.ts
type DynamicNodeRef = unknown;
export interface DynamicVmExecuteOptions {
  constResolver?: (constIndex: number) => unknown;
  sharedDataInstance?: IUniDynamicSharedData;
  templateFactories?: DynamicVmTemplateFactory[];
  templateFactoryResolver?: DynamicVmTemplateFactoryResolver;
  initialRegisters?: unknown[];
  initialEffectFrames?: DynamicVmEffectFrame[];
  runtimeAdapter?: DynamicRuntimeAdapter<DynamicNodeRef>;
  onUnsupportedOpcode?: (instruction: DynamicVmInstruction) => void;
}
export interface DynamicVmEffectFrame {
  instructions: DynamicVmInstruction[];
  registers: unknown[];
  sharedDataInstance?: IUniDynamicSharedData;
}
export interface DynamicVmExecuteResult {
  returnValue: unknown;
  registers: unknown[];
  effectFrames: DynamicVmEffectFrame[];
}
export declare function executeDynamicVmProgram(program: DynamicVmProgram, options?: DynamicVmExecuteOptions): DynamicVmExecuteResult;
export declare function executeDynamicVmEffectProgram(program: DynamicVmProgram, options?: DynamicVmExecuteOptions): DynamicVmExecuteResult;
//#endregion
//#region temp/packages/runtime-vapor-dom2/interpreters/cpp/contracts/templateBridge.d.ts
export type CppTemplateOpKind = "CREATE_NODE" | "APPEND_CHILD" | "SET_TEXT_LITERAL" | "SET_VUE_COMPONENT_ID" | "SET_STATIC_PROP" | "INCREASE_NATIVE_VIEW_COUNTER";
export interface CppTemplateStaticPropContract {
  method: string;
  args: CppTemplateStaticValue[];
}
export interface CppTemplateNodeContract {
  templateId: number;
  nodeId: string;
  create: string;
  flatten: string;
  text?: string;
  vueComponentIdFromSharedData?: boolean;
  staticProps: CppTemplateStaticPropContract[];
  children: CppTemplateNodeContract[];
}
export interface CppTemplateOpContract {
  kind: CppTemplateOpKind;
  nodeId?: string;
  parentNodeId?: string;
  childNodeId?: string;
  create?: string;
  flatten?: string;
  method?: string;
  args?: CppTemplateStaticValue[];
  textValue?: string;
  count?: number;
}
export interface CppTemplateFactoryContract {
  templateId: number;
  renderer: string;
  factoryName: string;
  rootNodeIds: string[];
  supported: boolean;
  unsupportedReason?: string;
  ops: CppTemplateOpContract[];
}
export type CppTemplateStaticValue = string | number | boolean | null | undefined | {
  kind: "enumRef";
  owner: string;
  member: string;
} | {
  kind: "array";
  items: CppTemplateStaticValue[];
} | {
  kind: "object";
  entries: Array<{
    key: CppTemplateStaticValue;
    value: CppTemplateStaticValue;
  }>;
} | {
  kind: "call";
  callee: string | {
    kind: "enumRef";
    owner: string;
    member: string;
  };
  args: CppTemplateStaticValue[];
} | {
  kind: "new";
  callee: string;
  args: CppTemplateStaticValue[];
};
export declare function bridgeCppTemplateFactories(templates: DynamicVmTemplateFactory[] | undefined): CppTemplateFactoryContract[];
export declare function bridgeCppTemplateFactory(template: DynamicVmTemplateFactory): CppTemplateFactoryContract;
//#endregion
//#region temp/packages/runtime-vapor-dom2/interpreters/cpp/contracts/bundleBridge.d.ts
export interface CppVmInstructionContract {
  op: number;
  a: number;
  b: number;
  c: number;
}
export interface CppVmBlockEffectContract {
  blockId: number;
  instructions: CppVmInstructionContract[];
}
export interface CppVmProgramContract {
  id: string;
  engine: number;
  renderer: number;
  regCount: number;
  constPool: unknown[];
  instructions: CppVmInstructionContract[];
  effectInstructions: CppVmInstructionContract[];
  blockEffects: CppVmBlockEffectContract[];
}
export interface CppVmSharedDataClassContract {
  sharedDataClassId: number;
  classKind: number;
  firstFieldId: number;
  fieldCount: number;
}
export interface CppVmSharedFieldContract {
  fieldId: number;
  sharedDataClassId: number;
  valueTag: number;
  nullable: boolean;
  flagGroup: number;
  flagBit: number;
}
export interface CppVmSharedSchemaContract {
  classCount: number;
  fieldCount: number;
  flagGroupCount: number;
  classes: CppVmSharedDataClassContract[];
  fields: CppVmSharedFieldContract[];
}
export interface CppVmBundleContract {
  sharedSchema?: CppVmSharedSchemaContract;
  templates: CppTemplateFactoryContract[];
  programs: CppVmProgramContract[];
}
export declare function bridgeCppVmBundle(bundle: DynamicVmBundle): CppVmBundleContract;
export declare function bridgeCppVmProgram(program: DynamicVmProgram): CppVmProgramContract;
export declare function bridgeCppVmSharedSchema(schema: DynamicVmSharedSchema): CppVmSharedSchemaContract;
//#endregion
//#region temp/packages/runtime-vapor-dom2/interpreters/cpp/contracts/executionBridge.d.ts
export interface CppVmExecutionContract {
  renderer: number;
  program: CppVmProgramContract;
  templateFactories: CppTemplateFactoryContract[];
  sharedSchema?: CppVmSharedSchemaContract;
}
export interface UniDynamicSharedDataMockContract {
  values: unknown[];
  flags: Uint32Array;
  getField(fieldId: number): unknown;
  getFlag(flagGroupId: number): number;
}
export interface CppVmExecuteOptionsContract {
  templateFactories: DynamicVmTemplateFactory[];
  templateFactoryResolver?: DynamicVmExecuteOptions["templateFactoryResolver"];
  sharedDataInstance?: UniDynamicSharedDataMockContract;
  initialRegisters: unknown[];
  initialEffectFrames: CppVmEffectFrameContract[];
}
export interface CppVmExecutionRequestContract {
  renderer: number;
  program: CppVmProgramContract;
  executeOptions: CppVmExecuteOptionsContract;
}
export interface CppVmNativeExecuteOptionsContract {
  templateFactories: CppTemplateFactoryContract[];
  sharedDataInstance?: UniDynamicSharedDataMockContract;
  initialRegisters: unknown[];
  initialEffectFrames: CppVmEffectFrameContract[];
}
export interface CppVmNativeExecutionRequestContract {
  renderer: number;
  program: CppVmProgramContract;
  executeOptions: CppVmNativeExecuteOptionsContract;
}
export interface CppVmHostSharedDataInstanceContract {
  values: unknown[];
}
export interface CppVmHostEffectFrameContract {
  instructions: CppVmProgramContract["effectInstructions"];
  registers: unknown[];
  shared_data_instance?: CppVmHostSharedDataInstanceContract;
}
export interface CppVmHostExecuteOptionsContract {
  template_factories: CppTemplateFactoryContract[];
  shared_data_instance?: CppVmHostSharedDataInstanceContract;
  initial_registers: unknown[];
  initial_effect_frames: CppVmHostEffectFrameContract[];
}
export interface CppVmHostExecutionRequestContract {
  renderer: number;
  program: CppVmProgramContract;
  execute_options: CppVmHostExecuteOptionsContract;
}
export interface CppVmEffectFrameContract {
  instructions: CppVmProgramContract["effectInstructions"];
  registers: unknown[];
  sharedDataInstance?: UniDynamicSharedDataMockContract;
}
export interface CreateCppVmUniDynamicSharedDataMockOptions {
  values?: Array<{
    fieldId: number;
    value: unknown;
  }>;
}
export interface CreateCppVmExecutionRequestOptions {
  sharedDataInstance?: UniDynamicSharedDataMockContract;
  initialRegisters?: unknown[];
  initialEffectFrames?: CppVmEffectFrameContract[];
}
export declare function createCppVmExecutionContract(bundle: DynamicVmBundle, renderer: number): CppVmExecutionContract;
export declare function createCppVmExecutionRequest(bundle: DynamicVmBundle, renderer: number, options?: CreateCppVmExecutionRequestOptions): CppVmExecutionRequestContract;
export declare function createCppVmNativeExecutionRequest(bundle: DynamicVmBundle, renderer: number, options?: CreateCppVmExecutionRequestOptions): CppVmNativeExecutionRequestContract;
export declare function createCppVmNativeExecutionRequestFromExecution(execution: Pick<CppVmExecutionContract, "renderer" | "program" | "templateFactories">, options?: CreateCppVmExecutionRequestOptions): CppVmNativeExecutionRequestContract;
export declare function createCppVmHostExecutionRequestFromExecution(execution: Pick<CppVmExecutionContract, "renderer" | "program" | "templateFactories">, options?: CreateCppVmExecutionRequestOptions): CppVmHostExecutionRequestContract;
export declare function createCppVmExecutionRequestFromProgram(renderer: number, program: CppVmProgramContract, templateFactories: DynamicVmTemplateFactory[], options?: CreateCppVmExecutionRequestOptions): CppVmExecutionRequestContract;
export declare function createCppVmHostExecutionRequest(bundle: DynamicVmBundle, renderer: number, options?: CreateCppVmExecutionRequestOptions): CppVmHostExecutionRequestContract;
export declare function createCppVmUniDynamicSharedDataMock(bundle: DynamicVmBundle, options?: CreateCppVmUniDynamicSharedDataMockOptions): UniDynamicSharedDataMockContract;
export declare function resolveCppVmRuntimeTemplateFactories(bundle: DynamicVmBundle, renderer: number): DynamicVmTemplateFactory[];
export declare function bridgeCppVmHostExecutionRequest(request: CppVmNativeExecutionRequestContract): CppVmHostExecutionRequestContract;
//#endregion
//#region temp/packages/runtime-vapor-dom2/interpreters/cpp/nativeAdapter.d.ts
export interface CppVmNativeAdapter<Result = unknown> {
  invoke(payload: CppVmHostInvokePayloadContract): Result;
}
export interface CppVmNativeInvokeErrorContract {
  code: string;
  message: string;
  details?: unknown;
}
export interface CppVmNativeInvokeSuccess<Result = unknown> {
  ok: true;
  value: Result;
}
export interface CppVmNativeInvokeFailure {
  ok: false;
  error: CppVmNativeInvokeErrorContract;
}
export type CppVmNativeInvokeResult<Result = unknown> = CppVmNativeInvokeSuccess<Result> | CppVmNativeInvokeFailure;
export interface CppVmNativeResultAdapter<Result = unknown> {
  invoke(payload: CppVmHostInvokePayloadContract): CppVmNativeInvokeResult<Result>;
}
export declare class CppVmNativeInvokeError extends Error {
  readonly code: string;
  readonly details?: unknown;
  constructor(code: string, message: string, details?: unknown);
}
export declare function createCppVmNativeInvokeSuccess<Result>(value: Result): CppVmNativeInvokeSuccess<Result>;
export declare function createCppVmNativeInvokeFailure(code: string, message: string, details?: unknown): CppVmNativeInvokeFailure;
export declare function unwrapCppVmNativeInvokeResult<Result>(result: CppVmNativeInvokeResult<Result>): Result;
export declare function createCppVmHostInvokerFromNativeAdapter<Result>(adapter: CppVmNativeAdapter<Result>): CppVmHostInvoker<Result>;
export declare function createCppVmHostInvokerFromNativeResultAdapter<Result>(adapter: CppVmNativeResultAdapter<Result>): CppVmHostInvoker<Result>;
//#endregion
//#region temp/packages/runtime-vapor-dom2/interpreters/cpp/contracts/hostPayloadBridge.d.ts
export type CppVmHostInvokeEntryContract = "MAIN" | "EFFECT";
interface CppVmHostSharedDataInstanceContract$1 {
  values: unknown[];
}
interface CppVmHostEffectFrameContract$1 {
  instructions: CppVmProgramContract["effectInstructions"];
  registers: unknown[];
  sharedDataInstance?: CppVmHostSharedDataInstanceContract$1;
}
interface CppVmHostExecuteOptionsContract$1 {
  templateFactories: CppTemplateFactoryContract[];
  sharedDataInstance?: CppVmHostSharedDataInstanceContract$1;
  initialRegisters: unknown[];
  initialEffectFrames: CppVmHostEffectFrameContract$1[];
}
export interface CppVmHostInvokePayloadBridgeContract {
  entry: CppVmHostInvokeEntryContract;
  renderer: number;
  program: CppVmProgramContract;
  executeOptions: CppVmHostExecuteOptionsContract$1;
}
export interface CppVmNativeInvokeErrorBridgeContract {
  code: string;
  message: string;
  details: unknown;
  hasDetails: boolean;
}
export interface CppVmNativeInvokeSuccessBridgeContract<Result = unknown> {
  ok: true;
  value: Result;
}
export interface CppVmNativeInvokeFailureBridgeContract {
  ok: false;
  error: CppVmNativeInvokeErrorBridgeContract;
}
export type CppVmNativeInvokeResultBridgeContract<Result = unknown> = CppVmNativeInvokeSuccessBridgeContract<Result> | CppVmNativeInvokeFailureBridgeContract;
export declare function bridgeCppVmHostInvokePayload(payload: CppVmHostInvokePayloadContract): CppVmHostInvokePayloadBridgeContract;
export declare function createCppVmHostContractPayload(request: CppVmHostExecutionRequestContract, entry?: CppVmHostInvokePayloadContract["entry"]): CppVmHostInvokePayloadBridgeContract;
export declare function createCppVmHostMainContractPayload(loader: CppVmProgramLoader, options?: CreateCppVmExecutionRequestOptions): CppVmHostInvokePayloadBridgeContract;
export declare function createCppVmHostEffectContractPayload(loader: CppVmProgramLoader, previousResult: DynamicVmExecuteResult, options?: Omit<CreateCppVmExecutionRequestOptions, "initialRegisters" | "initialEffectFrames">): CppVmHostInvokePayloadBridgeContract;
export declare function bridgeCppVmNativeInvokeError(error: CppVmNativeInvokeErrorContract): CppVmNativeInvokeErrorBridgeContract;
export declare function bridgeCppVmNativeInvokeResult<Result>(result: CppVmNativeInvokeResult<Result>): CppVmNativeInvokeResultBridgeContract<Result>;
export declare function normalizeCppVmNativeInvokeResultBridge<Result>(result: CppVmNativeInvokeResultBridgeContract<Result>): CppVmNativeInvokeResult<Result>;
//#endregion
//#region temp/packages/runtime-vapor-dom2/interpreters/cpp/loader.d.ts
export interface UniDynamicSharedDataMock {
  values: unknown[];
  flags?: Uint32Array;
}
export interface CppVmProgramLoader {
  renderer: number;
  program: CppVmProgramContract;
  templateFactories: DynamicVmTemplateFactory[];
  nativeTemplateFactories: CppTemplateFactoryContract[];
  sharedSchema?: CppVmSharedSchemaContract;
  createSharedDataMock(options?: CreateCppVmUniDynamicSharedDataMockOptions): UniDynamicSharedDataMockContract;
  createExecutionRequest(options?: CreateCppVmExecutionRequestOptions): CppVmExecutionRequestContract;
  createNativeExecutionRequest(options?: CreateCppVmExecutionRequestOptions): CppVmNativeExecutionRequestContract;
  createHostExecutionRequest(options?: CreateCppVmExecutionRequestOptions): CppVmHostExecutionRequestContract;
  createHostContractPayload(options?: CreateCppVmExecutionRequestOptions): CppVmHostInvokePayloadBridgeContract;
  createHostMainContractPayload(options?: CreateCppVmExecutionRequestOptions): CppVmHostInvokePayloadBridgeContract;
  createHostEffectExecutionRequest(previousResult: DynamicVmExecuteResult, options?: Omit<CreateCppVmExecutionRequestOptions, "initialRegisters" | "initialEffectFrames">): CppVmHostExecutionRequestContract;
  createHostEffectContractPayload(previousResult: DynamicVmExecuteResult, options?: Omit<CreateCppVmExecutionRequestOptions, "initialRegisters" | "initialEffectFrames">): CppVmHostInvokePayloadBridgeContract;
  createEffectExecutionRequest(previousResult: DynamicVmExecuteResult, options?: Omit<CreateCppVmExecutionRequestOptions, "initialRegisters" | "initialEffectFrames">): CppVmExecutionRequestContract;
}
export declare function createCppVmProgramLoader(bundle: DynamicVmBundle, renderer: number): CppVmProgramLoader;
//#endregion
//#region temp/packages/runtime-vapor-dom2/interpreters/cpp/invokePayload.d.ts
export type CppVmHostInvokeEntry = "main" | "effect";
export interface CppVmHostInvokePayloadContract {
  entry: CppVmHostInvokeEntry;
  renderer: number;
  program: CppVmHostExecutionRequestContract["program"];
  execute_options: CppVmHostExecutionRequestContract["execute_options"];
}
export declare function createCppVmHostInvokePayload(request: CppVmHostExecutionRequestContract, entry?: CppVmHostInvokeEntry): CppVmHostInvokePayloadContract;
export declare function createCppVmHostMainInvokePayload(loader: CppVmProgramLoader, options?: CreateCppVmExecutionRequestOptions): CppVmHostInvokePayloadContract;
export declare function createCppVmHostEffectInvokePayload(loader: CppVmProgramLoader, previousResult: DynamicVmExecuteResult, options?: Omit<CreateCppVmExecutionRequestOptions, "initialRegisters" | "initialEffectFrames">): CppVmHostInvokePayloadContract;
//#endregion
//#region temp/packages/runtime-vapor-dom2/interpreters/cpp/hostInvoker.d.ts
export interface CppVmHostInvoker<Result = unknown> {
  executeMain(program: CppVmHostInvokePayloadContract["program"], executeOptions: CppVmHostInvokePayloadContract["execute_options"]): Result;
  executeEffect(program: CppVmHostInvokePayloadContract["program"], executeOptions: CppVmHostInvokePayloadContract["execute_options"]): Result;
}
export declare function dispatchCppVmHostInvokePayload<Result>(payload: CppVmHostInvokePayloadContract, invoker: CppVmHostInvoker<Result>): Result;
//#endregion
//#region temp/packages/runtime-vapor-dom2/interpreters/cpp/contractAdapter.d.ts
export interface CppVmNativeContractAdapter<Result = unknown> {
  invoke(payload: CppVmHostInvokePayloadBridgeContract): CppVmNativeInvokeResultBridgeContract<Result>;
}
export declare function createCppVmHostInvokerFromNativeContractAdapter<Result>(adapter: CppVmNativeContractAdapter<Result>): CppVmHostInvoker<Result>;
//#endregion
//#region temp/packages/runtime-vapor-dom2/interpreters/cpp/hostBridge.d.ts
export interface CppVmHostBridge<Result = unknown> {
  invokeMain(options?: CreateCppVmExecutionRequestOptions): Result;
  invokeEffect(previousResult: DynamicVmExecuteResult, options?: Omit<CreateCppVmExecutionRequestOptions, "initialRegisters" | "initialEffectFrames">): Result;
}
export declare function createCppVmHostBridge<Result>(loader: CppVmProgramLoader, invoker: CppVmHostInvoker<Result>): CppVmHostBridge<Result>;
export declare function createCppVmHostBridgeFromBundle<Result>(bundle: DynamicVmBundle, renderer: number, invoker: CppVmHostInvoker<Result>): CppVmHostBridge<Result>;
export declare function createCppVmHostBridgeFromBinary<Result>(binary: Uint8Array, renderer: number, invoker: CppVmHostInvoker<Result>): CppVmHostBridge<Result>;
export declare function createCppVmHostBridgeFromLoaderAdapter<Result>(loader: CppVmProgramLoader, adapter: CppVmNativeAdapter<Result>): CppVmHostBridge<Result>;
export declare function createCppVmHostBridgeFromBundleAdapter<Result>(bundle: DynamicVmBundle, renderer: number, adapter: CppVmNativeAdapter<Result>): CppVmHostBridge<Result>;
export declare function createCppVmHostBridgeFromBinaryAdapter<Result>(binary: Uint8Array, renderer: number, adapter: CppVmNativeAdapter<Result>): CppVmHostBridge<Result>;
export declare function createCppVmHostBridgeFromLoaderResultAdapter<Result>(loader: CppVmProgramLoader, adapter: CppVmNativeResultAdapter<Result>): CppVmHostBridge<Result>;
export declare function createCppVmHostBridgeFromBundleResultAdapter<Result>(bundle: DynamicVmBundle, renderer: number, adapter: CppVmNativeResultAdapter<Result>): CppVmHostBridge<Result>;
export declare function createCppVmHostBridgeFromBinaryResultAdapter<Result>(binary: Uint8Array, renderer: number, adapter: CppVmNativeResultAdapter<Result>): CppVmHostBridge<Result>;
export declare function createCppVmHostBridgeFromLoaderContractAdapter<Result>(loader: CppVmProgramLoader, adapter: CppVmNativeContractAdapter<Result>): CppVmHostBridge<Result>;
export declare function createCppVmHostBridgeFromBundleContractAdapter<Result>(bundle: DynamicVmBundle, renderer: number, adapter: CppVmNativeContractAdapter<Result>): CppVmHostBridge<Result>;
export declare function createCppVmHostBridgeFromBinaryContractAdapter<Result>(binary: Uint8Array, renderer: number, adapter: CppVmNativeContractAdapter<Result>): CppVmHostBridge<Result>;
//#endregion
//#region temp/packages/runtime-vapor-dom2/interpreters/cpp/entry.d.ts
export interface CppVmHostEntry<Result = unknown> {
  renderer: number;
  bridge: CppVmHostBridge<Result>;
  invokeMain(options?: CreateCppVmExecutionRequestOptions): Result;
  invokeEffect(previousResult: DynamicVmExecuteResult, options?: Omit<CreateCppVmExecutionRequestOptions, "initialRegisters" | "initialEffectFrames">): Result;
}
export declare function createCppVmHostEntry<Result>(loader: CppVmProgramLoader, invoker: CppVmHostInvoker<Result>): CppVmHostEntry<Result>;
export declare function createCppVmHostEntryFromBundle<Result>(bundle: DynamicVmBundle, renderer: number, invoker: CppVmHostInvoker<Result>): CppVmHostEntry<Result>;
export declare function createCppVmHostEntryFromBinary<Result>(binary: Uint8Array, renderer: number, invoker: CppVmHostInvoker<Result>): CppVmHostEntry<Result>;
export declare function createCppVmHostEntryFromLoaderAdapter<Result>(loader: CppVmProgramLoader, adapter: CppVmNativeAdapter<Result>): CppVmHostEntry<Result>;
export declare function createCppVmHostEntryFromBundleAdapter<Result>(bundle: DynamicVmBundle, renderer: number, adapter: CppVmNativeAdapter<Result>): CppVmHostEntry<Result>;
export declare function createCppVmHostEntryFromBinaryAdapter<Result>(binary: Uint8Array, renderer: number, adapter: CppVmNativeAdapter<Result>): CppVmHostEntry<Result>;
export declare function createCppVmHostEntryFromLoaderResultAdapter<Result>(loader: CppVmProgramLoader, adapter: CppVmNativeResultAdapter<Result>): CppVmHostEntry<Result>;
export declare function createCppVmHostEntryFromBundleResultAdapter<Result>(bundle: DynamicVmBundle, renderer: number, adapter: CppVmNativeResultAdapter<Result>): CppVmHostEntry<Result>;
export declare function createCppVmHostEntryFromBinaryResultAdapter<Result>(binary: Uint8Array, renderer: number, adapter: CppVmNativeResultAdapter<Result>): CppVmHostEntry<Result>;
export declare function createCppVmHostEntryFromLoaderContractAdapter<Result>(loader: CppVmProgramLoader, adapter: CppVmNativeContractAdapter<Result>): CppVmHostEntry<Result>;
export declare function createCppVmHostEntryFromBundleContractAdapter<Result>(bundle: DynamicVmBundle, renderer: number, adapter: CppVmNativeContractAdapter<Result>): CppVmHostEntry<Result>;
export declare function createCppVmHostEntryFromBinaryContractAdapter<Result>(binary: Uint8Array, renderer: number, adapter: CppVmNativeContractAdapter<Result>): CppVmHostEntry<Result>;
//#endregion
//#region temp/packages/runtime-vapor-dom2/interpreters/cpp/contractRuntime.d.ts
export interface CreateCppVmContractRuntimeOptions {
  runtimeAdapter?: Partial<DynamicRuntimeAdapter>;
  onUnsupportedOpcode?: DynamicVmExecuteOptions["onUnsupportedOpcode"];
}
export interface CppVmContractReplaySession {
  renderer: number;
  entry: CppVmHostEntry<DynamicVmExecuteResult>;
  hasPreviousResult(): boolean;
  reset(): void;
  previousResult(): DynamicVmExecuteResult | undefined;
  invokeMain(options?: Parameters<CppVmHostEntry<DynamicVmExecuteResult>["invokeMain"]>[0]): DynamicVmExecuteResult;
  invokeEffect(options?: Parameters<CppVmHostEntry<DynamicVmExecuteResult>["invokeEffect"]>[1]): DynamicVmExecuteResult;
}
export declare function executeCppVmHostContractPayload(payload: CppVmHostInvokePayloadBridgeContract, options?: CreateCppVmContractRuntimeOptions): DynamicVmExecuteResult;
export declare function executeCppVmContractMainFromLoader(loader: CppVmProgramLoader, executionOptions?: Parameters<CppVmProgramLoader["createHostMainContractPayload"]>[0], runtimeOptions?: CreateCppVmContractRuntimeOptions): DynamicVmExecuteResult;
export declare function executeCppVmContractMainFromBundle(bundle: DynamicVmBundle, renderer: number, executionOptions?: Parameters<CppVmProgramLoader["createHostMainContractPayload"]>[0], runtimeOptions?: CreateCppVmContractRuntimeOptions): DynamicVmExecuteResult;
export declare function executeCppVmContractMainFromBinary(binary: Uint8Array, renderer: number, executionOptions?: Parameters<CppVmProgramLoader["createHostMainContractPayload"]>[0], runtimeOptions?: CreateCppVmContractRuntimeOptions): DynamicVmExecuteResult;
export declare function executeCppVmContractEffectFromLoader(loader: CppVmProgramLoader, previousResult: DynamicVmExecuteResult, executionOptions?: Parameters<CppVmProgramLoader["createHostEffectContractPayload"]>[1], runtimeOptions?: CreateCppVmContractRuntimeOptions): DynamicVmExecuteResult;
export declare function executeCppVmContractEffectFromBundle(bundle: DynamicVmBundle, renderer: number, previousResult: DynamicVmExecuteResult, executionOptions?: Parameters<CppVmProgramLoader["createHostEffectContractPayload"]>[1], runtimeOptions?: CreateCppVmContractRuntimeOptions): DynamicVmExecuteResult;
export declare function executeCppVmContractEffectFromBinary(binary: Uint8Array, renderer: number, previousResult: DynamicVmExecuteResult, executionOptions?: Parameters<CppVmProgramLoader["createHostEffectContractPayload"]>[1], runtimeOptions?: CreateCppVmContractRuntimeOptions): DynamicVmExecuteResult;
export declare function createCppVmNativeContractReplayAdapter(options?: CreateCppVmContractRuntimeOptions): CppVmNativeContractAdapter<DynamicVmExecuteResult>;
export declare function createCppVmContractReplayBridgeFromLoader(loader: CppVmProgramLoader, options?: CreateCppVmContractRuntimeOptions): CppVmHostBridge<DynamicVmExecuteResult>;
export declare function createCppVmContractReplayBridgeFromBundle(bundle: DynamicVmBundle, renderer: number, options?: CreateCppVmContractRuntimeOptions): CppVmHostBridge<DynamicVmExecuteResult>;
export declare function createCppVmContractReplayBridgeFromBinary(binary: Uint8Array, renderer: number, options?: CreateCppVmContractRuntimeOptions): CppVmHostBridge<DynamicVmExecuteResult>;
export declare function createCppVmContractReplayEntryFromLoader(loader: CppVmProgramLoader, options?: CreateCppVmContractRuntimeOptions): CppVmHostEntry<DynamicVmExecuteResult>;
export declare function createCppVmContractReplayEntryFromBundle(bundle: DynamicVmBundle, renderer: number, options?: CreateCppVmContractRuntimeOptions): CppVmHostEntry<DynamicVmExecuteResult>;
export declare function createCppVmContractReplayEntryFromBinary(binary: Uint8Array, renderer: number, options?: CreateCppVmContractRuntimeOptions): CppVmHostEntry<DynamicVmExecuteResult>;
export declare function createCppVmContractReplaySessionFromLoader(loader: CppVmProgramLoader, options?: CreateCppVmContractRuntimeOptions): CppVmContractReplaySession;
export declare function createCppVmContractReplaySessionFromBundle(bundle: DynamicVmBundle, renderer: number, options?: CreateCppVmContractRuntimeOptions): CppVmContractReplaySession;
export declare function createCppVmContractReplaySessionFromBinary(binary: Uint8Array, renderer: number, options?: CreateCppVmContractRuntimeOptions): CppVmContractReplaySession;
export declare function bridgeCppVmHostExecuteOptionsToRuntime(executeOptions: CppVmHostExecuteOptionsContract$1, options?: CreateCppVmContractRuntimeOptions): DynamicVmExecuteOptions;
export declare function bridgeCppVmProgramToRuntime(program: CppVmHostInvokePayloadBridgeContract["program"]): DynamicVmProgram;
export declare function bridgeCppTemplateFactoryToRuntime(factory: CppTemplateFactoryContract): DynamicVmTemplateFactory;
//#endregion
//#region temp/packages/runtime-vapor-dom2/interpreters/cpp/mockNativeAdapter.d.ts
export interface CppVmMockNativeInvocationRecord {
  entry: "main" | "effect";
  renderer: number;
  program: CppVmHostInvokePayloadContract["program"];
  execute_options: CppVmHostInvokePayloadContract["execute_options"];
}
export interface CreateCppVmMockNativeInvokerOptions<Result = unknown> {
  onInvoke?: (record: CppVmMockNativeInvocationRecord) => Result;
  onMain?: (record: CppVmMockNativeInvocationRecord) => Result;
  onEffect?: (record: CppVmMockNativeInvocationRecord) => Result;
}
export interface CppVmMockNativeInvoker<Result = unknown> {
  invoker: CppVmHostInvoker<Result>;
  calls: CppVmMockNativeInvocationRecord[];
}
export interface CreateCppVmMockNativeResultAdapterOptions<Result = unknown> {
  onInvoke?: (record: CppVmMockNativeInvocationRecord) => CppVmNativeInvokeResult<Result>;
  onMain?: (record: CppVmMockNativeInvocationRecord) => CppVmNativeInvokeResult<Result>;
  onEffect?: (record: CppVmMockNativeInvocationRecord) => CppVmNativeInvokeResult<Result>;
}
export interface CppVmMockNativeResultAdapterHandle<Result = unknown> {
  adapter: CppVmNativeResultAdapter<Result>;
  calls: CppVmMockNativeInvocationRecord[];
}
export declare function createCppVmMockNativeInvoker<Result = unknown>(options?: CreateCppVmMockNativeInvokerOptions<Result>): CppVmMockNativeInvoker<Result>;
export declare function createCppVmMockNativeResultAdapter<Result = unknown>(options?: CreateCppVmMockNativeResultAdapterOptions<Result>): CppVmMockNativeResultAdapterHandle<Result>;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/dynamic/bridge/programLoader.d.ts
export type DynamicProgramKey = `${number}:${number}`;
export interface DynamicProgramMeta {
  engine: number;
  renderer: number;
  offset: number;
  length: number;
}
export declare function createDynamicProgramKey(engine: number, renderer: number): DynamicProgramKey;
export declare function indexDynamicPrograms(programs: DynamicProgramMeta[]): Record<DynamicProgramKey, DynamicProgramMeta>;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/dynamic/protocol/binary.d.ts
export declare function parseDynamicVmBundle(bytes: Uint8Array): DynamicVmBundle;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/dynamic/protocol/generated.d.ts
export declare const DYNAMIC_RENDER_SCHEMA_VERSION = 1;
export declare const DYNAMIC_RENDER_MAGIC = 844513874;
export declare const DYNAMIC_RENDER_ENGINE: {
  readonly CPP: 0;
  readonly KT: 1;
};
export declare const DYNAMIC_RENDER_RENDERER: {
  readonly ELEMENT: 0;
  readonly KOTLIN_ELEMENT: 1;
  readonly NATIVE_VIEW: 2;
};
export declare const DYNAMIC_RENDER_SECTION_KIND: {
  readonly STRING_POOL: 1;
  readonly CONST_POOL: 2;
  readonly SHARED_SCHEMA: 3;
  readonly TEMPLATE: 4;
  readonly EXPR: 5;
  readonly BLOCK_META: 6;
  readonly CODE: 7;
  readonly EFFECT_META: 8;
  readonly EFFECT_CODE: 9;
  readonly TOUCH_LIST: 10;
  readonly DEBUG_PC_MAP: 100;
  readonly DEBUG_NAME_MAP: 101;
};
export declare const DYNAMIC_RENDER_OPCODE: {
  readonly INST_TEMPLATE: 1;
  readonly GET_ARRAY_ITEM: 2;
  readonly CHILD: 3;
  readonly NEXT: 4;
  readonly NTH_CHILD: 5;
  readonly SET_INSERTION_STATE: 6;
  readonly GET_INSERTION_PARENT: 7;
  readonly APPEND_NATIVE_CHILD: 8;
  readonly CREATE_IF: 20;
  readonly CREATE_FOR: 21;
  readonly CREATE_RECYCLE_FOR: 22;
  readonly CALL_BLOCK: 23;
  readonly RETURN: 24;
  readonly RETURN_VOID: 25;
  readonly CREATE_COMPONENT: 40;
  readonly CREATE_COMPONENT_FALLBACK: 41;
  readonly CREATE_DYNAMIC_COMPONENT: 42;
  readonly CREATE_SLOT: 43;
  readonly CREATE_DYNAMIC_SLOT: 44;
  readonly CREATE_FOR_SLOTS: 45;
  readonly CREATE_DYNAMIC_SLOT_VECTOR: 46;
  readonly WITH_VAPOR_CTX: 47;
  readonly CREATE_KEYED_FRAGMENT: 48;
  readonly CREATE_BLOCK_VECTOR: 49;
  readonly SET_PROP: 60;
  readonly SET_DYNAMIC_PROPS: 61;
  readonly SET_TEXT: 62;
  readonly SET_HTML: 63;
  readonly SET_EVENT: 64;
  readonly SET_DYNAMIC_EVENTS: 65;
  readonly SET_TEMPLATE_REF: 66;
  readonly APPLY_V_MODEL: 67;
  readonly APPLY_V_SHOW: 68;
  readonly LOAD_CONST: 80;
  readonly LOAD_SD: 81;
  readonly TO_DISPLAY_STRING: 82;
  readonly ADD: 83;
  readonly SUB: 84;
  readonly MUL: 85;
  readonly DIV: 86;
  readonly MOD: 87;
  readonly EQ: 88;
  readonly NE: 89;
  readonly GT: 90;
  readonly GE: 91;
  readonly LT: 92;
  readonly LE: 93;
  readonly LOGIC_AND: 94;
  readonly LOGIC_OR: 95;
  readonly NOT: 96;
  readonly TERNARY: 97;
  readonly CONCAT_N: 98;
  readonly MOVE: 99;
};
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/dynamic/template/tree.d.ts
export interface DynamicTemplateTreeStaticProp {
  method: string;
  args: unknown[];
}
export interface DynamicTemplateTreeNode {
  __dynamicTemplateNode: true;
  templateId: number;
  nodeId: string;
  create: string;
  flatten: string;
  text?: string;
  vueComponentIdFromSharedData?: boolean;
  staticProps?: DynamicTemplateTreeStaticProp[];
  parent?: DynamicTemplateTreeNode;
  children: DynamicTemplateTreeNode[];
}
export type DynamicTemplateTreeInstance = DynamicTemplateTreeNode | DynamicTemplateTreeNode[] | null;
export declare function isDynamicTemplateTreeNode(value: unknown): value is DynamicTemplateTreeNode;
export declare function instantiateDynamicTemplateTree(factory: DynamicVmTemplateFactory): DynamicTemplateTreeInstance;
export declare function resolveDynamicTemplateChild(node: unknown): unknown;
export declare function resolveDynamicTemplateNext(node: unknown): unknown;
export declare function resolveDynamicTemplateNthChild(node: unknown, index: number): unknown;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/index.d.ts
export declare const ssrRef: typeof ref;
export declare const shallowSsrRef: typeof shallowRef;
//#endregion
export { defineVaporSharedDataComponent, hyphenate,  };