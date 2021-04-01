import { ProtocolOptions } from '../type'

export const API_BASE64_TO_ARRAY_BUFFER = 'base64ToArrayBuffer'
export const API_ARRAY_BUFFER_TO_BASE64 = 'arrayBufferToBase64'
export const Base64ToArrayBufferProtocol: ProtocolOptions<String>[] = [
  {
    name: 'base64',
    type: String,
    required: true,
  },
]

export const ArrayBufferToBase64Protocol: ProtocolOptions<
  ArrayBuffer | Uint8Array
>[] = [
  {
    name: 'arrayBuffer',
    type: [ArrayBuffer, Uint8Array],
    required: true,
  },
]
