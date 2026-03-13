// @ts-nocheck
import { UTS } from '../inject/index'
import { UniError } from './UniError'
import { UTSJSONObject } from './UTSJSONObject'
import { UTSValueIterable } from './UTSValueIterable'

// function getGlobal() {
//   if (typeof globalThis !== 'undefined') {
//     return globalThis
//   }
//   // worker
//   if (typeof self !== 'undefined') {
//     return self
//   }
//   // browser
//   if (typeof window !== 'undefined') {
//     return window
//   }
//   // nodejs
//   if (typeof global !== 'undefined') {
//     return global
//   }

//   function g() {
//     return this
//   }

//   if (typeof g() !== 'undefined') {
//     return g()
//   }

//   return (function () {
//     return new Function('return this')()
//   })()
// }

// const realGlobal = getGlobal()
// realGlobal.UTSJSONObject = UTSJSONObject
// realGlobal.UniError = UniError
// realGlobal.UTS = UTS
// realGlobal.UTSValueIterable = UTSValueIterable

export { UniError, UTS, UTSJSONObject, UTSValueIterable }
