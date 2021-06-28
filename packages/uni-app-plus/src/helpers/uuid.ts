let deviceId: string

interface _PlusRuntime extends PlusRuntime {
  getDCloudId: (...args: any[]) => string
}

export default function () {
  deviceId = deviceId || (plus.runtime as _PlusRuntime).getDCloudId()
  return deviceId
}
