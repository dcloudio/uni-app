import Vue$1, { VNode, VueConstructor, ComponentOptions, AsyncComponent, VNodeDirective, CreateElement } from 'vue';
import { Component as Component$1, AsyncComponent as AsyncComponent$1 } from 'vue/types/options';
import { VNodeChildren, VNode as VNode$1, VNodeData } from 'vue/types/vnode';

declare type Data = {
    [key: string]: unknown;
};

declare type ComponentPropsOptions<P = Data> = ComponentObjectPropsOptions<P> | string[];
declare type ComponentObjectPropsOptions<P = Data> = {
    [K in keyof P]: Prop<P[K]> | null;
};
declare type Prop<T, D = T> = PropOptions<T, D> | PropType<T>;
declare type DefaultFactory<T> = () => T | null | undefined;
interface PropOptions<T = any, D = T> {
    type?: PropType<T> | true | null;
    required?: boolean;
    default?: D | DefaultFactory<D> | null | undefined | object;
    validator?(value: unknown): boolean;
}
declare type PropType<T> = PropConstructor<T> | PropConstructor<T>[];
declare type PropConstructor<T> = {
    new (...args: any[]): T & object;
} | {
    (): T;
} | {
    new (...args: string[]): Function;
};
declare type RequiredKeys<T> = {
    [K in keyof T]: T[K] extends {
        required: true;
    } | {
        default: any;
    } | BooleanConstructor | {
        type: BooleanConstructor;
    } ? K : never;
}[keyof T];
declare type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;
declare type ExtractFunctionPropType<T extends Function, TArgs extends Array<any> = any[], TResult = any> = T extends (...args: TArgs) => TResult ? T : never;
declare type ExtractCorrectPropType<T> = T extends Function ? ExtractFunctionPropType<T> : Exclude<T, Function>;
declare type InferPropType<T> = T extends null ? any : T extends {
    type: null | true;
} ? any : T extends ObjectConstructor | {
    type: ObjectConstructor;
} ? Record<string, any> : T extends BooleanConstructor | {
    type: BooleanConstructor;
} ? boolean : T extends DateConstructor | {
    type: DateConstructor;
} ? Date : T extends FunctionConstructor ? Function : T extends Prop<infer V, infer D> ? unknown extends V ? D extends null | undefined ? V : D : ExtractCorrectPropType<V> : T;
declare type ExtractPropTypes<O> = {
    [K in keyof Pick<O, RequiredKeys<O>>]: InferPropType<O[K]>;
} & {
    [K in keyof Pick<O, OptionalKeys<O>>]?: InferPropType<O[K]>;
};
declare type DefaultKeys<T> = {
    [K in keyof T]: T[K] extends {
        default: any;
    } | BooleanConstructor | {
        type: BooleanConstructor;
    } ? T[K] extends {
        type: BooleanConstructor;
        required: true;
    } ? never : K : never;
}[keyof T];
declare type ExtractDefaultPropTypes<O> = O extends object ? {
    [K in keyof Pick<O, DefaultKeys<O>>]: InferPropType<O[K]>;
} : {};

declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

declare type Slot = (...args: any[]) => VNode[];
declare type InternalSlots = {
    [name: string]: Slot | undefined;
};
declare type ObjectEmitsOptions = Record<string, ((...args: any[]) => any) | null>;
declare type EmitsOptions = ObjectEmitsOptions | string[];
declare type EmitFn<Options = ObjectEmitsOptions, Event extends keyof Options = keyof Options, ReturnType extends void | Vue$1 = void> = Options extends Array<infer V> ? (event: V, ...args: any[]) => ReturnType : {} extends Options ? (event: string, ...args: any[]) => ReturnType : UnionToIntersection<{
    [key in Event]: Options[key] extends (...args: infer Args) => any ? (event: key, ...args: Args) => ReturnType : (event: key, ...args: any[]) => ReturnType;
}[Event]>;
declare type ComponentRenderEmitFn<Options = ObjectEmitsOptions, Event extends keyof Options = keyof Options, T extends Vue$1 | void = void> = EmitFn<Options, Event, T>;
declare type Slots = Readonly<InternalSlots>;
interface SetupContext<E extends EmitsOptions = {}> {
    attrs: Data;
    slots: Slots;
    emit: EmitFn<E>;
    /**
     * @deprecated not available in Vue 2
     */
    expose: (exposed?: Record<string, any>) => void;
    /**
     * @deprecated not available in Vue 3
     */
    readonly parent: ComponentInstance | null;
    /**
     * @deprecated not available in Vue 3
     */
    readonly root: ComponentInstance;
    /**
     * @deprecated not available in Vue 3
     */
    readonly listeners: {
        [key in string]?: Function;
    };
    /**
     * @deprecated not available in Vue 3
     */
    readonly refs: {
        [key: string]: Vue | Element | Vue[] | Element[];
    };
}
/**
 * We expose a subset of properties on the internal instance as they are
 * useful for advanced external libraries and tools.
 */
