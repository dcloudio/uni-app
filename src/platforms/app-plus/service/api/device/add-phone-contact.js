import {
  invoke
} from '../../bridge'

export function addPhoneContact ({
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
  homeAddressPostalCode
} = {}, callbackId) {
  plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, (addressbook) => {
    const contact = addressbook.create()
    const name = {}
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
      contact.photos = [{
        type: 'url',
        value: photoFilePath
      }]
    }

    if (remark) {
      contact.note = remark
    }

    const mobilePhone = {
      type: 'mobile'
    }

    const workPhone = {
      type: 'work'
    }

    const companyPhone = {
      type: 'company'
    }

    const homeFax = {
      type: 'home fax'
    }

    const workFax = {
      type: 'work fax'
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

    contact.phoneNumbers = [mobilePhone, workPhone, companyPhone, homeFax, workFax]

    if (email) {
      contact.emails = [{
        type: 'home',
        value: email
      }]
    }

    if (url) {
      contact.urls = [{
        type: 'other',
        value: url
      }]
    }

    const org = {
      type: 'company'
    }

    if (organization) {
      org.name = organization
    }
    if (title) {
      org.title = title
    }

    if (weChatNumber) {
      contact.ims = [{
        type: 'other',
        value: weChatNumber
      }]
    }

    const defaultAddress = {
      type: 'other',
      preferred: true
    }

    const homeAddress = {
      type: 'home'
    }
    const companyAddress = {
      type: 'company'
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

    contact.addresses = [defaultAddress, homeAddress, companyAddress]

    contact.save(() => {
      invoke(callbackId, {
        errMsg: 'addPhoneContact:ok'
      })
    }, (e) => {
      invoke(callbackId, {
        errMsg: 'addPhoneContact:fail'
      })
    })
  }, (e) => {
    invoke(callbackId, {
      errMsg: 'addPhoneContact:fail'
    })
  })
}
