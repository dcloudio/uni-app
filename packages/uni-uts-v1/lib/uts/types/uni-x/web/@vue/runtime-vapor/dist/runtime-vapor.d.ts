import { AllowedComponentProps, AsyncComponentInternalOptions, AsyncComponentLoader, AsyncComponentOptions, ComponentCustomElementInterface, ComponentCustomProps, ComponentInternalOptions, ComponentObjectPropsOptions, ComponentPropsOptions, ComponentTypeEmits, CreateAppFunction, CustomElementOptions, DirectiveModifiers, EffectScope, EmitFn, EmitsOptions, EmitsToProps, ExtractDefaultPropTypes, ExtractPropTypes, GenericAppContext, GenericComponentInstance, KeepAliveProps, LifecycleHook, MoveType, NULL_DYNAMIC_COMPONENT, NormalizedPropsOptions, ObjectEmitsOptions, Plugin, ReservedProps, SchedulerJob, ShallowUnwrapRef, SuspenseBoundary, TeleportProps, TransitionGroupProps, TransitionHooks, TransitionProps, TransitionState, TypeEmitsToOptions, VNode, VueElementBase } from "@vue/runtime-dom";
import { EffectScope as EffectScope$1, Ref, ShallowRef } from "@vue/reactivity";
import { IsKeyValues, Namespace, NormalizedStyle, Prettify, VaporSlotStability, extend } from "@vue/shared";
//#region temp/packages/runtime-vapor/src/apiTemplateRef.d.ts
type NodeRef = string | Ref | ((ref: Element | VaporComponentInstance, refs: Record<string, any>) => void);
type RefEl = Element | VaporComponentInstance | DynamicFragment | VaporFragment;
type setRefFn = (el: RefEl, ref: NodeRef, refFor?: boolean, refKey?: string) => void;
export declare function createTemplateRefSetter(): setRefFn;
/**
 * Static refs never change value, so they need no old-ref tracking and no
 * per-element state - only the fragment re-apply hook shared with the
 * stateful path.
 */
export declare function setStaticTemplateRef(el: RefEl, ref: NodeRef, refFor?: boolean, refKey?: string): void;
export declare function setTemplateRefBinding(el: RefEl, getter: () => any, refFor?: boolean, refKey?: string): void;
//#endregion
//#region temp/packages/runtime-vapor/src/dom/hydration.d.ts
type Anchor = Node & {
  $vha?: number;
  $fe?: Anchor;
};
type CommentAnchor = Comment & Anchor;
/**
 * A block's claim on the `<!--[-->` opening its SSR range. In a markerless
 * container the server also strips the range of a slot outlet that is the
 * single fragment of a transition slot's content, so a marker consumed by
 * such an outlet belongs to the innermost block that starts right after it:
 * that block takes the claim over and the outer one loses its `start`.
 * Owners read `start` late for that reason.
 */
