import {
  invoke
} from '../../bridge'

import storage from '@system.storage'

function parseValue (value) {
  const types = ['object', 'string', 'number', 'boolean', 'undefined']
  try {
    const object = typeof value === 'string' ? JSON.parse(value) : value
    const type = object.type
    if (types.indexOf(type) >= 0) {
      const keys = Object.keys(object)
      // eslint-disable-next-line valid-typeof
      if (keys.length === 2 && 'data' in object && typeof object.data === type) {
        return object.data
      } else if (keys.length === 1) {
        return ''
      }
    }
  } catch (error) {}
}

export function setStorage ({
  key,
  data,
  isSync
} = {}, callbackId) {
  const type = typeof data
  const value = type === 'string' ? data : JSON.stringify({
    type,
    data: data
  })
  try {
    storage.set({
      key,
      value,
      success: (res) => {
        invoke(callbackId, {
          errMsg: 'setStorage:ok'
        })
      },
      fail: (data, code) => {
        invoke(callbackId, {
          errMsg: `setStorage:fail ${code}`
        })
      }
    })
  } catch (error) {
    invoke(callbackId, {
      errMsg: `setStorage:fail ${error}`
    })
  }
}

export function getStorage ({
  key
} = {}, callbackId) {
  storage.get({
    key,
    success: (data) => {
      invoke(callbackId, {
        data: parseValue(data) || data,
        errMsg: 'getStorage:ok'
      })
    },
    fail: (data, code) => {
      invoke(callbackId, {
        data: '',
        errMsg: `getStorage:fail ${code}`
      })
    }
  })
}

export function removeStorage ({
  key
} = {}, callbackId) {
  storage.delete({
    key,
    success: (res) => {
      invoke(callbackId, {
        errMsg: 'removeStorage:ok'
      })
    },
    fail: (data, code) => {
      invoke(callbackId, {
        errMsg: `removeStorage:fail ${code}`
      })
    }
  })
}

export function clearStorage (args, callbackId) {
  storage.clear({
    success: (res) => {
      invoke(callbackId, {
        errMsg: 'clearStorage:ok'
      })
    },
    fail: (data, code) => {
      invoke(callbackId, {
        errMsg: `clearStorage:fail ${code}`
      })
    }
  })
}
