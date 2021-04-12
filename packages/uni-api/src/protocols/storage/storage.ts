export const API_GET_STORAGE = 'getStorage'
export type API_TYPE_GET_STORAGE = typeof uni.getStorage
export const GetStorageProtocol: ApiProtocol<API_TYPE_GET_STORAGE> = {
  key: {
    type: String,
    required: true,
  },
}
export const API_GET_STORAGE_SYNC = 'getStorageSync'
export type API_TYPE_GET_STORAGE_SYNC = typeof uni.getStorageSync
export const GetStorageSyncProtocol: ProtocolOptions[] = [
  {
    name: 'key',
    type: String,
    required: true,
  },
]
export const API_SET_STORAGE = 'setStorage'
export type API_TYPE_SET_STORAGE = typeof uni.setStorage
export const SetStorageProtocol: ApiProtocol<API_TYPE_SET_STORAGE> = {
  key: {
    type: String,
    required: true,
  },
  data: {
    required: true,
  },
}
export const API_SET_STORAGE_SYNC = 'setStorageSync'
export type API_TYPE_SET_STORAGE_SYNC = typeof uni.setStorageSync
export const SetStorageSyncProtocol: ProtocolOptions[] = [
  {
    name: 'key',
    type: String,
    required: true,
  },
  {
    name: 'data',
    required: true,
  },
]
export const API_REMOVE_STORAGE = 'removeStorage'
export type API_TYPE_REMOVE_STORAGE = typeof uni.removeStorage
export const RemoveStorageProtocol = GetStorageProtocol

export const API_REMOVE_STORAGE_SYNC = 'removeStorageSync'
export type API_TYPE_REMOVE_STORAGE_SYNC = typeof uni.removeStorageSync
export const RemoveStorageSyncProtocol = GetStorageSyncProtocol
