import path from 'path'
import fs from 'fs-extra'
import type { Plugin } from 'vite'
import { MANIFEST_JSON_UTS, parseJson } from '@dcloudio/uni-cli-shared'
import { isManifest, normalizeManifestJson } from '../utils'

let outputManifestJson: Record<string, any> | undefined = undefined

export function getOutputManifestJson() {
  return outputManifestJson
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
        this.addWatchFile(
          path.resolve(process.env.UNI_INPUT_DIR, 'manifest.json')
        )
        manifestJson = parseJson(code)
        return `export default ${JSON.stringify(manifestJson)}`
      }
    },
    writeBundle() {
      outputManifestJson = normalizeManifestJson(manifestJson)
      fs.outputFileSync(
        path.resolve(process.env.UNI_OUTPUT_DIR, 'manifest.json'),
        JSON.stringify(outputManifestJson, null, 2)
      )
    },
  }
}
