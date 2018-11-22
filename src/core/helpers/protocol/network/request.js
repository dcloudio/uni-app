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
const dataType = {
  JSON: 'JSON'
}
const responseType = {
  TEXT: 'TEXT',
  ARRAYBUFFER: 'ARRAYBUFFER'
}
export const request = {
  url: {
    type: String,
    required: true
  },
  data: {
    type: [Object, String, ArrayBuffer],
    validator (value, params) {
      params.data = value || ''
    }
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
  dataType: {
    type: String,
    validator (value, params) {
      params.dataType = (value || dataType.JSON).toUpperCase()
    }
  },
  responseType: {
    type: String,
    validator (value, params) {
      value = (value || '').toUpperCase()
      params.responseType = Object.values(responseType).indexOf(value) < 0 ? responseType.TEXT : value
    }
  }
}
