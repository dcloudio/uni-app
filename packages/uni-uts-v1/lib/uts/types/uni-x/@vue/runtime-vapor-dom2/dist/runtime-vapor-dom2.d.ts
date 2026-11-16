import { AppContext, ComponentInternalOptions, ComponentPropsOptions, ComponentPublicInstance, CreateAppFunction, EffectScope, EmitFn, EmitsOptions, GenericAppContext, GenericComponentInstance, LifecycleHook, NormalizedPropsOptions, ObjectEmitsOptions, SuspenseBoundary, defineComponent, defineComponent as defineVaporSharedDataComponent, ref as ref$1, shallowRef } from "@vue/runtime-core";
import { IfAny, LooseRequired, Prettify, SlotFlags, UnionToIntersection, VaporSingleRoot, VaporSlotStability, extend, hyphenate } from "@vue/shared";
import { ComputedGetter, DebuggerEvent, DebuggerOptions, EffectScope as EffectScope$1, OnCleanup, Reactive, ReactiveEffect, ReactiveFlags, Ref, ShallowRef, ShallowUnwrapRef, UnwrapNestedRefs, WatchCallback, WatchStopHandle, WritableComputedOptions } from "@vue/reactivity";
import "@dcloudio/uni-shared";
import { VaporSlot as VaporSlot$1, defineVaporAsyncComponent } from "@vue/runtime-vapor";
import "@vue/compiler-dom";
import "@vue/compiler-vapor";
import "@vue/compiler-sfc";
import "@dcloudio/uni-app-x/types/dom2-internal/UniCSSTransform";
import "@dcloudio/uni-app-x/types/dom2-internal/UniNativeDefines";
import "@dcloudio/uni-app-x/types/dom2-internal/UniCSSProperty";
import "@dcloudio/uni-app-x/types/dom2-internal/UniCSSTransition";
import { Element as Element$1 } from "@dcloudio/uni-app-x/types/native";
export * from "@vue/runtime-x";
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/fragment.d.ts
declare class VaporFragment {
  readonly __vf = true;
  nodes: Block;
  anchor?: Node;
  parentComponent?: VaporSharedDataComponentInstance | null;
  insert?: (parent: ParentNode, anchor: Node | null) => void;
  remove?: (parent?: ParentNode) => void;
  onUpdated?: ((nodes?: Block) => void)[];
  readonly renderInstance: VaporSharedDataComponentInstance | null;
  readonly slotOwner: VaporSharedDataComponentInstance | null;
  constructor(nodes: Block);
  protected runWithRenderCtx<R>(fn: () => R, scope?: EffectScope$1): R;
}
declare class DynamicFragment extends VaporFragment {
  readonly __df = true;
  scope: EffectScope$1 | undefined;
  current?: BlockFn;
  fallback?: BlockFn;
  everUpdated: boolean;
  getScope?: (key: any) => EffectScope$1 | undefined;
  hasFallthroughAttrs?: true;
  constructor(anchorLabel?: string);
  update(render?: BlockFn | null, key?: any, noScope?: boolean): void;
  private renderBranch;
}
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/apiTemplateRef.d.ts
type NodeRef = string | Ref | ((ref: Element) => void);
type RefEl = UniElement | VaporSharedDataComponentInstance | DynamicFragment | VaporFragment;
type setRefFn = (el: RefEl | null, ref: NodeRef, refFor?: boolean | null, refKey?: string | null) => void;
export declare function createSharedDataTemplateRefSetter(): setRefFn;
export declare function setSharedDataStaticTemplateRef(el: RefEl | null, ref: NodeRef, refFor?: boolean | null, refKey?: string | null): void;
export declare function setSharedDataTemplateRefBinding(el: RefEl | null, getter: () => any, refFor?: boolean | null, refKey?: string | null): void;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/block.d.ts
type Block = Node | VaporFragment | DynamicFragment | VaporSharedDataComponentInstance | Block[] | RefEl;
type BlockFn = (...args: any[]) => void;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/componentProps.d.ts
type RawProps = Record<string, unknown> & {
  $?: DynamicPropsSource[];
};
type DynamicPropsSource = (() => Record<string, unknown> | null | undefined) | Record<string, unknown>;
//#endregion
//#region packages/runtime-core/src/componentSlots.d.ts
type Slot<T extends any = any> = (...args: IfAny<T, any[], [T] | (T extends undefined ? [] : never)>) => VNode[];
type InternalSlots = {
  [name: string]: Slot | undefined;
};
type Slots = Readonly<InternalSlots>;
declare const SlotSymbol: unique symbol;
type SlotsType<T extends Record<string, any> = Record<string, any>> = {
  [SlotSymbol]?: T;
};
type UnwrapSlotsType<S extends SlotsType, T = NonNullable<S[typeof SlotSymbol]>> = [keyof S] extends [never] ? Slots : Readonly<Prettify<{ [K in keyof T]: NonNullable<T[K]> extends ((...args: any[]) => any) ? T[K] : Slot<T[K]>; }>>;
type RawSlots$1 = {
  [name: string]: unknown;
  $stable?: boolean;
  /**
   * for tracking slot owner instance. This is attached during
   * normalizeChildren when the component vnode is created.
   * @internal
   */
  _ctx?: ComponentInternalInstance | null;
  /**
   * indicates compiler generated slots
   * we use a reserved property instead of a vnode patchFlag because the slots
   * object may be directly passed down to a child component in a manual
   * render function, and the optimization hint need to be on the slot object
   * itself to be preserved.
   * @internal
   */
  _?: SlotFlags;
};
//#endregion
//#region packages/runtime-core/src/scheduler.d.ts
declare enum SchedulerJobFlags {
  QUEUED = 1,
  /**
   * Indicates whether the effect is allowed to recursively trigger itself
   * when managed by the scheduler.
   *
   * By default, a job cannot trigger itself because some built-in method calls,
   * e.g. Array.prototype.push actually performs reads as well (#1740) which
   * can lead to confusing infinite loops.
   * The allowed cases are component update functions and watch callbacks.
   * Component update functions may update child component props, which in turn
   * trigger flush: "pre" watch callbacks that mutates state that the parent
   * relies on (#1801). Watch callbacks doesn't track its dependencies so if it
   * triggers itself again, it's likely intentional and it is the user's
   * responsibility to perform recursive state mutation that eventually
   * stabilizes (#1727).
   */
  ALLOW_RECURSE = 2,
  DISPOSED = 4,
  /**
   * Requeue a Suspense effect if its pending branch is discarded.
   * @internal
   */
  REQUEUE_ON_SUSPENSE_DISCARD = 8,
  /**
   * A post job buffered by a suspense boundary is queued as soon as that
   * boundary resolves.
   */
  FLUSH_ON_SUSPENSE_RESOLVE = 16
}
interface SchedulerJob extends Function {
  order?: number;
  /**
   * flags can technically be undefined, but it can still be used in bitwise
   * operations just like 0.
   */
  flags?: SchedulerJobFlags;
  /**
   * Attached by renderer.ts when setting up a component's render effect
   * Used to obtain component information when reporting max recursive updates.
   * Also set on watcher jobs: null marks a watcher without an owner component.
   */
  i?: GenericComponentInstance$1 | null;
}
declare function nextTick(): Promise<void>;
declare function nextTick<T, R>(this: T, fn: (this: T) => R | Promise<R>): Promise<R>;
declare function nextTick<T, R>(this: T, fn: (this: T) => R | Promise<R>, instance: GenericComponentInstance$1): Promise<R>;
//#endregion
//#region packages/runtime-core/src/componentProps.d.ts
type ComponentPropsOptions$1<P = Data> = ComponentObjectPropsOptions<P> | string[];
type ComponentObjectPropsOptions<P = Data> = { [K in keyof P]: Prop<P[K]> | null; };
type Prop<T, D = T> = PropOptions<T, D> | PropType<T>;
type DefaultFactory<T> = (props: Data) => T | null | undefined;
interface PropOptions<T = any, D = T> {
  type?: PropType<T> | true | null;
  required?: boolean;
  default?: D | DefaultFactory<D> | null | undefined | object;
  validator?(value: unknown, props: Data): boolean;
  /**
   * @internal
   */
  skipCheck?: boolean;
  /**
   * @internal
   */
  skipFactory?: boolean;
}
type PropType<T> = PropConstructor<T> | (PropConstructor<T> | null)[];
type PropConstructor<T = any> = {
  new (...args: any[]): T & {};
} | {
  (): T;
} | PropMethod<T>;
type PropMethod<T, TConstructor = any> = {
  new (): TConstructor;
  (): T;
  readonly prototype: TConstructor;
};
type RequiredKeys<T> = { [K in keyof T]: T[K] extends {
  required: true;
} | {
  default: any;
} | BooleanConstructor | {
  type: BooleanConstructor;
} ? T[K] extends {
  default: undefined | (() => undefined);
} ? never : K : never; }[keyof T];
type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;
type DefaultKeys<T> = { [K in keyof T]: T[K] extends {
  default: any;
} | BooleanConstructor | {
  type: BooleanConstructor;
} ? T[K] extends {
  type: BooleanConstructor;
  required: true;
} ? never : K : never; }[keyof T];
type InferPropType<T, NullAsAny = true> = [T] extends [null] ? NullAsAny extends true ? any : null : [T] extends [{
  type: null | true;
}] ? any : [T] extends [ObjectConstructor | {
  type: ObjectConstructor;
}] ? Record<string, any> : [T] extends [BooleanConstructor | {
  type: BooleanConstructor;
}] ? boolean : [T] extends [DateConstructor | {
  type: DateConstructor;
}] ? Date : [T] extends [(infer U)[] | {
  type: (infer U)[];
}] ? U extends DateConstructor ? Date | InferPropType<U, false> : InferPropType<U, false> : [T] extends [Prop<infer V, infer D>] ? unknown extends V ? keyof V extends never ? IfAny<V, V, unknown extends D ? V : D> : V : V : T;
/**
 * Extract prop types from a runtime props options object.
 * The extracted types are **internal** - i.e. the resolved props received by
 * the component.
 * - Boolean props are always present
 * - Props with default values are always present
 *
 * To extract accepted props from the parent, use {@link ExtractPublicPropTypes}.
 */
type ExtractPropTypes<O> = { [K in keyof Pick<O, RequiredKeys<O>>]: O[K] extends {
  default: any;
} ? Exclude<InferPropType<O[K]>, undefined> : InferPropType<O[K]>; } & { [K in keyof Pick<O, OptionalKeys<O>>]?: InferPropType<O[K]>; };
declare enum BooleanFlags {
  shouldCast = 0,
  shouldCastTrue = 1,
  externalClasses = 2
}
type ExtractDefaultPropTypes<O> = O extends object ? { [K in keyof Pick<O, DefaultKeys<O>>]: InferPropType<O[K]>; } : {};
type NormalizedProp = PropOptions & {
  [BooleanFlags.shouldCast]?: boolean;
  [BooleanFlags.shouldCastTrue]?: boolean;
  [BooleanFlags.externalClasses]?: boolean;
};
/**
 * normalized value is a tuple of the actual normalized options
 * and an array of prop keys that need value casting (booleans and defaults)
 */
