import { UniViteCopyPluginTarget } from '../vite/plugins/copy'
import { parseJson } from '../json/json'

export const copyMiniProgramPluginJson: UniViteCopyPluginTarget = {
  src: ['plugin.json'],
  get dest() {
    return process.env.UNI_OUTPUT_DIR
  },
  transform(source) {
    return JSON.stringify(parseJson(source.toString(), true), null, 2)
  },
}
