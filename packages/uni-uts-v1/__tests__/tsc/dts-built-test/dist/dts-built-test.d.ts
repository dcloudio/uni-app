import { Prettify, IfAny, Awaited, UnionToIntersection, LooseRequired } from '@vue/shared';
import { DebuggerOptions, DebuggerEvent, ComputedGetter, WritableComputedOptions, Ref, ReactiveEffect, ShallowUnwrapRef, UnwrapNestedRefs } from '@vue/reactivity';
import * as vue from 'vue';

type Slot<T extends any = any> = (...args: IfAny<T, any[], [T] | (T extends undefined ? [] : never)>) => VNode[];
type InternalSlots = {
    [name: string]: Slot | undefined;
};
type Slots = Readonly<InternalSlots>;
declare const SlotSymbol: unique symbol;
type SlotsType<T extends Record<string, any> = Record<string, any>> = {
    [SlotSymbol]?: T;
};
type UnwrapSlotsType<S extends SlotsType, T = NonNullable<S[typeof SlotSymbol]>> = [keyof S] extends [never] ? Slots : Readonly<Prettify<{
    [K in keyof T]: NonNullable<T[K]> extends (...args: any[]) => any ? T[K] : Slot<T[K]>;
}>>;
type RawSlots = {
    [name: string]: unknown;
    $stable?: boolean;
};

type WatchCallback<V = any, OV = any> = (value: V, oldValue: OV, onCleanup: OnCleanup) => any;
type OnCleanup = (cleanupFn: () => void) => void;
interface WatchOptionsBase extends DebuggerOptions {
    flush?: 'pre' | 'post' | 'sync';
}
interface WatchOptions<Immediate = boolean> extends WatchOptionsBase {
    immediate?: Immediate;
    deep?: boolean;
    once?: boolean;
}
type WatchStopHandle = () => void;

interface SchedulerJob extends Function {
    id?: number;
    pre?: boolean;
    active?: boolean;
    computed?: boolean;
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
    allowRecurse?: boolean;
    /**
     * Attached by renderer.ts when setting up a component's render effect
     * Used to obtain component information when reporting max recursive updates.
     * dev only.
     */
    ownerInstance?: ComponentInternalInstance;
}
declare function nextTick<T = void, R = void>(this: T, fn?: (this: T) => R): Promise<Awaited<R>>;

interface SuspenseProps {
    onResolve?: () => void;
    onPending?: () => void;
    onFallback?: () => void;
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
    process(n1: VNode | null, n2: VNode, container: RendererElement, anchor: RendererNode | null, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, namespace: ElementNamespace, slotScopeIds: string[] | null, optimized: boolean, rendererInternals: RendererInternals): void;
    hydrate: typeof hydrateSuspense;
    create: typeof createSuspenseBoundary;
    normalize: typeof normalizeSuspenseChildren;
};
declare const Suspense: {
    new (): {
        $props: VNodeProps & SuspenseProps;
        $slots: {
            default(): VNode[];
            fallback(): VNode[];
        };
    };
    __isSuspense: true;
};
interface SuspenseBoundary {
    vnode: VNode<RendererNode, RendererElement, SuspenseProps>;
    parent: SuspenseBoundary | null;
    parentComponent: ComponentInternalInstance | null;
    namespace: ElementNamespace;
    container: RendererElement;
    hiddenContainer: RendererElement;
    activeBranch: VNode | null;
    pendingBranch: VNode | null;
    deps: number;
    pendingId: number;
    timeout: number;
    isInFallback: boolean;
    isHydrating: boolean;
    isUnmounted: boolean;
    effects: Function[];
    resolve(force?: boolean, sync?: boolean): void;
    fallback(fallbackVNode: VNode): void;
    move(container: RendererElement, anchor: RendererNode | null, type: MoveType): void;
    next(): RendererNode | null;
    registerDep(instance: ComponentInternalInstance, setupRenderEffect: SetupRenderEffectFn): void;
    unmount(parentSuspense: SuspenseBoundary | null, doRemove?: boolean): void;
}
declare function createSuspenseBoundary(vnode: VNode, parentSuspense: SuspenseBoundary | null, parentComponent: ComponentInternalInstance | null, container: RendererElement, hiddenContainer: RendererElement, anchor: RendererNode | null, namespace: ElementNamespace, slotScopeIds: string[] | null, optimized: boolean, rendererInternals: RendererInternals, isHydrating?: boolean): SuspenseBoundary;
declare function hydrateSuspense(node: Node, vnode: VNode, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, namespace: ElementNamespace, slotScopeIds: string[] | null, optimized: boolean, rendererInternals: RendererInternals, hydrateNode: (node: Node, vnode: VNode, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, slotScopeIds: string[] | null, optimized: boolean) => Node | null): Node | null;
declare function normalizeSuspenseChildren(vnode: VNode): void;

