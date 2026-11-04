import fs from 'fs'
import path from 'path'
import type { Plugin, ResolvedConfig } from 'vite'
import {
  getPlatformManifestJson,
  parseManifestJsonOnce,
} from '@dcloudio/uni-cli-shared'

let script: string | undefined

export function getMouseToTouchScript() {
  if (script === undefined) {
    const sourcePath = require.resolve('hammer-touchemulator/touch-emulator.js')
    const source = fs.readFileSync(sourcePath, 'utf8')
    script = `${source}\n;window.TouchEmulator();`
  }
  return script
}

function isEnabled() {
  return (
    getPlatformManifestJson(
      parseManifestJsonOnce(process.env.UNI_INPUT_DIR),
      'h5'
    ).mouseToTouch === true
  )
}

export function uniMouseToTouchPlugin(): Plugin {
  let config: ResolvedConfig
  let scriptReferenceId: string | undefined
  let getBuildFileName: (() => string) | undefined

  function scriptSrc() {
    const fileName = getBuildFileName
      ? getBuildFileName()
      : path.posix.join(config.build.assetsDir, 'touch-emulator.js')
    return config.base + fileName
  }

  return {
    name: 'uni:mouse-to-touch',
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    buildStart() {
      scriptReferenceId = undefined
      getBuildFileName = undefined
      if (config.command === 'build' && !config.build.ssr && isEnabled()) {
        scriptReferenceId = this.emitFile({
          type: 'asset',
          name: 'touch-emulator.js',
          source: getMouseToTouchScript(),
        })
      }
    },
    renderStart() {
      const referenceId = scriptReferenceId
      if (referenceId) {
        getBuildFileName = () => this.getFileName(referenceId)
      }
    },
    configureServer(server) {
      const pathname = new URL(scriptSrc(), 'http://localhost').pathname
      server.middlewares.use((req, res, next) => {
        if (
          !isEnabled() ||
          (req.method !== 'GET' && req.method !== 'HEAD') ||
          req.url?.split('?')[0] !== pathname
        ) {
          return next()
        }
        res.setHeader('Content-Type', 'text/javascript; charset=utf-8')
        res.setHeader('Cache-Control', 'no-cache')
        res.end(req.method === 'HEAD' ? undefined : getMouseToTouchScript())
      })
    },
    transformIndexHtml: {
      order: 'post',
      handler() {
        if (!isEnabled()) {
          return
        }
        return [
          {
            tag: 'script',
            attrs: { src: scriptSrc() },
            injectTo: 'head-prepend',
          },
        ]
      },
    },
  }
}
