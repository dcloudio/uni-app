import { Plugin, ResolvedConfig } from 'vite'
import { FileWatcher } from '../../watcher'
import { M } from '../../messages'
export interface UniViteCopyPluginTarget {
  src: string | string[]
  dest: string
}
export interface UniViteCopyPluginOptions {
  targets: UniViteCopyPluginTarget[]
  verbose: boolean
}
export function uniViteCopyPlugin({
  targets,
  verbose,
}: UniViteCopyPluginOptions): Plugin {
  let resolvedConfig: ResolvedConfig
  let inited = false
  return {
    name: 'vite:uni-copy',
    apply: 'build',
    configResolved(config) {
      resolvedConfig = config
    },
    writeBundle() {
      if (inited) {
        return
      }
      if (resolvedConfig.build.ssr) {
        return
      }
      inited = true
      return new Promise((resolve) => {
        Promise.all(
          targets.map((target) => {
            return new Promise((resolve) => {
              new FileWatcher({
                verbose,
                ...target,
              }).watch(
                {
                  cwd: process.env.UNI_INPUT_DIR,
                },
                (watcher) => {
                  if (process.env.NODE_ENV !== 'development') {
                    watcher.close().then(() => resolve(void 0))
                  } else {
                    resolve(void 0)
                  }
                },
                () => {
                  console.log(M['dev.watching.end'])
                }
              )
            })
          })
        ).then(() => resolve())
      })
    },
  }
}
