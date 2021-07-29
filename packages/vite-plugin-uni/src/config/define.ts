import { UserConfig } from 'vite'
import { extend } from '@vue/shared'
import { initDefine } from '@dcloudio/uni-cli-shared'
import { VitePluginUniResolvedOptions } from '..'

export function createDefine(
  _: VitePluginUniResolvedOptions
): UserConfig['define'] {
  return extend(
    {
      __VUE_PROD_DEVTOOLS__: false,
    },
    initDefine()
  )
}
