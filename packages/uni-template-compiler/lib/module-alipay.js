module.exports = {
  postTransformNode (el) {
    const attrsMap = el.attrsMap
    if (attrsMap['open-type'] !== 'getPhoneNumber') {
      return
    }
    const getPhoneNumberValue = attrsMap['@getphonenumber'] || attrsMap['v-on:getphonenumber']
    if (!getPhoneNumberValue) {
      return
    }

    el.attrs.find(attr => attr.name === 'open-type').value = '"getAuthorize"'
    el.attrs.push({
      name: 'scope',
      value: '"phoneNumber"'
    })

    delete el.events.getphonenumber
    el.events.getAuthorize = {
      value: '$onAliGetAuthorize(\'' + getPhoneNumberValue + '\',$event)'
    }
    el.events.error = {
      value: '$onAliAuthError(\'' + getPhoneNumberValue + '\',$event)'
    }
  }
}