type NormalizedProps = Record<string, NormalizedProp>;
type NormalizedPropsOptions$1 = [NormalizedProps, string[]] | [];
//#endregion
//#region packages/runtime-core/src/apiSetupHelpers.d.ts
type ComponentTypeEmits = ((...args: any[]) => any) | Record<string, any>;
//#endregion
//#region packages/runtime-core/src/componentEmits.d.ts
type ObjectEmitsOptions$1 = Record<string, ((...args: any[]) => any) | null | any[]>;
type EmitsOptions$1 = ObjectEmitsOptions$1 | string[];
type EmitsToProps<T extends EmitsOptions$1 | ComponentTypeEmits> = T extends string[] ? { [K in `on${Capitalize<T[number]>}`]?: (...args: any[]) => any; } : T extends ObjectEmitsOptions$1 ? { [K in string & keyof T as `on${Capitalize<K>}`]?: (...args: T[K] extends ((...args: infer P) => any) ? P : T[K] extends null ? any[] : T[K] extends any[] ? T[K] : never) => any; } : {};
type ShortEmitsToObject<E> = E extends Record<string, any[]> ? { [K in keyof E]: (...args: E[K]) => any; } : E;
type EmitFn$1<Options = ObjectEmitsOptions$1, Event extends keyof Options = keyof Options> = Options extends Array<infer V> ? (event: V, ...args: any[]) => void : {} extends Options ? (event: string, ...args: any[]) => void : UnionToIntersection<{ [key in Event]: Options[key] extends ((...args: infer Args) => any) ? (event: key, ...args: Args) => void : Options[key] extends any[] ? (event: key, ...args: Options[key]) => void : (event: key, ...args: any[]) => void; }[Event]>;
//#endregion
//#region packages/runtime-core/src/directives.d.ts
interface DirectiveBinding<Value = any, Modifiers extends string = string, Arg = any> {
  instance: ComponentPublicInstance$1 | Record<string, any> | null;
  value: Value;
  oldValue: Value | null;
  arg?: Arg;
  modifiers: DirectiveModifiers<Modifiers>;
  dir: ObjectDirective$1<any, Value, Modifiers, Arg>;
}
type DirectiveHook<HostElement = any, Prev = VNode<any, HostElement> | null, Value = any, Modifiers extends string = string, Arg = any> = (el: HostElement, binding: DirectiveBinding<Value, Modifiers, Arg>, vnode: VNode<any, HostElement>, prevVNode: Prev) => void;
type SSRDirectiveHook<Value = any, Modifiers extends string = string, Arg = any> = (binding: DirectiveBinding<Value, Modifiers, Arg>, vnode: VNode) => Data | undefined;
interface ObjectDirective$1<HostElement = any, Value = any, Modifiers extends string = string, Arg = any> {
  /**
   * @internal without this, ts-expect-error in directives.test-d.ts somehow
   * fails when running tsc, but passes in IDE and when testing against built
   * dts. Could be a TS bug.
   */
  __mod?: Modifiers;
  created?: DirectiveHook<HostElement, null, Value, Modifiers, Arg>;
  beforeMount?: DirectiveHook<HostElement, null, Value, Modifiers, Arg>;
  mounted?: DirectiveHook<HostElement, null, Value, Modifiers, Arg>;
  beforeUpdate?: DirectiveHook<HostElement, VNode<any, HostElement>, Value, Modifiers, Arg>;
  updated?: DirectiveHook<HostElement, VNode<any, HostElement>, Value, Modifiers, Arg>;
  beforeUnmount?: DirectiveHook<HostElement, null, Value, Modifiers, Arg>;
  unmounted?: DirectiveHook<HostElement, null, Value, Modifiers, Arg>;
  getSSRProps?: SSRDirectiveHook<Value, Modifiers, Arg>;
  deep?: boolean;
}
type FunctionDirective<HostElement = any, V = any, Modifiers extends string = string, Arg = any> = DirectiveHook<HostElement, any, V, Modifiers, Arg>;
type Directive<HostElement = any, Value = any, Modifiers extends string = string, Arg = any> = ObjectDirective$1<HostElement, Value, Modifiers, Arg> | FunctionDirective<HostElement, Value, Modifiers, Arg>;
type DirectiveModifiers<K extends string = string> = Partial<Record<K, boolean>>;
//#endregion
//#region packages/runtime-core/src/componentPublicInstance.d.ts
/**
 * Custom properties added to component instances in any way and can be accessed through `this`
 *
 * @example
 * Here is an example of adding a property `$router` to every component instance:
 * ```ts
 * import { createApp } from 'vue'
 * import { Router, createRouter } from 'vue-router'
 *
 * declare module 'vue' {
 *   interface ComponentCustomProperties {
 *     $router: Router
 *   }
 * }
 *
 * // effectively adding the router to every component instance
 * const app = createApp({})
 * const router = createRouter()
 * app.config.globalProperties.$router = router
 *
 * const vm = app.mount('#app')
 * // we can access the router from the instance
 * vm.$router.push('/')
 * ```
 */
interface ComponentCustomProperties {}
type IsDefaultMixinComponent<T> = T extends ComponentOptionsMixin ? ComponentOptionsMixin extends T ? true : false : false;
type MixinToOptionTypes<T> = T extends ComponentOptionsBase<infer P, infer B, infer D, infer C, infer M, infer Mixin, infer Extends, any, any, infer Defaults, any, any, any, any, any, any, any> ? OptionTypesType<P & {}, B & {}, D & {}, C & {}, M & {}, Defaults & {}> & IntersectionMixin<Mixin> & IntersectionMixin<Extends> : never;
type ExtractMixin<T> = {
  Mixin: MixinToOptionTypes<T>;
}[T extends ComponentOptionsMixin ? "Mixin" : never];
type IntersectionMixin<T> = IsDefaultMixinComponent<T> extends true ? OptionTypesType : UnionToIntersection<ExtractMixin<T>>;
type UnwrapMixinsType<T, Type extends OptionTypesKeys> = T extends OptionTypesType ? T[Type] : never;
type EnsureNonVoid<T> = T extends void ? {} : T;
type ComponentPublicInstanceConstructor<T extends ComponentPublicInstance$1<Props, RawBindings, D, C, M> = ComponentPublicInstance$1<any>, Props = any, RawBindings = any, D = any, C extends ComputedOptions = ComputedOptions, M extends MethodOptions = MethodOptions> = {
  __isFragment?: never;
  __isTeleport?: never;
  __isSuspense?: never;
  new (...args: any[]): T;
};
/**
 * This is the same as `CreateComponentPublicInstance` but adds local components,
 * global directives, exposed, and provide inference.
 * It changes the arguments order so that we don't need to repeat mixin
 * inference everywhere internally, but it has to be a new type to avoid
 * breaking types that relies on previous arguments order (#10842)
 */
