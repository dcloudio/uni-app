import { v4 as uuidv4 } from 'uuid'

const UUID_KEY = '__DC_UUID'
const storage = window.localStorage || window.sessionStorage || {}
let uuid

export default function () {
  uuid = uuid || storage[UUID_KEY]
  if (!uuid) {
    uuid = uuidv4()
    try {
      storage[UUID_KEY] = uuid
    } catch (error) {

    }
  }
  return uuid
}
