let deviceId

export default function () {
  deviceId = deviceId || plus.device.uuid
  return deviceId
}
