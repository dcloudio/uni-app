import { isString } from '@vue/shared'
import { elemInArray, HTTP_METHODS } from '../../helpers/protocol'
export const API_CONNECT_SOCKET = 'connectSocket'
export type API_TYPE_CONNECT_SOCKET = typeof uni.connectSocket
export const ConnectSocketOptions: ApiOptions<API_TYPE_CONNECT_SOCKET> = {
  formatArgs: {
    header(value: Record<string, any>, params: Record<string, any>) {
      params.header = value || {}
    },
    method(value, params) {
      params.method = elemInArray(
        (value || '').toUpperCase(),
        HTTP_METHODS
      ) as any
    },
    protocols(protocols, params) {
      if (isString(protocols)) {
        params.protocols = [protocols]
      }
    },
  },
}

export const ConnectSocketProtocol: ApiProtocol<API_TYPE_CONNECT_SOCKET> = {
  url: {
    type: String,
    required: true,
  },
  header: {
    type: Object,
  },
  method: String as any,
  protocols: [Array, String] as any,
}

export const API_SEND_SOCKET_MESSAGE = 'sendSocketMessage'
export type API_TYPE_SEND_SOCKET_MESSAGE = typeof uni.sendSocketMessage

export const SendSocketMessageProtocol: ApiProtocol<API_TYPE_SEND_SOCKET_MESSAGE> =
  {
    data: [String, ArrayBuffer],
  }

export const API_CLOSE_SOCKET = 'closeSocket'
export type API_TYPE_CLOSE_SOCKET = typeof uni.closeSocket
export const CloseSocketProtocol: ApiProtocol<API_TYPE_CLOSE_SOCKET> = {
  code: Number,
  reason: String,
}
