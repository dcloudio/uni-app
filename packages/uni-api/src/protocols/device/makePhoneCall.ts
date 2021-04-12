export const API_MAKE_PHONE_CALL = 'makePhoneCall'
export type API_TYPE_MAKE_PHONE_CALL = typeof uni.makePhoneCall

export const MakePhoneCallProtocol: ApiProtocol<API_TYPE_MAKE_PHONE_CALL> = {
  phoneNumber: String,
}
