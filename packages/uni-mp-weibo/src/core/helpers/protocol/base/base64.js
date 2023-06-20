export const base64ToArrayBuffer = [{
  name: 'base64',
  type: String,
  required: true
}]

export const arrayBufferToBase64 = [{
  name: 'arrayBuffer',
  type: [ArrayBuffer, Uint8Array],
  required: true
}]
