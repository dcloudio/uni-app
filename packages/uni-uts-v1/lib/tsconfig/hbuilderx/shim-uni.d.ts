import { createApp, defineComponent, Ref } from 'vue'

import type {
  Plugin,
  DefineComponent,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  EmitsOptions,
  ComponentInjectOptions,
  ComponentOptionsWithoutProps,
  ComponentPropsOptions,
  ComponentOptionsWithArrayProps,
  ComponentOptionsWithObjectProps,
  ExtractDefaultPropTypes,
  VNodeProps,
  AllowedComponentProps,
  ComponentCustomProps,
  ExtractPropTypes,
  ObjectEmitsOptions,
  VNode,
  ComponentInternalInstance
} from 'vue'
declare module 'vue' {
  export const defineMixin: typeof defineComponent
  export interface ComponentCustomProperties {
    $data: Record<string, any | null>
    $callMethod: (methodName: string, ...args: (any | null)[]) => any | null
    $children: ComponentPublicInstance[]
  }
  export type OnCleanup = (cleanupFn: () => void) => void;
  export function definePlugin<T extends Plugin = Plugin>(plugin: T): T

  // 拷贝自defineComponent移除slots
  type EmitsToProps<T extends EmitsOptions> = T extends string[] ? {
    [K in string & `on${Capitalize<T[number]>}`]?: (...args: any[]) => any;
  } : T extends ObjectEmitsOptions ? {
    [K in string & `on${Capitalize<string & keyof T>}`]?: K extends `on${infer C}` ? T[Uncapitalize<C>] extends null ? (...args: any[]) => any : (...args: T[Uncapitalize<C>] extends (...args: infer P) => any ? P : never) => any : never;
  } : {};
  type PublicProps = VNodeProps & AllowedComponentProps & ComponentCustomProps;
  type ResolveProps<PropsOrPropOptions, E extends EmitsOptions> = Readonly<PropsOrPropOptions extends ComponentPropsOptions ? ExtractPropTypes<PropsOrPropOptions> : PropsOrPropOptions> & ({} extends E ? {} : EmitsToProps<E>);
  export function defineMixin<Props = {}, RawBindings = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, EE extends string = string, S extends SlotsType = {}, I extends ComponentInjectOptions = {}, II extends string = string>(options: ComponentOptionsWithoutProps<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, I, II, S>): DefineComponent<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, PublicProps, ResolveProps<Props, E>, ExtractDefaultPropTypes<Props>, {}>;
  export function defineMixin<PropNames extends string, RawBindings, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, EE extends string = string, S extends SlotsType = {}, I extends ComponentInjectOptions = {}, II extends string = string, Props = Readonly<{
    [key in PropNames]?: any;
  }>>(options: ComponentOptionsWithArrayProps<PropNames, RawBindings, D, C, M, Mixin, Extends, E, EE, I, II, S>): DefineComponent<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, PublicProps, ResolveProps<Props, E>, ExtractDefaultPropTypes<Props>, {}>;
  export function defineMixin<PropsOptions extends Readonly<ComponentPropsOptions>, RawBindings, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, EE extends string = string, S extends SlotsType = {}, I extends ComponentInjectOptions = {}, II extends string = string>(options: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE, I, II, S>): DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE, PublicProps, ResolveProps<PropsOptions, E>, ExtractDefaultPropTypes<PropsOptions>, {}>;

  export declare function toRef<T>(value: Ref<T>): Ref<T>;
  export declare function toRef<T>(fn: () => T): Ref<T>;
  export declare function toRef<T>(obj: object, key: string): Ref<T>;
  export declare function toRaw<T>(observed: any): T;
  export declare function customRef<T>(factory: Function): Ref<T>;

  export {
    createApp as createVueApp,
    defineComponent as defineApp
  }
}