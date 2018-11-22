const method = {
  OPTIONS: 'OPTIONS',
  GET: 'GET',
  HEAD: 'HEAD',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  TRACE: 'TRACE',
  CONNECT: 'CONNECT'
}
export const connectSocket = {
  url: {
    type: String,
    required: true
  },
  header: {
    type: Object,
    validator (value, params) {
      params.header = value || {}
    }
  },
  method: {
    type: String,
    validator (value, params) {
      value = (value || '').toUpperCase()
      params.method = Object.values(method).indexOf(value) < 0 ? method.GET : value
    }
  },
  protocols: {
    type: Array,
    validator (value, params) {
      params.protocols = (value || []).filter(str => typeof str === 'string')
    }
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
