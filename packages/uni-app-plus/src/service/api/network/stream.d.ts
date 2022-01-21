export type FetchHeaders = Record<string, string>
export interface FetchOptions {
  method?: string
  url: string
  // weex 官方文档有误，headers 类型实际 object，用 string 类型会无响应
  headers?: FetchHeaders
  type?: 'base64' | 'text'
  // weex 官方文档未说明实际支持 timeout，单位：ms
  timeout?: number
  sslVerify?: boolean
  firstIpv4?: boolean
  tls?: any
  body?: string | Data
}
export interface FetchResult {
  ok: boolean
  status: number
  data: string
  headers: FetchHeaders
  errorMsg: string
}
export type FetchCallback = (result: FetchResult) => void
export interface FetchArrayBuffer {
  '@type': 'binary'
  base64: string
}
export interface Stream {
  fetch: (options: FetchOptions, callback: FetchCallback) => void
  fetchWithArrayBuffer: (
    body: FetchArrayBuffer,
    options: FetchOptions,
    callback: FetchCallback
  ) => void
}
