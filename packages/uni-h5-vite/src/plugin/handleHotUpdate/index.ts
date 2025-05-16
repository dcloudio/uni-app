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
import isEqual from 'lodash/isEqual'

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
const pagesJsonPath = normalizePath(
  path.join(process.env.UNI_INPUT_DIR, 'pages.json')
)
const manifestJsonPath = normalizePath(
  path.join(process.env.UNI_INPUT_DIR, 'manifest.json')
)
const jsonMap: Record<string, Record<string, any>> = {
  [pagesJsonPath]: parsePagesJson(
    process.env.UNI_INPUT_DIR,
    process.env.UNI_PLATFORM
  ),
  [manifestJsonPath]: parseManifestJson(process.env.UNI_INPUT_DIR),
}
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
    const isPagesJson = file.endsWith('pages.json')
    const isManifestJson = file.endsWith('manifest.json')
    if (!isPagesJson && !isManifestJson) {
      return
    }
    const pagesJson = parsePagesJson(inputDir, platform)
    const manifestJson = parseManifestJson(inputDir)
    if (isPagesJson) {
      // 对比 pages.json 新旧文件内容，一致则不热更新
      if (isEqual(jsonMap[pagesJsonPath], pagesJson)) {
        return
      }
      jsonMap[pagesJsonPath] = pagesJson
    }
    if (isManifestJson) {
      // 对比 manifest.json 新旧文件内容，一致则不热更新
      if (isEqual(jsonMap[manifestJsonPath], manifestJson)) {
        return
      }
      jsonMap[manifestJsonPath] = manifestJson
    }
    debugHmr(file)
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
        manifestJson,
        ssr: !!middlewareMode,
      })
    )
    debugHmr('define', define)
    if (isPagesJson) {
      const easycom = pagesJson.easycom || {}
      const { easyComOptions, refresh } = initEasycomsOnce(inputDir, {
        dirs: resolveComponentsLibDirs(),
        platform,
        isX: process.env.UNI_APP_X === 'true',
      })
      if (
        !equal(
          { autoscan: easycom.autoscan, custom: easycom.custom },
          {
            autoscan: easyComOptions.autoscan,
            custom: easyComOptions.custom,
          }
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
