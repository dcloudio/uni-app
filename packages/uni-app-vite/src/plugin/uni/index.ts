import fs from 'fs-extra'
import path from 'path'
import {
  isAppNVueNativeTag as baseIsAppNVueNativeTag,
  isAppNativeTag,
  isAppVoidTag,
} from '@dcloudio/uni-shared'
import { compileI18nJsonStr } from '@dcloudio/uni-i18n'
import {
  type UniViteCopyPluginOptions,
  type UniVitePlugin,
  initI18nOptions,
  matchUTSComponent,
  transformMatchMedia,
  transformPageHead,
  transformTapToClick,
} from '@dcloudio/uni-cli-shared'

import { initNVueNodeTransforms } from '../../nvue'
import { initNVueDirectiveTransforms } from '../../nvue/plugin'
import { transformWxsProps } from './transforms/transformWxsProps'

function isAppNVueNativeTag(tag: string) {
  return matchUTSComponent(tag) || baseIsAppNVueNativeTag(tag)
}

export function uniOptions(
  compilerType = process.env.UNI_COMPILER
): UniVitePlugin['uni'] {
  const isNVueCompiler = compilerType === 'nvue'
  return {
    copyOptions() {
      const platform = process.env.UNI_PLATFORM
      const inputDir = process.env.UNI_INPUT_DIR
      const outputDir = process.env.UNI_OUTPUT_DIR
      const targets: UniViteCopyPluginOptions['targets'] = []
      // 自动化测试时，不启用隐私政策
      if (!process.env.UNI_AUTOMATOR_WS_ENDPOINT) {
        targets.push({
          src: 'androidPrivacy.json',
          dest: outputDir,
          transform(source) {
            const options = initI18nOptions(platform, inputDir, false, true)
            if (!options) {
              return
            }
            return compileI18nJsonStr(source.toString(), options)
          },
        })
        const debugFilename = '__nvue_debug__'
        if (fs.existsSync(path.resolve(inputDir, debugFilename))) {
          targets.push({
            src: debugFilename,
            dest: outputDir,
          })
        }
      }
      return {
        assets: ['hybrid/html/**/*', 'uni_modules/*/hybrid/html/**/*'],
        targets,
      }
    },
    compilerOptions: {
      isNativeTag: isNVueCompiler ? isAppNVueNativeTag : isAppNativeTag,
      isVoidTag: isAppVoidTag,
      nodeTransforms: [
        ...(isNVueCompiler ? initNVueNodeTransforms() : [transformWxsProps]),
        transformTapToClick,
        transformMatchMedia,
        transformPageHead,
      ],
      directiveTransforms: {
        ...(isNVueCompiler ? initNVueDirectiveTransforms() : {}),
      },
    },
  }
}
