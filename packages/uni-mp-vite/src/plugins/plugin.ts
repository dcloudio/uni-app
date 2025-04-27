import fs from 'fs'
import path from 'path'
import type { BuildOptions, Plugin } from 'vite'
import {
  MP_PLUGIN_JSON_NAME,
  parseJson,
  removeExt,
  resolveMainPathOnce,
} from '@dcloudio/uni-cli-shared'
import type { UniMiniProgramPluginOptions } from '../plugin'
import { createNonAppGenerateBundle } from './subpackage'
import { extend } from '@vue/shared'
import { notFound } from '../plugin/build'

export function uniMiniProgramPluginPlugin({
  style: { extname },
}: UniMiniProgramPluginOptions): Plugin {
  const entry = initPluginEntry()
  const rollupOptions: BuildOptions['rollupOptions'] = {}
  if (entry) {
    rollupOptions.input = extend(
      {
        app: resolveMainPathOnce(process.env.UNI_INPUT_DIR),
      },
      entry
    )
  }
  return {
    name: 'uni:mp-plugin',
    enforce: 'post',
    config() {
      return {
        build: {
          rollupOptions,
        },
      }
    },
    generateBundle: createNonAppGenerateBundle(extname),
  }
}

function initPluginEntry(): Record<string, string> | void {
  const pluginJsonFilename = path.resolve(
    process.env.UNI_INPUT_DIR,
    MP_PLUGIN_JSON_NAME
  )
  if (!fs.existsSync(pluginJsonFilename)) {
    notFound(pluginJsonFilename)
  }
  const pluginJson = parseJson(
    fs.readFileSync(pluginJsonFilename, 'utf8'),
    true,
    pluginJsonFilename
  )
  if (!pluginJson.main) {
    return
  }
  const mainFilename = path.resolve(process.env.UNI_INPUT_DIR, pluginJson.main)
  if (!fs.existsSync(mainFilename)) {
    notFound(mainFilename)
  }
  return {
    [removeExt(pluginJson.main)]: mainFilename,
  }
}
