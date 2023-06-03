import { BuildOptions, ServerOptions, createLogger } from 'vite'
import { extend, hasOwn } from '@vue/shared'
import { M, output, parseManifestJsonOnce } from '@dcloudio/uni-cli-shared'
import { RollupWatcher } from 'rollup'

import { CliOptions } from '.'
import { buildByVite, initBuildOptions } from './build'
import { addConfigFile, cleanOptions, printStartupDuration } from './utils'
import { initEasycom } from '../utils/easycom'

export function initUVueEnv() {
  // 直接指定了
  if (process.env.UNI_APP_X === 'false') {
    return
  }
  const manifestJson = parseManifestJsonOnce(process.env.UNI_INPUT_DIR)
  const isNVueEnabled = hasOwn(manifestJson, 'uni-app-x')
  if (!isNVueEnabled) {
    return
  }
  process.env.UNI_APP_X = 'true'
  process.env.UNI_UVUE_TARGET_LANGUAGE = 'javascript'
  if (process.env.UNI_UTS_PLATFORM === 'app-android') {
    process.env.UNI_UVUE_TARGET_LANGUAGE = 'kotlin'
  } else if (process.env.UNI_UTS_PLATFORM === 'app-ios') {
    process.env.UNI_UVUE_TARGET_LANGUAGE = 'swift'
  }
}

export async function runUVueDev(options: CliOptions & ServerOptions) {
  if (options.platform !== 'app') {
    output(
      'error',
      M['uvue.unsupported'].replace('{platform}', options.platform!)
    )
    return process.exit(0)
  }
  initEasycom()
  const watcher = (await buildUVue(options)) as RollupWatcher
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
        isFirstEnd = false
        output('log', M['dev.watching.end'])
        printStartupDuration(createLogger(options.logLevel), false)
        return
      }
      const dex = process.env.UNI_APP_UTS_CHANGED_FILES
      process.env.UNI_APP_UTS_CHANGED_FILES = ''
      if (dex) {
        return output(
          'log',
          M['dev.watching.end.files'].replace(
            '{files}',
            JSON.stringify(JSON.parse(dex))
          )
        )
      }
      return output('log', M['dev.watching.end'])
    }
  })
}

export async function runUVueBuild(options: CliOptions & BuildOptions) {
  try {
    await buildUVue(options)
    console.log(M['build.done'])
  } catch (e: any) {
    console.error(`Build failed with errors.`)
    process.exit(1)
  }
}

/**
 * 目前的简易实现逻辑
 * node层：
 *  1. 监听项目，生成资源到临时目录 .uts/android, .uts/ios
 *  2. uvue 文件，做解析，拆分生成 render.kt, css.kt, uts.uvue
 *  3. static 文件，copy 到最终目录
 *  4. uvue、vue、uts 文件发生变化，调用 uts 编译器
 * @param options
 */
export async function buildUVue(
  options: CliOptions
): Promise<RollupWatcher | void> {
  return buildByVite(
    addConfigFile(
      extend(
        { nvueAppService: true, nvue: true },
        initBuildOptions(options, cleanOptions(options) as BuildOptions)
      )
    )
  ) as Promise<RollupWatcher | void>
}
