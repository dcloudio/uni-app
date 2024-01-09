import {
  createApp,
  defineComponent
} from 'vue'
declare module 'vue' {
  export interface ComponentCustomProperties {
    $data: Record<string, any | null>
    $callMethod: (methodName: string, ...args: (any | null)[]) => any | null
  }
  // TODO defineApp单独实现类型
  export {
    createApp as createVueApp,
    defineComponent as defineApp
  }
}
