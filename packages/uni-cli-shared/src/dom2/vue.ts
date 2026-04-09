import path from 'path'
import type { CompilerError, SFCDescriptor } from '@vue/compiler-sfc'
import { normalizePath, requireUniHelpers } from '../utils'
import { isUniPageFile, parseUniXPageOptions } from '../json'
import { onVueTemplateCompileLog } from '../vue'

export function initVueTemplateCompilerExtraOptions(descriptor: SFCDescriptor) {
  const filename = normalizePath(descriptor.filename.split('?')[0])
  const relativeFilename = normalizePath(
    path.relative(process.env.UNI_INPUT_DIR, filename)
  )
  const rootScrollView = parseUniXPageOptions(filename)
  const componentType =
    rootScrollView || isUniPageFile(filename) ? 'page' : 'component'
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
    componentType,
    filename: filename,
    relativeFilename,
    helper,
    enableRootScrollViewTransform: true,
    // 仅页面透传 rootScrollView，避免非页面组件误触发 ROOT 自动包裹逻辑。
    rootScrollView: componentType === 'page' ? rootScrollView : undefined,
    scriptCppBlocks: (descriptor as any).scriptCppBlocks,
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
    inlineRender: process.env.UNI_UTS_PLATFORM === 'app-android',
  }
}
