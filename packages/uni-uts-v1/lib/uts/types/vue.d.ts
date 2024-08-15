/// <reference path="./@vue/global.d.ts" />
declare module 'vue' {
  interface ComponentCustomProperties {
    $exposed: Record<string, any | null>
    $callMethod(method: string, ...args: Array<any | null>): any | null
  }
}

declare module '@vue/reactivity' {
  interface RefUnwrapBailTypes {
    utsBailTypes: UTSJSONObject
  }
}

export {}
