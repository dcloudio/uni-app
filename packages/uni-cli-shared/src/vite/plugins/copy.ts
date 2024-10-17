import type { WatchOptions } from 'chokidar'
import type { Plugin, ResolvedConfig } from 'vite'
import { FileWatcher, type FileWatcherOptions } from '../../watcher'
import { M } from '../../messages'
import { output, resetOutput } from '../../logs'
import { debounce } from '@dcloudio/uni-shared'

export type UniViteCopyPluginTarget = Omit<FileWatcherOptions, 'verbose'> & {
  watchOptions?: WatchOptions
}
export interface UniViteCopyPluginOptions {
  targets: UniViteCopyPluginTarget[]
}
export function uniViteCopyPlugin({
  targets,
}: UniViteCopyPluginOptions): Plugin {
  let resolvedConfig: ResolvedConfig
  let initialized = false
  let isFirstBuild = true
  return {
    name: 'uni:copy',
    apply: 'build',
    configResolved(config) {
      resolvedConfig = config
    },
    async writeBundle() {
      if (initialized) {
        return
      }
      if (resolvedConfig.build.ssr) {
        return
      }
      initialized = true
      const is_prod =
        process.env.NODE_ENV !== 'development' ||
        process.env.UNI_AUTOMATOR_CONFIG
      const onChange = is_prod
        ? undefined
        : debounce(
            () => {
              if (isFirstBuild) {
                return
              }
              resetOutput('log')
              output('log', M['dev.watching.end'])
            },
            100,
            { setTimeout, clearTimeout }
          )
      return new Promise((resolve) => {
        Promise.all(
          targets.map(({ watchOptions, ...target }) => {
            return new Promise((resolve) => {
              new FileWatcher({
                ...target,
              }).watch(
                {
                  cwd: process.env.UNI_INPUT_DIR,
                  persistent: is_prod ? false : true,
                  ...watchOptions,
                },
                () => {
                  resolve(void 0)
                },
                onChange
              )
            })
          })
        ).then(() => resolve())
      })
    },
    closeBundle() {
      isFirstBuild = false
    },
  }
}
