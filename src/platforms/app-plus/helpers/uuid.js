let deviceId

export default function () {
  deviceId = deviceId || plus.runtime.getDCloudId()
  return deviceId
}
