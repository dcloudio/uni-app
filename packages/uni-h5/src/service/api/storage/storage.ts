import { isString } from '@vue/shared'

import {
  API_GET_STORAGE,
  API_GET_STORAGE_SYNC,
  API_REMOVE_STORAGE,
  API_SET_STORAGE,
  API_SET_STORAGE_SYNC,
  type API_TYPE_GET_STORAGE,
  type API_TYPE_GET_STORAGE_SYNC,
  type API_TYPE_REMOVE_STORAGE,
  type API_TYPE_REMOVE_STORAGE_SYNC,
  type API_TYPE_SET_STORAGE,
  type API_TYPE_SET_STORAGE_SYNC,
  GetStorageProtocol,
  GetStorageSyncProtocol,
  RemoveStorageProtocol,
  RemoveStorageSyncProtocol,
  SetStorageProtocol,
  SetStorageSyncProtocol,
  defineAsyncApi,
  defineSyncApi,
} from '@dcloudio/uni-api'

const STORAGE_KEYS = 'uni-storage-keys'

function parseValue(value: any) {
  const types = ['object', 'string', 'number', 'boolean', 'undefined']
  try {
    const object = isString(value) ? JSON.parse(value) : value
    const type = object.type
    if (types.indexOf(type) >= 0) {
      const keys = Object.keys(object)
      if (keys.length === 2 && 'data' in object) {
        // eslint-disable-next-line valid-typeof
        if (typeof object.data === type) {
          //#if _X_
          if (type === 'object') {
            // @ts-expect-error 访问global.UTS
            return UTS.JSON.parse(JSON.stringify(object.data))
          }
          return object.data
          //#else
          return object.data
          //#endif
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

export const setStorageSync = defineSyncApi<API_TYPE_SET_STORAGE_SYNC>(
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

export const setStorage = defineAsyncApi<API_TYPE_SET_STORAGE>(
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
  if (!isString(value)) {
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

export const getStorageSync = defineSyncApi<API_TYPE_GET_STORAGE_SYNC>(
  API_GET_STORAGE_SYNC,
  (key: string) => {
    try {
      return getStorageOrigin(key)
    } catch (error) {
      return ''
    }
  },
  GetStorageSyncProtocol
)

export const getStorage = defineAsyncApi<API_TYPE_GET_STORAGE>(
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

export const removeStorageSync = defineSyncApi<API_TYPE_REMOVE_STORAGE_SYNC>(
  API_REMOVE_STORAGE,
  (key) => {
    if (localStorage) {
      localStorage.removeItem(key)
    }
  },
  RemoveStorageSyncProtocol
)

export const removeStorage = defineAsyncApi<API_TYPE_REMOVE_STORAGE>(
  API_REMOVE_STORAGE,
  ({ key }, { resolve }) => {
    removeStorageSync(key)
    resolve()
  },
  RemoveStorageProtocol
)

export const clearStorageSync = defineSyncApi<typeof uni.clearStorageSync>(
  'clearStorageSync',
  () => {
    if (localStorage) {
      localStorage.clear()
    }
  }
)

export const clearStorage = defineAsyncApi<typeof uni.clearStorage>(
  'clearStorage',
  (_, { resolve }) => {
    clearStorageSync()
    resolve()
  }
)

export const getStorageInfoSync = defineSyncApi<typeof uni.getStorageInfoSync>(
  'getStorageInfoSync',
  () => {
    const length = (localStorage && localStorage.length) || 0
    const keys: string[] = []
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
  }
)

export const getStorageInfo = defineAsyncApi<typeof uni.getStorageInfo>(
  'getStorageInfo',
  (_, { resolve }) => {
    resolve(getStorageInfoSync())
  }
)
