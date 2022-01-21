import { DefinePlugin } from 'webpack'
import { extend } from '@vue/shared'
import { initDefine } from '@dcloudio/uni-cli-shared'

export function createDefinePlugin() {
  return new DefinePlugin(
    extend(
      {
        'process.env.UNI_STAT_TITLE_JSON': process.env.UNI_STAT_TITLE_JSON,
      },
      initDefine()
    )
  )
}
