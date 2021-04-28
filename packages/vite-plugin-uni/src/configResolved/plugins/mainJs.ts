import path from 'path'
import slash from 'slash'
import { Plugin } from 'vite'
import { VitePluginUniResolvedOptions } from '../..'

export function uniMainJsPlugin(options: VitePluginUniResolvedOptions): Plugin {
  const mainPath = slash(path.resolve(options.inputDir, 'main'))
  const mainJsPath = mainPath + '.js'
  const mainTsPath = mainPath + '.ts'
  const pagesJsonJsPath = slash(path.resolve(options.inputDir, 'pages.json.js'))
  return {
    name: 'vite:uni-main-js',
    transform(code, id) {
      if (id === mainJsPath || id === mainTsPath) {
        let wrapperCode = `function createApp(rootComponent,rootProps){return createVueApp(rootComponent, rootProps).use(plugin)}`
        if (code.includes('createSSRApp')) {
          code = code.replace('createSSRApp', 'createVueSSRApp')
          wrapperCode = `function createSSRApp(rootComponent,rootProps){return createVueSSRApp(rootComponent, rootProps).use(plugin)}`
        } else {
          code = code.replace('createApp', 'createVueApp')
        }
        return {
          code: `import { plugin } from '@dcloudio/uni-h5';import '${pagesJsonJsPath}';${wrapperCode};${code}`,
          map: this.getCombinedSourcemap(),
        }
      }
    },
  }
}