interface FragmentClaim {
  start: CommentAnchor | null;
}
//#endregion
//#region temp/packages/runtime-vapor/src/slotBoundary.d.ts
interface SlotBoundaryContext {
  parent: SlotBoundaryContext | null;
  getFallback: () => BlockFn | undefined;
  run<R>(fn: () => R, scope?: EffectScope$1): R;
  getScopeIds?: () => string[] | null;
  markDirty: (force?: boolean) => void;
  onContentInvalid?: (() => void)[];
}
//#endregion
//#region temp/packages/runtime-vapor/src/renderContext.d.ts
interface RenderContext {
  readonly slotOwner: VaporComponentInstance | null;
  readonly slotBoundary: SlotBoundaryContext | null;
  readonly slotScopeIds: string[] | null;
  readonly suspense: SuspenseBoundary | null;
}
//#endregion
//#region temp/packages/runtime-vapor/src/vdomInteropState.d.ts
declare const interopKey: unique symbol;
//#endregion
//#region temp/packages/runtime-vapor/src/componentProps.d.ts
type RawProps = Record<string, unknown> & {
  $?: DynamicPropsSource[] & {
    [interopKey]?: boolean;
  };
};
type DynamicPropsSource = (() => Record<string, unknown>) | Record<string, unknown>;
//#endregion
//#region temp/packages/runtime-vapor/src/componentSlots.d.ts
type RawSlots = Record<string, VaporSlot> & {
  $?: DynamicSlotSource[];
};
type LooseRawSlots = VaporSlot | (Record<string, VaporSlot | DynamicSlotSource[]> & {
  $?: DynamicSlotSource[];
});
type StaticSlots = Record<string, VaporSlot>;
export type VaporSlot = BlockFn & {
  _?: VaporSlotStability.NON_STABLE;
};
type DynamicSlot = {
  name: string;
  fn: VaporSlot;
  key?: unknown;
};
type DynamicSlotFn = () => DynamicSlot | DynamicSlot[];
type DynamicSlotSource = StaticSlots | DynamicSlotFn;
export declare function createSlot(name?: string | (() => string), rawProps?: LooseRawProps | null, fallback?: VaporSlot, flags?: number): Block;
//#endregion
//#region temp/packages/runtime-vapor/src/keepAlive.d.ts
export interface VaporKeepAliveContext {
  isolatePropSources(rawProps: RawProps): RawProps;
  isolateSlotSources(rawSlots: RawSlots): RawSlots;
  prepareBranchRemoval(frag: DynamicFragment, scope: EffectScope$1, prevKey: any): boolean;
  runBranchRender(frag: DynamicFragment, fn: () => void, useScope: boolean, removePrevious?: () => void): void;
  processShapeFlag(block: Block): any | false;
  cacheBlock(block?: Block): void;
  getStorageContainer(): ParentNode;
}
//#endregion
//#region temp/packages/runtime-vapor/src/fragment.d.ts
export declare class VaporFragment<T extends Block = Block> implements TransitionOptions {
  $key?: any;
  $transition?: VaporTransitionHooks | undefined;
  nodes: T;
  vnode?: VNode | null;
  anchor?: Node;
  isBlockValid?: (componentAsValid?: boolean) => boolean;
  insert?(parent: ParentNode, anchor: Node | null, parentSuspense?: SuspenseBoundary | null, transitionHooks?: TransitionHooks): void;
  move?(parent: ParentNode, anchor: Node | null, moveType: MoveType, parentComponent?: VaporComponentInstance, parentSuspense?: SuspenseBoundary | null, transitionHooks?: TransitionHooks): void;
  remove?(parent?: ParentNode, transitionHooks?: TransitionHooks): void;
  hydrate?(...args: any[]): void;
  scope?: EffectScope$1;
  setRef?: (instance: VaporComponentInstance, ref: NodeRef, refFor: boolean, refKey: string | undefined) => void;
  /** beforeMount: a fresh branch is rendered but not inserted yet */
  bm?: ((nodes: Block) => void)[];
  /** beforeUnmount */
  bum?: (() => void)[];
  /** beforeUpdate */
  bu?: (() => void)[];
  /** updated */
  u?: ((nodes: Block) => void)[];
  constructor(nodes: T, flags?: number);
}
declare class RenderContextFragment<T extends Block = Block> extends VaporFragment<T> {
  readonly renderInstance: GenericComponentInstance | null;
  readonly keepAliveCtx?: VaporKeepAliveContext | null;
  ctx: RenderContext;
  constructor(nodes: T, flags?: number);
  get slotBoundary(): SlotBoundaryContext | null;
  get slotScopeIds(): string[] | null;
  protected runWithRenderCtx<R>(fn: () => R, scope?: EffectScope$1): R;
}
declare class ForFragment extends VaporFragment<Block[]> {
  resetListeners?: (() => void)[];
  constructor(nodes: Block[], trackSlotBoundary: boolean, onInvalid?: () => void);
  onReset(fn: () => void): void;
}
export declare class DynamicFragment extends RenderContextFragment {
  anchor: Node;
  scope: EffectScope$1 | undefined;
  current?: any;
  pending?: {
    render?: BlockFn;
    key: any;
    noScope: boolean;
    branchKey?: any;
  };
  anchorLabel?: string;
  keyed?: boolean;
  branchKey?: any;
  /** hydration: this `v-if` branch's claim on its SSR range */
  hydrationClaim?: FragmentClaim;
  fallthrough?: (nodes: Block) => void;
  scopeIdOwners?: VaporComponentInstance[];
  everUpdated: boolean;
  constructor(flags?: number, anchorLabel?: string, keyed?: boolean, trackSlotBoundary?: boolean, onInvalid?: () => void, adoptAnchor?: Node);
  protected get autoHydrate(): boolean;
  update(render?: BlockFn, key?: any, noScope?: boolean, branchKey?: any): void;
  protected getBranchParent(): ParentNode | null;
  renderBranch(render: BlockFn | undefined, transition: VaporTransitionHooks | undefined, parent: ParentNode | null, key: any, noScope: boolean, notifyUpdated: boolean, removePrevious?: () => void, branchKey?: any): void;
  private renderNodes;
}
export declare function isFragment(val: unknown): val is VaporFragment;
//#endregion
//#region temp/packages/runtime-vapor/src/block.d.ts
interface VaporTransitionState extends TransitionState {
  root?: Block;
  persisted?: boolean;
}
export interface VaporTransitionHooks extends TransitionHooks {
  __vapor: true;
  state: VaporTransitionState;
  props: TransitionProps;
  instance: VaporComponentInstance;
  applyGroup?: (block: Block, props: TransitionProps, state: TransitionState, instance: VaporComponentInstance) => void;
}
interface TransitionOptions {
  $key?: any;
  $transition?: VaporTransitionHooks;
  $vshow?: true;
}
export type Block = Node | VaporFragment | DynamicFragment | VaporComponentInstance | Block[];
type BlockFn = (...args: any[]) => Block;
export declare function insert(block: Block, parent: ParentNode, anchor?: Node | null, parentSuspense?: any): void;
export declare function remove(block: Block, parent?: ParentNode): void;
//#endregion
//#region temp/packages/runtime-vapor/src/apiDefineComponent.d.ts
export type VaporPublicProps = ReservedProps & AllowedComponentProps & ComponentCustomProps;
export type VaporRenderResult<T = Block> = VNode | T | VaporRenderResult<T>[];
type VaporComponentInstanceConstructor<T extends VaporComponentInstance> = {
  __isFragment?: never;
  __isTeleport?: never;
  __isSuspense?: never;
  new (...args: any[]): T;
};
export type DefineVaporComponent<RuntimePropsOptions = {}, RuntimePropsKeys extends string = string, InferredProps = string extends RuntimePropsKeys ? ComponentObjectPropsOptions extends RuntimePropsOptions ? {} : ExtractPropTypes<RuntimePropsOptions> : { [key in RuntimePropsKeys]?: any; }, Emits extends EmitsOptions = {}, RuntimeEmitsKeys extends string = string, Slots extends StaticSlots = StaticSlots, Exposed extends Record<string, any> = Record<string, any>, TypeBlock extends Block = Block, TypeRefs extends Record<string, unknown> = {}, MakeDefaultsOptional extends boolean = true, PublicProps = VaporPublicProps, ResolvedProps = InferredProps & EmitsToProps<Emits>, Defaults = ExtractDefaultPropTypes<RuntimePropsOptions>> = VaporComponentInstanceConstructor<VaporComponentInstance<MakeDefaultsOptional extends true ? keyof Defaults extends never ? Prettify<ResolvedProps> & PublicProps : Partial<Defaults> & Omit<Prettify<ResolvedProps> & PublicProps, keyof Defaults> : Prettify<ResolvedProps> & PublicProps, Emits, Slots, Exposed, TypeBlock, TypeRefs>> & VaporComponentOptions<RuntimePropsOptions | RuntimePropsKeys[], Emits, RuntimeEmitsKeys, Slots, Exposed>;
export type DefineVaporSetupFnComponent<Props extends Record<string, any> = {}, Emits extends EmitsOptions = {}, Slots extends StaticSlots = StaticSlots, Exposed extends Record<string, any> = Record<string, any>, TypeBlock extends Block = Block, ResolvedProps extends Record<string, any> = Props & EmitsToProps<Emits> & VaporPublicProps> = new () => VaporComponentInstance<ResolvedProps, Emits, Slots, Exposed, TypeBlock>;
export declare function defineVaporComponent<Props extends Record<string, any>, Emits extends EmitsOptions = {}, RuntimeEmitsKeys extends string = string, Slots extends StaticSlots = StaticSlots, Exposed extends Record<string, any> = Record<string, any>, TypeBlock extends Block = Block>(setup: (props: Props, ctx: {
  emit: EmitFn<Emits>;
  slots: Slots;
  attrs: Record<string, any>;
  expose: (exposed?: Exposed) => void;
}) => VaporRenderResult<TypeBlock> | Promise<VaporRenderResult<TypeBlock>> | void, extraOptions?: VaporComponentOptions<(keyof NoInfer<Props>)[], Emits, RuntimeEmitsKeys, Slots, Exposed> & ThisType<void>): DefineVaporSetupFnComponent<Props, Emits, Slots, Exposed, TypeBlock>;
export declare function defineVaporComponent<Props extends Record<string, any>, Emits extends EmitsOptions = {}, RuntimeEmitsKeys extends string = string, Slots extends StaticSlots = StaticSlots, Exposed extends Record<string, any> = Record<string, any>, TypeBlock extends Block = Block>(setup: (props: Props, ctx: {
  emit: EmitFn<Emits>;
  slots: Slots;
  attrs: Record<string, any>;
  expose: (exposed?: Exposed) => void;
}) => VaporRenderResult<TypeBlock> | Promise<VaporRenderResult<TypeBlock>> | void, extraOptions?: VaporComponentOptions<ComponentObjectPropsOptions<Props>, Emits, RuntimeEmitsKeys, Slots, Exposed> & ThisType<void>): DefineVaporSetupFnComponent<Props, Emits, Slots, Exposed, TypeBlock>;
export declare function defineVaporComponent<TypeProps, RuntimePropsOptions extends ComponentObjectPropsOptions = ComponentObjectPropsOptions, RuntimePropsKeys extends string = string, TypeEmits extends ComponentTypeEmits = {}, RuntimeEmitsOptions extends EmitsOptions = {}, RuntimeEmitsKeys extends string = string, Slots extends StaticSlots = StaticSlots, Exposed extends Record<string, any> = Record<string, any>, ResolvedEmits extends EmitsOptions = {} extends RuntimeEmitsOptions ? TypeEmitsToOptions<TypeEmits> : RuntimeEmitsOptions, InferredProps = IsKeyValues<TypeProps> extends true ? TypeProps : string extends RuntimePropsKeys ? ComponentObjectPropsOptions extends RuntimePropsOptions ? {} : ExtractPropTypes<RuntimePropsOptions> : { [key in RuntimePropsKeys]?: any; }, TypeRefs extends Record<string, unknown> = {}, TypeBlock extends Block = Block>(options: VaporComponentOptions<RuntimePropsOptions | RuntimePropsKeys[], ResolvedEmits, RuntimeEmitsKeys, Slots, Exposed, TypeBlock, InferredProps> & {
  [key: string]: any;
  /**
   * @private for language-tools use only
   */
  __typeProps?: TypeProps;
  /**
   * @private for language-tools use only
   */
  __typeEmits?: TypeEmits;
  /**
   * @private for language-tools use only
   */
  __typeRefs?: TypeRefs;
  /**
   * @private for language-tools use only
   */
  __typeEl?: TypeBlock;
} & ThisType<void>): DefineVaporComponent<RuntimePropsOptions, RuntimePropsKeys, InferredProps, ResolvedEmits, RuntimeEmitsKeys, Slots, Exposed extends VaporRenderResult ? Record<string, any> : Exposed, TypeBlock, TypeRefs, unknown extends TypeProps ? true : false>;
//#endregion
//#region temp/packages/runtime-vapor/src/component.d.ts
export type VaporComponent = FunctionalVaporComponent<any> | VaporComponentOptions | DefineVaporComponent;
export type FunctionalVaporComponent<Props = {}, Emits extends EmitsOptions = {}, Slots extends StaticSlots = StaticSlots, Exposed extends Record<string, any> = Record<string, any>> = ((props: Props & EmitsToProps<Emits>, ctx: {
  emit: EmitFn<Emits>;
  slots: Slots;
  attrs: Record<string, any>;
  expose: (exposed?: Exposed) => void;
}) => VaporRenderResult) & Omit<VaporComponentOptions<ComponentPropsOptions<Props>, Emits, string, Slots>, "setup"> & {
  displayName?: string;
} & SharedInternalOptions;
export interface VaporComponentOptions<Props = {}, Emits extends EmitsOptions = {}, RuntimeEmitsKeys extends string = string, Slots extends StaticSlots = StaticSlots, Exposed extends Record<string, any> = Record<string, any>, TypeBlock extends Block = Block, InferredProps = ComponentObjectPropsOptions extends Props ? {} : ExtractPropTypes<Props>> extends ComponentInternalOptions, AsyncComponentInternalOptions<VaporComponentOptions, VaporComponentInstance>, SharedInternalOptions {
  inheritAttrs?: boolean;
  props?: Props;
  emits?: Emits | RuntimeEmitsKeys[];
  slots?: Slots;
  setup?: (props: Readonly<InferredProps>, ctx: {
    emit: EmitFn<Emits>;
    slots: Slots;
    attrs: Record<string, any>;
    expose: (exposed?: Exposed) => void;
  }) => VaporRenderResult<TypeBlock> | Exposed | Promise<Exposed> | void;
  render?(ctx: Exposed extends VaporRenderResult ? Record<string, any> : ShallowUnwrapRef<Exposed>, props: Readonly<InferredProps>, emit: EmitFn<Emits>, attrs: any, slots: Slots): VaporRenderResult<TypeBlock> | void;
  name?: string;
  vapor?: boolean;
  components?: Record<string, VaporComponent>;
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
}
type LooseRawProps = Record<string, unknown> & {
  $?: DynamicPropsSource[];
};
export declare function createComponent(component: VaporComponent, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, isSingleRoot?: boolean, once?: boolean, appContext?: GenericAppContext, managedMount?: boolean, ce?: (instance: VaporComponentInstance) => void): VaporComponentInstance;
export declare class VaporComponentInstance<Props extends Record<string, any> = {}, Emits extends EmitsOptions = {}, Slots extends StaticSlots = StaticSlots, Exposed extends Record<string, any> = Record<string, any>, TypeBlock extends Block = Block, TypeRefs extends Record<string, any> = Record<string, any>> implements GenericComponentInstance {
  vapor: true;
  uid: number;
  type: VaporComponent;
  root: GenericComponentInstance | null;
  parent: GenericComponentInstance | null;
  appContext: GenericAppContext;
  get proxy(): Record<string, any>;
  getRootElement(): Node | undefined;
  block: TypeBlock;
  pendingBlock?: Node | Node[];
  scope: EffectScope;
  rawProps: RawProps;
  rawSlots: RawSlots;
  props: Readonly<Props>;
  attrs: Record<string, any>;
  propsDefaults: Record<string, any> | null;
  slots: Slots;
  scopeId?: string | null;
  slotScopeIds?: string[] | null;
  applyCssVars?: (nodes: Block) => void;
  cssVarOutlets?: VaporFragment[];
  interopVNode?: VNode;
  rawPropsRef?: ShallowRef<any>;
  rawSlotsRef?: ShallowRef<any>;
  emit: EmitFn<Emits>;
  emitted: Record<string, boolean> | null;
  expose: (<T extends Record<string, any> = Exposed>(exposed?: T) => void) & string[];
  exposed: Exposed | null;
  exposeProxy: Prettify<ShallowUnwrapRef<Exposed>> | null;
  refs: TypeRefs;
  provides: Record<string, any>;
  ids: [string, number, number];
  suspense: SuspenseBoundary | null;
  suspenseId: number;
  asyncDep: Promise<any> | null;
  asyncResolved: boolean;
  asyncDepRegistered?: boolean;
  hasFallthrough: boolean;
  shapeFlag?: number;
  inputScope?: EffectScope;
  unmountScope?: EffectScope;
  $key?: any;
  deferredKeepAliveUpdates?: DeferredKeepAliveUpdates;
  ce?: ComponentCustomElementInterface;
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
  bum?: LifecycleHook;
  um?: LifecycleHook;
  da?: LifecycleHook;
  a?: LifecycleHook;
  bda?: LifecycleHook;
  ba?: LifecycleHook;
  rtg?: LifecycleHook;
  rtc?: LifecycleHook;
  ec?: LifecycleHook;
  sp?: LifecycleHook<() => Promise<unknown>>;
  effectCount: number;
  setupState?: Exposed extends VaporRenderResult ? Record<string, any> : ShallowUnwrapRef<Exposed>;
  devtoolsRawSetupState?: any;
  hmrRerender?: () => void;
  hmrReload?: (newComp: VaporComponent) => void;
  propsOptions?: NormalizedPropsOptions;
  emitsOptions?: ObjectEmitsOptions | null;
  isSingleRoot?: boolean;
  renderScope?: EffectScope;
  /**
   * dev only flag to track whether $attrs was used during render.
   * If $attrs was used during render then the warning for failed attrs
   * fallthrough can be suppressed.
   */
  accessedAttrs?: boolean;
  /**
   * @deprecated only used for JSX to detect props types.
   */
  $props: Props;
  constructor(comp: VaporComponent, rawProps?: RawProps | null, rawSlots?: LooseRawSlots | null, appContext?: GenericAppContext, once?: boolean, ce?: (instance: VaporComponentInstance) => void);
  /**
   * Expose `getKeysFromRawProps` on the instance so it can be used in code
   * paths where it's needed, e.g. `useModel`
   */
  rawKeys(): string[];
}
export declare function isVaporComponent(value: unknown): value is VaporComponentInstance;
/**
 * Resolve an asset component by name before passing it to the fallback helper;
 * a string passed directly to `createComponentWithFallback` is plain element
 * fallback, not a component name.
 */
