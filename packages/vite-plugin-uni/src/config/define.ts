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
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: true,
      __VUE_I18N_PROD_DEVTOOLS__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    initDefine()
  )
}