declare interface ComponentInternalInstance {
    uid: number;
    type: Record<string, unknown>;
    parent: ComponentInternalInstance | null;
    root: ComponentInternalInstance;
    /**
     * Vnode representing this component in its parent's vdom tree
     */
    vnode: VNode;
    /**
     * Root vnode of this component's own vdom tree
     */
    /**
     * The reactive effect for rendering and patching the component. Callable.
     */
    update: Function;
    data: Data;
    props: Data;
    attrs: Data;
    refs: Data;
    emit: EmitFn;
    slots: InternalSlots;
    emitted: Record<string, boolean> | null;
    proxy: ComponentInstance;
    isMounted: boolean;
    isUnmounted: boolean;
    isDeactivated: boolean;
}
declare function getCurrentInstance(): ComponentInternalInstance | null;

declare type EmitsToProps<T extends EmitsOptions> = T extends string[] ? {
    [K in string & `on${Capitalize<T[number]>}`]?: (...args: any[]) => any;
} : T extends ObjectEmitsOptions ? {
    [K in string & `on${Capitalize<string & keyof T>}`]?: K extends `on${infer C}` ? T[Uncapitalize<C>] extends null ? (...args: any[]) => any : (...args: T[Uncapitalize<C>] extends (...args: infer P) => any ? P : never) => any : never;
} : {};
declare type ComponentInstance = InstanceType<VueConstructor>;
declare type ComponentRenderProxy<P = {}, // props type extracted from props option
B = {}, // raw bindings returned from setup()
D = {}, // return from data()
C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin = {}, Extends = {}, Emits extends EmitsOptions = {}, PublicProps = P, Defaults = {}, MakeDefaultsOptional extends boolean = false> = {
    $data: D;
    $props: Readonly<MakeDefaultsOptional extends true ? Partial<Defaults> & Omit<P & PublicProps, keyof Defaults> : P & PublicProps>;
    $attrs: Record<string, string>;
    $emit: ComponentRenderEmitFn<Emits, keyof Emits, ComponentRenderProxy<P, B, D, C, M, Mixin, Extends, Emits, PublicProps, Defaults, MakeDefaultsOptional>>;
} & Readonly<P> & ShallowUnwrapRef<B> & D & M & ExtractComputedReturns<C> & Omit<Vue$1, '$data' | '$props' | '$attrs' | '$emit'>;
declare type VueConstructorProxy<PropsOptions, RawBindings, Data, Computed extends ComputedOptions, Methods extends MethodOptions, Mixin = {}, Extends = {}, Emits extends EmitsOptions = {}, Props = ExtractPropTypes<PropsOptions> & ({} extends Emits ? {} : EmitsToProps<Emits>)> = Omit<VueConstructor, never> & {
    new (...args: any[]): ComponentRenderProxy<Props, ShallowUnwrapRef<RawBindings>, Data, Computed, Methods, Mixin, Extends, Emits, Props, ExtractDefaultPropTypes<PropsOptions>, true>;
};
declare type DefaultData<V> = object | ((this: V) => object);
declare type DefaultMethods<V> = {
    [key: string]: (this: V, ...args: any[]) => any;
};
declare type DefaultComputed = {
    [key: string]: any;
};
declare type VueProxy<PropsOptions, RawBindings, Data = DefaultData<Vue$1>, Computed extends ComputedOptions = DefaultComputed, Methods extends MethodOptions = DefaultMethods<Vue$1>, Mixin = {}, Extends = {}, Emits extends EmitsOptions = {}> = ComponentOptions<Vue$1, ShallowUnwrapRef<RawBindings> & Data, Methods, Computed, PropsOptions, ExtractPropTypes<PropsOptions>> & VueConstructorProxy<PropsOptions, RawBindings, Data, Computed, Methods, Mixin, Extends, Emits>;
declare type ComponentPublicInstance<P = {}, // props type extracted from props option
B = {}, // raw bindings returned from setup()
D = {}, // return from data()
C extends ComputedOptions = {}, M extends MethodOptions = {}, E extends EmitsOptions = {}, PublicProps = P, Defaults = {}, MakeDefaultsOptional extends boolean = false> = {
    $: ComponentInternalInstance;
    $data: D;
    $props: MakeDefaultsOptional extends true ? Partial<Defaults> & Omit<P & PublicProps, keyof Defaults> : P & PublicProps;
    $attrs: Data;
    $refs: Data;
    $slots: Slots;
    $root: ComponentPublicInstance | null;
    $parent: ComponentPublicInstance | null;
    $emit: EmitFn<E>;
    $el: any;
    $forceUpdate: () => void;
    $nextTick: typeof nextTick;
    $watch(source: string | Function, cb: Function, options?: WatchOptions): WatchStopHandle;
} & P & ShallowUnwrapRef<B> & UnwrapNestedRefs<D> & ExtractComputedReturns<C> & M;