export declare function createAssetComponent(name: string, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, isSingleRoot?: boolean, once?: boolean, maybeSelfReference?: boolean, ns?: Namespace, appContext?: GenericAppContext): HTMLElement | VaporComponentInstance;
/**
 * Used when a component cannot be resolved at compile time
 * and needs rely on runtime resolution - where it might fallback to a plain
 * element if the resolution fails.
 */
export declare function createComponentWithFallback(comp: VaporComponent | typeof NULL_DYNAMIC_COMPONENT | string, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, isSingleRoot?: boolean, once?: boolean, ns?: Namespace, appContext?: GenericAppContext): HTMLElement | VaporComponentInstance;
export declare function createPlainElement(comp: string, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, isSingleRoot?: boolean, once?: boolean, ns?: Namespace): HTMLElement;
interface DeferredKeepAliveUpdates {
  effects: SchedulerJob[];
  owners: VaporComponentInstance[];
  suspense: SuspenseBoundary;
  pendingId: number;
  pendingRoot?: VaporComponentInstance;
  flushQueued: boolean;
  flushJob: SchedulerJob;
}
//#endregion
//#region temp/packages/runtime-vapor/src/apiCreateApp.d.ts
export declare const createVaporApp: CreateAppFunction<ParentNode, VaporComponent>;
export declare const createVaporSSRApp: CreateAppFunction<ParentNode, VaporComponent>;
//#endregion
//#region temp/packages/runtime-vapor/src/apiDefineAsyncComponent.d.ts
export declare function defineVaporAsyncComponent<T extends VaporComponent>(source: AsyncComponentLoader<T> | AsyncComponentOptions<T>): T;
//#endregion
//#region temp/packages/runtime-vapor/src/vdomInterop.d.ts
export declare const vaporInteropPlugin: Plugin;
//#endregion
//#region temp/packages/runtime-vapor/src/directives/custom.d.ts
export type VaporDirective<HostElement extends Element = Element, Value = any, Modifiers extends string = string, Arg = any> = (node: HostElement, value?: () => Value, argument?: () => Arg, modifiers?: DirectiveModifiers<Modifiers>) => (() => void) | void;
type AnyVaporDirective = VaporDirective<any>;
type VaporDirectiveArguments = Array<[AnyVaporDirective | undefined] | [AnyVaporDirective | undefined, () => any] | [AnyVaporDirective | undefined, (() => any) | undefined, argument: () => any] | [AnyVaporDirective | undefined, value: (() => any) | undefined, argument: (() => any) | undefined, modifiers: DirectiveModifiers]>;
export declare function withVaporDirectives(node: Element | VaporComponentInstance | VaporFragment, dirs: VaporDirectiveArguments): void;
//#endregion
//#region temp/packages/runtime-vapor/src/components/Teleport.d.ts
export declare const VaporTeleport: DefineVaporSetupFnComponent<TeleportProps>;
//#endregion
//#region temp/packages/runtime-vapor/src/components/KeepAlive.d.ts
type CacheKey = any;
export interface VaporKeepAliveCache {
  get(key: CacheKey): object | void;
  set(key: CacheKey, value: object): void;
  delete(key: CacheKey): void;
  forEach(fn: (value: object, key: CacheKey, map: Map<CacheKey, object>) => void, thisArg?: any): void;
  pruneCacheEntry?: (cached: object) => void;
}
interface VaporKeepAliveProps extends KeepAliveProps {
  matchBy?: string;
  cache?: VaporKeepAliveCache;
}
export declare const VaporKeepAlive: DefineVaporComponent<{}, string, VaporKeepAliveProps>;
//#endregion
//#region temp/packages/runtime-vapor/src/apiDefineCustomElement.d.ts
export type VaporElementConstructor<P = {}> = {
  new (initialProps?: Record<string, any>): VaporElement & P;
};
export declare function defineVaporCustomElement<Props, RawBindings = object>(setup: (props: Props, ctx: {
  attrs: Record<string, any>;
  slots: StaticSlots;
  emit: EmitFn;
  expose: (exposed?: Record<string, any>) => void;
}) => RawBindings | VaporRenderResult, options?: Pick<VaporComponentOptions, "name" | "inheritAttrs" | "emits"> & CustomElementOptions & {
  props?: (keyof NoInfer<Props>)[];
}): VaporElementConstructor<Props>;
export declare function defineVaporCustomElement<Props, RawBindings = object>(setup: (props: Props, ctx: {
  attrs: Record<string, any>;
  slots: StaticSlots;
  emit: EmitFn;
  expose: (exposed?: Record<string, any>) => void;
}) => RawBindings | VaporRenderResult, options?: Pick<VaporComponentOptions, "name" | "inheritAttrs" | "emits"> & CustomElementOptions & {
  props?: ComponentObjectPropsOptions<Props>;
}): VaporElementConstructor<Props>;
export declare function defineVaporCustomElement<RuntimePropsOptions extends ComponentObjectPropsOptions = ComponentObjectPropsOptions, RuntimePropsKeys extends string = string, RuntimeEmitsOptions extends EmitsOptions = {}, RuntimeEmitsKeys extends string = string, Slots extends StaticSlots = StaticSlots, InferredProps = string extends RuntimePropsKeys ? ComponentObjectPropsOptions extends RuntimePropsOptions ? {} : ExtractPropTypes<RuntimePropsOptions> : { [key in RuntimePropsKeys]?: any; }, ResolvedProps = InferredProps & EmitsToProps<RuntimeEmitsOptions>>(options: CustomElementOptions & {
  props?: (RuntimePropsOptions & ThisType<void>) | RuntimePropsKeys[];
  emits?: RuntimeEmitsOptions | RuntimeEmitsKeys[];
  slots?: Slots;
  setup?: (props: Readonly<InferredProps>, ctx: {
    attrs: Record<string, any>;
    slots: Slots;
    emit: EmitFn<RuntimeEmitsOptions>;
    expose: (exposed?: Record<string, any>) => void;
  }) => any;
} & ThisType<void>, extraOptions?: CustomElementOptions): VaporElementConstructor<ResolvedProps>;
export declare function defineVaporCustomElement<T extends DefineVaporComponent<any, any, any, any, any, any, any, any, any, any> | DefineVaporSetupFnComponent<any, any, any, any, any>>(options: T, extraOptions?: CustomElementOptions): VaporElementConstructor<T extends DefineVaporComponent<infer RuntimePropsOptions, any, any, any, any, any, any, any, any, any> ? ComponentObjectPropsOptions extends RuntimePropsOptions ? {} : ExtractPropTypes<RuntimePropsOptions> : T extends DefineVaporSetupFnComponent<infer P extends Record<string, any>, any, any, any, any> ? P : unknown>;
export declare const defineVaporSSRCustomElement: typeof defineVaporCustomElement;
type VaporInnerComponentDef = VaporComponent & CustomElementOptions;
export declare class VaporElement extends VueElementBase<ParentNode, VaporComponent, VaporInnerComponentDef> {
  constructor(def: VaporInnerComponentDef, props?: Record<string, any> | undefined, createAppFn?: CreateAppFunction<ParentNode, VaporComponent>);
  protected _needsHydration(): boolean;
  protected _mount(def: VaporInnerComponentDef): void;
  protected _update(): void;
  protected _unmount(): void;
  private _createComponent;
  /**
   * Only called when shadowRoot is false. The light DOM children parsed on
   * connect become static slots, so `<slot/>` outlets render them in place
   * through the normal slot pipeline instead of a native outlet that has to
   * be replaced after mount.
   */
  private _createSlots;
}
//#endregion
//#region temp/packages/runtime-vapor/src/insertionState.d.ts
type InsertionParent = ParentNode & {
  $llc?: Node | null;
};
/**
 * This function is called before a block type that requires insertion
 * (component, slot outlet, if, for) is created.
 *
 * - `anchor` is a Node: insert before this template `<!>` placeholder during
 *   client render; during hydration the located placeholder unit is the
 *   block's hydration target.
 * - `anchor` is a number: append; the value is the hydration start unit index
 *   (the count of preceding logical units), omitted by codegen when 0.
 * - `anchor` absent: append with no preceding units.
 */
