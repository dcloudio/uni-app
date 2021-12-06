import base64url from 'base64url'

export function encodeBase64Url(str: string) {
  return base64url.encode(str)
}

export function decodeBase64Url(str: string) {
  return base64url.decode(str)
}
