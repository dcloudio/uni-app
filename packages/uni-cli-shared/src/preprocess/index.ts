import path from 'path'
import { normalizePath } from '../utils'
import {
  getPreNVueContext,
  getPreUVueContext,
  getPreVueContext,
} from './context'
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

export function preJs(jsCode: string, filename: string) {
  if (process.env.UNI_APP_X === 'true') {
    return preUVueJs(jsCode, filename)
  }
  return preprocess(jsCode, getPreVueContext(), {
    type: 'js',
    filename: normalizeFilename(filename),
  })
}

export function preHtml(htmlCode: string, filename: string) {
  if (process.env.UNI_APP_X === 'true') {
    return preUVueHtml(htmlCode, filename)
  }
  return preprocess(htmlCode, getPreVueContext(), {
    type: 'html',
    filename: normalizeFilename(filename),
  })
}

export const preCss = preJs
export const preJson = preJs

export function preNVueJs(jsCode: string, filename: string) {
  return preprocess(jsCode, getPreNVueContext(), {
    type: 'js',
    filename: normalizeFilename(filename),
  })
}

export function preNVueHtml(htmlCode: string, filename: string) {
  return preprocess(htmlCode, getPreNVueContext(), {
    type: 'html',
    filename: normalizeFilename(filename),
  })
}

export const preNVueCss = preNVueJs
export const preNVueJson = preNVueJs

export function preUVueJs(jsCode: string, filename: string) {
  return preprocess(jsCode, getPreUVueContext(), {
    type: 'js',
    filename: normalizeFilename(filename),
  })
}

export function preUVueHtml(htmlCode: string, filename: string) {
  return preprocess(htmlCode, getPreUVueContext(), {
    type: 'html',
    filename: normalizeFilename(filename),
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
  options: { type: 'html' | 'js' | 'css'; filename?: () => string | undefined }
) {
  try {
    return preprocessLib(code, context, options)
  } catch (e) {
    const msg = ERRORS[options.type]
    if (msg) {
      console.error(msg.replace('%FILENAME%', options.filename?.() || ''))
    } else {
      throw e
    }
  }
  return code
}