export declare function setInsertionState(parent: ParentNode, anchor?: Node | number): void;
//#endregion
//#region temp/packages/runtime-vapor/src/renderEffect.d.ts
export declare function renderEffect(fn: () => void, noLifecycle?: boolean): void;
//#endregion
//#region temp/packages/runtime-vapor/src/once.d.ts
export declare function withOnce<T>(fn: () => T, value?: boolean): T;
//#endregion
//#region temp/packages/runtime-vapor/src/dom/template.d.ts
export declare function template(html: string, flags?: number, ns?: Namespace): () => Node & {
  $root?: true;
};
//#endregion
//#region temp/packages/runtime-vapor/src/dom/node.d.ts
export declare function createTextNode(value?: string): Text;
export declare function txt(node: ParentNode): Node;
export declare function child(node: InsertionParent, isText?: boolean): Node;
export declare function nthChild(node: InsertionParent, i: number, isText?: boolean): Node;
export declare function next(node: Node, isText?: boolean): Node;
//#endregion
//#region temp/packages/runtime-vapor/src/dom/prop.d.ts
type TargetElement = Element & {
  $root?: true;
  $html?: string;
  $cls?: string;
  $hoverUpdateClass?: () => void;
  $clsFlags?: number;
  $sty?: NormalizedStyle | string | undefined;
  value?: string;
  _value?: any;
};
export declare function setProp(el: any, key: string, value: any): void;
export declare function setAttr(el: any, key: string, value: any, isSVG?: boolean): void;
export declare function setDOMProp(el: any, key: string, value: any, forceHydrate?: boolean, attrName?: string): void;
export declare function setClass(el: TargetElement, value: any, isSVG?: boolean, isNormalized?: boolean): void;
export declare function setClassName(el: TargetElement, flags: number, cls: string | string[], prefix?: string, suffix?: string): void;
export declare function setStyle(el: TargetElement, value: any): void;
export declare function setValue(el: TargetElement, value: any, forceHydrate?: boolean): void;
/**
 * Only called on text nodes!
 * Compiler should also ensure value passed here is already converted by
 * `toDisplayString`
 */
