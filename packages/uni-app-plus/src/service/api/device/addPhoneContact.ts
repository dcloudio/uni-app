import {
  API_ADD_PHONE_CONTACT,
  API_TYPE_ADD_PHONE_CONTACT,
  defineAsyncApi,
  MakePhoneCallProtocol,
} from '@dcloudio/uni-api'

export const addPhoneContact = defineAsyncApi<API_TYPE_ADD_PHONE_CONTACT>(
  API_ADD_PHONE_CONTACT,
  (
    {
      photoFilePath = '',
      nickName,
      lastName,
      middleName,
      firstName,
      remark,
      mobilePhoneNumber,
      weChatNumber,
      addressCountry,
      addressState,
      addressCity,
      addressStreet,
      addressPostalCode,
      organization,
      title,
      workFaxNumber,
      workPhoneNumber,
      hostNumber,
      email,
      url,
      workAddressCountry,
      workAddressState,
      workAddressCity,
      workAddressStreet,
      workAddressPostalCode,
      homeFaxNumber,
      homePhoneNumber,
      homeAddressCountry,
      homeAddressState,
      homeAddressCity,
      homeAddressStreet,
      homeAddressPostalCode,
    },
    { resolve, reject }
  ) => {
    plus.contacts.getAddressBook(
      plus.contacts.ADDRESSBOOK_PHONE,
      (addressbook) => {
        const contact = addressbook.create()
        const name: any = {}
        if (lastName) {
          name.familyName = lastName
        }
        if (firstName) {
          name.givenName = firstName
        }
        if (middleName) {
          name.middleName = middleName
        }
        contact.name = name

        if (nickName) {
          contact.nickname = nickName
        }

        if (photoFilePath) {
          ;(contact as any).photos = [
            {
              type: 'url',
              value: photoFilePath,
            },
          ]
        }

        if (remark) {
          contact.note = remark
        }

        const mobilePhone: any = {
          type: 'mobile',
        }

        const workPhone: any = {
          type: 'work',
        }

        const companyPhone: any = {
          type: 'company',
        }

        const homeFax: any = {
          type: 'home fax',
        }

        const workFax: any = {
          type: 'work fax',
        }

        if (mobilePhoneNumber) {
          mobilePhone.value = mobilePhoneNumber
        }

        if (workPhoneNumber) {
          workPhone.value = workPhoneNumber
        }

        if (hostNumber) {
          companyPhone.value = hostNumber
        }

        if (homeFaxNumber) {
          homeFax.value = homeFaxNumber
        }

        if (workFaxNumber) {
          workFax.value = workFaxNumber
        }

        ;(contact as any).phoneNumbers = [
          mobilePhone,
          workPhone,
          companyPhone,
          homeFax,
          workFax,
        ]

        if (email) {
          ;(contact as any).emails = [
            {
              type: 'home',
              value: email,
            },
          ]
        }

        if (url) {
          ;(contact as any).urls = [
            {
              type: 'other',
              value: url,
            },
          ]
        }

        const org: any = {
          type: 'company',
        }

        if (organization) {
          org.name = organization
        }
        if (title) {
          org.title = title
        }

        if (weChatNumber) {
          ;(contact as any).ims = [
            {
              type: 'other',
              value: weChatNumber,
            },
          ]
        }

        const defaultAddress: any = {
          type: 'other',
          preferred: true,
        }

        const homeAddress: any = {
          type: 'home',
        }
        const companyAddress: any = {
          type: 'company',
        }

        if (addressCountry) {
          defaultAddress.country = addressCountry
        }

        if (addressState) {
          defaultAddress.region = addressState
        }

        if (addressCity) {
          defaultAddress.locality = addressCity
        }

        if (addressStreet) {
          defaultAddress.streetAddress = addressStreet
        }

        if (addressPostalCode) {
          defaultAddress.postalCode = addressPostalCode
        }

        if (homeAddressCountry) {
          homeAddress.country = homeAddressCountry
        }

        if (homeAddressState) {
          homeAddress.region = homeAddressState
        }

        if (homeAddressCity) {
          homeAddress.locality = homeAddressCity
        }

        if (homeAddressStreet) {
          homeAddress.streetAddress = homeAddressStreet
        }

        if (homeAddressPostalCode) {
          homeAddress.postalCode = homeAddressPostalCode
        }

        if (workAddressCountry) {
          companyAddress.country = workAddressCountry
        }

        if (workAddressState) {
          companyAddress.region = workAddressState
        }

        if (workAddressCity) {
          companyAddress.locality = workAddressCity
        }

        if (workAddressStreet) {
          companyAddress.streetAddress = workAddressStreet
        }

        if (workAddressPostalCode) {
          companyAddress.postalCode = workAddressPostalCode
        }

        ;(contact as any).addresses = [
          defaultAddress,
          homeAddress,
          companyAddress,
        ]

        contact.save(
          () => {
            resolve({
              errMsg: 'addPhoneContact:ok',
            })
          },
          (e) => {
            reject('addPhoneContact:fail')
          }
        )
      },
      (e) => {
        reject('addPhoneContact:fail')
      }
    )
  },
  MakePhoneCallProtocol
)
