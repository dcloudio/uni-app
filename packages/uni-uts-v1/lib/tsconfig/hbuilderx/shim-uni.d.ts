import { createApp, defineComponent, Ref } from 'vue'
declare module 'vue' {
  export interface ComponentCustomProperties {
    $data: Record<string, any | null>
    $callMethod: (methodName: string, ...args: (any | null)[]) => any | null
  }
  export type OnCleanup = (cleanupFn: () => void) => void;
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