type Hook<T = () => void> = T | T[];
interface BaseTransitionProps<HostElement = RendererElement> {
    mode?: 'in-out' | 'out-in' | 'default';
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
    mode: BaseTransitionProps['mode'];
    persisted: boolean;
    beforeEnter(el: HostElement): void;
    enter(el: HostElement): void;
    leave(el: HostElement, remove: () => void): void;
    clone(vnode: VNode): TransitionHooks<HostElement>;
    afterLeave?(): void;
    delayLeave?(el: HostElement, earlyRemove: () => void, delayedLeave: () => void): void;
    delayedLeave?(): void;
}

type ElementNamespace = 'svg' | 'mathml' | undefined;
interface RendererOptions<HostNode = RendererNode, HostElement = RendererElement> {
    patchProp(el: HostElement, key: string, prevValue: any, nextValue: any, namespace?: ElementNamespace, prevChildren?: VNode<HostNode, HostElement>[], parentComponent?: ComponentInternalInstance | null, parentSuspense?: SuspenseBoundary | null, unmountChildren?: UnmountChildrenFn): void;
    insert(el: HostNode, parent: HostElement, anchor?: HostNode | null): void;
    remove(el: HostNode): void;
    createElement(type: string, namespace?: ElementNamespace, isCustomizedBuiltIn?: string, vnodeProps?: (VNodeProps & {
        [key: string]: any;
    }) | null): HostElement;
    createText(text: string): HostNode;
    createComment(text: string): HostNode;
    setText(node: HostNode, text: string): void;
    setElementText(node: HostElement, text: string): void;
    parentNode(node: HostNode): HostElement | null;
    nextSibling(node: HostNode): HostNode | null;
    querySelector?(selector: string): HostElement | null;
    setScopeId?(el: HostElement, id: string): void;
    cloneNode?(node: HostNode): HostNode;
    insertStaticContent?(content: string, parent: HostElement, anchor: HostNode | null, namespace: ElementNamespace, start?: HostNode | null, end?: HostNode | null): [HostNode, HostNode];
}
interface RendererNode {
    [key: string]: any;
}
interface RendererElement extends RendererNode {
}
interface RendererInternals<HostNode = RendererNode, HostElement = RendererElement> {
    p: PatchFn;
    um: UnmountFn;
    r: RemoveFn;
    m: MoveFn;
    mt: MountComponentFn;
    mc: MountChildrenFn;
    pc: PatchChildrenFn;
    pbc: PatchBlockChildrenFn;
    n: NextFn;
    o: RendererOptions<HostNode, HostElement>;
}
type PatchFn = (n1: VNode | null, // null means this is a mount
n2: VNode, container: RendererElement, anchor?: RendererNode | null, parentComponent?: ComponentInternalInstance | null, parentSuspense?: SuspenseBoundary | null, namespace?: ElementNamespace, slotScopeIds?: string[] | null, optimized?: boolean) => void;
type MountChildrenFn = (children: VNodeArrayChildren, container: RendererElement, anchor: RendererNode | null, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, namespace: ElementNamespace, slotScopeIds: string[] | null, optimized: boolean, start?: number) => void;
type PatchChildrenFn = (n1: VNode | null, n2: VNode, container: RendererElement, anchor: RendererNode | null, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, namespace: ElementNamespace, slotScopeIds: string[] | null, optimized: boolean) => void;
type PatchBlockChildrenFn = (oldChildren: VNode[], newChildren: VNode[], fallbackContainer: RendererElement, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, namespace: ElementNamespace, slotScopeIds: string[] | null) => void;
type MoveFn = (vnode: VNode, container: RendererElement, anchor: RendererNode | null, type: MoveType, parentSuspense?: SuspenseBoundary | null) => void;
type NextFn = (vnode: VNode) => RendererNode | null;
type UnmountFn = (vnode: VNode, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, doRemove?: boolean, optimized?: boolean) => void;
type RemoveFn = (vnode: VNode) => void;
type UnmountChildrenFn = (children: VNode[], parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, doRemove?: boolean, optimized?: boolean, start?: number) => void;
type MountComponentFn = (initialVNode: VNode, container: RendererElement, anchor: RendererNode | null, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, namespace: ElementNamespace, optimized: boolean) => void;
type SetupRenderEffectFn = (instance: ComponentInternalInstance, initialVNode: VNode, container: RendererElement, anchor: RendererNode | null, parentSuspense: SuspenseBoundary | null, namespace: ElementNamespace, optimized: boolean) => void;
declare enum MoveType {
    ENTER = 0,
    LEAVE = 1,
    REORDER = 2
}

