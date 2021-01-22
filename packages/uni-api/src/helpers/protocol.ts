import { isArray } from '@vue/shared'

export const CHOOSE_SIZE_TYPES = ['original', 'compressed']
export const CHOOSE_SOURCE_TYPES = ['album', 'camera']

export const HTTP_METHODS = {
  OPTIONS: 'OPTIONS',
  GET: 'GET',
  HEAD: 'HEAD',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  TRACE: 'TRACE',
  CONNECT: 'CONNECT',
}

export function normalizeStrArray(strArr: string[], optionalVal: string[]) {
  if (
    !isArray(strArr) ||
    strArr.length === 0 ||
    strArr.find((val) => optionalVal.indexOf(val) === -1)
  ) {
    return optionalVal
  }
  return strArr
}
