import slash from 'slash'
import { once } from '@dcloudio/uni-shared'

export const isInHBuilderX = once(() => {
  const { UNI_HBUILDERX_PLUGINS, UNI_CLI_CONTEXT } = process.env
  if (!UNI_HBUILDERX_PLUGINS || !UNI_CLI_CONTEXT) {
    return false
  }
  return slash(UNI_CLI_CONTEXT).startsWith(slash(UNI_HBUILDERX_PLUGINS))
})

export const runByHBuilderX = once(() => {
  return !!process.env.UNI_HBUILDERX_PLUGINS
})
