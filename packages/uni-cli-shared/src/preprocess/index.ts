import { jsContext } from './context'

export * from './context'
/* eslint-disable no-restricted-globals */
const { preprocess } = require('../../lib/preprocess')

export function preJs(jsCode: string) {
  return preprocess(jsCode, jsContext, { type: 'js' })
}
export function preHtml(htmlCode: string) {
  return preprocess(htmlCode, jsContext, { type: 'html' })
}
export const preCss = preJs
export const preJson = preJs