type DebuggerHook = (e: DebuggerEvent) => void;
type ErrorCapturedHook<TError = unknown> = (err: TError, instance: ComponentPublicInstance | null, info: string) => boolean | void;

type ComponentPropsOptions<P = Data> = ComponentObjectPropsOptions<P> | string[];
type ComponentObjectPropsOptions<P = Data> = {
    [K in keyof P]: Prop<P[K]> | null;
};
type Prop<T, D = T> = PropOptions<T, D> | PropType<T>;
type DefaultFactory<T> = (props: Data) => T | null | undefined;
interface PropOptions<T = any, D = T> {
    type?: PropType<T> | true | null;
    required?: boolean;
    default?: D | DefaultFactory<D> | null | undefined | object;
    validator?(value: unknown, props: Data): boolean;
}
type PropType<T> = PropConstructor<T> | PropConstructor<T>[];
type PropConstructor<T = any> = {
    new (...args: any[]): T & {};
} | {
    (): T;
} | PropMethod<T>;
type PropMethod<T, TConstructor = any> = [T] extends [
    ((...args: any) => any) | undefined
] ? {
    new (): TConstructor;
    (): T;
    readonly prototype: TConstructor;
} : never;
type RequiredKeys<T> = {
    [K in keyof T]: T[K] extends {
        required: true;
    } | {
        default: any;
    } | BooleanConstructor | {
        type: BooleanConstructor;
    } ? T[K] extends {
        default: undefined | (() => undefined);
    } ? never : K : never;
}[keyof T];
type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;
type DefaultKeys<T> = {
    [K in keyof T]: T[K] extends {
        default: any;
    } | BooleanConstructor | {
        type: BooleanConstructor;
    } ? T[K] extends {
        type: BooleanConstructor;
        required: true;
    } ? never : K : never;
}[keyof T];
type InferPropType<T> = [T] extends [null] ? any : [T] extends [{
    type: null | true;
}] ? any : [T] extends [ObjectConstructor | {
    type: ObjectConstructor;
}] ? Record<string, any> : [T] extends [BooleanConstructor | {
    type: BooleanConstructor;
}] ? boolean : [T] extends [DateConstructor | {
    type: DateConstructor;
}] ? Date : [T] extends [(infer U)[] | {
    type: (infer U)[];
}] ? U extends DateConstructor ? Date | InferPropType<U> : InferPropType<U> : [T] extends [Prop<infer V, infer D>] ? unknown extends V ? IfAny<V, V, D> : V : T;
/**
 * Extract prop types from a runtime props options object.
 * The extracted types are **internal** - i.e. the resolved props received by
 * the component.
 * - Boolean props are always present
 * - Props with default values are always present
 *
 * To extract accepted props from the parent, use {@link ExtractPublicPropTypes}.
 */
type ExtractPropTypes<O> = {
    [K in keyof Pick<O, RequiredKeys<O>>]: InferPropType<O[K]>;
} & {
    [K in keyof Pick<O, OptionalKeys<O>>]?: InferPropType<O[K]>;
};
type ExtractDefaultPropTypes<O> = O extends object ? {
    [K in keyof Pick<O, DefaultKeys<O>>]: InferPropType<O[K]>;
} : {};

type ObjectEmitsOptions = Record<string, ((...args: any[]) => any) | null>;
type EmitsOptions = ObjectEmitsOptions | string[];
type EmitsToProps<T extends EmitsOptions> = T extends string[] ? {
    [K in `on${Capitalize<T[number]>}`]?: (...args: any[]) => any;
} : T extends ObjectEmitsOptions ? {
    [K in `on${Capitalize<string & keyof T>}`]?: K extends `on${infer C}` ? (...args: T[Uncapitalize<C>] extends (...args: infer P) => any ? P : T[Uncapitalize<C>] extends null ? any[] : never) => any : never;
} : {};
type ShortEmitsToObject<E> = E extends Record<string, any[]> ? {
    [K in keyof E]: (...args: E[K]) => any;
} : E;
type EmitFn<Options = ObjectEmitsOptions, Event extends keyof Options = keyof Options> = Options extends Array<infer V> ? (event: V, ...args: any[]) => void : {} extends Options ? (event: string, ...args: any[]) => void : UnionToIntersection<{
    [key in Event]: Options[key] extends (...args: infer Args) => any ? (event: key, ...args: Args) => void : Options[key] extends any[] ? (event: key, ...args: Options[key]) => void : (event: key, ...args: any[]) => void;
}[Event]>;

