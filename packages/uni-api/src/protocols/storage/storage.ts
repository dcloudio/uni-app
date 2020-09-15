import { ApiProtocol, ProtocolOptions } from '../type'

export const GetStorageProtocol: ApiProtocol = {
  key: {
    type: String,
    required: true
  }
}

export const GetStorageSyncProtocol: ProtocolOptions[] = [
  {
    name: 'key',
    type: String,
    required: true
  }
]

export const SetStorageProtocol: ApiProtocol = {
  key: {
    type: String,
    required: true
  },
  data: {
    required: true
  }
}

export const SetStorageSyncProtocol: ProtocolOptions[] = [
  {
    name: 'key',
    type: String,
    required: true
  },
  {
    name: 'data',
    required: true
  }
]

export const RemoveStorageProtocol = GetStorageProtocol
export const RemoveStorageSyncProtocol = GetStorageSyncProtocol
