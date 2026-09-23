import path from 'path'
import { once } from '@dcloudio/uni-shared'

const getHBuilderXPluginPaths = once(() => {
  const raw = process.env.HX_PLUGIN_PATHS
  if (!raw) {
    return
  }

  const pluginPaths = JSON.parse(raw)
  if (
    !pluginPaths ||
    typeof pluginPaths !== 'object' ||
    Array.isArray(pluginPaths)
  ) {
    throw new Error('Invalid HX_PLUGIN_PATHS')
  }
  return pluginPaths as Record<string, string>
})

export function resolveHBuilderXPluginPath(
  pluginName: string,
  ...subpaths: string[]
): string | undefined {
  const pluginPaths = getHBuilderXPluginPaths()
  const pluginPath = pluginPaths
    ? pluginPaths[pluginName]
    : process.env.UNI_HBUILDERX_PLUGINS
    ? path.resolve(process.env.UNI_HBUILDERX_PLUGINS, pluginName)
    : undefined
  return pluginPath ? path.resolve(pluginPath, ...subpaths) : undefined
}
