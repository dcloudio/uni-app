import {
  getPreNVueContext,
  getPreUVueContext,
  getPreVueContext,
} from './context'
/* eslint-disable no-restricted-globals */
const { preprocess: preprocessLib } = require('../../lib/preprocess')

export { initPreContext } from './context'

export function preJs(jsCode: string) {
  if (process.env.UNI_APP_X === 'true') {
    return preUVueJs(jsCode)
  }
  return preprocess(jsCode, getPreVueContext(), { type: 'js' })
}

export function preHtml(htmlCode: string) {
  if (process.env.UNI_APP_X === 'true') {
    return preUVueHtml(htmlCode)
  }
  return preprocess(htmlCode, getPreVueContext(), { type: 'html' })
}

export const preCss = preJs
export const preJson = preJs

export function preNVueJs(jsCode: string) {
  return preprocess(jsCode, getPreNVueContext(), { type: 'js' })
}

export function preNVueHtml(htmlCode: string) {
  return preprocess(htmlCode, getPreNVueContext(), { type: 'html' })
}

export const preNVueCss = preNVueJs
export const preNVueJson = preNVueJs

export function preUVueJs(jsCode: string) {
  return preprocess(jsCode, getPreUVueContext(), { type: 'js' })
}

export function preUVueHtml(htmlCode: string) {
  return preprocess(htmlCode, getPreUVueContext(), { type: 'html' })
}

export const preUVueCss = preUVueJs
export const preUVueJson = preUVueJs

const ERRORS = {
  html: `条件编译失败\n参考示例(注意 ifdef 与 endif 必须配对使用):
<!--  #ifdef  %PLATFORM% -->
模板代码
<!--  #endif -->
`,
  js: `条件编译失败\n参考示例(注意 ifdef 与 endif 必须配对使用):
// #ifdef  %PLATFORM%
代码
// #endif
`,
  css: `条件编译失败\n参考示例(注意 ifdef 与 endif 必须配对使用):
/*  #ifdef  %PLATFORM%  */
代码
/*  #endif  */
`,
}

function preprocess(
  code: string,
  context: any,
  options: { type: 'html' | 'js' | 'css' }
) {
  try {
    return preprocessLib(code, context, options)
  } catch (e) {
    if (ERRORS[options.type]) {
      throw new Error(ERRORS[options.type])
    }
    throw e
  }
}
