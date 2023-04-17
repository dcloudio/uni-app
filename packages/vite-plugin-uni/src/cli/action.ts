import { extend } from '@vue/shared'
import { RollupWatcher } from 'rollup'
import type { BuildOptions, ServerOptions } from 'vite'
import {
  APP_CONFIG_SERVICE,
  APP_SERVICE_FILENAME,
  M,
  output,
} from '@dcloudio/uni-cli-shared'
import { CliOptions } from '.'
import { build, buildSSR } from './build'
import { createServer, createSSRServer } from './server'
import {
  type PLATFORM,
  initEnv,
  printStartupDuration,
  showRunPrompt,
} from './utils'
import { initEasycom } from '../utils/easycom'
import { runUVueDev } from './uvue'

export async function runDev(options: CliOptions & ServerOptions) {
  extend(options, {
    watch: {},
  })
  if (process.env.UNI_MINIMIZE === 'true') {
    ;(options as BuildOptions).minify = true
  }
  initEnv('dev', options)
  if (process.env.UNI_UVUE === 'true') {
    return runUVueDev(options)
  }
  const createLogger = await import('vite').then(
    ({ createLogger }) => createLogger
  )
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
            isFirstStart = false
            return
          }
          output('log', M['dev.watching.start'])
        } else if (event.code === 'BUNDLE_END') {
          event.result.close()
          if (isFirstEnd) {
            // 首次全量同步
            if (options.platform === 'app') {
              process.env.UNI_APP_CHANGED_PAGES = ''
              process.env.UNI_APP_CHANGED_FILES = ''
              process.env.UNI_APP_UTS_CHANGED_FILES = ''
            }
            isFirstEnd = false
            output('log', M['dev.watching.end'])
            showRunPrompt(options.platform as PLATFORM)
            printStartupDuration(createLogger(options.logLevel), false)
            if (process.env.UNI_UTS_ERRORS) {
              console.error(process.env.UNI_UTS_ERRORS)
            }
            if (process.env.UNI_UTS_TIPS) {
              console.warn(process.env.UNI_UTS_TIPS)
            }
            return
          }
          if (options.platform === 'app') {
            const files = process.env.UNI_APP_CHANGED_FILES
            const pages = process.env.UNI_APP_CHANGED_PAGES
            const dex = process.env.UNI_APP_UTS_CHANGED_FILES
            const changedFiles = pages || files
            process.env.UNI_APP_CHANGED_PAGES = ''
            process.env.UNI_APP_CHANGED_FILES = ''
            process.env.UNI_APP_UTS_CHANGED_FILES = ''
            if (
              (changedFiles &&
                !changedFiles.includes(APP_CONFIG_SERVICE) &&
                !changedFiles.includes(APP_SERVICE_FILENAME)) ||
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
    if (options.platform !== 'h5') {
      showRunPrompt(options.platform as PLATFORM)
    }
  } catch (e: any) {
    console.error(`Build failed with errors.`)
    process.exit(1)
  }
}
