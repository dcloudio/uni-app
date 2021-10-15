let deviceId: string

export default function () {
  deviceId = deviceId || plus.device.uuid!
  return deviceId
}
