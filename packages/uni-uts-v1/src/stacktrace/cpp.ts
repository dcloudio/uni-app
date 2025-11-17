import type { CompileStacktraceOptions } from './utils'

export interface ParseCppStacktraceOptions extends CompileStacktraceOptions {
  platform: 'app-harmony' | 'app-ios' | 'app-android'
  language: 'cpp'
  stacktrace: string
  sourceRoot: string
  sourceMapFile: string
}

export async function parseCppStacktrace(
  stacktrace: string,
  options: Omit<ParseCppStacktraceOptions, 'language'>
) {}
