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
  return {
    name: 'uni:copy',
    apply: 'build',
    configResolved(config) {
      resolvedConfig = config
    },
    writeBundle() {
      if (initialized) {
        return
      }
      if (resolvedConfig.build.ssr) {
        return
      }
      initialized = true
      return new Promise((resolve) => {
        Promise.all(
          targets.map(({ watchOptions, ...target }) => {
            return new Promise((resolve) => {
              // 防抖，可能短时间触发很多次add,unlink
              const onChange = debounce(
                () => {
                  resetOutput('log')
                  output('log', M['dev.watching.end'])
                },
                100,
                { setTimeout, clearTimeout }
              )
              new FileWatcher({
                ...target,
              }).watch(
                {
                  cwd: process.env.UNI_INPUT_DIR,
                  ...watchOptions,
                },
                (watcher) => {
                  if (
                    process.env.NODE_ENV !== 'development' ||
                    process.env.UNI_AUTOMATOR_CONFIG
                  ) {
                    // 生产或自动化测试模式下，延迟 close，否则会影响 chokidar 初始化的 add 等事件
                    setTimeout(() => {
                      watcher.close().then(() => resolve(void 0))
                    }, 2000)
                  } else {
                    resolve(void 0)
                  }
                },
                onChange
              )
            })
          })
        ).then(() => resolve())
      })
    },
  }
}
