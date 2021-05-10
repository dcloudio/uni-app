// @ts-ignore
import { encode, decode } from '../../helpers/base64-arraybuffer'

import { defineSyncApi } from '../../helpers/api'

import {
  Base64ToArrayBufferProtocol,
  ArrayBufferToBase64Protocol,
  API_BASE64_TO_ARRAY_BUFFER,
  API_ARRAY_BUFFER_TO_BASE64,
  API_TYPE_BASE64_TO_ARRAY_BUFFER,
  API_TYPE_ARRAY_BUFFER_TO_BASE64,
} from '../../protocols/base/base64'

export const base64ToArrayBuffer =
  defineSyncApi<API_TYPE_BASE64_TO_ARRAY_BUFFER>(
    API_BASE64_TO_ARRAY_BUFFER,
    (base64) => {
      return decode(base64) as ArrayBuffer
    },
    Base64ToArrayBufferProtocol
  )

export const arrayBufferToBase64 =
  defineSyncApi<API_TYPE_ARRAY_BUFFER_TO_BASE64>(
    API_ARRAY_BUFFER_TO_BASE64,
    (arrayBuffer) => {
      return encode(arrayBuffer) as string
    },
    ArrayBufferToBase64Protocol
  )
