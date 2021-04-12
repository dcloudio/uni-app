export const API_BASE64_TO_ARRAY_BUFFER = 'base64ToArrayBuffer'
export type API_TYPE_BASE64_TO_ARRAY_BUFFER = typeof uni.base64ToArrayBuffer
export const Base64ToArrayBufferProtocol: ProtocolOptions<String>[] = [
  {
    name: 'base64',
    type: String,
    required: true,
  },
]

export const API_ARRAY_BUFFER_TO_BASE64 = 'arrayBufferToBase64'
export type API_TYPE_ARRAY_BUFFER_TO_BASE64 = typeof uni.arrayBufferToBase64
export const ArrayBufferToBase64Protocol: ProtocolOptions<
  ArrayBuffer | Uint8Array
>[] = [
  {
    name: 'arrayBuffer',
    type: [ArrayBuffer, Uint8Array],
    required: true,
  },
]