type CreateComponentPublicInstanceWithMixins<P = {}, B = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions$1 = {}, PublicProps = P, Defaults = {}, MakeDefaultsOptional extends boolean = false, I extends ComponentInjectOptions = {}, S extends SlotsType = {}, LC extends Record<string, Component> = {}, Directives extends Record<string, Directive> = {}, Exposed extends string = string, TypeRefs extends Data = {}, TypeEl = any, Provide extends ComponentProvideOptions = ComponentProvideOptions, PublicMixin = IntersectionMixin<Mixin> & IntersectionMixin<Extends>, PublicP = UnwrapMixinsType<PublicMixin, "P"> & EnsureNonVoid<P>, PublicB = UnwrapMixinsType<PublicMixin, "B"> & EnsureNonVoid<B>, PublicD = UnwrapMixinsType<PublicMixin, "D"> & EnsureNonVoid<D>, PublicC extends ComputedOptions = UnwrapMixinsType<PublicMixin, "C"> & EnsureNonVoid<C>, PublicM extends MethodOptions = UnwrapMixinsType<PublicMixin, "M"> & EnsureNonVoid<M>, PublicDefaults = UnwrapMixinsType<PublicMixin, "Defaults"> & EnsureNonVoid<Defaults>> = ComponentPublicInstance$1<PublicP, PublicB, PublicD, PublicC, PublicM, E, PublicProps, PublicDefaults, MakeDefaultsOptional, ComponentOptionsBase<P, B, D, C, M, Mixin, Extends, E, string, Defaults, {}, string, S, LC, Directives, Exposed, Provide>, I, S, Exposed, TypeRefs, TypeEl>;
type ExposedKeys<T, Exposed extends string & keyof T> = "" extends Exposed ? T : Pick<T, Exposed>;
type ComponentPublicInstance$1<P = {}, B = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, E extends EmitsOptions$1 = {}, PublicProps = {}, Defaults = {}, MakeDefaultsOptional extends boolean = false, Options = ComponentOptionsBase<any, any, any, any, any, any, any, any, any>, I extends ComponentInjectOptions = {}, S extends SlotsType = {}, Exposed extends string = "", TypeRefs extends Data = {}, TypeEl = any> = {
  $: ComponentInternalInstance;
  $data: D;
  $props: MakeDefaultsOptional extends true ? Partial<Defaults> & Omit<Prettify<P> & PublicProps, keyof Defaults> : Prettify<P> & PublicProps;
  $attrs: Attrs;
  $refs: Data & TypeRefs;
  $slots: UnwrapSlotsType<S>;
  $root: ComponentPublicInstance$1 | null;
  $parent: ComponentPublicInstance$1 | null;
  $host: Element | null;
  $emit: EmitFn$1<E>;
  $el: TypeEl;
  $options: Options & MergedComponentOptionsOverride;
  $forceUpdate: () => void;
  $nextTick: typeof nextTick;
  $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends ((...args: any) => infer R) ? (...args: [R, R, OnCleanup]) => any : (...args: [any, any, OnCleanup]) => any, options?: WatchOptions): WatchStopHandle;
} & ExposedKeys<IfAny<P, P, Readonly<Defaults> & Omit<P, keyof ShallowUnwrapRef<B> | keyof Defaults>> & ShallowUnwrapRef<B> & UnwrapNestedRefs<D> & ExtractComputedReturns<C> & M & ComponentCustomProperties & InjectToObject<I>, Exposed>;
//#endregion
//#region packages/runtime-core/src/apiWatch.d.ts
interface WatchEffectOptions extends DebuggerOptions {
  flush?: "pre" | "post" | "sync";
}
interface WatchOptions<Immediate = boolean> extends WatchEffectOptions {
  immediate?: Immediate;
  deep?: boolean | number;
  once?: boolean;
}
//#endregion
//#region packages/runtime-core/src/enums.d.ts
declare enum LifecycleHooks {
  BEFORE_CREATE = "bc",
  CREATED = "c",
  BEFORE_MOUNT = "bm",
  MOUNTED = "m",
  BEFORE_UPDATE = "bu",
  UPDATED = "u",
  BEFORE_UNMOUNT = "bum",
  UNMOUNTED = "um",
  DEACTIVATED = "da",
  ACTIVATED = "a",
  RENDER_TRIGGERED = "rtg",
  RENDER_TRACKED = "rtc",
  ERROR_CAPTURED = "ec",
  SERVER_PREFETCH = "sp"
}
//#endregion
//#region packages/runtime-core/src/components/Suspense.d.ts
interface SuspenseProps {
  onResolve?: () => void;
  onPending?: () => void;
  onFallback?: () => void;
  /**
   * Switch to fallback content if it takes longer than `timeout` milliseconds to render the new default content.
   * A `timeout` value of `0` will cause the fallback content to be displayed immediately when default content is replaced.
   */
  timeout?: string | number;
  /**
   * Allow suspense to be captured by parent suspense
   *
   * @default false
   */
  suspensible?: boolean;
}
declare const SuspenseImpl: {
  name: string;
  __isSuspense: boolean;
  process(n1: VNode | null, n2: VNode, container: RendererElement, anchor: RendererNode | null, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary$1 | null, namespace: ElementNamespace, slotScopeIds: string[] | null, optimized: boolean, rendererInternals: RendererInternals): void;
  hydrate: typeof hydrateSuspense;
  normalize: typeof normalizeSuspenseChildren;
};
declare const Suspense: {
  __isSuspense: true;
  new (): {
    $props: VNodeProps & SuspenseProps;
    $slots: {
      default(): VNode[];
      fallback(): VNode[];
    };
  };
};
interface SuspenseBoundary$1 {
  vnode: VNode<RendererNode, RendererElement, SuspenseProps>;
  parent: SuspenseBoundary$1 | null;
  parentComponent: ComponentInternalInstance | null;
  namespace: ElementNamespace;
  container: RendererElement;
  hiddenContainer: RendererElement;
  activeBranch: VNode | null;
  isFallbackMountPending: boolean;
  pendingBranch: VNode | null;
  deps: number;
  pendingId: number;
  timeout: number;
  timeoutTimer: ReturnType<typeof setTimeout> | undefined;
  isInFallback: boolean;
  isHydrating: boolean;
  isUnmounted: boolean;
  effects: Function[];
  resolve(force?: boolean, sync?: boolean): void;
  fallback(fallbackVNode: VNode): void;
  move(container: RendererElement, anchor: RendererNode | null, type: MoveType): void;
  next(): RendererNode | null;
  registerDep(instance: GenericComponentInstance$1, onResolve: (setupResult: unknown) => void): void;
  unmount(parentSuspense: SuspenseBoundary$1 | null, doRemove?: boolean): void;
}
declare function hydrateSuspense(node: Node, vnode: VNode, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary$1 | null, namespace: ElementNamespace, slotScopeIds: string[] | null, optimized: boolean, rendererInternals: RendererInternals, hydrateNode: (node: Node, vnode: VNode, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary$1 | null, slotScopeIds: string[] | null, optimized: boolean) => Node | null): Node | null;
declare function normalizeSuspenseChildren(vnode: VNode): void;
//#endregion
//#region packages/runtime-core/src/components/BaseTransition.d.ts
type Hook<T = () => void> = T | T[];
interface BaseTransitionProps<HostElement = RendererElement> {
  mode?: "in-out" | "out-in" | "default";
  appear?: boolean;
  persisted?: boolean;
  onBeforeEnter?: Hook<(el: HostElement) => void>;
  onEnter?: Hook<(el: HostElement, done: () => void) => void>;
  onAfterEnter?: Hook<(el: HostElement) => void>;
  onEnterCancelled?: Hook<(el: HostElement) => void>;
  onBeforeLeave?: Hook<(el: HostElement) => void>;
  onLeave?: Hook<(el: HostElement, done: () => void) => void>;
  onAfterLeave?: Hook<(el: HostElement) => void>;
  onLeaveCancelled?: Hook<(el: HostElement) => void>;
  onBeforeAppear?: Hook<(el: HostElement) => void>;
  onAppear?: Hook<(el: HostElement, done: () => void) => void>;
  onAfterAppear?: Hook<(el: HostElement) => void>;
  onAppearCancelled?: Hook<(el: HostElement) => void>;
}
interface TransitionHooks<HostElement = RendererElement> {
  mode: BaseTransitionProps["mode"];
  persisted: boolean;
  beforeEnter(el: HostElement): void;
  enter(el: HostElement): void;
  leave(el: HostElement, remove: () => void): void;
  clone(vnode: VNode): TransitionHooks<HostElement>;
  afterLeave?(): void;
  delayLeave?(el: HostElement, earlyRemove: () => void, delayedLeave: () => void): void;
  delayedLeave?(): void;
}
interface TransitionState {
  isMounted: boolean;
  isLeaving: boolean;
  isUnmounting: boolean;
  leavingNodes: Map<any, Record<string, any>>;
}
//#endregion
//#region packages/runtime-core/src/renderer.d.ts
type ElementNamespace = "svg" | "mathml" | undefined;
interface RendererOptions<HostNode = RendererNode, HostElement = RendererElement> {
  patchProp(el: HostElement, key: string, prevValue: any, nextValue: any, namespace?: ElementNamespace, parentComponent?: ComponentInternalInstance | null, hostInstance?: ComponentInternalInstance | null): void;
  forcePatchProp?(el: HostElement, key: string): boolean;
  insert(el: HostNode, parent: HostElement, anchor?: HostNode | null): void;
  remove(el: HostNode): void;
  createElement(type: string, container: RendererElement): HostElement;
  createText(text: string, container: RendererElement, isAnchor?: boolean): HostNode;
  createComment(text: string, container: RendererElement): HostNode;
  setText(node: HostNode, text: string): void;
  setElementText(node: HostElement, text: string): void;
  parentNode(node: HostNode): HostElement | null;
  nextSibling(node: HostNode): HostNode | null;
  querySelector?(selector: string, parentComponent: GenericComponentInstance$1 | null): HostElement | null;
  setScopeId?(el: HostElement, id: string): void;
  cloneNode?(node: HostNode): HostNode;
  insertStaticContent?(content: string, parent: HostElement, anchor: HostNode | null, namespace: ElementNamespace, start?: HostNode | null, end?: HostNode | null): [HostNode, HostNode];
}
interface RendererNode {
  [key: string | symbol]: any;
}
interface RendererElement extends RendererNode {}
interface RendererInternals<HostNode = RendererNode, HostElement = RendererElement> {
  p: PatchFn;
  um: UnmountFn;
  r: RemoveFn;
  m: MoveFn;
  mt: MountComponentFn;
  umt: UnmountComponentFn;
  mc: MountChildrenFn;
  pc: PatchChildrenFn;
  pbc: PatchBlockChildrenFn;
  n: NextFn;
  o: RendererOptions<HostNode, HostElement>;
}
type PatchFn = (n1: VNode | null, n2: VNode, container: RendererElement, anchor?: RendererNode | null, parentComponent?: ComponentInternalInstance | null, parentSuspense?: SuspenseBoundary$1 | null, namespace?: ElementNamespace, slotScopeIds?: string[] | null, optimized?: boolean) => void;
type MountChildrenFn = (children: VNodeArrayChildren, container: RendererElement, anchor: RendererNode | null, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary$1 | null, namespace: ElementNamespace, slotScopeIds: string[] | null, optimized: boolean, start?: number) => void;
type PatchChildrenFn = (n1: VNode | null, n2: VNode, container: RendererElement, anchor: RendererNode | null, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary$1 | null, namespace: ElementNamespace, slotScopeIds: string[] | null, optimized: boolean) => void;
type PatchBlockChildrenFn = (oldChildren: VNode[], newChildren: VNode[], fallbackContainer: RendererElement, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary$1 | null, namespace: ElementNamespace, slotScopeIds: string[] | null) => void;
type MoveFn = (vnode: VNode, container: RendererElement, anchor: RendererNode | null, type: MoveType, parentComponent: ComponentInternalInstance | null, parentSuspense?: SuspenseBoundary$1 | null) => void;
type NextFn = (vnode: VNode) => RendererNode | null;
type UnmountFn = (vnode: VNode, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary$1 | null, doRemove?: boolean, optimized?: boolean) => void;
type RemoveFn = (vnode: VNode) => void;
type MountComponentFn = (initialVNode: VNode, container: RendererElement, anchor: RendererNode | null, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary$1 | null, namespace: ElementNamespace, optimized: boolean) => void;
type UnmountComponentFn = (instance: ComponentInternalInstance, parentSuspense: SuspenseBoundary$1 | null, doRemove?: boolean) => void;
declare enum MoveType {
  ENTER = 0,
  LEAVE = 1,
  REORDER = 2
}
//#endregion
//#region packages/runtime-core/src/components/KeepAlive.d.ts
type MatchPattern = string | RegExp | (string | RegExp)[];
interface KeepAliveProps {
  include?: MatchPattern;
  exclude?: MatchPattern;
  max?: number | string;
}
//#endregion
//#region packages/runtime-core/src/apiLifecycle.d.ts
type DebuggerHook = (e: DebuggerEvent) => void;
type ErrorCapturedHook<TError = unknown> = (err: TError, instance: ComponentPublicInstance$1 | null, info: string) => boolean | void;
//#endregion
//#region packages/runtime-core/src/compat/compatConfig.d.ts
declare enum DeprecationTypes {
  GLOBAL_MOUNT = "GLOBAL_MOUNT",
  GLOBAL_MOUNT_CONTAINER = "GLOBAL_MOUNT_CONTAINER",
  GLOBAL_EXTEND = "GLOBAL_EXTEND",
  GLOBAL_PROTOTYPE = "GLOBAL_PROTOTYPE",
  GLOBAL_SET = "GLOBAL_SET",
  GLOBAL_DELETE = "GLOBAL_DELETE",
  GLOBAL_OBSERVABLE = "GLOBAL_OBSERVABLE",
  GLOBAL_PRIVATE_UTIL = "GLOBAL_PRIVATE_UTIL",
  CONFIG_SILENT = "CONFIG_SILENT",
  CONFIG_DEVTOOLS = "CONFIG_DEVTOOLS",
  CONFIG_KEY_CODES = "CONFIG_KEY_CODES",
  CONFIG_PRODUCTION_TIP = "CONFIG_PRODUCTION_TIP",
  CONFIG_IGNORED_ELEMENTS = "CONFIG_IGNORED_ELEMENTS",
  CONFIG_WHITESPACE = "CONFIG_WHITESPACE",
  CONFIG_OPTION_MERGE_STRATS = "CONFIG_OPTION_MERGE_STRATS",
  INSTANCE_SET = "INSTANCE_SET",
  INSTANCE_DELETE = "INSTANCE_DELETE",
  INSTANCE_DESTROY = "INSTANCE_DESTROY",
  INSTANCE_EVENT_EMITTER = "INSTANCE_EVENT_EMITTER",
  INSTANCE_EVENT_HOOKS = "INSTANCE_EVENT_HOOKS",
  INSTANCE_CHILDREN = "INSTANCE_CHILDREN",
  INSTANCE_LISTENERS = "INSTANCE_LISTENERS",
  INSTANCE_SCOPED_SLOTS = "INSTANCE_SCOPED_SLOTS",
  INSTANCE_ATTRS_CLASS_STYLE = "INSTANCE_ATTRS_CLASS_STYLE",
  OPTIONS_DATA_FN = "OPTIONS_DATA_FN",
  OPTIONS_DATA_MERGE = "OPTIONS_DATA_MERGE",
  OPTIONS_BEFORE_DESTROY = "OPTIONS_BEFORE_DESTROY",
  OPTIONS_DESTROYED = "OPTIONS_DESTROYED",
  WATCH_ARRAY = "WATCH_ARRAY",
  PROPS_DEFAULT_THIS = "PROPS_DEFAULT_THIS",
  V_ON_KEYCODE_MODIFIER = "V_ON_KEYCODE_MODIFIER",
  CUSTOM_DIR = "CUSTOM_DIR",
  ATTR_FALSE_VALUE = "ATTR_FALSE_VALUE",
  ATTR_ENUMERATED_COERCION = "ATTR_ENUMERATED_COERCION",
  TRANSITION_CLASSES = "TRANSITION_CLASSES",
  TRANSITION_GROUP_ROOT = "TRANSITION_GROUP_ROOT",
  COMPONENT_ASYNC = "COMPONENT_ASYNC",
  COMPONENT_FUNCTIONAL = "COMPONENT_FUNCTIONAL",
  COMPONENT_V_MODEL = "COMPONENT_V_MODEL",
  RENDER_FUNCTION = "RENDER_FUNCTION",
  FILTERS = "FILTERS",
  PRIVATE_APIS = "PRIVATE_APIS"
}
type CompatConfig = Partial<Record<DeprecationTypes, boolean | "suppress-warning">> & {
  MODE?: 2 | 3 | ((comp: Component | null) => 2 | 3);
};
//#endregion
//#region packages/runtime-core/src/componentOptions.d.ts
/**
 * Interface for declaring custom options.
 *
 * @example
 * ```ts
 * declare module 'vue' {
 *   interface ComponentCustomOptions {
 *     beforeRouteUpdate?(
 *       to: Route,
 *       from: Route,
 *       next: () => void
 *     ): void
 *   }
 * }
 * ```
 */
interface ComponentCustomOptions {}
/**
 * Registry for additional render result types.
 *
 * @example
 * ```ts
 * import type { VaporRenderResult } from 'vue'
 *
 * declare module 'vue' {
 *   interface RenderResultExtensions {
 *     vapor: VaporRenderResult
 *   }
 * }
 * ```
 */
interface RenderResultExtensions {}
type RenderResult = VNodeChild | RenderResultExtensions[keyof RenderResultExtensions] | RenderResult[];
type RenderFunction = () => RenderResult;
interface ComponentOptionsBase<Props, RawBindings, D, C extends ComputedOptions, M extends MethodOptions, Mixin extends ComponentOptionsMixin, Extends extends ComponentOptionsMixin, E extends EmitsOptions$1, EE extends string = string, Defaults = {}, I extends ComponentInjectOptions = {}, II extends string = string, S extends SlotsType = {}, LC extends Record<string, Component> = {}, Directives extends Record<string, Directive> = {}, Exposed extends string = string, Provide extends ComponentProvideOptions = ComponentProvideOptions> extends LegacyOptions<Props, D, C, M, Mixin, Extends, I, II, Provide>, ComponentInternalOptions$1, AsyncComponentInternalOptions, ComponentCustomOptions {
  setup?: (this: void, props: LooseRequired<Props & Prettify<UnwrapMixinsType<IntersectionMixin<Mixin> & IntersectionMixin<Extends>, "P">>>, ctx: SetupContext<E, S>) => Promise<RawBindings> | RawBindings | RenderFunction | void;
  name?: string;
  template?: string | object;
  render?: Function;
  components?: LC & Record<string, Component>;
  directives?: Directives & Record<string, Directive>;
  inheritAttrs?: boolean;
  emits?: (E | EE[]) & ThisType<void>;
  slots?: S;
  expose?: Exposed[];
  serverPrefetch?(): void | Promise<any>;
  compilerOptions?: RuntimeCompilerOptions;
  /**
   * SSR only. This is produced by compiler-ssr and attached in compiler-sfc
   * not user facing, so the typing is lax and for test only.
   * @internal
   */
  ssrRender?: (ctx: any, push: (item: any) => void, parentInstance: ComponentInternalInstance, attrs: Data | undefined, $props: ComponentInternalInstance["props"], $setup: ComponentInternalInstance["setupState"], $data: ComponentInternalInstance["data"], $options: ComponentInternalInstance["ctx"]) => void;
  /**
   * Only generated by compiler-sfc to mark a ssr render function inlined and
   * returned from setup()
   * @internal
   */
  __ssrInlineRender?: boolean;
  call?: (this: unknown, ...args: unknown[]) => never;
  __isFragment?: never;
  __isTeleport?: never;
  __isSuspense?: never;
  __defaults?: Defaults;
}
/**
 * Subset of compiler options that makes sense for the runtime.
 */
