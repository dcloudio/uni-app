let uuid

export default function () {
  uuid = uuid || plus.runtime.getDCloudId()
  return uuid
}
