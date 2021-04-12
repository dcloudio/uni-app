export const API_CAN_I_USE = 'canIUse'
export type API_TYPE_CAN_I_USE = typeof uni.canIUse
export const CanIUseProtocol: ProtocolOptions<String>[] = [
  {
    name: 'schema',
    type: String,
    required: true,
  },
]