/**
Runtime helper for applying directives to a vnode. Example usage:

const comp = resolveComponent('comp')
const foo = resolveDirective('foo')
const bar = resolveDirective('bar')

return withDirectives(h(comp), [
  [foo, this.x],
  [bar, this.y]
])
*/

interface DirectiveBinding<V = any> {
    instance: ComponentPublicInstance | null;
    value: V;
    oldValue: V | null;
    arg?: string;
    modifiers: DirectiveModifiers;
    dir: ObjectDirective<any, V>;
}
type DirectiveHook<T = any, Prev = VNode<any, T> | null, V = any> = (el: T, binding: DirectiveBinding<V>, vnode: VNode<any, T>, prevVNode: Prev) => void;
type SSRDirectiveHook = (binding: DirectiveBinding, vnode: VNode) => Data | undefined;
interface ObjectDirective<T = any, V = any> {
    created?: DirectiveHook<T, null, V>;
    beforeMount?: DirectiveHook<T, null, V>;
    mounted?: DirectiveHook<T, null, V>;
    beforeUpdate?: DirectiveHook<T, VNode<any, T>, V>;
    updated?: DirectiveHook<T, VNode<any, T>, V>;
    beforeUnmount?: DirectiveHook<T, null, V>;
    unmounted?: DirectiveHook<T, null, V>;
    getSSRProps?: SSRDirectiveHook;
    deep?: boolean;
}
type FunctionDirective<T = any, V = any> = DirectiveHook<T, any, V>;
type Directive<T = any, V = any> = ObjectDirective<T, V> | FunctionDirective<T, V>;
type DirectiveModifiers = Record<string, boolean>;

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
type CompatConfig = Partial<Record<DeprecationTypes, boolean | 'suppress-warning'>> & {
    MODE?: 2 | 3 | ((comp: Component | null) => 2 | 3);
};

/**
 * Interface for declaring custom options.
 *
 * @example
 * ```ts
 * declare module '@vue/runtime-core' {
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
interface ComponentCustomOptions {
}
type RenderFunction = () => VNodeChild;
interface ComponentOptionsBase<Props, RawBindings, D, C extends ComputedOptions, M extends MethodOptions, Mixin extends ComponentOptionsMixin, Extends extends ComponentOptionsMixin, E extends EmitsOptions, EE extends string = string, Defaults = {}, I extends ComponentInjectOptions = {}, II extends string = string, S extends SlotsType = {}> extends LegacyOptions<Props, D, C, M, Mixin, Extends, I, II>, ComponentInternalOptions, ComponentCustomOptions {
    setup?: (this: void, props: LooseRequired<Props & Prettify<UnwrapMixinsType<IntersectionMixin<Mixin> & IntersectionMixin<Extends>, 'P'>>>, ctx: SetupContext<E, S>) => Promise<RawBindings> | RawBindings | RenderFunction | void;
    name?: string;
    template?: string | object;
    render?: Function;
    components?: Record<string, Component>;
    directives?: Record<string, Directive>;
    inheritAttrs?: boolean;
    emits?: (E | EE[]) & ThisType<void>;
    slots?: S;
    expose?: string[];
    serverPrefetch?(): void | Promise<any>;
    compilerOptions?: RuntimeCompilerOptions;
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
    whitespace?: 'preserve' | 'condense';
    comments?: boolean;
    delimiters?: [string, string];
}
type ComponentOptions<Props = {}, RawBindings = any, D = any, C extends ComputedOptions = any, M extends MethodOptions = any, Mixin extends ComponentOptionsMixin = any, Extends extends ComponentOptionsMixin = any, E extends EmitsOptions = any, S extends SlotsType = any> = ComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, E, string, S> & ThisType<CreateComponentPublicInstance<{}, RawBindings, D, C, M, Mixin, Extends, E, Readonly<Props>>>;
type ComponentOptionsMixin = ComponentOptionsBase<any, any, any, any, any, any, any, any, any, any, any>;
type ComputedOptions = Record<string, ComputedGetter<any> | WritableComputedOptions<any>>;
interface MethodOptions {
    [key: string]: Function;
}
type ExtractComputedReturns<T extends any> = {
    [key in keyof T]: T[key] extends {
        get: (...args: any[]) => infer TReturn;
    } ? TReturn : T[key] extends (...args: any[]) => infer TReturn ? TReturn : never;
};
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
    from?: string | symbol;
    default?: unknown;
}>;
type InjectToObject<T extends ComponentInjectOptions> = T extends string[] ? {
    [K in T[number]]?: unknown;
} : T extends ObjectInjectOptions ? {
    [K in keyof T]?: unknown;
} : never;
interface LegacyOptions<Props, D, C extends ComputedOptions, M extends MethodOptions, Mixin extends ComponentOptionsMixin, Extends extends ComponentOptionsMixin, I extends ComponentInjectOptions, II extends string> {
    compatConfig?: CompatConfig;
    [key: string]: any;
    data?: (this: CreateComponentPublicInstance<Props, {}, {}, {}, MethodOptions, Mixin, Extends>) => D;
    computed?: C;
    methods?: M;
    watch?: ComponentWatchOptions;
    provide?: ComponentProvideOptions;
    inject?: I | II[];
    filters?: Record<string, Function>;
    mixins?: Mixin[];
    extends?: Extends;
    beforeCreate?(): void;
    created?(): void;
    beforeMount?(): void;
    mounted?(): void;
    beforeUpdate?(): void;
    updated?(): void;
    activated?(): void;
    deactivated?(): void;
    /** @deprecated use `beforeUnmount` instead */
    beforeDestroy?(): void;
    beforeUnmount?(): void;
    /** @deprecated use `unmounted` instead */
    destroyed?(): void;
    unmounted?(): void;
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
     * typescript will try to simplify the inferred `Mixin` type,
     * with the `__differentiator`, typescript won't be able to combine different mixins,
     * because the `__differentiator` will be different
     */
    __differentiator?: keyof D | keyof C | keyof M;
}
type MergedHook<T = () => void> = T | T[];
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
type OptionTypesKeys = 'P' | 'B' | 'D' | 'C' | 'M' | 'Defaults';
type OptionTypesType<P = {}, B = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Defaults = {}> = {
    P: P;
    B: B;
    D: D;
    C: C;
    M: M;
    Defaults: Defaults;
};