interface RuntimeCompilerOptions {
  isCustomElement?: (tag: string) => boolean;
  whitespace?: "preserve" | "condense";
  comments?: boolean;
  delimiters?: [string, string];
}
type ComponentOptions<Props = {}, RawBindings = any, D = any, C extends ComputedOptions = any, M extends MethodOptions = any, Mixin extends ComponentOptionsMixin = any, Extends extends ComponentOptionsMixin = any, E extends EmitsOptions$1 = any, EE extends string = string, Defaults = {}, I extends ComponentInjectOptions = {}, II extends string = string, S extends SlotsType = {}, LC extends Record<string, Component> = {}, Directives extends Record<string, Directive> = {}, Exposed extends string = string, Provide extends ComponentProvideOptions = ComponentProvideOptions> = ComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, Defaults, I, II, S, LC, Directives, Exposed, Provide> & ThisType<CreateComponentPublicInstanceWithMixins<{}, RawBindings, D, C, M, Mixin, Extends, E, Readonly<Props>, Defaults, false, I, S, LC, Directives>>;
type ComponentOptionsMixin = ComponentOptionsBase<any, any, any, any, any, ComponentOptionsMixin, any, any, any, any, any, any, any, any, any, any, any>;
type ComputedOptions = Record<string, ComputedGetter<any> | WritableComputedOptions<any>>;
interface MethodOptions {
  [key: string]: Function;
}
type ExtractComputedReturns<T extends any> = { [key in keyof T]: T[key] extends {
  get: (...args: any[]) => infer TReturn;
} ? TReturn : T[key] extends ((...args: any[]) => infer TReturn) ? TReturn : never; };
type ObjectWatchOptionItem = {
  handler: WatchCallback | string;
} & WatchOptions;
type WatchOptionItem = string | WatchCallback | ObjectWatchOptionItem;
type ComponentWatchOptionItem = WatchOptionItem | WatchOptionItem[];
type ComponentWatchOptions = Record<string, ComponentWatchOptionItem>;
type ComponentProvideOptions = ObjectProvideOptions | Function;
type ObjectProvideOptions = Record<string | symbol, unknown>;
type ComponentInjectOptions = string[] | ObjectInjectOptions;
type ObjectInjectOptions = Record<string | symbol, string | symbol | {
  type?: unknown;
  from?: string | symbol;
  default?: unknown;
}>;
type InjectToObject<T extends ComponentInjectOptions> = T extends string[] ? { [K in T[number]]?: any; } : T extends ObjectInjectOptions ? { [K in keyof T]?: any; } : never;
interface LegacyOptions<Props, D, C extends ComputedOptions, M extends MethodOptions, Mixin extends ComponentOptionsMixin, Extends extends ComponentOptionsMixin, I extends ComponentInjectOptions, II extends string, Provide extends ComponentProvideOptions = ComponentProvideOptions> {
  compatConfig?: CompatConfig;
  [key: string]: any;
  data?: (this: CreateComponentPublicInstanceWithMixins<Props, {}, {}, {}, MethodOptions, Mixin, Extends>, vm: CreateComponentPublicInstanceWithMixins<Props, {}, {}, {}, MethodOptions, Mixin, Extends>) => D;
  computed?: C;
  methods?: M;
  watch?: ComponentWatchOptions;
  provide?: Provide;
  inject?: I | II[];
  filters?: Record<string, Function>;
  mixins?: Mixin[];
  extends?: Extends;
  beforeCreate?(): any;
  created?(): any;
  beforeMount?(): any;
  mounted?(): any;
  beforeUpdate?(): any;
  updated?(): any;
  activated?(): any;
  deactivated?(): any;
  /** @deprecated use `beforeUnmount` instead */
  beforeDestroy?(): any;
  beforeUnmount?(): any;
  /** @deprecated use `unmounted` instead */
  destroyed?(): any;
  unmounted?(): any;
  renderTracked?: DebuggerHook;
  renderTriggered?: DebuggerHook;
  errorCaptured?: ErrorCapturedHook;
  /**
   * runtime compile only
   * @deprecated use `compilerOptions.delimiters` instead.
   */
  delimiters?: [string, string];
  /**
   * #3468
   *
   * type-only, used to assist Mixin's type inference,
   * TypeScript will try to simplify the inferred `Mixin` type,
   * with the `__differentiator`, TypeScript won't be able to combine different mixins,
   * because the `__differentiator` will be different
   */
  __differentiator?: keyof D | keyof C | keyof M;
}
type MergedHook<T = () => void> = T | T[];
type MergedComponentOptions = ComponentOptions & MergedComponentOptionsOverride;
type MergedComponentOptionsOverride = {
  beforeCreate?: MergedHook;
  created?: MergedHook;
  beforeMount?: MergedHook;
  mounted?: MergedHook;
  beforeUpdate?: MergedHook;
  updated?: MergedHook;
  activated?: MergedHook;
  deactivated?: MergedHook;
  /** @deprecated use `beforeUnmount` instead */
  beforeDestroy?: MergedHook;
  beforeUnmount?: MergedHook;
  /** @deprecated use `unmounted` instead */
  destroyed?: MergedHook;
  unmounted?: MergedHook;
  renderTracked?: MergedHook<DebuggerHook>;
  renderTriggered?: MergedHook<DebuggerHook>;
  errorCaptured?: MergedHook<ErrorCapturedHook>;
};
type OptionTypesKeys = "P" | "B" | "D" | "C" | "M" | "Defaults";
type OptionTypesType<P = {}, B = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Defaults = {}> = {
  P: P;
  B: B;
  D: D;
  C: C;
  M: M;
  Defaults: Defaults;
};
//#endregion
//#region packages/runtime-core/src/apiInject.d.ts
interface InjectionConstraint<T> {}
type InjectionKey<T> = symbol & InjectionConstraint<T>;
//#endregion
//#region packages/runtime-core/src/apiDefineComponent.d.ts
type PublicProps = VNodeProps & AllowedComponentProps & ComponentCustomProps;
type ResolveProps<PropsOrPropOptions, E extends EmitsOptions$1> = Readonly<PropsOrPropOptions extends ComponentPropsOptions$1 ? ExtractPropTypes<PropsOrPropOptions> : PropsOrPropOptions> & ({} extends E ? {} : EmitsToProps<E>);
type DefineComponent<PropsOrPropOptions = {}, RawBindings = {}, D = {}, C extends ComputedOptions = ComputedOptions, M extends MethodOptions = MethodOptions, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions$1 = {}, EE extends string = string, PP = PublicProps, Props = ResolveProps<PropsOrPropOptions, E>, Defaults = ExtractDefaultPropTypes<PropsOrPropOptions>, S extends SlotsType = {}, LC extends Record<string, Component> = {}, Directives extends Record<string, Directive> = {}, Exposed extends string = string, Provide extends ComponentProvideOptions = ComponentProvideOptions, MakeDefaultsOptional extends boolean = true, TypeRefs extends Record<string, unknown> = {}, TypeEl = any, ClassName extends string = string, InjectOptions extends ComponentInjectOptions = {}> = ComponentPublicInstanceConstructor<CreateComponentPublicInstanceWithMixins<Props, RawBindings, D, C, M, Mixin, Extends, E, PP, Defaults, MakeDefaultsOptional, InjectOptions, S, LC & GlobalComponents, Directives & GlobalDirectives, Exposed, TypeRefs, TypeEl>> & ComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, Defaults, {}, string, S, LC & GlobalComponents, Directives & GlobalDirectives, Exposed, Provide> & PP & {
  __className: ClassName;
};
//#endregion
//#region packages/runtime-core/src/components/Teleport.d.ts
type TeleportVNode = VNode<RendererNode, RendererElement, TeleportProps>;
interface TeleportProps {
  to: string | RendererElement | null | undefined;
  disabled?: boolean;
  defer?: boolean;
}
declare const TeleportImpl: {
  name: string;
  __isTeleport: boolean;
  process(n1: TeleportVNode | null, n2: TeleportVNode, container: RendererElement, anchor: RendererNode | null, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary$1 | null, namespace: ElementNamespace, slotScopeIds: string[] | null, optimized: boolean, internals: RendererInternals): void;
  remove(vnode: VNode, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary$1 | null, { um: unmount, o: { remove: hostRemove } }: RendererInternals, doRemove: boolean): void;
  move: typeof moveTeleport;
  hydrate: typeof hydrateTeleport;
};
declare enum TeleportMoveTypes {
  TARGET_CHANGE = 0,
  TOGGLE = 1,
  REORDER = 2
}
declare function moveTeleport(vnode: VNode, container: RendererElement, parentAnchor: RendererNode | null, { o: { insert }, m: move }: RendererInternals, parentComponent: ComponentInternalInstance | null, moveType?: TeleportMoveTypes): void;
declare function hydrateTeleport(node: Node, vnode: TeleportVNode, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary$1 | null, slotScopeIds: string[] | null, optimized: boolean, { o: { nextSibling, parentNode, querySelector, insert, createText } }: RendererInternals<Node, Element>, hydrateChildren: (node: Node | null, vnode: VNode, container: Element, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary$1 | null, slotScopeIds: string[] | null, optimized: boolean) => Node | null, container: RendererElement): Node | null;
declare const Teleport: {
  __isTeleport: true;
  new (): {
    $props: VNodeProps & TeleportProps;
    $slots: {
      default(): VNode[];
    };
  };
};
//#endregion
//#region packages/runtime-core/src/index.d.ts
declare module "@vue/reactivity" {
  interface RefUnwrapBailTypes {
    runtimeCoreBailTypes: VNode | {
      $: ComponentInternalInstance;
    };
  }
}
//#endregion
//#region packages/runtime-core/src/apiCreateApp.d.ts
interface App<HostElement = any> {
  vapor?: boolean;
  version: string;
  config: AppConfig;
  use<Options extends unknown[]>(plugin: Plugin<Options>, ...options: NoInfer<Options>): this;
  use<Options>(plugin: Plugin<Options>, options: NoInfer<Options>): this;
  mixin(mixin: ComponentOptions): this;
  component(name: string): Component | undefined;
  component<T extends Component | DefineComponent>(name: string, component: T): this;
  directive<HostElement = any, Value = any, Modifiers extends string = string, Arg = any>(name: string): Directive<HostElement, Value, Modifiers, Arg> | undefined;
  directive<HostElement = any, Value = any, Modifiers extends string = string, Arg = any>(name: string, directive: Directive<HostElement, Value, Modifiers, Arg>): this;
  mount(rootContainer: HostElement | string, isHydrate?: boolean, namespace?: boolean | ElementNamespace, vnode?: VNode): ComponentPublicInstance$1;
  unmount(): void;
  onUnmount(cb: () => void): void;
  provide<T, K = InjectionKey<T> | string | number>(key: K, value: K extends InjectionKey<infer V> ? V : T): this;
  /**
   * Runs a function with the app as active instance. This allows using of `inject()` within the function to get access
   * to variables provided via `app.provide()`.
   *
   * @param fn - function to run with the app as active instance
   */
  runWithContext<T>(fn: () => T): T;
  _uid: number;
  _component: GenericComponent;
  _props: Data | null;
  _container: HostElement | null;
  _context: AppContext$1;
  _instance: GenericComponentInstance$1 | null;
  /**
   * @internal custom element vnode
   */
  _ceVNode?: VNode;
  /**
   * @internal vapor custom element instance
   */
  _ceComponent?: GenericComponentInstance$1 | null;
  /**
   * v2 compat only
   */
  filter?(name: string): Function | undefined;
  filter?(name: string, filter: Function): this;
  /**
   * @internal v3 compat only
   */
  _createRoot?(options: ComponentOptions): ComponentPublicInstance$1;
}
type OptionMergeFunction = (to: unknown, from: unknown) => any;
/**
 * Shared app config between vdom and vapor
 */
interface GenericAppConfig {
  performance?: boolean;
  errorHandler?: (err: unknown, instance: ComponentPublicInstance$1 | null, info: string) => void;
  warnHandler?: (msg: string, instance: ComponentPublicInstance$1 | null, trace: string) => void;
  /**
   * Whether to throw unhandled errors in production.
   * Default is `false` to avoid crashing on any error (and only logs it)
   * But in some cases, e.g. SSR, throwing might be more desirable.
   */
  throwUnhandledErrorInProduction?: boolean;
  /**
   * Prefix for all useId() calls within this app
   */
  idPrefix?: string;
  uniX?: {
    beforeSetupPage: (props: any, instance: GenericComponentInstance$1) => void;
    initNativePage: (vm: ComponentPublicInstance$1) => void;
    initFontFace: (vm: ComponentPublicInstance$1) => void;
  };
}
interface AppConfig extends GenericAppConfig {
  readonly isNativeTag: (tag: string) => boolean;
  optionMergeStrategies: Record<string, OptionMergeFunction>;
  globalProperties: ComponentCustomProperties & Record<string, any>;
  /**
   * Options to pass to `@vue/compiler-dom`.
   * Only supported in runtime compiler build.
   */
  compilerOptions: RuntimeCompilerOptions;
  /**
   * @deprecated use config.compilerOptions.isCustomElement
   */
  isCustomElement?: (tag: string) => boolean;
}
/**
 * The vapor in vdom implementation is in runtime-vapor/src/vdomInterop.ts
 */
