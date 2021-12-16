import {
  defineSyncApi,
  defineAsyncApi,
  API_SET_STORAGE_SYNC,
  API_TYPE_SET_STORAGE_SYNC,
  API_SET_STORAGE,
  API_TYPE_SET_STORAGE,
  SetStorageProtocol,
  SetStorageSyncProtocol,
  API_GET_STORAGE_SYNC,
  GetStorageSyncProtocol,
  API_TYPE_GET_STORAGE_SYNC,
  API_GET_STORAGE,
  GetStorageProtocol,
  API_TYPE_GET_STORAGE,
  API_TYPE_REMOVE_STORAGE_SYNC,
  API_REMOVE_STORAGE,
  API_TYPE_REMOVE_STORAGE,
  RemoveStorageSyncProtocol,
  RemoveStorageProtocol,
} from '@dcloudio/uni-api'

const STORAGE_KEYS = 'uni-storage-keys'

function parseValue(value: any) {
  const types = ['object', 'string', 'number', 'boolean', 'undefined']
  try {
    const object = typeof value === 'string' ? JSON.parse(value) : value
    const type = object.type
    if (types.indexOf(type) >= 0) {
      const keys = Object.keys(object)
      if (keys.length === 2 && 'data' in object) {
        // eslint-disable-next-line valid-typeof
        if (typeof object.data === type) {
          return object.data
        }
        // eslint-disable-next-line no-useless-escape
        if (
          type === 'object' &&
          /^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(object.data)
        ) {
          // ISO 8601 格式返回 Date
          return new Date(object.data)
        }
      } else if (keys.length === 1) {
        return ''
      }
    }
  } catch (error) {}
}

export const setStorageSync = <API_TYPE_SET_STORAGE_SYNC>defineSyncApi(
  API_SET_STORAGE_SYNC,
  (key, data) => {
    const type = typeof data
    const value =
      type === 'string'
        ? data
        : JSON.stringify({
            type,
            data: data,
          })
    localStorage.setItem(key, value)
  },
  SetStorageSyncProtocol
)

export const setStorage = <API_TYPE_SET_STORAGE>defineAsyncApi(
  API_SET_STORAGE,
  ({ key, data }, { resolve, reject }) => {
    try {
      setStorageSync(key, data)
      resolve()
    } catch (error: any) {
      reject(error.message)
    }
  },
  SetStorageProtocol
)

function getStorageOrigin(key: string): any {
  const value = localStorage && localStorage.getItem(key)
  if (typeof value !== 'string') {
    throw new Error('data not found')
  }
  let data: any = value
  try {
    const object = JSON.parse(value)
    const result = parseValue(object)
    if (result !== undefined) {
      data = result
    }
  } catch (error) {}
  return data
}

export const getStorageSync = <API_TYPE_GET_STORAGE_SYNC>defineSyncApi(
  API_GET_STORAGE_SYNC,
  (key: string, t: boolean) => {
    try {
      return getStorageOrigin(key)
    } catch (error) {
      return ''
    }
  },
  GetStorageSyncProtocol
)

export const getStorage = <API_TYPE_GET_STORAGE>defineAsyncApi(
  API_GET_STORAGE,
  ({ key }, { resolve, reject }) => {
    try {
      const data = getStorageOrigin(key)
      resolve({
        data,
      })
    } catch (error: any) {
      reject(error.message)
    }
  },
  GetStorageProtocol
)

export const removeStorageSync = <API_TYPE_REMOVE_STORAGE_SYNC>defineSyncApi(
  API_REMOVE_STORAGE,
  (key) => {
    if (localStorage) {
      localStorage.removeItem(key)
    }
  },
  RemoveStorageSyncProtocol
)

export const removeStorage = <API_TYPE_REMOVE_STORAGE>defineAsyncApi(
  API_REMOVE_STORAGE,
  ({ key }, { resolve }) => {
    removeStorageSync(key)
    resolve()
  },
  RemoveStorageProtocol
)

export const clearStorageSync = <typeof uni.clearStorageSync>(
  defineSyncApi('clearStorageSync', () => {
    if (localStorage) {
      localStorage.clear()
    }
  })
)

export const clearStorage = <typeof uni.clearStorage>(
  defineAsyncApi('clearStorage', (_, { resolve }) => {
    clearStorageSync()
    resolve()
  })
)

export const getStorageInfoSync = <typeof uni.getStorageInfoSync>(
  defineSyncApi('getStorageInfoSync', () => {
    const length = (localStorage && localStorage.length) || 0
    const keys = []
    let currentSize = 0
    for (let index = 0; index < length; index++) {
      const key = <string>localStorage.key(index)
      const value = localStorage.getItem(key) || ''
      currentSize += key.length + value.length
      if (key !== STORAGE_KEYS) {
        keys.push(key)
      }
    }
    return {
      keys,
      currentSize: Math.ceil((currentSize * 2) / 1024),
      limitSize: Number.MAX_VALUE,
    }
  })
)

export const getStorageInfo = <typeof uni.getStorageInfo>(
  defineAsyncApi('getStorageInfo', (_, { resolve }) => {
    resolve(getStorageInfoSync())
  })
)
