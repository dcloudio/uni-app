import { ResolvedConfig } from 'vite'
import { parserOptions } from '@vue/compiler-dom'
import { isNativeTag } from '@dcloudio/uni-shared'
// import alias from 'module-alias'
export function initConfig(config: ResolvedConfig) {
  if (config.server.middlewareMode) {
    // TODO compiler-ssr时，传入的 isNativeTag 会被 @vue/compiler-dom 的 isNativeTag 覆盖
    // https://github.com/vuejs/vue-next/blob/master/packages/compiler-ssr/src/index.ts#L36
    parserOptions.isNativeTag = isNativeTag
  }
  //   let ssr = (config as any).ssr as SSROptions
  //   if (!ssr) {
  //     ssr = {}
  //   }
  //   if (ssr.external) {
  //     const index = ssr.external.findIndex((name) => name === 'vue')
  //     if (index !== -1) {
  //       ssr.external.splice(index, 1)
  //     }
  //   }
  //   if (!ssr.noExternal) {
  //     ssr.noExternal = ['vue']
  //   } else if (!ssr.noExternal.includes('vue')) {
  //     ssr.noExternal.push('vue')
  //   }
}
