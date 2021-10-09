import fs from 'fs'
import path from 'path'
import { parse as parseUrl } from 'url'
import {
  isInHBuilderX,
  resolveMainPathOnce,
  UniVitePlugin,
  getRouterOptions,
  parseManifestJsonOnce,
  EXTNAME_VUE_RE,
} from '@dcloudio/uni-cli-shared'
import { createHandleHotUpdate } from './handleHotUpdate'
import { createTransformIndexHtml } from './transformIndexHtml'
import { createDefine } from '../utils/features'
import { isSsr } from '../utils'
import { ViteDevServer } from 'vite'
import { esbuildPrePlugin } from './esbuild/esbuildPrePlugin'

const external = [
  '@dcloudio/uni-app',
  '@dcloudio/uni-cloud',
  '@dcloudio/uni-h5',
  '@dcloudio/uni-h5-vue',
  '@dcloudio/uni-i18n',
  '@dcloudio/uni-shared',
  '@dcloudio/uni-stat',
  '@vue/shared',
  'vue',
  'vue-i18n',
  'vue-router',
  'vuex',
]

export const UniH5Plugin: UniVitePlugin = {
  name: 'vite:uni-h5',
  uni: {
    copyOptions: {
      assets: ['hybrid/html'],
    },
    transformEvent: {
      tap: 'click',
    },
  },
  config(config, env) {
    if (isInHBuilderX()) {
      if (
        !fs.existsSync(path.resolve(process.env.UNI_INPUT_DIR, 'index.html'))
      ) {
        console.error(`请确认您的项目模板是否支持vue3：根目录缺少 index.html`)
        process.exit()
      }
    }
    return {
      optimizeDeps: {
        entries: resolveMainPathOnce(process.env.UNI_INPUT_DIR),
        exclude: external,
        esbuildOptions: {
          plugins: [esbuildPrePlugin()],
        },
      },
      define: createDefine(env.command, config),
      server: {
        host: true,
        fs: {
          strict: false,
        },
      },
      ssr: {
        external,
      },
      build: {
        rollupOptions: {
          // resolveSSRExternal 会判定package.json，hbx 工程可能没有，通过 rollup 来配置
          external: isSsr(env.command, config) ? external : [],
        },
      },
    }
  },
  configResolved(config) {
    // TODO 禁止 optimizeDeps
    ;(config as any).cacheDir = ''
  },
  configureServer(server: ViteDevServer) {
    const { ssrLoadModule } = server
    let added = false
    server.ssrLoadModule = (url) => {
      const res = ssrLoadModule(url)
      if (!added) {
        // HBuilderX项目，根目录可能没有package.json，导致 ssrExternals 不生效
        added = true
        if ((server as any)._ssrExternals) {
          const { _ssrExternals } = server as unknown as {
            _ssrExternals: string[]
          }
          external.forEach((module) => {
            if (!_ssrExternals.includes(module)) {
              _ssrExternals.push(module)
            }
          })
        }
      }
      return res
    }
    const routerOptions = getRouterOptions(
      parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
    )
    if (routerOptions.mode === 'history') {
      server.middlewares.use(async (req, res, next) => {
        // 当页面被作为组件引用时，会导致history刷新该页面直接显示js代码，因为该页面已被缓存为了module，
        // https://github.com/vitejs/vite/blob/702d50315535c189151c67d33e4a22124f926bed/packages/vite/src/node/server/transformRequest.ts#L52
        // /pages/tabBar/API/API
        let { url } = req
        if (url) {
          const base = server.config.base
          const parsed = parseUrl(url)
          let newUrl = url
          if ((parsed.pathname || '/').startsWith(base)) {
            newUrl = newUrl.replace(base, '/')
          }
          if (
            !path.extname(newUrl) &&
            !newUrl.endsWith('/') &&
            !newUrl.includes('?')
          ) {
            const module = await server.moduleGraph.getModuleByUrl(newUrl)
            if (module && module.file && EXTNAME_VUE_RE.test(module.file)) {
              // /pages/tabBar/API/API => /pages/tabBar/API/API?__t__=time
              req.url = url + '?__t__=' + Date.now()
            }
          }
        }
        next()
      })
    }
  },
  handleHotUpdate: createHandleHotUpdate(),
  transformIndexHtml: createTransformIndexHtml(),
}