interface InjectionKey<T> extends Symbol {
}

type PublicProps = VNodeProps & AllowedComponentProps & ComponentCustomProps;
type ResolveProps<PropsOrPropOptions, E extends EmitsOptions> = Readonly<PropsOrPropOptions extends ComponentPropsOptions ? ExtractPropTypes<PropsOrPropOptions> : PropsOrPropOptions> & ({} extends E ? {} : EmitsToProps<E>);
type DefineComponent<PropsOrPropOptions = {}, RawBindings = {}, D = {}, C extends ComputedOptions = ComputedOptions, M extends MethodOptions = MethodOptions, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, EE extends string = string, PP = PublicProps, Props = ResolveProps<PropsOrPropOptions, E>, Defaults = ExtractDefaultPropTypes<PropsOrPropOptions>, S extends SlotsType = {}> = ComponentPublicInstanceConstructor<CreateComponentPublicInstance<Props, RawBindings, D, C, M, Mixin, Extends, E, PP & Props, Defaults, true, {}, S>> & ComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, Defaults, {}, string, S> & PP;

interface App<HostElement = any> {
    version: string;
    config: AppConfig;
    use<Options extends unknown[]>(plugin: Plugin<Options>, ...options: Options): this;
    use<Options>(plugin: Plugin<Options>, options: Options): this;
    mixin(mixin: ComponentOptions): this;
    component(name: string): Component | undefined;
    component(name: string, component: Component | DefineComponent): this;
    directive<T = any, V = any>(name: string): Directive<T, V> | undefined;
    directive<T = any, V = any>(name: string, directive: Directive<T, V>): this;
    mount(rootContainer: HostElement | string, isHydrate?: boolean, namespace?: boolean | ElementNamespace): ComponentPublicInstance;
    unmount(): void;
    provide<T>(key: InjectionKey<T> | string, value: T): this;
    /**
     * Runs a function with the app as active instance. This allows using of `inject()` within the function to get access
     * to variables provided via `app.provide()`.
     *
     * @param fn - function to run with the app as active instance
     */
    runWithContext<T>(fn: () => T): T;
    _uid: number;
    _component: ConcreteComponent;
    _props: Data | null;
    _container: HostElement | null;
    _context: AppContext;
    _instance: ComponentInternalInstance | null;
    /**
     * v2 compat only
     */
    filter?(name: string): Function | undefined;
    filter?(name: string, filter: Function): this;
}
type OptionMergeFunction = (to: unknown, from: unknown) => any;
interface AppConfig {
    readonly isNativeTag: (tag: string) => boolean;
    performance: boolean;
    optionMergeStrategies: Record<string, OptionMergeFunction>;
    globalProperties: ComponentCustomProperties & Record<string, any>;
    errorHandler?: (err: unknown, instance: ComponentPublicInstance | null, info: string) => void;
    warnHandler?: (msg: string, instance: ComponentPublicInstance | null, trace: string) => void;
    /**
     * Options to pass to `@vue/compiler-dom`.
     * Only supported in runtime compiler build.
     */
    compilerOptions: RuntimeCompilerOptions;
    /**
     * @deprecated use config.compilerOptions.isCustomElement
     */
    isCustomElement?: (tag: string) => boolean;
    /**
     * TODO document for 3.5
     * Enable warnings for computed getters that recursively trigger itself.
     */
    warnRecursiveComputed?: boolean;
}
interface AppContext {
    app: App;
    config: AppConfig;
    mixins: ComponentOptions[];
    components: Record<string, Component>;
    directives: Record<string, Directive>;
    provides: Record<string | symbol, any>;
}
type PluginInstallFunction<Options = any[]> = Options extends unknown[] ? (app: App, ...options: Options) => any : (app: App, options: Options) => any;
type ObjectPlugin<Options = any[]> = {
    install: PluginInstallFunction<Options>;
};
type FunctionPlugin<Options = any[]> = PluginInstallFunction<Options> & Partial<ObjectPlugin<Options>>;
type Plugin<Options = any[]> = FunctionPlugin<Options> | ObjectPlugin<Options>;

