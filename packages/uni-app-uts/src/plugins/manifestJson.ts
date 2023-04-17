import path from 'path'
import fs from 'fs-extra'
import type { OutputAsset } from 'rollup'
import type { Plugin } from 'vite'
import { parseJson } from '@dcloudio/uni-cli-shared'
import { MANIFEST_JSON_UTS } from './mainUTS'
import { ENTRY_FILENAME } from './utils'

function isManifest(id: string) {
  return id.endsWith(MANIFEST_JSON_UTS)
}

export function uniAppManifestPlugin(): Plugin {
  const manifestJsonPath = path.resolve(
    process.env.UNI_INPUT_DIR,
    'manifest.json'
  )
  const manifestJsonUTSPath = path.resolve(
    process.env.UNI_INPUT_DIR,
    MANIFEST_JSON_UTS
  )
  let manifestJson: Record<string, any> = {}
  return {
    name: 'uni:app-manifest',
    apply: 'build',
    resolveId(id) {
      if (isManifest(id)) {
        return manifestJsonUTSPath
      }
    },
    load(id) {
      if (isManifest(id)) {
        return fs.readFileSync(manifestJsonPath, 'utf8')
      }
    },
    transform(code, id) {
      if (isManifest(id)) {
        manifestJson = parseJson(code)
        return `export default 'manifest.json'`
      }
    },
    generateBundle(_, bundle) {
      if (bundle[ENTRY_FILENAME]) {
        const asset = bundle[ENTRY_FILENAME] as OutputAsset
        asset.source =
          asset.source +
          `
import "io.dcloud.uniapp.appframe.AppConfig"
export class UniAppConfig extends AppConfig {
    override name: string = "${manifestJson.name || ''}"
    override appid: string = "${manifestJson.appid || ''}"
    override versionName: string = "${manifestJson.versionName || ''}"
    override versionCode: string = "${manifestJson.versionCode || ''}"
}
`
      }
    },
  }
}