declare type ComputedGetter$1<T> = (ctx?: any) => T;
declare type ComputedSetter$1<T> = (v: T) => void;
interface WritableComputedOptions$1<T> {
    get: ComputedGetter$1<T>;
    set: ComputedSetter$1<T>;
}
declare type ComputedOptions = Record<string, ComputedGetter$1<any> | WritableComputedOptions$1<any>>;
interface MethodOptions {
    [key: string]: Function;
}
declare type SetupFunction<Props, RawBindings = {}, Emits extends EmitsOptions = {}> = (this: void, props: Readonly<Props>, ctx: SetupContext<Emits>) => RawBindings | (() => VNode | null) | void;
interface ComponentOptionsBase<Props, D = Data, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin = {}, Extends = {}, Emits extends EmitsOptions = {}> extends Omit<ComponentOptions<Vue$1, D, M, C, Props>, 'data' | 'computed' | 'method' | 'setup' | 'props'> {
    [key: string]: any;
    data?: (this: Props & Vue$1, vm: Props) => D;
    computed?: C;
    methods?: M;
}
declare type ExtractComputedReturns<T extends any> = {
    [key in keyof T]: T[key] extends {
        get: (...args: any[]) => infer TReturn;
    } ? TReturn : T[key] extends (...args: any[]) => infer TReturn ? TReturn : never;
};
declare type ComponentOptionsWithProps<PropsOptions = ComponentPropsOptions, RawBindings = Data, D = Data, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin = {}, Extends = {}, Emits extends EmitsOptions = {}, Props = ExtractPropTypes<PropsOptions>> = ComponentOptionsBase<Props, D, C, M> & {
    props?: PropsOptions;
    emits?: Emits & ThisType<void>;
    setup?: SetupFunction<Props, RawBindings, Emits>;
} & ThisType<ComponentRenderProxy<Props, RawBindings, D, C, M, Mixin, Extends, Emits>>;
declare type ComponentOptionsWithArrayProps<PropNames extends string = string, RawBindings = Data, D = Data, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin = {}, Extends = {}, Emits extends EmitsOptions = {}, Props = Readonly<{
    [key in PropNames]?: any;
}>> = ComponentOptionsBase<Props, D, C, M> & {
    props?: PropNames[];
    emits?: Emits & ThisType<void>;
    setup?: SetupFunction<Props, RawBindings, Emits>;
} & ThisType<ComponentRenderProxy<Props, RawBindings, D, C, M, Mixin, Extends, Emits>>;
declare type ComponentOptionsWithoutProps<Props = {}, RawBindings = Data, D = Data, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin = {}, Extends = {}, Emits extends EmitsOptions = {}> = ComponentOptionsBase<Props, D, C, M> & {
    props?: undefined;
    emits?: Emits & ThisType<void>;
    setup?: SetupFunction<Props, RawBindings, Emits>;
} & ThisType<ComponentRenderProxy<Props, RawBindings, D, C, M, Mixin, Extends, Emits>>;

