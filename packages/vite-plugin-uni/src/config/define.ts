import type { UserConfig } from 'vite'
import { extend } from '@vue/shared'
import { initDefine } from '@dcloudio/uni-cli-shared'
import type { VitePluginUniResolvedOptions } from '..'

export function createDefine(
  _: VitePluginUniResolvedOptions
): UserConfig['define'] {
  const isX = process.env.UNI_APP_X === 'true'
  return extend(
    {
      // uni-app x 不支持 vue-i18n 基于运行时 render 的内置组件和 Legacy API
      __VUE_I18N_FULL_INSTALL__: !isX,
      __VUE_I18N_LEGACY_API__: !isX,
      __VUE_I18N_PROD_DEVTOOLS__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
      __INTLIFY_DROP_MESSAGE_COMPILER__: false,
    },
    initDefine()
  )
}
