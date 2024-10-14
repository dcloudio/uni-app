import { createApp, defineComponent, useCssVars } from 'vue'

import type {
  AllowedComponentProps,
  ComponentCustomProps,
  ComponentInjectOptions,
  ComponentInternalInstance,
  ComponentObjectPropsOptions,
  ComponentOptionsMixin,
  ComponentOptionsWithArrayProps,
  ComponentOptionsWithObjectProps,
  ComponentOptionsWithoutProps,
  ComponentPropsOptions,
  ComputedOptions,
  DefineComponent,
  EmitsOptions,
  ExtractDefaultPropTypes,
  ExtractPropTypes,
  MethodOptions,
  ObjectEmitsOptions,
  Plugin,
  Ref,
  VNode,
  VNodeChild,
  VNodeProps
} from 'vue'
import type { Store } from 'vuex'

type Data = Record<string, unknown>;

declare module 'vue' {
  
  export interface ComponentCustomOptions {
    onShow?(options: OnShowOptions): void;
  }
  
  export const defineMixin : typeof defineComponent
  export interface ComponentCustomProperties {
    [key: string]: any
    $data : Record<string, any | null>
    $callMethod : (methodName : string, ...args : (any | null)[]) => any | null
    $children : ComponentPublicInstance[]
    $store: Store<any>
  }
  export type OnCleanup = (cleanupFn : () => void) => void;
  export function definePlugin<T extends Plugin = Plugin>(plugin : T) : T

  // 拷贝自defineComponent移除slots
  type EmitsToProps<T extends EmitsOptions> = T extends string[] ? {
    [K in string & `on${Capitalize<T[number]>}`]?: (...args : any[]) => any;
  } : T extends ObjectEmitsOptions ? {
    [K in string & `on${Capitalize<string & keyof T>}`]?: K extends `on${infer C}` ? T[Uncapitalize<C>] extends null ? (...args : any[]) => any : (...args : T[Uncapitalize<C>] extends (...args : infer P) => any ? P : never) => any : never;
  } : {};
  type PublicProps = VNodeProps & AllowedComponentProps & ComponentCustomProps;
  type ResolveProps<PropsOrPropOptions, E extends EmitsOptions> = Readonly<PropsOrPropOptions extends ComponentPropsOptions ? ExtractPropTypes<PropsOrPropOptions> : PropsOrPropOptions> & ({} extends E ? {} : EmitsToProps<E>);
  export function defineMixin<Props = {}, RawBindings = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, EE extends string = string, S extends SlotsType = {}, I extends ComponentInjectOptions = {}, II extends string = string>(options : ComponentOptionsWithoutProps<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, I, II, S>) : DefineComponent<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, PublicProps, ResolveProps<Props, E>, ExtractDefaultPropTypes<Props>, {}>;
  export function defineMixin<PropNames extends string, RawBindings, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, EE extends string = string, S extends SlotsType = {}, I extends ComponentInjectOptions = {}, II extends string = string, Props = Readonly<{
    [key in PropNames]?: any;
  }>>(options : ComponentOptionsWithArrayProps<PropNames, RawBindings, D, C, M, Mixin, Extends, E, EE, I, II, S>) : DefineComponent<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, PublicProps, ResolveProps<Props, E>, ExtractDefaultPropTypes<Props>, {}>;
  export function defineMixin<PropsOptions extends Readonly<ComponentPropsOptions>, RawBindings, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, EE extends string = string, S extends SlotsType = {}, I extends ComponentInjectOptions = {}, II extends string = string>(options : ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE, I, II, S>) : DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE, PublicProps, ResolveProps<PropsOptions, E>, ExtractDefaultPropTypes<PropsOptions>, {}>;

  export declare function toRef<T>(value : Ref<T>) : Ref<T>;
  export declare function toRef<T>(fn : () => T) : Ref<T>;
  export declare function toRef<T>(obj : object, key : string) : Ref<T>;
  export declare function toRaw<T>(observed : any) : T;
  export declare function customRef<T>(factory : Function) : Ref<T>;
  
  
  export function renderList<T>(source: T[] | undefined | null, renderItem: (value: T, index: number) => VNodeChild): VNodeChild[];
  export const vShow: any
  export const withModifiers: (fn: Function, modifiers: string[]) => Function;
  
  /**
   * vue internal
   */ 
  export declare function mergeDefaults(raw : ComponentPropsOptions, defaults : Record<string, any>) : ComponentObjectPropsOptions;
  export declare function mergeModels(a: string[], b: string[]): string[]
  export declare function mergeModels(a : ComponentPropsOptions | EmitsOptions, b : ComponentPropsOptions | EmitsOptions) : string[] | ObjectEmitsOptions | ComponentObjectPropsOptions<Data>;
  export declare function createPropsRestProxy(props : any, excludedKeys : string[]) : Record<string, any>;
  export declare function withAsyncContext(getAwaitable : () => any) : any[];

  export {
    createApp as createVueApp,
    createApp as createSSRApp,
    defineComponent as defineApp,
    useCssVars
  }
}

declare const UTS : any