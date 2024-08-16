import path from 'path'
import type * as tsTypes from 'typescript'

import type {
  RunAndroidOptions,
  WatchProgramHelper,
} from '../../../lib/kotlin/dist/index'
import { originalPositionForSync } from '../../sourceMap'
export function runUTS2Kotlin(
  mode: 'development' | 'production',
  options: {
    inputDir: string
    outputDir: string
    cacheDir: string
    rootFiles?: string[]
    normalizeFileName: (str: string) => string
  }
): {
  watcher?: WatchProgramHelper
} {
  const utsLibDir = path.resolve(__dirname, '../../../lib')

  const pluginPath = process.env.UNI_HBUILDERX_PLUGINS
    ? process.env.UNI_HBUILDERX_PLUGINS
    : path.resolve(process.cwd(), '../')

  const hxLanguageServiceDir = path.resolve(
    pluginPath,
    'hbuilderx-language-services/builtin-dts'
  )

  const ts = require(path.resolve(utsLibDir, 'typescript')) as typeof tsTypes
  const androidOptions: RunAndroidOptions = {
    typescript: ts,
    utsLibDir,
    hxLanguageServiceDir,
    originalPositionForSync,
    ...options,
  }
  return require('../../../lib/kotlin/dist/index').runAndroid(
    mode,
    androidOptions
  )
}
