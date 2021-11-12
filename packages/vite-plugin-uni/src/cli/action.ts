import { extend } from '@vue/shared'
import { RollupWatcher } from 'rollup'
import type { BuildOptions, ServerOptions } from 'vite'
import { M } from '@dcloudio/uni-cli-shared'
import { CliOptions } from '.'
import { build, buildSSR } from './build'
import { createServer, createSSRServer } from './server'
import { initEnv } from './utils'
import { initEasycom } from '../utils/easycom'

export async function runDev(options: CliOptions & ServerOptions) {
  extend(options, { watch: true, minify: false })
  initEnv('dev', options)
  try {
    if (options.platform === 'h5') {
      const server = await (options.ssr
        ? createSSRServer(options)
        : createServer(options))
      initEasycom(server.watcher)
    } else {
      const watcher = (await build(options)) as RollupWatcher
      initEasycom()
      let isFirstStart = true
      let isFirstEnd = true
      watcher.on('event', (event) => {
        if (event.code === 'BUNDLE_START') {
          if (isFirstStart) {
            return (isFirstStart = false)
          }
          console.log(M['dev.watching.start'])
        } else if (event.code === 'BUNDLE_END') {
          event.result.close()
          if (options.platform !== 'app') {
            // 非App平台无需处理增量同步
            return console.log(M['dev.watching.end'])
          }
          if (isFirstEnd) {
            // 首次全量同步
            return (isFirstEnd = false), console.log(M['dev.watching.end'])
          }
          if (process.env.UNI_APP_CHANGED_FILES) {
            return console.log(
              M['dev.watching.end.files'].replace(
                '{files}',
                process.env.UNI_APP_CHANGED_FILES
              )
            )
          }
          return console.log(M['dev.watching.end'])
        }
      })
    }
  } catch (e: any) {
    if (options.platform === 'h5') {
      console.error(`error when starting dev server:\n${e.stack || e}`)
    } else {
      console.error(`error during build:\n${e.stack || e}`)
    }
    process.exit(1)
  }
}

export async function runBuild(options: CliOptions & BuildOptions) {
  initEnv('build', options)
  try {
    await (options.ssr && options.platform === 'h5'
      ? buildSSR(options)
      : build(options))
    console.log(M['build.done'])
  } catch (e: any) {
    console.error(`error during build:\n${e.stack || e}`)
    process.exit(1)
  }
}
