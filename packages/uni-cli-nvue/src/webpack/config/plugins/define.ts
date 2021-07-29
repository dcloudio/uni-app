import { DefinePlugin } from 'webpack'
import { extend } from '@vue/shared'
import { initDefine } from '@dcloudio/uni-cli-shared'
export const define = new DefinePlugin(
  extend(
    {
      'process.env.UNI_CLOUD_PROVIDER': process.env.UNI_CLOUD_PROVIDER,
      'process.env.HBX_USER_TOKEN': JSON.stringify(
        process.env.HBX_USER_TOKEN || ''
      ),
    },
    initDefine()
  )
)
