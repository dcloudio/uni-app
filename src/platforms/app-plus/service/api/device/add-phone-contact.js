import {
  invoke
} from '../../bridge'

const schema = {
  name: {
    givenName: 'firstName',
    middleName: 'middleName',
    familyName: 'lastName'
  },
  nickname: 'nickName',
  photos: {
    type: 'url',
    value: 'photoFilePath'
  },
  note: 'remark',
  phoneNumbers: [
    {
      type: 'mobile',
      value: 'mobilePhoneNumber'
    },
    {
      type: 'work',
      value: 'workPhoneNumber'
    },
    {
      type: 'company',
      value: 'hostNumber'
    },
    {
      type: 'home fax',
      value: 'homeFaxNumber'
    },
    {
      type: 'work fax',
      value: 'workFaxNumber'
    }
  ],
  emails: [{
    type: 'home',
    value: 'email'
  }],
  urls: [{
    type: 'other',
    value: 'url'
  }],
  organizations: [{
    type: 'company',
    name: 'organization',
    title: 'title'
  }],
  ims: [{
    type: 'other',
    value: 'weChatNumber'
  }],
  addresses: [
    {
      type: 'other',
      preferred: true,
      country: 'addressCountry',
      region: 'addressState',
      locality: 'addressCity',
      streetAddress: 'addressStreet',
      postalCode: 'addressPostalCode'
    },
    {
      type: 'home',
      country: 'homeAddressCountry',
      region: 'homeAddressState',
      locality: 'homeAddressCity',
      streetAddress: 'homeAddressStreet',
      postalCode: 'homeAddressPostalCode'
    },
    {
      type: 'company',
      country: 'workAddressCountry',
      region: 'workAddressState',
      locality: 'workAddressCity',
      streetAddress: 'workAddressStreet',
      postalCode: 'workAddressPostalCode'
    }
  ]
}

const keepFields = ['type', 'preferred']

function buildContact (contact, data, schema) {
  let hasValue = 0
  Object.keys(schema).forEach(contactKey => {
    const dataKey = schema[contactKey]
    const typed = typeof dataKey
    if (typed !== 'object') {
      if (keepFields.indexOf(contactKey) !== -1) {
        contact[contactKey] = schema[contactKey]
      } else {
        if (typeof data[dataKey] !== 'undefined') {
          hasValue++
          contact[contactKey] = data[dataKey]
        } else {
          delete contact[contactKey]
        }
      }
    } else {
      if (dataKey instanceof Array) {
        contact[contactKey] = []
        dataKey.forEach(item => {
          const obj = {}
          if (buildContact(obj, data, item)) {
            contact[contactKey].push(obj)
          }
        })
        if (!contact[contactKey].length) {
          delete contact[contactKey]
        } else {
          hasValue++
        }
      } else {
        contact[contactKey] = {}
        if (buildContact(contact[contactKey], data, dataKey)) {
          hasValue++
        } else {
          delete contact[contactKey]
        }
      }
    }
  })
  return hasValue
}

export function addPhoneContact (data, callbackId) {
  plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, (addressbook) => {
    !data.photoFilePath && (data.photoFilePath = '')
    const contact = addressbook.create()
    buildContact(contact, data, schema)
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
