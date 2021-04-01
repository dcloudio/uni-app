import { ProtocolOptions } from '../type'

export const API_CAN_I_USE = 'canIUse'

export const CanIUseProtocol: ProtocolOptions<String>[] = [
  {
    name: 'schema',
    type: String,
    required: true,
  },
]
