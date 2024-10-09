import path from 'path'
import debug from 'debug'
import type { ModuleGraph, Plugin } from 'vite'
import { extend } from '@vue/shared'
import {
  MANIFEST_JSON_JS,
  PAGES_JSON_JS,
  initEasycomsOnce,
  initFeatures,
  normalizePath,
  parseManifestJson,
  parsePagesJson,
  resolveBuiltIn,
  resolveComponentsLibDirs,
} from '@dcloudio/uni-cli-shared'

const debugHmr = debug('uni:hmr')

async function invalidate(file: string, moduleGraph: ModuleGraph) {
  const mods = await moduleGraph.getModulesByFile(normalizePath(file))
  if (mods && mods.size) {
    ;[...mods].forEach((mod) => {
      debugHmr('invalidate', mod.id)
      moduleGraph.invalidateModule(mod)
    })
  }
}
let invalidateFiles: string[]
export function createHandleHotUpdate(): Plugin['handleHotUpdate'] {
  return async function ({ file, server }) {
    const inputDir = process.env.UNI_INPUT_DIR
    const platform = process.env.UNI_PLATFORM
    if (!invalidateFiles) {
      invalidateFiles = [
        path.resolve(inputDir, PAGES_JSON_JS),
        path.resolve(inputDir, MANIFEST_JSON_JS),
        resolveBuiltIn(
          '@dcloudio/uni-h5/' +
            (process.env.UNI_APP_X === 'true' ? 'dist-x' : 'dist') +
            '/uni-h5.es.js'
        ),
      ]
      try {
        invalidateFiles.push(resolveBuiltIn('vite/dist/client/env.mjs'))
      } catch (e) {}
    }
    // TODO 目前简单处理，当pages.json,manifest.json发生变化，就直接刷新，理想情况下，应该区分变化的内容，仅必要时做整页面刷新
    const isPagesJson = file.endsWith('pages.json')
    const isManifestJson = file.endsWith('manifest.json')
    if (!isPagesJson && !isManifestJson) {
      return
    }
    debugHmr(file)
    const pagesJson = parsePagesJson(inputDir, platform)
    // 更新define
    const {
      define,
      server: { middlewareMode },
    } = server.config
    extend(
      define!,
      initFeatures({
        inputDir,
        command: 'serve',
        platform,
        pagesJson,
        manifestJson: parseManifestJson(inputDir),
        ssr: !!middlewareMode,
      })
    )
    debugHmr('define', define)
    if (isPagesJson) {
      const easycom = pagesJson.easycom || {}
      const { options, refresh } = initEasycomsOnce(inputDir, {
        dirs: resolveComponentsLibDirs(),
        platform,
        isX: process.env.UNI_APP_X === 'true',
      })
      if (
        !equal(
          { autoscan: easycom.autoscan, custom: easycom.custom },
          { autoscan: options.autoscan, custom: options.custom }
        )
      ) {
        refresh()
      }
    }
    // 当pages.json,manifest.json发生变化时，作废pages.json.js缓存
    for (const file of invalidateFiles) {
      await invalidate(file, server.moduleGraph)
    }
    server.ws.send({
      type: 'full-reload',
      path: '*',
    })
    return []
  }
}

function equal(obj1: Record<string, any>, obj2: Record<string, any>) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}
