import { isString } from '@vue/shared'
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

import { warpPlusErrorCallback } from '../../../helpers/plus'

const STORAGE_DATA_TYPE = '__TYPE'
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
    try {
      if (type === 'string' && parseValue(value) !== undefined) {
        plus.storage.setItem(key + STORAGE_DATA_TYPE, type)
      } else {
        plus.storage.removeItem(key + STORAGE_DATA_TYPE)
      }
      plus.storage.setItem(key, value)
    } catch (error) {}
  },
  SetStorageSyncProtocol
)

export const setStorage = defineAsyncApi<API_TYPE_SET_STORAGE>(
  API_SET_STORAGE,
  ({ key, data }, { resolve, reject }) => {
    const type = typeof data
    const value =
      type === 'string'
        ? data
        : JSON.stringify({
            type,
            data: data,
          })
    try {
      const storage = plus.storage
      if (type === 'string' && parseValue(value) !== undefined) {
        storage.setItemAsync(key + STORAGE_DATA_TYPE, type, () => {})
      } else {
        storage.removeItemAsync(key + STORAGE_DATA_TYPE, () => {})
      }
      storage.setItemAsync(key, value, resolve, warpPlusErrorCallback(reject))
    } catch (error: any) {
      reject(error.message)
    }
  },
  SetStorageProtocol
)

function parseGetStorage(type: string, value: string) {
  let data: any = value
  if (
    type !== 'string' ||
    (type === 'string' && value === '{"type":"undefined"}')
  ) {
    try {
      // 兼容H5和V3初期历史格式
      let object = JSON.parse(value)
      const result = parseValue(object)
      if (result !== undefined) {
        data = result
      } else if (type) {
        // 兼容App端历史格式
        data = object
        if (isString(object)) {
          object = JSON.parse(object)
          const objectType = typeof object
          if (objectType === 'number' && type === 'date') {
            data = new Date(object)
          } else if (
            objectType ===
            (['null', 'array'].indexOf(type) < 0 ? type : 'object')
          ) {
            data = object
          }
        }
      }
    } catch (error) {}
  }
  return data
}

export const getStorageSync = defineSyncApi<API_TYPE_GET_STORAGE_SYNC>(
  API_GET_STORAGE_SYNC,
  (key: string) => {
    const value = plus.storage.getItem(key)
    const typeOrigin = plus.storage.getItem(key + STORAGE_DATA_TYPE) || ''
    const type = typeOrigin.toLowerCase()
    if (!isString(value)) {
      return ''
    }
    return parseGetStorage(type, value)
  },
  GetStorageSyncProtocol
)

export const getStorage = defineAsyncApi<API_TYPE_GET_STORAGE>(
  API_GET_STORAGE,
  ({ key }, { resolve, reject }) => {
    const storage = plus.storage
    storage.getItemAsync(
      key,
      function (res) {
        storage.getItemAsync(
          key + STORAGE_DATA_TYPE,
          function (typeRes) {
            const typeOrigin = typeRes.data || ''
            const type = typeOrigin.toLowerCase()
            resolve({
              data: parseGetStorage(type, res.data),
            })
          },
          function () {
            const type = ''
            resolve({
              data: parseGetStorage(type, res.data),
            })
          }
        )
      },
      warpPlusErrorCallback(reject)
    )
  },
  GetStorageProtocol
)

export const removeStorageSync = defineSyncApi<API_TYPE_REMOVE_STORAGE_SYNC>(
  API_REMOVE_STORAGE,
  (key) => {
    plus.storage.removeItem(key + STORAGE_DATA_TYPE)
    plus.storage.removeItem(key)
  },
  RemoveStorageSyncProtocol
)

export const removeStorage = defineAsyncApi<API_TYPE_REMOVE_STORAGE>(
  API_REMOVE_STORAGE,
  ({ key }, { resolve, reject }) => {
    // 兼容App端历史格式
    plus.storage.removeItemAsync(key + STORAGE_DATA_TYPE, () => {})
    plus.storage.removeItemAsync(key, resolve, warpPlusErrorCallback(reject))
  },
  RemoveStorageProtocol
)

export const clearStorageSync = defineSyncApi<typeof uni.clearStorageSync>(
  'clearStorageSync',
  () => {
    plus.storage.clear()
  }
)

export const clearStorage = defineAsyncApi<typeof uni.clearStorage>(
  'clearStorage',
  (_, { resolve, reject }) => {
    plus.storage.clearAsync(resolve, warpPlusErrorCallback(reject))
  }
)

export const getStorageInfoSync = defineSyncApi<typeof uni.getStorageInfoSync>(
  'getStorageInfoSync',
  () => {
    const length = plus.storage.getLength() || 0
    const keys: string[] = []
    let currentSize = 0
    for (let index = 0; index < length; index++) {
      const key = plus.storage.key(index)
      if (
        key !== STORAGE_KEYS &&
        (key.indexOf(STORAGE_DATA_TYPE) < 0 ||
          key.indexOf(STORAGE_DATA_TYPE) + STORAGE_DATA_TYPE.length !==
            key.length)
      ) {
        const value = plus.storage.getItem(key)
        currentSize += key.length + value.length
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
