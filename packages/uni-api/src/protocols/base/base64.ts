import { ProtocolOptions } from '../type'

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
