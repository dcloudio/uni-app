/// <reference types="../../../../../../uniapp-cli-vite/node_modules/vite/client" />
/// <reference types="../../../../../../hbuilderx-language-services/builtin-dts/uts-types/common/index.d.ts" />
/// <reference types="../../../../../../hbuilderx-language-services/builtin-dts/uniappx/node_modules/@vue/global.d.ts" />
/// <reference types="../../../../../../hbuilderx-language-services/builtin-dts/uniappx/node_modules/@dcloudio/uni-app-x/types/index.d.ts" />
// TODO 类型文件位置需要调整以便支持cli
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.uvue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