declare type AnyObject = Record<string | number | symbol, any>;
declare type Equal<Left, Right> = (<U>() => U extends Left ? 1 : 0) extends (<U>() => U extends Right ? 1 : 0) ? true : false;
declare type HasDefined<T> = Equal<T, unknown> extends true ? false : true;

/**
 * overload 1: object format with no props
 */
declare function defineComponent<RawBindings, D = Data, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin = {}, Extends = {}, Emits extends EmitsOptions = {}>(options: ComponentOptionsWithoutProps<{}, RawBindings, D, C, M, Mixin, Extends, Emits>): VueProxy<{}, RawBindings, D, C, M, Mixin, Extends, Emits>;
/**
 * overload 2: object format with array props declaration
 * props inferred as `{ [key in PropNames]?: any }`
 *
 * return type is for Vetur and TSX support
 */
declare function defineComponent<PropNames extends string, RawBindings = Data, D = Data, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin = {}, Extends = {}, Emits extends EmitsOptions = {}, PropsOptions extends ComponentPropsOptions = ComponentPropsOptions>(options: ComponentOptionsWithArrayProps<PropNames, RawBindings, D, C, M, Mixin, Extends, Emits>): VueProxy<Readonly<{
    [key in PropNames]?: any;
}>, RawBindings, D, C, M, Mixin, Extends, Emits>;
/**
 * overload 3: object format with object props declaration
 *
 * see `ExtractPropTypes` in './componentProps.ts'
 */
declare function defineComponent<Props, RawBindings = Data, D = Data, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin = {}, Extends = {}, Emits extends EmitsOptions = {}, PropsOptions extends ComponentPropsOptions = ComponentPropsOptions>(options: HasDefined<Props> extends true ? ComponentOptionsWithProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, Emits, Props> : ComponentOptionsWithProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, Emits>): VueProxy<PropsOptions, RawBindings, D, C, M, Mixin, Extends, Emits>;

declare type Component = VueProxy<any, any, any, any, any>;
declare type ComponentOrComponentOptions = Component | ComponentOptionsWithoutProps | ComponentOptionsWithArrayProps | ComponentOptionsWithProps;
declare type AsyncComponentResolveResult<T = ComponentOrComponentOptions> = T | {
    default: T;
};
declare type AsyncComponentLoader = () => Promise<AsyncComponentResolveResult>;
interface AsyncComponentOptions {
    loader: AsyncComponentLoader;
    loadingComponent?: ComponentOrComponentOptions;
    errorComponent?: ComponentOrComponentOptions;
    delay?: number;
    timeout?: number;
    suspensible?: boolean;
    onError?: (error: Error, retry: () => void, fail: () => void, attempts: number) => any;
}
declare function defineAsyncComponent(source: AsyncComponentLoader | AsyncComponentOptions): AsyncComponent;

declare type DirectiveModifiers = Record<string, boolean>;
interface DirectiveBinding<V> extends Readonly<VNodeDirective> {
    readonly modifiers: DirectiveModifiers;
    readonly value: V;
    readonly oldValue: V | null;
}
declare type DirectiveHook<T = any, Prev = VNode | null, V = any> = (el: T, binding: DirectiveBinding<V>, vnode: VNode, prevVNode: Prev) => void;
interface ObjectDirective<T = any, V = any> {
    bind?: DirectiveHook<T, any, V>;
    inserted?: DirectiveHook<T, any, V>;
    update?: DirectiveHook<T, any, V>;
    componentUpdated?: DirectiveHook<T, any, V>;
    unbind?: DirectiveHook<T, any, V>;
}
declare type FunctionDirective<T = any, V = any> = DirectiveHook<T, any, V>;
declare type Directive<T = any, V = any> = ObjectDirective<T, V> | FunctionDirective<T, V>;

declare const Plugin: {
    install: (Vue: VueConstructor) => void;
};

