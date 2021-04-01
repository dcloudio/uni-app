import { ApiProtocol } from '../type'

export const API_MAKE_PHONE_CALL = 'makePhoneCall'

export const MakePhoneCallProtocol: ApiProtocol = {
  phoneNumber: {
    type: String,
    required: true,
    validator(phoneNumber: string) {
      if (!phoneNumber) {
        return 'parameter error: parameter.phoneNumber should not be empty String;'
      }
    },
  },
}