type TeleportVNode = VNode<RendererNode, RendererElement, TeleportProps>;
interface TeleportProps {
    to: string | RendererElement | null | undefined;
    disabled?: boolean;
}
declare const TeleportImpl: {
    name: string;
    __isTeleport: boolean;
    process(n1: TeleportVNode | null, n2: TeleportVNode, container: RendererElement, anchor: RendererNode | null, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, namespace: ElementNamespace, slotScopeIds: string[] | null, optimized: boolean, internals: RendererInternals): void;
    remove(vnode: VNode, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, optimized: boolean, { um: unmount, o: { remove: hostRemove } }: RendererInternals, doRemove: boolean): void;
    move: typeof moveTeleport;
    hydrate: typeof hydrateTeleport;
};
declare enum TeleportMoveTypes {
    TARGET_CHANGE = 0,
    TOGGLE = 1,
    REORDER = 2
}
declare function moveTeleport(vnode: VNode, container: RendererElement, parentAnchor: RendererNode | null, { o: { insert }, m: move }: RendererInternals, moveType?: TeleportMoveTypes): void;
declare function hydrateTeleport(node: Node, vnode: TeleportVNode, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, slotScopeIds: string[] | null, optimized: boolean, { o: { nextSibling, parentNode, querySelector }, }: RendererInternals<Node, Element>, hydrateChildren: (node: Node | null, vnode: VNode, container: Element, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, slotScopeIds: string[] | null, optimized: boolean) => Node | null): Node | null;
declare const Teleport: {
    new (): {
        $props: VNodeProps & TeleportProps;
        $slots: {
            default(): VNode[];
        };
    };
    __isTeleport: true;
};

