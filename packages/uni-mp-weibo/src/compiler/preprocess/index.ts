import {
  getPreNVueContext,
  getPreUVueContext,
  getPreVueContext,
} from './context'
/* eslint-disable no-restricted-globals */
import { preprocess } from './preprocess'

export { initPreContext } from './context'

export function preJs(jsCode: string) {
  return preprocess(jsCode, getPreVueContext(), { type: 'js' })
}

export function preHtml(htmlCode: string) {
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
