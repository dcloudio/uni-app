import path from 'path'
import { normalizePath } from '../utils'
import {
  getPreNVueContext,
  getPreUVueContext,
  getPreVueContext,
} from './context'

import {
  generateCodeFrame,
  offsetToLineColumn,
} from '../vite/plugins/vitejs/utils'
/* eslint-disable no-restricted-globals */
const { preprocess: preprocessLib } = require('../../lib/preprocess')

export { initPreContext } from './context'

function normalizeFilename(filename?: string) {
  return () => {
    if (filename && process.env.UNI_INPUT_DIR) {
      const inputDir = normalizePath(process.env.UNI_INPUT_DIR)
      filename = normalizePath(filename.split('?')[0])
      if (filename.startsWith(inputDir)) {
        return 'at ' + normalizePath(path.relative(inputDir, filename)) + ':1'
      }
      return 'at ' + filename + ':1'
    }
  }
}

export interface PreprocessOptions {
  unbalanced?: 'error' | 'skip' | 'skip-lazy'
}

export function preJs(
  jsCode: string,
  filename: string,
  options?: PreprocessOptions
) {
  if (process.env.UNI_APP_X === 'true') {
    return preUVueJs(jsCode, filename, options)
  }
  return preprocess(jsCode, getPreVueContext(), {
    type: 'js',
    filename: normalizeFilename(filename),
    unbalanced: options?.unbalanced,
  })
}

export function preHtml(
  htmlCode: string,
  filename: string,
  options?: PreprocessOptions
) {
  if (process.env.UNI_APP_X === 'true') {
    return preUVueHtml(htmlCode, filename, options)
  }
  return preprocess(htmlCode, getPreVueContext(), {
    type: 'html',
    filename: normalizeFilename(filename),
    unbalanced: options?.unbalanced,
  })
}

export const preCss = preJs
export const preJson = preJs

export function preNVueJs(
  jsCode: string,
  filename: string,
  options?: PreprocessOptions
) {
  return preprocess(jsCode, getPreNVueContext(), {
    type: 'js',
    filename: normalizeFilename(filename),
    unbalanced: options?.unbalanced,
  })
}

export function preNVueHtml(
  htmlCode: string,
  filename: string,
  options?: PreprocessOptions
) {
  return preprocess(htmlCode, getPreNVueContext(), {
    type: 'html',
    filename: normalizeFilename(filename),
    unbalanced: options?.unbalanced,
  })
}

export const preNVueCss = preNVueJs
export const preNVueJson = preNVueJs

export function preUVueJs(
  jsCode: string,
  filename: string,
  options?: PreprocessOptions
) {
  return preprocess(jsCode, getPreUVueContext(), {
    type: 'js',
    filename: normalizeFilename(filename),
    unbalanced: options?.unbalanced,
  })
}

export function preUVueHtml(
  htmlCode: string,
  filename: string,
  options?: PreprocessOptions
) {
  return preprocess(htmlCode, getPreUVueContext(), {
    type: 'html',
    filename: normalizeFilename(filename),
    unbalanced: options?.unbalanced,
  })
}

export const preUVueCss = preUVueJs
export const preUVueJson = preUVueJs

const ERRORS = {
  html: `条件编译失败
%FILENAME%
参考示例(注意 ifdef 与 endif 必须配对使用):
<!--  #ifdef  %PLATFORM% -->
模板代码
<!--  #endif -->
`,
  js: `条件编译失败
%FILENAME%
参考示例(注意 ifdef 与 endif 必须配对使用):
// #ifdef  %PLATFORM%
代码
// #endif
`,
  css: `条件编译失败
%FILENAME%
参考示例(注意 ifdef 与 endif 必须配对使用):
/*  #ifdef  %PLATFORM%  */
代码
/*  #endif  */
`,
}

function preprocess(
  code: string,
  context: any,
  options: {
    type: 'html' | 'js' | 'css'
    filename?: () => string | undefined
    unbalanced?: 'error' | 'skip' | 'skip-lazy'
  }
) {
  try {
    return preprocessLib(code, context, options)
  } catch (e: any) {
    // `Unbalanced left delimiter found in string at position 1520`
    // `Unbalanced right delimiter found in string at position 1520`
    if (e.message) {
      const msg = e.message as string
      // 正则匹配left/right及position
      const unbalancedMatch = msg.match(
        /Unbalanced (left|right) delimiter found in string at position (\d+)/
      )
      if (unbalancedMatch) {
        const errorDirective =
          unbalancedMatch[1] === 'left' ? '#ifdef/#ifndef' : '#endif'
        const missedDirective =
          unbalancedMatch[1] === 'left' ? '#endif' : '#ifdef/#ifndef'
        const position = parseInt(unbalancedMatch[2], 10)
        const filename = options.filename?.() || ''
        const { line } = offsetToLineColumn(code, position)
        console.error(
          `条件编译失败: ${errorDirective} 缺少配对的 ${missedDirective}`
        )
        console.error(`${filename.split(':')[0]}:${line}`)
        console.log(generateCodeFrame(code, position))
        return code
      }
    }
    const msg = ERRORS[options.type]
    if (msg) {
      console.error(msg.replace('%FILENAME%', options.filename?.() || ''))
    } else {
      throw e
    }
  }
  return code
}
