import { ApiProtocol } from '../type'

export const MakePhoneCallProtocol: ApiProtocol = {
  phoneNumber: {
    type: String,
    required: true,
    validator(phoneNumber: string) {
      if (!phoneNumber) {
        return 'makePhoneCall:fail parameter error: parameter.phoneNumber should not be empty String;'
      }
    }
  }
}
