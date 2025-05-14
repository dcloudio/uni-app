import path from 'path'
import fs from 'fs-extra'
import type { OutputAsset } from 'rollup'
import type { Plugin } from 'vite'
import {
  MANIFEST_JSON_UTS,
  parseJson,
  parseUniXFlexDirection,
  parseUniXSplashScreen,
  validateThemeValue,
} from '@dcloudio/uni-cli-shared'
import { ENTRY_FILENAME, stringifyMap } from './utils'
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
        manifestJson = parseJson(code, false, id)
        return {
          code: `export default 'manifest.json'`,
          map: {
            mappings: '',
          },
        }
      }
    },
    generateBundle(_, bundle) {
      if (bundle[ENTRY_FILENAME()]) {
        const asset = bundle[ENTRY_FILENAME()] as OutputAsset
        const singleThreadCode =
          manifestJson?.['uni-app-x']?.['singleThread'] === false
            ? `override singleThread = false`
            : ''
        const flexDir = parseUniXFlexDirection(manifestJson)
        const flexDirCode =
          flexDir !== 'column' ? `override flexDirection = "${flexDir}"` : ''
        const splashScreen = parseUniXSplashScreen('app-android', manifestJson)
        const splashScreenCode =
          splashScreen && Object.keys(splashScreen).length > 0
            ? `override splashScreen: Map<string, any> | null = ${stringifyMap(
                splashScreen
              )}`
            : ''

        const hasAppDefaultAppTheme = validateThemeValue(
          manifestJson.app?.defaultAppTheme
        )
        const hasDefaultAppTheme = validateThemeValue(
          manifestJson.defaultAppTheme
        )
        const defaultAppThemeCode = hasAppDefaultAppTheme
          ? `override defaultAppTheme: string = "${manifestJson.app.defaultAppTheme}"`
          : hasDefaultAppTheme
          ? `override defaultAppTheme: string = "${manifestJson.defaultAppTheme}"`
          : ''

        const codes = [
          singleThreadCode,
          flexDirCode,
          splashScreenCode,
          defaultAppThemeCode,
        ]
          .filter(Boolean)
          .join('\n')
        asset.source =
          asset.source +
          `
export class UniAppConfig extends io.dcloud.uniapp.appframe.AppConfig {
    override name: string = "${manifestJson.name || ''}"
    override appid: string = "${manifestJson.appid || ''}"
    override versionName: string = "${manifestJson.versionName || ''}"
    override versionCode: string = "${manifestJson.versionCode || ''}"
    override uniCompilerVersion: string = "${
      process.env.UNI_COMPILER_VERSION || ''
    }"
    ${codes}
    constructor() { super() }
}
`
      }
    },
    writeBundle() {
      outputManifestJson = normalizeManifestJson('app-android', manifestJson)
      if (process.env.NODE_ENV !== 'production') {
        // 发行模式下，需要等解析ext-api模块
        fs.outputFileSync(
          path.resolve(process.env.UNI_OUTPUT_DIR, 'manifest.json'),
          JSON.stringify(outputManifestJson, null, 2)
        )
      }
    },
  }
}
