export const makePhoneCall = {
  'phoneNumber': {
    type: String,
    required: true,
    validator (phoneNumber) {
      if (!phoneNumber) {
        return `makePhoneCall:fail parameter error: parameter.phoneNumber should not be empty String;`
      }
    }
  }
}
