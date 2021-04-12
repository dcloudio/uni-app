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
        return {
          code: `import { openBlock, createBlock } from 'vue';import { plugin,LayoutComponent } from '@dcloudio/uni-h5';import '${pagesJsonJsPath}';function createApp(rootComponent,rootProps){rootComponent && (rootComponent.mpType = 'app',rootComponent.render = ()=>(openBlock(),createBlock(LayoutComponent)));return createVueApp(rootComponent, rootProps).use(plugin)};${code.replace(
            'createApp',
            'createVueApp'
          )}`,
          map: this.getCombinedSourcemap(),
        }
      }
    },
  }
}