interface VaporInVdomInterface {
  mount(vnode: VNode, container: RendererElement, anchor: RendererNode | null, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary$1 | null): GenericComponentInstance$1;
  update(n1: VNode, n2: VNode, shouldUpdate: boolean): void;
  unmount(vnode: VNode, doRemove: boolean | undefined, parentSuspense: SuspenseBoundary$1 | null): void;
  move(vnode: VNode, container: RendererElement, anchor: RendererNode | null, moveType: MoveType, parentSuspense: SuspenseBoundary$1 | null): void;
  slot(n1: VNode | null, n2: VNode, container: RendererElement, anchor: RendererNode | null, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary$1 | null, slotScopeIds: string[] | null): void;
  hydrate(vnode: VNode, node: Node, container: RendererElement, anchor: RendererNode | null, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary$1 | null): Node | null;
  hydrateSlot(vnode: VNode, node: Node, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary$1 | null, slotScopeIds: string[] | null): Node | null;
  activate(vnode: VNode, container: RendererElement, anchor: RendererNode | null, parentComponent: ComponentInternalInstance, parentSuspense: SuspenseBoundary$1 | null): void;
  deactivate(vnode: VNode, container: RendererElement, parentSuspense: SuspenseBoundary$1 | null): void;
  setTransitionHooks(component: ComponentInternalInstance, transition: TransitionHooks): void;
  /**
   * Whether a mounted vapor component or slot vnode renders an element a
   * Transition can leave.
   */
  hasTransitionChild(vnode: VNode): boolean;
  getTransitionElement(vnode: VNode): RendererElement | undefined;
  /**
   * Enters what vapor mounted under `suspense` while it was pending, right
   * before the boundary reveals its branch: the boundary's own walk stops
   * at a vapor component.
   */
  enterDeferred(suspense: SuspenseBoundary$1, enters: Function[]): void;
  /**
   * Re-resolves the hooks of the rows a mounted vapor slot renders under a
   * TransitionGroup (`vnode.vs.group`) and hands over their elements.
   */
  forEachGroupChild(vnode: VNode, cb: (el: RendererElement) => void): void;
  applyCssVars(vnode: VNode, vars: Record<string, string>): void;
  /**
   * Hands the fallback of a vdom outlet over to the vapor slot its content
   * consists of, if it is that one slot.
   */
  attachSlotOutlet(content: VNodeArrayChildren, fallback: () => VNodeArrayChildren, owner: ComponentInternalInstance | null): boolean;
  /**
   * Hydrates an outlet marked `vo` whose fallback the server rendered in place
   * of the whole content (`<!--(-->`).
   */
  hydrateSlotOutlet(outlet: VNode, open: Comment, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary$1 | null, slotScopeIds: string[] | null): Node | null;
}
/**
 * Options for rendering a VDOM slot inside vapor. `flags` carries the
 * outlet's VaporSlotFlags describing its position in the fallback chain;
 * see renderVDOMSlot.
 */
interface VdomSlotOptions {
  fallback?: (...args: any[]) => any;
  flags?: number;
  adoptAnchor?: Node;
  insertionParent?: ParentNode;
}
/**
 * The vdom in vapor implementation is in runtime-vapor/src/vdomInterop.ts
 */
interface VdomInVaporInterface {
  mount: (component: ConcreteComponent, parentComponent: any, props?: any, slots?: any, once?: boolean, inputScope?: EffectScope$1) => any;
  slot: (slots: any, name: string | (() => string), props: Record<string, any>, parentComponent: any, options?: VdomSlotOptions) => any;
  mountVNode: (vnode: VNode, parentComponent: any, isSingleRoot?: boolean | VaporSingleRoot, rawProps?: any, once?: boolean) => any;
}
/**
 * Minimal app context shared between vdom and vapor
 */
interface GenericAppContext$1 {
  app: App;
  config: GenericAppConfig;
  provides: Record<string | symbol, any>;
  components?: Record<string, Component>;
  directives?: Record<string, Directive>;
  /**
   * HMR only
   * @internal
   */
  reload?: () => void;
  /**
   * @internal vapor interop only
   */
  vapor?: VaporInVdomInterface;
  /**
   * @internal vdom interop only
   */
  vdom?: VdomInVaporInterface;
}
interface AppContext$1 extends GenericAppContext$1 {
  config: AppConfig;
  components: Record<string, Component>;
  directives: Record<string, Directive>;
  mixins: ComponentOptions[];
  /**
   * Cache for merged/normalized component options
   * Each app instance has its own cache because app-level global mixins and
   * optionMergeStrategies can affect merge behavior.
   * @internal
   */
  optionsCache: WeakMap<ComponentOptions, MergedComponentOptions>;
  /**
   * Cache for normalized props options
   * @internal
   */
  propsCache: WeakMap<ConcreteComponent, NormalizedPropsOptions$1>;
  /**
   * Cache for normalized emits options
   * @internal
   */
  emitsCache: WeakMap<ConcreteComponent, ObjectEmitsOptions$1 | null>;
  /**
   * v2 compat only
   * @internal
   */
  filters?: Record<string, Function>;
}
type PluginInstallFunction<Options = any[]> = Options extends unknown[] ? (app: App, ...options: Options) => any : (app: App, options: Options) => any;
type ObjectPlugin<Options = any[]> = {
  install: PluginInstallFunction<Options>;
};
type FunctionPlugin<Options = any[]> = PluginInstallFunction<Options> & Partial<ObjectPlugin<Options>>;
type Plugin<Options = any[], P extends unknown[] = Options extends unknown[] ? Options : [Options]> = FunctionPlugin<P> | ObjectPlugin<P>;
//#endregion
//#region packages/runtime-core/src/vnode.d.ts
declare const Fragment: {
  __isFragment: true;
  new (): {
    $props: VNodeProps;
  };
};
declare const Text: unique symbol;
declare const Comment$1: unique symbol;
declare const Static: unique symbol;
declare const VaporSlot$2: unique symbol;
type VNodeTypes = string | VNode | Component | typeof Text | typeof Static | typeof Comment$1 | typeof Fragment | typeof Teleport | typeof TeleportImpl | typeof Suspense | typeof SuspenseImpl | typeof VaporSlot$2;
type VNodeRef = string | Ref | ((ref: Element | ComponentPublicInstance$1 | null, refs: Record<string, any>) => void);
type VNodeNormalizedRefAtom = {
  /**
   * component instance
   */
  i: ComponentInternalInstance;
  /**
   * Actual ref
   */
  r: VNodeRef;
  /**
   * setup ref key
   */
  k?: string;
  /**
   * refInFor marker
   */
  f?: boolean;
};
type VNodeNormalizedRef = VNodeNormalizedRefAtom | VNodeNormalizedRefAtom[];
type VNodeMountHook = (vnode: VNode) => void;
type VNodeUpdateHook = (vnode: VNode, oldVNode: VNode) => void;
type VNodeProps = {
  key?: PropertyKey;
  ref?: VNodeRef;
  ref_for?: boolean;
  ref_key?: string;
  onVnodeBeforeMount?: VNodeMountHook | VNodeMountHook[];
  onVnodeMounted?: VNodeMountHook | VNodeMountHook[];
  onVnodeBeforeUpdate?: VNodeUpdateHook | VNodeUpdateHook[];
  onVnodeUpdated?: VNodeUpdateHook | VNodeUpdateHook[];
  onVnodeBeforeUnmount?: VNodeMountHook | VNodeMountHook[];
  onVnodeUnmounted?: VNodeMountHook | VNodeMountHook[];
};
type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void;
type VNodeArrayChildren = Array<VNodeArrayChildren | VNodeChildAtom>;
type VNodeChild = VNodeChildAtom | VNodeArrayChildren;
type VNodeNormalizedChildren = string | VNodeArrayChildren | RawSlots$1 | null;
/**
 * A vdom outlet rendering a vapor slot, recorded on the slot's vnode: the
 * outlet that produced the vnode first, then every enclosing outlet whose
 * content is only that slot. Interop resolves their fallbacks in turn once
 * the slot renders empty. Internal to vapor interop.
 */
interface VdomSlotOutlet {
  fallback: () => VNodeArrayChildren;
  owner: ComponentInternalInstance | null;
  innerIds?: number;
}
interface VNode<HostNode = RendererNode, HostElement = RendererElement, ExtraProps = {
  [key: string]: any;
}> {
  /**
   * @internal
   */
  __v_isVNode: true;
  /**
   * @internal
   */
  [ReactiveFlags.SKIP]: true;
  type: VNodeTypes;
  props: (VNodeProps & ExtraProps) | null;
  key: PropertyKey | null;
  ref: VNodeNormalizedRef | null;
  /**
   * SFC only. This is assigned on vnode creation using currentScopeId
   * which is set alongside currentRenderingInstance.
   */
  scopeId: string | null;
  /**
   * SFC only. This is assigned to:
   * - Slot fragment vnodes with :slotted SFC styles.
   * - Component vnodes (during patch/hydration) so that its root node can
   *   inherit the component's slotScopeIds
   * @internal
   */
  slotScopeIds: string[] | null;
  /**
   * Root-only scope ids published by the vapor interop onto vnodes serving
   * as a vapor component's effective root; consumed by getInheritedScopeIds
   * where the effective-root chain tops out (before insertion).
   * @internal
   */
  vaporScopeIds?: string[];
  children: VNodeNormalizedChildren;
  component: ComponentInternalInstance | null;
  dirs: DirectiveBinding[] | null;
  transition: TransitionHooks<HostElement> | null;
  el: HostNode | null;
  placeholder: HostNode | null;
  anchor: HostNode | null;
  target: HostElement | null;
  targetStart: HostNode | null;
  targetAnchor: HostNode | null;
  /**
   * number of elements contained in a static vnode
   * @internal
   */
  staticCount: number;
  suspense: SuspenseBoundary$1 | null;
  /**
   * @internal
   */
  ssContent: VNode | null;
  /**
   * @internal
   */
  ssFallback: VNode | null;
  shapeFlag: number;
  patchFlag: number;
  /**
   * @internal
   */
  dynamicProps: string[] | null;
  /**
   * @internal
   */
  dynamicChildren: (VNode[] & {
    hasOnce?: boolean;
  }) | null;
  appContext: AppContext$1 | null;
  hostInstance: ComponentInternalInstance | null;
  /**
   * @internal lexical scope owner instance
   */
  ctx: ComponentInternalInstance | null;
  /**
   * @internal attached by v-memo
   */
  memo?: any[];
  /**
   * @internal index for cleaning v-memo cache
   */
  cacheIndex?: number;
  /**
   * @internal __COMPAT__ only
   */
  isCompatRoot?: true;
  /**
   * @internal custom element interception hook
   */
  ce?: (instance: ComponentInternalInstance) => void;
  /**
   * @internal VDOM in Vapor interop hook
   */
  vi?: (instance: ComponentInternalInstance) => void;
  /**
   * @internal Vapor slot in VDOM metadata
   */
  vs?: {
    slot: (props: any) => any;
    name: string;
    outlets?: readonly VdomSlotOutlet[];
    props?: Data;
    attrs?: Data;
    group?: {
      props: BaseTransitionProps<any>;
      state: TransitionState;
      instance: GenericComponentInstance$1;
    };
    state?: unknown;
    ref?: ShallowRef<any>;
    scope?: EffectScope$1;
  };
  /**
   * @internal Vapor slot Block
   */
  vb?: any;
  /**
   * @internal vapor interop only — the fragment of a vdom slot outlet whose
   * fallback a forwarded vapor slot resolves
   */
  vo?: boolean;
  /**
   * @internal vapor interop only — internal before-update notification, fired
   * before this vnode is patched (alongside onVnodeBeforeUpdate). Single-owner:
   * the interop layer assigns (never appends) so re-tracking replaces the
   * previous callback.
   */
  ibu?: () => void;
  /**
   * @internal vapor interop only — internal updated notification, fired after
   * this vnode is patched (alongside onVnodeUpdated) so the interop layer can
   * refresh its snapshot of the DOM range. Single-owner; see `ibu`.
   */
  iu?: () => void;
}
//#endregion
//#region packages/runtime-core/src/component.d.ts
type Data = Record<string, unknown>;
/**
 * For extending allowed non-declared attrs on components in TSX
 */
interface AllowedAttrs {}
type Attrs = Data & AllowedAttrs;
/**
 * For extending allowed non-declared props on components in TSX
 */
