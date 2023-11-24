import { createApp } from 'vue'
declare module 'vue' {
  export interface ComponentCustomProperties {
    $data: Record<string, any>
    $callMethod: (methodName: string, ...args: any[]) => any
  }
  export { createApp as createVueApp }
}
