// @ts-ignore
import { encode, decode } from '../../helpers/base64-arraybuffer'

import { createApi } from '../../helpers/api'

import {
  Base64ToArrayBufferProtocol,
  ArrayBufferToBase64Protocol
} from '../../protocols/base/base64'

export const base64ToArrayBuffer = createApi<typeof uni.base64ToArrayBuffer>(
  base64 => {
    return decode(base64) as ArrayBuffer
  },
  Base64ToArrayBufferProtocol
)

export const arrayBufferToBase64 = createApi<typeof uni.arrayBufferToBase64>(
  arrayBuffer => {
    return encode(arrayBuffer) as string
  },
  ArrayBufferToBase64Protocol
)