declare const _refBrand: unique symbol;
interface Ref<T = any> {
    readonly [_refBrand]: true;
    value: T;
}
interface WritableComputedRef<T> extends Ref<T> {
    /**
     * `effect` is added to be able to differentiate refs from computed properties.
     * **Differently from Vue 3, it's just `true`**. This is because there is no equivalent
     * of `ReactiveEffect<T>` in `@vue/composition-api`.
     */
    effect: true;
}
interface ComputedRef<T = any> extends WritableComputedRef<T> {
    readonly value: T;
}
declare type ToRefs<T = any> = {
    [K in keyof T]: Ref<T[K]>;
};
declare type CollectionTypes = IterableCollections | WeakCollections;
declare type IterableCollections = Map<any, any> | Set<any>;
declare type WeakCollections = WeakMap<any, any> | WeakSet<any>;
declare type BaseTypes = string | number | boolean | Node | Window;
declare type ShallowUnwrapRef<T> = {
    [K in keyof T]: T[K] extends Ref<infer V> ? V : T[K];
};
declare type UnwrapRef<T> = T extends Ref<infer V> ? UnwrapRefSimple<V> : UnwrapRefSimple<T>;
declare type UnwrapRefSimple<T> = T extends Function | CollectionTypes | BaseTypes | Ref ? T : T extends Array<any> ? {
    [K in keyof T]: UnwrapRefSimple<T[K]>;
} : T extends object ? {
    [P in keyof T]: P extends symbol ? T[P] : UnwrapRef<T[P]>;
} : T;
interface RefOption<T> {
    get(): T;
    set?(x: T): void;
}
declare class RefImpl<T> implements Ref<T> {
    readonly [_refBrand]: true;
    value: T;
    constructor({ get, set }: RefOption<T>);
}
declare function createRef<T>(options: RefOption<T>, isReadonly?: boolean, isComputed?: boolean): RefImpl<T>;
declare function ref<T extends object>(raw: T): T extends Ref ? T : Ref<UnwrapRef<T>>;
declare function ref<T>(raw: T): Ref<UnwrapRef<T>>;
declare function ref<T = any>(): Ref<T | undefined>;
declare function isRef<T>(value: any): value is Ref<T>;
declare function unref<T>(ref: T | Ref<T>): T;
declare function toRefs<T extends object>(obj: T): ToRefs<T>;
declare type CustomRefFactory<T> = (track: () => void, trigger: () => void) => {
    get: () => T;
    set: (value: T) => void;
};
declare function customRef<T>(factory: CustomRefFactory<T>): Ref<T>;
declare function toRef<T extends object, K extends keyof T>(object: T, key: K): Ref<T[K]>;
declare function shallowRef<T extends object>(value: T): T extends Ref ? T : Ref<T>;
declare function shallowRef<T>(value: T): Ref<T>;
declare function shallowRef<T = any>(): Ref<T | undefined>;
declare function triggerRef(value: any): void;
declare function proxyRefs<T extends object>(objectWithRefs: T): ShallowUnwrapRef<T>;

declare function isRaw(obj: any): boolean;
declare function isReactive(obj: any): boolean;
declare function shallowReactive<T extends object = any>(obj: T): T;
/**
 * Make obj reactivity
 */
declare function reactive<T extends object>(obj: T): UnwrapRef<T>;
/**
 * Make sure obj can't be a reactive
 */
declare function markRaw<T extends object>(obj: T): T;
declare function toRaw<T>(observed: T): T;

declare function isReadonly(obj: any): boolean;
declare type Primitive = string | number | boolean | bigint | symbol | undefined | null;
declare type Builtin = Primitive | Function | Date | Error | RegExp;
declare type DeepReadonly<T> = T extends Builtin ? T : T extends Map<infer K, infer V> ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>> : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>> : T extends WeakMap<infer K, infer V> ? WeakMap<DeepReadonly<K>, DeepReadonly<V>> : T extends Set<infer U> ? ReadonlySet<DeepReadonly<U>> : T extends ReadonlySet<infer U> ? ReadonlySet<DeepReadonly<U>> : T extends WeakSet<infer U> ? WeakSet<DeepReadonly<U>> : T extends Promise<infer U> ? Promise<DeepReadonly<U>> : T extends {} ? {
    readonly [K in keyof T]: DeepReadonly<T[K]>;
} : Readonly<T>;
declare type UnwrapNestedRefs<T> = T extends Ref ? T : UnwrapRefSimple<T>;
/**
 * **In @vue/composition-api, `reactive` only provides type-level readonly check**
 *
 * Creates a readonly copy of the original object. Note the returned copy is not
 * made reactive, but `readonly` can be called on an already reactive object.
 */
declare function readonly<T extends object>(target: T): DeepReadonly<UnwrapNestedRefs<T>>;
declare function shallowReadonly<T extends object>(obj: T): Readonly<T>;

