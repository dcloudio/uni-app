import type { CompileStacktraceOptions } from './utils'
import {
  resolveSourceMapDirByCacheDir,
  resolveSourceMapFileBySourceFile,
} from './utils'
import { originalPositionFor } from '../sourceMap'

export interface ParseCppStacktraceOptions extends CompileStacktraceOptions {
  platform: 'app-harmony' | 'app-ios' | 'app-android'
  language: 'cpp'
  cacheDir: string
}

// TODO 区分不同平台cpp路径
export const CPP_RUNTIME_ERROR_RE =
  /src\/main\/cpp\/(.*\.cpp):(\d+):(\d+):\serror:\s(.*)/

/**
 * cpp暂时只处理编译错误
 * cpp编译错误信息示例：
 * /xxx/unpackage/dist/dev/app-harmony/entry/src/main/cpp/GenPagesIndexIndexSharedData.cpp:17:15: error: no member named 'backgroundColor123' in 'uniappx::NativeViewImpl'
 *           e0->backgroundColor123(0xffff0000);
 *           ~~  ^
 * 1 error generated.
 */
export async function parseCppStacktrace(
  stacktrace: string,
  options: Omit<ParseCppStacktraceOptions, 'language'>
): Promise<string> {
  const matched = stacktrace.match(CPP_RUNTIME_ERROR_RE)
  if (!matched) {
    return stacktrace
  }

  const sourceMapDir = resolveSourceMapDirByCacheDir(options.cacheDir)
  const [, filePath, line, column, message] = matched
  const codeFrame = await generateCppCodeFrame(
    sourceMapDir,
    filePath,
    line,
    column,
    message
  )
  if (codeFrame) {
    return codeFrame
  }
  return stacktrace
}

export async function generateCppCodeFrame(
  sourceMapDir: string,
  filePath: string,
  line: string,
  column: string,
  message: string
): Promise<string | undefined> {
  const lines: string[] = []
  lines.push(message)
  const sourceMapFile = resolveSourceMapFileBySourceFile(
    'cpp/' + filePath,
    sourceMapDir
  )
  if (!sourceMapFile) {
    return
  }
  const originalPosition = await originalPositionFor({
    sourceMapFile,
    line: parseInt(line),
    column: parseInt(column),
    withSourceContent: true,
  })
  if (!originalPosition.source) {
    return
  }
  lines.push(
    `at ${originalPosition.source.split('?')[0]}:${originalPosition.line}:${
      originalPosition.column
    }`
  )
  return lines.join('\n')
}
