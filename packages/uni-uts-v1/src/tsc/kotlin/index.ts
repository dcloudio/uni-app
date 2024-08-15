import path from 'path'
import fs from 'fs-extra'
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

  let uniAppXTypesDir: string | undefined
  if (!fs.existsSync(hxLanguageServiceDir)) {
    try {
      uniAppXTypesDir = path.resolve(
        require.resolve('@dcloudio/uni-app-x/package.json', {
          paths: [__dirname, '../../..'],
        }),
        '../types'
      )
    } catch (e) {
      console.warn('@dcloudio/uni-app-x not found')
    }
  }

  const ts = require(path.resolve(utsLibDir, 'typescript')) as typeof tsTypes
  const androidOptions: RunAndroidOptions = {
    typescript: ts,
    utsLibDir,
    uniAppXTypesDir,
    hxLanguageServiceDir,
    originalPositionForSync,
    ...options,
  }
  return require('../../../lib/kotlin/dist/index').runAndroid(
    mode,
    androidOptions
  )
}