/**
 * Set a property on an object. Adds the new property, triggers change
 * notification and intercept it's subsequent access if the property doesn't
 * already exist.
 */
declare function set<T>(target: AnyObject, key: any, val: T): T;

/**
 * Delete a property and trigger change if necessary.
 */
declare function del(target: AnyObject, key: any): void;

declare function createLifeCycle(lifeCyclehook: string): (callback: Function, target?: ComponentInternalInstance | null | undefined) => Function | null;
declare const onBeforeMount: (callback: Function, target?: ComponentInternalInstance | null | undefined) => Function | null;
declare const onMounted: (callback: Function, target?: ComponentInternalInstance | null | undefined) => Function | null;
declare const onBeforeUpdate: (callback: Function, target?: ComponentInternalInstance | null | undefined) => Function | null;
declare const onUpdated: (callback: Function, target?: ComponentInternalInstance | null | undefined) => Function | null;
declare const onBeforeUnmount: (callback: Function, target?: ComponentInternalInstance | null | undefined) => Function | null;
declare const onUnmounted: (callback: Function, target?: ComponentInternalInstance | null | undefined) => Function | null;
declare const onErrorCaptured: (callback: Function, target?: ComponentInternalInstance | null | undefined) => Function | null;
declare const onActivated: (callback: Function, target?: ComponentInternalInstance | null | undefined) => Function | null;
declare const onDeactivated: (callback: Function, target?: ComponentInternalInstance | null | undefined) => Function | null;
declare const onServerPrefetch: (callback: Function, target?: ComponentInternalInstance | null | undefined) => Function | null;

declare type WatchEffect = (onInvalidate: InvalidateCbRegistrator) => void;
declare type WatchSource<T = any> = Ref<T> | ComputedRef<T> | (() => T);
declare type WatchCallback<V = any, OV = any> = (value: V, oldValue: OV, onInvalidate: InvalidateCbRegistrator) => any;
declare type MapSources<T, Immediate> = {
    [K in keyof T]: T[K] extends WatchSource<infer V> ? Immediate extends true ? V | undefined : V : never;
};
declare type MultiWatchSources = (WatchSource<unknown> | object)[];
interface WatchOptionsBase {
    flush?: FlushMode;
}
declare type InvalidateCbRegistrator = (cb: () => void) => void;
declare type FlushMode = 'pre' | 'post' | 'sync';
interface WatchOptions<Immediate = boolean> extends WatchOptionsBase {
    immediate?: Immediate;
    deep?: boolean;
}
interface VueWatcher {
    lazy: boolean;
    get(): any;
    teardown(): void;
    run(): void;
    value: any;
}
declare type WatchStopHandle = () => void;
declare function watchEffect(effect: WatchEffect, options?: WatchOptionsBase): WatchStopHandle;
declare function watchPostEffect(effect: WatchEffect): WatchStopHandle;
declare function watchSyncEffect(effect: WatchEffect): WatchStopHandle;
declare function watch<T extends Readonly<MultiWatchSources>, Immediate extends Readonly<boolean> = false>(sources: [...T], cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>, options?: WatchOptions<Immediate>): WatchStopHandle;
declare function watch<T extends Readonly<MultiWatchSources>, Immediate extends Readonly<boolean> = false>(sources: T, cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>, options?: WatchOptions<Immediate>): WatchStopHandle;
declare function watch<T extends MultiWatchSources, Immediate extends Readonly<boolean> = false>(sources: [...T], cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>, options?: WatchOptions<Immediate>): WatchStopHandle;
declare function watch<T, Immediate extends Readonly<boolean> = false>(source: WatchSource<T>, cb: WatchCallback<T, Immediate extends true ? T | undefined : T>, options?: WatchOptions<Immediate>): WatchStopHandle;
declare function watch<T extends object, Immediate extends Readonly<boolean> = false>(source: T, cb: WatchCallback<T, Immediate extends true ? T | undefined : T>, options?: WatchOptions<Immediate>): WatchStopHandle;

declare type ComputedGetter<T> = (ctx?: any) => T;
declare type ComputedSetter<T> = (v: T) => void;
interface WritableComputedOptions<T> {
    get: ComputedGetter<T>;
    set: ComputedSetter<T>;
}
declare function computed<T>(getter: ComputedGetter<T>): ComputedRef<T>;
declare function computed<T>(options: WritableComputedOptions<T>): WritableComputedRef<T>;

