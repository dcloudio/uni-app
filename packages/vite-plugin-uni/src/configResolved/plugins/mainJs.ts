import path from 'path'
import slash from 'slash'
import { Plugin, ResolvedConfig } from 'vite'
import { VitePluginUniResolvedOptions } from '../..'
import { generateSSRRenderCode } from '../../utils'

export function uniMainJsPlugin(
  config: ResolvedConfig,
  options: VitePluginUniResolvedOptions
): Plugin {
  const mainPath = slash(path.resolve(options.inputDir, 'main'))
  const mainJsPath = mainPath + '.js'
  const mainTsPath = mainPath + '.ts'
  const pagesJsonJsPath = slash(path.resolve(options.inputDir, 'pages.json.js'))
  const isSSR = config.server.middlewareMode
  return {
    name: 'vite:uni-main-js',
    transform(code, id, ssr) {
      if (id === mainJsPath || id === mainTsPath) {
        if (!isSSR) {
          code = createApp(code)
        } else {
          code = ssr ? createSSRServerApp(code) : createSSRClientApp(code)
        }
        return {
          code: `import { plugin } from '@dcloudio/uni-h5';import '${pagesJsonJsPath}';${code}`,
          map: this.getCombinedSourcemap(),
        }
      }
    },
  }
}

function createApp(code: string) {
  return `function createApp(rootComponent,rootProps){return createVueApp(rootComponent, rootProps).use(plugin)};${code.replace(
    'createApp',
    'createVueApp'
  )}`
}

function createSSRClientApp(code: string) {
  return `function createApp(rootComponent, rootProps) {const app = createVueSSRApp(rootComponent, rootProps).use(plugin);const oldMount = app.mount;app.mount = (selector) => app.router.isReady().then(() => oldMount.call(app, selector));return app;};${code.replace(
    'createApp',
    'createVueSSRApp'
  )}`
}

function createSSRServerApp(code: string) {
  return `${generateSSRRenderCode()};${code.replace(
    'createApp',
    'createVueSSRApp'
  )}`
}
