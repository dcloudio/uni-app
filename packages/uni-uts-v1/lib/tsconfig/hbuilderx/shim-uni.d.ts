import {
  createApp,
  defineComponent
} from 'vue'
declare module 'vue' {
  export interface ComponentCustomProperties {
    $data: Record<string, any>
    $callMethod: (methodName: string, ...args: any[]) => any
  }
  // TODO defineApp单独实现类型
  export {
    createApp as createVueApp,
    defineComponent as defineApp
  }
}