interface ComponentCustomProps {}
/**
 * For globally defined Directives
 * Here is an example of adding a directive `VTooltip` as global directive:
 *
 * @example
 * ```ts
 * import VTooltip from 'v-tooltip'
 *
 * declare module '@vue/runtime-core' {
 *   interface GlobalDirectives {
 *     VTooltip
 *   }
 * }
 * ```
 */
interface GlobalDirectives {}
/**
 * For globally defined Components
 * Here is an example of adding a component `RouterView` as global component:
 *
 * @example
 * ```ts
 * import { RouterView } from 'vue-router'
 *
 * declare module '@vue/runtime-core' {
 *   interface GlobalComponents {
 *     RouterView
 *   }
 * }
 * ```
 */
interface GlobalComponents {
  Teleport: DefineComponent<TeleportProps>;
  Suspense: DefineComponent<SuspenseProps>;
  KeepAlive: DefineComponent<KeepAliveProps>;
  BaseTransition: DefineComponent<BaseTransitionProps>;
}
/**
 * Default allowed non-declared props on component in TSX
 */
interface AllowedComponentProps {
  class?: unknown;
  style?: unknown;
}
interface ComponentInternalOptions$1 {
  /**
   * indicates vapor component
   */
  __vapor?: boolean;
  /**
   * indicates keep-alive component
   */
  __isKeepAlive?: boolean;
  /**
   * @internal
   */
  __scopeId?: string;
  /**
   * @internal
   */
  __cssModules?: Data;
  /**
   * @internal
   */
  __hmrId?: string;
  /**
   * Compat build only, for bailing out of certain compatibility behavior
   */
  __isBuiltIn?: boolean;
  /**
   * This one should be exposed so that devtools can make use of it
   */
  __file?: string;
  /**
   * name inferred from filename
   */
  __name?: string;
  /**
   * fixed by uts
   * @internal
   */
  __filename?: string | null;
}
interface AsyncComponentInternalOptions<R = ConcreteComponent, I = ComponentInternalInstance> {
  /**
   * marker for AsyncComponentWrapper
   * @internal
   */
  __asyncLoader?: () => Promise<R>;
  /**
   * the inner component resolved by the AsyncComponentWrapper
   * @internal
   */
  __asyncResolved?: R;
  /**
   * Exposed for lazy hydration
   * @internal
   */
  __asyncHydrate?: (el: Element, instance: I, hydrate: () => void) => void;
}
interface FunctionalComponent<P = {}, E extends EmitsOptions$1 | Record<string, any[]> = {}, S extends Record<string, any> = any, EE extends EmitsOptions$1 = ShortEmitsToObject<E>> extends ComponentInternalOptions$1 {
  (props: P & EmitsToProps<EE>, ctx: Omit<SetupContext<EE, IfAny<S, {}, SlotsType<S>>>, "expose">): any;
  props?: ComponentPropsOptions$1<P>;
  emits?: EE | (keyof EE)[];
  slots?: IfAny<S, Slots, SlotsType<S>>;
  inheritAttrs?: boolean;
  displayName?: string;
  compatConfig?: CompatConfig;
}
/**
 * Type used where a function accepts both vdom and vapor components.
 */
type GenericComponent = ({
  name?: string;
} | ((() => any) & {
  displayName?: string;
})) & ComponentInternalOptions$1;
/**
 * Concrete component type matches its actual value: it's either an options
 * object, or a function. Use this where the code expects to work with actual
 * values, e.g. checking if its a function or not. This is mostly for internal
 * implementation code.
 */
type ConcreteComponent<Props = {}, RawBindings = any, D = any, C extends ComputedOptions = ComputedOptions, M extends MethodOptions = MethodOptions, E extends EmitsOptions$1 | Record<string, any[]> = {}, S extends Record<string, any> = any> = ComponentOptions<Props, RawBindings, D, C, M> | FunctionalComponent<Props, E, S>;
/**
 * A type used in public APIs where a component type is expected.
 * The constructor type is an artificial type returned by defineComponent().
 */
type Component<PropsOrInstance = any, RawBindings = any, D = any, C extends ComputedOptions = ComputedOptions, M extends MethodOptions = MethodOptions, E extends EmitsOptions$1 | Record<string, any[]> = {}, S extends Record<string, any> = any> = ConcreteComponent<PropsOrInstance, RawBindings, D, C, M, E, S> | ComponentPublicInstanceConstructor<PropsOrInstance>;
type LifecycleHook$1<TFn = Function> = (TFn & SchedulerJob)[] | null;
type SetupContext<E = EmitsOptions$1, S extends SlotsType = {}> = E extends any ? {
  attrs: Attrs;
  slots: UnwrapSlotsType<S>;
  emit: EmitFn$1<E>;
  expose: <Exposed extends Record<string, any> = Record<string, any>>(exposed?: Exposed) => void;
} : never;
/**
 * @internal
 */
type InternalRenderFunction = {
  (ctx: ComponentPublicInstance$1, cache: ComponentInternalInstance["renderCache"], $props: ComponentInternalInstance["props"], $setup: ComponentInternalInstance["setupState"], $data: ComponentInternalInstance["data"], $options: ComponentInternalInstance["ctx"]): VNodeChild;
  _rc?: boolean;
  _compatChecked?: boolean;
  _compatWrapped?: boolean;
};
/**
 * Base component instance interface that is shared between vdom mode and vapor
 * mode, so that we can have a mixed instance tree and reuse core logic that
 * operate on both.
 */
interface GenericComponentInstance$1 {
  vapor?: boolean;
  uid: number;
  type: GenericComponent;
  root: GenericComponentInstance$1 | null;
  parent: GenericComponentInstance$1 | null;
  appContext: GenericAppContext$1;
  /**
   * Object containing values this component provides for its descendants
   * @internal
   */
  provides: Data;
  /**
   * Tracking reactive effects (e.g. watchers) associated with this component
   * so that they can be automatically stopped on component unmount
   * @internal
   */
  scope: EffectScope$1;
  /**
   * render function will have different types between vdom and vapor
   */
  render?: Function | null;
  /**
   * SSR render function
   * (they are the same between vdom and vapor components.)
   * @internal
   */
  ssrRender?: Function | null;
  props: Data;
  attrs: Data;
  refs: Data;
  emit: EmitFn$1;
  /**
   * used for keeping track of .once event handlers on components
   * @internal
   */
  emitted: Record<string, boolean> | null;
  /**
   * used for caching the value returned from props default factory functions to
   * avoid unnecessary watcher trigger
   * @internal
   */
  propsDefaults: Data | null;
  /**
   * used for getting the keys of a component's raw props, vapor only
   * @internal
   */
  rawKeys?: () => string[];
  exposed: Record<string, any> | null;
  exposeProxy: Record<string, any> | null;
  /**
   * setup related
   * @internal
   */
  setupState?: Data;
  /**
   * devtools access to additional info
   * @internal
   */
  devtoolsRawSetupState?: any;
  isMounted: boolean;
  isUnmounted: boolean;
  isDeactivated: boolean;
  /**
   * for tracking useId()
   * first element is the current boundary prefix
   * second number is the index of the useId call within that boundary
   * @internal
   */
  ids: [string, number, number];
  /**
   * resolved props options
   * @internal
   */
  propsOptions?: NormalizedPropsOptions$1;
  /**
   * resolved emits options
   * @internal
   */
  emitsOptions?: ObjectEmitsOptions$1 | null;
  /**
   * Public instance proxy, vdom only
   */
  proxy?: any;
  /**
   * suspense related
   * @internal
   */
  suspense: SuspenseBoundary$1 | null;
  /**
   * suspense pending batch id
   * @internal
   */
  suspenseId: number;
  /**
   * @internal
   */
  asyncDep: Promise<any> | null;
  /**
   * @internal
   */
  asyncResolved: boolean;
  /**
   * `updateTeleportCssVars`
   * For updating css vars on contained teleports
   * @internal
   */
  ut?: (vars?: Record<string, string>) => void;
  /**
   * dev only. For style v-bind hydration mismatch checks
   * @internal
   */
  getCssVars?: () => Record<string, string>;
  /**
   * @internal
   */
  [LifecycleHooks.BEFORE_CREATE]?: LifecycleHook$1;
  /**
   * @internal
   */
  [LifecycleHooks.CREATED]?: LifecycleHook$1;
  /**
   * @internal
   */
  [LifecycleHooks.BEFORE_MOUNT]?: LifecycleHook$1;
  /**
   * @internal
   */
  [LifecycleHooks.MOUNTED]?: LifecycleHook$1;
  /**
   * @internal
   */
  [LifecycleHooks.BEFORE_UPDATE]?: LifecycleHook$1;
  /**
   * @internal
   */
  [LifecycleHooks.UPDATED]?: LifecycleHook$1;
  /**
   * @internal
   */
  [LifecycleHooks.BEFORE_UNMOUNT]?: LifecycleHook$1;
  /**
   * @internal
   */
  [LifecycleHooks.UNMOUNTED]?: LifecycleHook$1;
  /**
   * @internal
   */
  [LifecycleHooks.RENDER_TRACKED]?: LifecycleHook$1;
  /**
   * @internal
   */
  [LifecycleHooks.RENDER_TRIGGERED]?: LifecycleHook$1;
  /**
   * @internal
   */
  [LifecycleHooks.ACTIVATED]?: LifecycleHook$1;
  /**
   * @internal
   */
  [LifecycleHooks.DEACTIVATED]?: LifecycleHook$1;
  /**
   * @internal
   */
  [LifecycleHooks.ERROR_CAPTURED]?: LifecycleHook$1;
  /**
   * @internal
   */
  [LifecycleHooks.SERVER_PREFETCH]?: LifecycleHook$1<() => Promise<unknown>>;
  /**
   * @internal vapor only
   */
  hmrRerender?: () => void;
  /**
   * @internal vapor only
   */
  hmrReload?: (newComp: any) => void;
  vnode?: VNode;
  subTree?: VNode;
  /**
   * Custom Element instance (if component is created by defineCustomElement)
   * @internal
   */
  ce?: ComponentCustomElementInterface;
  /**
   * is custom element? (kept only for compatibility)
   * @internal
   */
  isCE?: boolean;
  /**
   * custom element specific HMR method
   * @internal
   */
  ceReload?: (newStyles?: string[]) => void;
  /**
   * fixed by uts
   * @internal
   */
  $waitNativeRender: (fn: () => void) => void;
}
/**
 * We expose a subset of properties on the internal instance as they are
 * useful for advanced external libraries and tools.
 */
