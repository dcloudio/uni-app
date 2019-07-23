export function makePhoneCall ({
  phoneNumber
} = {}) {
  plus.device.dial(phoneNumber)
  return {
    errMsg: 'makePhoneCall:ok'
  }
}