export declare function setText(el: Text & {
  $txt?: string;
}, value: string): void;
/**
 * Used by setDynamicProps and `textContent` bindings, so need to guard with
 * `toDisplayString`
 */
export declare function setElementText(el: Node & {
  $txt?: string;
}, value: unknown): void;
export declare function setHtml(el: TargetElement, value: any): void;
export declare function setDynamicProps(el: any, args: any[], isSVG?: boolean): void;
//#endregion
//#region temp/packages/runtime-vapor/src/dom/event.d.ts
type EventHandler = (...args: any[]) => any;
type EventHandlerValue = EventHandler | EventHandler[];
type MaybeEventHandlerValue = EventHandlerValue | null | undefined;
export declare function on(el: Element, event: string, handler: EventHandlerValue, options?: AddEventListenerOptions): void;
export declare function onBinding(el: Element, event: string, handler: EventHandlerValue, options?: AddEventListenerOptions): void;
export declare function delegate(el: any, event: string, handler: EventHandler): void;
export declare const delegateEvents: (...names: string[]) => void;
export declare function setDynamicEvents(el: HTMLElement, events: Record<string, EventHandlerValue>): void;
export declare function withVaporModifiers<T extends (event: Event, ...args: unknown[]) => any>(fn: T | null | undefined, modifiers: string[]): T;
export declare function withVaporKeys<T extends (event: KeyboardEvent) => any>(fn: T | null | undefined, modifiers: string[]): T;
export declare function createInvoker(handler: MaybeEventHandlerValue): EventHandler;
//#endregion
//#region temp/packages/runtime-vapor/src/apiCreateIf.d.ts
export declare function createIf(condition: () => any, b1: BlockFn, b2?: BlockFn, flags?: number): Block;
//#endregion
//#region temp/packages/runtime-vapor/src/apiCreateFragment.d.ts
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
export declare function createKeyedFragment(key: () => any, render: BlockFn, trackSlotBoundary?: boolean): Block;
//#endregion
//#region temp/packages/runtime-vapor/src/apiCreateFor.d.ts
type Source = any[] | Record<any, any> | number | Set<any> | Map<any, any>;
export declare const createFor: (src: () => Source, renderItem: (item: ShallowRef<any>, key: ShallowRef<any>, index: ShallowRef<number | undefined>) => Block, getKey?: (item: any, key: any, index?: number) => any, flags?: number) => ForFragment;
interface ForSelector {
  (key: any, oper: () => void): void;
  /**
   * Bulk-reset the selector's internal state. Hook into a v-for's fast-reset
   * paths via `forFragment.onReset(selector.reset)` so the lazy per-item
   * `onScopeDispose` teardowns short-circuit instead of doing N individual
   * Map.delete() calls.
   */
  reset(): void;
}
/**
 * Builds a key-indexed selector that activates only the opers registered with
 * the key matching the current source value. Compared to letting each item
 * subscribe directly, this keeps re-renders on source change O(2) instead of
 * O(N) (only previous and new active item re-run).
 *
 * Selector cleanup follows the current scope. Per-item teardown is auto-wired
 * via `onScopeDispose` so callers (typically v-for item scopes) don't need
 * explicit deregistration. For bulk-reset hot paths, attach the selector to
 * the v-for via `frag.onReset(selector.reset)` to skip the per-item Map ops.
 */
