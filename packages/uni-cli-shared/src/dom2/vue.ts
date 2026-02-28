import path from 'path'
import type { CompilerError, SFCDescriptor } from '@vue/compiler-sfc'
import { normalizePath, requireUniHelpers } from '../utils'
import { isUniPageFile } from '../json'
import { onVueTemplateCompileLog } from '../vue'

export function initVueTemplateCompilerExtraOptions(descriptor: SFCDescriptor) {
  const filename = normalizePath(descriptor.filename.split('?')[0])
  const relativeFilename = normalizePath(
    path.relative(process.env.UNI_INPUT_DIR, filename)
  )
  const isDevX =
    process.env.UNI_HX_VERSION_DEV === 'true' &&
    process.env.UNI_APP_X === 'true'
  let disableStaticStyle = false
  if (isDevX && process.env.NODE_ENV === 'development') {
    if (process.env.UNI_UTS_PLATFORM === 'app-harmony') {
      // 开发版本、开发模式下，非鸿蒙release模式打包
      disableStaticStyle = process.env.UNI_APP_HARMONY_RUN_MODE !== 'release'
    }
  }
  const helper = requireUniHelpers()
  return {
    root: normalizePath(process.env.UNI_INPUT_DIR),
    platform: process.env.UNI_UTS_PLATFORM,
    componentType: isUniPageFile(filename) ? 'page' : 'component',
    relativeFilename,
    helper,
    scriptCppBlocks: (descriptor as any).scriptCppBlocks,
    genVueId: !!process.env.UNI_AUTOMATOR_WS_ENDPOINT,
    disableStaticStyle,
    onVueTemplateCompileLog(type: 'warn' | 'error', error: CompilerError) {
      return onVueTemplateCompileLog(
        type,
        error,
        descriptor.source,
        relativeFilename
      )
    },
    r: helper.K,
    className: helper.GCN(descriptor.filename, process.env.UNI_INPUT_DIR),
  }
}
