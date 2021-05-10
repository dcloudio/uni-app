import { ResolvedConfig } from 'vite'
import { isSsr, rewriteSsrNativeTag, rewriteSsrRenderStyle } from '../utils'

// import alias from 'module-alias'
export function initConfig(config: ResolvedConfig) {
  if (isSsr(config.command, config)) {
    rewriteSsrNativeTag()
    rewriteSsrRenderStyle(process.env.UNI_INPUT_DIR)
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
