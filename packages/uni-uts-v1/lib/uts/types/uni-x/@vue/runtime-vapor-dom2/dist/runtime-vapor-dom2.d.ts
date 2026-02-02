/// <reference path="./UniVideoElement.d.ts" />
/// <reference path="./UniTextLayout.d.ts" />
/// <reference path="./UniPage.d.ts" />
/// <reference path="./IUniElement.d.ts" />
/// <reference path="./DrawableContext.d.ts" />
import { IfAny, IsKeyValues, LooseRequired, NormalizedStyle, OverloadParameters, Prettify, SlotFlags, UnionToIntersection, camelize, capitalize, hyphenate, toDisplayString, toHandlerKey } from "@vue/shared";
import { normalizeClass, normalizeProps, normalizeStyle } from "@dcloudio/uni-shared";

//#region packages/reactivity/src/constants.d.ts
export declare enum TrackOpTypes {
  GET = "get",
  HAS = "has",
  ITERATE = "iterate"
}
export declare enum TriggerOpTypes {
  SET = "set",
  ADD = "add",
  DELETE = "delete",
  CLEAR = "clear"
}
export declare enum ReactiveFlags {
  SKIP = "__v_skip",
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
  IS_SHALLOW = "__v_isShallow",
  RAW = "__v_raw",
  IS_REF = "__v_isRef",
  NAPIWRAPPER = "_napiwrapper"
}
//#endregion
//#region packages/reactivity/src/effectScope.d.ts
export declare class EffectScope implements ReactiveNode {
  deps: Link | undefined;
  depsTail: Link | undefined;
  subs: Link | undefined;
  subsTail: Link | undefined;
  flags: number;
  /**
  * @internal
  */
  cleanups: (() => void)[];
  /**
  * @internal
  */
  cleanupsLength: number;
  constructor(detached?: boolean);
  get active(): boolean;
  pause(): void;
  /**
  * Resumes the effect scope, including all child scopes and effects.
  */
  resume(): void;
  run<T>(fn: () => T): T | undefined;
  stop(): void;
  /**
  * @internal
  */
  reset(): void;
}
/**
* Creates an effect scope object which can capture the reactive effects (i.e.
* computed and watchers) created within it so that these effects can be
* disposed together. For detailed use cases of this API, please consult its
* corresponding {@link https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md | RFC}.
*
* @param detached - Can be used to create a "detached" effect scope.
* @see {@link https://vuejs.org/api/reactivity-advanced.html#effectscope}
*/
export declare function effectScope(detached?: boolean): EffectScope;
/**
* Returns the current active effect scope if there is one.
*
* @see {@link https://vuejs.org/api/reactivity-advanced.html#getcurrentscope}
*/
export declare function getCurrentScope(): EffectScope | undefined;
/**
* Registers a dispose callback on the current active effect scope. The
* callback will be invoked when the associated effect scope is stopped.
*
* @param fn - The callback function to attach to the scope's cleanup.
* @see {@link https://vuejs.org/api/reactivity-advanced.html#onscopedispose}
*/
export declare function onScopeDispose(fn: () => void, failSilently?: boolean): void;
//#endregion
//#region packages/reactivity/src/system.d.ts
interface ReactiveNode {
  deps?: Link;
  depsTail?: Link;
  subs?: Link;
  subsTail?: Link;
  flags: ReactiveFlags$1;
}
interface Link {
  version: number;
  dep: ReactiveNode | ComputedRefImpl | ReactiveEffect | EffectScope;
  sub: ReactiveNode | ComputedRefImpl | ReactiveEffect | EffectScope;
  prevSub: Link | undefined;
  nextSub: Link | undefined;
  prevDep: Link | undefined;
  nextDep: Link | undefined;
}
declare const enum ReactiveFlags$1 {
  None = 0,
  Mutable = 1,
  Watching = 2,
  RecursedCheck = 4,
  Recursed = 8,
  Dirty = 16,
  Pending = 32
}
//#endregion
//#region packages/reactivity/src/effect.d.ts
export type EffectScheduler = (...args: any[]) => any;
export type DebuggerEvent = {
  effect: ReactiveNode;
} & DebuggerEventExtraInfo;
export type DebuggerEventExtraInfo = {
  target: object;
  type: TrackOpTypes | TriggerOpTypes;
  key: any;
  newValue?: any;
  oldValue?: any;
  oldTarget?: Map<any, any> | Set<any>;
};
export interface DebuggerOptions {
  onTrack?: (event: DebuggerEvent) => void;
  onTrigger?: (event: DebuggerEvent) => void;
}
export interface ReactiveEffectOptions extends DebuggerOptions {
  scheduler?: EffectScheduler;
  onStop?: () => void;
}
export interface ReactiveEffectRunner<T = any> {
  (): T;
  effect: ReactiveEffect;
}
export declare class ReactiveEffect<T = any> implements ReactiveEffectOptions, ReactiveNode {
  deps: Link | undefined;
  depsTail: Link | undefined;
  subs: Link | undefined;
  subsTail: Link | undefined;
  flags: number;
  /**
  * @internal
  */
  cleanups: (() => void)[];
  /**
  * @internal
  */
  cleanupsLength: number;
  onTrack?: (event: DebuggerEvent) => void;
  onTrigger?: (event: DebuggerEvent) => void;
  fn(): T;
  constructor(fn?: () => T);
  get active(): boolean;
  pause(): void;
  resume(): void;
  notify(): void;
  run(): T;
  stop(): void;
  get dirty(): boolean;
}
export declare function effect<T = any>(fn: () => T, options?: ReactiveEffectOptions): ReactiveEffectRunner<T>;
/**
* Stops the effect associated with the given runner.
*
* @param runner - Association with the effect to stop tracking.
*/
export declare function stop(runner: ReactiveEffectRunner): void;
//#endregion
//#region packages/reactivity/src/computed.d.ts
declare const ComputedRefSymbol: unique symbol;
declare const WritableComputedRefSymbol: unique symbol;
interface BaseComputedRef<T, S = T> extends Ref<T> {
  [ComputedRefSymbol]: true;
  /**
  * @deprecated computed no longer uses effect
  */
  effect: ComputedRefImpl;
}
export interface ComputedRef<T = any> extends BaseComputedRef<T> {
  readonly value: T;
}
export interface WritableComputedRef<T, S = T> extends BaseComputedRef<T, S> {
  [WritableComputedRefSymbol]: true;
}
export type ComputedGetter<T> = (oldValue?: T) => T;
export type ComputedSetter<T> = (newValue: T) => void;
export interface WritableComputedOptions<T, S = T> {
  get: ComputedGetter<T>;
  set: ComputedSetter<S>;
}
/**
* @private exported by @vue/reactivity for Vue core use, but not exported from
* the main vue package
*/
declare class ComputedRefImpl<T = any> implements ReactiveNode {
  fn: ComputedGetter<T>;
  private readonly setter;
  /**
  * @internal
  */
  _value: T | undefined;
  subs: Link | undefined;
  subsTail: Link | undefined;
  deps: Link | undefined;
  depsTail: Link | undefined;
  flags: ReactiveFlags$1;
  /**
  * @internal
  */
  readonly __v_isRef: true;
  /**
  * @internal
  */
  readonly __v_isReadonly: boolean;
  get effect(): this;
  get dep(): ReactiveNode;
  /**
  * @internal
  * for backwards compat
  */
  get _dirty(): boolean;
  /**
  * @internal
  * for backwards compat
  */
  set _dirty(v: boolean);
  onTrack?: (event: DebuggerEvent) => void;
  onTrigger?: (event: DebuggerEvent) => void;
  constructor(fn: ComputedGetter<T>, setter: ComputedSetter<T> | undefined);
  get value(): T;
  set value(newValue: T);
  update(): boolean;
}
/**
* Takes a getter function and returns a readonly reactive ref object for the
* returned value from the getter. It can also take an object with get and set
* functions to create a writable ref object.
*
* @example
* ```js
* // Creating a readonly computed ref:
* const count = ref(1)
* const plusOne = computed(() => count.value + 1)
*
* console.log(plusOne.value) // 2
* plusOne.value++ // error
* ```
*
* ```js
* // Creating a writable computed ref:
* const count = ref(1)
* const plusOne = computed({
*   get: () => count.value + 1,
*   set: (val) => {
*     count.value = val - 1
*   }
* })
*
* plusOne.value = 1
* console.log(count.value) // 0
* ```
*
* @param getter - Function that produces the next value.
* @param debugOptions - For debugging. See {@link https://vuejs.org/guide/extras/reactivity-in-depth.html#computed-debugging}.
* @see {@link https://vuejs.org/api/reactivity-core.html#computed}
*/
declare function computed$1<T>(getter: ComputedGetter<T>, debugOptions?: DebuggerOptions): ComputedRef<T>;
declare function computed$1<T, S = T>(options: WritableComputedOptions<T, S>, debugOptions?: DebuggerOptions): WritableComputedRef<T, S>;
//#endregion
//#region packages/reactivity/src/reactive.d.ts
export type UnwrapNestedRefs<T> = T extends Ref ? T : UnwrapRefSimple<T>;
declare const ReactiveMarkerSymbol: unique symbol;
interface ReactiveMarker {
  [ReactiveMarkerSymbol]?: void;
}
export type Reactive<T> = UnwrapNestedRefs<T> & (T extends readonly any[] ? ReactiveMarker : {});
/**
* Returns a reactive proxy of the object.
*
* The reactive conversion is "deep": it affects all nested properties. A
* reactive object also deeply unwraps any properties that are refs while
* maintaining reactivity.
*
* @example
* ```js
* const obj = reactive({ count: 0 })
* ```
*
* @param target - The source object.
* @see {@link https://vuejs.org/api/reactivity-core.html#reactive}
*/
export declare function reactive<T extends object>(target: T): Reactive<T>;
declare const ShallowReactiveMarker: unique symbol;
export type ShallowReactive<T> = T & {
  [ShallowReactiveMarker]?: true;
};
/**
* Shallow version of {@link reactive}.
*
* Unlike {@link reactive}, there is no deep conversion: only root-level
* properties are reactive for a shallow reactive object. Property values are
* stored and exposed as-is - this also means properties with ref values will
* not be automatically unwrapped.
*
* @example
* ```js
* const state = shallowReactive({
*   foo: 1,
*   nested: {
*     bar: 2
*   }
* })
*
* // mutating state's own properties is reactive
* state.foo++
*
* // ...but does not convert nested objects
* isReactive(state.nested) // false
*
* // NOT reactive
* state.nested.bar++
* ```
*
* @param target - The source object.
* @see {@link https://vuejs.org/api/reactivity-advanced.html#shallowreactive}
*/
export declare function shallowReactive<T extends object>(target: T): ShallowReactive<T>;
type Primitive = string | number | boolean | bigint | symbol | undefined | null;
type Builtin = Primitive | Function | Date | Error | RegExp;
export type DeepReadonly<T> = T extends Builtin ? T : T extends Map<infer K, infer V> ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>> : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>> : T extends WeakMap<infer K, infer V> ? WeakMap<DeepReadonly<K>, DeepReadonly<V>> : T extends Set<infer U> ? ReadonlySet<DeepReadonly<U>> : T extends ReadonlySet<infer U> ? ReadonlySet<DeepReadonly<U>> : T extends WeakSet<infer U> ? WeakSet<DeepReadonly<U>> : T extends Promise<infer U> ? Promise<DeepReadonly<U>> : T extends Ref<infer U> ? Readonly<Ref<DeepReadonly<U>>> : T extends {} ? { readonly [K in keyof T]: DeepReadonly<T[K]> } : Readonly<T>;
/**
* Takes an object (reactive or plain) or a ref and returns a readonly proxy to
* the original.
*
* A readonly proxy is deep: any nested property accessed will be readonly as
* well. It also has the same ref-unwrapping behavior as {@link reactive},
* except the unwrapped values will also be made readonly.
*
* @example
* ```js
* const original = reactive({ count: 0 })
*
* const copy = readonly(original)
*
* watchEffect(() => {
*   // works for reactivity tracking
*   console.log(copy.count)
* })
*
* // mutating original will trigger watchers relying on the copy
* original.count++
*
* // mutating the copy will fail and result in a warning
* copy.count++ // warning!
* ```
*
* @param target - The source object.
* @see {@link https://vuejs.org/api/reactivity-core.html#readonly}
*/
export declare function readonly<T extends object>(target: T): DeepReadonly<UnwrapNestedRefs<T>>;
/**
* Shallow version of {@link readonly}.
*
* Unlike {@link readonly}, there is no deep conversion: only root-level
* properties are made readonly. Property values are stored and exposed as-is -
* this also means properties with ref values will not be automatically
* unwrapped.
*
* @example
* ```js
* const state = shallowReadonly({
*   foo: 1,
*   nested: {
*     bar: 2
*   }
* })
*
* // mutating state's own properties will fail
* state.foo++
*
* // ...but works on nested objects
* isReadonly(state.nested) // false
*
* // works
* state.nested.bar++
* ```
*
* @param target - The source object.
* @see {@link https://vuejs.org/api/reactivity-advanced.html#shallowreadonly}
*/
export declare function shallowReadonly<T extends object>(target: T): Readonly<T>;
/**
* Checks if an object is a proxy created by {@link reactive} or
* {@link shallowReactive} (or {@link ref} in some cases).
*
* @example
* ```js
* isReactive(reactive({}))            // => true
* isReactive(readonly(reactive({})))  // => true
* isReactive(ref({}).value)           // => true
* isReactive(readonly(ref({})).value) // => true
* isReactive(ref(true))               // => false
* isReactive(shallowRef({}).value)    // => false
* isReactive(shallowReactive({}))     // => true
* ```
*
* @param value - The value to check.
* @see {@link https://vuejs.org/api/reactivity-utilities.html#isreactive}
*/
export declare function isReactive(value: unknown): boolean;
/**
* Checks whether the passed value is a readonly object. The properties of a
* readonly object can change, but they can't be assigned directly via the
* passed object.
*
* The proxies created by {@link readonly} and {@link shallowReadonly} are
* both considered readonly, as is a computed ref without a set function.
*
* @param value - The value to check.
* @see {@link https://vuejs.org/api/reactivity-utilities.html#isreadonly}
*/
export declare function isReadonly(value: unknown): boolean;
export declare function isShallow(value: unknown): boolean;
/**
* Checks if an object is a proxy created by {@link reactive},
* {@link readonly}, {@link shallowReactive} or {@link shallowReadonly}.
*
* @param value - The value to check.
* @see {@link https://vuejs.org/api/reactivity-utilities.html#isproxy}
*/
export declare function isProxy(value: any): boolean;
/**
* Returns the raw, original object of a Vue-created proxy.
*
* `toRaw()` can return the original object from proxies created by
* {@link reactive}, {@link readonly}, {@link shallowReactive} or
* {@link shallowReadonly}.
*
* This is an escape hatch that can be used to temporarily read without
* incurring proxy access / tracking overhead or write without triggering
* changes. It is **not** recommended to hold a persistent reference to the
* original object. Use with caution.
*
* @example
* ```js
* const foo = {}
* const reactiveFoo = reactive(foo)
*
* console.log(toRaw(reactiveFoo) === foo) // true
* ```
*
* @param observed - The object for which the "raw" value is requested.
* @see {@link https://vuejs.org/api/reactivity-advanced.html#toraw}
*/
export declare function toRaw<T>(observed: T): T;
export type Raw<T> = T & {
  [RawSymbol]?: true;
};
/**
* Marks an object so that it will never be converted to a proxy. Returns the
* object itself.
*
* @example
* ```js
* const foo = markRaw({})
* console.log(isReactive(reactive(foo))) // false
*
* // also works when nested inside other reactive objects
* const bar = reactive({ foo })
* console.log(isReactive(bar.foo)) // false
* ```
*
* **Warning:** `markRaw()` together with the shallow APIs such as
* {@link shallowReactive} allow you to selectively opt-out of the default
* deep reactive/readonly conversion and embed raw, non-proxied objects in your
* state graph.
*
* @param value - The object to be marked as "raw".
* @see {@link https://vuejs.org/api/reactivity-advanced.html#markraw}
*/
export declare function markRaw<T extends object>(value: T): Raw<T>;
//#endregion
//#region packages/reactivity/src/ref.d.ts
declare const RefSymbol: unique symbol;
declare const RawSymbol: unique symbol;
export interface Ref<T = any, S = T> {
  get value(): T;
  set value(_: S);
  /**
  * Type differentiator only.
  * We need this to be in public d.ts but don't want it to show up in IDE
  * autocomplete, so we use a private Symbol instead.
  */
  [RefSymbol]: true;
}
/**
* Checks if a value is a ref object.
*
* @param r - The value to inspect.
* @see {@link https://vuejs.org/api/reactivity-utilities.html#isref}
*/
export declare function isRef<T>(r: Ref<T> | unknown): r is Ref<T>;
/**
* Takes an inner value and returns a reactive and mutable ref object, which
* has a single property `.value` that points to the inner value.
*
* @param value - The object to wrap in the ref.
* @see {@link https://vuejs.org/api/reactivity-core.html#ref}
*/
export declare function ref$1<T>(value: T): [T] extends [Ref] ? IfAny<T, Ref<T>, T> : Ref<UnwrapRef<T>, UnwrapRef<T> | T>;
export declare function ref$1<T = any>(): Ref<T | undefined>;
declare const ShallowRefMarker: unique symbol;
export type ShallowRef<T = any, S = T> = Ref<T, S> & {
  [ShallowRefMarker]?: true;
};
/**
* Shallow version of {@link ref}.
*
* @example
* ```js
* const state = shallowRef({ count: 1 })
*
* // does NOT trigger change
* state.value.count = 2
*
* // does trigger change
* state.value = { count: 2 }
* ```
*
* @param value - The "inner value" for the shallow ref.
* @see {@link https://vuejs.org/api/reactivity-advanced.html#shallowref}
*/
export declare function shallowRef<T>(value: T): Ref extends T ? T extends Ref ? IfAny<T, ShallowRef<T>, T> : ShallowRef<T> : ShallowRef<T>;
export declare function shallowRef<T = any>(): ShallowRef<T | undefined>;
/**
* Force trigger effects that depends on a shallow ref. This is typically used
* after making deep mutations to the inner value of a shallow ref.
*
* @example
* ```js
* const shallow = shallowRef({
*   greet: 'Hello, world'
* })
*
* // Logs "Hello, world" once for the first run-through
* watchEffect(() => {
*   console.log(shallow.value.greet)
* })
*
* // This won't trigger the effect because the ref is shallow
* shallow.value.greet = 'Hello, universe'
*
* // Logs "Hello, universe"
* triggerRef(shallow)
* ```
*
* @param ref - The ref whose tied effects shall be executed.
* @see {@link https://vuejs.org/api/reactivity-advanced.html#triggerref}
*/
export declare function triggerRef(ref: Ref): void;
export type MaybeRef<T = any> = T | Ref<T> | ShallowRef<T> | WritableComputedRef<T>;
export type MaybeRefOrGetter<T = any> = MaybeRef<T> | ComputedRef<T> | (() => T);
/**
* Returns the inner value if the argument is a ref, otherwise return the
* argument itself. This is a sugar function for
* `val = isRef(val) ? val.value : val`.
*
* @example
* ```js
* function useFoo(x: number | Ref<number>) {
*   const unwrapped = unref(x)
*   // unwrapped is guaranteed to be number now
* }
* ```
*
* @param ref - Ref or plain value to be converted into the plain value.
* @see {@link https://vuejs.org/api/reactivity-utilities.html#unref}
*/
export declare function unref<T>(ref: MaybeRef<T> | ComputedRef<T>): T;
/**
* Normalizes values / refs / getters to values.
* This is similar to {@link unref}, except that it also normalizes getters.
* If the argument is a getter, it will be invoked and its return value will
* be returned.
*
* @example
* ```js
* toValue(1) // 1
* toValue(ref(1)) // 1
* toValue(() => 1) // 1
* ```
*
* @param source - A getter, an existing ref, or a non-function value.
* @see {@link https://vuejs.org/api/reactivity-utilities.html#tovalue}
*/
export declare function toValue<T>(source: MaybeRefOrGetter<T>): T;
/**
* Returns a proxy for the given object that shallowly unwraps properties that
* are refs. If the object already is reactive, it's returned as-is. If not, a
* new reactive proxy is created.
*
* @param objectWithRefs - Either an already-reactive object or a simple object
* that contains refs.
*/
export declare function proxyRefs<T extends object>(objectWithRefs: T): ShallowUnwrapRef<T>;
export type CustomRefFactory<T> = (track: () => void, trigger: () => void) => {
  get: () => T;
  set: (value: T) => void;
};
/**
* Creates a customized ref with explicit control over its dependency tracking
* and updates triggering.
*
* @param factory - The function that receives the `track` and `trigger` callbacks.
* @see {@link https://vuejs.org/api/reactivity-advanced.html#customref}
*/
export declare function customRef<T>(factory: CustomRefFactory<T>): Ref<T>;
export type ToRefs<T = any> = { [K in keyof T]: ToRef<T[K]> };
/**
* Converts a reactive object to a plain object where each property of the
* resulting object is a ref pointing to the corresponding property of the
* original object. Each individual ref is created using {@link toRef}.
*
* @param object - Reactive object to be made into an object of linked refs.
* @see {@link https://vuejs.org/api/reactivity-utilities.html#torefs}
*/
export declare function toRefs<T extends object>(object: T): ToRefs<T>;
export type ToRef<T> = IfAny<T, Ref<T>, [T] extends [Ref] ? T : Ref<T>>;
/**
* Used to normalize values / refs / getters into refs.
*
* @example
* ```js
* // returns existing refs as-is
* toRef(existingRef)
*
* // creates a ref that calls the getter on .value access
* toRef(() => props.foo)
*
* // creates normal refs from non-function values
* // equivalent to ref(1)
* toRef(1)
* ```
*
* Can also be used to create a ref for a property on a source reactive object.
* The created ref is synced with its source property: mutating the source
* property will update the ref, and vice-versa.
*
* @example
* ```js
* const state = reactive({
*   foo: 1,
*   bar: 2
* })
*
* const fooRef = toRef(state, 'foo')
*
* // mutating the ref updates the original
* fooRef.value++
* console.log(state.foo) // 2
*
* // mutating the original also updates the ref
* state.foo++
* console.log(fooRef.value) // 3
* ```
*
* @param source - A getter, an existing ref, a non-function value, or a
*                 reactive object to create a property ref from.
* @param [key] - (optional) Name of the property in the reactive object.
* @see {@link https://vuejs.org/api/reactivity-utilities.html#toref}
*/
export declare function toRef<T>(value: T): T extends (() => infer R) ? Readonly<Ref<R>> : T extends Ref ? T : Ref<UnwrapRef<T>>;
export declare function toRef<T extends object, K extends keyof T>(object: T, key: K): ToRef<T[K]>;
export declare function toRef<T extends object, K extends keyof T>(object: T, key: K, defaultValue: T[K]): ToRef<Exclude<T[K], undefined>>;
export declare function toRef<T>(value: object, key: string): T extends (() => infer R) ? Readonly<Ref<R>> : T extends Ref ? T : Ref<UnwrapRef<T>>;
export declare function toRef<T>(value: () => T): Readonly<Ref<T>>;
/**
* This is a special exported interface for other packages to declare
* additional types that should bail out for ref unwrapping. For example
* \@vue/runtime-dom can declare it like so in its d.ts:
*
* ``` ts
* declare module '@vue/reactivity' {
*   export interface RefUnwrapBailTypes {
*     runtimeDOMBailTypes: Node | Window
*   }
* }
* ```
*/
interface RefUnwrapBailTypes {}
export type ShallowUnwrapRef<T> = { [K in keyof T]: DistributeRef<T[K]> };
type DistributeRef<T> = T extends Ref<infer V, unknown> ? V : T;
export type UnwrapRef<T> = T extends ShallowRef<infer V, unknown> ? V : T extends Ref<infer V, unknown> ? UnwrapRefSimple<V> : UnwrapRefSimple<T>;
type UnwrapRefSimple<T> = T extends Builtin | Ref | RefUnwrapBailTypes[keyof RefUnwrapBailTypes] | {
  [RawSymbol]?: true;
} ? T : T extends Map<infer K, infer V> ? Map<K, UnwrapRefSimple<V>> & UnwrapRef<Omit<T, keyof Map<any, any>>> : T extends WeakMap<infer K, infer V> ? WeakMap<K, UnwrapRefSimple<V>> & UnwrapRef<Omit<T, keyof WeakMap<any, any>>> : T extends Set<infer V> ? Set<UnwrapRefSimple<V>> & UnwrapRef<Omit<T, keyof Set<any>>> : T extends WeakSet<infer V> ? WeakSet<UnwrapRefSimple<V>> & UnwrapRef<Omit<T, keyof WeakSet<any>>> : T extends ReadonlyArray<any> ? { [K in keyof T]: UnwrapRefSimple<T[K]> } : T extends {
  [UTSObjectMarker]?: true;
} ? T : T extends object & {
  [ShallowReactiveMarker]?: never;
} ? { [P in keyof T]: P extends symbol ? T[P] : UnwrapRef<T[P]> } : T;
//#endregion
//#region packages/reactivity/src/watch.d.ts
declare enum WatchErrorCodes {
  WATCH_GETTER = 2,
  WATCH_CALLBACK = 3,
  WATCH_CLEANUP = 4
}
export type WatchEffect = (onCleanup: OnCleanup) => void;
export type WatchSource<T = any> = Ref<T> | ComputedRef<T> | (() => T);
export type WatchCallback<V = any, OV = any> = (value: V, oldValue: OV, onCleanup: OnCleanup) => any;
type OnCleanup = (cleanupFn: () => void) => void;
interface WatchOptions$1<Immediate = boolean> extends DebuggerOptions {
  immediate?: Immediate;
  deep?: boolean | number;
  once?: boolean;
  onWarn?: (msg: string, ...args: any[]) => void;
  /**
  * @internal
  */
  call?: (fn: Function | Function[], type: WatchErrorCodes, args?: unknown[]) => void;
}
export type WatchStopHandle = () => void;
export interface WatchHandle extends WatchStopHandle {
  pause: () => void;
  resume: () => void;
  stop: () => void;
}
/**
* Returns the current active effect if there is one.
*/
export declare function getCurrentWatcher(): ReactiveEffect<any> | undefined;
/**
* Registers a cleanup callback on the current active effect. This
* registered cleanup callback will be invoked right before the
* associated effect re-runs.
*
* @param cleanupFn - The callback function to attach to the effect's cleanup.
* @param failSilently - if `true`, will not throw warning when called without
* an active effect.
* @param owner - The effect that this cleanup function should be attached to.
* By default, the current active effect.
*/
export declare function onWatcherCleanup(cleanupFn: () => void, failSilently?: boolean, owner?: WatcherEffect | undefined): void;
declare class WatcherEffect extends ReactiveEffect {
  cb?: WatchCallback<any, any> | null | undefined;
  options: WatchOptions$1;
  forceTrigger: boolean;
  isMultiSource: boolean;
  oldValue: any;
  boundCleanup: typeof onWatcherCleanup;
  constructor(source: WatchSource | WatchSource[] | WatchEffect | object, cb?: WatchCallback<any, any> | null | undefined, options?: WatchOptions$1);
  run(initialRun?: boolean): void;
}
//#endregion
//#region packages/runtime-core/src/apiComputed.d.ts
export declare const computed: typeof computed$1;
//#endregion
//#region packages/runtime-core/src/componentSlots.d.ts
export type Slot<T extends any = any> = (...args: IfAny<T, any[], [T] | (T extends undefined ? [] : never)>) => VNode[];
type InternalSlots = {
  [name: string]: Slot | undefined;
};
export type Slots = Readonly<InternalSlots>;
declare const SlotSymbol: unique symbol;
export type SlotsType<T extends Record<string, any> = Record<string, any>> = {
  [SlotSymbol]?: T;
};
type StrictUnwrapSlotsType<S extends SlotsType, T = NonNullable<S[typeof SlotSymbol]>> = [keyof S] extends [never] ? Slots : Readonly<T> & T;
type UnwrapSlotsType<S extends SlotsType, T = NonNullable<S[typeof SlotSymbol]>> = [keyof S] extends [never] ? Slots : Readonly<Prettify<{ [K in keyof T]: NonNullable<T[K]> extends ((...args: any[]) => any) ? T[K] : Slot<T[K]> }>>;
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
  DISPOSED = 4
}
export interface SchedulerJob extends Function {
  order?: number;
  /**
  * flags can technically be undefined, but it can still be used in bitwise
  * operations just like 0.
  */
  flags?: SchedulerJobFlags;
  /**
  * Attached by renderer.ts when setting up a component's render effect
  * Used to obtain component information when reporting max recursive updates.
  */
  i?: GenericComponentInstance;
}
type SchedulerJobs = SchedulerJob | SchedulerJob[];
export declare function nextTick(): Promise<void>;
export declare function nextTick<T, R>(this: T, fn: (this: T) => R | Promise<R>): Promise<R>;
export declare function nextTick<T, R>(this: T, fn: (this: T) => R | Promise<R>, instance: GenericComponentInstance): Promise<R>;
export declare function queuePostFlushCb(jobs: SchedulerJobs, id?: number): void;
//#endregion
//#region packages/runtime-core/src/componentProps.d.ts
export type ComponentPropsOptions<P = Data> = ComponentObjectPropsOptions<P> | string[];
export type ComponentObjectPropsOptions<P = Data> = { [K in keyof P]: Prop<P[K]> | null };
export type Prop<T, D = T> = PropOptions<T, D> | PropType<T>;
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
export type PropType<T> = PropConstructor<T> | (PropConstructor<T> | null)[];
type PropConstructor<T = any> = {
  new (...args: any[]): T & {};
} | {
  (): T;
} | PropMethod<T>;
type PropMethod<T, TConstructor = any> = [T] extends [((...args: any) => any) | undefined] ? {
  new (): TConstructor;
  (): T;
  readonly prototype: TConstructor;
} : never;
type RequiredKeys<T> = { [K in keyof T]: T[K] extends {
  required: true;
} | {
  default: any;
} | BooleanConstructor | {
  type: BooleanConstructor;
} ? T[K] extends {
  default: undefined | (() => undefined);
} ? never : K : never }[keyof T];
type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;
type DefaultKeys<T> = { [K in keyof T]: T[K] extends {
  default: any;
} | BooleanConstructor | {
  type: BooleanConstructor;
} ? T[K] extends {
  type: BooleanConstructor;
  required: true;
} ? never : K : never }[keyof T];
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
}] ? U extends DateConstructor ? Date | InferPropType<U, false> : InferPropType<U, false> : [T] extends [Prop<infer V, infer D>] ? unknown extends V ? keyof V extends never ? IfAny<V, V, D> : V : V : T;
/**
* Extract prop types from a runtime props options object.
* The extracted types are **internal** - i.e. the resolved props received by
* the component.
* - Boolean props are always present
* - Props with default values are always present
*
* To extract accepted props from the parent, use {@link ExtractPublicPropTypes}.
*/
export type ExtractPropTypes<O> = { [K in keyof Pick<O, RequiredKeys<O>>]: O[K] extends {
  default: any;
} ? Exclude<InferPropType<O[K]>, undefined> : InferPropType<O[K]> } & { [K in keyof Pick<O, OptionalKeys<O>>]?: InferPropType<O[K]> };
type PublicRequiredKeys<T> = { [K in keyof T]: T[K] extends {
  required: true;
} ? K : never }[keyof T];
type PublicOptionalKeys<T> = Exclude<keyof T, PublicRequiredKeys<T>>;
/**
* Extract prop types from a runtime props options object.
* The extracted types are **public** - i.e. the expected props that can be
* passed to component.
*/
export type ExtractPublicPropTypes<O> = { [K in keyof Pick<O, PublicRequiredKeys<O>>]: InferPropType<O[K]> } & { [K in keyof Pick<O, PublicOptionalKeys<O>>]?: InferPropType<O[K]> };
declare enum BooleanFlags {
  shouldCast = 0,
  shouldCastTrue = 1,
  externalClasses = 2
}
export type ExtractDefaultPropTypes<O> = O extends object ? { [K in keyof Pick<O, DefaultKeys<O>>]: InferPropType<O[K]> } : {};
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
type NormalizedPropsOptions = [NormalizedProps, string[]] | [];
//#endregion
//#region packages/runtime-core/src/apiSetupHelpers.d.ts
/**
* Vue `<script setup>` compiler macro for declaring component props. The
* expected argument is the same as the component `props` option.
*
* Example runtime declaration:
* ```js
* // using Array syntax
* const props = defineProps(['foo', 'bar'])
* // using Object syntax
* const props = defineProps({
*   foo: String,
*   bar: {
*     type: Number,
*     required: true
*   }
* })
* ```
*
* Equivalent type-based declaration:
* ```ts
* // will be compiled into equivalent runtime declarations
* const props = defineProps<{
*   foo?: string
*   bar: number
* }>()
* ```
*
* @see {@link https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits}
*
* This is only usable inside `<script setup>`, is compiled away in the
* output and should **not** be actually called at runtime.
*/
export declare function defineProps<PropNames extends string = string>(props: PropNames[]): Prettify<Readonly<{ [key in PropNames]?: any }>>;
export declare function defineProps<PP extends ComponentObjectPropsOptions = ComponentObjectPropsOptions>(props: PP): Prettify<Readonly<ExtractPropTypes<PP>>>;
export declare function defineProps<TypeProps>(): DefineProps<LooseRequired<TypeProps>, BooleanKey<TypeProps>>;
export type DefineProps<T, BKeys extends keyof T> = Readonly<T> & { readonly [K in BKeys]-?: boolean };
type BooleanKey<T, K extends keyof T = keyof T> = K extends any ? T[K] extends boolean | undefined ? T[K] extends never | undefined ? never : K : never : never;
/**
* Vue `<script setup>` compiler macro for declaring a component's emitted
* events. The expected argument is the same as the component `emits` option.
*
* Example runtime declaration:
* ```js
* const emit = defineEmits(['change', 'update'])
* ```
*
* Example type-based declaration:
* ```ts
* const emit = defineEmits<{
*   // <eventName>: <expected arguments>
*   change: []
*   update: [value: number] // named tuple syntax
* }>()
*
* emit('change')
* emit('update', 1)
* ```
*
* This is only usable inside `<script setup>`, is compiled away in the
* output and should **not** be actually called at runtime.
*
* @see {@link https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits}
*/
export declare function defineEmits<EE extends string = string>(emitOptions: EE[]): EmitFn<EE[]>;
export declare function defineEmits<E extends EmitsOptions = EmitsOptions>(emitOptions: E): EmitFn<E>;
export declare function defineEmits<T extends ComponentTypeEmits>(): T extends ((...args: any[]) => any) ? T : ShortEmits<T>;
export type ComponentTypeEmits = ((...args: any[]) => any) | Record<string, any>;
type RecordToUnion<T extends Record<string, any>> = T[keyof T];
type ShortEmits<T extends Record<string, any>> = UnionToIntersection<RecordToUnion<{ [K in keyof T]: (evt: K, ...args: T[K]) => void }>>;
/**
* Vue `<script setup>` compiler macro for declaring a component's exposed
* instance properties when it is accessed by a parent component via template
* refs.
*
* `<script setup>` components are closed by default - i.e. variables inside
* the `<script setup>` scope is not exposed to parent unless explicitly exposed
* via `defineExpose`.
*
* This is only usable inside `<script setup>`, is compiled away in the
* output and should **not** be actually called at runtime.
*
* @see {@link https://vuejs.org/api/sfc-script-setup.html#defineexpose}
*/
export declare function defineExpose<Exposed extends Record<string, any> = Record<string, any>>(exposed?: Exposed): void;
/**
* Vue `<script setup>` compiler macro for declaring a component's additional
* options. This should be used only for options that cannot be expressed via
* Composition API - e.g. `inheritAttrs`.
*
* @see {@link https://vuejs.org/api/sfc-script-setup.html#defineoptions}
*/
export declare function defineOptions<RawBindings = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin>(options?: ComponentOptionsBase<{}, RawBindings, D, C, M, Mixin, Extends, {}> & {
  /**
  * props should be defined via defineProps().
  */
  props?: never;
  /**
  * emits should be defined via defineEmits().
  */
  emits?: never;
  /**
  * expose should be defined via defineExpose().
  */
  expose?: never;
  /**
  * slots should be defined via defineSlots().
  */
  slots?: never;
}): void;
export declare function defineSlots<S extends Record<string, any> = Record<string, any>>(): StrictUnwrapSlotsType<SlotsType<S>>;
export type ModelRef<T, M extends PropertyKey = string, G = T, S = T> = Ref<G> & [ModelRef<T, M, G, S>, Record<M, true | undefined>];
type DefineModelOptions<T = any, G = T, S = T> = {
  get?: (v: T) => G;
  set?: (v: S) => any;
};
/**
* Vue `<script setup>` compiler macro for declaring a
* two-way binding prop that can be consumed via `v-model` from the parent
* component. This will declare a prop with the same name and a corresponding
* `update:propName` event.
*
* If the first argument is a string, it will be used as the prop name;
* Otherwise the prop name will default to "modelValue". In both cases, you
* can also pass an additional object which will be used as the prop's options.
*
* The returned ref behaves differently depending on whether the parent
* provided the corresponding v-model props or not:
* - If yes, the returned ref's value will always be in sync with the parent
*   prop.
* - If not, the returned ref will behave like a normal local ref.
*
* @example
* ```ts
* // default model (consumed via `v-model`)
* const modelValue = defineModel<string>()
* modelValue.value = "hello"
*
* // default model with options
* const modelValue = defineModel<string>({ required: true })
*
* // with specified name (consumed via `v-model:count`)
* const count = defineModel<number>('count')
* count.value++
*
* // with specified name and default value
* const count = defineModel<number>('count', { default: 0 })
* ```
*/
export declare function defineModel<T, M extends PropertyKey = string, G = T, S = T>(options: ({
  default: any;
} | {
  required: true;
}) & PropOptions<T> & DefineModelOptions<T, G, S>): ModelRef<T, M, G, S>;
export declare function defineModel<T, M extends PropertyKey = string, G = T, S = T>(options?: PropOptions<T> & DefineModelOptions<T, G, S>): ModelRef<T | undefined, M, G | undefined, S | undefined>;
export declare function defineModel<T, M extends PropertyKey = string, G = T, S = T>(name: string, options: ({
  default: any;
} | {
  required: true;
}) & PropOptions<T> & DefineModelOptions<T, G, S>): ModelRef<T, M, G, S>;
export declare function defineModel<T, M extends PropertyKey = string, G = T, S = T>(name: string, options?: PropOptions<T> & DefineModelOptions<T, G, S>): ModelRef<T | undefined, M, G | undefined, S | undefined>;
type NotUndefined<T> = T extends undefined ? never : T;
type MappedOmit<T, K extends keyof any> = { [P in keyof T as P extends K ? never : P]: T[P] };
type InferDefaults<T> = { [K in keyof T]?: InferDefault<T, T[K]> };
type NativeType = null | undefined | number | string | boolean | symbol | Function;
type InferDefault<P, T> = ((props: P) => T & {}) | (T extends NativeType ? T : never);
type PropsWithDefaults<T, Defaults extends InferDefaults<T>, BKeys extends keyof T> = T extends unknown ? Readonly<MappedOmit<T, keyof Defaults>> & { readonly [K in keyof Defaults as K extends keyof T ? K : never]-?: K extends keyof T ? Defaults[K] extends undefined ? IfAny<Defaults[K], NotUndefined<T[K]>, T[K]> : NotUndefined<T[K]> : never } & { readonly [K in BKeys]-?: K extends keyof Defaults ? Defaults[K] extends undefined ? boolean | undefined : boolean : boolean } : never;
/**
* Vue `<script setup>` compiler macro for providing props default values when
* using type-based `defineProps` declaration.
*
* Example usage:
* ```ts
* withDefaults(defineProps<{
*   size?: number
*   labels?: string[]
* }>(), {
*   size: 3,
*   labels: () => ['default label']
* })
* ```
*
* This is only usable inside `<script setup>`, is compiled away in the output
* and should **not** be actually called at runtime.
*
* @see {@link https://vuejs.org/guide/typescript/composition-api.html#typing-component-props}
*/
export declare function withDefaults<T, BKeys extends keyof T, Defaults extends InferDefaults<T>>(props: DefineProps<T, BKeys>, defaults: Defaults): PropsWithDefaults<T, Defaults, BKeys>;
export declare function useSlots(): SetupContext["slots"];
export declare function useAttrs(): SetupContext["attrs"];
/**
* Runtime helper for merging default declarations. Imported by compiled code
* only.
* @internal
*/
export declare function mergeDefaults(raw: ComponentPropsOptions, defaults: Record<string, any>): ComponentObjectPropsOptions;
/**
* Runtime helper for merging model declarations.
* Imported by compiled code only.
* @internal
*/
export declare function mergeModels(a: ComponentPropsOptions | EmitsOptions, b: ComponentPropsOptions | EmitsOptions): ComponentPropsOptions | EmitsOptions;
/**
* Used to create a proxy for the rest element when destructuring props with
* defineProps().
* @internal
*/
export declare function createPropsRestProxy(props: any, excludedKeys: string[]): Record<string, any>;
/**
* `<script setup>` helper for persisting the current instance context over
* async/await flows.
*
* `@vue/compiler-sfc` converts the following:
*
* ```ts
* const x = await foo()
* ```
*
* into:
*
* ```ts
* let __temp, __restore
* const x = (([__temp, __restore] = withAsyncContext(() => foo())),__temp=await __temp,__restore(),__temp)
* ```
* @internal
*/
export declare function withAsyncContext(getAwaitable: () => any): [any, () => void];
//#endregion
//#region packages/runtime-core/src/componentEmits.d.ts
export type ObjectEmitsOptions = Record<string, ((...args: any[]) => any) | null>;
export type EmitsOptions = ObjectEmitsOptions | string[];
export type EmitsToProps<T extends EmitsOptions | ComponentTypeEmits> = T extends string[] ? { [K in `on${Capitalize<T[number]>}`]?: (...args: any[]) => any } : T extends ObjectEmitsOptions ? { [K in string & keyof T as `on${Capitalize<K>}`]?: (...args: T[K] extends ((...args: infer P) => any) ? P : T[K] extends null ? any[] : never) => any } : {};
type TypeEmitsToOptions<T extends ComponentTypeEmits> = { [K in keyof T & string]: T[K] extends [...args: infer Args] ? (...args: Args) => any : () => any } & (T extends ((...args: any[]) => any) ? ParametersToFns<OverloadParameters<T>> : {});
type ParametersToFns<T extends any[]> = { [K in T[0]]: IsStringLiteral<K> extends true ? (...args: T extends [e: infer E, ...args: infer P] ? K extends E ? P : never : never) => any : never };
type IsStringLiteral<T> = T extends string ? string extends T ? false : true : false;
export type ShortEmitsToObject<E> = E extends Record<string, any[]> ? { [K in keyof E]: (...args: E[K]) => any } : E;
export type EmitFn<Options = ObjectEmitsOptions, Event extends keyof Options = keyof Options> = Options extends Array<infer V> ? (event: V, ...args: any[]) => void : {} extends Options ? (event: string, ...args: any[]) => void : UnionToIntersection<{ [key in Event]: Options[key] extends ((...args: infer Args) => any) ? (event: key, ...args: Args) => void : Options[key] extends any[] ? (event: key, ...args: Options[key]) => void : (event: key, ...args: any[]) => void }[Event]>;
//#endregion
//#region packages/runtime-core/src/directives.d.ts
export interface DirectiveBinding<Value = any, Modifiers extends string = string, Arg = any> {
  instance: ComponentPublicInstance$1 | Record<string, any> | null;
  value: Value;
  oldValue: Value | null;
  arg?: Arg;
  modifiers: DirectiveModifiers<Modifiers>;
  dir: ObjectDirective$1<any, Value, Modifiers, Arg>;
}
export type DirectiveHook<HostElement = any, Prev = VNode<any, HostElement> | null, Value = any, Modifiers extends string = string, Arg = any> = (el: HostElement, binding: DirectiveBinding<Value, Modifiers, Arg>, vnode: VNode<any, HostElement>, prevVNode: Prev) => void;
type SSRDirectiveHook<Value = any, Modifiers extends string = string, Arg = any> = (binding: DirectiveBinding<Value, Modifiers, Arg>, vnode: VNode) => Data | undefined;
export interface ObjectDirective$1<HostElement = any, Value = any, Modifiers extends string = string, Arg = any> {
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
export type FunctionDirective<HostElement = any, V = any, Modifiers extends string = string, Arg = any> = DirectiveHook<HostElement, any, V, Modifiers, Arg>;
export type Directive<HostElement = any, Value = any, Modifiers extends string = string, Arg = any> = ObjectDirective$1<HostElement, Value, Modifiers, Arg> | FunctionDirective<HostElement, Value, Modifiers, Arg>;
export type DirectiveModifiers<K extends string = string> = Partial<Record<K, boolean>>;
export type DirectiveArguments = Array<[Directive | undefined] | [Directive | undefined, any] | [Directive | undefined, any, any] | [Directive | undefined, any, any, DirectiveModifiers]>;
/**
* Adds directives to a VNode.
*/
export declare function withDirectives<T extends VNode>(vnode: T, directives: DirectiveArguments): T;
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
export interface ComponentCustomProperties {}
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
* @deprecated This is no longer used internally, but exported and relied on by
* existing library types generated by vue-tsc.
*/
export type CreateComponentPublicInstance<P = {}, B = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, PublicProps = P, Defaults = {}, MakeDefaultsOptional extends boolean = false, I extends ComponentInjectOptions = {}, S extends SlotsType = {}, PublicMixin = IntersectionMixin<Mixin> & IntersectionMixin<Extends>, PublicP = UnwrapMixinsType<PublicMixin, "P"> & EnsureNonVoid<P>, PublicB = UnwrapMixinsType<PublicMixin, "B"> & EnsureNonVoid<B>, PublicD = UnwrapMixinsType<PublicMixin, "D"> & EnsureNonVoid<D>, PublicC extends ComputedOptions = UnwrapMixinsType<PublicMixin, "C"> & EnsureNonVoid<C>, PublicM extends MethodOptions = UnwrapMixinsType<PublicMixin, "M"> & EnsureNonVoid<M>, PublicDefaults = UnwrapMixinsType<PublicMixin, "Defaults"> & EnsureNonVoid<Defaults>> = ComponentPublicInstance$1<PublicP, PublicB, PublicD, PublicC, PublicM, E, PublicProps, PublicDefaults, MakeDefaultsOptional, ComponentOptionsBase<P, B, D, C, M, Mixin, Extends, E, string, Defaults, {}, string, S>, I, S>;
/**
* This is the same as `CreateComponentPublicInstance` but adds local components,
* global directives, exposed, and provide inference.
* It changes the arguments order so that we don't need to repeat mixin
* inference everywhere internally, but it has to be a new type to avoid
* breaking types that relies on previous arguments order (#10842)
*/
export type CreateComponentPublicInstanceWithMixins<P = {}, B = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, PublicProps = P, Defaults = {}, MakeDefaultsOptional extends boolean = false, I extends ComponentInjectOptions = {}, S extends SlotsType = {}, LC extends Record<string, Component> = {}, Directives extends Record<string, Directive> = {}, Exposed extends string = string, TypeRefs extends Data = {}, TypeEl extends Element = any, Provide extends ComponentProvideOptions = ComponentProvideOptions, PublicMixin = IntersectionMixin<Mixin> & IntersectionMixin<Extends>, PublicP = UnwrapMixinsType<PublicMixin, "P"> & EnsureNonVoid<P>, PublicB = UnwrapMixinsType<PublicMixin, "B"> & EnsureNonVoid<B>, PublicD = UnwrapMixinsType<PublicMixin, "D"> & EnsureNonVoid<D>, PublicC extends ComputedOptions = UnwrapMixinsType<PublicMixin, "C"> & EnsureNonVoid<C>, PublicM extends MethodOptions = UnwrapMixinsType<PublicMixin, "M"> & EnsureNonVoid<M>, PublicDefaults = UnwrapMixinsType<PublicMixin, "Defaults"> & EnsureNonVoid<Defaults>> = ComponentPublicInstance$1<PublicP, PublicB, PublicD, PublicC, PublicM, E, PublicProps, PublicDefaults, MakeDefaultsOptional, ComponentOptionsBase<P, B, D, C, M, Mixin, Extends, E, string, Defaults, {}, string, S, LC, Directives, Exposed, Provide>, I, S, Exposed, TypeRefs, TypeEl>;
type ExposedKeys<T, Exposed extends string & keyof T> = "" extends Exposed ? T : Pick<T, Exposed>;
export type ComponentPublicInstance$1<P = {}, B = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, E extends EmitsOptions = {}, PublicProps = {}, Defaults = {}, MakeDefaultsOptional extends boolean = false, Options = ComponentOptionsBase<any, any, any, any, any, any, any, any, any>, I extends ComponentInjectOptions = {}, S extends SlotsType = {}, Exposed extends string = "", TypeRefs extends Data = {}, TypeEl extends Element = any> = {
  $: ComponentInternalInstance;
  $data: D;
  $props: MakeDefaultsOptional extends true ? Partial<Defaults> & Omit<Prettify<P> & PublicProps, keyof Defaults> : Prettify<P> & PublicProps;
  $attrs: Data;
  $refs: Data & TypeRefs;
  $slots: UnwrapSlotsType<S>;
  $root: ComponentPublicInstance$1 | null;
  $parent: ComponentPublicInstance$1 | null;
  $host: Element | null;
  $emit: EmitFn<E>;
  $el: TypeEl;
  $options: Options & MergedComponentOptionsOverride;
  $forceUpdate: () => void;
  $nextTick: typeof nextTick;
  $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends ((...args: any) => infer R) ? (...args: [R, R, OnCleanup]) => any : (...args: [any, any, OnCleanup]) => any, options?: WatchOptions): WatchStopHandle;
} & ExposedKeys<IfAny<P, P, Readonly<Defaults> & Omit<P, keyof ShallowUnwrapRef<B> | keyof Defaults>> & ShallowUnwrapRef<B> & UnwrapNestedRefs<D> & ExtractComputedReturns<C> & M & ComponentCustomProperties & InjectToObject<I>, Exposed>;
type PublicPropertiesMap = Record<string, (i: ComponentInternalInstance) => any>;
export declare const getPublicPropertiesMap: () => PublicPropertiesMap;
interface ComponentRenderContext {
  [key: string]: any;
  _: ComponentInternalInstance;
}
export declare const PublicInstanceProxyHandlers: ProxyHandler<any>;
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
export interface SuspenseBoundary {
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
  registerDep(instance: GenericComponentInstance, onResolve: (setupResult: unknown) => void): void;
  unmount(parentSuspense: SuspenseBoundary | null, doRemove?: boolean): void;
}
declare function hydrateSuspense(node: Node, vnode: VNode, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, namespace: ElementNamespace, slotScopeIds: string[] | null, optimized: boolean, rendererInternals: RendererInternals, hydrateNode: (node: Node, vnode: VNode, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, slotScopeIds: string[] | null, optimized: boolean) => Node | null): Node | null;
declare function normalizeSuspenseChildren(vnode: VNode): void;
//#endregion
//#region packages/runtime-core/src/hydration.d.ts
export type RootHydrateFunction = (vnode: VNode<Node, Element>, container: (Element | ShadowRoot) & {
  _vnode?: VNode;
}) => void;
declare function createHydrationFunctions(rendererInternals: RendererInternals<Node, Element>): [RootHydrateFunction, (node: Node, vnode: VNode, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, slotScopeIds: string[] | null, optimized?: boolean) => Node | null];
//#endregion
//#region packages/runtime-core/src/components/BaseTransition.d.ts
type Hook<T = () => void> = T | T[];
declare const leaveCbKey: unique symbol;
declare const enterCbKey: unique symbol;
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
export interface TransitionHooks<HostElement = RendererElement> {
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
type PendingCallback = (cancelled?: boolean) => void;
export interface TransitionState {
  isMounted: boolean;
  isLeaving: boolean;
  isUnmounting: boolean;
  leavingNodes: Map<any, Record<string, any>>;
}
export interface TransitionElement {
  [enterCbKey]?: PendingCallback;
  [leaveCbKey]?: PendingCallback;
}
export interface TransitionHooksContext {
  setLeavingNodeCache: (node: any) => void;
  unsetLeavingNodeCache: (node: any) => void;
  earlyRemove: () => void;
  cloneHooks: (node: any) => TransitionHooks;
}
//#endregion
//#region packages/runtime-core/src/renderer.d.ts
export interface Renderer<HostElement = RendererElement> {
  render: RootRenderFunction<HostElement>;
  createApp: CreateAppFunction<HostElement>;
  internals: RendererInternals;
}
export interface HydrationRenderer extends Renderer<Element | ShadowRoot> {
  hydrate: RootHydrateFunction;
  hydrateNode: ReturnType<typeof createHydrationFunctions>[1];
}
export type ElementNamespace = "svg" | "mathml" | undefined;
export type RootRenderFunction<HostElement = RendererElement> = (vnode: VNode | null, container: HostElement, namespace?: ElementNamespace) => void;
export interface RendererOptions<HostNode = RendererNode, HostElement = RendererElement> {
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
  querySelector?(selector: string, parentComponent: GenericComponentInstance | null): HostElement | null;
  setScopeId?(el: HostElement, id: string): void;
  cloneNode?(node: HostNode): HostNode;
  insertStaticContent?(content: string, parent: HostElement, anchor: HostNode | null, namespace: ElementNamespace, start?: HostNode | null, end?: HostNode | null): [HostNode, HostNode];
}
export interface RendererNode {
  [key: string | symbol]: any;
}
export interface RendererElement extends RendererNode {}
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
type PatchFn = (n1: VNode | null, n2: VNode, container: RendererElement, anchor?: RendererNode | null, parentComponent?: ComponentInternalInstance | null, parentSuspense?: SuspenseBoundary | null, namespace?: ElementNamespace, slotScopeIds?: string[] | null, optimized?: boolean) => void;
type MountChildrenFn = (children: VNodeArrayChildren, container: RendererElement, anchor: RendererNode | null, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, namespace: ElementNamespace, slotScopeIds: string[] | null, optimized: boolean, start?: number) => void;
type PatchChildrenFn = (n1: VNode | null, n2: VNode, container: RendererElement, anchor: RendererNode | null, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, namespace: ElementNamespace, slotScopeIds: string[] | null, optimized: boolean) => void;
type PatchBlockChildrenFn = (oldChildren: VNode[], newChildren: VNode[], fallbackContainer: RendererElement, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, namespace: ElementNamespace, slotScopeIds: string[] | null) => void;
type MoveFn = (vnode: VNode, container: RendererElement, anchor: RendererNode | null, type: MoveType, parentComponent: ComponentInternalInstance | null, parentSuspense?: SuspenseBoundary | null) => void;
type NextFn = (vnode: VNode) => RendererNode | null;
type UnmountFn = (vnode: VNode, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, doRemove?: boolean, optimized?: boolean) => void;
type RemoveFn = (vnode: VNode) => void;
type MountComponentFn = (initialVNode: VNode, container: RendererElement, anchor: RendererNode | null, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, namespace: ElementNamespace, optimized: boolean) => void;
type UnmountComponentFn = (instance: ComponentInternalInstance, parentSuspense: SuspenseBoundary | null, doRemove?: boolean) => void;
declare enum MoveType {
  ENTER = 0,
  LEAVE = 1,
  REORDER = 2
}
/**
* The createRenderer function accepts two generic arguments:
* HostNode and HostElement, corresponding to Node and Element types in the
* host environment. For example, for runtime-dom, HostNode would be the DOM
* `Node` interface and HostElement would be the DOM `Element` interface.
*
* Custom renderers can pass in the platform specific types like this:
*
* ``` js
* const { render, createApp } = createRenderer<Node, Element>({
*   patchProp,
*   ...nodeOps
* })
* ```
*/
export declare function createRenderer<HostNode = RendererNode, HostElement = RendererElement>(options: RendererOptions<HostNode, HostElement>): Renderer<HostElement>;
//#endregion
//#region packages/runtime-core/src/components/KeepAlive.d.ts
type MatchPattern = string | RegExp | (string | RegExp)[];
export interface KeepAliveProps {
  include?: MatchPattern;
  exclude?: MatchPattern;
  max?: number | string;
}
export interface KeepAliveContext extends ComponentRenderContext {
  renderer: RendererInternals;
  activate: (vnode: VNode, container: RendererElement, anchor: RendererNode | null, namespace: ElementNamespace, optimized: boolean) => void;
  deactivate: (vnode: VNode) => void;
  getCachedComponent: (vnode: VNode) => VNode;
  getStorageContainer: () => RendererElement;
}
export declare const KeepAlive: {
  __isKeepAlive: true;
  new (): {
    $props: VNodeProps & KeepAliveProps;
    $slots: {
      default(): VNode[];
    };
  };
};
export declare function onActivated(hook: Function, target?: GenericComponentInstance | null): void;
export declare function onDeactivated(hook: Function, target?: GenericComponentInstance | null): void;
//#endregion
//#region packages/runtime-core/src/apiLifecycle.d.ts
export declare function injectHook(type: LifecycleHooks, hook: Function & {
  __weh?: Function;
}, target?: GenericComponentInstance | null, prepend?: boolean): Function | undefined;
type CreateHook<T = any> = (hook: T, target?: GenericComponentInstance | null) => void;
export declare const onBeforeMount: CreateHook;
export declare const onMounted: CreateHook;
export declare const onBeforeUpdate: CreateHook;
export declare const onUpdated: CreateHook;
export declare const onBeforeUnmount: CreateHook;
export declare const onUnmounted: CreateHook;
export declare const onServerPrefetch: CreateHook;
type DebuggerHook = (e: DebuggerEvent) => void;
export declare const onRenderTriggered: CreateHook<DebuggerHook>;
export declare const onRenderTracked: CreateHook<DebuggerHook>;
type ErrorCapturedHook<TError = unknown> = (err: TError, instance: ComponentPublicInstance$1 | null, info: string) => boolean | void;
export declare function onErrorCaptured<TError = Error>(hook: ErrorCapturedHook<TError>, target?: GenericComponentInstance | null): void;
//#endregion
//#region packages/runtime-core/src/compat/compatConfig.d.ts
declare enum DeprecationTypes$1 {
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
declare function warnDeprecation(key: DeprecationTypes$1, instance: ComponentInternalInstance | null, ...args: any[]): void;
type CompatConfig = Partial<Record<DeprecationTypes$1, boolean | "suppress-warning">> & {
  MODE?: 2 | 3 | ((comp: Component | null) => 2 | 3);
};
declare function configureCompat(config: CompatConfig): void;
declare function isCompatEnabled(key: DeprecationTypes$1, instance: ComponentInternalInstance | null, enableForBuiltIn?: boolean): boolean;
/**
* Use this for features where legacy usage is still possible, but will likely
* lead to runtime error if compat is disabled. (warn in all cases)
*/
declare function softAssertCompatEnabled(key: DeprecationTypes$1, instance: ComponentInternalInstance | null, ...args: any[]): boolean;
/**
* Use this for features with the same syntax but with mutually exclusive
* behavior in 2 vs 3. Only warn if compat is enabled.
* e.g. render function
*/
declare function checkCompatEnabled(key: DeprecationTypes$1, instance: ComponentInternalInstance | null, ...args: any[]): boolean;
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
export interface ComponentCustomOptions {}
export type RenderFunction = () => VNodeChild;
export interface ComponentOptionsBase<Props, RawBindings, D, C extends ComputedOptions, M extends MethodOptions, Mixin extends ComponentOptionsMixin, Extends extends ComponentOptionsMixin, E extends EmitsOptions, EE extends string = string, Defaults = {}, I extends ComponentInjectOptions = {}, II extends string = string, S extends SlotsType = {}, LC extends Record<string, Component> = {}, Directives extends Record<string, Directive> = {}, Exposed extends string = string, Provide extends ComponentProvideOptions = ComponentProvideOptions> extends LegacyOptions<Props, D, C, M, Mixin, Extends, I, II, Provide>, ComponentInternalOptions, AsyncComponentInternalOptions, ComponentCustomOptions {
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
export interface RuntimeCompilerOptions {
  isCustomElement?: (tag: string) => boolean;
  whitespace?: "preserve" | "condense";
  comments?: boolean;
  delimiters?: [string, string];
}
export type ComponentOptions<Props = {}, RawBindings = any, D = any, C extends ComputedOptions = any, M extends MethodOptions = any, Mixin extends ComponentOptionsMixin = any, Extends extends ComponentOptionsMixin = any, E extends EmitsOptions = any, EE extends string = string, Defaults = {}, I extends ComponentInjectOptions = {}, II extends string = string, S extends SlotsType = {}, LC extends Record<string, Component> = {}, Directives extends Record<string, Directive> = {}, Exposed extends string = string, Provide extends ComponentProvideOptions = ComponentProvideOptions> = ComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, Defaults, I, II, S, LC, Directives, Exposed, Provide> & ThisType<CreateComponentPublicInstanceWithMixins<{}, RawBindings, D, C, M, Mixin, Extends, E, Readonly<Props>, Defaults, false, I, S, LC, Directives>>;
export type ComponentOptionsMixin = ComponentOptionsBase<any, any, any, any, any, ComponentOptionsMixin, any, any, any, any, any, any, any, any, any, any, any>;
export type ComputedOptions = Record<string, ComputedGetter<any> | WritableComputedOptions<any>>;
export interface MethodOptions {
  [key: string]: Function;
}
type ExtractComputedReturns<T extends any> = { [key in keyof T]: T[key] extends {
  get: (...args: any[]) => infer TReturn;
} ? TReturn : T[key] extends ((...args: any[]) => infer TReturn) ? TReturn : never };
type ObjectWatchOptionItem = {
  handler: WatchCallback | string;
} & WatchOptions;
type WatchOptionItem = string | WatchCallback | ObjectWatchOptionItem;
type ComponentWatchOptionItem = WatchOptionItem | WatchOptionItem[];
type ComponentWatchOptions = Record<string, ComponentWatchOptionItem>;
export type ComponentProvideOptions = ObjectProvideOptions | Function;
type ObjectProvideOptions = Record<string | symbol, unknown>;
export type ComponentInjectOptions = string[] | ObjectInjectOptions;
type ObjectInjectOptions = Record<string | symbol, string | symbol | {
  type?: unknown;
  from?: string | symbol;
  default?: unknown;
}>;
type InjectToObject<T extends ComponentInjectOptions> = T extends string[] ? { [K in T[number]]?: any } : T extends ObjectInjectOptions ? { [K in keyof T]?: any } : never;
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
  deactivated?: MergedHook; /** @deprecated use `beforeUnmount` instead */
  beforeDestroy?: MergedHook;
  beforeUnmount?: MergedHook; /** @deprecated use `unmounted` instead */
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
/**
* @deprecated
*/
export type ComponentOptionsWithoutProps<Props = {}, RawBindings = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, EE extends string = string, I extends ComponentInjectOptions = {}, II extends string = string, S extends SlotsType = {}, LC extends Record<string, Component> = {}, Directives extends Record<string, Directive> = {}, Exposed extends string = string, Provide extends ComponentProvideOptions = ComponentProvideOptions, TE extends ComponentTypeEmits = {}, ResolvedEmits extends EmitsOptions = ({} extends E ? TypeEmitsToOptions<TE> : E), PE = Props & EmitsToProps<ResolvedEmits>> = ComponentOptionsBase<PE, RawBindings, D, C, M, Mixin, Extends, E, EE, {}, I, II, S, LC, Directives, Exposed, Provide> & {
  props?: never;
  /**
  * @private for language-tools use only
  */
  __typeProps?: Props;
  /**
  * @private for language-tools use only
  */
  __typeEmits?: TE;
} & ThisType<CreateComponentPublicInstanceWithMixins<PE, RawBindings, D, C, M, Mixin, Extends, ResolvedEmits, EE, {}, false, I, S, LC, Directives, string>>;
/**
* @deprecated
*/
export type ComponentOptionsWithArrayProps<PropNames extends string = string, RawBindings = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = EmitsOptions, EE extends string = string, I extends ComponentInjectOptions = {}, II extends string = string, S extends SlotsType = {}, LC extends Record<string, Component> = {}, Directives extends Record<string, Directive> = {}, Exposed extends string = string, Provide extends ComponentProvideOptions = ComponentProvideOptions, Props = Prettify<Readonly<{ [key in PropNames]?: any } & EmitsToProps<E>>>> = ComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, {}, I, II, S, LC, Directives, Exposed, Provide> & {
  props: PropNames[];
} & ThisType<CreateComponentPublicInstanceWithMixins<Props, RawBindings, D, C, M, Mixin, Extends, E, Props, {}, false, I, S, LC, Directives, string>>;
/**
* @deprecated
*/
export type ComponentOptionsWithObjectProps<PropsOptions = ComponentObjectPropsOptions, RawBindings = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = EmitsOptions, EE extends string = string, I extends ComponentInjectOptions = {}, II extends string = string, S extends SlotsType = {}, LC extends Record<string, Component> = {}, Directives extends Record<string, Directive> = {}, Exposed extends string = string, Provide extends ComponentProvideOptions = ComponentProvideOptions, Props = Prettify<Readonly<ExtractPropTypes<PropsOptions>> & Readonly<EmitsToProps<E>>>, Defaults = ExtractDefaultPropTypes<PropsOptions>> = ComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, Defaults, I, II, S, LC, Directives, Exposed, Provide> & {
  props: PropsOptions & ThisType<void>;
} & ThisType<CreateComponentPublicInstanceWithMixins<Props, RawBindings, D, C, M, Mixin, Extends, E, Props, Defaults, false, I, S, LC, Directives>>;
//#endregion
//#region packages/runtime-core/src/apiInject.d.ts
interface InjectionConstraint<T> {}
export type InjectionKey<T> = symbol & InjectionConstraint<T>;
export declare function provide<T, K = InjectionKey<T> | string | number>(key: K, value: K extends InjectionKey<infer V> ? V : T): void;
export declare function inject<T>(key: InjectionKey<T> | string): T | undefined;
export declare function inject<T>(key: InjectionKey<T> | string, defaultValue: T, treatDefaultAsFactory?: false): T;
export declare function inject<T>(key: InjectionKey<T> | string, defaultValue: T | (() => T), treatDefaultAsFactory: true): T;
/**
* Returns true if `inject()` can be used without warning about being called in the wrong place (e.g. outside of
* setup()). This is used by libraries that want to use `inject()` internally without triggering a warning to the end
* user. One example is `useRoute()` in `vue-router`.
*/
export declare function hasInjectionContext(): boolean;
//#endregion
//#region packages/runtime-core/src/apiDefineComponent.d.ts
export type PublicProps = VNodeProps & AllowedComponentProps & ComponentCustomProps;
type ResolveProps<PropsOrPropOptions, E extends EmitsOptions> = Readonly<PropsOrPropOptions extends ComponentPropsOptions ? ExtractPropTypes<PropsOrPropOptions> : PropsOrPropOptions> & ({} extends E ? {} : EmitsToProps<E>);
export type DefineComponent<PropsOrPropOptions = {}, RawBindings = {}, D = {}, C extends ComputedOptions = ComputedOptions, M extends MethodOptions = MethodOptions, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, EE extends string = string, PP = PublicProps, Props = ResolveProps<PropsOrPropOptions, E>, Defaults = ExtractDefaultPropTypes<PropsOrPropOptions>, S extends SlotsType = {}, LC extends Record<string, Component> = {}, Directives extends Record<string, Directive> = {}, Exposed extends string = string, Provide extends ComponentProvideOptions = ComponentProvideOptions, MakeDefaultsOptional extends boolean = true, TypeRefs extends Record<string, unknown> = {}, TypeEl extends Element = any, ClassName extends string = string, InjectOptions extends ComponentInjectOptions = {}> = ComponentPublicInstanceConstructor<CreateComponentPublicInstanceWithMixins<Props, RawBindings, D, C, M, Mixin, Extends, E, PP, Defaults, MakeDefaultsOptional, InjectOptions, S, LC & GlobalComponents, Directives & GlobalDirectives, Exposed, TypeRefs, TypeEl>> & ComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, Defaults, {}, string, S, LC & GlobalComponents, Directives & GlobalDirectives, Exposed, Provide> & PP & {
  __className: ClassName;
};
export type DefineSetupFnComponent<P extends Record<string, any>, E extends EmitsOptions = {}, S extends SlotsType = SlotsType, Props = P & EmitsToProps<E>, PP = PublicProps> = new (props: Props & PP) => CreateComponentPublicInstanceWithMixins<Props, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, E, PP, {}, false, {}, S>;
type ToResolvedProps<Props, Emits extends EmitsOptions> = Readonly<Props> & Readonly<EmitsToProps<Emits>>;
export declare function defineComponent<Props extends Record<string, any>, E extends EmitsOptions = {}, EE extends string = string, S extends SlotsType = {}>(setup: (props: Props, ctx: SetupContext<E, S>) => RenderFunction | Promise<RenderFunction>, options?: Pick<ComponentOptions, "name" | "inheritAttrs"> & {
  props?: (keyof Props)[];
  emits?: E | EE[];
  slots?: S;
}): DefineSetupFnComponent<Props, E, S>;
export declare function defineComponent<Props extends Record<string, any>, E extends EmitsOptions = {}, EE extends string = string, S extends SlotsType = {}>(setup: (props: Props, ctx: SetupContext<E, S>) => RenderFunction | Promise<RenderFunction>, options?: Pick<ComponentOptions, "name" | "inheritAttrs"> & {
  props?: ComponentObjectPropsOptions<Props>;
  emits?: E | EE[];
  slots?: S;
}): DefineSetupFnComponent<Props, E, S>;
export declare function defineComponent<TypeProps, RuntimePropsOptions extends ComponentObjectPropsOptions = ComponentObjectPropsOptions, RuntimePropsKeys extends string = string, TypeEmits extends ComponentTypeEmits = {}, RuntimeEmitsOptions extends EmitsOptions = {}, RuntimeEmitsKeys extends string = string, Data = {}, SetupBindings = {}, Computed extends ComputedOptions = {}, Methods extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, InjectOptions extends ComponentInjectOptions = {}, InjectKeys extends string = string, Slots extends SlotsType = {}, LocalComponents extends Record<string, Component> = {}, Directives extends Record<string, Directive> = {}, Exposed extends string = string, Provide extends ComponentProvideOptions = ComponentProvideOptions, ResolvedEmits extends EmitsOptions = ({} extends RuntimeEmitsOptions ? TypeEmitsToOptions<TypeEmits> : RuntimeEmitsOptions), InferredProps = (IsKeyValues<TypeProps> extends true ? TypeProps : string extends RuntimePropsKeys ? ComponentObjectPropsOptions extends RuntimePropsOptions ? {} : ExtractPropTypes<RuntimePropsOptions> : { [key in RuntimePropsKeys]?: any }), TypeRefs extends Record<string, unknown> = {}, TypeEl extends Element = any, ClassName extends string = string>(options: {
  props?: (RuntimePropsOptions & ThisType<void>) | RuntimePropsKeys[];
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
  __typeEl?: TypeEl;
  /**
  * Component class name for type inference
  */
  __className?: ClassName;
} & ComponentOptionsBase<ToResolvedProps<InferredProps, ResolvedEmits>, SetupBindings, Data, Computed, Methods, Mixin, Extends, RuntimeEmitsOptions, RuntimeEmitsKeys, {}, InjectOptions, InjectKeys, Slots, LocalComponents, Directives, Exposed, Provide> & ThisType<CreateComponentPublicInstanceWithMixins<ToResolvedProps<InferredProps, ResolvedEmits>, SetupBindings, Data, Computed, Methods, Mixin, Extends, ResolvedEmits, {}, {}, false, InjectOptions, Slots, LocalComponents, Directives, string>>): DefineComponent<InferredProps, SetupBindings, Data, Computed, Methods, Mixin, Extends, ResolvedEmits, RuntimeEmitsKeys, PublicProps, ToResolvedProps<InferredProps, ResolvedEmits>, ExtractDefaultPropTypes<RuntimePropsOptions>, Slots, LocalComponents, Directives, Exposed, Provide, unknown extends TypeProps ? true : false, TypeRefs, TypeEl, ClassName, InjectOptions>;
//#endregion
//#region packages/runtime-core/src/apiCreateApp.d.ts
export interface App<HostElement = any> {
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
  _context: AppContext;
  _instance: GenericComponentInstance | null;
  /**
  * @internal custom element vnode
  */
  _ceVNode?: VNode;
  /**
  * @internal vapor custom element instance
  */
  _ceComponent?: GenericComponentInstance | null;
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
export type OptionMergeFunction = (to: unknown, from: unknown) => any;
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
    beforeSetupPage: (props: any, instance: GenericComponentInstance) => void;
    initNativePage: (vm: ComponentPublicInstance$1) => void;
    initFontFace: (vm: ComponentPublicInstance$1) => void;
  };
}
export interface AppConfig extends GenericAppConfig {
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
interface VaporInteropInterface {
  mount(vnode: VNode, container: any, anchor: any, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, onBeforeMount?: () => void): GenericComponentInstance;
  update(n1: VNode, n2: VNode, shouldUpdate: boolean, onBeforeUpdate?: () => void): void;
  unmount(vnode: VNode, doRemove?: boolean): void;
  move(vnode: VNode, container: any, anchor: any, moveType: MoveType): void;
  slot(n1: VNode | null, n2: VNode, container: any, anchor: any, parentComponent: ComponentInternalInstance | null): void;
  hydrate(vnode: VNode, node: any, container: any, anchor: any, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null): Node;
  hydrateSlot(vnode: VNode, node: any): Node;
  activate(vnode: VNode, container: any, anchor: any, parentComponent: ComponentInternalInstance): void;
  deactivate(vnode: VNode, container: any): void;
  setTransitionHooks(component: ComponentInternalInstance, transition: TransitionHooks): void;
  vdomMount: (component: ConcreteComponent, parentComponent: any, props?: any, slots?: any, isSingleRoot?: boolean) => any;
  vdomUnmount: UnmountComponentFn;
  vdomSlot: (slots: any, name: string | (() => string), props: Record<string, any>, parentComponent: any, fallback?: any) => any;
  vdomMountVNode: (vnode: VNode, parentComponent: any) => any;
}
/**
* Minimal app context shared between vdom and vapor
*/
export interface GenericAppContext {
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
  vapor?: VaporInteropInterface;
}
export interface AppContext extends GenericAppContext {
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
  propsCache: WeakMap<ConcreteComponent, NormalizedPropsOptions>;
  /**
  * Cache for normalized emits options
  * @internal
  */
  emitsCache: WeakMap<ConcreteComponent, ObjectEmitsOptions | null>;
  /**
  * v2 compat only
  * @internal
  */
  filters?: Record<string, Function>;
}
type PluginInstallFunction<Options = any[]> = Options extends unknown[] ? (app: App, ...options: Options) => any : (app: App, options: Options) => any;
export type ObjectPlugin<Options = any[]> = {
  install: PluginInstallFunction<Options>;
};
export type FunctionPlugin<Options = any[]> = PluginInstallFunction<Options> & Partial<ObjectPlugin<Options>>;
export type Plugin<Options = any[], P extends unknown[] = (Options extends unknown[] ? Options : [Options])> = FunctionPlugin<P> | ObjectPlugin<P>;
export type CreateAppFunction<HostElement, Comp = Component> = (rootComponent: Comp, rootProps?: Data | null) => App<HostElement>;
//#endregion
//#region packages/runtime-core/src/components/Teleport.d.ts
type TeleportVNode = VNode<RendererNode, RendererElement, TeleportProps>;
export interface TeleportProps {
  to: string | RendererElement | null | undefined;
  disabled?: boolean;
  defer?: boolean;
}
declare const TeleportImpl: {
  name: string;
  __isTeleport: boolean;
  process(n1: TeleportVNode | null, n2: TeleportVNode, container: RendererElement, anchor: RendererNode | null, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, namespace: ElementNamespace, slotScopeIds: string[] | null, optimized: boolean, internals: RendererInternals): void;
  remove(vnode: VNode, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, {
    um: unmount,
    o: {
      remove: hostRemove
    }
  }: RendererInternals, doRemove: boolean): void;
  move: typeof moveTeleport;
  hydrate: typeof hydrateTeleport;
};
declare enum TeleportMoveTypes {
  TARGET_CHANGE = 0,
  TOGGLE = 1,
  REORDER = 2
}
declare function moveTeleport(vnode: VNode, container: RendererElement, parentAnchor: RendererNode | null, {
  o: {
    insert
  },
  m: move
}: RendererInternals, parentComponent: ComponentInternalInstance | null, moveType?: TeleportMoveTypes): void;
declare function hydrateTeleport(node: Node, vnode: TeleportVNode, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, slotScopeIds: string[] | null, optimized: boolean, {
  o: {
    nextSibling,
    parentNode,
    querySelector,
    insert,
    createText
  }
}: RendererInternals<Node, Element>, hydrateChildren: (node: Node | null, vnode: VNode, container: Element, parentComponent: ComponentInternalInstance | null, parentSuspense: SuspenseBoundary | null, slotScopeIds: string[] | null, optimized: boolean) => Node | null, container: RendererElement): Node | null;
export declare const Teleport: {
  __isTeleport: true;
  new (): {
    $props: VNodeProps & TeleportProps;
    $slots: {
      default(): VNode[];
    };
  };
};
//#endregion
//#region packages/runtime-core/src/helpers/resolveAssets.d.ts
/**
* @private
*/
export declare function resolveComponent(name: string, maybeSelfReference?: boolean): ConcreteComponent | string;
declare const NULL_DYNAMIC_COMPONENT: unique symbol;
/**
* @private
*/
export declare function resolveDynamicComponent(component: unknown): VNodeTypes;
/**
* @private
*/
export declare function resolveDirective(name: string): Directive | undefined;
/**
* v2 compat only
* @internal
*/
declare function resolveFilter$1(name: string): Function | undefined;
//#endregion
//#region packages/runtime-core/src/vnode.d.ts
export declare const Fragment: {
  __isFragment: true;
  new (): {
    $props: VNodeProps;
  };
};
export declare const Text$1: unique symbol;
export declare const Comment$1: unique symbol;
export declare const Static: unique symbol;
declare const VaporSlot$1: unique symbol;
export type VNodeTypes = string | VNode | Component | typeof Text$1 | typeof Static | typeof Comment$1 | typeof Fragment | typeof Teleport | typeof TeleportImpl | typeof Suspense | typeof SuspenseImpl | typeof VaporSlot$1;
export type VNodeRef = string | Ref | ((ref: Element | ComponentPublicInstance$1 | null, refs: Record<string, any>) => void);
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
export type VNodeProps = {
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
export type VNodeArrayChildren = Array<VNodeArrayChildren | VNodeChildAtom>;
export type VNodeChild = VNodeChildAtom | VNodeArrayChildren;
export type VNodeNormalizedChildren = string | VNodeArrayChildren | RawSlots$1 | null;
export interface VNode<HostNode = RendererNode, HostElement = RendererElement, ExtraProps = {
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
  suspense: SuspenseBoundary | null;
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
  appContext: AppContext | null;
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
    fallback: (() => VNodeArrayChildren) | undefined;
    ref?: ShallowRef<any>;
  };
  /**
  * @internal Vapor slot Block
  */
  vb?: any;
}
/**
* Open a block.
* This must be called before `createBlock`. It cannot be part of `createBlock`
* because the children of the block are evaluated before `createBlock` itself
* is called. The generated code typically looks like this:
*
* ```js
* function render() {
*   return (openBlock(),createBlock('div', null, [...]))
* }
* ```
* disableTracking is true when creating a v-for fragment block, since a v-for
* fragment always diffs its children.
*
* @private
*/
export declare function openBlock(disableTracking?: boolean): void;
/**
* Block tracking sometimes needs to be disabled, for example during the
* creation of a tree that needs to be cached by v-once. The compiler generates
* code like this:
*
* ``` js
* _cache[1] || (
*   setBlockTracking(-1, true),
*   _cache[1] = createVNode(...),
*   setBlockTracking(1),
*   _cache[1]
* )
* ```
*
* @private
*/
export declare function setBlockTracking(value: number, inVOnce?: boolean): void;
/**
* @private
*/
export declare function createElementBlock(type: string | typeof Fragment, props?: Record<string, any> | null, children?: any, patchFlag?: number, dynamicProps?: string[], shapeFlag?: number): VNode;
/**
* Create a block root vnode. Takes the same exact arguments as `createVNode`.
* A block root keeps track of dynamic nodes within the block in the
* `dynamicChildren` array.
*
* @private
*/
export declare function createBlock(type: VNodeTypes | ClassComponent, props?: Record<string, any> | null, children?: any, patchFlag?: number, dynamicProps?: string[]): VNode;
export declare function isVNode(value: any): value is VNode;
declare let vnodeArgsTransformer: ((args: Parameters<typeof _createVNode>, instance: ComponentInternalInstance | null) => Parameters<typeof _createVNode>) | undefined;
/**
* Internal API for registering an arguments transform for createVNode
* used for creating stubs in the test-utils
* It is *internal* but needs to be exposed for test-utils to pick up proper
* typings
*/
export declare function transformVNodeArgs(transformer?: typeof vnodeArgsTransformer): void;
export declare function createBaseVNode(type: VNodeTypes | ClassComponent | typeof NULL_DYNAMIC_COMPONENT, props?: (Data & VNodeProps) | null, children?: unknown, patchFlag?: number, dynamicProps?: string[] | null, shapeFlag?: number, isBlockNode?: boolean, needFullChildrenNormalization?: boolean): VNode;
export declare const createVNode: typeof _createVNode;
declare function _createVNode(type: VNodeTypes | ClassComponent | typeof NULL_DYNAMIC_COMPONENT, props?: (Data & VNodeProps) | null, children?: unknown, patchFlag?: number, dynamicProps?: string[] | null, isBlockNode?: boolean): VNode;
export declare function guardReactiveProps(props: (Data & VNodeProps) | null): (Data & VNodeProps) | null;
export declare function cloneVNode<T, U>(vnode: VNode<T, U>, extraProps?: (Data & VNodeProps) | null, mergeRef?: boolean, cloneTransition?: boolean): VNode<T, U>;
/**
* @private
*/
export declare function createTextVNode(text?: string, flag?: number): VNode;
/**
* @private
*/
export declare function createStaticVNode(content: string, numberOfNodes: number): VNode;
/**
* @private
*/
export declare function createCommentVNode(text?: string, asBlock?: boolean): VNode;
declare function normalizeVNode(child: VNodeChild): VNode;
export declare function mergeProps(...args: (Data & VNodeProps)[]): Data;
//#endregion
//#region packages/runtime-core/src/componentCurrentInstance.d.ts
/**
* @internal
*/
export declare let currentInstance: GenericComponentInstance | null;
/**
* fixed by uts 移除 internal 注解
*/
export declare const getCurrentGenericInstance: () => GenericComponentInstance | null;
/**
* fixed by uts
* @returns
*/
export declare const getCurrentInstance: () => ComponentInternalInstance | null;
export declare let isInSSRComponentSetup: boolean;
export declare const setCurrentInstance: (instance: GenericComponentInstance | null, scope?: EffectScope | undefined) => [GenericComponentInstance | null, EffectScope | undefined];
//#endregion
//#region packages/runtime-core/src/component.d.ts
type Data = Record<string, unknown>;
/**
* Public utility type for extracting the instance type of a component.
* Works with all valid component definition types. This is intended to replace
* the usage of `InstanceType<typeof Comp>` which only works for
* constructor-based component definition types.
*
* @example
* ```ts
* const MyComp = { ... }
* declare const instance: ComponentInstance<typeof MyComp>
* ```
*/
export type ComponentInstance<T> = T extends {
  new (): ComponentPublicInstance$1;
} ? InstanceType<T> : T extends FunctionalComponent<infer Props, infer Emits> ? ComponentPublicInstance$1<Props, {}, {}, {}, {}, ShortEmitsToObject<Emits>> : T extends Component<infer PropsOrInstance, infer RawBindings, infer D, infer C, infer M> ? PropsOrInstance extends {
  $props: unknown;
} ? PropsOrInstance : ComponentPublicInstance$1<unknown extends PropsOrInstance ? {} : PropsOrInstance, unknown extends RawBindings ? {} : RawBindings, unknown extends D ? {} : D, C, M> : never;
/**
* For extending allowed non-declared props on components in TSX
*/
export interface ComponentCustomProps {}
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
export interface GlobalDirectives {}
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
export interface GlobalComponents {
  Teleport: DefineComponent<TeleportProps>;
  Suspense: DefineComponent<SuspenseProps>;
  KeepAlive: DefineComponent<KeepAliveProps>;
  BaseTransition: DefineComponent<BaseTransitionProps>;
}
/**
* Default allowed non-declared props on component in TSX
*/
export interface AllowedComponentProps {
  class?: unknown;
  style?: unknown;
}
interface ComponentInternalOptions {
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
export interface AsyncComponentInternalOptions<R = ConcreteComponent, I = ComponentInternalInstance> {
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
export interface FunctionalComponent<P = {}, E extends EmitsOptions | Record<string, any[]> = {}, S extends Record<string, any> = any, EE extends EmitsOptions = ShortEmitsToObject<E>> extends ComponentInternalOptions {
  (props: P & EmitsToProps<EE>, ctx: Omit<SetupContext<EE, IfAny<S, {}, SlotsType<S>>>, "expose">): any;
  props?: ComponentPropsOptions<P>;
  emits?: EE | (keyof EE)[];
  slots?: IfAny<S, Slots, SlotsType<S>>;
  inheritAttrs?: boolean;
  displayName?: string;
  compatConfig?: CompatConfig;
}
interface ClassComponent {
  new (...args: any[]): ComponentPublicInstance$1<any, any, any, any, any>;
  __vccOpts: ComponentOptions;
}
/**
* Type used where a function accepts both vdom and vapor components.
*/
type GenericComponent = ({
  name?: string;
} | ((() => any) & {
  displayName?: string;
})) & ComponentInternalOptions;
/**
* Concrete component type matches its actual value: it's either an options
* object, or a function. Use this where the code expects to work with actual
* values, e.g. checking if its a function or not. This is mostly for internal
* implementation code.
*/
export type ConcreteComponent<Props = {}, RawBindings = any, D = any, C extends ComputedOptions = ComputedOptions, M extends MethodOptions = MethodOptions, E extends EmitsOptions | Record<string, any[]> = {}, S extends Record<string, any> = any> = ComponentOptions<Props, RawBindings, D, C, M> | FunctionalComponent<Props, E, S>;
/**
* A type used in public APIs where a component type is expected.
* The constructor type is an artificial type returned by defineComponent().
*/
export type Component<PropsOrInstance = any, RawBindings = any, D = any, C extends ComputedOptions = ComputedOptions, M extends MethodOptions = MethodOptions, E extends EmitsOptions | Record<string, any[]> = {}, S extends Record<string, any> = any> = ConcreteComponent<PropsOrInstance, RawBindings, D, C, M, E, S> | ComponentPublicInstanceConstructor<PropsOrInstance>;
type LifecycleHook<TFn = Function> = (TFn & SchedulerJob)[] | null;
export type SetupContext<E = EmitsOptions, S extends SlotsType = {}> = E extends any ? {
  attrs: Data;
  slots: UnwrapSlotsType<S>;
  emit: EmitFn<E>;
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
interface GenericComponentInstance {
  vapor?: boolean;
  uid: number;
  type: GenericComponent;
  root: GenericComponentInstance | null;
  parent: GenericComponentInstance | null;
  appContext: GenericAppContext;
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
  scope: EffectScope;
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
  emit: EmitFn;
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
  propsOptions?: NormalizedPropsOptions;
  /**
  * resolved emits options
  * @internal
  */
  emitsOptions?: ObjectEmitsOptions | null;
  /**
  * Public instance proxy, vdom only
  */
  proxy?: any;
  /**
  * suspense related
  * @internal
  */
  suspense: SuspenseBoundary | null;
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
  [LifecycleHooks.BEFORE_CREATE]?: LifecycleHook;
  /**
  * @internal
  */
  [LifecycleHooks.CREATED]?: LifecycleHook;
  /**
  * @internal
  */
  [LifecycleHooks.BEFORE_MOUNT]?: LifecycleHook;
  /**
  * @internal
  */
  [LifecycleHooks.MOUNTED]?: LifecycleHook;
  /**
  * @internal
  */
  [LifecycleHooks.BEFORE_UPDATE]?: LifecycleHook;
  /**
  * @internal
  */
  [LifecycleHooks.UPDATED]?: LifecycleHook;
  /**
  * @internal
  */
  [LifecycleHooks.BEFORE_UNMOUNT]?: LifecycleHook;
  /**
  * @internal
  */
  [LifecycleHooks.UNMOUNTED]?: LifecycleHook;
  /**
  * @internal
  */
  [LifecycleHooks.RENDER_TRACKED]?: LifecycleHook;
  /**
  * @internal
  */
  [LifecycleHooks.RENDER_TRIGGERED]?: LifecycleHook;
  /**
  * @internal
  */
  [LifecycleHooks.ACTIVATED]?: LifecycleHook;
  /**
  * @internal
  */
  [LifecycleHooks.DEACTIVATED]?: LifecycleHook;
  /**
  * @internal
  */
  [LifecycleHooks.ERROR_CAPTURED]?: LifecycleHook;
  /**
  * @internal
  */
  [LifecycleHooks.SERVER_PREFETCH]?: LifecycleHook<() => Promise<unknown>>;
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
export interface ComponentInternalInstance extends GenericComponentInstance {
  vapor?: never;
  uid: number;
  type: ConcreteComponent;
  parent: GenericComponentInstance | null;
  root: GenericComponentInstance;
  appContext: AppContext;
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
  propsOptions: NormalizedPropsOptions;
  /**
  * resolved emits options
  * @internal
  */
  emitsOptions: ObjectEmitsOptions | null;
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
  emit: EmitFn;
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
declare function createComponentInstance(vnode: VNode, parent: ComponentInternalInstance | null, suspense: SuspenseBoundary | null): ComponentInternalInstance;
declare function setupComponent(instance: ComponentInternalInstance, isSSR?: boolean, optimized?: boolean): Promise<void> | undefined;
/**
* For runtime-dom to register the compiler.
* Note the exported method uses any to avoid d.ts relying on the compiler types.
*/
export declare function registerRuntimeCompiler(_compile: any): void;
export declare const isRuntimeOnly: () => boolean;
declare function getComponentPublicInstance(instance: GenericComponentInstance): ComponentPublicInstance$1 | ComponentInternalInstance["exposed"] | null;
export interface ComponentCustomElementInterface {
  /**
  * @internal
  */
  _isVueCE: boolean;
  /**
  * @internal
  */
  _injectChildStyle(type: ConcreteComponent): void;
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
//#endregion
//#region packages/runtime-core/src/apiWatch.d.ts
type MaybeUndefined<T, I> = I extends true ? T | undefined : T;
type MapSources<T, Immediate> = { [K in keyof T]: T[K] extends WatchSource<infer V> ? MaybeUndefined<V, Immediate> : T[K] extends object ? MaybeUndefined<T[K], Immediate> : never };
export interface WatchEffectOptions extends DebuggerOptions {
  flush?: "pre" | "post" | "sync";
}
export interface WatchOptions<Immediate = boolean> extends WatchEffectOptions {
  immediate?: Immediate;
  deep?: boolean | number;
  once?: boolean;
}
export declare function watchEffect(effect: WatchEffect, options?: WatchEffectOptions): WatchHandle;
export declare function watchPostEffect(effect: WatchEffect, options?: DebuggerOptions): WatchHandle;
export declare function watchSyncEffect(effect: WatchEffect, options?: DebuggerOptions): WatchHandle;
export type MultiWatchSources = (WatchSource<unknown> | object)[];
export declare function watch<T, Immediate extends Readonly<boolean> = false>(source: WatchSource<T>, cb: WatchCallback<T, MaybeUndefined<T, Immediate>>, options?: WatchOptions<Immediate>): WatchHandle;
export declare function watch<T extends Readonly<MultiWatchSources>, Immediate extends Readonly<boolean> = false>(sources: readonly [...T] | T, cb: [T] extends [ReactiveMarker] ? WatchCallback<T, MaybeUndefined<T, Immediate>> : WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>, options?: WatchOptions<Immediate>): WatchHandle;
export declare function watch<T extends MultiWatchSources, Immediate extends Readonly<boolean> = false>(sources: [...T], cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>, options?: WatchOptions<Immediate>): WatchHandle;
export declare function watch<T extends object, Immediate extends Readonly<boolean> = false>(source: T, cb: WatchCallback<T, MaybeUndefined<T, Immediate>>, options?: WatchOptions<Immediate>): WatchHandle;
//#endregion
//#region packages/runtime-core/src/hydrationStrategies.d.ts
/**
* A lazy hydration strategy for async components.
* @param hydrate - call this to perform the actual hydration.
* @param forEachElement - iterate through the root elements of the component's
*                         non-hydrated DOM, accounting for possible fragments.
* @returns a teardown function to be called if the async component is unmounted
*          before it is hydrated. This can be used to e.g. remove DOM event
*          listeners.
*/
export type HydrationStrategy = (hydrate: () => void, forEachElement: (cb: (el: Element) => any) => void) => (() => void) | void;
export type HydrationStrategyFactory<Options> = (options?: Options) => HydrationStrategy;
//#endregion
//#region packages/runtime-core/src/apiAsyncComponent.d.ts
type AsyncComponentResolveResult<T = Component> = T | {
  default: T;
};
export type AsyncComponentLoader<T = any> = () => Promise<AsyncComponentResolveResult<T>>;
export interface AsyncComponentOptions<T = any, C = any> {
  loader: AsyncComponentLoader<T>;
  loadingComponent?: C;
  errorComponent?: C;
  delay?: number;
  timeout?: number;
  suspensible?: boolean;
  hydrate?: HydrationStrategy;
  onError?: (error: Error, retry: () => void, fail: () => void, attempts: number) => any;
}
export declare function defineAsyncComponent<T extends Component = {
  new (): ComponentPublicInstance$1;
}>(source: AsyncComponentLoader<T> | AsyncComponentOptions<T, Component>): T;
//#endregion
//#region packages/runtime-core/src/helpers/useModel.d.ts
export declare function useModel<M extends PropertyKey, T extends Record<string, any>, K extends keyof T, G = T[K], S = T[K]>(props: T, name: K, options?: DefineModelOptions<T[K], G, S>): ModelRef<T[K], M, G, S>;
export declare function useModel<R>(props: any, name: string, options?: {
  get?: () => R;
  set?: (v: R) => void;
}): ModelRef<R, string>;
//#endregion
//#region packages/runtime-core/src/helpers/useTemplateRef.d.ts
export type TemplateRef<T = unknown> = Readonly<ShallowRef<T | null>>;
export declare function useTemplateRef<T = unknown, Keys extends string = string>(key: Keys): Readonly<ShallowRef<T | null>>;
//#endregion
//#region packages/runtime-core/src/helpers/useId.d.ts
export declare function useId(): string;
//#endregion
//#region packages/runtime-core/src/h.d.ts
type RawProps$1 = VNodeProps & {
  __v_isVNode?: never;
  [Symbol.iterator]?: never;
} & Record<string, any>;
type RawChildren = string | number | boolean | VNode | VNodeArrayChildren | (() => any);
interface Constructor<P = any> {
  __isFragment?: never;
  __isTeleport?: never;
  __isSuspense?: never;
  new (...args: any[]): {
    $props: P;
  };
}
export declare function h(type: string, children?: RawChildren): VNode;
export declare function h(type: string, props?: RawProps$1 | null, children?: RawChildren | RawSlots$1): VNode;
export declare function h(type: typeof Text$1 | typeof Comment$1, children?: string | number | boolean): VNode;
export declare function h(type: typeof Text$1 | typeof Comment$1, props?: null, children?: string | number | boolean): VNode;
export declare function h(type: typeof Fragment, children?: VNodeArrayChildren): VNode;
export declare function h(type: typeof Fragment, props?: RawProps$1 | null, children?: VNodeArrayChildren): VNode;
export declare function h(type: typeof Teleport, props: RawProps$1 & TeleportProps, children: RawChildren | RawSlots$1): VNode;
export declare function h(type: typeof Suspense, children?: RawChildren): VNode;
export declare function h(type: typeof Suspense, props?: (RawProps$1 & SuspenseProps) | null, children?: RawChildren | RawSlots$1): VNode;
export declare function h<P, E extends EmitsOptions = {}, S extends Record<string, any> = any>(type: FunctionalComponent<P, any, S, any>, props?: (RawProps$1 & P) | ({} extends P ? null : never), children?: RawChildren | IfAny<S, RawSlots$1, S>): VNode;
export declare function h(type: Component, children?: RawChildren): VNode;
export declare function h<P>(type: ConcreteComponent | string, children?: RawChildren): VNode;
export declare function h<P>(type: ConcreteComponent<P> | string, props?: (RawProps$1 & P) | ({} extends P ? null : never), children?: RawChildren): VNode;
export declare function h<P>(type: Component<P>, props?: (RawProps$1 & P) | null, children?: RawChildren | RawSlots$1): VNode;
export declare function h<P>(type: ComponentOptions<P>, props?: (RawProps$1 & P) | ({} extends P ? null : never), children?: RawChildren | RawSlots$1): VNode;
export declare function h(type: Constructor, children?: RawChildren): VNode;
export declare function h<P>(type: Constructor<P>, props?: (RawProps$1 & P) | ({} extends P ? null : never), children?: RawChildren | RawSlots$1): VNode;
export declare function h(type: DefineComponent, children?: RawChildren): VNode;
export declare function h<P>(type: DefineComponent<P>, props?: (RawProps$1 & P) | ({} extends P ? null : never), children?: RawChildren | RawSlots$1): VNode;
export declare function h(type: string | Component, children?: RawChildren): VNode;
export declare function h<P>(type: string | Component<P>, props?: (RawProps$1 & P) | ({} extends P ? null : never), children?: RawChildren | RawSlots$1): VNode;
//#endregion
//#region packages/runtime-core/src/helpers/useSsrContext.d.ts
export declare const ssrContextKey: unique symbol;
export declare const useSSRContext: <T = Record<string, any>>() => T | undefined;
//#endregion
//#region packages/runtime-core/src/warning.d.ts
/**
* @internal
*/
declare function pushWarningContext(ctx: GenericComponentInstance | VNode): void;
/**
* @internal
*/
declare function popWarningContext(): void;
declare function warn$1(msg: string, ...args: any[]): void;
/**
* @internal
*/
export declare function assertNumber(val: unknown, type: string): void;
//#endregion
//#region packages/runtime-core/src/errorHandling.d.ts
export declare enum ErrorCodes {
  SETUP_FUNCTION = 0,
  RENDER_FUNCTION = 1,
  NATIVE_EVENT_HANDLER = 5,
  COMPONENT_EVENT_HANDLER = 6,
  VNODE_HOOK = 7,
  DIRECTIVE_HOOK = 8,
  TRANSITION_HOOK = 9,
  APP_ERROR_HANDLER = 10,
  APP_WARN_HANDLER = 11,
  FUNCTION_REF = 12,
  ASYNC_COMPONENT_LOADER = 13,
  SCHEDULER = 14,
  COMPONENT_UPDATE = 15,
  APP_UNMOUNT_CLEANUP = 16
}
declare const ErrorTypeStrings$1: Record<ErrorTypes, string>;
type ErrorTypes = LifecycleHooks | ErrorCodes | WatchErrorCodes;
export declare function callWithErrorHandling(fn: Function, instance: GenericComponentInstance | null | undefined, type: ErrorTypes, args?: unknown[]): any;
export declare function callWithAsyncErrorHandling(fn: Function | Function[], instance: GenericComponentInstance | null, type: ErrorTypes, args?: unknown[]): any;
export declare function handleError(err: unknown, instance: GenericComponentInstance | null | undefined, type: ErrorTypes, throwInDev?: boolean): void;
export declare function logError(err: unknown, type: ErrorTypes, instance: GenericComponentInstance | null | undefined, throwInDev?: boolean, throwInProd?: boolean): void;
//#endregion
//#region packages/runtime-core/src/customFormatter.d.ts
export declare function initCustomFormatter(): void;
//#endregion
//#region packages/runtime-core/src/hmr.d.ts
type HMRComponent = ComponentOptions | ClassComponent;
export interface HMRRuntime {
  createRecord: typeof createRecord;
  rerender: typeof rerender;
  reload: typeof reload;
}
declare function createRecord(id: string, initialDef: HMRComponent): boolean;
declare function rerender(id: string, newRender?: Function): void;
declare function reload(id: string, newComp: HMRComponent): void;
//#endregion
//#region packages/runtime-core/src/componentRenderContext.d.ts
/**
* Note: rendering calls maybe nested. The function returns the parent rendering
* instance if present, which should be restored after the render is done:
*
* ```js
* const prev = setCurrentRenderingInstance(i)
* // ...render
* setCurrentRenderingInstance(prev)
* ```
*/
declare function setCurrentRenderingInstance(instance: ComponentInternalInstance | null): ComponentInternalInstance | null;
/**
* Set scope id when creating hoisted vnodes.
* @private compiler helper
*/
export declare function pushScopeId(id: string | null): void;
/**
* Technically we no longer need this after 3.0.8 but we need to keep the same
* API for backwards compat w/ code generated by compilers.
* @private
*/
export declare function popScopeId(): void;
/**
* Only for backwards compat
* @private
*/
export declare const withScopeId: (_id: string) => typeof withCtx;
/**
* Wrap a slot function to memoize current rendering instance
* @private compiler helper
*/
export declare function withCtx(fn: Function, ctx?: ComponentInternalInstance | null, isNonScopedSlot?: boolean): Function;
//#endregion
//#region packages/runtime-core/src/helpers/renderList.d.ts
/**
* v-for string
* @private
*/
export declare function renderList(source: string, renderItem: (value: string, index: number) => VNodeChild): VNodeChild[];
/**
* v-for number
*/
export declare function renderList(source: number, renderItem: (value: number, index: number) => VNodeChild): VNodeChild[];
/**
* v-for array
*/
export declare function renderList<T>(source: T[], renderItem: (value: T, index: number) => VNodeChild): VNodeChild[];
/**
* v-for iterable
*/
export declare function renderList<T>(source: Iterable<T>, renderItem: (value: T, index: number) => VNodeChild): VNodeChild[];
/**
* v-for object
*/
export declare function renderList<T>(source: T, renderItem: <K extends keyof T>(value: T[K], key: string, index: number) => VNodeChild): VNodeChild[];
//#endregion
//#region packages/runtime-core/src/helpers/toHandlers.d.ts
/**
* For prefixing keys in v-on="obj" with "on"
* @private
*/
export declare function toHandlers(obj: Record<string, any>, preserveCaseIfNecessary?: boolean): Record<string, any>;
//#endregion
//#region packages/runtime-core/src/helpers/renderSlot.d.ts
/**
* Compiler runtime helper for rendering `<slot/>`
* @private
*/
export declare function renderSlot(slots: Slots, name: string, props?: Data, fallback?: () => VNodeArrayChildren, noSlotted?: boolean): VNode;
declare function ensureValidVNode(vnodes: VNodeArrayChildren): VNodeArrayChildren | null;
//#endregion
//#region packages/runtime-core/src/helpers/createSlots.d.ts
type SSRSlot = (...args: any[]) => VNode[] | undefined;
interface CompiledSlotDescriptor {
  name: string;
  fn: SSRSlot;
  key?: string;
}
/**
* Compiler runtime helper for creating dynamic slots object
* @private
*/
export declare function createSlots(slots: Record<string, SSRSlot>, dynamicSlots: (CompiledSlotDescriptor | CompiledSlotDescriptor[] | undefined)[]): Record<string, SSRSlot>;
//#endregion
//#region packages/runtime-core/src/helpers/withMemo.d.ts
export declare function withMemo(memo: any[], render: () => VNode<any, any>, cache: any[], index: number): VNode<any, any>;
export declare function isMemoSame(cached: VNode, memo: any[]): boolean;
//#endregion
//#region packages/runtime-core/src/componentRenderUtils.d.ts
declare function renderComponentRoot(instance: ComponentInternalInstance): VNode;
//#endregion
//#region packages/runtime-core/src/compat/globalConfig.d.ts
export type LegacyConfig = {
  /**
  * @deprecated `config.silent` option has been removed
  */
  silent?: boolean;
  /**
  * @deprecated use __VUE_PROD_DEVTOOLS__ compile-time feature flag instead
  * https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags
  */
  devtools?: boolean;
  /**
  * @deprecated use `config.isCustomElement` instead
  * https://v3-migration.vuejs.org/breaking-changes/global-api.html#config-ignoredelements-is-now-config-iscustomelement
  */
  ignoredElements?: (string | RegExp)[];
  /**
  * @deprecated
  * https://v3-migration.vuejs.org/breaking-changes/keycode-modifiers.html
  */
  keyCodes?: Record<string, number | number[]>;
  /**
  * @deprecated
  * https://v3-migration.vuejs.org/breaking-changes/global-api.html#config-productiontip-removed
  */
  productionTip?: boolean;
};
//#endregion
//#region packages/runtime-core/src/compat/instance.d.ts
type LegacyPublicInstance = ComponentPublicInstance$1 & LegacyPublicProperties;
interface LegacyPublicProperties {
  $set<T extends Record<keyof any, any>, K extends keyof T>(target: T, key: K, value: T[K]): void;
  $delete<T extends Record<keyof any, any>, K extends keyof T>(target: T, key: K): void;
  $mount(el?: string | Element): this;
  $destroy(): void;
  $scopedSlots: Slots;
  $on(event: string | string[], fn: Function): this;
  $once(event: string, fn: Function): this;
  $off(event?: string | string[], fn?: Function): this;
  $children: LegacyPublicProperties[];
  $listeners: Record<string, Function | Function[]>;
}
//#endregion
//#region packages/runtime-core/src/compat/global.d.ts
/**
* @deprecated the default `Vue` export has been removed in Vue 3. The type for
* the default export is provided only for migration purposes. Please use
* named imports instead - e.g. `import { createApp } from 'vue'`.
*/
export type CompatVue = Pick<App, "version" | "component" | "directive"> & {
  configureCompat: typeof configureCompat;
  new (options?: ComponentOptions): LegacyPublicInstance;
  version: string;
  config: AppConfig & LegacyConfig;
  nextTick: typeof nextTick;
  use<Options extends unknown[]>(plugin: Plugin<Options>, ...options: Options): CompatVue;
  use<Options>(plugin: Plugin<Options>, options: Options): CompatVue;
  mixin(mixin: ComponentOptions): CompatVue;
  component(name: string): Component | undefined;
  component(name: string, component: Component): CompatVue;
  directive<T = any, V = any>(name: string): Directive<T, V> | undefined;
  directive<T = any, V = any>(name: string, directive: Directive<T, V>): CompatVue;
  compile(template: string): RenderFunction;
  /**
  * @deprecated Vue 3 no longer supports extending constructors.
  */
  extend: (options?: ComponentOptions) => CompatVue;
  /**
  * @deprecated Vue 3 no longer needs set() for adding new properties.
  */
  set(target: any, key: PropertyKey, value: any): void;
  /**
  * @deprecated Vue 3 no longer needs delete() for property deletions.
  */
  delete(target: any, key: PropertyKey): void;
  /**
  * @deprecated use `reactive` instead.
  */
  observable: typeof reactive;
  /**
  * @deprecated filters have been removed from Vue 3.
  */
  filter(name: string, arg?: any): null;
  /**
  * @internal
  */
  cid: number;
  /**
  * @internal
  */
  options: ComponentOptions;
  /**
  * @internal
  */
  util: any;
  /**
  * @internal
  */
  super: CompatVue;
};
declare function createCompatVue(createApp: CreateAppFunction<Element>, createSingletonApp: CreateAppFunction<Element>): CompatVue;
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
//#region node_modules/.pnpm/@dcloudio+uni-app-x@0.7.97/node_modules/@dcloudio/uni-app-x/types/native/CSSStyleDeclaration.d.ts
/**
 * CSSStyleDeclaration表示一个CSS 声明块对象，它是一个 CSS 属性键值对的集合，暴露样式信息和各种与样式相关的方法和属性。
 * @package io.dcloud.uniapp.runtime
 * @uniPlatform {
 *    "app": {
 *        "android": {
 *            "osVer": "5.0",
 *            "uniVer": "x",
 *            "unixVer": "3.9"
 *        },
 *        "ios": {
 *            "osVer": "12.0",
 *            "uniVer": "x",
 *            "unixVer": "4.11"
 *        },
 *        "harmony": {
 *            "osVer": "5.0.0",
 *            "uniVer": "x",
 *            "unixVer": "4.61",
 *            "unixvVer": "4.61"
 *        }
 *    },
 *    "web": {
 *        "uniVer": "x",
 *        "unixVer": "4.0"
 *    }
 * }
 */
declare class CSSStyleDeclaration {
  /**
   * 对CSS指定样式设置一个新值，如有此样式已存在则更新。
   * @param name CSS样式名称
   * @param {string} [value=""] 要设置的新CSS样式值 默认值空字符串
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "harmony": {
   *            "osVer": "5.0.0",
   *            "uniVer": "x",
   *            "unixVer": "4.61"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "4.41"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  setProperty(name: string | string.cssPropertyString, value?: string): void;
  /**
   * 对CSS指定样式设置一个新值，如有此样式已存在则更新。
   * @param name CSS样式名称
   * @param value 要设置的新CSS样式值
   * @deprecated 已废弃，仅为了向下兼容保留
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "3.9"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.11"
   *        },
   *        "harmony": {
   *            "osVer": "5.0.0",
   *            "uniVer": "x",
   *            "unixVer": "4.61"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "4.41"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  setProperty(name: string | string.cssPropertyString, value: any | null): void;
  /**
   * 获取CSS指定的样式值，如果指定的样式不存在则返回空字符串。
   * @param property 要获取的CSS样式名称
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "harmony": {
   *            "osVer": "5.0.0",
   *            "uniVer": "x",
   *            "unixVer": "4.61"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "4.41"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  getPropertyValue(property: string | string.cssPropertyString): string;
  /**
   * 删除CSS指定的样式值
   * @param property 要删除的CSS样式名称
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "harmony": {
   *            "osVer": "5.0.0",
   *            "uniVer": "x",
   *            "unixVer": "4.61",
   *            "unixvVer": "x"
   *        }
   *    }
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  removeProperty(property: string | string.cssPropertyString): string;
}
//#endregion
//#region node_modules/.pnpm/@dcloudio+uni-app-x@0.7.97/node_modules/@dcloudio/uni-app-x/types/native/UniCallbackWrapper.d.ts
/**
 * 事件回调封装类，用于注销监听函数的形参
 * @package io.dcloud.uts
 */
declare class UniCallbackWrapper {}
//#endregion
//#region node_modules/.pnpm/@dcloudio+uni-app-x@0.7.97/node_modules/@dcloudio/uni-app-x/types/native/IUniElement.d.ts
type GetBoundingClientRectAsyncSuccessCallback = (rect: DOMRect) => void;
type GetBoundingClientRectAsyncFailCallback = () => void;
type GetBoundingClientRectAsyncCompleteCallback = (rect: any | null) => void;
type GetBoundingClientRectAsyncOptions = {
  success?: GetBoundingClientRectAsyncSuccessCallback | null;
  fail?: GetBoundingClientRectAsyncFailCallback | null;
  complete?: GetBoundingClientRectAsyncCompleteCallback | null;
};
declare global {
  /**
   * 所有组件的 DOM 元素对象基类，描述了 UVUE DOM 元素所普通具有的属性和方法。
   * @package io.dcloud.uniapp.runtime
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.0"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.11"
   *        },
   *        "harmony": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.61",
   *            "unixvVer": "5.0"
   *        }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  interface UniElement {
    /**
     * 只读属性 节点是否与 DOM 树连接
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixUtsPlugin": "x"
     *        },
     *        "harmony": {
     *            "osVer": "12",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly isConnected: boolean;
    /**
     * 只读属性 节点是否与 DOM 树连接
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixUtsPlugin": "x"
     *        },
     *        "harmony": {
     *            "osVer": "12",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixvVer": "5.0"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    readonly id: string;
    /**
     * 元素所属的页面对象
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *         },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixUtsPlugin": "x"
     *        },
     *        "harmony": {
     *           "osVer": "12",
     *           "uniVer": "x",
     *           "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly uniPage: UniPage$1;
    /**
     * 只读属性 获取当前元素的的 class 属性的动态集合。
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    classList: string[];
    /**
     * 只读属性 获取当前元素的的第一个子元素，如果元素是无子元素，则返回 null。
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly firstChild: UniElement$2 | null;
    /**
     * 只读属性 获取当前元素的最后一个子元素，如果没有子元素，则返回 null。
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly lastChild: UniElement$2 | null;
    /**
     * 只读属性 获取当前元素在 DOM 树中的父元素，如果没有父元素（如未添加到DOM树中），则返回null。
     * @internal
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly parentNode: UniElement$2 | null;
    /**
     * 只读属性 获取当前元素在 DOM 树中的父元素，如果没有父元素（如未添加到DOM树中），则返回null。
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly parentElement: UniElement$2 | null;
    /**
     * 只读属性 获取当前元素的前一个同级元素，没有则返回null。
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly previousSibling: UniElement$2 | null;
    /**
     * 只读属性 获取在 DOM 树中紧跟在其后面的同级元素，如果指定的元素为最后一个元素，则返回 null。
     * @internal
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly nextSibling: UniElement$2 | null;
    /**
     * 只读属性 获取在 DOM 树中紧跟在其后面的同级元素，如果指定的元素为最后一个元素，则返回 null。
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly nextElementSibling: UniElement$2 | null;
    /**
     * 只读属性 获取当前元素包含的子元素的集合
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly children: UniElement$2[];
    /**
     * 只读属性 获取当前节点包含的子节点的集合
     * @internal
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly childNodes: UniElement$2[];
    /**
     * 只读属性 获取当前元素的标签名
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "5.0"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "4.41"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly tagName: string;
    /**
     * 只读属性 获取当前元素的元素名称
     * @uniPlatform {
     *    "app": {
     *      "android": {
     *        "osVer": "5.0",
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *      },
     *      "ios": {
     *        "osVer": "12.0",
     *        "uniVer": "x",
     *        "unixVer": "4.11",
     *        "unixUtsPlugin": "4.25"
     *      },
     *      "harmony": {
     *          "osVer": "5.0",
     *          "uniVer": "x",
     *          "unixVer": "4.61",
     *          "unixvVer": "x"
     *      }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly nodeName: string;
    /**
     * 只读属性 获取元素上自定义数据属性（data-*）的集合
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "x"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "5.0"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "4.41 仅在event对象内的target上可用"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly dataset: Map<string, any | null>;
    /**
     * 只读属性 获取元素上所有属性元素的集合
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly attributes: Map<string, any | null>;
    /**
     * 只读属性 获取元素的CSS样式对象
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "5.0"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "4.41"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly style: CSSStyleDeclaration;
    /**
     * 只读属性 获取可滚动元素内容的总宽度，仅scroll-view、list-view组件支持，其他组件返回视图宽度
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly scrollWidth: number;
    /**
     * 只读属性 获取可滚动元素内容的总高度，仅scroll-view、list-view组件支持，其他组件返回视图高度
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly scrollHeight: number;
    /**
     * 获取或修改元素滚动条到元素左边的距离像素数，仅scroll-view、list-view组件支持。其他组件返回0
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    scrollLeft: number;
    /**
     * 获取或修改元素滚动条到元素顶部的距离像素数，仅scroll-view、list-view组件支持。其他组件返回0
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    scrollTop: number;
    /**
     * 只读属性 元素的左边界偏移值 单位px
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "4.41 仅在event对象内的target上可用"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly offsetLeft: number;
    /**
     * 只读属性 元素的顶部边界偏移值 单位px
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "4.41 仅在event对象内的target上可用"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly offsetTop: number;
    /**
     * 只读属性 元素的布局宽度，宽度包含border、padding的数据值 单位px
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly offsetWidth: number;
    /**
     * 只读属性 元素的布局高度，高度包含border、padding的数据值 单位px
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    readonly offsetHeight: number;
    /**
     * 只读属性 扩展属性
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "x"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixVer": "5.0"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     * @internal
     */
    readonly ext: Map<string, any | null>;
    /**
     * 只读属性 字符串形式返回一个元素内部所有子节点（不包括注释节点）的 HTML 内容
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.84"
     *        },
     *        "ios": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixUtsPlugin": "x"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    readonly innerHTML: string;
    /**
     * 获取元素标识。
     * @internal
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    getNodeId(): number;
    /**
     * 对当前组件进行截图，调用此方法会将当前组件（包含子节点）渲染结果导出成图片。
     * 成功会返回图片对应的临时文件路径，目前默认png格式
     *
     * @param options 组件截图的参数对象
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/dom/unielement.html#takesnapshot
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.93"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    takeSnapshot(options: TakeSnapshotOptions): void;
    /**
     * 将一个元素添加到指定父元素的子元素列表的末尾处。如果将被插入的元素已经存在于当前文档的文档树中，那么将会它从原先的位置移动到新的位置。
     * @param {UniElement} aChild 插入子元素对象
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    appendChild(aChild: UniElement$2): void;
    /**
     * 在参考元素之前插入一个拥有指定父元素的子元素。如果给定的子元素是对文档中现有元素的引用，insertBefore() 会将其从当前位置移动到新位置。
     * @param newChild 插入子元素对象
     * @param refChild 已存在父元素的子元素对象
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    insertBefore(newChild: UniElement$2, refChild?: UniElement$2 | null): UniElement$2 | null;
    /**
     * 将一个元素添加到指定父元素的子元素列表的末尾处 功能等同于appendChild
     * @param newChild 插入子元素对象
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    insertBefore(newChild: UniElement$2): UniElement$2 | null;
    /**
     * 设置指定元素上的某个属性值。如果设置的属性已经存在，则更新该属性值；否则使用指定的名称和值添加一个新的属性。
     * @param {string} key 属性名称
     * @param {string} value 属性值域
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    setAttribute(key: string, value: string): void;
    /**
     * 设置指定元素上的某个属性值。功能等同setAttribute value支持任意类型
     * @param {string} key 属性名称
     * @param {string} value 属性值域
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    setAnyAttribute(key: string, value: any): void;
    /**
     * 获取元素指定的属性值，如果指定的属性不存在则返回null。
     * @param {string} key 属性名称
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "4.41"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    getAttribute(key: string): string | null;
    /**
     * 返回元素上一个指定的属性值。如果指定的属性不存在，则返回 null
     * @param {string} key 属性名称
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    getAnyAttribute(key: string): any | null;
    /**
     * 返回该元素是否包含有指定的属性，属性存在则返回true，否则返回false。
     * @param {string} key 属性名称
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    hasAttribute(key: string): boolean;
    /**
     * 从元素中删除一个属性，如果指定的属性不存在，则不做任何操作，也不会产生错误。
     * @param {string} key 属性名称
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    removeAttribute(key: string): void;
    /**
     * 更新元素的样式。
     * @internal
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    updateStyle(map: Map<string, any | null>): void;
    /**
     * 获取元素的大小及其相对于窗口的位置信息。
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    getBoundingClientRect(): DOMRect;
    /**
     * 获取元素的大小及其相对于窗口的位置信息 异步。
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.41"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.41",
     *            "unixUtsPlugin": "x"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "4.41"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.41"
     *    }
     * }
     */
    getBoundingClientRectAsync(options?: GetBoundingClientRectAsyncOptions | null): Promise<DOMRect> | null;
    /**
     * 获取组件的绘制对象，仅uvue页面中的 view 组件支持，其它组件不支持则返回null。
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9+"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    getDrawableContext(): DrawableContext | null;
    /**
     * 将指定的监听器注册到元素对象上，当该对象触发指定的事件时，指定的回调函数就会被执行。
     * @param {string} type 事件类型
     * @param {(event: T) => R} callback 事件监听器 T表示event类型，R表示返回值类型
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixUtsPlugin": "x"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    addEventListener<T extends UniEvent$1, R>(type: string, callback: (event: T) => R): UniCallbackWrapper;
    /**
     * 删除使用 addEventListener 方法添加的事件监听器。
     * @param type 事件类型
     * @param callbackWrapper 事件监听回调封装类
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixUtsPlugin": "x"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    removeEventListener(type: string, callbackWrapper: UniCallbackWrapper): void;
    /**
     * 从元素中删除一个子元素，返回删除的元素。
     * @param {UniElement} aChild 被删除子元素对象
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    removeChild(aChild: UniElement$2): UniElement$2 | null;
    /**
     * 把元素对象从它所属的 DOM 树中删除。
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    remove(): void;
    /**
     * 向一个指定的事件目标派发一个 Event，并以合适的顺序（同步地）调用此事件的监听器回调函数。
     * @internal
     * @param {string} type 事件类型
     * @param {UniEvent} value 事件返回对象
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    dispatchEvent(type: string, value: UniEvent$1): void;
    /**
     * 向一个指定的事件目标派发一个 Event，并以合适的顺序（同步地）调用此事件的监听器回调函数。
     * @param {UniEvent} value 事件返回对象
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.25"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.25",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    dispatchEvent(value: UniEvent$1): void;
    /**
     * 使界面滚动到给定元素的指定坐标位置 仅scroll-view、list-view组件支持
     * @param {number} x x轴要滚动到坐标位置(单位px)
     * @param {number} y y轴要滚动到坐标位置(单位px)
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    scrollTo(x: number, y: number): void;
    /**
     * 使得元素滚动一段特定距离 仅scroll-view、list-view组件支持
     * @param {number} x x轴要滚动的距离(单位px)
     * @param {number} y y轴要滚动的距离(单位px)
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    scrollBy(x: number, y: number): void;
    /**
     * 返回文档中与指定选择器或选择器组匹配的第一个 Element对象。如果找不到匹配项，则返回null
     * @param {string.cssSelectorString}selector CSS 选择器字符串
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    querySelector(selector: string.cssSelectorString): UniElement$2 | null;
    /**
     * 返回与指定的选择器组匹配的文档中的元素列表
     * @param {string.cssSelectorString}selector CSS 选择器字符串
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    querySelectorAll(selector: string.cssSelectorString): UniElement$2[] | null;
    /**
     * 使元素获取焦点 仅input、Textarea组件支持
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *      },
     *      "harmony": {
     *          "osVer": "5.0",
     *          "uniVer": "x",
     *          "unixVer": "4.81",
     *          "unixvVer": "x"
     *      }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    focus(): void;
    /**
     * 使元素丢失焦点 仅input、Textarea组件支持
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *      },
     *      "harmony": {
     *          "osVer": "5.0",
     *          "uniVer": "x",
     *          "unixVer": "4.81",
     *          "unixvVer": "x"
     *      }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    blur(): void;
    /**
     * 获取元素ios原生view
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    getIOSView(): UIView | null;
    /**
     * 获取元素android原生view 可能返回null
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.25"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    getAndroidView(): View | null;
    /**
     * 获取元素android原生view 通过泛型定义view类型 可能返回null
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.25"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixUtsPlugin": "x"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    getAndroidView<T>(): T | null;
    /**
     * 获取元素android原生activity 可能返回null
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.25"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixUtsPlugin": "x"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    getAndroidActivity(): Activity | null;
    /**
     * 获取元素所属的页面对象
     * @deprecated 请使用 uniPage 属性
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.31"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.31"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.31"
     *    }
     * }
     */
    getPage(): UniPage$1 | null;
    /**
     * 创建一个新的动画并应用于元素，然后立即执行动画。
     * @param {any} keyframes 关键帧对象数组或一个关键帧对象。
     * @param {any} options 动画属性配置。
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.51"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.53"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "4.53"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "√"
     *    }
     * }
     */
    animate(keyframes: UniAnimationKeyframe | UniAnimationKeyframe[], options: UniAnimationOption | number): UniAnimation | null;
    /**
     * 鸿蒙原生组件控制器，可以控制组件的状态。可能返回null
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *        },
     *        "ios": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *        },
     *        "harmony": {
     *            "osVer": "5.0.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    getHarmonyController(): any | null;
    /**
     * 鸿蒙原生组件控制器，可以控制组件的状态。通过泛型定义view类型，可能返回null
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *        },
     *        "ios": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *        },
     *        "harmony": {
     *            "osVer": "5.0.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    getHarmonyController<T>(): T | null;
    /**
     * 控制元素进入全屏状态
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        },
     *         "harmony": {
     *            "osVer": "5.0.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    requestFullscreen(options?: RequestFullscreenOptions | null): void;
    /**
     * 元素模拟点击
     * @internal
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.81"
     *        },
     *         "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "osVer": "x",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    testClick(): void;
  }
}
type RequestFullscreenOptions = {
  /**
   *全屏模式时导航栏状态
   */
  navigationUI?:
  /**
   * 隐藏所有系统状态栏和底部导航栏
   */
  "hide" |
  /**
   *隐藏顶部系统状态栏，显示底部系统导航栏
   */
  "show" |
  /**
   *系统默认行为
   */
  "auto" | null;
  /**
   *全屏显示方向
   */
  orientation?:
  /**
   *根据重力感应自动调整
   */
  "auto" |
  /**
   *固定为横屏，会根据重力调整方向
   */
  "landscape" |
  /**
   *固定为反向横屏
   */
  "landscape-secondary" |
  /**
   *固定为正向横屏
   */
  "landscape-primary" |
  /**
   *固定为竖屏
   */
  "portrait" | null;
  /**
   *成功回调
   */
  success: RequestFullscreenSuccessCallback | null;
  /**
   *失败回调
   */
  fail: RequestFullscreenFailCallback | null;
  /**
   *完成回调
   */
  complete: RequestFullscreenCompleteCallback | null;
};
/**
 * 错误码
 */
type FullscreenErrorCode =
/**
 * 当前页面已经有element处于全屏状态
 */
106600 |
/**
 * 当前element不支持全屏
 */
106601 |
/**
 * 当前页面没有element处于全屏状态
 */
106602 |
/**
 * 页面已销毁或者尚未就绪
 */
106603 |
/**
 * 组件未就绪
 */
106604;
interface IFullscreenError extends IUniError {
  errCode: FullscreenErrorCode;
}
type FullscreenError = IFullscreenError;
type RequestFullscreenSuccessCallback = () => void;
type RequestFullscreenFailCallback = (error: FullscreenError) => void;
type RequestFullscreenCompleteCallback = (result: any | null) => void;
type UniAnimationKeyframe = {
  /**
   * 控制宽度属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  width?: string[] | string | null;
  /**
   * 控制高度属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  height?: string[] | string | null;
  /**
   * 控制外边距属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  margin?: string[] | string | null;
  /**
   * 控制上外边距属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  marginTop?: string[] | string | null;
  /**
   * 控制下外边距属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  marginBottom?: string[] | string | null;
  /**
   * 控制左外边距属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  marginLeft?: string[] | string | null;
  /**
   * 控制右外边距属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  marginRight?: string[] | string | null;
  /**
   * 控制左侧位置属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  left?: string[] | string | null;
  /**
   * 控制右侧位置属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  right?: string[] | string | null;
  /**
   * 控制顶部位置属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  top?: string[] | string | null;
  /**
   * 控制底部位置属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  bottom?: string[] | string | null;
  /**
   * 控制内边距属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  padding?: string[] | string | null;
  /**
   * 控制左内边距属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  paddingLeft?: string[] | string | null;
  /**
   * 控制右内边距属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  paddingRight?: string[] | string | null;
  /**
   * 控制上内边距属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  paddingTop?: string[] | string | null;
  /**
   * 控制下内边距属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  paddingBottom?: string[] | string | null;
  /**
   * 控制透明度属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  opacity?: string[] | string | null;
  /**
   * 控制背景颜色属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  backgroundColor?: string[] | string | null;
  /**
   * 控制边框颜色属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  borderColor?: string[] | string | null;
  /**
   * 控制上边框颜色属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  borderTopColor?: string[] | string | null;
  /**
   * 控制下边框颜色属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  borderBottomColor?: string[] | string | null;
  /**
   * 控制左边框颜色属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  borderLeftColor?: string[] | string | null;
  /**
   * 控制右边框颜色属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  borderRightColor?: string[] | string | null;
  /**
   * 控制变换属性的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  transform?: string[] | string | null;
  /**
   * 控制元素变形的原点的过渡效果
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  transformOrigin?: string[] | string | null;
  /**
   * 关键帧的偏移量。为0.0和1.0之间的数字。如果此值缺失，则关键帧将在相邻关键帧之间均匀分布。
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  offset?: number | null;
};
type UniAnimationOptionDirection =
/**
 * 正向运行
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
 */
"normal" |
/**
 * 反向运行
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "x"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "x"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
 */
"reverse" |
/**
 * 每次迭代后切换方向
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
 */
"alternate" |
/**
 * 反向运行并在每次迭代后切换方向
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "x"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "x"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
 */
"alternate-reverse";
type UniAnimationOptionEasing = "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear" | "cubic-bezier";
type UniAnimationOptionFill =
/**
 * 动画播放完毕后恢复初始状态
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "x"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "x"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
 */
"backwards" |
/**
 * 动画播放完毕后保留状态
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
 */
"forwards" |
/**
 * 动画播放完毕后保留状态
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "x"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "x"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
 */
"both" |
/**
 * 动画播放完毕后恢复初始状态
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "x"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "x"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
 */
"none";
type UniAnimationOption = {
  /**
   * 动画延迟的毫秒数
   * @defaultValue 0
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  delay?: number | null;
  /**
   * 动画运行方向
   * @defaultValue normal
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  direction?: UniAnimationOptionDirection | null;
  /**
   * 动画时长
   * @defaultValue 0
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  duration?: number | null;
  /**
   * 动画曲线。
   * @defaultValue linear
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  easing?: UniAnimationOptionEasing | null;
  /**
   * 决定动画效果是否应在播放前反映在元素中
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  fill?: UniAnimationOptionFill | null;
  /**
   * 动画重复的次数。当设置为`Infinity`时，动画将一直重复执行。
   * @defaultValue 1
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  iterations?: number | null;
};
type Element$1 = UniElement$2;
declare global {
  /**
   * view 组件的 DOM 元素对象。
   * @package io.dcloud.uniapp.runtime
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.0"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.11",
   *            "unixUtsPlugin": "4.25"
   *        },
   *        "harmony": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.61"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  interface UniViewElement extends UniElement$2 {}
}
declare global {
  /**
   * scroll-view 组件的 DOM 元素对象。
   * @package io.dcloud.uniapp.runtime
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.0"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.11",
   *            "unixUtsPlugin": "4.25"
   *        },
   *        "harmony": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.61"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "osVer": "x",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  interface UniScrollViewElement extends UniElement$2 {}
}
/**
 * list-view 组件的 DOM 元素对象。
 * @package io.dcloud.uniapp.runtime
 * @uniPlatform {
 *    "app": {
 *        "android": {
 *            "osVer": "5.0",
 *            "uniVer": "x",
 *            "unixVer": "4.0"
 *        },
 *        "ios": {
 *            "osVer": "12.0",
 *            "uniVer": "x",
 *            "unixVer": "4.11",
 *            "unixUtsPlugin": "4.25"
 *         },
 *        "harmony": {
 *            "osVer": "5.0",
 *            "uniVer": "x",
 *            "unixVer": "4.61"
 *        }
 *    },
 *    "mp": {
 *      "weixin": {
 *        "osVer": "x",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      }
 *    },
 *    "web": {
 *        "uniVer": "x",
 *        "unixVer": "4.0"
 *    }
 * }
 */
declare global {
  /**
   * image 组件的 DOM 元素对象。
   * @package io.dcloud.uniapp.runtime
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.0"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.11",
   *            "unixUtsPlugin": "4.25"
   *        },
   *        "harmony": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.61"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "alipay": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "baidu": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "toutiao": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "lark": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "qq": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "kuaishou": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "jd": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  interface UniImageElement extends UniElement$2 {
    /**
     * 图片url
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "√",
     *            "unixVer": "4.25"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "√",
     *            "unixVer": "4.25",
     *            "unixUtsPlugin": "x"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    src: string.ImageURIString;
  }
}
/**
 * 图片对象, 用于 canvas 绘制图片。
 * @package io.dcloud.uniapp.runtime
 * @uniPlatform {
 *    "app": {
 *        "android": {
 *            "osVer": "5.0",
 *            "uniVer": "x",
 *            "unixVer": "4.25"
 *        },
 *        "ios": {
 *            "osVer": "12.0",
 *            "uniVer": "x",
 *            "unixVer": "4.25"
 *        },
 *        "harmony": {
 *            "osVer": "5.0",
 *            "uniVer": "x",
 *            "unixVer": "4.61",
 *            "unixvVer": "5.0"
 *        }
 *    },
 *    "mp": {
 *      "weixin": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      },
 *      "alipay": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      },
 *      "baidu": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      },
 *      "toutiao": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      },
 *      "lark": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      },
 *      "qq": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      },
 *      "kuaishou": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      },
 *      "jd": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      }
 *    },
 *    "web": {
 *        "uniVer": "√",
 *        "unixVer": "4.0"
 *    }
 * }
 */
declare global {
  /**
   * text 组件的 DOM 元素对象。
   * @package io.dcloud.uniapp.runtime
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.0"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.11"
   *            "unixUtsPlugin": "4.25"
   *        },
   *        "harmony": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.61",
   *            "unixvVer": "5.0"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "alipay": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "baidu": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "toutiao": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "lark": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "qq": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "kuaishou": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "jd": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  interface UniTextElement extends UniElement$2 {
    /**
     * 只读属性 text元素的文案内容
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "5.0"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    value: string;
    /**
     * @internal
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.0"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixUtsPlugin": "4.25"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "4.0"
     *    }
     * }
     */
    getTextExtra(): any | null;
    /**
     * 设置文本内容
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.81"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *            "unixUtsPlugin": "x"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    setTextLayout(layout: UniTextLayout$1): void;
    /**
     * 获取内容宽高
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.81"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *            "unixUtsPlugin": "x"
     *        },
     *        "harmony": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "x",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    getContentSize(): UniLayoutSize$1;
  }
}
// 允许instanceof检查
declare let UniElement$2: {
  prototype: UniElement$2;
  new (): UniElement$2;
};
//#endregion
//#region node_modules/.pnpm/@dcloudio+uni-app-x@0.7.97/node_modules/@dcloudio/uni-app-x/types/native/UniEvent.d.ts
/**
 * @package io.dcloud.uniapp.runtime
 */
declare class UniEvent$1 {
  /**
   * 创建一个新的事件对象
   * @param {string} type 事件的名称
   */
  constructor(type: string);
  /**
   * 创建一个新的事件对象
   * @param {string} type 事件的名称
   * @param {string} eventInit 事件初始参数。支持字段：`bubbles`表明该事件是否冒泡。可选，默认为false；`cancelable`表明该事件是否可以被取消。可选，默认为false。
   */
  constructor(type: string, eventInit: UTSJSONObject);
  /**
   * 是否冒泡
   */
  bubbles: boolean;
  /**
   * 是否可以取消
   */
  cancelable: boolean;
  /**
   * 事件类型
   *
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "3.9"
   *        },
   *        "harmony": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.61"
   *        }
   *    },
   *    "web": {
   *        "uniVer": "√",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  type: string;
  /**
   * 触发事件的组件
   *
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "3.9"
   *        },
   *        "harmony": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.61"
   *        }
   *    },
   *    "web": {
   *        "uniVer": "√",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  target?: UniElement$2 | null;
  /**
   * 当前组件
   *
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "3.9"
   *        },
   *        "harmony": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.61"
   *        }
   *    },
   *    "web": {
   *        "uniVer": "√",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  currentTarget?: UniElement$2 | null;
  /**
   * 事件发生时的时间戳
   *
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "3.9"
   *        },
   *        "harmony": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.61"
   *        }
   *    },
   *    "web": {
   *        "uniVer": "√",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  timeStamp: number;
  /**
   * 阻止当前事件的进一步传播
   *
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "3.9"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.0"
   *        },
   *        "harmony": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.61"
   *        }
   *    },
   *    "web": {
   *        "uniVer": "√",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  stopPropagation(): void;
  /**
   * 阻止当前事件的默认行为
   *
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "3.9"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.55"
   *        },
   *        "harmony": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.61"
   *        }
   *    },
   *    "web": {
   *        "uniVer": "√",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  preventDefault(): void;
}
//#endregion
//#region node_modules/.pnpm/@dcloudio+uni-app-x@0.7.97/node_modules/@dcloudio/uni-app-x/types/native/DOMRect.d.ts
/**
 * 一个 DOMRect 代表一个矩形。
 * @package io.dcloud.uniapp.runtime
 * @uniPlatform {
 *    "app": {
 *        "android": {
 *            "osVer": "5.0",
 *            "uniVer": "x",
 *            "unixVer": "3.9"
 *        },
 *        "ios": {
 *            "osVer": "12.0",
 *            "uniVer": "x",
 *            "unixVer": "4.11"
 *   	  },
 *        "harmony": {
 *           "osVer": "5.0.0",
 *           "uniVer": "x",
 *           "unixVer": "4.61"
 *        }
 *    },
 *    "mp": {
 *      "weixin": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "4.11"
 *      },
 *      "alipay": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      },
 *      "baidu": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      },
 *      "toutiao": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      },
 *      "lark": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      },
 *      "qq": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      },
 *      "kuaishou": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      },
 *      "jd": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      }
 *    },
 *    "web": {
 *        "uniVer": "x",
 *        "unixVer": "4.0"
 *    }
 * }
 */
declare class DOMRect {
  /**
   * 创建一个新的 DOMRect 对象
   * @param {number} [x=0] 矩形原点的x坐标
   * @param {number} [y=0] 矩形原点的y坐标
   * @param {number} [width=0] 矩形的宽
   * @param {number} [height=0] 矩形的高
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "3.9"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.11"
   *   	  },
   *        "harmony": {
   *           "osVer": "5.0.0",
   *           "uniVer": "x",
   *           "unixVer": "4.61"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "4.11"
   *      },
   *      "alipay": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "baidu": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "toutiao": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "lark": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "qq": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "kuaishou": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "jd": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  constructor(x?: number, y?: number, width?: number, height?: number);
  /**
   * 矩形的宽
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "3.9"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.11"
   *   	  },
   *        "harmony": {
   *           "osVer": "5.0.0",
   *           "uniVer": "x",
   *           "unixVer": "4.61"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "4.11"
   *      },
   *      "alipay": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "baidu": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "toutiao": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "lark": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "qq": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "kuaishou": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "jd": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  width: number;
  /**
   * 矩形的高
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "3.9"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.11"
   *   	  },
   *        "harmony": {
   *           "osVer": "5.0.0",
   *           "uniVer": "x",
   *           "unixVer": "4.61"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "4.11"
   *      },
   *      "alipay": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "baidu": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "toutiao": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "lark": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "qq": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "kuaishou": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "jd": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  height: number;
  /**
   * 矩形原点的x坐标
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "3.9"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.11"
   *   	  },
   *        "harmony": {
   *           "osVer": "5.0.0",
   *           "uniVer": "x",
   *           "unixVer": "4.61"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "4.11"
   *      },
   *      "alipay": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "baidu": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "toutiao": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "lark": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "qq": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "kuaishou": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "jd": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  x: number;
  /**
   * 矩形原点的y坐标
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "3.9"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.11"
   *   	  },
   *        "harmony": {
   *           "osVer": "5.0.0",
   *           "uniVer": "x",
   *           "unixVer": "4.61"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "4.11"
   *      },
   *      "alipay": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "baidu": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "toutiao": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "lark": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "qq": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "kuaishou": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "jd": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  y: number;
  /**
   * 矩形的左坐标值
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "3.9"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.11"
   *   	  },
   *        "harmony": {
   *           "osVer": "5.0.0",
   *           "uniVer": "x",
   *           "unixVer": "4.61"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "4.11"
   *      },
   *      "alipay": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "baidu": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "toutiao": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "lark": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "qq": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "kuaishou": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "jd": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  left: number;
  /**
   * 矩形的右坐标值
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "3.9"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.11"
   *   	  },
   *        "harmony": {
   *           "osVer": "5.0.0",
   *           "uniVer": "x",
   *           "unixVer": "4.61"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "4.11"
   *      },
   *      "alipay": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "baidu": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "toutiao": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "lark": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "qq": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "kuaishou": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "jd": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  right: number;
  /**
   * 矩形的顶坐标值
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "3.9"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.11"
   *   	  },
   *        "harmony": {
   *           "osVer": "5.0.0",
   *           "uniVer": "x",
   *           "unixVer": "4.61"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "4.11"
   *      },
   *      "alipay": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "baidu": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "toutiao": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "lark": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "qq": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "kuaishou": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "jd": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  top: number;
  /**
   * 矩形的底坐标值
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "3.9"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.11"
   *   	  },
   *        "harmony": {
   *           "osVer": "5.0.0",
   *           "uniVer": "x",
   *           "unixVer": "4.61"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "4.11"
   *      },
   *      "alipay": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "baidu": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "toutiao": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "lark": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "qq": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "kuaishou": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "jd": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "4.0"
   *    }
   * }
   */
  bottom: number;
}
//#endregion
//#region node_modules/.pnpm/@dcloudio+uni-app-x@0.7.97/node_modules/@dcloudio/uni-app-x/types/native/DrawableContext.d.ts
// TODO 需要 export 以支持 declare global，否则会报错无法扩展全局接口
type DrawableContextColorString = string.ColorString;
declare global {
  /**
   * @package io.dcloud.uniapp.runtime
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "3.9"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.11"
   *        },
   *        "harmony": {
   *            "osVer": "x",
   *            "uniVer": "x",
   *            "unixVer": "4.61",
   *            "unixvVer": "x"
   *        }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "alipay": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "baidu": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "toutiao": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "lark": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "qq": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "kuaishou": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "jd": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "x"
   *    }
   * }
   */
  interface DrawableContext {
    /**
     * 设置字体大小
     * @defaultValue 10px
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11",
     *            "unixvVer": "x"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    font: string;
    /**
     * 设置填充颜色
     * @defaultValue #000 (黑色)
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    fillStyle: DrawableContextColorString;
    /**
     * 指定如何绘制每一条线条末端的属性，可选值：`butt`线段末端以方形结束；`round`线段末端以圆形结束；`square`线段末端以方形结束，但是会增加一个一半宽度的矩形区域。
     * @defaultValue butt
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    lineCap: string;
    /**
     * 设置虚线偏移量
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    lineDashOffset: number;
    /**
     * 设置 2 个长度不为 0 的线条相连部分如何连接在一起的属性，可选值：`bevel`斜角；`round`圆角；`miter`尖角。
     * @defaultValue miter
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    lineJoin: string;
    /**
     * 设置线条的宽度
     * @defaultValue 1px
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    lineWidth: number;
    /**
     * 设置边框的颜色
     * @defaultValue #000 (黑色)
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    strokeStyle: DrawableContextColorString;
    /**
     * 设置文本的对齐方式，可取值：`left`左对齐；`center`居中对齐；`right`右对齐。
     * @defaultValue left
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    textAlign: string;
    /**
     * 创建一个新的空路径
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    beginPath(): void;
    /**
     * 绘制一段弧线
     * @param {number} x 圆心的X轴坐标
     * @param {number} y 圆心的Y轴坐标
     * @param {number} radius 圆弧的半径
     * @param {number} startAngle 圆弧的起始点，x 轴方向开始计算，单位为弧度
     * @param {number} endAngle 圆弧的终点，单位为弧度
     * @param {number} [anticlockwise=true] 圆弧绘制方向，true：逆时针绘制，false：顺时针绘制。
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean | null): void;
    /**
     * 将一个新的路径的起始点移动到 (x，y) 坐标
     * @param {number} x 点的X轴坐标
     * @param {number} y 点的Y轴坐标
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    moveTo(x: number, y: number): void;
    /**
     * 创建一个矩形路径
     * @param {number} x 矩形起点的X轴坐标
     * @param {number} y 矩形起点的Y轴坐标
     * @param {number} width 矩形宽度
     * @param {number} height 矩形高度
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    rect(x: number, y: number, width: number, height: number): void;
    /**
     * 将路径的最后一个点连接到 (x，y) 坐标
     * @param {number} x 线终点的X轴坐标
     * @param {number} y 线终点的Y轴坐标
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    lineTo(x: number, y: number): void;
    /**
     * 闭合路径，将最后一个点与起点连接起来。如果图形已经封闭，或者只有一个点，那么此方法不会产生任何效果。
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    closePath(): void;
    /**
     * 绘制当前或已经存在的路径的边框。
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    stroke(): void;
    /**
     * 绘制一个矩形框
     * @param {number} x 矩形起点的X轴坐标
     * @param {number} y 矩形起点的Y轴坐标
     * @param {number} width 矩形宽度
     * @param {number} height 矩形高度
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    strokeRect(x: number, y: number, width: number, height: number): void;
    /**
     * 绘制空心字符
     * @param {string} text 要绘制的字符
     * @param {number} x 字符开始绘制的X轴坐标
     * @param {number} y 字符开始绘制的Y轴坐标
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    strokeText(text: string, x: number, y: number): void;
    /**
     * 填充当前或已存在的路径
     * @param {string} [fillRule=nonzero] 填充规则。可取值：`nonzero`非零环绕规则；`evenodd`奇偶环绕规则。
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    fill(fillRule?: string | null): void;
    /**
     * 绘制一个实心矩形
     * @param {number} x 矩形起点的X轴坐标
     * @param {number} y 矩形起点的Y轴坐标
     * @param {number} width 矩形宽度
     * @param {number} height 矩形高度
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    fillRect(x: number, y: number, width: number, height: number): void;
    /**
     * 绘制实心字符
     * @param {string} text 要绘制的字符
     * @param {number} x 字符开始绘制的X轴坐标
     * @param {number} y 字符开始绘制的Y轴坐标
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    fillText(text: string, x: number, y: number): void;
    /**
     * 清空绘制数据
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    reset(): void;
    /**
     * 将所有绘制内容更新到画布上
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    update(): void;
    /**
     * 设置虚线样式
     * @param {Array<number>} segments 一组描述交替绘制线段和间距长度的数字。
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    setLineDash(segments: Array<number>): void;
    /**
     * 根据控制点和半径绘制圆弧路径
     * @param {number} x1 第一个控制点的 x 轴坐标
     * @param {number} y1 第一个控制点的 y 轴坐标
     * @param {number} x2 第二个控制点的 x 轴坐标
     * @param {number} y2 第二个控制点的 y 轴坐标
     * @param {number} radius 圆弧的半径
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    // arcTo(x1 : number, y1 : number, x2 : number, y2 : number, radius : number) : void
    /**
     * 创建三次方贝塞尔曲线路径
     * @param {number} cp1x 第一个贝塞尔控制点的 x 坐标
     * @param {number} cp1y 第一个贝塞尔控制点的 y 坐标
     * @param {number} cp2x 第二个贝塞尔控制点的 x 坐标
     * @param {number} cp2y 第二个贝塞尔控制点的 y 坐标
     * @param {number} x 结束点的 x 坐标
     * @param {number} y 结束点的 y 坐标
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "3.9"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "4.11"
     *        },
     *        "harmony": {
     *            "osVer": "x",
     *            "uniVer": "x",
     *            "unixVer": "4.61",
     *            "unixvVer": "x"
     *        }
     *    },
     *    "mp": {
     *      "weixin": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "alipay": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "baidu": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "toutiao": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "lark": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "qq": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "kuaishou": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      },
     *      "jd": {
     *        "hostVer": "√",
     *        "uniVer": "x",
     *        "unixVer": "x"
     *      }
     *    },
     *    "web": {
     *        "uniVer": "x",
     *        "unixVer": "x"
     *    }
     * }
     */
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
  }
}
//#endregion
//#region node_modules/.pnpm/@dcloudio+uni-app-x@0.7.97/node_modules/@dcloudio/uni-app-x/types/native/SnapshotOptions.d.ts
/**
 * 组件截图成功的返回数据
 */
type TakeSnapshotSuccess = {
  /**
   * 截图保存的临时文件路径
   */
  tempFilePath: string;
};
/**
 * 组件截图失败的返回数据
 */
type TakeSnapshotFail = {
  errMsg: string;
};
/**
 * 成功回调函数定义
 */
type TakeSnapshotSuccessCallback = (res: TakeSnapshotSuccess) => void;
/**
 * 失败回调函数定义
 */
type TakeSnapshotFailCallback = (res: TakeSnapshotFail) => void;
/**
 * 完成回调函数定义
 */
type TakeSnapshotCompleteCallback = (res: any) => void;
/**
 * 组件截图的参数配置选项
 */
type TakeSnapshotOptions = {
  /**
   * 截图导出类型，目前仅支持 'file' 保存到临时文件目录
   * @defaultValue "file"
   */
  type?: string | null;
  /**
   * 截图文件格式，目前仅支持 'png'
   * @defaultValue "png"
   */
  format?: string | null;
  /**
   * 接口调用成功的回调函数
   */
  success?: TakeSnapshotSuccessCallback | null;
  /**
   * 接口调用失败的回调函数
   */
  fail?: TakeSnapshotFailCallback | null;
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: TakeSnapshotCompleteCallback | null;
};
//#endregion
//#region node_modules/.pnpm/@dcloudio+uni-app-x@0.7.97/node_modules/@dcloudio/uni-app-x/types/native/UniAnimationPlaybackEvent.d.ts
/**
 * @package io.dcloud.uniapp.runtime
 * @autodoc false
 */
declare class UniAnimationPlaybackEvent extends UniEvent$1 {
  /**
   * 动画的事件类型
   */
  type: string;
}
//#endregion
//#region node_modules/.pnpm/@dcloudio+uni-app-x@0.7.97/node_modules/@dcloudio/uni-app-x/types/native/UniAnimation.d.ts
type UniAnimationOnCancel = (event: UniAnimationPlaybackEvent) => void;
type UniAnimationOnFinish = (event: UniAnimationPlaybackEvent) => void;
/**
 * @package io.dcloud.uniapp.runtime
 * @uniPlatform {
 *    "app": {
 *        "android": {
 *            "osVer": "5.0",
 *            "uniVer": "x",
 *            "unixVer": "4.51"
 *        },
 *        "ios": {
 *            "osVer": "12.0",
 *            "uniVer": "x",
 *            "unixVer": "4.53"
 *   	  }
 *    },
 *    "mp": {
 *      "weixin": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      },
 *      "alipay": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      },
 *      "baidu": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      },
 *      "toutiao": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      },
 *      "lark": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      },
 *      "qq": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      },
 *      "kuaishou": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      },
 *      "jd": {
 *        "hostVer": "√",
 *        "uniVer": "x",
 *        "unixVer": "x"
 *      }
 *    },
 *    "web": {
 *        "uniVer": "x",
 *        "unixVer": "√"
 *    }
 * }
 */
declare class UniAnimation {
  /**
   * 获取或设置用于标识动画的字符串
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *   	  }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "4.53"
   *      },
   *      "alipay": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "baidu": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "toutiao": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "lark": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "qq": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "kuaishou": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "jd": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  id: string;
  /**
   * 返回动画播放状态。可选值：`running`动画正在运行；`paused`动画暂停；`finished`动画播放完成；`idle`动画取消或者失败
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *   	  }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "alipay": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "baidu": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "toutiao": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "lark": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "qq": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "kuaishou": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "jd": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  playState: string;
  /**
   * 监听动画取消事件
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *   	  }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "alipay": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "baidu": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "toutiao": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "lark": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "qq": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "kuaishou": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "jd": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  oncancel: UniAnimationOnCancel | null;
  /**
   * 监听动画完成事件
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *   	  }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "alipay": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "baidu": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "toutiao": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "lark": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "qq": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "kuaishou": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "jd": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  onfinish: UniAnimationOnFinish | null;
  /**
   * 终止并取消所有动画
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *   	  }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "4.53"
   *      },
   *      "alipay": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "baidu": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "toutiao": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "lark": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "qq": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "kuaishou": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "jd": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  cancel(): void;
  /**
   * 动画跳转到最后一毫秒并立即播放完成
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *   	  }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "alipay": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "baidu": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "toutiao": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "lark": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "qq": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "kuaishou": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "jd": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  finish(): void;
  /**
   * 暂停动画播放
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *   	  }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "alipay": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "baidu": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "toutiao": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "lark": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "qq": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "kuaishou": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "jd": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  pause(): void;
  /**
   * 开始或恢复动画播放
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.53"
   *   	  }
   *    },
   *    "mp": {
   *      "weixin": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "4.53"
   *      },
   *      "alipay": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "baidu": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "toutiao": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "lark": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "qq": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "kuaishou": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      },
   *      "jd": {
   *        "hostVer": "√",
   *        "uniVer": "x",
   *        "unixVer": "x"
   *      }
   *    },
   *    "web": {
   *        "uniVer": "x",
   *        "unixVer": "√"
   *    }
   * }
   */
  play(): void;
}
//#endregion
//#region node_modules/.pnpm/@dcloudio+uni-app-x@0.7.97/node_modules/@dcloudio/uni-app-x/types/native/UniVideoElement.d.ts
declare global {
  interface RequestFullScreenOptions {
    /**
     * direction
     */
    direction?:
    /**
     * 正常竖向
     */
    0 |
    /**
     * 屏幕逆时针90度
     */
    90 |
    /**
     * 屏幕顺时针90度
     */
    -90 | null;
  }
}
//#endregion
//#region node_modules/.pnpm/@dcloudio+uni-app-x@0.7.97/node_modules/@dcloudio/uni-app-x/types/native/UniTextLayout.d.ts
declare global {
  /**
   * 文本对象
   */
  interface UniTextLayout {
    /**
     * 设置文本
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.81"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *   	    }
     *    }
     * }
     */
    setText(text: string): void;
    /**
     * 设置文本颜色
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.81"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *   	    }
     *    }
     * }
     */
    setColor(color: string): void;
    /**
     * 设置字体名称
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.81"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *   	    }
     *    }
     * }
     */
    setFontFamily(family: string): void;
    /**
     * 设置字体大小
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.81"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *   	    }
     *    }
     * }
     */
    setFontSize(size: string): void;
    /**
     * 设置字体样式
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.81"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *   	    }
     *    }
     * }
     */
    setFontStyle(style: string): void;
    /**
     * 设置字体粗细
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.81"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *   	    }
     *    }
     * }
     */
    setFontWeight(weight: string): void;
    /**
     * 设置行高
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.81"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *   	    }
     *    }
     * }
     */
    setLineHeight(height: string): void;
    /**
     * 设置文字水平对齐方式
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.81"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *   	    }
     *    }
     * }
     */
    setTextAlign(align: string): void;
    /**
     * 设置文字溢出裁剪方式
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.81"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *   	    }
     *    }
     * }
     */
    setTextOverflow(overflow: string): void;
    /**
     * 设置文字阴影
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.81"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *   	    }
     *    }
     * }
     */
    setTextShadow(shadow: string): void;
    /**
     * 设置文本修饰类型
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.81"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *   	    }
     *    }
     * }
     */
    setTextDecorationLine(decorationLine: string): void;
    /**
     * 设置处理空白字符
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.81"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *   	    }
     *    }
     * }
     */
    setWhiteSpace(whiteSpace: string): void;
    /**
     * 添加子文本对象
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.81"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *   	    }
     *    }
     * }
     */
    append(layout: UniTextLayout): void;
    /**
     * 测量文本大小
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.81"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *   	    }
     *    }
     * }
     */
    measure(constraint: UniLayoutConstraintSize): UniLayoutSize;
  }
  /**
   * 布局大小
   */
  interface UniLayoutSize {
    /**
     * 元素宽度，逻辑像素值
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.81"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *   	    }
     *    }
     * }
     */
    width: number;
    /**
     * 元素高度，逻辑像素值
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.81"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *   	    }
     *    }
     * }
     */
    height: number;
  }
  /**
   * 布局约束大小
   */
  interface UniLayoutConstraintSize {
    /**
     * 元素最小宽度，逻辑像素值
     * 可选值，不设置则认为没有最小宽度
     * @uniPlatform {
     *    "app": {
     *        "android": {
     *            "osVer": "5.0",
     *            "uniVer": "x",
     *            "unixVer": "4.81"
     *        },
     *        "ios": {
     *            "osVer": "12.0",
     *            "uniVer": "x",
     *            "unixVer": "x"
     *   	    }
     *    }
     * }
     */
    minWidth?: number | null;
    /**
       * 元素最大宽度，逻辑像素值
       * 可选值，不设置则认为可以无限宽
       * @uniPlatform {
       *    "app": {
       *        "android": {
       *            "osVer": "5.0",
       *            "uniVer": "x",
       *            "unixVer": "4.81"
       *        },
       *        "ios": {
       *            "osVer": "12.0",
       *            "uniVer": "x",
       *            "unixVer": "x"
       *   	    }
       *    }
       * }
       */
    maxWidth?: number | null;
    /**
       * 元素最小高度，逻辑像素值
       * 可选值，不设置则认为没有最小高度
       * @uniPlatform {
       *    "app": {
       *        "android": {
       *            "osVer": "5.0",
       *            "uniVer": "x",
       *            "unixVer": "4.81"
       *        },
       *        "ios": {
       *            "osVer": "12.0",
       *            "uniVer": "x",
       *            "unixVer": "x"
       *   	    }
       *    }
       * }
       */
    minHeight?: number | null;
    /**
       * 元素最大高度，逻辑像素值
       * 可选值，不设置则认为可以无限高
       * @uniPlatform {
       *    "app": {
       *        "android": {
       *            "osVer": "5.0",
       *            "uniVer": "x",
       *            "unixVer": "4.81"
       *        },
       *        "ios": {
       *            "osVer": "12.0",
       *            "uniVer": "x",
       *            "unixVer": "x"
       *   	    }
       *    }
       * }
       */
    maxHeight?: number | null;
  }
}
//#endregion
//#region node_modules/.pnpm/@dcloudio+uni-app-x@0.7.97/node_modules/@dcloudio/uni-app-x/types/native/UniSafeAreaInsets.d.ts
type UniSafeAreaInsets = {
  /**
   * 安全区域左侧插入位置（距离左边边界距离）
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *   	    }
   *    }
   * }
   */
  readonly left: number;
  /**
   * 安全区域右侧插入位置（距离右边边界距离）
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *   	    }
   *    }
   * }
   */
  readonly right: number;
  /**
   * 安全区顶部插入位置（距离顶部边界距离）
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *   	    }
   *    }
   * }
   */
  readonly top: number;
  /**
   * 安全区域底部插入位置（距离底部边界距离）
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *   	    }
   *    }
   * }
   */
  readonly bottom: number;
};
//#endregion
//#region node_modules/.pnpm/@dcloudio+uni-app-x@0.7.97/node_modules/@dcloudio/uni-app-x/types/native/UniPageBody.d.ts
type UniPageBody = {
  /**
   * 页面内容区域左上角横坐标
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *   	    }
   *    }
   * }
   */
  readonly left: number;
  /**
   * 页面内容区域右下角横坐标
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *   	    }
   *    }
   * }
   */
  readonly right: number;
  /**
   * 页面内容区域左上角纵坐标
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *   	    }
   *    }
   * }
   */
  readonly top: number;
  /**
   * 页面内容区域右下角纵坐标
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *   	    }
   *    }
   * }
   */
  readonly bottom: number;
  /**
   * 页面内容区域宽度
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *   	    }
   *    }
   * }
   */
  readonly width: number;
  /**
   * 页面内容区域高度
   * @uniPlatform {
   *    "app": {
   *        "android": {
   *            "osVer": "5.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *        },
   *        "ios": {
   *            "osVer": "12.0",
   *            "uniVer": "x",
   *            "unixVer": "4.51"
   *   	    }
   *    }
   * }
   */
  readonly height: number;
};
//#endregion
//#region node_modules/.pnpm/@dcloudio+uni-app-x@0.7.97/node_modules/@dcloudio/uni-app-x/types/native/UniPage.d.ts
// export type UniPageBody = {
//   /**
//    * 页面可使用区域左上角纵坐标，单位为px
//    */
//   top: number,
//   /**
//    * 页面可使用区域右下角纵坐标，单位为px
//    */
//   bottom: number,
//   /**
//    * 页面可使用区域左上角横坐标，单位为px
//    */
//   left: number,
//   /**
//    * 页面可使用区域右下角横坐标，单位为px
//    */
//   right: number,
//   /**
//    * 页面可使用区域的宽度，单位为px
//    */
//   width: number,
//   /**
//    * 页面可使用区域的高度，单位为px
//    */
//   height: number
// }
declare global {
  interface UniPage {
    /**
     * 页面的路由地址
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/unipage.html
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "4.31"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "4.31",
     *      "unixUtsPlugin": "4.31"
     *    },
     *    "harmony": {
     *      "osVer": "5.0.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "4.31"
     *  }
     * }
     */
    route: string;
    /**
     * 页面的路由参数信息
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/unipage.html
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "4.31"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "4.31",
     *      "unixUtsPlugin": "4.31"
     *    },
     *    "harmony": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "4.31"
     *  }
     * }
     */
    options: UTSJSONObject;
    /**
     * UniPage vue 实例对象
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/unipage.html
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "4.31"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "4.31",
     *      "unixUtsPlugin": "x"
     *    },
     *    "harmony": {
     *      "osVer": "5.0.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "4.31"
     *  }
     * }
     */
    vm?: ComponentPublicInstance | null;
    /**
     * UniPage vue 实例对象
     * @deprecated 已废弃，仅为了向下兼容保留
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/unipage.html
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "4.31"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "4.31",
     *      "unixUtsPlugin": "x"
     *    },
     *    "harmony": {
     *      "osVer": "5.0.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "4.31"
     *  }
     * }
     */
    $vm?: ComponentPublicInstance | null;
    /**
     * UniPage 页面可使用区域信息，单位为px
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/unipage.html
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "4.51"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "4.51"
     *    },
     *    "harmony": {
     *      "osVer": "5.0.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "4.51"
     *  }
     * }
     */
    pageBody: UniPageBody;
    /**
     * UniPage 安全区域插入位置（与屏幕边界的距离）信息
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/unipage.html
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "4.51"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "4.51"
     *    },
     *    "harmony": {
     *      "osVer": "5.0.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "4.51"
     *  }
     * }
     */
    safeAreaInsets: UniSafeAreaInsets;
    /**
     * 已经进入全屏状态的元素
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/unipage.html
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    },
     *    "harmony": {
     *      "osVer": "5.0.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "x"
     *  }
     * }
     */
    readonly fullscreenElement?: UniElement$2 | null;
    /**
     * 页面窗口宽度
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/unipage.html
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "unixVer": "4.61",
     *      "unixUtsPlugin": "4.61"
     *    },
     *    "harmony": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "4.63"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "4.63"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "4.63"
     *  }
     * }
     */
    readonly width: number;
    /**
     * 页面窗口高度
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/unipage.html
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "unixVer": "4.61",
     *      "unixUtsPlugin": "4.61"
     *    },
     *    "harmony": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "4.63"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "4.63"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "4.63"
     *  }
     * }
     */
    readonly height: number;
    /**
     * 页面状态栏高度
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/unipage.html
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "unixVer": "4.61",
     *      "unixUtsPlugin": "4.61"
     *    },
     *    "harmony": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "4.63"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "4.63"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "4.63"
     *  }
     * }
     */
    readonly statusBarHeight: number;
    /**
     * 获取当前页面样式。详细属性配置请参考PageStyle
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#getpagestyle
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "4.31"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "4.31",
     *      "unixUtsPlugin": "4.31"
     *    },
     *    "harmony": {
     *      "osVer": "5.0.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "4.31"
     *  }
     * }
     */
    getPageStyle(): UTSJSONObject;
    /**
     * 获取当前页面样式。详细属性配置请参考PageStyle
     * @deprecated 已废弃，仅为了向下兼容保留
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#getpagestyle-2
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "4.13"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "4.13"
     *    },
     *    "harmony": {
     *      "osVer": "5.0.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "4.13"
     *  }
     * }
     */
    $getPageStyle(): UTSJSONObject;
    /**
     * 设置当前页面样式。详细属性配置请参考PageStyle
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#setpagestyle
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "4.31"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "4.31",
     *      "unixUtsPlugin": "4.31"
     *    },
     *    "harmony": {
     *      "osVer": "5.0.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "4.31"
     *  }
     * }
     */
    setPageStyle(style: UTSJSONObject): void;
    /**
     * 设置当前页面样式。详细属性配置请参考PageStyle
     * @deprecated 已废弃，仅为了向下兼容保留
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#setpagestyle-2
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "4.13"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "4.13"
     *    },
     *    "harmony": {
     *      "osVer": "5.0.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "4.13"
     *  }
     * }
     */
    $setPageStyle(style: UTSJSONObject): void;
    /**
     * 用于 dialogPage 获取所属父页面
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/event-bus.html#emit
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/event-bus.html#emit
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "4.31"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "4.31",
     *      "unixUtsPlugin": "4.31"
     *    },
     *    "harmony": {
     *      "osVer": "5.0.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "4.31"
     *  }
     * }
     */
    getParentPage(): UniPage | null;
    /**
     * 获取当前页面的 dialog 子页面集合
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/event-bus.html#emit
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/event-bus.html#emit
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "4.31"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "4.31",
     *      "unixUtsPlugin": "4.31"
     *    },
     *    "harmony": {
     *      "osVer": "5.0.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "4.31"
     *  }
     * }
     */
    getDialogPages(): UniPage[];
    /**
     * 返回一个匹配特定 ID 的元素， 如果不存在，返回 null。\
     * 如果需要获取指定的节点类型，需要使用 as 进行类型转换。\
     * ID 区分大小写，且应该是唯一的。如果存在多个匹配的元素，则返回第一个匹配的元素。
     *
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#getelementbyid
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#getelementbyid
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "4.31"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "4.31"
     *    },
     *    "harmony": {
     *      "osVer": "5.0.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "4.31"
     *  }
     * }
     */
    getElementById(id: string.IDString | string): UniElement$2 | null;
    /**
     * 返回 android 平台页面根 view
     *
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#getandroidview
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#getandroidview
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "4.31"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *    "harmony": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "x"
     *  }
     * }
     */
    getAndroidView(): View | null;
    /**
     * 返回 android 平台加载页面内容的Activity
     *
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#getandroidactivity
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#getandroidactivity
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *    "harmony": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "x"
     *  }
     * }
     */
    getAndroidActivity(): Activity | null;
    /**
     * 返回 ios 平台页面根 view
     *
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#getiosview
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#getiosview
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *    "ios": {
     *      "osVer": "12",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixUtsPlugin": "4.33"
     *    },
     *    "harmony": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "x"
     *  }
     * }
     */
    getIOSView(): UIView | null;
    /**
     * 返回页面 HTML Element 对象
     *
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#gethtmlelement
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#gethtmlelement
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *    "harmony": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "4.31"
     *  }
     * }
     */
    getHTMLElement(): UniElement$2 | null;
    /**
     * 将当前在全屏模式下显示的元素退出全屏模式，恢复全屏之前的状态
     *
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#exitfullscreen
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#exitfullscreen
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *    "harmony": {
     *      "osVer": "5.0.0",
     *      "uniVer": "x",
     *      "unixVer": "4.61"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "x"
     *  }
     * }
     */
    exitFullscreen(options: ExitFullscreenOptions | null): void;
    /**
     * 创建组件
     *
     * @tutorial_uni_app_x https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#createelement
     * @tutorial https://doc.dcloud.net.cn/uni-app-x/api/unipage.html#createelement
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *    "ios": {
     *      "osVer": "x",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *    "harmony": {
     *      "osVer": "5.0.0",
     *      "uniVer": "x",
     *      "unixVer": "4.63"
     *      "unixvVer": "x"
     *    }
     *  },
     *  "mp": {
     *    "weixin": {
     *      "hostVer": "√",
     *      "uniVer": "x",
     *      "unixVer": "x"
     *    },
     *  },
     *  "web": {
     *    "uniVer": "x",
     *    "unixVer": "x"
     *  }
     * }
     */
    createElement(tagName: string): UniElement$2;
    /**
     * @internal
     * web android harmony 获取当前页面 dialogPage 创建的 API 弹框集合
     */
    $getSystemDialogPages(): UniPage[];
    /**
     * @internal
     * ios 获取当前页面 dialogPage 创建的 API 弹框集合
     */
    __$$getSystemDialogPages(): UniPage[];
    /**
     * 监听页面布局变化更新事件
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "x"
     *    },
     *    "ios": {
     *      "osVer": "12.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "x"
     *    },
     *    "harmony": {
     *      "osVer": "6.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "5.0"
     *    }
     *  }
     * }
     */
    onLayoutChange(callback: UniPageOnLayoutChangeCallback): number;
    /**
     * 取消监听页面布局变化更新事件
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "x"
     *    },
     *    "ios": {
     *      "osVer": "12.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "x"
     *    },
     *    "harmony": {
     *      "osVer": "6.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "5.0"
     *    }
     *  }
     * }
     */
    offLayoutChange(id: number): void;
    /**
     * 监听页面渲染变化更新事件
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "x"
     *    },
     *    "ios": {
     *      "osVer": "12.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "x"
     *    },
     *    "harmony": {
     *      "osVer": "6.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "5.0"
     *    }
     *  }
     * }
     */
    onRenderChange(callback: UniPageOnRenderChangeCallback): number;
    /**
     * 取消监听页面渲染变化更新事件
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "x"
     *    },
     *    "ios": {
     *      "osVer": "12.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "x"
     *    },
     *    "harmony": {
     *      "osVer": "6.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "5.0"
     *    }
     *  }
     * }
     */
    offRenderChange(id: number): void;
    /**
     * 监听页面触摸开始事件
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "x"
     *    },
     *    "ios": {
     *      "osVer": "12.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "x"
     *    },
     *    "harmony": {
     *      "osVer": "6.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "5.0"
     *    }
     *  }
     * }
     */
    onTouchStart(callback: UniPageOnTouchEventCallback): number;
    /**
     * 取消监听页面触摸开始事件
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "x"
     *    },
     *    "ios": {
     *      "osVer": "12.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "x"
     *    },
     *    "harmony": {
     *      "osVer": "6.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "5.0"
     *    }
     *  }
     * }
     */
    offTouchStart(id: number): void;
    /**
     * 监听页面触摸结束事件
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "x"
     *    },
     *    "ios": {
     *      "osVer": "12.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "x"
     *    },
     *    "harmony": {
     *      "osVer": "6.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "5.0"
     *    }
     *  }
     * }
     */
    onTouchEnd(callback: UniPageOnTouchEventCallback): number;
    /**
     * 取消监听页面触摸结束事件
     * @uniPlatform {
     *  "app": {
     *    "android": {
     *      "osVer": "5.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "x"
     *    },
     *    "ios": {
     *      "osVer": "12.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "x"
     *    },
     *    "harmony": {
     *      "osVer": "6.0",
     *      "uniVer": "x",
     *      "unixVer": "x",
     *      "unixvVer": "5.0"
     *    }
     *  }
     * }
     */
    offTouchEnd(id: number): void;
    /**
    * 返回页面中与指定选择器或选择器组匹配的第一个 Element对象。如果找不到匹配项，则返回null
    * @param {string.cssSelectorString}selector CSS 选择器字符串
    * @uniPlatform {
    *    "app": {
    *        "android": {
    *            "osVer": "5.0",
    *            "uniVer": "x",
    *            "unixVer": "x"
    *        },
    *        "ios": {
    *            "osVer": "12.0",
    *            "uniVer": "x",
    *            "unixVer": "x",
    *            "unixUtsPlugin": "x"
    *        },
    *        "harmony": {
    *            "osVer": "5.0",
    *            "uniVer": "x",
    *            "unixVer": "x",
    *            "unixUtsPlugin": "x"
    *        }
    *    },
    *    "mp": {
    *      "weixin": {
    *        "osVer": "x",
    *        "uniVer": "x",
    *        "unixVer": "x"
    *      }
    *    },
    *    "web": {
    *        "uniVer": "x",
    *        "unixVer": "x"
    *    }
    * }
    */
    querySelector(selector: string.cssSelectorString): UniElement$2 | null;
    /**
    * 返回页面中与指定选择器或选择器组匹配的元素列表。
    * @param {string.cssSelectorString}selector CSS 选择器字符串
    * @uniPlatform {
    *    "app": {
    *        "android": {
    *            "osVer": "5.0",
    *            "uniVer": "x",
    *            "unixVer": "x"
    *        },
    *        "ios": {
    *            "osVer": "12.0",
    *            "uniVer": "x",
    *            "unixVer": "x",
    *            "unixUtsPlugin": "x"
    *        },
    *        "harmony": {
    *            "osVer": "5.0",
    *            "uniVer": "x",
    *            "unixVer": "x",
    *            "unixUtsPlugin": "x"
    *        }
    *    },
    *    "mp": {
    *      "weixin": {
    *        "osVer": "x",
    *        "uniVer": "x",
    *        "unixVer": "x"
    *      }
    *    },
    *    "web": {
    *        "uniVer": "x",
    *        "unixVer": "x"
    *    }
    * }
    */
    querySelectorAll(selector: string.cssSelectorString): UniElement$2[] | null;
  }
}
type ExitFullscreenSuccessCallback = () => void;
type ExitFullscreenFailCallback = (error: FullscreenError) => void;
type ExitFullscreenCompleteCallback = (result: any | null) => void;
type ExitFullscreenOptions = {
  /**
   * 成功回调
   */
  success: ExitFullscreenSuccessCallback | null;
  /**
   * 失败回调
   */
  fail: ExitFullscreenFailCallback | null;
  /**
   * 完成回调
   */
  complete: ExitFullscreenCompleteCallback | null;
};
/**
 * 监听页面布局变化更新事件回调函数
 */
type UniPageOnLayoutChangeCallback = (res: UniPageOnLayoutChangeCallbackResult) => void;
/**
 * 监听页面布局变化更新事件回调参数
 */
type UniPageOnLayoutChangeCallbackResult = UniPagePerformanceTiming;
/**
 * 监听页面布局变化更新事件回调函数
 */
type UniPageOnRenderChangeCallback = (res: UniPageOnRenderChangeCallbackResult) => void;
/**
 * 监听页面布局变化更新事件回调参数
 */
type UniPageOnRenderChangeCallbackResult = UniPagePerformanceRenderTiming;
/**
 * 页面性能计时信息
 */
interface UniPagePerformanceTiming {
  /**
   * 性能计时持续的时间，单位为ms
   */
  duration: number;
}
/**
 * 渲染性能计时信息
 *  UniPagePerformanceTiming基类的duration属性为渲染到屏幕的总时间
 */
interface UniPagePerformanceRenderTiming extends UniPagePerformanceTiming {
  /**
   * 更新渲染属性的总时间，单位为ms
   */
  updateDuration: number;
}
/**
 * 监听页面触摸事件回调函数
 */
type UniPageOnTouchEventCallback = (event: UniTouchEvent) => void;
//#endregion
//#region node_modules/.pnpm/@dcloudio+uni-app-x@0.7.97/node_modules/@dcloudio/uni-app-x/types/native/index.d.ts
type UniPage$1 = globalThis.UniPage;
type DrawableContext = globalThis.DrawableContext;
type UniTextLayout$1 = globalThis.UniTextLayout;
type UniLayoutSize$1 = globalThis.UniLayoutSize;
type UniElement$1 = globalThis.UniElement;
//#endregion
//#region packages/runtime-x/src/helpers/useCssModule.d.ts
export declare function useCssModule(name?: string): Record<string, string>;
//#endregion
//#region packages/runtime-x/src/helpers/useCssVars.d.ts
/**
* Runtime helper for SFC's CSS variable injection feature.
* @private
*/
export declare function useCssVars(getter: (ctx: any) => Record<string, string>): void;
//#endregion
//#region packages/runtime-x/src/helpers/useCssStyles.d.ts
type NVueStyle = Record<string, Record<string, Record<string, unknown>>>;
export declare function useCssStyles(componentStyles: NVueStyle[]): NVueStyle;
declare class ParseStyleContext {
  styles: Map<string, unknown>;
  weights: Record<string, number>;
  constructor();
}
export declare function parseClassStyles(el: UniElement$1): ParseStyleContext;
export declare function parseClassList(classList: string[], instance: ComponentInternalInstance, el?: UniElement$1 | null): Map<string, unknown>;
//#endregion
//#region packages/runtime-x/src/directives/vModel.d.ts
declare const assignKey$1: unique symbol;
type AssignerFn$1 = (value: any) => void;
type ModelDirective$1<T, Modifiers extends string = string> = ObjectDirective$1<T & {
  [assignKey$1]: AssignerFn$1;
  _assigning?: boolean;
}, any, Modifiers>;
export declare const vModelText: ModelDirective$1<Element$1, "trim" | "number" | "lazy">;
/**
* @internal
*/
export declare const vModelTextInit: (el: Element$1, trim: boolean | undefined, number: boolean | undefined, lazy: boolean | undefined, set?: (v: any) => void) => void;
/**
* @internal
*/
export declare const vModelTextUpdate: (el: Element$1, oldValue: any, value: any, trim: boolean | undefined, number: boolean | undefined, lazy: boolean | undefined) => void;
export declare const vModelDynamic: ObjectDirective$1;
/**
* @internal retrieve raw value set via :value bindings
*/
export declare function getValue(el: Element$1): any;
/**
* @internal
*/
export declare const vModelCheckboxInit: (el: Element$1, set?: (v: any) => void) => void;
/**
* @internal
*/
export declare const vModelCheckboxUpdate: (el: Element$1, oldValue: any, value: any, rawValue?: any) => void;
/**
* @internal
*/
export declare const vModelSelectInit: (el: Element$1 & {
  [assignKey$1]?: AssignerFn$1;
  _assigning?: boolean;
}, value: any, number: boolean | undefined, set?: (v: any) => void) => void;
/**
* @internal
*/
export declare const vModelSetSelected: (el: Element$1, value: any) => void;
//#endregion
//#region packages/runtime-x/src/directives/vOn.d.ts
/**
* @private
*/
export declare const withModifiers: (fn: Function, modifiers: string[]) => (event: Event, ...args: unknown[]) => unknown;
/**
* @private
*/
export declare const withKeys: (fn: Function, modifiers: string[]) => (event: KeyboardEvent) => unknown;
//#endregion
//#region packages/runtime-x/src/directives/vShow.d.ts
export declare const vShowOriginalDisplay: unique symbol;
export declare const vShowHidden: unique symbol;
export interface VShowElement extends Element$1 {
  [vShowOriginalDisplay]?: string;
  [vShowHidden]?: boolean;
}
export declare const vShow: ObjectDirective$1<VShowElement>;
//#endregion
//#region packages/runtime-core/src/index.dom2.d.ts
export declare const version: string;
export declare const warn: typeof warn$1;
/**
* Runtime error messages. Only exposed in dev or esm builds.
* @internal
*/
export declare const ErrorTypeStrings: typeof ErrorTypeStrings$1;
declare module "@vue/reactivity" {
  interface RefUnwrapBailTypes {
    runtimeCoreBailTypes: VNode | {
      $: ComponentInternalInstance;
    };
  }
}
declare const _ssrUtils: {
  createComponentInstance: typeof createComponentInstance;
  setupComponent: typeof setupComponent;
  renderComponentRoot: typeof renderComponentRoot;
  setCurrentRenderingInstance: typeof setCurrentRenderingInstance;
  isVNode: typeof isVNode;
  normalizeVNode: typeof normalizeVNode;
  getComponentPublicInstance: typeof getComponentPublicInstance;
  ensureValidVNode: typeof ensureValidVNode;
  pushWarningContext: typeof pushWarningContext;
  popWarningContext: typeof popWarningContext;
};
/**
* SSR utils for \@vue/server-renderer. Only exposed in ssr-possible builds.
* @internal
*/
export declare const ssrUtils: typeof _ssrUtils;
/**
* @internal only exposed in compat builds
*/
export declare const resolveFilter: typeof resolveFilter$1 | null;
declare const _compatUtils: {
  warnDeprecation: typeof warnDeprecation;
  createCompatVue: typeof createCompatVue;
  isCompatEnabled: typeof isCompatEnabled;
  checkCompatEnabled: typeof checkCompatEnabled;
  softAssertCompatEnabled: typeof softAssertCompatEnabled;
};
/**
* @internal only exposed in compat builds.
*/
export declare const compatUtils: typeof _compatUtils;
export declare const DeprecationTypes: typeof DeprecationTypes$1;
export declare function defineMixin<Props = {}, RawBindings = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, EE extends string = string, S extends SlotsType = {}, I extends ComponentInjectOptions = {}, II extends string = string>(options: ComponentOptionsWithoutProps<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, I, II, S>): ComponentOptions<Props, RawBindings, D, C, M, any, any, E, string, {}, {}, string, S>;
export declare function defineMixin<PropNames extends string, RawBindings, D, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, EE extends string = string, S extends SlotsType = {}, I extends ComponentInjectOptions = {}, II extends string = string, Props = Readonly<{ [key in PropNames]?: any }>>(options: ComponentOptionsWithArrayProps<PropNames, RawBindings, D, C, M, Mixin, Extends, E, EE, I, II, S>): ComponentOptions<Props, RawBindings, D, C, M, any, any, E, string, {}, {}, string, S>;
export declare function defineMixin<PropsOptions extends Readonly<ComponentPropsOptions>, RawBindings, D, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, EE extends string = string, S extends SlotsType = {}, I extends ComponentInjectOptions = {}, II extends string = string, Props = ResolveProps<PropsOptions, EmitsOptions>>(options: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE, I, II, S>): ComponentOptions<Props, RawBindings, D, C, M, any, any, E, string, {}, {}, string, S>;
//#endregion
//#region packages/runtime-x/src/modules/style.d.ts
export declare function patchStyle(el: Element$1, prev: NormalizedStyle | string | undefined, next: NormalizedStyle | string): void;
//#endregion
//#region packages/runtime-x/src/modules/style/parser/index.d.ts
/**
* 解析 style，返回 Map
* eg: width, null => map [['width', '']]
*/
export declare function parseStyleDecl(prop: string, value: any | null): Map<string, any>;
//#endregion
//#region packages/runtime-x/src/modules/props.d.ts
export declare function shouldSetAsProp(el: Element$1, key: string, value: unknown, isSVG: boolean): boolean;
//#endregion
//#region packages/runtime-x/src/index.d.ts
export declare function ensureRenderer(): Renderer<Element$1>;
export declare const render: RootRenderFunction<Element$1>;
export declare function mountVNodePage(appContext: AppContext, pageComponent: ReturnType<typeof defineComponent>, pageProps: Record<string, any>, pageContainer: Element$1): ComponentPublicInstance$1;
export declare function unmountVNodePage(pageInstance: ComponentPublicInstance$1): void;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/fragment.d.ts
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
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/block.d.ts
type Block = Node | VaporFragment | DynamicFragment | VaporSharedDataComponentInstance | Block[];
type BlockFn = (...args: any[]) => void;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/componentProps.d.ts
type RawProps = Record<string, () => unknown> & {
  $?: DynamicPropsSource[];
};
type DynamicPropsSource = (() => Record<string, unknown>) | Record<string, () => unknown>;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/componentSlots.d.ts
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
export declare function withSharedDataVaporCtx(fn: (...args: any[]) => any, type?: "string"): BlockFn;
export declare function createSharedDataSlot(name: string | (() => string), rawProps?: LooseRawProps | null, fallback?: VaporSlot, noSlotted?: boolean, once?: boolean): void;
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
//#region packages/runtime-dom/src/components/Transition.d.ts
declare const TRANSITION = "transition";
declare const ANIMATION = "animation";
type AnimationTypes = typeof TRANSITION | typeof ANIMATION;
interface TransitionProps extends BaseTransitionProps<Element> {
  name?: string;
  type?: AnimationTypes;
  css?: boolean;
  duration?: number | {
    enter: number;
    leave: number;
  };
  enterFromClass?: string;
  enterActiveClass?: string;
  enterToClass?: string;
  appearFromClass?: string;
  appearActiveClass?: string;
  appearToClass?: string;
  leaveFromClass?: string;
  leaveActiveClass?: string;
  leaveToClass?: string;
}
//#endregion
//#region packages/runtime-dom/src/components/TransitionGroup.d.ts
type TransitionGroupProps = Omit<TransitionProps, "mode"> & {
  tag?: string;
  moveClass?: string;
};
//#endregion
//#region packages/runtime-dom/src/directives/vShow.d.ts
declare const vShowOriginalDisplay$1: unique symbol;
declare const vShowHidden$1: unique symbol;
interface VShowElement$1 extends HTMLElement {
  [vShowOriginalDisplay$1]?: string;
  [vShowHidden$1]?: boolean;
}
declare const vShow$1: ObjectDirective$1<VShowElement$1> & {
  name: "show";
};
//#endregion
//#region packages/runtime-dom/src/directives/vOn.d.ts
declare const systemModifiers: readonly ["ctrl", "shift", "alt", "meta"];
type SystemModifiers = (typeof systemModifiers)[number];
type CompatModifiers = keyof typeof keyNames;
type VOnModifiers = SystemModifiers | ModifierGuards | CompatModifiers;
type ModifierGuards = "shift" | "ctrl" | "alt" | "meta" | "left" | "right" | "stop" | "prevent" | "self" | "middle" | "exact";
/**
* @private
*/
declare const keyNames: Record<"esc" | "space" | "up" | "left" | "right" | "down" | "delete", string>;
/**
* @private
*/
type VOnDirective = Directive<any, any, VOnModifiers>;
//#endregion
//#region packages/runtime-dom/src/directives/vModel.d.ts
type AssignerFn = (value: any) => void;
declare const assignKey: unique symbol;
type ModelDirective<T, Modifiers extends string = string> = ObjectDirective$1<T & {
  [assignKey]: AssignerFn;
  _assigning?: boolean;
}, any, Modifiers>;
declare const vModelText$1: ModelDirective<HTMLInputElement | HTMLTextAreaElement, "trim" | "number" | "lazy">;
declare const vModelCheckbox: ModelDirective<HTMLInputElement>;
declare const vModelRadio: ModelDirective<HTMLInputElement>;
declare const vModelSelect: ModelDirective<HTMLSelectElement, "number">;
declare const vModelDynamic$1: ObjectDirective$1<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
type VModelDirective = typeof vModelText$1 | typeof vModelCheckbox | typeof vModelSelect | typeof vModelRadio | typeof vModelDynamic$1;
//#endregion
//#region packages/runtime-dom/src/index.d.ts
/**
* This is a stub implementation to prevent the need to use dom types.
*
* To enable proper types, add `"dom"` to `"lib"` in your `tsconfig.json`.
*/
type DomType<T> = typeof globalThis extends {
  window: unknown;
} ? T : never;
declare module "@vue/reactivity" {
  interface RefUnwrapBailTypes {
    runtimeDOMBailTypes: DomType<Node | Window>;
  }
}
declare module "@vue/runtime-core" {
  interface GlobalComponents {
    Transition: DefineComponent<TransitionProps>;
    TransitionGroup: DefineComponent<TransitionGroupProps>;
  }
  interface GlobalDirectives {
    vShow: typeof vShow$1;
    vOn: VOnDirective;
    vBind: VModelDirective;
    vIf: Directive<any, boolean>;
    vOnce: Directive;
    vSlot: Directive;
  }
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
export declare function createMountPage(appContext: AppContext): (pageComponent: ReturnType<typeof defineComponent> | VaporSharedDataComponent, pageProps: Record<string, any>, pageContainer?: Element$1) => ComponentPublicInstance$1;
export declare function unmountPage(pageInstance: ComponentPublicInstance$1): void;
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
export declare function createSharedDataForSlots<S extends UniSharedData, Source>(sharedDataVFor: UniSharedDataVFor<S>, rawSource: Source, getSlot: (sharedData: S, item: ItemOf<Source>, key: KeyOf<Source>, index?: IndexOfKey<KeyOf<Source>>) => DynamicSlot): DynamicSlot[];
export declare function getSharedDataRestElement(val: any, keys: string[]): any;
export declare function getSharedDataDefaultValue(val: any, defaultVal: any): any;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/apiCreateRecycleFor.d.ts
export declare const preCreateSharedDataRecycleFor: <Source>(src: () => Source, getKey?: (item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any) => (() => Source);
export declare const createSharedDataRecycleFor: <S extends UniSharedData, Source>(sharedDataVFor: UniSharedDataVFor<S>, src: () => Source, renderItem: (shareDataVForItem: S, item: ShallowRef<ItemOf<Source>>, key: ShallowRef<KeyOf<Source>>, index: ShallowRef<number | undefined>) => VaporSharedDataComponentInstance | null, getKey?: (shareDataVForItem: S, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any, getType?: (shareDataVForItem: S, item: ItemOf<Source>, key: KeyOf<Source>, index?: number) => any, flags?: number, setup?: (_: {
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
type RefEl = UniElement | VaporSharedDataComponentInstance;
type setRefFn = (el: RefEl | null, ref: NodeRef, refFor?: boolean | null, refKey?: string | null) => NodeRef | undefined;
export declare function createSharedDataTemplateRefSetter(): setRefFn;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/apiCreateDynamicComponent.d.ts
export declare function createSharedDataDynamicComponent(getter: () => any, setter: (ins: VaporSharedDataComponentInstance | null) => any, rawProps?: RawProps | null, rawSlots?: RawSlots | null, isSingleRoot?: boolean, once?: boolean): VaporSharedDataComponentInstance | null;
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
export declare function createElementDynamicSlotVector(slots: any | null): any | null;
//#endregion
//#region temp/packages/runtime-vapor-dom2/src/types/nativeView.d.ts
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
export declare function createNativeViewDynamicSlotVector(slots: any | null): any | null;
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
export { Comment$1 as Comment, type ComponentPublicInstance$1 as ComponentPublicInstance, type ObjectDirective$1 as ObjectDirective, Text$1 as Text, type WatchEffectOptions as WatchOptionsBase, camelize, capitalize, createBaseVNode as createElementVNode, defineComponent as defineVaporSharedDataComponent, hyphenate, normalizeClass, normalizeProps, normalizeStyle, ref$1 as ref, toDisplayString, toHandlerKey, getValue as vModelGetValue,  };