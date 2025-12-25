import { ComponentInternalOptions, NormalizedPropsOptions, ObjectEmitsOptions, GenericComponentInstance, GenericAppContext, EffectScope as EffectScope$1, EmitFn, SuspenseBoundary, LifecycleHook, ComponentPropsOptions, EmitsOptions, CreateAppFunction, AppContext, defineComponent, ComponentPublicInstance, ref, shallowRef } from '@vue/runtime-core';
export { defineComponent as defineVaporSharedDataComponent } from '@vue/runtime-core';
export * from '@vue/runtime-x';
export { hyphenate } from '@vue/shared';
import { EffectScope, ShallowRef, Reactive, Ref } from '@vue/reactivity';
import { Element as Element$1 } from '@dcloudio/uni-app-x/types/native';

declare class VaporFragment {
    nodes: Block;
    anchor?: Node;
    parentComponent?: VaporSharedDataComponentInstance | null;
    insert?: (parent: ParentNode, anchor: Node | null) => void;
    remove?: (parent?: ParentNode) => void;
    constructor(nodes: Block);
}
declare class DynamicFragment extends VaporFragment {
    scope: EffectScope | undefined;
    current?: BlockFn;
    fallback?: BlockFn;
    getScope?: (key: any) => EffectScope | undefined;
    slotOwner: VaporSharedDataComponentInstance | null;
    constructor(anchorLabel?: string);
    update(render?: BlockFn | null, key?: any): void;
    private renderBranch;
}

type Block = Node | VaporFragment | DynamicFragment | VaporSharedDataComponentInstance | Block[];
type BlockFn = (...args: any[]) => void;

type RawProps = Record<string, () => unknown> & {
    $?: DynamicPropsSource[];
};
type DynamicPropsSource = (() => Record<string, unknown>) | Record<string, () => unknown>;

type RawSlots = Record<string, VaporSlot> & {
    $?: DynamicSlotSource[];
};
type StaticSlots = Record<string, VaporSlot>;
type VaporSlot = BlockFn;
type DynamicSlot = {
    name: string;
    fn: VaporSlot;
};
type DynamicSlotFn = () => DynamicSlot | DynamicSlot[];
export type DynamicSlotSource = StaticSlots | DynamicSlotFn;
/**
 * Wrap a slot function to track the slot owner.
 *
 * This ensures:
 * 1. createSlot gets rawSlots from the correct component (slot owner)
 * 2. Elements inherit the slot owner's scopeId
 */
export declare function withSharedDataVaporCtx(fn: (...args: any[]) => any, type?: 'string'): BlockFn;
export declare function createSharedDataSlot(name: string | (() => string), rawProps?: LooseRawProps | null, fallback?: VaporSlot, noSlotted?: boolean, once?: boolean): void;

export type VaporSharedDataComponent = ObjectVaporSharedDataComponent & {
    __className?: string;
    externalClasses?: string[];
    styleIsolation?: 'isolated' | 'app-shared';
};
type VaporSharedDataSetupFn = (props: any, ctx: Pick<VaporSharedDataComponentInstance, 'slots' | 'attrs' | 'emit' | 'expose' | 'pageId'>) => UniSharedData;
interface ObjectVaporSharedDataComponent extends ComponentInternalOptions, SharedInternalOptions {
    setup?: VaporSharedDataSetupFn;
    inheritAttrs?: boolean;
    props?: ComponentPropsOptions;
    emits?: EmitsOptions;
    render?(ctx: any, props?: any, emit?: EmitFn, attrs?: any, slots?: Record<string, VaporSlot>): Block;
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
type LooseRawSlots = Record<string, VaporSlot | DynamicSlotSource[]> & {
    $?: DynamicSlotSource[];
};
export declare function createSharedDataComponent<C = any, SharedData extends string = C extends {
    __className: infer K extends string;
} ? `${K}SharedData` : string>(definedComponent: C, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, isSingleRoot?: boolean, once?: boolean, appContext?: GenericAppContext): VaporSharedDataComponentInstance<SharedData>;
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
    scope: EffectScope$1;
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
    renderer: 'app' | 'page' | 'component';
    constructor(comp: VaporSharedDataComponent, rawProps?: RawProps | null, rawSlots?: RawSlots | null, appContext?: GenericAppContext, once?: boolean);
    /**
     * Expose `getKeysFromRawProps` on the instance so it can be used in code
     * paths where it's needed, e.g. `useModel`
     */
    rawKeys(): string[];
    $waitNativeRender(fn: () => void): void;
}
export declare function isVaporSharedDataComponent(value: unknown): value is VaporSharedDataComponentInstance;
/**
 * Used when a component cannot be resolved at compile time
 * and needs rely on runtime resolution - where it might fallback to a plain
 * element if the resolution fails.
 */