interface InjectionKey<T> extends Symbol {
}
declare function provide<T>(key: InjectionKey<T> | string, value: T): void;
declare function inject<T>(key: InjectionKey<T> | string): T | undefined;
declare function inject<T>(key: InjectionKey<T> | string, defaultValue: T, treatDefaultAsFactory?: false): T;
declare function inject<T>(key: InjectionKey<T> | string, defaultValue: T | (() => T), treatDefaultAsFactory?: true): T;

declare const useCssModule: (name?: string) => Record<string, string>;
/**
 * @deprecated use `useCssModule` instead.
 */
declare const useCSSModule: (name?: string) => Record<string, string>;

interface App<T = any> {
    config: VueConstructor['config'];
    use: VueConstructor['use'];
    mixin: VueConstructor['mixin'];
    component: VueConstructor['component'];
    directive(name: string): Directive | undefined;
    directive(name: string, directive: Directive): this;
    provide<T>(key: InjectionKey<T> | symbol | string, value: T): this;
    mount: Vue$1['$mount'];
    unmount: Vue$1['$destroy'];
}
declare function createApp(rootComponent: any, rootProps?: any): App;

declare type NextTick = Vue$1['$nextTick'];
declare const nextTick: NextTick;

interface H extends CreateElement {
    (this: ComponentInternalInstance | null | undefined, tag?: string | Component$1<any, any, any, any> | AsyncComponent$1<any, any, any, any> | (() => Component$1), children?: VNodeChildren): VNode$1;
    (this: ComponentInternalInstance | null | undefined, tag?: string | Component$1<any, any, any, any> | AsyncComponent$1<any, any, any, any> | (() => Component$1), data?: VNodeData, children?: VNodeChildren): VNode$1;
}
declare const createElement: H;

/**
 * Displays a warning message (using console.error) with a stack trace if the
 * function is called inside of active component.
 *
 * @param message warning message to be displayed
 */
declare function warn(message: string): void;

declare class EffectScopeImpl {
    active: boolean;
    effects: EffectScope[];
    cleanups: (() => void)[];
    constructor(vm: Vue);
    run<T>(fn: () => T): T | undefined;
    on(): void;
    off(): void;
    stop(): void;
}
declare class EffectScope extends EffectScopeImpl {
    constructor(detached?: boolean);
}
declare function effectScope(detached?: boolean): EffectScope;
declare function getCurrentScope(): EffectScope | undefined;
declare function onScopeDispose(fn: () => void): void;

declare function useSlots(): SetupContext['slots'];
declare function useAttrs(): SetupContext['attrs'];

declare const version: string;

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue$1> {
        setup?: SetupFunction<Data, Data>;
    }
}

export { App, ComponentInstance, ComponentInternalInstance, ComponentPropsOptions, ComponentPublicInstance, ComponentRenderProxy, ComputedGetter, ComputedOptions, ComputedRef, ComputedSetter, Data, DeepReadonly, Directive, DirectiveBinding, DirectiveHook, DirectiveModifiers, EffectScope, ExtractDefaultPropTypes, ExtractPropTypes, FlushMode, FunctionDirective, InjectionKey, MethodOptions, ObjectDirective, PropOptions, PropType, Ref, SetupContext, SetupFunction, ShallowUnwrapRef, ToRefs, UnwrapNestedRefs, UnwrapRef, UnwrapRefSimple, VueWatcher, WatchCallback, WatchEffect, WatchOptions, WatchOptionsBase, WatchSource, WatchStopHandle, WritableComputedOptions, WritableComputedRef, computed, createApp, createLifeCycle, createRef, customRef, Plugin as default, defineAsyncComponent, defineComponent, del, effectScope, getCurrentInstance, getCurrentScope, createElement as h, inject, isRaw, isReactive, isReadonly, isRef, markRaw, nextTick, onActivated, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onErrorCaptured, onMounted, onScopeDispose, onServerPrefetch, onUnmounted, onUpdated, provide, proxyRefs, reactive, readonly, ref, set, shallowReactive, shallowReadonly, shallowRef, toRaw, toRef, toRefs, triggerRef, unref, useAttrs, useCSSModule, useCssModule, useSlots, version, warn, watch, watchEffect, watchPostEffect, watchSyncEffect };
