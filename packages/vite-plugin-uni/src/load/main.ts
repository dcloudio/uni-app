import fs from 'fs'
import path from 'path'
import slash from 'slash'
import { VitePluginUniResolvedOptions } from '..'

let mainJsPath: string
let mainTsPath: string
let pagesJsPath: string
export const main = {
  test(id: string, inputDir: string) {
    if (!mainJsPath) {
      const mainPath = slash(path.resolve(inputDir, 'main'))
      mainJsPath = mainPath + '.js'
      mainTsPath = mainPath + '.ts'
    }
    return id === mainJsPath || id === mainTsPath
  },
  load(filename: string, options: VitePluginUniResolvedOptions) {
    if (!pagesJsPath) {
      pagesJsPath = slash(path.resolve(options.inputDir, 'pages.json.js'))
    }
    return `import '@dcloudio/uni-h5/style/base.css';import '${pagesJsPath}';${fs
      .readFileSync(filename, 'utf-8')
      .toString()}`
  },
}