export declare function createSharedDataComponentWithFallback(comp: VaporSharedDataComponent | string | any, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, isSingleRoot?: boolean, once?: boolean, appContext?: GenericAppContext): VaporSharedDataComponentInstance | null;

export declare const createVaporApp: CreateAppFunction<ParentNode, VaporSharedDataComponent>;
export declare const createVaporSSRApp: CreateAppFunction<ParentNode, VaporSharedDataComponent>;
export declare const createApp: CreateAppFunction<ParentNode, VaporSharedDataComponent>;

export declare function toUniNativeColor(value: string | number, defaultValue?: number): number | undefined;

export declare function toSharedDataStyle(style: Map<string, unknown>, result?: Record<number, unknown>): Record<number, unknown>;

export declare function createMountPage(appContext: AppContext): (pageComponent: ReturnType<typeof defineComponent> | VaporSharedDataComponent, pageProps: Record<string, any>, pageContainer?: Element$1) => ComponentPublicInstance;
export declare function unmountPage(pageInstance: ComponentPublicInstance): void;

export declare function createSharedDataIf(condition: () => any, b1: () => void, b2?: (() => void) | null, once?: boolean): void;

type ItemOf<S> = S extends readonly (infer T)[] ? T : S extends Reactive<readonly (infer T)[]> ? T : S extends Set<infer T> ? T : S extends Map<infer K, infer V> ? [K, V] : S extends string ? string : S extends number ? number : S extends Record<any, infer V> ? V : S extends Iterable<infer T> ? T : any;
type KeyOf<S> = S extends Record<any, any> ? string : number;
type IndexOfKey<K> = K extends string ? number : undefined;
export declare const createSharedDataFor: <S extends UniSharedData, Source>(sharedDataVFor: UniSharedDataVFor<S>, src: () => Source, renderItem: (shareDataVForItem: S, item: ShallowRef<ItemOf<Source>>, key: ShallowRef<KeyOf<Source>>, index: ShallowRef<number | undefined>) => void, getKey?: (shareDataVForItem: S, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any, flags?: number, setup?: (_: {
    createSelector: (source: () => any) => (cb: () => void) => void;
}) => void) => void;
export declare function createSharedDataForSlots<S extends UniSharedData, Source>(sharedDataVFor: UniSharedDataVFor<S>, rawSource: Source, getSlot: (sharedData: S, item: ItemOf<Source>, key: KeyOf<Source>, index?: IndexOfKey<KeyOf<Source>>) => DynamicSlot): DynamicSlot[];
export declare function getSharedDataRestElement(val: any, keys: string[]): any;
export declare function getSharedDataDefaultValue(val: any, defaultVal: any): any;

export declare const preCreateSharedDataRecycleFor: <Source>(src: () => Source, getKey?: (item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any) => (() => Source);
export declare const createSharedDataRecycleFor: <S extends UniSharedData, Source>(sharedDataVFor: UniSharedDataVFor<S>, src: () => Source, renderItem: (shareDataVForItem: S, item: ShallowRef<ItemOf<Source>>, key: ShallowRef<KeyOf<Source>>, index: ShallowRef<number | undefined>) => void, getKey?: (shareDataVForItem: S, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any, getType?: (shareDataVForItem: S, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any, flags?: number, setup?: (_: {
    createSelector: (source: () => any) => (cb: () => void) => void;
}) => void) => void;

type NodeRef = string | Ref | ((ref: Element) => void);
type RefEl = UniElement | VaporSharedDataComponentInstance;
type setRefFn = (el: RefEl | number | null, ref: NodeRef, oldRef?: NodeRef | null, refFor?: boolean | null, refKey?: string | null) => NodeRef | undefined;
export declare function createSharedDataTemplateRefSetter(): setRefFn;

export declare function createSharedDataDynamicComponent(getter: () => any, setter: (ins: VaporSharedDataComponentInstance | null) => any, rawProps?: RawProps | null, rawSlots?: RawSlots | null, isSingleRoot?: boolean, once?: boolean): VaporSharedDataComponentInstance | null;

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

export declare function renderSharedDataEffect(fn: () => void, noLifecycle?: boolean): void;
export declare function nextSharedDataTick(fn: () => void): Promise<void>;

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
interface WithSharedDataComponentOptions {
    scriptCpp?: boolean;
}
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
    AppShared = 1
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

/**
 * 将字符串值转换为 UniImageModeType 枚举类型
 * @param value - 字符串值
 * @returns UniImageModeType 枚举值
 */
export declare function toSharedDataImageMode(value: string): UniImageModeType;

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
export declare function withElementVaporCtx(fn: Function): BlockFn;
export declare function createElementSlot(page: UniPage, name: string | (() => string), rawProps?: LooseRawProps | null, fallback?: VaporSlot): Block;
export declare function createElementFor<Source extends UniSharedData>(page: UniPage, src: () => UniSharedDataVFor<Source> | string | number, renderItem: (shareDataVForItem: Source, item: ItemOf<Source>, key: KeyOf<Source>, index: number | undefined) => void, getKey?: ((shareDataVForItem: Source, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any) | null, flags?: number, setup?: (_: {
    createSelector: (source: () => any) => (cb: () => void) => void;
}) => void): VaporFragment;
export declare function createElementRecycleFor<Source extends UniSharedData>(page: UniPage, src: () => UniSharedDataVFor<Source>, renderItem: (shareDataVForItem: Source, item: ShallowRef<ItemOf<Source>>, key: ShallowRef<KeyOf<Source>>, index: ShallowRef<number | undefined>) => void, getKey?: ((shareDataVForItem: Source, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any) | null, getType?: ((shareDataVForItem: Source, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any) | null, flags?: number, setup?: (_: {
    createSelector: (source: () => any) => (cb: () => void) => void;
}) => void): VaporFragment;
export declare function createElementForSlots<Source extends UniSharedData>(rawSource: UniSharedDataVFor<Source>, getSlot: (shareDataVForItem: Source, key: KeyOf<Source>, index?: number) => DynamicSlot): DynamicSlot[];
export declare function createElementDynamicSlot(name: string, fn: VaporSlot): DynamicSlot;
export declare function createElementIf(page: UniPage, condition: () => any, b1: BlockFn, b2?: BlockFn | null, once?: boolean): Block;
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

export declare function getCurrentNativeViewVaporComponentInstance(): VaporSharedDataComponentInstance | null;
type NativeViewFactory = (page: UniPage) => UniNativeBaseView & {
    $root?: true;
};
export declare function nativeViewFactory(page: UniPage, factory: NativeViewFactory, root?: boolean): () => UniNativeBaseView;
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
export declare function createNativeViewRecycleFor<Source extends UniSharedData>(page: UniPage, src: () => UniSharedDataVFor<Source>, renderItem: (shareDataVForItem: Source, item: ShallowRef<ItemOf<Source>>, key: ShallowRef<KeyOf<Source>>, index: ShallowRef<number | undefined>) => void, getKey?: ((shareDataVForItem: Source, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any) | null, getType?: ((shareDataVForItem: Source, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any) | null, flags?: number, setup?: (_: {
    createSelector: (source: () => any) => (cb: () => void) => void;
}) => void): VaporFragment;
export declare function createNativeViewIf(page: UniPage, condition: () => any, b1: BlockFn, b2?: BlockFn | null, once?: boolean): Block;
export declare function setNativeViewAttr(el: UniNativeBaseView, key: string, value: any): void;
export declare function setNativeViewInsertionState(parent: UniNativeBaseView, anchor?: UniNativeBaseView | 0 | null | number, last?: boolean): void;
export declare function getNativeViewInsertionParent(): UniNativeBaseView | null;
export declare function createNativeViewComponent<S extends UniSharedDataComponent>(sharedData?: S | null, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, isSingleRoot?: boolean | null, appContext?: GenericAppContext): VaporSharedDataComponentInstance;
export declare function createNativeViewComponentWithFallback<S extends UniSharedDataComponent>(page: UniPage, sharedData?: S | null, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, isSingleRoot?: boolean): VaporSharedDataComponentInstance;
export declare function createNativeViewDynamicComponent(page: UniPage, getter: () => any, rawProps?: RawProps | null, rawSlots?: RawSlots | null, isSingleRoot?: boolean): VaporFragment;
export declare function setNativeViewDynamicProps(component: UniSharedDataComponent, view: UniNativeBaseView, args: UniSharedDataJSONObject): void;
export declare function withNativeViewVaporCtx(fn: Function): BlockFn;
export declare function createNativeViewSlot(page: UniPage, name: string | (() => string), rawProps?: LooseRawProps | null, fallback?: VaporSlot): Block;
export declare function createNativeViewForSlots<Source extends UniSharedData>(rawSource: UniSharedDataVFor<Source>, getSlot: (shareDataVForItem: Source, key: KeyOf<Source>, index?: number) => DynamicSlot): DynamicSlot[];
export declare function createNativeViewDynamicSlot(name: string, fn: VaporSlot): DynamicSlot;

export declare function runOnMainQueue(fn: () => void): void;
export declare function createUserClass<T>(): T;

/**
 * 根据 uid 查找 Vue 实例
 * 主要用于 root element 通过 uid 获取对应的 vue 实例，以访问组件数据和方法
 * 1. 内置组件的 Element 暴露的属性方法需要访问组件实例
 * 2. 自动化测试框架需要通过 Element 获取组件实例，以访问组件数据和方法
 * @param uid
 * @returns
 */
export declare function findVueInstanceByUid(uid: number): VaporSharedDataComponentInstance | null;

export declare const ssrRef: typeof ref;
export declare const shallowSsrRef: typeof shallowRef;


