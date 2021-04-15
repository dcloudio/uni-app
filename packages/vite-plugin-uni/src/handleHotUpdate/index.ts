import path from 'path'
import debug from 'debug'
import slash from 'slash'
import { ModuleGraph, Plugin } from 'vite'
import { VitePluginUniResolvedOptions } from '..'
import { getFeatures } from '../utils'

const debugHmr = debug('uni:hmr')

async function invalidate(file: string, moduleGraph: ModuleGraph) {
  const mods = await moduleGraph.getModulesByFile(slash(file))
  if (mods && mods.size) {
    ;[...mods].forEach((mod) => {
      debugHmr('invalidate', mod.id)
      moduleGraph.invalidateModule(mod)
    })
  }
}

let invalidateFiles: string[]
export function createHandleHotUpdate(
  options: VitePluginUniResolvedOptions
): Plugin['handleHotUpdate'] {
  return async function ({ file, server }) {
    if (!invalidateFiles) {
      // options.inputDir 的赋值时机是在config中，不能直接使用在上边声明使用
      invalidateFiles = [
        path.resolve(options.inputDir, 'pages.json.js'),
        path.resolve(options.inputDir, 'manifest.json.js'),
        require.resolve('@dcloudio/uni-h5/dist/uni-h5.esm.js'),
        require.resolve('vite/dist/client/env.js'),
      ]
    }
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
      for (const file of invalidateFiles) {
        await invalidate(file, server.moduleGraph)
      }
      return []
    }
  }
}
