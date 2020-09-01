// @ts-ignore
import { encode, decode } from '../../helpers/base64-arraybuffer'

import { createApi } from '../../helpers/api'

import {
  Base64ToArrayBufferProtocol,
  ArrayBufferToBase64Protocol
} from '../../protocols/base/base64'

export const base64ToArrayBuffer = createApi((base64: string) => {
  return decode(base64) as ArrayBuffer
}, Base64ToArrayBufferProtocol)

export const arrayBufferToBase64 = createApi((arrayBuffer: ArrayBuffer) => {
  return encode(arrayBuffer) as string
}, ArrayBufferToBase64Protocol)
