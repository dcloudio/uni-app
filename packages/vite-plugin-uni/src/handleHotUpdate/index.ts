import path from 'path'
import debug from 'debug'
import slash from 'slash'
import { ModuleGraph, Plugin } from 'vite'
import { VitePluginUniResolvedOptions } from '..'
import { getFeatures } from '../utils'

const debugHmr = debug('uni:hmr')

async function invalidate(file: string, moduleGraph: ModuleGraph) {
  const mod = await moduleGraph.getModuleById(slash(file))
  if (mod) {
    debugHmr('invalidate', mod.id)
    moduleGraph.invalidateModule(mod)
  }
}

export function createHandleHotUpdate(
  options: VitePluginUniResolvedOptions
): Plugin['handleHotUpdate'] {
  return async function ({ file, server }) {
    // TODO 目前简单处理，当pages.json,manifest.json发生变化，就直接刷新，理想情况下，应该区分变化的内容，仅必要时做整页面刷新
    const isPagesJson = file.endsWith('pages.json')
    const isManifestJson = file.endsWith('manifest.json')
    if (isPagesJson || isManifestJson) {
      debugHmr(file)
      server.ws.send({
        type: 'custom',
        event: 'invalidate',
        data: {},
      })
      // 更新define
      Object.assign(
        server.config.define!,
        getFeatures(options, server.config.command)
      )
      debugHmr('define', server.config.define)
      // 当pages.json,manifest.json发生变化时，作废pages.json.js缓存
      await invalidate(
        path.resolve(options.inputDir, 'pages.json.js'),
        server.moduleGraph
      )
      if (isManifestJson) {
        await invalidate(
          path.resolve(options.inputDir, 'manifest.json.js'),
          server.moduleGraph
        )
      }
      return []
    }
  }
}
