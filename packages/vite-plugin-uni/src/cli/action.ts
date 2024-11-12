import fs from 'fs'
import path from 'path'
import colors from 'picocolors'
import { extend } from '@vue/shared'
import type { RollupWatcher } from 'rollup'
import { type BuildOptions, type ServerOptions, createLogger } from 'vite'
import {
  APP_CONFIG_SERVICE,
  APP_SERVICE_FILENAME,
  M,
  isInHBuilderX,
  output,
} from '@dcloudio/uni-cli-shared'
import type { CliOptions } from '.'
import { build, buildSSR } from './build'
import { createSSRServer, createServer } from './server'
import {
  type PLATFORM,
  initEnv,
  printStartupDuration,
  showRunPrompt,
} from './utils'
import { initEasycom } from '../utils/easycom'
import { runUVueAndroidBuild, runUVueAndroidDev } from './uvue'
import type { FSWatcher } from 'chokidar'

export async function runDev(options: CliOptions & ServerOptions) {
  extend(options, {
    watch: {},
  })
  if (process.env.UNI_MINIMIZE === 'true') {
    ;(options as BuildOptions).minify = true
  }
  initEnv('dev', options)
  if (
    process.env.UNI_APP_X === 'true' &&
    process.env.UNI_UTS_PLATFORM === 'app-android'
  ) {
    return runUVueAndroidDev(options)
  }
  const createLogger = await import('vite').then(
    ({ createLogger }) => createLogger
  )
  try {
    if (options.platform === 'h5') {
      const server = await (options.ssr
        ? createSSRServer(options)
        : createServer(options))
      initEasycom(server.watcher as FSWatcher)
    } else {
      const watcher = (await build(options)) as RollupWatcher
      initEasycom()
      let isFirstStart = true
      let isFirstEnd = true
      watcher.on('event', async (event) => {
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
            if (
              options.platform === 'app' ||
              options.platform === 'app-harmony'
            ) {
              process.env.UNI_APP_CHANGED_FILES = ''
            }
            if (options.platform === 'app') {
              process.env.UNI_APP_CHANGED_PAGES = ''
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
            await stopProfiler((message) =>
              createLogger(options.logLevel).info(message)
            )
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
          } else if (options.platform === 'app-harmony') {
            const files = process.env.UNI_APP_CHANGED_FILES
            if (files) {
              return output(
                'log',
                M['dev.watching.end.files'].replace('{files}', files)
              )
            }
          }
          return output('log', M['dev.watching.end'])
        } else if (event.code === 'END') {
          if (process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
            setTimeout(() => {
              output('log', M['build.failed'])
              process.exit(0)
            }, 2000)
          }
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
  if (
    process.env.UNI_APP_X === 'true' &&
    process.env.UNI_UTS_PLATFORM === 'app-android'
  ) {
    return runUVueAndroidBuild(options)
  }
  try {
    await (options.ssr && options.platform === 'h5'
      ? buildSSR(options)
      : build(options))
    await stopProfiler((message) =>
      createLogger(options.logLevel).info(message)
    )
    console.log(M['build.done'])
    if (options.platform !== 'h5') {
      showRunPrompt(options.platform as PLATFORM)
    }
    // 开发者可能用了三方插件，三方插件有可能阻止退出，导致HBuilderX打包状态识别不正确
    if (
      isInHBuilderX() ||
      /* 需要排查为什么ext-api编译时没有自动结束 */ process.env
        .UNI_COMPILE_TARGET === 'ext-api'
    ) {
      process.exit(0)
    }
  } catch (e: any) {
    console.error(e.message || e)
    console.error(`Build failed with errors.`)
    process.exit(1)
  }
}

let profileSession = global.__vite_profile_session

let profileCount = 0

export const stopProfiler = (
  log: (message: string) => void
): void | Promise<void> => {
  if (!profileSession) return
  return new Promise((res, rej) => {
    profileSession!.post('Profiler.stop', (err: any, result: any) => {
      // Write profile to disk, upload, etc.
      if (!err) {
        const outPath = path.resolve(
          process.env.UNI_INPUT_DIR,
          `./profile-${profileCount++}.cpuprofile`
        )
        fs.writeFileSync(outPath, JSON.stringify(result.profile))
        log(
          colors.yellow(
            `CPU profile written to ${colors.white(colors.dim(outPath))}`
          )
        )
        profileSession = undefined
        res()
      } else {
        rej(err)
      }
    })
  })
}
