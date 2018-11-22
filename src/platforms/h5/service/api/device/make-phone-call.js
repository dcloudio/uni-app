export function makePhoneCall ({
  phoneNumber
}) {
  window.location.href = `tel:${phoneNumber}`
  return {
    errMsg: 'makePhoneCall:ok'
  }
}