declare const Fragment: {
    new (): {
        $props: VNodeProps;
    };
    __isFragment: true;
};
declare const Text: unique symbol;
declare const Comment: unique symbol;
declare const Static: unique symbol;
type VNodeTypes = string | VNode | Component | typeof Text | typeof Static | typeof Comment | typeof Fragment | typeof Teleport | typeof TeleportImpl | typeof Suspense | typeof SuspenseImpl;
type VNodeRef = string | Ref | ((ref: Element | ComponentPublicInstance | null, refs: Record<string, any>) => void);
type VNodeNormalizedRefAtom = {
    i: ComponentInternalInstance;
    r: VNodeRef;
    k?: string;
    f?: boolean;
};
type VNodeNormalizedRef = VNodeNormalizedRefAtom | VNodeNormalizedRefAtom[];
type VNodeMountHook = (vnode: VNode) => void;
type VNodeUpdateHook = (vnode: VNode, oldVNode: VNode) => void;
type VNodeProps = {
    key?: string | number | symbol;
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
type VNodeNormalizedChildren = string | VNodeArrayChildren | RawSlots | null;
interface VNode<HostNode = RendererNode, HostElement = RendererElement, ExtraProps = {
    [key: string]: any;
}> {
    type: VNodeTypes;
    props: (VNodeProps & ExtraProps) | null;
    key: string | number | symbol | null;
    ref: VNodeNormalizedRef | null;
    /**
     * SFC only. This is assigned on vnode creation using currentScopeId
     * which is set alongside currentRenderingInstance.
     */
    scopeId: string | null;
    children: VNodeNormalizedChildren;
    component: ComponentInternalInstance | null;
    dirs: DirectiveBinding[] | null;
    transition: TransitionHooks<HostElement> | null;
    el: HostNode | null;
    anchor: HostNode | null;
    target: HostElement | null;
    targetAnchor: HostNode | null;
    suspense: SuspenseBoundary | null;
    shapeFlag: number;
    patchFlag: number;
    appContext: AppContext | null;
}

type Data = Record<string, unknown>;
/**
 * For extending allowed non-declared props on components in TSX
 */
interface ComponentCustomProps {
}
/**
 * Default allowed non-declared props on component in TSX
 */
interface AllowedComponentProps {
    class?: unknown;
    style?: unknown;
}
interface ComponentInternalOptions {
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
}
interface FunctionalComponent<P = {}, E extends EmitsOptions | Record<string, any[]> = {}, S extends Record<string, any> = any, EE extends EmitsOptions = ShortEmitsToObject<E>> extends ComponentInternalOptions {
    (props: P & EmitsToProps<EE>, ctx: Omit<SetupContext<EE, IfAny<S, {}, SlotsType<S>>>, 'expose'>): any;
    props?: ComponentPropsOptions<P>;
    emits?: EE | (keyof EE)[];
    slots?: IfAny<S, Slots, SlotsType<S>>;
    inheritAttrs?: boolean;
    displayName?: string;
    compatConfig?: CompatConfig;
}
/**
 * Concrete component type matches its actual value: it's either an options
 * object, or a function. Use this where the code expects to work with actual
 * values, e.g. checking if its a function or not. This is mostly for internal
 * implementation code.
 */
type ConcreteComponent<Props = {}, RawBindings = any, D = any, C extends ComputedOptions = ComputedOptions, M extends MethodOptions = MethodOptions, E extends EmitsOptions | Record<string, any[]> = {}, S extends Record<string, any> = any> = ComponentOptions<Props, RawBindings, D, C, M> | FunctionalComponent<Props, E, S>;
/**
 * A type used in public APIs where a component type is expected.
 * The constructor type is an artificial type returned by defineComponent().
 */
type Component<Props = any, RawBindings = any, D = any, C extends ComputedOptions = ComputedOptions, M extends MethodOptions = MethodOptions, E extends EmitsOptions | Record<string, any[]> = {}, S extends Record<string, any> = any> = ConcreteComponent<Props, RawBindings, D, C, M, E, S> | ComponentPublicInstanceConstructor<Props>;

type SetupContext<E = EmitsOptions, S extends SlotsType = {}> = E extends any ? {
    attrs: Data;
    slots: UnwrapSlotsType<S>;
    emit: EmitFn<E>;
    expose: (exposed?: Record<string, any>) => void;
} : never;
/**
 * We expose a subset of properties on the internal instance as they are
 * useful for advanced external libraries and tools.
 */
interface ComponentInternalInstance {
    uid: number;
    type: ConcreteComponent;
    parent: ComponentInternalInstance | null;
    root: ComponentInternalInstance;
    appContext: AppContext;
    /**
     * Vnode representing this component in its parent's vdom tree
     */
    vnode: VNode;
    /**
     * Root vnode of this component's own vdom tree
     */
    subTree: VNode;
    /**
     * Render effect instance
     */
    effect: ReactiveEffect;
    /**
     * Bound effect runner to be passed to schedulers
     */
    update: SchedulerJob;
    proxy: ComponentPublicInstance | null;
    exposed: Record<string, any> | null;
    exposeProxy: Record<string, any> | null;
    data: Data;
    props: Data;
    attrs: Data;
    slots: InternalSlots;
    refs: Data;
    emit: EmitFn;
    attrsProxy: Data | null;
    slotsProxy: Slots | null;
    isMounted: boolean;
    isUnmounted: boolean;
    isDeactivated: boolean;
}

/**
 * Custom properties added to component instances in any way and can be accessed through `this`
 *
 * @example
 * Here is an example of adding a property `$router` to every component instance:
 * ```ts
 * import { createApp } from 'vue'
 * import { Router, createRouter } from 'vue-router'
 *
 * declare module '@vue/runtime-core' {
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
interface ComponentCustomProperties {
}
type IsDefaultMixinComponent<T> = T extends ComponentOptionsMixin ? ComponentOptionsMixin extends T ? true : false : false;
type MixinToOptionTypes<T> = T extends ComponentOptionsBase<infer P, infer B, infer D, infer C, infer M, infer Mixin, infer Extends, any, any, infer Defaults, any, any, any> ? OptionTypesType<P & {}, B & {}, D & {}, C & {}, M & {}, Defaults & {}> & IntersectionMixin<Mixin> & IntersectionMixin<Extends> : never;
type ExtractMixin<T> = {
    Mixin: MixinToOptionTypes<T>;
}[T extends ComponentOptionsMixin ? 'Mixin' : never];
type IntersectionMixin<T> = IsDefaultMixinComponent<T> extends true ? OptionTypesType : UnionToIntersection<ExtractMixin<T>>;
type UnwrapMixinsType<T, Type extends OptionTypesKeys> = T extends OptionTypesType ? T[Type] : never;
type EnsureNonVoid<T> = T extends void ? {} : T;
type ComponentPublicInstanceConstructor<T extends ComponentPublicInstance<Props, RawBindings, D, C, M> = ComponentPublicInstance<any>, Props = any, RawBindings = any, D = any, C extends ComputedOptions = ComputedOptions, M extends MethodOptions = MethodOptions> = {
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
    new (...args: any[]): T;
};
type CreateComponentPublicInstance<P = {}, B = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, PublicProps = P, Defaults = {}, MakeDefaultsOptional extends boolean = false, I extends ComponentInjectOptions = {}, S extends SlotsType = {}, PublicMixin = IntersectionMixin<Mixin> & IntersectionMixin<Extends>, PublicP = UnwrapMixinsType<PublicMixin, 'P'> & EnsureNonVoid<P>, PublicB = UnwrapMixinsType<PublicMixin, 'B'> & EnsureNonVoid<B>, PublicD = UnwrapMixinsType<PublicMixin, 'D'> & EnsureNonVoid<D>, PublicC extends ComputedOptions = UnwrapMixinsType<PublicMixin, 'C'> & EnsureNonVoid<C>, PublicM extends MethodOptions = UnwrapMixinsType<PublicMixin, 'M'> & EnsureNonVoid<M>, PublicDefaults = UnwrapMixinsType<PublicMixin, 'Defaults'> & EnsureNonVoid<Defaults>> = ComponentPublicInstance<PublicP, PublicB, PublicD, PublicC, PublicM, E, PublicProps, PublicDefaults, MakeDefaultsOptional, ComponentOptionsBase<P, B, D, C, M, Mixin, Extends, E, string, Defaults, {}, string, S>, I, S>;
type ComponentPublicInstance<P = {}, // props type extracted from props option
B = {}, // raw bindings returned from setup()
D = {}, // return from data()
C extends ComputedOptions = {}, M extends MethodOptions = {}, E extends EmitsOptions = {}, PublicProps = P, Defaults = {}, MakeDefaultsOptional extends boolean = false, Options = ComponentOptionsBase<any, any, any, any, any, any, any, any, any>, I extends ComponentInjectOptions = {}, S extends SlotsType = {}> = {
    $: ComponentInternalInstance;
    $data: D;
    $props: MakeDefaultsOptional extends true ? Partial<Defaults> & Omit<Prettify<P> & PublicProps, keyof Defaults> : Prettify<P> & PublicProps;
    $attrs: Data;
    $refs: Data;
    $slots: UnwrapSlotsType<S>;
    $root: ComponentPublicInstance | null;
    $parent: ComponentPublicInstance | null;
    $emit: EmitFn<E>;
    $el: any;
    $options: Options & MergedComponentOptionsOverride;
    $forceUpdate: () => void;
    $nextTick: typeof nextTick;
    $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R]) => any : (...args: any) => any, options?: WatchOptions): WatchStopHandle;
} & IfAny<P, P, Omit<P, keyof ShallowUnwrapRef<B>>> & ShallowUnwrapRef<B> & UnwrapNestedRefs<D> & ExtractComputedReturns<C> & M & ComponentCustomProperties & InjectToObject<I>;

export declare const CustomPropsNotErased: ComponentPublicInstanceConstructor<vue.CreateComponentPublicInstance<readonly string[] | Readonly<vue.ExtractPropTypes<Readonly<vue.ComponentObjectPropsOptions<Data>>>>, void, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & Readonly<readonly string[] | vue.ExtractPropTypes<Readonly<vue.ComponentObjectPropsOptions<Data>>>>, {
    [x: number]: string;
} | {}, true, {}, {}>> & vue.ComponentOptionsBase<readonly string[] | Readonly<vue.ExtractPropTypes<Readonly<vue.ComponentObjectPropsOptions<Data>>>>, void, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, {
    [x: number]: string;
} | {}, {}, string, {}> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
    foo: string;
};

