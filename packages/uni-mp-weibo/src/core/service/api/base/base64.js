import {
  encode,
  decode
} from 'base64-arraybuffer'

export function base64ToArrayBuffer (str) {
  return decode(str)
}

export function arrayBufferToBase64 (buffer) {
  return encode(buffer)
}
