import fs from 'fs'
import path, { relative } from 'path'
import { normalizePath } from '../shared'

export type FormattedErrorString = string & {
  _formatted: boolean
}

export function isFormattedErrorString(
  error: string
): error is FormattedErrorString {
  return (error as FormattedErrorString)._formatted
}

export function createFormattedErrorString(
  error: string
): FormattedErrorString {
  const formatted = new String(error) as FormattedErrorString
  formatted._formatted = true
  return formatted
}

export function addConfusingBlock(
  error: string | FormattedErrorString
): string {
  if (!isFormattedErrorString(error)) {
    if (error.startsWith(COLORS.error)) {
      return error.replace(COLORS.error, COLORS.error + COLORS.error)
    } else if (error.startsWith(COLORS.warn)) {
      return error.replace(COLORS.warn, COLORS.warn + COLORS.warn)
    } else {
      return COLORS.error + COLORS.error + error
    }
  }
  return error
}

export interface CompileStacktraceOptions {
  env?: Record<string, string>
}

export interface GenerateRuntimeCodeFrameOptions {
  cacheDir: string
  logType?: 'log' | 'info' | 'warn' | 'debug' | 'error'
  env?: Record<string, string>
}

export const COLORS: Record<string, string> = {
  warn: '\u200B',
  error: '\u200C',
}

export const splitRE = /\r?\n/

export function resolveSourceMapDirByCacheDir(cacheDir: string) {
  return path.resolve(cacheDir, 'sourcemap')
}

export function resolveSourceMapFileBySourceFile(
  file: string,
  sourceMapDir: string
) {
  const sourceMapFile = path.resolve(sourceMapDir, file + '.map')
  if (fs.existsSync(sourceMapFile)) {
    return sourceMapFile
  }
}

const range: number = 2

function posToNumber(
  source: string,
  pos: number | { line: number; column: number }
): number {
  if (typeof pos === 'number') return pos
  const lines = source.split(splitRE)
  const { line, column } = pos
  let start = 0
  for (let i = 0; i < line - 1; i++) {
    start += lines[i].length + 1
  }
  return start + column
}

export function lineColumnToStartEnd(
  source: string,
  line: number,
  column: number
) {
  const lines = source.split(splitRE)
  let start = 0
  for (let i = 0; i < line - 1; i++) {
    start += lines[i].length + 1
  }
  return {
    start: start + column,
    end: start + lines[line - 1].length,
  }
}

export function generateCodeFrame(
  source: string,
  start: number | { line: number; column: number } = 0,
  end?: number
): string {
  start = posToNumber(source, start)
  end = end || start
  const lines = source.split(splitRE)
  let count = 0
  const res: string[] = []
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + 1
    if (count >= start) {
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) continue
        const line = j + 1
        res.push(
          `${line}${' '.repeat(Math.max(3 - String(line).length, 0))}|  ${
            lines[j]
          }`
        )
        const lineLength = lines[j].length
        if (j === i) {
          // push underline
          const pad = start - (count - lineLength) + 1
          const length = Math.max(
            1,
            end > count ? lineLength - pad : end - start
          )
          res.push(`   |  ` + ' '.repeat(pad) + '^'.repeat(length))
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1)
            res.push(`   |  ` + '^'.repeat(length))
          }
          count += lineLength + 1
        }
      }
      break
    }
  }
  return res.join('\n')
}

export function parseRelativeSourceFile(
  sourceFile: string,
  sourceRoot?: string | null
) {
  if (!sourceRoot) {
    return sourceFile
  }
  sourceFile = normalizePath(sourceFile)
  sourceRoot = normalizePath(sourceRoot)
  if (sourceFile.startsWith(sourceRoot)) {
    return normalizePath(relative(sourceRoot, sourceFile))
  }
  return sourceFile
}

type ErrorRules = ErrorRule[]
export type ErrorRuleConfig = {
  version: string
  common?: {
    rules: ErrorRules
  }
  kotlin?: {
    rules: ErrorRules
  }
  swift?: {
    rules: ErrorRules
  }
  js?: {
    rules: ErrorRules
  }
  arkts?: {
    rules: ErrorRules
  }
}

export type ErrorRule = {
  platform?: string[]
  pattern: string
  flags?: string
  message: string
  suggestions?: string[]
}

/**
 * 解析错误信息
{
  "version": "1.0.0",
  "common": {
    "rules": [
      {
        "pattern": "Cannot find module '(.+)'",
        "flags": "i",
        "message": "模块错误：找不到模块 '$1'",
        "suggestions": ["检查模块路径", "确认模块已安装"]
      }
    ]
  },
  "js":{
    "rules": [
      {
        "platform": ["app-ios"],
        "pattern": "JS specific error (.+)",
        "flags": "i",
        "message": "JS 平台错误：$1",
        "suggestions": ["检查 JS 配置"]
      }
    ]
  },
  "kotlin": {
    "rules": [
      {
        "platform": ["app-android"],
        "pattern": "Android specific error (.+)",
        "flags": "i",
        "message": "Android 平台错误：$1",
        "suggestions": ["检查 Android 构建配置"]
      }
    ]
  },
  "swift": {
    "rules": [
      {
        "platform": ["app-ios"],
        "pattern": "iOS specific error (.+)",
        "flags": "i",
        "message": "iOS 平台错误：$1",
        "suggestions": ["检查 Xcode 配置"]
      }
    ]
  }
} 
 * @param error 错误信息
 * @returns 错误规则
 */
function normalizeErrorWithRule(error: string, rules: ErrorRule[]) {
  for (const rule of rules) {
    const re = new RegExp(rule.pattern, rule.flags)
    if (re.test(error)) {
      return createFormattedErrorString(error.replace(re, rule.message))
    }
  }
  return error
}

export function parseErrorWithRules(
  error: string,
  options: {
    language: 'kotlin' | 'swift' | 'js' | 'arkts'
    platform: 'app-android' | 'app-ios' | 'app-harmony' | 'mp-weixin' | 'web'
  }
) {
  try {
    const rules = getErrorRules(options.language, options.platform)
    if (rules.length === 0) {
      return error
    }
    return normalizeErrorWithRule(error, rules)
  } catch (e) {}
  return error
}

let errorRuleConfig: ErrorRuleConfig | null = null
function getErrorRuleConfig() {
  if (errorRuleConfig) {
    return errorRuleConfig
  }
  const filename = process.env.UNI_COMPILER_VALIDATION_RULES_PATH
  if (filename && fs.existsSync(filename)) {
    try {
      errorRuleConfig = JSON.parse(fs.readFileSync(filename, 'utf-8'))
    } catch (e) {}
  }
  if (!errorRuleConfig) {
    errorRuleConfig = {
      version: '1.0.0',
    }
  }
  return errorRuleConfig
}

function getErrorRules(
  language: 'kotlin' | 'swift' | 'js' | 'arkts',
  platform: 'app-android' | 'app-ios' | 'app-harmony' | 'mp-weixin' | 'web'
) {
  const errorRuleConfig = getErrorRuleConfig()
  const rules: ErrorRule[] = [...(errorRuleConfig.common?.rules || [])]
  if (errorRuleConfig[language]) {
    rules.push(...(errorRuleConfig[language]?.rules || []))
  }
  return rules.filter((rule) => {
    if (rule.platform && rule.platform.length > 0) {
      return rule.platform.includes(platform)
    }
    return true
  })
}
