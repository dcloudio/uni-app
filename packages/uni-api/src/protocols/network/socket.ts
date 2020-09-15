import { HTTP_METHODS } from '../../helpers/protocol'
import { ApiOptions, ApiProtocol } from '../type'

export const ConnectSocketOptions: ApiOptions = {
  formatArgs: {
    header(value, params) {
      params.header = value || {}
    },
    method(value, params) {
      value = (value || '').toUpperCase()
      if (!HTTP_METHODS[value as keyof typeof HTTP_METHODS]) {
        value = HTTP_METHODS.GET
      }
      params.method = value
    },
    protocols(protocols, params) {
      if (typeof protocols === 'string') {
        params.protocols = [protocols]
      }
    }
  }
}

export const ConnectSocketProtocol: ApiProtocol = {
  url: {
    type: String,
    required: true
  },
  header: {
    type: Object
  },
  method: {
    type: String
  },
  protocols: {
    type: [Array, String] // 微信文档虽然写的是数组，但是可以正常传递字符串
  }
}
export const sendSocketMessage = {
  data: {
    type: [String, ArrayBuffer]
  }
}
export const closeSocket = {
  code: {
    type: Number
  },
  reason: {
    type: String
  }
}