export declare function createSelector(source: () => any): ForSelector;
export declare function createForSlots(rawSource: () => Source, renderSlot: (item: ShallowRef, key?: ShallowRef, index?: ShallowRef) => VaporSlot, getName: (item: any, key: any, index?: number) => unknown, getKey?: (item: any, key: any, index?: number) => unknown): () => DynamicSlot[];
export declare function getRestElement(val: any, keys: string[]): any;
export declare function getDefaultValue(val: any, getDefaultVal: () => any): any;
//#endregion
//#region temp/packages/runtime-vapor/src/helpers/useCssVars.d.ts
/**
 * Css vars are root-inherited state: the owner writes its root chain before
 * insertion, containers on that chain write the content they produce later
 * (`bm` hooks; `u` for vdom-owned interop content), and teleports are written
 * directly as outlets since their content leaves the chain.
 */
export declare function useVaporCssVars(getter: () => Record<string, string>): void;
//#endregion
//#region temp/packages/runtime-vapor/src/helpers/setKey.d.ts
export declare function setBlockKey(block: Exclude<Block, Block[]> & {
  $key?: any;
}, key: any): void;
//#endregion
//#region temp/packages/runtime-vapor/src/apiCreateDynamicComponent.d.ts
export declare function createDynamicComponent(getter: () => any, rawProps?: RawProps | null, rawSlots?: LooseRawSlots | null, flags?: number, key?: () => any): Block;
//#endregion
//#region temp/packages/runtime-vapor/src/directives/vShow.d.ts
/**
 * v-show is root-inherited state: it lands on the effective root element of
 * `target`, and any producer on the root chain (dynamic fragment branch,
 * interop subtree, pending async setup) can replace that root later. `apply`
 * resolves the root through the shared chain walker and registers itself on
 * every producer it passes, so a replacement root re-enters `apply` and
 * registers the producers inside it in turn.
 */
