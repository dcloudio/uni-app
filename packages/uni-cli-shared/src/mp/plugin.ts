import fs from 'fs'
import path from 'path'
import type { UniViteCopyPluginTarget } from '../vite/plugins/copy'
import { parseJson } from '../json/json'
import { getPlatformManifestJsonOnce } from '../json/manifest'

export const copyMiniProgramPluginJson: UniViteCopyPluginTarget = {
  src: ['plugin.json'],
  get dest() {
    return process.env.UNI_OUTPUT_DIR
  },
  transform(source) {
    return JSON.stringify(parseJson(source.toString(), true), null, 2)
  },
}

export const copyMiniProgramThemeJson: () => UniViteCopyPluginTarget[] = () => {
  if (!process.env.UNI_INPUT_DIR) return []
  const manifestJson = getPlatformManifestJsonOnce()

  const themeLocation = manifestJson.themeLocation || 'theme.json'

  const hasThemeJson = fs.existsSync(
    path.resolve(process.env.UNI_INPUT_DIR, themeLocation)
  )

  if (hasThemeJson) {
    return [
      {
        src: [(manifestJson.themeLocation = themeLocation)],
        get dest() {
          return process.env.UNI_OUTPUT_DIR
        },
        transform(source) {
          return JSON.stringify(parseJson(source.toString(), true), null, 2)
        },
      },
    ]
  }
  return []
}
