import { UniViteCopyPluginTarget } from '../vite/plugins/copy'
import { parseJson } from '../json/json'
import { parseManifestJsonOnce } from '../json/manifest'

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
  const manifestJson =
    parseManifestJsonOnce(process.env.UNI_INPUT_DIR)[
      process.env.UNI_PLATFORM
    ] || {}

  return (manifestJson.darkmode && manifestJson.themeLocation) ||
    (manifestJson.themeLocation = 'theme.json')
    ? [
        {
          src: [manifestJson.themeLocation],
          get dest() {
            return process.env.UNI_OUTPUT_DIR
          },
          transform(source) {
            return JSON.stringify(parseJson(source.toString(), true), null, 2)
          },
        },
      ]
    : []
}