export declare function applyVShow(target: Block, source: () => any): void;
//#endregion
//#region temp/packages/runtime-vapor/src/directives/vModel.d.ts
type VaporModelDirective<T extends HTMLElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, Modifiers extends string = string> = (el: T, get: () => any, set: (v: any) => void, modifiers?: { [key in Modifiers]?: true; }) => void;
export declare const applyTextModel: VaporModelDirective<HTMLInputElement | HTMLTextAreaElement, "trim" | "number" | "lazy">;
export declare const applyCheckboxModel: VaporModelDirective<HTMLInputElement>;
export declare const applyRadioModel: VaporModelDirective<HTMLInputElement>;
export declare const applySelectModel: VaporModelDirective<HTMLSelectElement, "number">;
export declare const applyDynamicModel: VaporModelDirective;
//#endregion
//#region temp/packages/runtime-vapor/src/components/Transition.d.ts
export declare const VaporTransition: FunctionalVaporComponent<TransitionProps>;
//#endregion
//#region temp/packages/runtime-vapor/src/components/TransitionGroup.d.ts
export declare const VaporTransitionGroup: DefineVaporComponent<{}, string, TransitionGroupProps>;
//#endregion
export { extend };
// fixed by uts：模块内兼容 UTS TypeScript 5.2，不污染全局 NoInfer。
type NoInfer<T> = [T][T extends any ? 0 : never]