interface ComponentInternalInstance extends GenericComponentInstance$1 {
  vapor?: never;
  uid: number;
  type: ConcreteComponent;
  parent: GenericComponentInstance$1 | null;
  root: GenericComponentInstance$1;
  appContext: AppContext$1;
  /**
   * Vnode representing this component in its parent's vdom tree
   */
  vnode: VNode;
  /**
   * The pending new vnode from parent updates
   * @internal
   */
  next: VNode | null;
  /**
   * Root vnode of this component's own vdom tree
   */
  subTree: VNode;
  /**
   * Render effect instance
   */
  effect: ReactiveEffect;
  /**
   * Force update render effect
   */
  update: () => void;
  /**
   * Render effect job to be passed to scheduler (checks if dirty)
   */
  job: SchedulerJob;
  /**
   * The render function that returns vdom tree.
   * @internal
   */
  render: InternalRenderFunction | null;
  /**
   * cache for proxy access type to avoid hasOwnProperty calls
   * @internal
   */
  accessCache: Data | null;
  /**
   * cache for render function values that rely on _ctx but won't need updates
   * after initialized (e.g. inline handlers)
   * @internal
   */
  renderCache: (Function | VNode | undefined)[];
  /**
   * Resolved component registry, only for components with mixins or extends
   * @internal
   */
  components: Record<string, ConcreteComponent> | null;
  /**
   * Resolved directive registry, only for components with mixins or extends
   * @internal
   */
  directives: Record<string, Directive> | null;
  /**
   * Resolved filters registry, v2 compat only
   * @internal
   */
  filters?: Record<string, Function>;
  /**
   * resolved props options
   * @internal
   */
  propsOptions: NormalizedPropsOptions$1;
  /**
   * resolved emits options
   * @internal
   */
  emitsOptions: ObjectEmitsOptions$1 | null;
  /**
   * resolved inheritAttrs options
   * @internal
   */
  inheritAttrs?: boolean;
  /**
   * setup related
   * @internal
   */
  setupState: Data;
  /**
   * @internal
   */
  setupContext?: SetupContext | null;
  proxy: ComponentPublicInstance$1 | null;
  data: Data;
  emit: EmitFn$1;
  slots: InternalSlots;
  exposeProxy: Record<string, any> | null;
  /**
   * alternative proxy used only for runtime-compiled render functions using
   * `with` block
   * @internal
   */
  withProxy: ComponentPublicInstance$1 | null;
  /**
   * This is the target for the public instance proxy. It also holds properties
   * injected by user options (computed, methods etc.) and user-attached
   * custom properties (via `this.x = ...`)
   * @internal
   */
  ctx: Data;
  /**
   * suspense pending batch id
   * @internal
   */
  suspenseId: number;
  /**
   * @internal
   */
  asyncDep: Promise<any> | null;
  /**
   * @internal
   */
  asyncResolved: boolean;
  /**
   * For caching bound $forceUpdate on public proxy access
   * @internal
   */
  f?: () => void;
  /**
   * For caching bound $nextTick on public proxy access
   * @internal
   */
  n?: () => Promise<void>;
  /**
   * v2 compat only, for caching mutated $options
   * @internal
   */
  resolvedOptions?: MergedComponentOptions;
}
interface ComponentCustomElementInterface {
  /**
   * @internal
   */
  _isVueCE: boolean;
  /**
   * @internal
   */
  _injectChildStyle(type: ConcreteComponent, parent?: ConcreteComponent): void;
  /**
   * @internal
   */
  _removeChildStyle(type: ConcreteComponent): void;
  /**
   * @internal
   */
  _setProp(key: string, val: any, shouldReflect?: boolean, shouldUpdate?: boolean): void;
  /**
   * @internal
   */
  _beginPatch(): void;
  /**
   * @internal
   */
  _endPatch(): void;
  /**
   * @internal attached by the nested Teleport when shadowRoot is false.
   */
  _teleportTargets?: Set<RendererElement>;
  /**
   * @internal check if shadow root is enabled
   */
  _hasShadowRoot(): boolean;
}
declare namespace runtime_with_vapor_d_exports {
  export { VaporSlot$1 as VaporSlot, defineVaporAsyncComponent };
}
import * as import__vue_runtime_vapor_dom2 from "@vue/runtime-vapor-dom2";
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/componentSlots.d.ts
type RawSlots = Record<string, VaporSlot> & {
  $?: DynamicSlotSource[];
};
type StaticSlots = Record<string, VaporSlot>;
type VaporSlot<T extends UniSharedData = any> = BlockFn & {
  sharedDataVFor?: UniSharedDataVFor<T>;
  _?: VaporSlotStability.NON_STABLE;
};
type VaporScopedSlot<T extends UniSharedData = any> = ((slotProps: any, sharedData: T) => void) & {
  sharedDataVFor?: UniSharedDataVFor<T>;
  _?: VaporSlotStability.NON_STABLE;
};
type DynamicSlot = {
  name: string;
  fn: VaporSlot;
  key?: unknown;
};
type DynamicSlotFn = () => DynamicSlot | DynamicSlot[];
export type DynamicSlotSource = StaticSlots | DynamicSlotFn;
export declare function withSharedDataVaporCtx(fn: (...args: any[]) => any, type?: 'string'): BlockFn;
export declare function mergeSharedDataSlotProps(...sources: (Record<string, any> | null | undefined)[]): Record<string, any>;
export declare function guardSharedDataSlotProps(props: Record<string, any> | null | undefined): (Data & runtime_with_vapor_d_exports.VNodeProps) | {
  [x: string]: any;
} | null;
export declare function normalizeSharedDataSlotProps(result: Record<string, any> | null): Record<string, any> | null;
export declare function createSharedDataSlot(name?: string | (() => string), rawProps?: LooseRawProps | null, setSharedDataSlotProps?: ((data: UniSharedData) => void) | null, fallback?: VaporSlot | null, flags?: number): void;
export declare function createSharedDataScopedSlot<S extends UniSharedData>(sharedDataVFor: UniSharedDataVFor<S>, fn: VaporScopedSlot<S>): VaporScopedSlot<S>;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/component.d.ts
export type VaporSharedDataComponent = ObjectVaporSharedDataComponent & {
  __className?: string;
  /** 编译器生成的页面或组件最终生效的 script lang。 */
  __scriptLang?: "js" | "ts" | "uts";
  /** 编译器仅在开发模式下为未显式配置 script lang 的组件生成。 */
  __uniDefaultScriptLang?: string;
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
type LooseRawProps = Record<string, unknown> & {
  $?: DynamicPropsSource[];
};
type LooseRawSlots = Record<string, VaporSlot | DynamicSlotSource[]> & {
  $?: DynamicSlotSource[];
};
export declare function createSharedDataComponent<C = any, SharedData extends string = C extends {
  __className: infer K extends string;
} ? `${K}SharedData` : string>(definedComponent: C, rawCid?: string, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, flags?: number, appContext?: GenericAppContext): VaporSharedDataComponentInstance<SharedData>;
declare class VaporSharedDataComponentInstance<SharedData extends string = string> implements GenericComponentInstance {
  pageId?: number;
  sharedData?: InferSharedData<SharedData, UniSharedDataComponent> | InferSharedData<SharedData, UniSharedDataPage>;
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
  pendingMountNativeRender: (() => void) | null;
  hasFallthrough: boolean;
  shapeFlag?: number;
  oncePropsCache?: Record<string | symbol, any>;
  isOnce: boolean;
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
  effectCount: number;
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
  componentFlags: number;
  private rawCid;
  private cachedCid;
  constructor(comp: VaporSharedDataComponent, rawProps?: RawProps | null, rawSlots?: RawSlots | null, rawCid?: string, flags?: number, appContext?: GenericAppContext, once?: boolean);
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
export declare function createSharedDataComponentWithFallback(comp: VaporSharedDataComponent | string | any, rawCid?: string, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, flags?: number, appContext?: GenericAppContext): VaporSharedDataComponentInstance | null;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/apiCreateApp.d.ts
export declare const createVaporApp: CreateAppFunction<ParentNode, VaporSharedDataComponent>;
export declare const createVaporSSRApp: CreateAppFunction<ParentNode, VaporSharedDataComponent>;
export declare const createApp: CreateAppFunction<ParentNode, VaporSharedDataComponent>;
//#endregion
//#region temp/packages/compiler-vapor-dom2/src/utils/options.d.ts
declare enum DOM2_APP_TARGET {
  C = "c",
  DOM_C = "dom-c",
  DOM_KT = "dom-kt",
  NV_KT = "nv-kt",
  TXT_KT = "txt-kt",
  DOM_OC = "dom-oc",
  NV_C = "nv-c",
  TXT_C = "txt-c",
  DOM_TS = "dom-ts"
}
//#endregion
//#region temp/packages/compiler-vapor-dom2/src/style/processors/color.d.ts
export declare function toUniNativeColor(target: DOM2_APP_TARGET, value: string | number, defaultValue?: number): number | undefined;
//#endregion
//#region temp/packages/compiler-vapor-dom2/src/style/processors/runtime/index.d.ts
export declare function toSharedDataStyle(target: DOM2_APP_TARGET, style: Map<string, unknown>, result?: Record<number, unknown>, options?: {
  filename?: string | null;
}): Record<number, unknown>;
export declare function getComputedStyle(element: {
  readonly style: {
    getPropertyValue(property: string): string;
  };
}): Record<string, string>;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/apiMountPage.d.ts
export declare function createMountPage(appContext: AppContext): (pageComponent: ReturnType<typeof defineComponent> | VaporSharedDataComponent, pageProps: Record<string, any>, pageContainer?: Element$1) => ComponentPublicInstance;
export declare function unmountPage(pageInstance: ComponentPublicInstance): void;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/apiCreateIf.d.ts
export declare function createSharedDataIf(condition: () => any, b1: () => void, b2?: (() => void) | null, flags?: number): void;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/apiCreateIfChain.d.ts
export declare function createSharedDataIfChain(select: () => number, blocks: BlockFn[], branchFlags: number[] | null, flags: number): void;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/apiCreateFor.d.ts
type ItemOf<S> = S extends readonly (infer T)[] ? T : S extends Reactive<readonly (infer T)[]> ? T : S extends Set<infer T> ? T : S extends Map<infer K, infer V> ? [K, V] : S extends string ? string : S extends number ? number : S extends Record<any, infer V> ? V : S extends Iterable<infer T> ? T : any;
type KeyOf<S> = S extends readonly unknown[] | Iterable<unknown> ? number : S extends Record<any, any> ? string : number;
type IndexOfKey<K> = K extends string ? number : undefined;
interface SharedDataForHandle {
  resetListeners?: (() => void)[];
  onReset(fn: () => void): void;
}
export declare const createSharedDataFor: <S extends UniSharedData, Source>(sharedDataVFor: UniSharedDataVFor<S>, src: () => Source, renderItem: (shareDataVForItem: S, item: ShallowRef<ItemOf<Source>>, key: ShallowRef<KeyOf<Source>>, index: ShallowRef<number | undefined>) => VaporSharedDataComponentInstance | null, getKey?: (shareDataVForItem: S, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any, flags?: number) => SharedDataForHandle;
interface SharedDataSelector {
  (key: any, oper: () => void): void;
  reset(): void;
}
export declare function createSharedDataSelector(source: () => any): SharedDataSelector;
export declare function createSharedDataForSlots<S extends UniSharedData, Source>(sharedDataVFor: UniSharedDataVFor<S>, rawSource: () => Source, renderSlot: (sharedData: S, item: ShallowRef<ItemOf<Source>>, key?: ShallowRef<KeyOf<Source>>, index?: ShallowRef<IndexOfKey<KeyOf<Source>> | undefined>) => VaporSlot, getName: (item: ItemOf<Source>, key: KeyOf<Source>, index?: IndexOfKey<KeyOf<Source>>) => unknown, setName: (sharedData: S, item: ItemOf<Source>, key: KeyOf<Source>, index?: IndexOfKey<KeyOf<Source>>) => unknown, getKey?: (item: ItemOf<Source>, key: KeyOf<Source>, index?: IndexOfKey<KeyOf<Source>>) => unknown): () => DynamicSlot[];
export declare function getSharedDataRestElement(val: any, keys: string[]): any;
export declare function getSharedDataDefaultValue(val: any, defaultVal: any): any;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/apiCreateRecycleFor.d.ts
export declare const preCreateSharedDataRecycleFor: <Source>(src: () => Source, getKey?: (item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any, getId?: (item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any) => (() => Source);
declare class RecycleContext {}
export declare function createRecycleContext(): RecycleContext;
export declare const createSharedDataRecycleFor: <S extends UniSharedData, Source>(recycleContext: RecycleContext, sharedDataVFor: UniSharedDataVFor<S>, src: () => Source, renderItem: (shareDataVForItem: S, item: ShallowRef<ItemOf<Source>>, key: ShallowRef<KeyOf<Source>>, index: ShallowRef<number | undefined>) => VaporSharedDataComponentInstance | null, getKey?: (shareDataVForItem: S, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any, getType?: (shareDataVForItem: S, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any, flags?: number) => void;
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
//#region temp/packages/runtime-vapor-dom2/src/apiResolveBuiltInComponent.d.ts
export declare function resolveBuiltInComponent(name: string): VaporSharedDataComponent;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/apiCreateDynamicComponent.d.ts
export declare function createSharedDataDynamicComponent(getter: () => any, setter: (ins: VaporSharedDataComponentInstance | null) => any, rawCid?: string, rawProps?: RawProps | null, rawSlots?: RawSlots | null, flags?: number): VaporSharedDataComponentInstance | null;
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
export declare function createSharedDataKeyedFragment(key: () => any, render: BlockFn): Block;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/apiCreateTeleport.d.ts
export type SharedDataTeleportPropSetters = {
  to?: () => void;
  disabled?: () => void;
  defer?: () => void;
};
export type SharedDataTeleportSlots = {
  default?: BlockFn | null;
};
export declare function createSharedDataTeleport(propSetters?: SharedDataTeleportPropSetters | null, slots?: SharedDataTeleportSlots | null): void;
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
  /** 查询根节点对应的伪元素样式；须在 setup 顶层直接调用，同名仅一次，名称须为字面量。 */
  pseudoElement?: "::selection";
};
export declare function useComputedStyle(options: UseComputedStyleOptions): Map<string, any | null>;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/helpers/useCssVars.d.ts
export declare function useSharedDataCssVars(getter: (ctx: any) => Record<string, unknown>): void;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/renderEffect.d.ts
export declare function renderSharedDataEffect(fn: () => unknown, noLifecycle?: boolean): void;
export declare function nextSharedDataTick(fn: () => void): Promise<void>;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/sharedData/index.d.ts
type SharedDataRootDatasetSource = "own" | "fallthrough";
export declare function setSharedData<S extends UniSharedData, V>(sharedData: S, key: string, value: V, useCache?: boolean): V;
/**
 * 仅用于当前 scope 持有生命周期的 UniSharedDataVFor（createSharedDataVSlot 也是 VFor 别名）。
 * scope dispose 时只释放 _cacheProps 引用和 scoped value，不清空 sharedData[key]，也不通知宿主侧。
 * 后续验证稳定后，可考虑将 value 类型扩展到其他 UniSharedData，统一管理 sharedData dispose。
 */
export declare function setSharedDataScoped<S extends UniSharedData, V extends UniSharedDataVFor<any> | null | undefined>(sharedData: S, key: string, value: V): V;
export declare function normalizeExternalClasses(classes: unknown): string;
export declare function setSharedDataDynamicProps<S extends UniSharedData>(sharedData: S, key: string, value: any[], root?: boolean): UniSharedDataJSONObject;
export declare function setSharedDataDynamicEvents<S extends UniSharedData>(sharedData: S, key: string, events: Record<string, (...args: any[]) => any>): UniSharedDataJSONObject;
export declare function setSharedDataClass<S extends UniSharedData, V>(sharedData: S, key: string, value: V): string[];
export declare function setSharedDataStyle<S extends UniSharedData, V>(sharedData: S, key: string, value: V): UniElementStyles;
export declare function setSharedDataAttr<S extends UniSharedData, V>(sharedData: S, key: string, value: V): V;
export declare function setSharedDataColorOrNull<S extends UniSharedData>(sharedData: S, key: string, value: any | null): number | null;
export declare function setSharedDataEvent<S extends UniSharedData>(sharedData: S, key: string, value: UniSharedDataFunctionEventListener): UniSharedDataFunctionEventListener;
/**
 * @deprecated 当前编译流程不再生成该调用，仅保留以兼容历史生成代码。
 */
export declare function setSharedDataModel<S extends UniSharedData, V>(sharedData: S, key: string, get: () => V, set: (v: V) => void, modifiers?: {
  [key: string]: true;
}): UniSharedDataFunctionEventListener;
export declare function setSharedDataDataset(dataset: Record<string, unknown>): UniSharedDataFunctionSetTemplateRef;
export declare function setSharedDataRootDataset(dataset: Record<string, unknown>, source: SharedDataRootDatasetSource): UniSharedDataFunctionSetTemplateRef;
export declare function setSharedDataElementCallback<S extends UniSharedData>(sharedData: S, key: string, value: UniSharedDataFunctionSetTemplateRef): UniSharedDataFunctionSetTemplateRef;
export declare function setSharedDataTemplateRef<S extends UniSharedData>(sharedData: S, key: string, value: UniSharedDataFunctionSetTemplateRef): UniSharedDataFunctionSetTemplateRef;
export declare function toSharedDataBoolean(value: any | null): boolean;
export declare function toSharedDataAttrBoolean(value: any | null, defaultValue?: boolean): boolean;
export declare function toSharedDataNumber(value: any | null): number;
export declare function toSharedDataString(value: any | null): string;
export declare function toSharedDataTeleportTarget(value: any | null): string | null;
export declare function toSharedDataColor(value: any | null): number;
export declare function toSharedDataColorOrNull(value: any | null): number | null | undefined;
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
interface UniDynamicSharedDataComponentOptions extends UniSharedDataComponentOptions, UniDynamicSharedDataInitOptions {}
/**
 * 动态 sharedData 的初始化参数。
 *
 * 这是 renderSharedData 直接使用的构造参数。
 */
interface UniDynamicSharedDataInitOptions {
  /**
   * 当前动态 bundle 的稳定标识。
   */
  readonly bundleKey: string;
  /**
   * 当前实例对应的 sharedData class 编号。
   *
   * 约束：
   * - root page：0
   * - root component：0
   * - scoped sharedData：编译器分配的实际 classId
   */
  readonly sharedDataClassId: number;
}
export declare function useSharedDataPageOptions(options?: UniDynamicSharedDataInitOptions): UniSharedDataComponentOptions | UniDynamicSharedDataComponentOptions;
export declare function useSharedDataComponentOptions(options?: UniDynamicSharedDataInitOptions): UniSharedDataComponentOptions | UniDynamicSharedDataComponentOptions;
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
export declare const toSharedDataGlassEffectViewSlot: (value: string) => UniSlotType;
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
//#region temp/packages/runtime-vapor-dom2/src/sharedData/enum/glass-effect-view.d.ts
/**
 * 将字符串值转换为 UniGlassEffectViewStyle 枚举类型
 * @param value - 字符串值
 * @returns UniGlassEffectViewStyle 枚举值
 */
export declare function toSharedDataGlassEffectViewGlassStyle(value: string): UniGlassEffectViewStyle;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/types/common.d.ts
export declare function toVueForItemKey(key: any): string | number;
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
export declare function createElementTeleport(page: UniPage, props: VueElementCreateTeleportProps, children?: BlockFn | null): VaporFragment;
export declare function withElementVaporCtx<T>(fn: () => T): () => T;
export declare function withElementVaporCtx<T>(fn: (slotProps: UniSharedData | null) => T): (slotProps: UniSharedData | null) => T;
export declare function createElementSlot(page: UniPage, name: string | (() => string), getSlotProps?: (() => UniSharedData | null) | null, fallback?: VaporSlot): Block;
export declare function createElementFor<Source extends UniSharedData>(page: UniPage, src: () => UniSharedDataVFor<Source> | string | number, renderItem: (shareDataVForItem: Source, item: ItemOf<Source>, key: KeyOf<Source>, index: number | undefined) => void, getKey?: ((shareDataVForItem: Source, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any) | null, flags?: number, setup?: (_: {
  createSelector: (source: () => any) => (cb: () => void) => void;
}) => void): VaporFragment;
export declare function createElementStaticFor(source: number, renderItem: (item: number, key: number, index: number | undefined) => UniElementBlock): UniElementBlock;
export declare function createElementRecycleFor<Source extends UniSharedData>(page: UniPage, recycleContext: ElementRecycleContext, src: () => UniSharedDataVFor<Source>, renderItem: (shareDataVForItem: Source, item: ShallowRef<ItemOf<Source>>, key: ShallowRef<KeyOf<Source>>, index: ShallowRef<number | undefined>) => void, getKey?: ((shareDataVForItem: Source, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any) | null, getType?: ((shareDataVForItem: Source, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any) | null, flags?: number): VaporFragment;
export declare class ElementRecycleContext {}
export declare function createElementRecycleContext(): ElementRecycleContext;
export declare function createElementForSlots<Source extends UniSharedData>(rawSource: UniSharedDataVFor<Source>, getSlot: (shareDataVForItem: Source, key: KeyOf<Source>, index?: number) => DynamicSlot): DynamicSlot[];
declare global {
  type UniElementDynamicSlot = DynamicSlot;
  type UniElementForSlots = Array<UniElementDynamicSlot>;
  type UniElementDynamicSlotVector = Array<UniElementDynamicSlot>;
}
export declare function createElementDynamicSlot(name: string, fn: VaporSlot): DynamicSlot;
export declare function createElementForSlots<Source extends UniSharedData>(rawSource: UniSharedDataVFor<Source>, getSlot: (item: ItemOf<Source>, key: KeyOf<Source>, index: number) => UniElementDynamicSlot): UniElementDynamicSlotVector;
export declare function createElementIf(page: UniPage, condition: () => any, b1: BlockFn, b2?: BlockFn | null, once?: boolean): Block;
export declare function createElementIfChain(page: UniPage, select: () => number, blocks: BlockFn[], branchFlags: number[] | null, flags: number): Block;
export declare function setElementText(el: UniElement | UniText | null, value: string): void;
export declare function setElementHtml(el: UniElement, value: string): void;
export declare function setElementAttr(el: UniElement, key: string, value: any): void;
export declare function bindElementPseudoElement(component: UniSharedDataComponent, el: UniElement, pseudoElement: string): void;
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
export declare function setElementInsertionState(parent: UniElement, anchor?: UniElement | 0 | null): void;
export declare function getElementInsertionParent(): UniElement | null;
export declare function onElement(node: UniElement, event: string, fn: (event: UniEvent) => void, options?: AddEventListenerOptions & {
  effect?: boolean;
  stop?: boolean;
  prevent?: boolean;
}): void;
export declare function onElementRef(node: UniElement | VaporSharedDataComponentInstance<any>, fn: Function): void;
export declare function createElementDynamicSlotVector(slots: any | null): any | null;
export declare function createElementKeyedFragment(page: UniPage, key: () => string, render: BlockFn): Block;
export declare function createElementScopedSlot<S extends UniSharedData>(sharedDataVFor: UniSharedDataVFor<S>, fn: VaporSlot): VaporSlot;
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
export declare function createNativeViewStaticFor(source: number, renderItem: (item: number, key: number, index: number | undefined) => UniNativeViewBlock): UniNativeViewBlock;
export declare function createNativeViewRecycleFor<Source extends UniSharedData>(page: UniPage, recycleContext: NativeViewRecycleContext, src: () => UniSharedDataVFor<Source>, renderItem: (shareDataVForItem: Source, item: ShallowRef<ItemOf<Source>>, key: ShallowRef<KeyOf<Source>>, index: ShallowRef<number | undefined>) => void, getKey?: ((shareDataVForItem: Source, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any) | null, getType?: ((shareDataVForItem: Source, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any) | null, flags?: number): VaporFragment;
export declare class NativeViewRecycleContext {}
export declare function createNativeViewRecycleContext(): NativeViewRecycleContext;
export declare function createNativeViewIf(page: UniPage, condition: () => any, b1: BlockFn, b2?: BlockFn | null, once?: boolean): Block;
export declare function createNativeViewIfChain(page: UniPage, select: () => number, blocks: BlockFn[], branchFlags: number[] | null, flags: number): Block;
export declare function setNativeViewAttr(el: UniNativeBaseView, key: string, value: any): void;
export declare function setNativeViewInsertionState(parent: UniNativeBaseView, anchor?: UniNativeBaseView | 0 | null): void;
export declare function getNativeViewInsertionParent(): UniNativeBaseView | null;
export declare function createNativeViewComponent<S extends UniSharedDataComponent>(sharedData?: S | null, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, isSingleRoot?: boolean | null, appContext?: GenericAppContext): VaporSharedDataComponentInstance;
export declare function createNativeViewComponentWithFallback<S extends UniSharedDataComponent>(page: UniPage, sharedData?: S | null, rawProps?: LooseRawProps | null, rawSlots?: LooseRawSlots | null, isSingleRoot?: boolean): VaporSharedDataComponentInstance;
export declare function createNativeViewDynamicComponent(page: UniPage, getter: () => any, rawProps?: RawProps | null, rawSlots?: RawSlots | null, isSingleRoot?: boolean): VaporFragment;
export declare function createNativeViewTeleport(page: UniPage, props: VueNativeViewCreateTeleportProps, children?: BlockFn | null): VaporFragment;
export declare function setNativeViewDynamicProps(component: UniSharedDataComponent, view: UniNativeBaseView, args: UniSharedDataJSONObject): void;
export declare function withNativeViewVaporCtx<T>(fn: () => T): () => T;
export declare function withNativeViewVaporCtx<T>(fn: (slotProps: UniSharedData | null) => T): (slotProps: UniSharedData | null) => T;
export declare function createNativeViewSlot(page: UniPage, name: string | (() => string), getSlotProps?: (() => UniSharedData | null) | null, fallback?: VaporSlot): Block;
export declare function createNativeViewForSlots<Source extends UniSharedData>(rawSource: UniSharedDataVFor<Source>, getSlot: (shareDataVForItem: Source, key: KeyOf<Source>, index?: number) => DynamicSlot): DynamicSlot[];
declare global {
  type UniNativeViewDynamicSlot = DynamicSlot;
  type UniNativeViewForSlots = Array<UniNativeViewDynamicSlot>;
  type UniNativeViewDynamicSlotVector = Array<UniNativeViewDynamicSlot>;
}
export declare function createNativeViewDynamicSlot(name: string, fn: VaporSlot): DynamicSlot;
export declare function createNativeViewForSlots<Source extends UniSharedData>(rawSource: UniSharedDataVFor<Source>, getSlot: (item: ItemOf<Source>, key: KeyOf<Source>, index: number) => UniNativeViewDynamicSlot): UniNativeViewDynamicSlotVector;
export declare function createNativeViewDynamicSlotVector(slots: any | null): any | null;
export declare function createNativeViewKeyedFragment(page: UniPage, key: () => string, render: BlockFn): Block;
export declare function createNativeViewScopedSlot<S extends UniSharedData>(sharedDataVForGetter: () => UniSharedDataVFor<S>, fn: VaporSlot): VaporSlot;
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
//#region temp/packages/runtime-vapor-dom2/src/index.d.ts
export declare const ssrRef: typeof ref$1;
export declare const shallowSsrRef: typeof shallowRef;
//#endregion
export { defineVaporSharedDataComponent, extend, hyphenate };