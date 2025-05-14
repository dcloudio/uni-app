import { makeMap } from '@vue/shared'

const GLOBALS_ALLOWED =
  'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,' +
  'decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,' +
  'Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,' +
  'uni'

export const isGloballyAllowed = /*#__PURE__*/ makeMap(GLOBALS_ALLOWED)
