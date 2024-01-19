import { createApp, defineComponent, Ref, ComponentOptions } from 'vue'

import type {
  ComponentOptionsWithArrayProps,
  ComponentOptionsWithObjectProps,
  ComponentOptionsWithoutProps,
  ComponentPropsOptions,
  ComponentOptionsMixin,
  ComputedOptions,
  EmitsOptions,
  MethodOptions,
  SlotsType,
  ComponentInjectOptions,
  Plugin,
} from 'vue'
declare module 'vue' {
  export function defineMixin<Props = {}, RawBindings = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, EE extends string = string, S extends SlotsType = {}, I extends ComponentInjectOptions = {}, II extends string = string>(options: ComponentOptionsWithoutProps<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, I, II, S>): ComponentOptionsWithoutProps<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, I, II, S>
  export function defineMixin<PropNames extends string, RawBindings, D, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, EE extends string = string, S extends SlotsType = {}, I extends ComponentInjectOptions = {}, II extends string = string, Props = Readonly<{
    [key in PropNames]?: any;
  }>>(options: ComponentOptionsWithArrayProps<PropNames, RawBindings, D, C, M, Mixin, Extends, E, EE, I, II, S>): ComponentOptionsWithArrayProps<PropNames, RawBindings, D, C, M, Mixin, Extends, E, EE, I, II, S>
  export function defineMixin<PropsOptions extends Readonly<ComponentPropsOptions>, RawBindings, D, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, EE extends string = string, S extends SlotsType = {}, I extends ComponentInjectOptions = {}, II extends string = string>(options: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE, I, II, S>): ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE, I, II, S>

  export interface App<HostElement = Element> {
    mixin<Props = {}, RawBindings = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, EE extends string = string, S extends SlotsType = {}, I extends ComponentInjectOptions = {}, II extends string = string>(mixin: ComponentOptionsWithoutProps<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, I, II, S>): this
    mixin<PropNames extends string, RawBindings, D, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, EE extends string = string, S extends SlotsType = {}, I extends ComponentInjectOptions = {}, II extends string = string, Props = Readonly<{
      [key in PropNames]?: any;
    }>>(options: ComponentOptionsWithArrayProps<PropNames, RawBindings, D, C, M, Mixin, Extends, E, EE, I, II, S>): this
    mixin<PropsOptions extends Readonly<ComponentPropsOptions>, RawBindings, D, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = {}, EE extends string = string, S extends SlotsType = {}, I extends ComponentInjectOptions = {}, II extends string = string>(options: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE, I, II, S>): this

  }

  export interface ComponentCustomProperties {
    $data: Record<string, any | null>
    $callMethod: (methodName: string, ...args: (any | null)[]) => any | null
  }
  export type OnCleanup = (cleanupFn: () => void) => void;
  export function definePlugin<T extends Plugin = Plugin>(plugin: T): T
  export {
    createApp as createVueApp,
    defineComponent as defineApp
  }
}

declare module '@vue/reactivity' {
  export interface RefUnwrapBailTypes {
    runtimeDOMBailTypes: Uni;
  }

  export declare function toRef<T>(value: Ref<T>): Ref<T>;
  export declare function toRef<T>(fn: () => T): Ref<T>;
  export declare function toRef<T>(obj: object, key: string): Ref<T>;

  export declare function toRaw<T>(observed: any): T;
  export declare function customRef<T>(factory: Function): Ref<T>;
}
