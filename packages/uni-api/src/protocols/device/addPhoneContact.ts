export const API_ADD_PHONE_CONTACT = 'addPhoneContact'
export type API_TYPE_ADD_PHONE_CONTACT = typeof uni.addPhoneContact

export const AddPhoneContactOptions: ApiOptions<API_TYPE_ADD_PHONE_CONTACT> = {
  formatArgs: {
    firstName(firstName) {
      if (!firstName)
        return 'addPhoneContact:fail parameter error: parameter.firstName should not be empty;'
    },
  },
}

export const AddPhoneContactProtocol: ApiProtocol<API_TYPE_ADD_PHONE_CONTACT> =
  {
    firstName: {
      type: String,
      required: true,
    },
    photoFilePath: String,
    nickName: String,
    lastName: String,
    middleName: String,
    remark: String,
    mobilePhoneNumber: String,
    weChatNumber: String,
    addressCountry: String,
    addressState: String,
    addressCity: String,
    addressStreet: String,
    addressPostalCode: String,
    organization: String,
    title: String,
    workFaxNumber: String,
    workPhoneNumber: String,
    hostNumber: String,
    email: String,
    url: String,
    workAddressCountry: String,
    workAddressState: String,
    workAddressCity: String,
    workAddressStreet: String,
    workAddressPostalCode: String,
    homeFaxNumber: String,
    homePhoneNumber: String,
    homeAddressCountry: String,
    homeAddressState: String,
    homeAddressCity: String,
    homeAddressStreet: String,
    homeAddressPostalCode: String,
  }
