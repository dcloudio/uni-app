import { extend } from '@vue/shared'
import { RollupWatcher } from 'rollup'
import { BuildOptions, createLogger, ServerOptions } from 'vite'
import { APP_CONFIG_SERVICE, M, output } from '@dcloudio/uni-cli-shared'
import { CliOptions } from '.'
import { build, buildSSR } from './build'
import { createServer, createSSRServer } from './server'
import { initEnv, printStartupDuration } from './utils'
import { initEasycom } from '../utils/easycom'

export async function runDev(options: CliOptions & ServerOptions) {
  extend(options, {
    watch: {},
  })
  if (process.env.UNI_MINIMIZE === 'true') {
    ;(options as BuildOptions).minify = true
  }
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
          output('log', M['dev.watching.start'])
        } else if (event.code === 'BUNDLE_END') {
          event.result.close()
          if (isFirstEnd) {
            // 首次全量同步
            return (
              (isFirstEnd = false),
              output('log', M['dev.watching.end']),
              printStartupDuration(createLogger(options.logLevel), false)
            )
          }
          const files = process.env.UNI_APP_CHANGED_FILES
          const pages = process.env.UNI_APP_CHANGED_PAGES
          const dex = process.env.UNI_APP_CHANGED_DEX_FILES
          const changedFiles = pages || files
          process.env.UNI_APP_CHANGED_PAGES = ''
          process.env.UNI_APP_CHANGED_FILES = ''
          process.env.UNI_APP_CHANGED_DEX_FILES = ''
          if (
            (changedFiles && !changedFiles.includes(APP_CONFIG_SERVICE)) ||
            dex
          ) {
            if (pages) {
              return output(
                'log',
                M['dev.watching.end.pages'].replace('{pages}', changedFiles)
              )
            }
            return output(
              'log',
              M['dev.watching.end.files'].replace(
                '{files}',
                JSON.stringify(
                  JSON.parse(changedFiles || JSON.stringify([])).concat(
                    JSON.parse(dex || JSON.stringify([]))
                  )
                )
              )
            )
          }
          return output('log', M['dev.watching.end'])
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
